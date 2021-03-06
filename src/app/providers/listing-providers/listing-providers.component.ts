import { Component, OnInit } from "@angular/core";
import { Provider } from "../provider.model";
import { ProvidersService } from "../providers.service";
import { Router } from "@angular/router";
import { HeaderService } from '../../shared/components/header/header.service';

@Component({
  selector: "app-listing-providers",
  templateUrl: "./listing-providers.component.html",
  styleUrls: ["./listing-providers.component.scss"],
})
export class ListingProvidersComponent implements OnInit {
  providers: Provider[];

  constructor(
    private providerService: ProvidersService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.headerService.setheaderTitle('Listado de proveedores')
    this.providerService.getProviders().subscribe((resp) => {
      this.providers = resp;
    });
  }

  goToHistory(prov_id) {
    this.router.navigateByUrl(`/provider/history/${prov_id}`);
  }

  goToViewProv(ruc: string) {
    this.router.navigateByUrl(`/provider/view/${ruc}`);
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
