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
      this.signupService.signup(this.signupForm.value).subscribe(
        response => {
          console.log('Signup successful', response);
          this.isEmailVerificationStep = true; // Move to email verification step
        },
        error => {
          console.error('Signup failed', error);
          // Handle error response
        }
      );
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
