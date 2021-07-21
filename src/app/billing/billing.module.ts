import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { BillingRoutingModule } from "./billing-routing.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, BillingRoutingModule],
  exports: [],
})
export class BillingModule {}
