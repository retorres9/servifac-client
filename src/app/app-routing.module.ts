import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './home/home-routing.module';
import { BillingRoutingModule } from './billing/billing-routing.module';
import { BillingComponent } from './billing/billing.component';
import { ProvidersComponent } from './providers/providers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'products',
    loadChildren: () => import('../app/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('../app/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'provider',
    component: ProvidersComponent,
    loadChildren: () => import('../app/providers/providers.module').then(m => m.ProvidersModule)
  },
  {
    path: 'billing',
    component: BillingComponent
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HomeRoutingModule,
    BillingRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
