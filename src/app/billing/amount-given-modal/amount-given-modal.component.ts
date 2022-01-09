import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-amount-given-modal',
  templateUrl: './amount-given-modal.component.html',
  styleUrls: ['./amount-given-modal.component.scss']
})
export class AmountGivenModalComponent implements OnInit {
  @Input() change: number;
  @Input() amountGiven: number;
  @Output() amountGivenChecker = new EventEmitter<number>();
  @Input() totalRetail: number;
  @Output() print = new EventEmitter<number>();

  constructor() { }
  ngOnInit(): void {

  }

  resetChange() {
    let auxChange = this.change;
    this.amountGivenChecker.emit(auxChange);
    this.change = null;
    this.print.emit(auxChange);
  }
  calculateChange() {
    this.change = this.amountGiven - this.totalRetail;
    this.change = Number(this.change.toFixed(2));
    this.amountGivenChecker.emit(this.amountGiven);
  }

  changeFocusModal() {
    if (this.change < 0) {
      return;
    } else {
      (document.querySelector("#closeModalOk") as HTMLElement)?.focus();
    }
  }

}
