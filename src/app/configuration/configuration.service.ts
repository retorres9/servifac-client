import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Configuration } from './models/configuration.model';
import { AppConfig } from "../../environments/environment";
import { Categories } from "./models/categories.model";
import { Locations } from "./models/locations.model";
import { map, switchMap, take, tap } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService {
  private _locations$: BehaviorSubject<Locations[]> = new BehaviorSubject<Locations[]>([]);
  private _categories$: BehaviorSubject<Categories[]> = new BehaviorSubject<Categories[]>([]);

  // ? Used to diferenciate modal in configuration component
  private _target$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  get getAllLocations() {
    return this._locations$.asObservable();
  }

  get getAllCategories() {
    return this._categories$.asObservable();
  }

  get getTarget() {
    return this._target$.asObservable();
  }

  public setTarget(target: string) {
    this._target$.next(target);
  }

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
            category.push(new Categories(resp[key].cat_name, resp[key].cat_id));
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
            location.push(new Locations(resp[key].loc_name, resp[key].loc_id));
          }
        }
        return location;
      }),
      tap((location) => {
        return this._locations$.next(location);
      })
    );
  }

  postCategory(data: Categories) {
    const cat = new Categories(data.cat_name, data.cat_id);
    return this.http
      .post<Categories>(AppConfig.baseUrl + "category", data)
      .pipe(
        switchMap((resp) => {
          return this.getAllCategories;
        }),
        take(1),
        tap((category) => {
          return this._categories$.next(category.concat(cat));
        })
      );
  }

  postLocation(data: Locations) {
    const loc = new Locations(data.loc_name, data.loc_id);
    return this.http
    .post<Locations>(AppConfig.baseUrl + "location", data)
    .pipe(
      switchMap((resp) => {
        return this.getAllLocations;
      }),
      take(1),
      tap((location) => {
        return this._locations$.next(location.concat(loc));
      })
    );
  }

  postCompanyInfo(companyInfo: Configuration) {
    return this.http.patch<Configuration>(AppConfig.baseUrl + 'configuration', companyInfo);
  }
}
