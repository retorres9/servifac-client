import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {
  @Input() modalVisible: boolean = false;
  @Output() redirectTo = new EventEmitter<boolean>();
  message: string = 'Password actualizada correctamente, presione aceptar para ser redirigido/a \n hacia el inicio de sesión';
  constructor() { }

  ngOnInit(): void {
  }

  onRedirectClick(value: boolean) {
    this.redirectTo.emit(value);
  }

}
