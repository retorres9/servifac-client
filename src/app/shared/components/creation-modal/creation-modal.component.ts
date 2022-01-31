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
        console.log(resp);
      }
    );
    this.target === "categoria" ? this.setCategory() : this.setLocation();
    this.target === "categoria" ? this.postCategory() : this.postLocation();
  }

  private postCategory() {
    this.configurationService.postCategory(this.category).subscribe(
      resp => {
        this.isRequesting = false;
        this.name = '';
      }, error => {
        this.isRequesting = false;
        console.log(error);
      });
  }

  private postLocation() {
    this.configurationService.postLocation(this.location).subscribe(
      resp => {
        this.isRequesting = false;
        this.name = '';
      }, error => {
        this.isRequesting = false;
        console.log(error);
      });
  }

  private setLocation() {
    this.location = new Locations(this.name);
  }

  private setCategory() {
    this.category = new Categories(this.name);
  }
}
