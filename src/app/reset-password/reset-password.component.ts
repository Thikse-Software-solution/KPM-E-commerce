import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  message: string = ''; // Declare `message` at the class level.

  constructor(private fb: FormBuilder, private userService: AuthService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const { email, newPassword } = this.resetForm.value;
      this.userService.resetPassword({ email, newPassword }).subscribe({
        next: (response) => {
          this.message = response.message || 'Password reset successfully.';
        },
        error: (error) => {
          console.error('Error during password reset:', error);
          this.message = error.error || 'Password reset failed. Please try again.';
        }
      });
    } else {
      this.message = 'Please fill in the form correctly.';
    }
  }
}