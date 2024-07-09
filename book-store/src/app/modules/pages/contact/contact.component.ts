import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailjsService } from '../../../core/service/contact-service/emailjs.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
[x: string]: any;
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private emailjsService: EmailjsService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      const { firstName, lastName, email, phone, description } = this.contactForm.value;

      this.emailjsService.sendEmail(firstName, lastName, email, phone, description)
        .then(response => {
          console.log('Email sent:', response.status, response.text);
          this.openSuccessModal();
          this.contactForm.reset();
        }, error => {
          console.error('Error sending email:', error);
          // Handle error as needed
        });
    }
  }

  openSuccessModal() {
    const modalRef = this.modalService.open(SuccessModalContent, { centered: true });
    modalRef.componentInstance.modalMessage = 'Your message has been sent successfully!';
  }
}

@Component({
  selector: 'app-success-modal-content',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Success</h5>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      {{ modalMessage }}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class SuccessModalContent {
  modalMessage: string;

  constructor(public activeModal: NgbActiveModal) {}
}
