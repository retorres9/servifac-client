import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Provider } from "./provider.model";
import { Transaction } from './models/transaction.model';
import { History } from "./models/history.model";
import { Credit } from './models/credit.model';

@Injectable({
  providedIn: "root",
})
export class ProvidersService {

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
    return this.http.post<Provider>('http://127.0.0.1:3000/provider/', provider);
  }

  getProviders() {
    return this.http.get<Provider[]>('http://127.0.0.1:3000/provider/');
  }

  postProviderMovement(transactionInfo: Transaction) {
    console.log(transactionInfo);
    return this.http.post<Transaction>('http://127.0.0.1:3000/provider-movement/', transactionInfo);
  }

  getProviderMovements(movement: string, ruc: string) {
    const params = new HttpParams().set('type', movement).set('provider', ruc);
    return this.http.get<History[]>('http://127.0.0.1:3000/provider-movement', {params: params});
  }

  getProvider(ruc: string) {
    return this.http.get<Provider>(`http://127.0.0.1:3000/provider/${ruc}`);
  }

  postCredit(credit: Credit) {
    console.log(credit);
    return;
    return this.http.post<Credit>('http://127.0.0.1:3000/credit', credit);
  }
}
