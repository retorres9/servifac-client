import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { CredentialsJwt } from './jwt-credentials.model';
import  jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: CredentialsJwt = {
    iat: 0,
    exp: 0,
    user_userRole: '',
    user_username: ''
  };

  public get user(): CredentialsJwt {
    return {...this._user};
  }

  constructor(private http: HttpClient) {}

  onLogin(credential) {
    return this.http.post('http://127.0.0.1:3000/user/login', credential).pipe(
      tap(resp => {
        localStorage.setItem('token', JSON.stringify(resp));
        const token: CredentialsJwt = jwt_decode(localStorage.getItem('token'));
        this._user = token;
      })
    );
  }
}
