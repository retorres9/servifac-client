import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderRoutingModule } from './provider-routing.module';
import { RouterModule } from '@angular/router';
import { NewProviderComponent } from './new-provider/new-provider.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListingProvidersComponent } from './listing-providers/listing-providers.component';
import { TransactionsComponent } from './components/transactions/transactions.component';



@NgModule({
  declarations: [
    NewProviderComponent,
    ListingProvidersComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProvidersModule { }
