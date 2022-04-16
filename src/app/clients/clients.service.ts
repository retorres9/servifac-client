import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Client, ClientInfo } from "./client.model";
import { ClientSummary } from "./view-client/view-client.component";
import { CreditData } from "./view-client/auth-credit/model/credit-data.model";
import { ClientMovement } from "./client-movement.model";
import { History } from "./models/history.model";
import { AppConfig } from "../../environments/environment";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  private _clientsSearched$: BehaviorSubject<Client[]> = new BehaviorSubject<
    Client[]
  >([]);

  get clientsSearched() {
    return this._clientsSearched$.asObservable();
  }

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
    return this.http
      .get<Client[]>(`${AppConfig.baseUrl}client`, { params })
      .pipe(
        map((resp) => {
          const clients = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              const client = new Client();
              (client.cli_address = resp[key].cli_address),
                (client.cli_ci = resp[key].cli_ci);
              client.cli_firstName = resp[key].cli_firstName;
              client.cli_lastName = resp[key].cli_lastName;
              client.cli_email = resp[key].cli_email;
              client.cli_phone = resp[key].cli_phone;
              client.cli_debt = resp[key].cli_debt;
              client.cli_isActive = resp[key].cli_isActive;
              client.cli_credit = resp[key].cli_credit;
              clients.push(client);
            }
          }

          return clients;
        }),
        tap((clients) => {
          return this._clientsSearched$.next(clients);
        })
      );
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
