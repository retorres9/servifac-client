import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigurationService } from "../../../configuration/configuration.service";
import { Locations } from "./../../../configuration/models/locations.model";
import { Categories } from "../../../configuration/models/categories.model";
import { tap } from "rxjs/operators";

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
    if (this.target === 'categoria') {
      console.log('entra');

      this.configurationService.postCategory(this.category).subscribe(
        resp => {
          console.log(resp);

          this.isRequesting = false;
        }, error =>{
          console.log(error);
        });
    } else {
      this.configurationService.postLocation(this.location).subscribe(
        resp => {
          console.log(resp);

          this.isRequesting = false;
        }, error => {
          console.log(error);
        });
    }
  }

  private setLocation() {
    this.location = new Locations(this.name);
  }

  private setCategory() {
    this.category = new Categories(this.name);
  }
}
