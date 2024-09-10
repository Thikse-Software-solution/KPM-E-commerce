import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Input() isLogin!: boolean;
  @Output() toggleLogin = new EventEmitter<boolean>(); // Event to notify parent component
  signupForm!: FormGroup;
  isEmailVerificationStep: boolean = false;

  constructor(
    private fb: FormBuilder,
    private signupService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      verificationCode: ['']  // Field for OTP verification
    });
  }

onSubmit() {
  if (this.signupForm.valid) {
    this.signupService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.isEmailVerificationStep = true; // Move to email verification step
        // You can also provide feedback to the user, like a success message
        alert('Signup successful! Please verify your email to complete the registration.');
      },
      error: (error) => {
        console.error('Signup failed', error);

        // Check the status code or error message for specific handling
        if (error.status === 409) {  // Example: 409 Conflict for duplicate email
          alert('This email is already registered. Please use another email or log in.');
        } else if (error.error?.message === 'Email already registered') {
          // Handle specific error message from backend
          alert('This email is already registered. Please use another email or log in.');
        } else {
          // Handle other errors, potentially including validation issues
          alert('Signup failed. Please check your details and try again.');
        }
      }
    });
  } else {
    // Handle form validation errors (e.g., highlight missing or incorrect fields)
    alert('Please fill in all required fields correctly.');
  }
}


  verifyEmail() {
    if (this.signupForm.get('verificationCode')?.valid) {
      // Add logic to verify email with OTP
      alert('Email verified successfully');
      this.toggleLogin.emit(true); // Emit the event to switch to login
    }
  }
}
