import { Component, OnInit } from '@angular/core';
import { SaleService } from '../sale.service';
import { SaleInfo } from '../models/sale-info.model';
import moduleName from '@angular/common/locales/es-EC';

@Component({
  selector: 'app-listing-sales',
  templateUrl: './listing-sales.component.html',
  styleUrls: ['./listing-sales.component.scss']
})
export class ListingSalesComponent implements OnInit {
  sales: SaleInfo[];
  date: any;
  constructor(private saleService: SaleService) { }

  ngOnInit() {
  }

  getSales() {
    if (!this.date) {
      console.log('bad');

    } else {
      this.saleService.getSales(this.date).subscribe(resp => {
        console.log(resp);
        this.sales = resp;
      });

    }
  }

}
