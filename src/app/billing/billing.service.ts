import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from './models/sale.model';
import { tap } from 'rxjs/operators';
import { AppConfig } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private _amountGiven = null;
  public get amountGiven() {
    return this._amountGiven;
  }
  public set amountGivens(value) {
    this._amountGiven = value;
  }

  constructor(private http: HttpClient) { }

  setAmountGiven(value: number | null) {
    this.amountGivens(value);
  }
  onNewSale(sale: Sale) {
    return this.http.post(AppConfig.baseUrl + 'sale', sale);
  }
}
