import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers.component';
import { NewProviderComponent } from './new-provider/new-provider.component';
import { ListingProvidersComponent } from './listing-providers/listing-providers.component';
import { HistoryComponent } from './history/history.component';
import { ViewProviderComponent } from './view-provider/view-provider.component';
import { OutOfDateComponent } from './out-of-date/out-of-date.component';

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent,
    children: [
      {
        path: 'new-provider',
        component: NewProviderComponent
      },
      {
        path: 'listing',
        component: ListingProvidersComponent
      },
      {
        path: 'out-of-date',
        component: OutOfDateComponent
      },
      {
        path: 'view/:provId',
        component: ViewProviderComponent
      },
      {
        path: 'history/:prov_id',
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
export class ProviderRoutingModule { }
