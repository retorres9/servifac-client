import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { HomeModule } from "./home/home.module";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { ProductsComponent } from "./products/products.component";
import { BillingRoutingModule } from "./billing/billing-routing.module";
import { BillingComponent } from "./billing/billing.component";
import { ClientsComponent } from "./clients/clients.component";
import { ProvidersComponent } from "./providers/providers.component";
import { SpinnersAngularModule } from "spinners-angular";
import { SearchClientModalComponent } from "./billing/search-client-modal/search-client-modal.component";
import { AmountGivenModalComponent } from './billing/amount-given-modal/amount-given-modal.component';
import { NewClientModalComponent } from './billing/new-client-modal/new-client-modal.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    ProductsComponent,
    BillingComponent,
    ClientsComponent,
    ProvidersComponent,
    SearchClientModalComponent,
    AmountGivenModalComponent,
    NewClientModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    BillingRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SpinnersAngularModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
