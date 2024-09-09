import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  constructor() { }

  // Function to handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      const contactData = {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        message: form.value.message
      };

      console.log('Form Submitted!', contactData);
      // You can implement further actions like sending the form data to a server here
    } else {
      console.log('Form is not valid');
    }
  }
}
