import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ModalService} from '../modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class CookiesNoticeService {
  public static COOKIE_NOTICE_ACCEPTED_KEY: string = 'Cookies-Notice';
  public static COOKIE_NOTICE_IS_ACCEPTED_STRING: string = 'Accepted';

  constructor(private cookieService: CookieService, private modalService: ModalService) { }

  public triggerIfNotAccepted(): void {
    if (this.cookieService.get(CookiesNoticeService.COOKIE_NOTICE_ACCEPTED_KEY) !==
      CookiesNoticeService.COOKIE_NOTICE_IS_ACCEPTED_STRING) {
      setTimeout(() => this.modalService.showCookiesNoticeModal(), 500);
    }
  }

  public doAccept(): void {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    this.cookieService.set(
        CookiesNoticeService.COOKIE_NOTICE_ACCEPTED_KEY,
        CookiesNoticeService.COOKIE_NOTICE_IS_ACCEPTED_STRING,
        {secure: true, expires: expiryDate, sameSite: 'Strict'});
  }
}
