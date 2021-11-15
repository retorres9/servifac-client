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
import { SaleInfo } from '../../../sales/models/sale-info.model';
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  alert: boolean;
  saleAlert: boolean;
  user: string;

  isChange: boolean = false;

  @Input() tab: string;
  constructor(
    private router: Router,
    private productService: ProductsService,
    private eRef: ElementRef,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    const credentials: CredentialsJwt = jwt_decode(token);
    this.user = credentials.user_username;
    this.productService
      .getProductWarning()
      .subscribe((resp) => (this.alert = resp));
    this.saleService.getSaleAlerts().subscribe(
      resp => {
        resp.length > 0 ? this.saleAlert = true : this.saleAlert = false;
        console.log(this.saleAlert);

      }
    );
  }

  @HostListener("document:click", ["$event"])
  closeNotifications(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      console.log("in");
    } else {
      this.isChange = false;
    }
  }
  toggleNotifications() {
    this.isChange = !this.isChange;
    console.log(this.isChange);
  }

  goToMinimums() {
    this.router.navigateByUrl("products/minimums");
  }

  goToOutOfDate() {
    this.router.navigateByUrl("sales/out-of-date");
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("auth/login");
  }
}
