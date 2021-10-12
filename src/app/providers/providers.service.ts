import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Provider } from "./provider.model";

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
}
