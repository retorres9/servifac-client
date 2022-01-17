import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Purchases } from "../models/purchases.model";
import { ProvidersService } from "../providers.service";
import { Provider } from './../provider.model';
import { HeaderService } from '../../shared/components/header/header.service';

@Component({
  selector: "app-view-provider",
  templateUrl: "./view-provider.component.html",
  styleUrls: ["./view-provider.component.scss"],
})
export class ViewProviderComponent implements OnInit {
  provider?: Provider;
  maxDate: string;
  from: string;
  to: string;

  purchases: Purchases[];

  action: string;
  constructor(
    private aRoute: ActivatedRoute,
    private providerService: ProvidersService,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle('Vista del proveedor');
    this.maxDate = new Date().toISOString().split('T')[0];

    this.aRoute.params.subscribe(({ provId }) => {
      this.providerService.getProvider(provId).subscribe(
        resp => {
          this.provider = resp;
        }
      );
    });
  }

  payment() {
    this.action = "PAGO";
  }

  credit() {
    this.action = "CREDITO";
  }

  searchPurchases() {
    if (this.from && this.to) {
      this.providerService.getPurchases(this.from, this.to).subscribe(resp => {
        this.purchases = resp;
      });
    }
  }

  goToListingProv() {
    this.router.navigateByUrl('provider/listing');
  }

}
