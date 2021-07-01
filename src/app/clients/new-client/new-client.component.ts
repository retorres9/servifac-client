import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from './../client.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  new_client_form: FormGroup;
  message: string;
  alert: boolean = false;
  type: string;
  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.new_client_form = new FormGroup({
      cli_firstName: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      cli_ci: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.minLength(10), Validators.maxLength(13), Validators.required]
      }),
      cli_lastName: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      cli_phone: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.minLength(10)]
      }),
      cli_debt: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.min(0)]
      }),
      cli_email: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )]
      })
    })
  }

  onPostClient() {
    if (this.new_client_form.invalid) {
      return;
    }
    return this.clientsService.createClient(
      this.new_client_form.value.cli_ci,
      this.new_client_form.value.cli_firstName,
      this.new_client_form.value.cli_lastName,
      this.new_client_form.value.cli_email,
      this.new_client_form.value.cli_phone,
      this.new_client_form.value.cli_debt
    ).subscribe(
      resp => {
        this.alert = true;
        this.message = 'Cliente creado satisfactoriamente';
        this.type = 'alert-success'
        this.new_client_form.reset();
        (document.querySelector('#ci') as HTMLElement)?.focus();
        setTimeout(() => {
          this.alert = false;
        }, 5000)
      }, error => {
        console.log(error);
        this.alert = true;
        this.message = error.error.message;
        this.type = 'alert-danger';
        setTimeout(() => {
          this.alert = false;
        }, 5000)
      }
    );

  }

}
