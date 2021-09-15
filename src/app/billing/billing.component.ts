import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ClientsService } from "../clients/clients.service";
import { ProductsService } from "../products/products.service";
import { BillingService } from './billing.service';
import { Sale } from './models/sale.model';
import { RetailProducts } from './models/retail-products.model';
import { TaxArrayHelper } from './models/tax-array-helper.model';

import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { Client } from "../clients/client.model";

@Component({
  selector: "app-detail",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.scss"],
})
export class BillingComponent implements OnInit {
  section: string = "Facturación";

  productBarcode: string;
  amountGiven: number = 0;
  change: number;
  totalRetail = 0;
  selectedRow: number;
  products: RetailProducts[] = [];
  tax: number;
  newClientForm: FormGroup;
  productArrayHelper: TaxArrayHelper[] = [];

  client_ci: string = '1111111111';
  clientName: string = 'CONSUMIDOR FINAL';
  clientPhone: string = '0000000000';
  clientAddress: string;

  searchTerm: string;

  clientsList: Client;

  // ? Helps to calculate the total tax

  @ViewChild("#code", { static: false }) barcodeInput: ElementRef;
  @ViewChild('#modalChange', {static: false}) modal: ElementRef;
  constructor(
    private productService: ProductsService,
    private clientService: ClientsService,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    const configuration = JSON.parse(localStorage.getItem("configuration"));
    this.tax = configuration.tax;
    const token = localStorage.getItem("token");

  }

  removeProduct(prodRemoved: string) {
    this.products = this.products.filter(
      (product) => product.prod !== prodRemoved
    );
    this.getTotalAmount();
  }

  rowClicked(idx: number, prod: string) {
    this.selectedRow = idx;
    (document.querySelector(`#${prod}`) as HTMLElement)?.focus();
  }

  getClient() {
    this.clientService.getClient(this.client_ci).subscribe((resp) => {
      if (resp === null) {
        this.newClientForm.controls.cli_ci.setValue(this.client_ci);
        this.newClientForm.controls.cli_ci.markAsTouched();
        this.newClientForm.controls.cli_ci.markAsDirty();
        (document.querySelector("#openModal") as HTMLElement)?.click();
        return;
      }
      this.clientName = `${resp.cli_firstName} ${resp.cli_lastName}`;
      this.clientPhone = resp.cli_phone;
      this.clientAddress = resp.cli_address;
      (document.querySelector("#code") as HTMLElement)?.focus();
    });
  }

  getProductBarcode() {
    if (this.productBarcode !== "") {
      this.productService
        .getProductBarcode(this.productBarcode)
        .subscribe((resp) => {
          const productIdx = this.products.findIndex(
            (producto) => producto.prod === resp.prod_name
          );

          if (productIdx >= 0) {
            ++this.products[productIdx].cant;
            let productTax;
            if (resp.prod_isTaxed) {
              productTax =
                this.products[productIdx].cant *
                (parseFloat(resp.prod_price) * (this.tax / 100));
            } else {
              productTax = 0;
            }
            this.products[productIdx].total =
              this.products[productIdx].cant * Number(resp.prod_price);
            this.products[productIdx].tax = productTax;
            this.setValidationObject(
              resp.prod_name,
              parseFloat(resp.prod_price),
              resp.prod_isTaxed
            );
          } else {
            let taxCal;
            if (resp.prod_isTaxed) {
              taxCal = 1 * (parseFloat(resp.prod_price) * (this.tax / 100));
            } else {
              taxCal = 0;
            }
            this.products.push({
              cant: 1,
              prod: resp.prod_name,
              price: parseFloat(resp.prod_price),
              total: parseFloat(resp.prod_price),
              isTaxed: resp.prod_isTaxed,
              tax: taxCal,
            });

            this.setValidationObject(
              resp.prod_name,
              parseFloat(resp.prod_price),
              resp.prod_isTaxed
            );
          }
          this.getTotalAmount();
        });
    }

    this.productBarcode = "";
  }

