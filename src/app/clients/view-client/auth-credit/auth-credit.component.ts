import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ClientsService } from "../../clients.service";
import { CreditData } from "./model/credit-data.model";

@Component({
  selector: "app-auth-credit",
  templateUrl: "./auth-credit.component.html",
  styleUrls: ["./auth-credit.component.scss"],
})
export class AuthCreditComponent implements OnInit {
  isRequesting: boolean = false;
  @Input() client_ci: string;
  amount: number;
  @Output() amountOutput = new EventEmitter<number>();

  isCreditApproved: boolean = false;
  isAlert: boolean;
  alertType: string;
  message: string;

  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {}

  postCredit() {
    if (!this.amount) {
      return;
    }
    if (this.isCreditApproved) {
      this.amountOutput.emit(this.amount);
      this.amount = null;
      this.createAlert(null, null);
    } else {
      const creditData = new CreditData();
      creditData.userId = this.client_ci;
      creditData.amount = this.amount;
      this.isRequesting = true;
      this.clientService
        .postCreditAuthorization({ ...creditData })
        .subscribe((resp) => {
          this.isCreditApproved = resp;
          this.isCreditApproved
            ? this.createAlert("alert-success", "Credito aprobado")
            : this.createAlert("alert-danger", "Credito denegado");
          this.isRequesting = false;
        }, err => {
          this.createAlert('alert-danger', 'Ha ocurrido un error');
        });
    }
  }

  createAlert(type: string, message: string) {
    this.isAlert = true;
    this.alertType = type;
    this.message = message;
  }
}
