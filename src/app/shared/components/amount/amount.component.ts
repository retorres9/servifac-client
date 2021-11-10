import { Component, Input, OnInit } from '@angular/core';
import { ClientsService } from '../../../clients/clients.service';
import { ClientMovement } from '../../../clients/client-movement.model';
import jsPDF from 'jspdf';
import jwt_decode from 'jwt-decode';
import { CredentialsJwt } from '../../../auth/jwt-credentials.model';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit {
  textDocument = {
    date: 'Fecha:',
    number: 'No.',
    receivedFrom: 'Recibido de:',
    concept: 'Concepto:',
    receivedBy: 'Recibido por:',
    quantity: 'Cantidad:',
    paymentMethod: 'Forma de pago:'
  }
  transaction: string = 'money';
  type: string;
  isProcessing: boolean = false;
  isTransactionOk: boolean = false;
  isAlert: boolean = false;
  alertType: string;
  alertMessage: string;
  amount: number;
  credentials: CredentialsJwt;
  @Input() user: UserInfo;
  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.credentials = jwt_decode(token);
  }

  processTransaction() {
    if (this.amount) {
      this.isProcessing = true;
      const clientMovement = new ClientMovement();
      clientMovement.cli_ci = this.user.ci;
      clientMovement.clm_amount = this.amount;
      clientMovement.clm_type = 'Pago';
      this.clientService.postClientMovement({...clientMovement}).subscribe(
        resp => {
          console.log(resp)
          this.isProcessing = false;
          this.isTransactionOk = true;
          this.generateAlert('alert-success', 'Transacción exitosa!');
          this.printDocument();
        }, err => {
          this.generateAlert('alert-danger', 'Error al procesar la transacción!');
          this.isProcessing = false;
        }
      );
    }
  }

  printDocument() {

    const todayDate = new Date().toLocaleString().split(' ')[0];
    const document = new jsPDF("l", 'cm', 'a5');
    document.setFontSize(11);
    document.setLineWidth(.05);
    // Date
    document.text(this.textDocument.date, 14.3, 3.5, {align: 'right'});
    document.text(todayDate, 14.8, 3.5);
    // Recived from
    document.text(this.textDocument.receivedFrom, 5.3, 5.5, {align: 'right'});
    document.text(`${this.user.firstName} ${this.user.lastName}`, 5.8, 5.5);
    document.line(5.7, 5.6, 18, 5.6);
    // Quantity
    document.text(this.textDocument.quantity, 5.3, 7, {align: 'right'});
    document.text(this.amount.toFixed(2), 5.8, 7);
    document.line(5.7, 7.1, 18, 7.1);
    // Concept
    document.text(this.textDocument.concept, 5.3, 8.5, {align: 'right'});
    document.text('Pago de deuda', 5.8, 8.5);
    document.line(5.7, 8.6, 18, 8.6);
    // Received for
    document.text(this.textDocument.receivedBy, 5.3, 10, {align: 'right'});
    document.text(this.credentials.user_username, 5.8, 10);
    document.line(5.7, 10.1, 8, 10.1);
    // Type
    document.text('Forma de pago:', 14.3, 10, {align: 'right'});
    document.text(`[ ${this.transaction === 'money' ? 'X' : ''} ] Efectivo`, 14.8, 10);
    document.text(`[ ${this.transaction === 'transfer' ? 'X' : ''} ] Transferencia`, 14.8, 10.5);
    document.text(`[ ${this.transaction === 'check' ? 'X' : ''} ] Cheque`, 14.8, 11);
    // Signature
    document.line(3.8, 13, 7.8, 13);
    document.text('Firma Autorizada', 4.3, 13.5);
    document.line(12.8, 13, 16.8, 13);
    document.text('Firma Cliente', 13.6, 13.5);
    document.save('document.pdf');
  }

  resetFields() {
    this.transaction = 'money';
    this.isAlert = false;
    this.isProcessing = false;
    this.isTransactionOk = false;
    this.amount = null
    console.log(this.transaction);

  }

  private generateAlert(type: string, message: string) {
    this.isAlert = true;
    this.alertType = type;
    this.alertMessage = message;
  }
}
interface UserInfo {
  ci: string;
  firstName: string;
  lastName: string;
}
