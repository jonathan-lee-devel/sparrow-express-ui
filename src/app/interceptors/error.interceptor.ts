import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
        .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      throw error;
    }

    if (error.status === 400) {
    }

    if (error.status === 401) {
      window.alert('Invalid Login Credentials');
    }

    if (error.status === 403) {
      window.alert('Access Denied');
    }

    if (error.status === 404) {
      this.router.navigate(['/error/not-found']).catch((reason) => window.alert(reason));
    }

    if (error.status === 409) {
      window.alert('Already Exists');
    }

    if (error.status === 500) {
      this.router.navigate(['/error/server-error']).catch((reason) => window.alert(reason));
    }

    throw error;
  }
}
