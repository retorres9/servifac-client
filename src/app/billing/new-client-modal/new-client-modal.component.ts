import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Client } from "../../clients/client.model";
import { ClientsService } from "../../clients/clients.service";

@Component({
  selector: "app-new-client-modal",
  templateUrl: "./new-client-modal.component.html",
  styleUrls: ["./new-client-modal.component.scss"],
})
export class NewClientModalComponent implements OnInit {
  newClientForm: FormGroup;
  @Output() close = new EventEmitter<boolean>();
  @Output() client = new EventEmitter<Client>();
  error: boolean = false;
  constructor(private clientService: ClientsService) {}

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
        validators: [Validators.required],
      }),
      cli_address: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
    });
  }

  onPostClient() {
    if (this.newClientForm.invalid) {
      return;
    }
    const formValue = this.newClientForm.value;
    const client = new Client();
    client.cli_ci = formValue.cli_ci;
    client.cli_firstName = formValue.cli_firstName;
    client.cli_lastName = formValue.cli_lastName;
    client.cli_email = formValue.cli_email;
    client.cli_phone = formValue.cli_phone;
    client.cli_address = formValue.cli_address;
    this.clientService
      .createClient(
        {...client}
      )
      .subscribe(
        (resp) => {
          let client = new Client();
          client.cli_firstName = `${resp.cli_firstName}`;
          client.cli_lastName = resp.cli_lastName;
          client.cli_phone = resp.cli_phone;
          client.cli_address = resp.cli_address;
          client.cli_ci = resp.cli_ci;
          this.client.emit({ ...client });
          this.newClientForm.reset();
          (document.querySelector("#closeModal") as HTMLElement)?.click();
        },
        (error) => {
          this.error = true;
        }
      );
  }

  closeModal() {
    this.close.emit(true);
  }
}
