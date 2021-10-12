import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from './models/sale.model';
import { SaleInfo } from './models/sale-info.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  getSaleById(saleId: string) {
    return this.http.get<Sale>(`http://127.0.0.1:3000/sale/${saleId}`);
  }

  getSales() {
    return this.http.get<SaleInfo[]>('http://127.0.0.1:3000/sale/listing');
  }
}
