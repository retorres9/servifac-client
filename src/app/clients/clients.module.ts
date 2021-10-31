import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { AuthCreditComponent } from './view-client/auth-credit/auth-credit.component';



@NgModule({
  declarations: [
    NewClientComponent,
    ListingComponent,
    ViewClientComponent,
    AuthCreditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NewClientComponent
  ]
})
export class ClientsModule { }
