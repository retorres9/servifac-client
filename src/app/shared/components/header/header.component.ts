import {
  Component,
  HostListener,
  Input,
  OnInit,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { CredentialsJwt } from "../../../auth/jwt-credentials.model";
import jwt_decode from "jwt-decode";
import { ProductsService } from "../../../products/products.service";
import { SaleService } from '../../../sales/sale.service';
import { ProvidersService } from '../../../providers/providers.service';
import { Purchases } from '../../../providers/models/purchases.model';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  alert: boolean;
  saleAlert: boolean;
  user: string;
  purchaseAlert: number | Purchases[];
  isChange: boolean = false;
  isExecuted: boolean = false;
  isLoggedIn$: Observable<boolean>;

  @Input() tab: string;
  constructor(
    private router: Router,
    private productService: ProductsService,
    private eRef: ElementRef,
    private saleService: SaleService,
    private providerService: ProvidersService,
    private authService: AuthService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    const credentials: CredentialsJwt = jwt_decode(token);
    this.user = credentials.user_username;
    this.isLoggedIn$ = this.authService.loggedIn;
    if (!this.isExecuted) {
      this.productService
        .getProductWarning()
        .subscribe((resp) => (this.alert = resp));
      this.saleService.getSaleAlerts().subscribe(
        resp => {
          resp.length > 0 ? this.saleAlert = true : this.saleAlert = false;
        });
      this.providerService.getPurchasesAlarm().subscribe(
        resp => {
          this.purchaseAlert = resp;
        });
      this.headerService.headerTitle().subscribe(
        newTitle => {
          this.tab = newTitle
        }
      )
    }


  }

  @HostListener("document:click", ["$event"])
  closeNotifications(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.isChange = false;
    }
  }
  toggleNotifications() {
    this.isChange = !this.isChange;
  }

  goToMinimums() {
    this.router.navigateByUrl("products/minimums");
  }

  goToOutOfDate() {
    this.router.navigateByUrl("sales/out-of-date");
  }
  goToOutOfDateProv() {
    this.router.navigateByUrl('provider/out-of-date')
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("auth/login");
  }
}
