import {Injectable} from '@angular/core';
import {Modal} from 'flowbite';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private $cookiesNoticeModal: HTMLElement | undefined;

  private cookiesNoticeModal: Modal | undefined;

  constructor() {
  }

  public showCookiesNoticeModal() {
    if (!this.cookiesNoticeModal) {
      this.initCookiesNoticeModal();
    }
    this.cookiesNoticeModal?.show();
  }

  private initCookiesNoticeModal(): void {
    const cookiesNoticeModalElement = document.getElementById('cookiesNoticeModal');
    if (cookiesNoticeModalElement === null) {
      window.alert('An error has occurred, please try refreshing the page');
      return;
    }
    this.$cookiesNoticeModal = cookiesNoticeModalElement;
    this.cookiesNoticeModal = new Modal(this.$cookiesNoticeModal, {
      placement: 'top-center',
      backdrop: 'dynamic',
      closable: false,
    });
  }
}
