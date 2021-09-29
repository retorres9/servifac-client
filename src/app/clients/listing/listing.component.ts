import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Client } from './../client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  client: Client[] = [];
  searchCriteria: string;
  constructor(private clientsService: ClientsService, private router: Router) { }

  ngOnInit(): void {
  }

  goToClient(ci: string) {
    this.router.navigateByUrl(`/clients/view-client/${ci}`);
  }

  searchClient(criteria: string) {
    this.clientsService.getClientByQuery(criteria).subscribe(
      resp => {
        this.client = resp
      }
    );

  }

}
