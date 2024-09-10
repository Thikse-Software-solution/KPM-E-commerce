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
email: string = '';
  password: string = '';
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          console.log('Login successful:', user);
          // Handle successful login (e.g., redirect to dashboard)
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/shine/shinehome']);
        },
        error: (error) => {
          console.error('Login error:', error);
          // Handle error (e.g., show an error message to the user)
        }
      });
    }
    

    
    
//  const credentials = { email: this.email, password: this.password };

//     this.authService.login(credentials).subscribe(
//       (userDetails) => {
//         // Store user details in localStorage
//         localStorage.setItem('user', JSON.stringify(userDetails));
//         // Navigate to the profile page or dashboard
//         this.router.navigate(['/profile']);
//       },
//       error => {
//         console.error('Login error:', error);
//         // Handle login error (show error message, etc.)
//       }
//     );
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
