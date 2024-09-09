import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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

      // Show success popup
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your message has been sent successfully!',
        confirmButtonText: 'OK'
      }).then(() => {
        // Reset the form after the popup is closed
        form.reset();
      });
    } else {
      // Show error popup if form is invalid
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out the form correctly.',
        confirmButtonText: 'OK'
      });
    }
  }
}
