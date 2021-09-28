import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {
  summary: ClientSummary;
  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({ci}) => {
        this.clientService.getClientSummary(ci).subscribe(
          resp => {
            this.summary = resp;
            console.log(resp);

          }
        );
      }
    )
  }

}

export interface ClientSummary {
  cli_ci:        string;
  cli_firstName: string;
  cli_lastName:  string;
  cli_email:     string;
  cli_phone:     string;
  cli_address:   string;
  cli_debt:      string;
  cli_isActive:  boolean;
  sale:          Sale[];
}

export interface Sale {
  sale_id:          number;
  sale_totalRetail: string;
  sale_date:        Date;
}

