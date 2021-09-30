import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    children: [
      {
        path: "new-product",
        component: NewProductComponent
      },
      {
        path: "inventory",
        component: InventoryComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsRoutingModule { }
