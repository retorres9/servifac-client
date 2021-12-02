import { Component, Input, OnInit } from '@angular/core';
import { Credit } from '../../models/credit.model';
import { Purchase } from '../../models/purchase.model';
import { Transaction } from '../../models/transaction.model';
import { ProvidersService } from '../../providers.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @Input() action: string;
  @Input() ruc: string;
  type: string = "money";
  amount: number;
  today: string;
  description: string;
  maxDate: string;

  alertType: string;
  message: string;
  isAlert: boolean;

  constructor(private providerService: ProvidersService) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
  }

  postTransaction() {
    this.action === 'CREDITO' ? this.postCredit(): this.postPayment();
  }

  postPurchase() {
    const purchase = new Purchase(this.amount, this.description, this.ruc, this.maxDate);
    this.providerService.postPurchase(purchase).subscribe(resp => {
      this.showAlert('alert-success', 'Compra registrada!');
    }, err => {
      console.log(err);
      this.showAlert('alert-danger', 'Asegurese de ingresar todos los datos');
    });
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
