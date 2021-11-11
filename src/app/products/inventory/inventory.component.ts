import { Component, OnInit } from '@angular/core';
import { Product } from '../models/models';
import { ProductsService } from '../products.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  section: string = "Inventario";
  constructor(private productService: ProductsService) { }
  inventory: Product[];
  ngOnInit(): void {
  }

  searchProduct(searchCriteria: string) {
    this.productService.getProductsInventory(searchCriteria).subscribe(
      resp => {
        console.log(resp);

        this.inventory = resp;
      }
    );
  }
}
