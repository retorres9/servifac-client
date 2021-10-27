import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ClientsService } from "../clients.service";

@Component({
  selector: "app-new-client",
  templateUrl: "./new-client.component.html",
  styleUrls: ["./new-client.component.scss"],
})
export class NewClientComponent implements OnInit {
  newClientForm: FormGroup;
  enableCredit: boolean = true;

  message: string;
  alert: boolean = false;
  alertType: string;
  constructor(private clientsService: ClientsService) {}

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
      cli_address: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      cli_phone: new FormControl("", {
        updateOn: "change",
        validators: [Validators.minLength(10)],
      }),
      cli_debt: new FormControl(0, {
        updateOn: "change",
        validators: [Validators.min(0), Validators.required],
      }),
      cli_email: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      cli_credit: new FormControl({value: false, disabled: this.enableCredit}, {
        updateOn: 'change'
      })
    });
  }

  enableCheckbox() {
    console.log(this.enableCredit);

    if (this.enableCredit) {
      this.newClientForm.controls['cli_credit'].enable();
      this.enableCredit = false
    } else {
      this.newClientForm.controls['cli_credit'].disable();
      this.enableCredit = true
    }
  }

  onPostClient() {
    if (this.newClientForm.invalid) {
      return;
    }
    const clientForm = this.newClientForm.value;
    let credit;

    if (clientForm.cli_credit) {
      credit = clientForm.cli_credit;
    } else {
      credit = null;
    }
    return this.clientsService
      .createClient(
        clientForm.cli_ci,
        clientForm.cli_firstName,
        clientForm.cli_lastName,
        clientForm.cli_email,
        clientForm.cli_phone,
        clientForm.cli_address,
        credit,
        clientForm.cli_debt
      )
      .subscribe(
        (resp) => {
          this.alert = true;
          this.message = "Cliente creado satisfactoriamente";
          this.alertType = "alert-success";
          this.newClientForm.reset();

          (document.querySelector("#ci") as HTMLElement)?.focus();
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        },
        (error) => {
          this.alert = true;
          this.message = error.error.message;
          this.alertType = "alert-danger";
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        }
      );
  }
}
