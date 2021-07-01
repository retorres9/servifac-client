import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Client } from './../client.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  client: Client[] = [];
  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.clientsService.getClientDebtors().subscribe(
      resp => {
        console.log(resp);

        this.client = resp
        console.log(this.client);

      }

    );
  }

}
