import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
@Component({
  selector: "app-detail",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.scss"],
})
export class BillingComponent implements OnInit {
  name: string = 'Facturación'
  code: string;
  amountGiven: number;
  change: number;
  user: string;
  client_ci: string;
  clientName: string;
  clientPhone: string;
  total = 0;
  selectedRow: number;
  newClientForm: FormGroup;
  dataTest: Prods[] = [];
  tax: number;
  data2 = [
    {
      prod: "Lapiz Mongol",
      iva: 0.05,
    },
    {
      prod: "Lapiz Artesco",
      iva: 0,
    },
  ];

  data: Prods[] = [
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Artesco",
      cant: 2,
      price: 10.25,
      total: 20.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 10.25,
      total: 20.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
      isTaxed: true
    },
  ];


  options = {
    silent: false,
    // printBackground: true,
    color: false,
    margin: {
      marginType: "printableArea",
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
    header: "Header of the Page",
    footer: "Footer of the Page",
  };

  @ViewChild("#code", { static: false }) codeEl: ElementRef;

  constructor(
    private productService: ProductsService,
    private clientService: ClientsService
  ) {}

  ngOnInit(): void {
    const configuration = JSON.parse(localStorage.getItem('configuration'));
    this.tax = configuration.tax;
    const token = localStorage.getItem("token");
    // (document.querySelector('#code') as HTMLElement)?.focus();
    this.newClientForm = new FormGroup({
      cli_firstName: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      cli_ci: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.minLength(10), Validators.maxLength(13), Validators.required]
      }),
      cli_lastName: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      cli_phone: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.minLength(10)]
      }),
      cli_email: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
      })

    })
  }

  removeProduct(prodRemoved: string) {
    console.log('backspace');

    this.dataTest = this.dataTest.filter(product => product.prod !== prodRemoved);
    this.getTotalAmount();
  }

  rowClicked(idx: number, prod: string) {
    console.log(prod);

    this.selectedRow = idx;
    (document.querySelector(`#${prod}`) as HTMLElement)?.focus();
  }

  getClient() {
    this.clientService
      .getClient(this.client_ci)
      .subscribe((resp) => {
        if (resp === null) {
          this.newClientForm.controls.cli_ci.setValue(this.client_ci);
          this.newClientForm.controls.cli_ci.markAsTouched();
          this.newClientForm.controls.cli_ci.markAsDirty();
          (document.querySelector("#openModal") as HTMLElement)?.click();
          return;
        }
        console.log(resp);
        this.clientName = `${resp.cli_firstName} ${resp.cli_lastName}`;
        this.clientPhone = resp.cli_phone;
        (document.querySelector('#code') as HTMLElement)?.focus();
      });
  }

  getProductBarcode() {
    if (this.code !== "") {
      this.productService.getProductBarcode(this.code).subscribe((resp) => {
        const productIdx = this.dataTest.findIndex(
          (prod) => prod.prod === resp.prod_name
        );

        if (productIdx >= 0) {
          ++this.dataTest[productIdx].cant;
          let taxCal2;
          if (resp.prod_isTaxed) {
            taxCal2 = this.dataTest[productIdx].cant * (parseFloat(resp.prod_price) * (this.tax / 100));
          } else {
            taxCal2 = 0;
          }
          this.dataTest[productIdx].total =
            this.dataTest[productIdx].cant * Number(resp.prod_price);
            this.dataTest[productIdx].tax = taxCal2;

        } else {
          let taxCal;
          if (resp.prod_isTaxed) {
            taxCal = 1 * (parseFloat(resp.prod_price) * (this.tax / 100));
          } else {
            taxCal = 0;
          }
          this.dataTest.push({
            cant: 1,
            prod: resp.prod_name,
            price: parseFloat(resp.prod_price),
            total: parseFloat(resp.prod_price),
            isTaxed: resp.prod_isTaxed,
            tax: taxCal,
          });
        }
        this.getTotalAmount();
        console.log(this.dataTest);
      });
    }

    this.code = "";
  }

  getTotalAmount() {
    this.total = this.dataTest.reduce(
      (total, product) => total + product.total,
      0
    );
  }

  addCant(idx: number, event) {
    event.target.value === ""
      ? (event.target.value = 1)
      : (this.dataTest[idx].cant = event.target.value);
    this.dataTest[idx].cant = event.target.value;
    this.dataTest[idx].total =
      this.dataTest[idx].cant * this.dataTest[idx].price;
    this.getTotalAmount();
  }

  changeFocus() {
    (document.querySelector("#code") as HTMLElement)?.focus();
  }

  printer() {
    // window.print();
    (document.querySelector("#amountGivenInput") as HTMLElement)?.focus();
    // return;
    const doc = new jsPDF("p", "pt", "a5");
    let pageNumber = 0;
    let total = 0;
    let totalIva = 0;
    doc.setFontSize(9);
    const rows = [];
    this.dataTest.forEach((elements) => {
      rows.push([elements.cant, elements.prod, elements.price.toFixed(2), elements.total.toFixed(2), elements.tax.toFixed(2)]);
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
          console.log('entra 2');
          if (data.column.index === 3) {
            console.log(`data column index ${data.column.index}`);

            total += Number(
              Number.parseFloat(data.row.cells[3].raw.toString()).toFixed(2)
            );

            totalIva += Number(
              Number.parseFloat(data.row.cells[4].raw.toString()).toFixed(2)
            );
            // this.dataTest.forEach((dataProds) => {
              // console.log(this.dataTest[data.row.index]);

              // if (this.dataTest[data.row.index].isTaxed) {

              //   totalIva += this.dataTest[data.row.index].price * (this.tax / 100);
              //   // console.log(dataProds.price);
              //   console.log(totalIva);

              // }
            // });
          }
        // }
      },
    });
    doc.save("asd.pdf");
  }

  calculateChange() {
    console.log(this.amountGiven);
    this.change = this.amountGiven - this.total;
    this.change = Number(this.change.toFixed(2));
  }

  changeFocusModal() {
    (document.querySelector("#closeModalOk") as HTMLElement)?.focus();
  }

  onPostClient() {
    this.clientService.createClient(
      this.newClientForm.value.cli_ci,
      this.newClientForm.value.cli_firstName,
      this.newClientForm.value.cli_lastName,
      this.newClientForm.value.cli_email,
      this.newClientForm.value.cli_phone,
    ).subscribe(resp => {
      console.log(resp);
      this.clientName = `${resp.cli_firstName} ${resp.cli_lastName}`;
      this.clientName = resp.cli_phone;
      this.newClientForm.reset();
      (document.querySelector('#closeModal') as HTMLElement)?.click();
    });
  }

  resetAmount() {
    this.amountGiven = 0;
  }
}
