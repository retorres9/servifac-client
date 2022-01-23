import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Configuration } from "./models/configuration.model";
import { AppConfig } from "../../environments/environment.dev";
import { Categories } from "./models/categories.model";
import { Locations } from "./models/locations.model";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService {
  private _locations$: BehaviorSubject<Locations[]> = new BehaviorSubject<Locations[]>([]);
  private _categories$: BehaviorSubject<Categories[]> = new BehaviorSubject<Categories[]>([]);

  constructor(private http: HttpClient) {}

  getConfiguration() {
    return this.http.get<Configuration>(AppConfig.baseUrl + "configuration");
  }

  getCategories() {
    return this.http.get<Categories[]>(AppConfig.baseUrl + "category").pipe(
      map((resp) => {
        const category = [];
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            category.push(new Categories(resp[key].cat_id, resp[key].cat_name));
          }
        }
        return category;
      }),
      tap((categories) => {
        return this._categories$.next(categories);
      })
    );
  }

  getLocations() {
    return this.http.get<Locations>(AppConfig.baseUrl + "location").pipe(
      map((resp) => {
        const location = [];
        for (const key in resp) {
          if (resp.hasOwnProperty(key)) {
            location.push(new Locations(resp[key].loc_id, resp[key].loc_name));
          }
        }
        return location;
      }),
      tap((location) => {
        return this._locations$.next(location);
      })
    );
  }
}
