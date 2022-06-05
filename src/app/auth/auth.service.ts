import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { CredentialsJwt } from './jwt-credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private _loggedIn = new BehaviorSubject<boolean>(false);
  private _loggedUser$ = new BehaviorSubject<string>('Usuario');
  public get loggedUser$() {
    return this._loggedUser$;
  }

  public get loggedIn() {
    return this._loggedIn.asObservable();
  }

  onLogin(credential) {
    return this.http.post(AppConfig.baseUrl + 'user/login', credential).pipe(
      tap(resp => {
        if (resp) {
          this._loggedIn.next(true);
        }
      })
    );
  }

  getLoggedUser() {
    const local = localStorage.getItem('token');
    const token: CredentialsJwt = jwt_decode(local.toString());
    this._loggedUser$.next(token.user_username);
  }


  getConfiguration() {
    return this.http.get(AppConfig.baseUrl + 'configuration');
  }

  resetPassword(user_email) {
    return this.http.post(AppConfig.baseUrl + 'user/reset', user_email);
  }

  updateUserPassword(passwordUpdate) {
    return this.http.post(AppConfig.baseUrl + 'user/update', passwordUpdate);
  }
}
