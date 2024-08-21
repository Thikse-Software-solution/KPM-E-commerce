import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  @Input() isLogin!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
        this.router.navigate(['/profile']);
      this.http.post('http://localhost:8080/api/auth/login', this.loginForm.value)
        .subscribe({
          
          next: response => {
            // Handle successful response
          },
          error: error => {
            console.error('Login error:', error);
          }
        });
    }
  }

//   const { email, password } = this.loginForm.value;
//   console.log('Form Values:', { email, password }); // Debug line

//   this.authService.login(email, password).subscribe({
//     next: (response) => {
//       // Handle successful login
//       this.toastr.success('Login successful');
//       this.router.navigate(['/user']); // Redirect to the dashboard or any other page
//     },
//     error: (error) => {
//       // Handle login failure
//       console.error('Login error:', error); // Debug line
//       this.toastr.error('Login failed. Please check your credentials.');
//     }
//   });
// }
}
