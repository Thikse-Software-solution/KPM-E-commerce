// forgot-password.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path based on your project structure

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

constructor(private authService: AuthService) {}

 onSubmit() {
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        console.log('Forgot password email sent successfully', response);
        alert('Password reset email sent successfully!');
      },
      error: (error) => {
        console.error('Error sending forgot password email', error);
        alert('An error occurred while sending the password reset email.');
      }
    });
  }
}
