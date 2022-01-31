import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration.service';
import { Configuration } from '../models/configuration.model';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  companyInfoForm: FormGroup;
  info: Observable<Configuration>;
  showAlert: boolean = false;
  alertType: string;
  alertMessage: string;
  id: number;

  constructor(private configService: ConfigurationService) { }

  ngOnInit(): void {
    this.companyInfoForm = new FormGroup({
      clientName: new FormControl("", {
        updateOn: "change",
        validators: [Validators.minLength(10), Validators.required]
      }),
      clientRUC: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.minLength(13), Validators.required]
      }),
      address: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.minLength(5), Validators.required]
      }),
      tax: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.min(10), Validators.max(15), Validators.required]
      })
    });
    this.configService.getConfiguration().subscribe(
      resp => {
        if (resp) {
          this.companyInfoForm.patchValue({
            clientName: resp.clientName,
            clientRUC: resp.clientRUC,
            address: resp.address,
            tax: resp.tax,
            id: this.id
          });
        }
      }
    );
  }

  postCompanyInfo() {
    this.showAlert = false;
    const companyForm = this.companyInfoForm.value;
    const configuration = new Configuration(
      companyForm.clientName,
      companyForm.clientRUC,
      companyForm.address,
      companyForm.tax,
      );

    this.configService.postCompanyInfo(configuration).subscribe(
      resp => {
        this.buildAlert('alert-success', 'Se ha guardado correctamente')
      }, error => {
        this.buildAlert('alert-danger', 'Ha ocurrido un error al guardar la nueva información')
      }
    );
  }

  buildAlert(alertClass: string, message) {
    this.showAlert = true;
    this.alertType = alertClass;
    this.alertMessage = message;
    if (alertClass === 'alert-success') {
      setTimeout(() => {
        this.showAlert = false;
      }, 4000);
    }
  }
}
