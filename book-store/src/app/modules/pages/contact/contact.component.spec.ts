import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent, SuccessModalContent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent, SuccessModalContent ],
      imports: [ ReactiveFormsModule ],
      providers: [ NgbModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with five controls', () => {
    expect(component.contactForm.contains('firstName')).toBeTruthy();
    expect(component.contactForm.contains('lastName')).toBeTruthy();
    expect(component.contactForm.contains('email')).toBeTruthy();
    expect(component.contactForm.contains('phone')).toBeTruthy();
    expect(component.contactForm.contains('description')).toBeTruthy();
  });

  it('should make the firstName control required', () => {
    const control = component.contactForm.get('firstName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the lastName control required', () => {
    const control = component.contactForm.get('lastName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the email control required', () => {
    const control = component.contactForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the phone control required', () => {
    const control = component.contactForm.get('phone');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the description control required', () => {
    const control = component.contactForm.get('description');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should open the success modal and reset the form on submit', () => {
    const modalService = TestBed.inject(NgbModal);
    spyOn(modalService, 'open').and.callThrough();
    spyOn(component.contactForm, 'reset');

    component.contactForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      description: 'Test description'
    });

    component.onSubmit();

    expect(modalService.open).toHaveBeenCalled();
    expect(component.contactForm.reset).toHaveBeenCalled();
  });
});
