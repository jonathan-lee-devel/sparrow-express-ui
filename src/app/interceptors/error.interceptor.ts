import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ModalService} from '../services/modal/modal.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private modalService: ModalService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request)
        .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      throw error;
    }

    if (error.status === 400) {
      this.modalService.showRequestErrorModal('Request Error', JSON.stringify(error.error.errors[0].msg));
    }

    if (error.status === 401) {
      this.modalService.showRequestErrorModal('Authentication Error', 'Invalid Login Credentials');
    }

    if (error.status === 403) {
      this.modalService.showRequestErrorModal('Authorization Error', 'Access to that resource or action is denied');
    }

    if (error.status === 404) {
      this.router.navigate(['/error/not-found']).catch((reason) => window.alert(reason));
    }

    if (error.status === 409) {
      this.modalService.showRequestErrorModal('Request Conflict', 'That entity already exists, cannot perform request');
    }

    if (error.status === 500) {
      this.router.navigate(['/error/server-error']).catch((reason) => window.alert(reason));
    }

    throw error;
  }
}
