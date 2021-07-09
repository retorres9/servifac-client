import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProvidersService } from "../providers.service";

@Component({
  selector: "app-new-provider",
  templateUrl: "./new-provider.component.html",
  styleUrls: ["./new-provider.component.scss"],
})
export class NewProviderComponent implements OnInit {
  new_prov_form: FormGroup;
  alert: boolean = false;
  message: string;
  type: string;
  constructor(private providerService: ProvidersService) {}

  ngOnInit(): void {
    this.new_prov_form = new FormGroup({
      prov_ruc: new FormControl("", {
        updateOn: "change",
        validators: [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      }),
      prov_name: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      prov_phone: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required, Validators.maxLength(10) ],
      }),
      prov_accountName: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      prov_accountNumber: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      prov_accountType: new FormControl("", {
        updateOn: "change",
        validators: [Validators.required],
      }),
      prov_debt: new FormControl(0, {
        updateOn: "change",
        validators: [Validators.required, Validators.min(0)],
      }),
    });
  }

  onSaveProv() {
    if (this.new_prov_form.invalid) {
      return;
    }
    this.providerService
      .createProvider(
        this.new_prov_form.value.prov_ruc,
        this.new_prov_form.value.prov_name,
        this.new_prov_form.value.prov_phone,
        this.new_prov_form.value.prov_accountName,
        this.new_prov_form.value.prov_accountNumber,
        this.new_prov_form.value.prov_accountType,
        this.new_prov_form.value.prov_debt
      )
      .subscribe(
        (resp) => {
          console.log(resp);

          this.message = 'Proveedor creado satisfactoriamente';
          this.alert = true;
          this.type = "alert-success";
          this.new_prov_form.reset();
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        },
        (error) => {
          this.message = error.error.message;
          this.alert = true;
          this.type = "alert-danger";
          setTimeout(() => {
            this.alert = false;
          }, 5000);
        }
      );
  }
}
