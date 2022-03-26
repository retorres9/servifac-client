import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { CredentialsJwt } from './auth/jwt-credentials.model';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenLocal = JSON.parse(localStorage.getItem('token'));
    if (tokenLocal) {
      const token: CredentialsJwt = jwt_decode(tokenLocal.accessToken);
      let isActive = new Date() < new Date(token.exp * 1000) ? true : false;
      if (isActive && !(req.url.includes('user/login'))) {
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${tokenLocal.accessToken}`}
        });
      }
    }

    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);

        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['auth', 'login'])
          }
        }
        return throwError(err);
      })
    );
  }
}
