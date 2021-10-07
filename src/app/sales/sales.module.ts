import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSaleComponent } from './view-sale/view-sale.component';
import { SalesComponent } from './sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ViewSaleComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule
  ]
})
export class SalesModule { }
