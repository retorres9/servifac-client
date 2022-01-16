import { Component, OnInit } from "@angular/core";
import { Product } from "../models/models";
import { ProductsService } from "../products.service";
import jsPDF from "jspdf";
import { HeaderService } from "../../shared/components/header/header.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  section: string = "Inventario";
  constructor(
    private productService: ProductsService,
    private headerService: HeaderService,
    private router: Router
  ) {}
  inventory: Product[];
  ngOnInit(): void {
    this.headerService.setheaderTitle("Inventario");
    setTimeout(() => {
      (document.querySelector("#search") as HTMLElement)?.focus();
    }, 100);
  }

  searchProduct(searchCriteria: string) {
    this.productService
      .getProductsInventory(searchCriteria)
      .subscribe((resp) => {
        this.inventory = resp;
      });
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
