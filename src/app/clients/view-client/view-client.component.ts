import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ClientsService } from "../clients.service";

@Component({
  selector: "app-view-client",
  templateUrl: "./view-client.component.html",
  styleUrls: ["./view-client.component.scss"],
})
export class ViewClientComponent implements OnInit {
  summary: ClientSummary;
  hasCredit: boolean = false;
  hasDebt: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ ci }) => {
      this.clientService.getClientSummary(ci).subscribe((resp) => {
        this.summary = resp;
        console.log(resp.sale);

        if(Object.entries( this.summary.credit).length > 0) {
          this.hasCredit = true;
        } else {
          this.hasCredit = false;
        }

        this.hasDebt = this.summary.sale.some(sales => {
          return +sales.sale_totalPayment < +sales.sale_totalRetail;
        })
      });
    });
  }

  pagar() {
    console.log(this.summary);
    let salesToPay = [];
    this.summary.sale.forEach(el => {
      if(el.isSelected === true) {
        salesToPay.push(el.sale_id);
      }
    });
    console.log(salesToPay);


  }

  setFocusModal() {
    setTimeout(() => {
      (document.querySelector("#amount") as HTMLElement)?.focus();
    }, 500);
  }

  goToHistory(ci: string, firstName: string, lastName: string) {
    this.router.navigate(['clients', 'history', ci, firstName, lastName]);
  }

  goBack() {
    this.router.navigateByUrl('clients/listing');
  }

  private updateClientCredit(amount: number) {
    this.summary.credit.cre_amount = amount;
    this.hasCredit = true;
  }
}

export interface ClientSummary {
  cli_ci: string;
  cli_firstName: string;
  cli_lastName: string;
  cli_email: string;
  cli_phone: string;
  cli_address: string;
  cli_debt: string;
  cli_isActive: boolean;
  sale: Sale[];
  credit: Credit;
}

export interface Sale {
  sale_id: number;
  sale_totalRetail: string;
  sale_totalPayment: string;
  sale_date: Date;
  sale_maxDate: Date;
  isSelected?: boolean;
}

export interface Credit {
  cre_id: number,
  cre_amount: number,
  cre_used: number
}
