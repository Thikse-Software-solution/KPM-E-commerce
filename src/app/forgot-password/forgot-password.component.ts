// forgot-password.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

  onSubmit() {
    if (this.email) {
      // Add your backend integration logic here
      console.log('Password reset link sent to:', this.email);
      alert('Password reset link has been sent to your email.');
    } else {
      alert('Please enter a valid email address.');
    }
  }
}
