import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amount-given-modal',
  templateUrl: './amount-given-modal.component.html',
  styleUrls: ['./amount-given-modal.component.scss']
})
export class AmountGivenModalComponent implements OnInit {
  change: number;
  amountGiven: number;
  totalRetail: number;

  constructor() { }
  ngOnInit(): void {
  }

  private calculateChange() {
    this.change = this.amountGiven - this.totalRetail;
    this.change = Number(this.change.toFixed(2));
  }

  changeFocusModal() {
    (document.querySelector("#closeModalOk") as HTMLElement)?.focus();
  }

}
