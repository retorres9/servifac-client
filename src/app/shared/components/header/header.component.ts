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
import { SaleService } from "../../../sales/sale.service";
import { ProvidersService } from "../../../providers/providers.service";
import { Purchases } from "../../../providers/models/purchases.model";
import { Observable } from "rxjs";
import { HeaderService } from "./header.service";
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  alert: boolean = true;
  saleAlert: boolean;
  user$: Observable<string>;
  purchaseAlert: number | Purchases[];
  isChange: boolean = false;
  isExecuted: boolean = false;
  isLoggedIn$: Observable<boolean>;
  setProductAlarm$: Observable<any>;
  setProviderAlarm$: Observable<any>;
  setSaleAlarm$: Observable<any>;
  isVisible: boolean;
  numb: any;

  isClosingSession = false;

  @Input() tab: string;
  constructor(
    private router: Router,
    private productService: ProductsService,
    private eRef: ElementRef,
    private saleService: SaleService,
    private providerService: ProvidersService,
    private headerService: HeaderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isVisible = this.headerService.isVisible;
    this.isLoggedIn$ = this.headerService.getIsLoggedIn$();
    this.user$ = this.authService.loggedUser$;
    this.requestAlarms();
  }

  @HostListener("document:click", ["$event"])
  closeNotifications(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      console.log("in");
    } else {
      this.isChange = false;
    }
  }

  requestAlarms() {
    console.log('requstiong alarm');

    this.setProductAlarm$ = this.productService.isAlarm$;
    this.setSaleAlarm$ = this.saleService.alertInfo$;
    this.setProviderAlarm$ = this.providerService.alarm$;
    this.headerService.headerTitle().subscribe((newTitle) => {
      this.tab = newTitle;
    });
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
    this.router.navigateByUrl("provider/out-of-date");
  }

  onLogout() {
    this.isClosingSession = true;
    // localStorage.removeItem("token");
    this.router.navigate(["auth", "login"]);
  }

  toggle() {
    console.log("asdaskjdaksjdh");
  }
}
