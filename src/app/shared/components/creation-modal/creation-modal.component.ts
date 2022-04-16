import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigurationService } from "../../../configuration/configuration.service";
import { Locations } from "./../../../configuration/models/locations.model";
import { Categories } from "../../../configuration/models/categories.model";

@Component({
  selector: "app-creation-modal",
  templateUrl: "./creation-modal.component.html",
  styleUrls: ["./creation-modal.component.scss"],
})
export class CreationModalComponent implements OnInit {
  name: string;
  id$: Observable<string>;
  location: any;
  category: any;
  isRequesting: boolean;
  target: string;

  // Alert variables
  isAlert: boolean = false;
  message: string;
  alertType: string;
  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.id$ = this.configurationService.getTarget;
  }

  saveOnTarget() {
    this.isRequesting = true;
    this.configurationService.getTarget.subscribe(
      resp => {
        this.target = resp;
      }
    );
    this.target === "categoria" ? this.setCategory() : this.setLocation();
    this.target === "categoria" ? this.postCategory() : this.postLocation();
  }

  private postCategory() {
    this.configurationService.postCategory(this.category).subscribe(
      resp => {
        this.isRequesting = false;
        this.setAlert(`Se ha creado la categoría ${this.name}`, 'alert-success');
        this.name = '';
      }, error => {
        this.isRequesting = false;
        this.setAlert(`Se ha producido un error: ${error.message}`, 'alert-warning alert-dismissible');
      });
  }

  private postLocation() {
    this.configurationService.postLocation(this.location).subscribe(
      resp => {
        this.isRequesting = false;
        this.setAlert(`Se ha creado la ubicación ${this.name}`, 'alert-success');
        this.name = '';
      }, error => {
        this.isRequesting = false;
        this.setAlert(`Se ha producido un error: ${error.message}`, 'alert-warning alert-dismissible');
      });
  }

  private setLocation() {
    this.location = new Locations(this.name);
  }

  private setCategory() {
    this.category = new Categories(this.name);
  }

  private setAlert(message: string, alertType: string) {
    this.isAlert = true;
    this.alertType = alertType;
    this.message = message;
    if (alertType.split(' ')[0] === 'alert-success') {
      setTimeout(()=> {
        this.isAlert = false;
      }, 5000);
    }
  }
}
