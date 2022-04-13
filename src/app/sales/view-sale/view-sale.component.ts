import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Sale } from "../models/sale.model";
import { SaleService } from "../sale.service";
import { HeaderService } from '../../shared/components/header/header.service';

@Component({
  selector: "app-view-sale",
  templateUrl: "./view-sale.component.html",
  styleUrls: ["./view-sale.component.scss"],
})
export class ViewSaleComponent implements OnInit {
  sale: Sale;
  client: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private saleService: SaleService,
    private headerService: HeaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.headerService.setheaderTitle('Vista de la venta')
    this.activatedRoute.params.subscribe(({ id, client }) => {
      this.saleService.getSaleById(id).subscribe((resp) => {
        this.sale = resp;
        this.client = client;
      });
    });
  }

  goToListingSales() {
    this.router.navigateByUrl('sales/listing');
  }
}
