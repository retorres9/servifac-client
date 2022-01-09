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
      console.log('Guard exec');

      let redirect;
      const redirectToken = localStorage.getItem('token');
      // !Posiblemente esta causando redirección a #
      if (!redirectToken) {
        return;
      }
      const token: CredentialsJwt = jwt_decode(redirectToken);
      if (new Date() > new Date(token.exp * 1000)) {
      }
      new Date() > new Date(token.exp * 1000) ? redirect = false : redirect = true;
      new Date() > new Date(token.exp * 1000) ? this.router.navigate(['auth/login']) : false;

    return redirect;
  }

}
