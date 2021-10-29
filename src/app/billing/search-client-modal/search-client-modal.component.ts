import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Client, ClientInfo } from '../../clients/client.model';
import { ClientsService } from '../../clients/clients.service';

@Component({
  selector: 'app-search-client-modal',
  templateUrl: './search-client-modal.component.html',
  styleUrls: ['./search-client-modal.component.scss']
})
export class SearchClientModalComponent implements OnInit {
  searchTerm: string;
  clientsList: Client[];
  @Output() close = new EventEmitter<boolean>();
  @Output() selectedClient = new EventEmitter<string>();

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
    this.selectedClient.emit(selectedClient.cli_ci);
  }

  closeModal() {
    this.close.emit(true);
  }

}
