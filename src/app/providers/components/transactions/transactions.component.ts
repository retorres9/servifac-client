import { Component, Input, OnInit } from '@angular/core';
import { Credit } from '../../models/credit.model';
import { Transaction } from '../../models/transaction.model';
import { ProvidersService } from '../../providers.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @Input() action: string;
  type: string = "money";
  amount: number;
  description: string;

  alertType: string;
  message: string;
  isAlert: boolean;

  constructor(private providerService: ProvidersService) { }

  ngOnInit(): void {
  }

  postTransaction() {
    this.action === 'CREDITO' ? this.postCredit(): this.postPayment();
  }

  postCredit() {
    const credit = new Credit(this.amount, this.amount, this.description, '1231231231', '1105970717')
    this.providerService.postCredit(credit);
  }

  postPayment() {
    const transaction = new Transaction(
      this.amount,
      this.action,
      '1112321321231',
      this.description,
      this.type);
      if (this.action === 'CREDITO') {
        transaction.pmv_type = null;
      }
    this.providerService.postProviderMovement(transaction).subscribe(
      resp => {
        this.showAlert('alert-success', 'Transacción procesada correctamente')
      }, err => {
        this.showAlert('alert-danger', 'Hubo un problema en la transacción')
      }
    );
  }

  private showAlert(type: string, message: string) {
    this.alertType = type;
    this.message = message;
    this.isAlert = true;
    setTimeout(() => {
      this.isAlert = false;
    },4000);
  }
}
