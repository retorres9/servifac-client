import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { History } from "../models/history.model";
import { ProvidersService } from "../providers.service";
import { HeaderService } from "../../shared/components/header/header.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  providerRuc: string;
  movement: string = "NA";

  history: History[];
  constructor(
    private aRoute: ActivatedRoute,
    private providerService: ProvidersService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle("Historial del proveedor");
    this.aRoute.params.subscribe(({ prov_id }) => {
      this.providerRuc = prov_id;
    });
  }

  getProviderMovements() {
    if (this.movement !== "NA") {
      console.log(this.movement, this.providerRuc);

      this.providerService
        .getProviderMovements(this.movement, this.providerRuc)
        .subscribe((resp) => {
          this.history = resp;
        });
    }
  }
}
