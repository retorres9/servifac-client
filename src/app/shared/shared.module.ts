import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { PageNotFoundComponent } from "./components/";
import { WebviewDirective } from "./directives/";
import { FormsModule } from "@angular/forms";
import { SidedrawComponent } from "./components/sidedraw/sidedraw.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { AmountComponent } from "./components/amount/amount.component";
import { CreationModalComponent } from './components/creation-modal/creation-modal.component';
import { WatchComponent } from './components/watch/watch.component';
import { QuantityProdComponent } from './components/quantity-prod/quantity-prod.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    SidedrawComponent,
    HeaderComponent,
    LoaderComponent,
    AmountComponent,
    CreationModalComponent,
    WatchComponent,
    QuantityProdComponent,
    CustomModalComponent,
  ],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    SidedrawComponent,
    HeaderComponent,
    LoaderComponent,
    AmountComponent,
    CreationModalComponent,
    WatchComponent,
    QuantityProdComponent,
    CustomModalComponent
  ],
})
export class SharedModule { }
