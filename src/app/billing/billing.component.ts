import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { ProductsService } from "../products/products.service";
import { tap } from "rxjs/operators";
import { pipe } from "rxjs";
import { ClientsService } from "../clients/clients.service";

interface Prods {
  prod: string;
  cant: number;
  price: number;
  total: number;
}
@Component({
  selector: "app-detail",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.scss"],
})
export class BillingComponent implements OnInit {

  code: string;
  dataTest: Prods[] = [];
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
    },
    {
      prod: "Lapiz Artesco",
      cant: 2,
      price: 10.25,
      total: 20.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 10.25,
      total: 20.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
    {
      prod: "Lapiz Mongol",
      cant: 2,
      price: 0.25,
      total: 0.5,
    },
  ];

  user: string;
  client_ci: string;
  total = 0;
  selectedRow: number;
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
    const token = localStorage.getItem("token");
    // this.user = token.username;
  }

  removeProduct(prodRemoved: string) {
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
          (document.querySelector("#openModal") as HTMLElement)?.click();
        }
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
          this.dataTest[productIdx].total =
            this.dataTest[productIdx].cant * Number(resp.prod_price);
        } else {
          this.dataTest.push({
            cant: 1,
            prod: resp.prod_name,
            price: parseFloat(resp.prod_price),
            total: parseFloat(resp.prod_price),
          });
        }
        this.getTotalAmount();
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
    console.log(typeof event.target.value);
    this.dataTest[idx].total =
      this.dataTest[idx].cant * this.dataTest[idx].price;
    this.getTotalAmount();
  }

  changeFocus() {
    (document.querySelector("#code") as HTMLElement)?.focus();
  }

  printer() {
    // window.print();
    const doc = new jsPDF("p", "pt", "a5");
    let pageNumber = 0;
    let total = 0;
    let totalIva = 0;
    doc.setFontSize(9);
    const rows = [];
    this.data.forEach((elements) => {
      rows.push([elements.cant, elements.prod, elements.price, elements.total]);
    });

    doc.text("Roberth Torres", 25, 46);

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
        doc.text("Roberth Torres", 25, 46);
        doc.text(totalIva.toFixed(2).toString(), 315, 395);
        doc.text(total.toFixed(2).toString(), 315, 415);
        const cost = totalIva + total;
        doc.text(cost.toFixed(2).toString(), 315, 435);
        totalIva = 0;
        total = 0;
      },
      didDrawCell: (data) => {
        if (data.pageCount !== pageNumber) {
          if (data.column.index === 3) {
            pageNumber = data.pageNumber;
            total += Number(
              Number.parseFloat(data.row.cells[3].raw.toString()).toFixed(2)
            );

            this.data2.forEach((dataProds) => {
              if (dataProds.prod === data.row.cells[1].raw.toString()) {
                totalIva += dataProds.iva;
              }
            });
          }
        } else {
          if (data.column.index === 3) {
            total += Number(
              Number.parseFloat(data.row.cells[3].raw.toString()).toFixed(2)
            );
            this.data2.forEach((dataProds) => {
              if (dataProds.prod === data.row.cells[1].raw) {
                totalIva += dataProds.iva;
              }
            });
          }
        }
      },
    });
    doc.save("asd.pdf");
  }
}
