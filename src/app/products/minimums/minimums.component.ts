import { Component, OnInit } from '@angular/core';
import { Product } from '../models/models';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-minimums',
  templateUrl: './minimums.component.html',
  styleUrls: ['./minimums.component.scss']
})
export class MinimumsComponent implements OnInit {
  products: Product[];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProductMinimums().subscribe(
      resp => this.products = resp
    )
  }

}
