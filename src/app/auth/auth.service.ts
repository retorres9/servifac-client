import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  onLogin(credential) {
    return this.http.post(AppConfig.baseUrl + 'user/login', credential);
  }

  getConfiguration() {
    return this.http.get(AppConfig.baseUrl + 'configuration');
  }
}
