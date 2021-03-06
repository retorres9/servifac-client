import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { ClientsService } from "../clients/clients.service";
import { ProductsService } from "../products/products.service";
import { BillingService } from "./billing.service";
import { Sale } from "./models/sale.model";
import { RetailProducts } from "./models/retail-products.model";
import { TaxArrayHelper } from "./models/tax-array-helper.model";
import { NewProduct } from '../products/new-product/new-product.model';
import { Client } from "../clients/client.model";

import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { ProductBill } from '../products/models/models';
import { CredentialsJwt } from '../auth/jwt-credentials.model';
import jwtDecode from "jwt-decode";
import { SaleState } from "./enums/sale-state.enum";
import { SaleType } from "./enums/sale-type.enum";
import { HeaderService } from '../shared/components/header/header.service';

// import printJS from 'print-js';
import { HttpClient } from '@angular/common/http'
import { ElectronService } from './../core/services/electron/electron.service';
import { BrowserWindow } from "electron";




@Component({
  selector: "app-detail",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.scss"],
})
export class BillingComponent implements OnInit {
  focused: boolean = false;
  section: string = "Facturación";
  isRequesting: boolean = false;

  productBarcode: string;
  amountGiven = null;
  change: number;
  totalRetail = 0;
  selectedRow: number;
  products: RetailProducts[] = [];
  tax: number;
  newClientForm: FormGroup;
  productArrayHelper: TaxArrayHelper[] = [];

  creditAmount: number = 0;
  creditUsed: number = 0;
  hasCredit: boolean = false;
  setCredit: boolean = true;


  client_ci: string = "1111111111";
  clientName: string = "CONSUMIDOR FINAL";
  clientPhone: string = "0000000000";
  clientAddress: string;

  // ?Component
  searchTerm: string;
  matchingProducts: NewProduct[];

