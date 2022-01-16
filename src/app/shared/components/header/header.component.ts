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
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    this.isVisible = this.headerService.isVisible;
    this.isLoggedIn$ = this.headerService.getIsLoggedIn$();


    const credentials: CredentialsJwt = jwt_decode(token);
    this.user = credentials.user_username;
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
    this.productService
        .isAlarm$.subscribe((resp) => (this.alert = resp));
      this.saleService.alertInfo.subscribe(
        resp => {
          resp.length > 0 ? this.saleAlert = true : this.saleAlert = false;
        });
      this.providerService.getPurchasesAlarm().subscribe(
        resp => {
          this.purchaseAlert = resp;
        });
        this.providerService.alarm$.subscribe(resp => {
          this.numb = resp;
        });
      this.headerService.headerTitle().subscribe(
        newTitle => {
          this.tab = newTitle
        }
      )
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
    this.isClosingSession = true;
    // localStorage.removeItem("token");
    this.router.navigate(["auth", "login"]);
  }

  toggle() {
    console.log('asdaskjdaksjdh');

  }
}
