import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { ViewClientComponent } from './view-client/view-client.component';



@NgModule({
  declarations: [
    NewClientComponent,
    ListingComponent,
    ViewClientComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NewClientComponent
  ]
})
export class ClientsModule { }
