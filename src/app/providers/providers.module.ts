import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersComponent } from './providers.component';
import { ProviderRoutingModule } from './provider-routing.module';
import { RouterModule } from '@angular/router';
import { NewProviderComponent } from './new-provider/new-provider.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NewProviderComponent
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
