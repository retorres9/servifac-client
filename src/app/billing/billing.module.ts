import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { BillingRoutingModule } from "./billing-routing.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchClientModalComponent } from './search-client-modal/search-client-modal.component';
import { AmountGivenModalComponent } from './amount-given-modal/amount-given-modal.component';
import { NewClientModalComponent } from './new-client-modal/new-client-modal.component';

@NgModule({
  declarations: [
    // SearchClientModalComponent,
    // AmountGivenModalComponent,
    // NewClientModalComponent
  ],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, BillingRoutingModule],
  exports: [],
})
export class BillingModule {}
