import { Component, OnInit } from "@angular/core";
import { Product } from "../models/models";
import { ProductsService } from "../products.service";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { HeaderService } from "../../shared/components/header/header.service";

@Component({
  selector: "app-minimums",
  templateUrl: "./minimums.component.html",
  styleUrls: ["./minimums.component.scss"],
})
export class MinimumsComponent implements OnInit {
  products: Product[];
  constructor(
    private productService: ProductsService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle("Productos por debajo del mínimo");
    this.productService
      .getProductMinimums()
      .subscribe((resp) => (this.products = resp));
  }

  printMinimums() {
    const rows = [];
    const document = new jsPDF("p", "cm", "a4");
    document.setFontSize(10);
    document.text("Productos debajo del mínimo", 8, 1);
    this.products.forEach((product) => {
      rows.push([
        product.prod_code,
        product.prod_name,
        product.prod_quantity,
        product.prod_minQuantity,
      ]);
    });
    autoTable(document, {
      body: rows,
      columns: ["Código", "Producto", "Cantidad", "Cantidad Mínima"],
    });
    document.save("minimums.pdf");
  }
}
