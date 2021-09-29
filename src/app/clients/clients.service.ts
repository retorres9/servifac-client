import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Client } from "./client.model";
import { ClientSummary } from "./view-client/view-client.component";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  createClient(
    cli_ci: string,
    cli_first_name: string,
    cli_last_name: string,
    cli_email: string,
    cli_phone: string,
    cli_address: string,
    cli_debt?: string,
    cli_isActive?: boolean
  ) {
    const client = new Client();
    client.cli_ci = cli_ci;
    client.cli_firstName = cli_first_name;
    client.cli_lastName = cli_last_name;
    client.cli_email = cli_email;
    client.cli_phone = cli_phone;
    client.cli_debt = cli_debt;
    client.cli_isActive = cli_isActive;
    client.cli_address = cli_address;
    return this.http.post<Client>("http://127.0.0.1:3000/client/", client);
  }

  getClient(clientId) {
    return this.http.get<Client>(`http://127.0.0.1:3000/client/${clientId}`);
  }

  getClientSummary(clientId: string) {
    return this.http.get<ClientSummary>(`http://127.0.0.1:3000/client/summary/${clientId}`);
  }

  getClientDebtors() {
    return this.http.get<Client[]>('http://127.0.0.1:3000/client/debtors');
  }

  getClientByQuery(query: string) {
    const params = new HttpParams().set('name', query);
    return this.http.get<Client[]>(`http://127.0.0.1:3000/client`,{params});
  }
}
