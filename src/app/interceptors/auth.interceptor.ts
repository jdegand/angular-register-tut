import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  static accessToken = '';

  constructor(private apiService: ApiService, private route: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor.accessToken}`
      }
    });

    // this is only gonna run when there is an api request 
    // have to manually add { admin: 5150 } to a database user's roles and use only admin page to test this

    return next.handle(req).pipe(
      catchError((error: any): any => { // problem with having to always return an Observable from catchError
        if (error.status === 403) {

          // doesn't work if cookies are blocked
          if (localStorage.getItem('persist') === null) {
            alert('Session expired');
            this.apiService.logout().subscribe((res) => {
              AuthInterceptor.accessToken = '';
              this.route.navigate(['login']);
            })
            // throwError has to use a callback syntax now
            // if you try to just use new Error() - you run into the problem of catchError expecting an Observable to be returned
            return throwError(() => new Error('Session expired'));
          } else {
            // the amount of the times this will work depends on the length of the refreshToken and the length of the accessToken
            // If accessToken lasts 20s and refresh token last 30s, this will be called once before erroring on second try 
            this.apiService.refresh().subscribe((res: any) => {
              AuthInterceptor.accessToken = res.accessToken;
              //this.route.navigate(['admin']);
            })
            return EMPTY;
          }

        }
        //return throwError(() => new Error('Session expired'));
      }));

  }
}

/*
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 403) {

          // refresh token logic
          // problem with users list not showing bc of delay from api request
          // added the navigate for this reason
          this.apiService.refresh().subscribe((res: any) => {
            AuthInterceptor.accessToken = res.accessToken;
            //this.route.navigate(['admin']);
          })
        }
        return throwError(() => new Error('Session expired'));
      }));
*/

/*
        alert('Session expired');
        this.apiService.logout().subscribe((res) => {
          AuthInterceptor.accessToken = '';
          this.route.navigate(['login']);
        })
        return throwError(() => new Error('Session expired'));
*/

/*

// doesn't work - need a switchMap?
// both conditions will run 

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 403) {

          if (localStorage.getItem('persist') === null) {
            alert('Session expired');
            this.apiService.logout().subscribe((res) => {
              AuthInterceptor.accessToken = '';
              this.route.navigate(['login']);
            })
          } else {
            this.apiService.refresh().subscribe((res: any) => {
              AuthInterceptor.accessToken = res.accessToken;
              //this.route.navigate(['admin']);
            })
          }
    
        }
        return throwError(() => new Error('Session expired'));
      }));
*/