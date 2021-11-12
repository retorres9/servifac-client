import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Client, ClientInfo } from "./client.model";
import { ClientSummary } from "./view-client/view-client.component";
import { CreditData } from "./view-client/auth-credit/model/credit-data.model";
import { ClientMovement } from "./client-movement.model";
import { History } from './models/history.model';

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  createClient(client: Client
  ) {
    return this.http.post<Client>("http://127.0.0.1:3000/client/", client);
  }

  updateClient(client: Client
  ) {
    return this.http.patch<Client>('http://127.0.0.1:3000/client/', {...client});
  }

  getClient(clientId) {
    return this.http.get<ClientInfo>(
      `http://127.0.0.1:3000/client/${clientId}`
    );
  }

  getClientSummary(clientId: string) {
    return this.http.get<ClientSummary>(
      `http://127.0.0.1:3000/client/summary/${clientId}`
    );
  }

  getClientDebtors() {
    return this.http.get<Client[]>("http://127.0.0.1:3000/client/debtors");
  }

  getClientByQuery(query: string) {
    const params = new HttpParams().set("name", query);
    return this.http.get<Client[]>(`http://127.0.0.1:3000/client`, { params });
  }

  postCreditAuthorization(creditData: CreditData) {
    return this.http.post<boolean>("http://127.0.0.1:3000/credit", creditData);
  }

  postClientMovement(clientMovement: ClientMovement) {
    return this.http.post<ClientMovement>(
      "http://127.0.0.1:3000/client-movement",
      clientMovement
    );
  }

  getHistory(client_ci: string) {
    return this.http.get<History[]>(`http://127.0.0.1:3000/client-movement/${client_ci}`);
  }
}
