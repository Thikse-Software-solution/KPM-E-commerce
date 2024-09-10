import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../services/contact.service'; // Adjust the import path based on your file structure

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(private contactService: ContactService) {}

  // Function to handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      const contactData = {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        message: form.value.message
      };

      // Call the service to send the contact form data
      this.contactService.submitContactForm(contactData).subscribe(
        response => {
          console.log('Form submitted successfully!', response);
          // Handle success response
        },
        error => {
          console.error('Error submitting form', error);
          
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error details:', error.error);
          // Handle error response
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
}
