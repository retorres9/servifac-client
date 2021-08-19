import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators, Validator } from "@angular/forms";
import { ClientsService } from "../clients/clients.service";
import { ProductsService } from "../products/products.service";
import { tap } from "rxjs/operators";
import { pipe } from "rxjs";

import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
interface Prods {
  prod: string;
  cant: number;
  price: number;
  total: number;
  isTaxed: boolean;
  tax?: number;
}

class validator {
  name: string;
  price: number;
  isTaxed: boolean;
}
@Component({
  selector: "app-detail",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.scss"],
})
export class BillingComponent implements OnInit {
  section: string = "Facturación";
  productBarcode: string;
  amountGiven: number;
  change: number;
  client_ci: string;
  clientName: string;
  clientPhone: string;
  totalRetail = 0;
  selectedRow: number;
  newClientForm: FormGroup;
  products: Prods[] = [];
  tax: number;
  // ? Helps to calculate the total tax
  productArrayHelper: validator[] = [];

  @ViewChild("#code", { static: false }) barcodeInput: ElementRef;

  constructor(
    private productService: ProductsService,
    private clientService: ClientsService
  ) {}

  ngOnInit(): void {
    const configuration = JSON.parse(localStorage.getItem("configuration"));
    this.tax = configuration.tax;
    const token = localStorage.getItem("token");
    this.newClientForm = new FormGroup({
      cli_firstName: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      cli_ci: new FormControl("", {
        updateOn: "change",
        validators: [
          Validators.minLength(10),
          Validators.maxLength(13),
          Validators.required,
        ],
      }),
      cli_lastName: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      cli_phone: new FormControl("", {
        updateOn: "change",
        validators: [Validators.minLength(10)],
      }),
      cli_email: new FormControl("", {
        updateOn: "change",
        validators: [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      }),
    });
  }

  removeProduct(prodRemoved: string) {
    console.log("backspace");
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
    console.log(code, price, isTaxed);
    const nuevo = new validator();
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
        // if (data.pageCount !== pageNumber) {
        //   console.log('entra 1');
        //   console.log(`${data.pageCount} ---- ${pageNumber}`);

        //   if (data.column.index === 3) {
        //     pageNumber = data.pageNumber;
        //     total += Number(
        //       Number.parseFloat(data.row.cells[3].raw.toString()).toFixed(2)
        //     );

        //     this.dataTest.forEach((dataProds) => {
        //       console.log(dataProds);

        //       if (dataProds.isTaxed) {
        //         totalIva += dataProds.price * (this.tax / 100);
        //       }
        //     });
        //   }
        //   return;
        // } else {
        console.log("entra 2");
        if (data.column.index === 3) {
          console.log(`data column index ${data.column.index}`);

          total += Number(
            Number.parseFloat(data.row.cells[3].raw.toString()).toFixed(2)
          );
          this.productArrayHelper.forEach((item) => {
            if (item.name === data.row.cells[1].raw && item.isTaxed) {
              totalIva +=
                Number(data.row.cells[0].raw) *
                (this.productArrayHelper[data.row.index].price *
                  (this.tax / 100));
              console.log(item.name, data.row.cells[1].raw);
              console.log(this.productArrayHelper[data.row.index].price);
              console.log(this.tax / 100);
              console.log(
                this.productArrayHelper[data.row.index].price * (this.tax / 100)
              );
              console.log(`El IVA ${totalIva}`);
            }
          });
        }
      },
    });
    doc.save("asd.pdf");
  }

  private calculateChange() {
    this.change = this.amountGiven - this.totalRetail;
    this.change = Number(this.change.toFixed(2));
  }

  changeFocusModal() {
    (document.querySelector("#closeModalOk") as HTMLElement)?.focus();
  }

  onPostClient() {
    this.clientService
      .createClient(
        this.newClientForm.value.cli_ci,
        this.newClientForm.value.cli_firstName,
        this.newClientForm.value.cli_lastName,
        this.newClientForm.value.cli_email,
        this.newClientForm.value.cli_phone
      )
      .subscribe((resp) => {
        console.log(resp);
        this.clientName = `${resp.cli_firstName} ${resp.cli_lastName}`;
        this.clientName = resp.cli_phone;
        this.newClientForm.reset();
        (document.querySelector("#closeModal") as HTMLElement)?.click();
      });
  }

  private resetAmount() {
    this.amountGiven = 0;
  }
}