  private setValidationObject(code: string, price: number, isTaxed: boolean) {
    const nuevo = new TaxArrayHelper();
    nuevo.name = code;
    nuevo.price = price;
    nuevo.isTaxed = isTaxed;
    let isIncluded = this.productArrayHelper.some(
      (product) => product.name === code
    );
    isIncluded ? true : this.productArrayHelper.push({ ...nuevo });
  }

  getTotalAmount() {
    this.totalRetail = this.products.reduce(
      (total, product) => total + product.total, 0
    );
  }

  addCant(idx: number, event) {
    event.target.value === ""
      ? (event.target.value = 1)
      : (this.products[idx].cant = event.target.value);
    this.products[idx].cant = event.target.value;
    this.products[idx].total =
      this.products[idx].cant * this.products[idx].price;
    this.getTotalAmount();
  }

  changeFocus() {
    (document.querySelector("#code") as HTMLElement)?.focus();
  }

  printer() {
    (document.querySelector("#amountGivenInput") as HTMLElement)?.focus();
    const doc = new jsPDF("p", "pt", "a5");
    let pageNumber = 0;
    let total = 0;
    let totalIva = 0;
    doc.setFontSize(9);
    const rows = [];
    this.products.forEach((elements) => {
      rows.push([
        elements.cant,
        elements.prod,
        elements.price.toFixed(2),
        elements.total.toFixed(2),
      ]);
    });

    doc.text(this.clientName, 25, 46);
    doc.text(this.clientPhone, 25, 66);
    autoTable(doc, {
      body: rows,
      useCss: false,
      theme: "plain",
      startY: 110,
      rowPageBreak: "avoid",
      margin: {
        top: 40,
        bottom: 240,
        left: 40,
      },
      didDrawPage: (data) => {
        data.settings.margin.top = 110;
        doc.text(this.clientName, 25, 46);
        doc.text(this.clientPhone, 25, 66);
        doc.text(totalIva.toFixed(2).toString(), 315, 395);
        doc.text(total.toFixed(2).toString(), 315, 415);
        const cost = totalIva + total;
        doc.text(cost.toFixed(2).toString(), 315, 435);
        totalIva = 0;
        total = 0;
      },
      didDrawCell: (data) => {
        if (data.column.index === 3) {

          total += Number(
            Number.parseFloat(data.row.cells[3].raw.toString()).toFixed(2)
          );
          this.productArrayHelper.forEach((item) => {
            if (item.name === data.row.cells[1].raw && item.isTaxed) {
              totalIva +=
                Number(data.row.cells[0].raw) *
                (this.productArrayHelper[data.row.index].price *
                  (this.tax / 100));
            }
          });
        }
      },
    });
    doc.save("Factura.pdf");
    this.createSale();
    this.resetFields();
  }

  private createSale() {
    const sale = new Sale();
    sale.sale = this.products;
    sale.sale_client = this.client_ci;
    sale.sale_totalRetail= this.totalRetail;
    sale.sale_totalPayment = this.totalRetail;
    sale.sale_user = this.client_ci;
    sale.sale_date = new Date();
    console.log(sale);

    this.billingService.onNewSale(sale).subscribe(
      resp => console.log(resp)
    );
  }

  closeModal() {
    this.resetFields();
  }

  updateClient(client: Client) {
    this.client_ci = client.cli_ci;
    this.clientName = `${client.cli_firstName} ${client.cli_lastName}`;
    this.clientPhone = client.cli_phone;
    this.clientAddress = client.cli_address;
  }

  private resetFields() {
    this.amountGiven = 0;
    this.products = [];
    this.totalRetail = 0;
    this.productArrayHelper = [];
    this.client_ci = '1111111111';
    this.clientName = 'CONSUMIDOR FINAL';
    this.clientPhone = '0000000000';
    this.clientAddress = '';
  }
}
