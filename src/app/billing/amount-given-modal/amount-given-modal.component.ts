import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-amount-given-modal',
  templateUrl: './amount-given-modal.component.html',
  styleUrls: ['./amount-given-modal.component.scss']
})
export class AmountGivenModalComponent implements OnInit {
  change: number;
  @Input() amountGiven: number;
  @Output() amountGivenChecker = new EventEmitter<number>();
  @Input() totalRetail: number;
  @Input()isFocused: boolean = false;

  constructor() { }
  ngOnInit(): void {

  }

  private calculateChange() {
    this.change = this.amountGiven - this.totalRetail;
    this.change = Number(this.change.toFixed(2));
    this.amountGivenChecker.emit(this.amountGiven);
  }

  changeFocusModal() {
    (document.querySelector("#closeModalOk") as HTMLElement)?.focus();
  }

}
