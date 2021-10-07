import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../billing/models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  getSaleById(saleId: string) {
    return this.http.get<Sale>(`http://127.0.0.1:3000/sale/${saleId}`);
  }
}
