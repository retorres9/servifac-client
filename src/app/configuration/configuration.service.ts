import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Configuration } from "./models/configuration.model";
import { AppConfig } from "../../environments/environment.dev";
import { Categories } from './models/categories.model';
import { Locations } from "./models/locations.model";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfigurationService {
  private _locations$: BehaviorSubject<Locations[]> = new BehaviorSubject<Locations[]>([]);
  private _categories$: Subject<Categories[]> = new Subject<Categories[]>();

  // ? Used to diferenciate modal in configuration component
  private _target$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get getAllLocations() {
    return this._locations$.asObservable();
  }

  get getAllCategories() {
    return this._categories$.asObservable();
  }

  get getTarget() {
    return this._target$.asObservable();
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

  postOnTarget(target: string, data: Locations | Categories) {
    console.log(data);

    if (target === 'categoria') {
      return this.http.post<Categories>(AppConfig.baseUrl + 'category', data).pipe(
        map(resp => {
          const category = [];
          this._categories$.subscribe(categories => {
            for(const key in categories) {
              if (categories.hasOwnProperty(key)) {
                category.push(new Categories(categories[key].cat_name, categories[key].cat_id));
              }
            }
          });
          category.push(new Categories(resp.cat_name, resp.cat_id));
          console.log(category);
          return category;
        }),
        tap(category => {
          return this._categories$.next(category);
        })
      )
    } else {
      return this.http.post<Locations>(AppConfig.baseUrl + 'location', data).pipe(
        map(resp => {
          const location = [];
          this._locations$.forEach(locationValue => {
            location.push(locationValue);
          });
          location.push(resp);
          console.log(location);
          return location;
        }),
        tap(location => {
          return this._locations$.next(location);
        })
      );
    }
  }

  public setTarget(target: string) {
    this._target$.next(target);
  }
}
