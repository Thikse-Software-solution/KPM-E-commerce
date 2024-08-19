import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-profile.service';
import { User } from '../services/user-profile.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  editMode: boolean = false;
  profileForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) { 
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      avatarUrl: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
  }

  signOut(): void {
    this.userService.signOut();
    // Navigate to login or home page after sign out
  }

  enableEdit(): void {
    this.editMode = true;
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      this.userService.updateUser(updatedUser);
      this.user = { ...this.user, ...updatedUser };
      this.editMode = false;
    }
  }
}
