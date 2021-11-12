import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  client: string;
  history: History[];
  constructor(private aRoute: ActivatedRoute, private clientservice: ClientsService) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(({ci, firstName, lastName}) => {
      this.client = `${firstName} ${lastName}`;
      this.clientservice.getHistory(ci).subscribe(resp => {
        this.history = resp;
      })
    });
  }

}

interface History {
  clp_id:     number;
  clp_amount: string;
  clm_type:   string;
  clp_date:   Date;
  // client:     Client;
}
