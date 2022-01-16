import { Component, OnInit } from "@angular/core";
import { SaleService } from "../sale.service";
import { SaleInfo } from "../models/sale-info.model";
import { Router } from "@angular/router";
import { HeaderService } from "../../shared/components/header/header.service";

@Component({
  selector: "app-listing-sales",
  templateUrl: "./listing-sales.component.html",
  styleUrls: ["./listing-sales.component.scss"],
})
export class ListingSalesComponent implements OnInit {
  sales: SaleInfo[];
  date: any;
  constructor(
    private saleService: SaleService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.headerService.setheaderTitle("Listado de ventas");
  }

  getSales() {
    if (this.date) {
      console.log("bad");
      this.saleService.getSales(this.date).subscribe((resp) => {
        this.sales = resp;
      });
    }
  }

  goToViewSale(saleId: number, firstName: string, lastName: string) {
    const name = `${firstName} ${lastName}`;
    this.router.navigateByUrl(`/sales/view/${saleId}/${name}`);
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
