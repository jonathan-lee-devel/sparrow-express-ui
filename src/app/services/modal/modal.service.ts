import {EventEmitter, Injectable, Output} from '@angular/core';
import {Modal, ModalInterface, ModalOptions} from 'flowbite';
import {Observable} from 'rxjs';
import {ModalAttributesDto} from '../../dtos/modals/ModalAttributesDto';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  @Output() modalAttributes: EventEmitter<ModalAttributesDto> = new EventEmitter<ModalAttributesDto>();

  private $cookiesNoticeModal: HTMLElement | undefined;
  private cookiesNoticeModal: ModalInterface | undefined;
  private readonly cookiesNoticeModalOptions: ModalOptions = {placement: 'top-center', backdrop: 'dynamic', closable: false};

  private $requestErrorModal: HTMLElement | undefined;
  private requestErrorModal: ModalInterface | undefined;
  private readonly requestErrorModalOptions: ModalOptions = {placement: 'top-center', backdrop: 'dynamic', closable: true};

  constructor() {
  }

  public showCookiesNoticeModal() {
    if (!this.cookiesNoticeModal) {
      this.initCookiesNoticeModal();
    }
    this.cookiesNoticeModal?.show();
    setTimeout( () => {
      this.$cookiesNoticeModal?.classList.remove('opacity-0');
      this.$cookiesNoticeModal?.classList.remove('-translate-y-full');
      this.$cookiesNoticeModal?.classList.remove('scale-150');
    }, 100);
  }

  public showRequestErrorModal(modalHeading: string, modalText: string) {
    if (!this.requestErrorModal) {
      this.initRequestErrorModal();
    }
    this.modalAttributes.next({
      heading: modalHeading,
      text: modalText,
    });
    this.requestErrorModal?.show();
  }

  getModalAttributes(): Observable<ModalAttributesDto> {
    return this.modalAttributes;
  }

  private initCookiesNoticeModal(): void {
    const cookiesNoticeModalElement = document.getElementById('cookiesNoticeModal');
    if (cookiesNoticeModalElement === null) {
      this.promptRefreshOnError();
      return;
    }
    this.$cookiesNoticeModal = cookiesNoticeModalElement;
    this.cookiesNoticeModal = new Modal(this.$cookiesNoticeModal, this.cookiesNoticeModalOptions);
  }

  private initRequestErrorModal(): void {
    const requestErrorModalElement = document.getElementById('requestErrorModal');
    if (requestErrorModalElement === null) {
      this.promptRefreshOnError();
      return;
    }
    this.$requestErrorModal = requestErrorModalElement;
    this.requestErrorModal = new Modal(this.$requestErrorModal, this.requestErrorModalOptions);
  }

  private promptRefreshOnError(): void {
    window.alert('An error has occurred, please try refreshing the page');
  }
}
