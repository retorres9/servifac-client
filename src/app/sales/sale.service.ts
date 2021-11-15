import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sale } from './models/sale.model';
import { SaleInfo } from './models/sale-info.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private _alertInfo = new BehaviorSubject<SaleInfo[]>([]);
  public get alertInfo() {
    return this._alertInfo.asObservable();
  }
  constructor(private http: HttpClient) { }

  getSaleById(saleId: string) {
    return this.http.get<Sale>(`http://127.0.0.1:3000/sale/${saleId}`);
  }

  getSales(dateSearched) {
    const params = new HttpParams().set('date', dateSearched);
    return this.http.get<SaleInfo[]>('http://127.0.0.1:3000/sale/listing', {params});
  }

  getSaleAlerts() {
    const alertInfo = [];
    const asd = new SaleInfo();
    return this.http.get<SaleInfo[]>('http://127.0.0.1:3000/sale/alert').pipe(
      map( resp => {
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            asd.sale_id = resp[key].sale_id;
            asd.sale_totalPayment = resp[key].sale_totalPayment;
            asd.sale_totalRetail = resp[key].sale_totalRetail;
            asd.sale_date = resp[key].sale_date;
            asd.sale_maxDate = resp[key].sale_maxDate;
            asd.sale_client = resp[key].sale_client;
            let date1 = new Date().toISOString().split('T')[0];
            let today = new Date(date1).getTime();
            let date2 = new Date(resp[key].sale_maxDate).getTime();
            let diff = date2 - today;
            asd.sale_delay = diff/(1000*3600*24);

          }
          alertInfo.push({...asd});
        }
        // resp.forEach(el => {
        // });
        return alertInfo;
      }), tap((alertInfo)=> {
        return this._alertInfo.next(alertInfo);
      })
    );
  }
}
