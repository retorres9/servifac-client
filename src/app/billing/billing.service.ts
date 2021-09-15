import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from './models/sale.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  onNewSale(sale: Sale) {
    return this.http.post('http://127.0.0.1:3000/sale', sale).pipe(
      tap(resp => console.log(resp))
    );
  }
}
