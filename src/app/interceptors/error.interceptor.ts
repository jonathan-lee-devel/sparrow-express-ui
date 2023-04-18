import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

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
    }

    if (error.status === 403) {
    }

    if (error.status === 404) {
    }

    if (error.status === 409) {
    }

    if (error.status === 500) {
    }

    throw error;
  }
}
