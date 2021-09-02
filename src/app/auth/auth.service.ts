import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  onLogin(credential) {
    return this.http.post('http://127.0.0.1:3000/user/login', credential);
  }

  getConfiguration() {
    return this.http.get('http://127.0.0.1:3000/configuration');
  }
}
