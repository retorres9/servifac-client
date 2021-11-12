import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ListingComponent } from './listing/listing.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    children: [
      {
        path: 'new-client',
        component: NewClientComponent
      },
      {
        path: 'listing',
        component: ListingComponent
      },
      {
        path: 'view-client/:ci',
        component: ViewClientComponent
      },
      {
        path: 'new-client/:ci',
        component: NewClientComponent
      },
      {
        path: 'history/:ci/:firstName/:lastName',
        component: HistoryComponent
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
export class ClientsRoutingModule { }
