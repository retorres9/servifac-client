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
  constructor(private clientsService: ClientsService, private router: Router) { }

  ngOnInit(): void {
    this.clientsService.getClientDebtors().subscribe(
      resp => {
        this.client = resp;
      }

    );
  }

  goToClient(ci: string) {

    this.router.navigateByUrl(`/clients/view-client/${ci}`);
  }

}
