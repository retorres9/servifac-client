import { Component, Input, OnInit } from '@angular/core';
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
    },4000)
  }
}
