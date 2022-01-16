import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../environments/environment.dev';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private _loggedIn = new BehaviorSubject<boolean>(false);

  public get loggedIn() {
    return this._loggedIn.asObservable();
  }

  onLogin(credential) {
    return this.http.post(AppConfig.baseUrl + 'user/login', credential).pipe(
      tap(resp => {
        if (resp) {
          console.log('enter');

          this._loggedIn.next(true);
        }
      })
    );
  }


  getConfiguration() {
    return this.http.get(AppConfig.baseUrl + 'configuration');
  }
}
