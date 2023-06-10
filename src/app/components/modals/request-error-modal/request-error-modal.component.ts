import {Component, OnInit} from '@angular/core';
import {initModals} from 'flowbite';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
  selector: 'app-request-error-modal',
  templateUrl: './request-error-modal.component.html',
  styleUrls: ['./request-error-modal.component.css'],
})
export class RequestErrorModalComponent implements OnInit {
  modalHeading: string = 'Request Error';
  modalText: string = 'There was an error with the request';

  constructor(private modalService: ModalService) {
    this.modalService.getModalAttributes().subscribe((modalAttributes) => {
      this.modalHeading = modalAttributes.heading;
      this.modalText = modalAttributes.text;
    });
  }

  ngOnInit() {
    initModals();
  }
}
