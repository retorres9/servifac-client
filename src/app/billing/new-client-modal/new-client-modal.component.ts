import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-client-modal',
  templateUrl: './new-client-modal.component.html',
  styleUrls: ['./new-client-modal.component.scss']
})
export class NewClientModalComponent implements OnInit {
  newClientForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.newClientForm = new FormGroup({
      cli_firstName: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      cli_ci: new FormControl("", {
        updateOn: "change",
        validators: [
          Validators.minLength(10),
          Validators.maxLength(13),
          Validators.required,
        ],
      }),
      cli_lastName: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      cli_phone: new FormControl("", {
        updateOn: "change",
        validators: [Validators.minLength(10)],
      }),
      cli_email: new FormControl("", {
        updateOn: "change",
        validators: [
          Validators.required,
        ],
      }),
      cli_address : new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

}
