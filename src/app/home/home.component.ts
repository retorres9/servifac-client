import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderService } from '../shared/components/header/header.service';
import { Router } from '@angular/router';
import { ProvidersService } from '../providers/providers.service';
import { ProductsService } from '../products/products.service';
import { SaleService } from '../sales/sale.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() showNotification = new EventEmitter<boolean>();
  constructor(private headerService: HeaderService,
    private router: Router,
    private providerService: ProvidersService,
    private productService: ProductsService,
    private saleService: SaleService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.headerService.show();
    this.headerService.setheaderTitle('Menú principal');
    this.providerService.getPurchasesAlarm().subscribe();
    this.productService.getProductWarning().subscribe();
    this.saleService.getSaleAlerts().subscribe();
    this.authService.getLoggedUser();
  }
  logout() {
    this.router.navigateByUrl('auth/login');
  }
}
