import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProvidersService } from "../providers.service";
import { Provider } from './../provider.model';

@Component({
  selector: "app-view-provider",
  templateUrl: "./view-provider.component.html",
  styleUrls: ["./view-provider.component.scss"],
})
export class ViewProviderComponent implements OnInit {
  provider?: Provider;
  maxDate: string;

  action: string;
  constructor(
    private aRoute: ActivatedRoute,
    private providerService: ProvidersService
  ) {}

  ngOnInit(): void {
    this.maxDate = new Date().toISOString().split('T')[0];

    this.aRoute.params.subscribe(({ provId }) => {
      this.providerService.getProvider(provId).subscribe(
        resp => {
          this.provider = resp;
          console.log(resp);
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

}