  clientsList: Client;
  // ? Helps to calculate the total tax
  constructor(
    private productService: ProductsService,
    private clientService: ClientsService,
    private billingService: BillingService,
    private headerService: HeaderService,
    private http: HttpClient,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle('Facturación');
    const configuration = JSON.parse(localStorage.getItem("configuration"));
    this.tax = configuration.tax;
    const token = localStorage.getItem("token");
    this.credit(0);
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

  closeModal() {
    this.resetFields();
  }

  credit(amount: number) {
    if (amount > 0) {
      this.hasCredit = false;
      return this.setCredit = true;
    } else {
      this.hasCredit = true;
      return this.setCredit = false;
    }
  }

  getClientData(clientCi) {
    this.clientService.getClient(clientCi).subscribe((resp) => {
      if (!resp) {
        (document.querySelector("#openModal") as HTMLElement)?.click();
        return;
      }
      this.clientName = `${resp.client.cli_firstName} ${resp.client.cli_lastName}`;
      this.client_ci = resp.client.cli_ci;
      this.clientPhone = resp.client.cli_phone;
      this.clientAddress = resp.client.cli_address;
      this.creditAmount = resp.credit;
      this.creditUsed = resp.debt;
      let amount = this.creditAmount - this.creditUsed;
      this.credit(amount);
      this.setFocusOnCode();
    });
  }

  getProductBarcode() {
    if (this.productBarcode) {
      this.isRequesting = true;
      this.productService
        .getProductBarcode(this.productBarcode)
        .subscribe((resp) => {
          this.processProduct(resp);
          this.isRequesting = false;
          this.setFocusOnCode();
        }, err => {
          this.isRequesting = false;
          this.setFocusOnCode();
        });
    }
    this.productBarcode = "";
  }

  getTotalAmount() {
    this.totalRetail = this.products.reduce(
      (total, product) => total + product.total,
      0
    );
  }

  async printer(change: number) {
    this.focused = true;
    const doc = new jsPDF("p", "pt", "a5");
    let total = 0;
    let totalIva = 0;
    doc.setFontSize(9);
    const rows = [];
    this.products.forEach((elements) => {
      rows.unshift([
        elements.cant,
        elements.prod_name,
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
        doc.text(totalIva.toFixed(2).toString(), 315, 415);
        doc.text(total.toFixed(2).toString(), 315, 395);
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
    this.electronService.fs.writeFile('Fact.pdf',doc.output(),(err) => {
      console.log(err);
    });
    this.electronService.printfile();
    this.createSale(change);
    this.resetFields();
    return;
  }

  removeProductFromTable(prodRemoved: string) {
    this.products = this.products.filter(
      (product) => product.prod_name !== prodRemoved
    );
    this.getTotalAmount();
  }

  rowClicked(idx: number, prod: string) {
    this.selectedRow = idx;
    (document.querySelector(`#${prod}`) as HTMLElement)?.focus();
  }

  searchProduct(productSearched: string) {
    this.productService.queryProduct(productSearched).subscribe((resp) => {
      this.matchingProducts = resp;
    });
  }

  selectProduct(product: ProductBill) {
    let asd = new ProductBill();

    asd.prod_isTaxed = product.prod_isTaxed;
    asd.prod_name = product.prod_name;
    asd.prod_price = product.prod_price;
    this.processProduct({...asd});
    (document.querySelector('#btnCloseProdSearch') as HTMLElement).click();
  }

  setAmountGiven(e) {
    this.amountGiven = e;
  }

  setFocusOnCode() {
    setTimeout(() => {
      (document.querySelector("#code") as HTMLElement)?.focus();
    }, 100);
  }

  setFocusChange() {
    setTimeout(() => {
      (document.querySelector("#amountGivenInput") as HTMLElement).focus();
    }, 500);
  }

  setFocusNew() {
    setTimeout(() => {
      (document.querySelector('#cli_ci') as HTMLElement).focus();
    }, 500);
  }

  setFocusOnModal() {
    setTimeout(() => {
      (document.querySelector("#searchInput") as HTMLElement).focus();
    }, 500);
  }

  showBtn() {
    if (this.clientName === 'CONSUMIDOR FINAL') {
      return true;
    } else {
      return false;
    }
  }

  validateForm(change: number) {
    this.printer(change);
  }

  // ? Help to calculate taxes
  private setValidationObject(code: string, price: number, isTaxed: boolean) {
    const nuevo = new TaxArrayHelper();
    nuevo.name = code;
    nuevo.price = price;
    nuevo.isTaxed = isTaxed;
    let isIncluded = this.productArrayHelper.some(
      (product) => product.name === code
    );
    isIncluded ? true : this.productArrayHelper.unshift({ ...nuevo });
  }
  isCreditRequested: boolean = false;
  private createSale(change: number) {
    const token = localStorage.getItem('token');
    const credentials: CredentialsJwt = jwtDecode(token);
    let payment = change > 0 ? this.totalRetail : (this.totalRetail - Math.abs(change));
    const sale = new Sale();
    sale.sale = this.products;
    sale.sale_client = this.client_ci;
    sale.sale_totalRetail = this.totalRetail;
    sale.sale_totalPayment = (+payment.toFixed(2));
    sale.sale_user = credentials.user_username;
    sale.sale_saleState = SaleState.DELIVERED;
    sale.sale_paymentType = SaleType.EFECTIVO;
    sale.sale_date = new Date().toISOString().split('T')[0];
    sale.sale_toDate = this.isCreditRequested ? new Date() : null;

    this.billingService.onNewSale(sale).subscribe();
  }

  private resetFields() {
    this.products = [];
    this.totalRetail = 0;
    this.productArrayHelper = [];
    this.client_ci = "1111111111";
    this.clientName = "CONSUMIDOR FINAL";
    this.clientPhone = "0000000000";
    this.clientAddress = "";
    this.amountGiven = null;
    this.creditAmount = 0;
    this.creditUsed = 0;
    this.isCreditRequested = false;
    this.setFocusOnCode();
  }

  private calculateTax(cant: number, price: number, isTaxed: boolean) {
    let tax = isTaxed ? cant * (price * (this.tax / 100)) : 0;
    return tax;
  }

  private processProduct(product: ProductBill) {
    let productTax;
    const productIdx = this.products.findIndex(
      (producto) => producto.prod_name === product.prod_name
    );

    if (productIdx >= 0) {
      ++this.products[productIdx].cant;
      productTax = this.calculateTax(
        this.products[productIdx].cant,
        Number(this.products[productIdx].price),
        product.prod_isTaxed
      );
      this.products[productIdx].total =
        this.products[productIdx].cant * Number(product.prod_price);
      this.products[productIdx].tax = productTax;
      this.setValidationObject(
        product.prod_name,
        parseFloat(product.prod_price),
        product.prod_isTaxed
      );
    } else {
      let productTax;
      productTax = this.calculateTax(
        1,
        Number(product.prod_price),
        product.prod_isTaxed
      );
      this.products.unshift({
        cant: 1,
        prod_name: product.prod_name,
        price: parseFloat(product.prod_price),
        total: parseFloat(product.prod_price),
        isTaxed: product.prod_isTaxed,
        tax: productTax,
      });

      this.setValidationObject(
        product.prod_name,
        parseFloat(product.prod_price),
        product.prod_isTaxed
      );
    }
    this.getTotalAmount();
  }
}
