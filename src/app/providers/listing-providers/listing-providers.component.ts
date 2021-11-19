import { Component, OnInit } from "@angular/core";
import { Provider } from "../provider.model";
import { ProvidersService } from "../providers.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-listing-providers",
  templateUrl: "./listing-providers.component.html",
  styleUrls: ["./listing-providers.component.scss"],
})
export class ListingProvidersComponent implements OnInit {
  providers: Provider[];
  action: string;

  constructor(
    private providerService: ProvidersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.providerService.getProviders().subscribe((resp) => {
      this.providers = resp;
    });
  }
  payment() {
    this.action = "PAGO";
  }

  credit() {
    this.action = "CREDITO";
  }

  goToHistory(prov_id) {
    this.router.navigateByUrl(`/provider/history/${prov_id}`);
  }
}
