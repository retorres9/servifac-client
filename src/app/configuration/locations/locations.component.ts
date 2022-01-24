import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration.service';
import { Locations } from './../models/locations.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations$: Observable<Locations[]>
  id: string;
  constructor(private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.locations$ = this.configurationService.getAllLocations;
  }

  updateId() {
    this.configurationService.setTarget('ubicacion');
  }

}
