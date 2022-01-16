import { Component, OnInit } from "@angular/core";
import { SaleService } from "../sale.service";
import { SaleInfo } from "../models/sale-info.model";
import { HeaderService } from "../../shared/components/header/header.service";

@Component({
  selector: "app-out-of-date",
  templateUrl: "./out-of-date.component.html",
  styleUrls: ["./out-of-date.component.scss"],
})
export class OutOfDateComponent implements OnInit {
  outOfDateSales: SaleInfo[];
  constructor(
    private saleService: SaleService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle("Deudas por cobrar vencidas");
    this.saleService.alertInfo$.subscribe((resp) => {
      this.outOfDateSales = resp;
    });
  }
}
