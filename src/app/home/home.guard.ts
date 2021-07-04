import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CredentialsJwt } from '../auth/jwt-credentials.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let redirect;
      const redirectToken = localStorage.getItem('token');
      const token: CredentialsJwt = jwt_decode(redirectToken);
      console.log(token);
      if (new Date() > new Date(token.exp * 1000)) {
        console.log('expira');
      }
      new Date() > new Date(token.exp * 1000) ? redirect = false : redirect = true;
      new Date() > new Date(token.exp * 1000) ? this.router.navigate(['auth/login']) : false;

    return redirect;
  }

}
