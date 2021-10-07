import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewSaleComponent } from './view-sale/view-sale.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view/:id',
        component: ViewSaleComponent
      },
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
