import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Client } from '../../clients/client.model';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-search-client-modal',
  templateUrl: './search-client-modal.component.html',
  styleUrls: ['./search-client-modal.component.scss']
})
export class SearchClientModalComponent implements OnInit {
  searchTerm: string;
  clientsList: Client;

  @Output() selectedClient = new EventEmitter<Client>();

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
  }

  searchClient() {
    this.clientService.getClientByQuery(this.searchTerm).subscribe(
      resp => this.clientsList = resp
    );
  }

  doubleClick(selectedClient: Client) {
    const client = new Client();
    client.cli_ci = selectedClient.cli_ci;
    client.cli_address = selectedClient.cli_address;
    client.cli_firstName = selectedClient.cli_firstName;
    client.cli_lastName = selectedClient.cli_lastName;
    client.cli_phone = selectedClient.cli_phone;
    this.selectedClient.emit({...client});
  }

}
