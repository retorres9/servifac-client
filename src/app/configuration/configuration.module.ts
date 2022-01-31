import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CategoriesComponent } from './categories/categories.component';
import { LocationsComponent } from './locations/locations.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfigurationComponent,
    CompanyInfoComponent,
    CategoriesComponent,
    LocationsComponent,
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationModule { }
