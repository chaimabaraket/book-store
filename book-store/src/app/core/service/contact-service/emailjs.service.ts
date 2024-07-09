import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailjsService {

  private readonly YOUR_USER_ID = 'G6ORZc7YYr0ng59Pm'; // Replace with your EmailJS user ID
  private readonly YOUR_SERVICE_ID = 'service_9s1vwiy'; // Replace with your EmailJS service ID
  private readonly YOUR_TEMPLATE_ID = 'template_y9z0y4q'; // Replace with your EmailJS template ID

  constructor() {
    emailjs.init(this.YOUR_USER_ID);
  }

  sendEmail(firstName: string, lastName: string, email: string, phone: string, description: string): Promise<EmailJSResponseStatus> {
    const templateParams = {
      firstName,
      lastName,
      email,
      phone,
      description
    };

    return emailjs.send(this.YOUR_SERVICE_ID, this.YOUR_TEMPLATE_ID, templateParams);
  }
}
