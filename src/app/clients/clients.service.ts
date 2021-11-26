import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Client, ClientInfo } from "./client.model";
import { ClientSummary } from "./view-client/view-client.component";
import { CreditData } from "./view-client/auth-credit/model/credit-data.model";
import { ClientMovement } from "./client-movement.model";
import { History } from "./models/history.model";
import { AppConfig } from "../../environments/environment.dev";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  createClient(client: Client) {
    return this.http.post<Client>(AppConfig.baseUrl + "client/", client);
  }

  updateClient(client: Client) {
    return this.http.patch<Client>(AppConfig.baseUrl + "client/", {
      ...client,
    });
  }

  getClient(clientId) {
    return this.http.get<ClientInfo>(`${AppConfig.baseUrl}client/${clientId}`);
  }

  getClientSummary(clientId: string) {
    return this.http.get<ClientSummary>(
      `${AppConfig.baseUrl}client/summary/${clientId}`
    );
  }

  getClientDebtors() {
    return this.http.get<Client[]>(AppConfig.baseUrl + "client/debtors");
  }

  getClientByQuery(query: string) {
    const params = new HttpParams().set("name", query);
    return this.http.get<Client[]>(`${AppConfig.baseUrl}client`, { params });
  }

  postCreditAuthorization(creditData: CreditData) {
    return this.http.post<boolean>(AppConfig.baseUrl + "credit", creditData);
  }

  postClientMovement(clientMovement: ClientMovement) {
    return this.http.post<ClientMovement>(
      AppConfig.baseUrl + "client-movement",
      clientMovement
    );
  }

  getHistory(client_ci: string) {
    return this.http.get<History[]>(
      `${AppConfig.baseUrl}client-movement/${client_ci}`
    );
  }
}
