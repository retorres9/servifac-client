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
  @Output() print = new EventEmitter<boolean>();

  constructor() { }
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.change) {
      console.log(changes);
    // }
  }
  resetChange() {
    this.change = null;
    this.print.emit(true);
  }
  private calculateChange() {
    console.log(this.amountGiven);

    this.change = this.amountGiven - this.totalRetail;
    this.change = Number(this.change.toFixed(2));
    this.amountGivenChecker.emit(this.amountGiven);
  }

  changeFocusModal() {
    (document.querySelector("#closeModalOk") as HTMLElement)?.focus();
  }

}
