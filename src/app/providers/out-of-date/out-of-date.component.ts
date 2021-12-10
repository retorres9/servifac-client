import { Component, OnInit } from '@angular/core';
import { Purchases } from '../models/purchases.model';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-out-of-date',
  templateUrl: './out-of-date.component.html',
  styleUrls: ['./out-of-date.component.scss']
})
export class OutOfDateComponent implements OnInit {
  purchases: number | Purchases[];
  constructor(private providerService: ProvidersService) { }

  ngOnInit(): void {
    this.providerService.getPurchasesAlarm('true').subscribe(
      resp => {
        this.purchases = resp;
      }
    );
  }

}
