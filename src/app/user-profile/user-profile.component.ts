import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-profile.service';
import { User } from '../services/user-profile.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  editMode: boolean = false;
  profileForm: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder,private router: Router) { 
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      mobileNumber: [''],
      dob: [''],
      gender:[''],
      address: [''],
      avatarUrl: ['']
    });
  }

  ngOnInit(): void {
    // Retrieve user details from localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString) as User;
      // Populate the form with the user's current data
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        mobileNumber: this.user.mobileNumber,
        dob: this.user.dob,
        gender: this.user.gender,
        address: this.user.address,
        avatarUrl: this.user.avatarUrl
      });
    } else {
      console.error('User not found in localStorage');
    }
  }
  

  signOut(): void {
    this.userService.signOut(); // Call the sign-out logic in the service
    localStorage.removeItem('user'); // Clear user data from localStorage
    this.user = null; // Clear the user object in the component
    console.log('User signed out');

    // Navigate to the login page after signing out
    // this.router.navigate(['/toggle']);
  }
  enableEdit(): void {
    this.editMode = true;
  }

    saveChanges(): void {
    if (this.user) {
      // Update the user object with the form data
      this.user = {
        ...this.user,
        name: this.profileForm.get('name')?.value,
        email: this.profileForm.get('email')?.value,
        mobileNumber: this.profileForm.get('mobileNumber')?.value,
        address: this.profileForm.get('address')?.value,
        dob: this.profileForm.get('dob')?.value,
        gender: this.profileForm.get('gender')?.value,
        avatarUrl: this.profileForm.get('avatarUrl')?.value
      };

      // Call the updateUser method to send updated data to the backend
      this.userService.updateUser(this.user).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          // Update localStorage with the latest user data
          localStorage.setItem('user', JSON.stringify(response));
          this.editMode = false; // Exit edit mode
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
  closeNavbar() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
