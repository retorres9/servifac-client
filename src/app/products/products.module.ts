import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { MinimumsComponent } from './minimums/minimums.component';



@NgModule({
  declarations: [
    NewProductComponent,
    InventoryComponent,
    MinimumsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class ProductsModule { }
