import { Component, OnInit } from "@angular/core";
import { ClientsService } from "../clients.service";
import { Client } from "./../client.model";
import { Router } from "@angular/router";
import { HeaderService } from "../../shared/components/header/header.service";

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.scss"],
})
export class ListingComponent implements OnInit {
  client: Client[] = [];
  searchCriteria: string;
  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle('Listado de clientes');
  }

  ngAfterViewChecked(): void {
    (document.querySelector("#search") as HTMLElement)?.focus();
  }

  goToClient(ci: string) {
    this.router.navigateByUrl(`/clients/view-client/${ci}`);
  }

  toEditClient(client) {
    this.router.navigateByUrl(`/clients/new-client/${client}`);
  }

  goToHistory(client_ci: string, firstName: string, lastName: string) {
    this.router.navigateByUrl(
      `/clients/history/${client_ci}/${firstName}/${lastName}`
    );
  }

  searchClient(criteria: string) {
    console.log(criteria);

    this.clientsService.getClientByQuery(criteria).subscribe((resp) => {
      this.client = resp;
      console.log(resp.length);
    });
  }
}
