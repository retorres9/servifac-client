import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Provider } from "./provider.model";
import { Transaction } from './models/transaction.model';
import { History } from "./models/history.model";
import { Credit } from './models/credit.model';
import { AppConfig } from '../../environments/environment';
import { Purchase } from './models/purchase.model';
import { Purchases } from "./models/purchases.model";
import { Subject } from "rxjs";
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class ProvidersService {

  private _alarm$: Subject<number | Purchases[]> = new Subject<number | Purchases[]>();

  public get alarm$(): Subject<number | Purchases[]> {
    return this._alarm$;
  }



  constructor(private http: HttpClient) {}

  createProvider(
    prov_ruc: string,
    prov_name: string,
    prov_phone: string,
    prov_accountName: string,
    prov_accountNumber: string,
    prov_accountType: string,
    prov_debt: string
  ) {
    const provider = new Provider();
    provider.prov_ruc = prov_ruc;
    provider.prov_name = prov_name;
    provider.prov_phone = prov_phone;
    provider.prov_accountName = prov_accountName;
    provider.prov_accountNumber = prov_accountNumber;
    provider.prov_accountType = prov_accountType;
    provider.prov_debt = prov_debt;
    return this.http.post<Provider>(AppConfig.baseUrl + 'provider/', provider);
  }

  getProviders() {
    return this.http.get<Provider[]>(AppConfig.baseUrl + 'provider/');
  }

  postProviderMovement(transactionInfo: Transaction) {
    return this.http.post<Transaction>(AppConfig.baseUrl + 'provider-movement/', transactionInfo);
  }

  getProviderMovements(movement: string, ruc: string) {
    const params = new HttpParams().set('type', movement).set('provider', ruc);
    return this.http.get<History[]>(AppConfig.baseUrl + 'provider-movement', {params: params});
  }

  getProvider(ruc: string) {
    return this.http.get<Provider>(`${AppConfig.baseUrl}provider/${ruc}`);
  }

  postCredit(credit: Credit) {
    return this.http.post<Credit>(AppConfig.baseUrl + 'credit', credit);
  }

  postPurchase(purchaseInfo: Purchase) {
    return this.http.post(AppConfig.baseUrl + 'purchases', purchaseInfo);
  }

  getPurchases(from, to) {
    const query = new HttpParams().set('from', from).set('to', to)
    return this.http.get<Purchases[]>(AppConfig.baseUrl + 'purchases', {params: query});
  }

  getPurchasesAlarm(query?: string) {
    let params;
    if (query) {
      params = new HttpParams().set('select', 'true')
    }
    return this.http.get<number | Purchases[]>(AppConfig.baseUrl + 'purchases/alarm', {params}).pipe(
      tap(resp => {
        this._alarm$.next(resp);
      })
    );
  }
}
