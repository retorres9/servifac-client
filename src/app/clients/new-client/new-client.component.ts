import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ClientsService } from "../clients.service";
import { ActivatedRoute } from "@angular/router";
import { Client } from '../client.model';
import { HeaderService } from '../../shared/components/header/header.service';

@Component({
  selector: "app-new-client",
  templateUrl: "./new-client.component.html",
  styleUrls: ["./new-client.component.scss"],
})
export class NewClientComponent implements OnInit {
  newClientForm: FormGroup;
  enableCredit: boolean = true;
  editingMode: boolean = false;

  message: string;
  alert: boolean = false;
  alertType: string;
  loading = false;
  constructor(
    private clientsService: ClientsService,
    private aRoute: ActivatedRoute,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle('Nuevo cliente');
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
      cli_credit: new FormControl(
        { value: false, disabled: this.enableCredit },
        {
          updateOn: "change",
        }
      ),
    });
    if (this.aRoute.snapshot.params.ci) {
      this.headerService.setheaderTitle('Actualizar cliente');
      this.newClientForm.controls['cli_ci'].disable();
      this.editingMode = true;
      this.clientsService
        .getClient(this.aRoute.snapshot.params.ci)
        .subscribe((resp) => {
          const client = resp.client;
          console.log(client.cli_debt);

          this.newClientForm.patchValue({
            cli_firstName: client.cli_firstName,
            cli_ci: client.cli_ci,
            cli_lastName: client.cli_lastName,
            cli_address: client.cli_address,
            cli_phone: client.cli_phone,
            cli_debt: client.cli_debt,
            cli_email: client.cli_email,
            cli_credit: client.cli_credit,
          });
        });
    }
  }

  enableCheckbox() {
    if (this.enableCredit) {
      this.newClientForm.controls["cli_credit"].enable();
      this.enableCredit = false;
    } else {
      this.newClientForm.controls["cli_credit"].disable();
      this.enableCredit = true;
    }
  }

  onPostClient() {
    if (this.newClientForm.invalid) {
      return;
    }
    const clientForm = this.newClientForm.value;
    let clientCredit;
    if (clientForm.cli_credit) {
      clientCredit = clientForm.cli_credit;
    } else {
      clientCredit = null;
    }
    this.loading = true;
    const client = new Client();
    client.cli_ci = clientForm.cli_ci,
    client.cli_firstName = clientForm.cli_firstName,
    client.cli_lastName = clientForm.cli_lastName,
    client.cli_email = clientForm.cli_email,
    client.cli_phone = clientForm.cli_phone,
    client.cli_address = clientForm.cli_address,
    client.cli_debt = +clientForm.cli_debt,
    client.cli_credit = clientCredit

    if (this.editingMode) {
      client.cli_ci = this.newClientForm.getRawValue().cli_ci;
      this.updateClient({...client});
    } else {
      this.createClient({...client});
    }
  }

  private createClient(client: Client) {
    return this.clientsService
      .createClient(client)
      .subscribe(
        (resp) => {
          this.alert = true;
          this.showAlert("Cliente creado satisfactoriamente", "alert-success");
          this.newClientForm.reset();
          this.loading = false;
          (document.querySelector("#ci") as HTMLElement)?.focus();
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        },
        (error) => {
          this.alert = true;
          this.showAlert(error.error.message, "alert-danger");
          this.loading = false;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        }
      );
  }

  private updateClient(client: Client) {
    return this.clientsService
      .updateClient(client)
      .subscribe(
        (resp) => {
          this.alert = true;
          this.showAlert("Cliente actualizado correctamente", "alert-primary");
          this.loading = false;
          (document.querySelector("#ci") as HTMLElement)?.focus();
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        },
        (error) => {
          this.alert = true;
          this.showAlert(error.error.message, "alert-danger");
          this.loading = false;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        }
      );
  }

  private showAlert(message: string, type: string) {
    this.alert = true;
    this.message = message;
    this.alertType = type;
    this.loading = false;
    (document.querySelector("#ci") as HTMLElement)?.focus();
    setTimeout(() => {
      this.alert = false;
    }, 5000);
  }
}
