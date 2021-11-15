import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewSaleComponent } from './view-sale/view-sale.component';
import { ListingSalesComponent } from './listing-sales/listing-sales.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listing',
        component: ListingSalesComponent
      },
      {
        path: 'view/:id/:client',
        component: ViewSaleComponent
      },
      {
        path: 'out-of-date',
        component: OutOfDateComponent
      }
      // {
      //   path: '**',
      //   redirectTo:
      // }
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
export class SalesRoutingModule { }
