import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProvidersService } from "../providers.service";
import { HeaderService } from '../../shared/components/header/header.service';

@Component({
  selector: "app-new-provider",
  templateUrl: "./new-provider.component.html",
  styleUrls: ["./new-provider.component.scss"],
})
export class NewProviderComponent implements OnInit {
  newProvForm: FormGroup;

  isAlertShowing: boolean = false;
  alertMessage: string;
  alertType: string;
  loading: boolean = false;
  constructor(private providerService: ProvidersService, private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle('Nuevo proveedor');
    this.newProvForm = new FormGroup({
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
    if (this.newProvForm.invalid) {
      return;
    }
    const provForm = this.newProvForm.value;
    this.loading = true;
    this.providerService
      .createProvider(
        provForm.prov_ruc,
        provForm.prov_name,
        provForm.prov_phone,
        provForm.prov_accountName,
        provForm.prov_accountNumber,
        provForm.prov_accountType,
        provForm.prov_debt
      )
      .subscribe(
        (resp) => {
          this.alertMessage = 'Proveedor creado satisfactoriamente';
          this.isAlertShowing = true;
          this.alertType = "alert-success";
          this.newProvForm.reset();
          this.loading = false;
          setTimeout(() => {
            this.isAlertShowing = false;
          }, 5000);
        },
        (error) => {
          this.alertMessage = error.error.message;
          this.isAlertShowing = true;
          this.alertType = "alert-danger";
          this.loading = false;
          setTimeout(() => {
            this.isAlertShowing = false;
          }, 5000);
        }
      );
  }
}
