import { Component, OnInit } from "@angular/core";
import { Purchases } from "../models/purchases.model";
import { ProvidersService } from "../providers.service";
import { HeaderService } from "../../shared/components/header/header.service";

@Component({
  selector: "app-out-of-date",
  templateUrl: "./out-of-date.component.html",
  styleUrls: ["./out-of-date.component.scss"],
})
export class OutOfDateComponent implements OnInit {
  purchases: number | Purchases[];
  constructor(
    private providerService: ProvidersService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle('Ventas por pagar vencidas');
    this.providerService.getPurchasesAlarm("true").subscribe((resp) => {
      this.purchases = resp;
    });
  }
}
