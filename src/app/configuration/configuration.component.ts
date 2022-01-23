import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { HeaderService } from "../shared/components/header/header.service";
import { ConfigurationService } from "./configuration.service";
import { Locations } from './models/locations.model';
import { Categories } from './models/categories.model';

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.scss"],
})
export class ConfigurationComponent implements OnInit {

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.headerService.setheaderTitle("Configuración");
    this.configurationService.getConfiguration().subscribe(
      resp => {
        console.log(resp);
      }
    );
    this.configurationService.getCategories().subscribe(
      resp => {
        console.log(resp);
      }
    );
    this.configurationService.getLocations().subscribe(
      resp => {
        console.log(resp);
      }
    )
  }

  goToHome() {
    this.router.navigate(["home"]);
  }
}
