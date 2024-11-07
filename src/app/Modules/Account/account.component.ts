import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnectService } from '../../connect.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any;
  adminPic:any;
  constructor(private adminService:ConnectService) {

  }

  profileForm = new FormGroup({
    admin_id: new FormControl('',),
    fname: new FormControl(''),
    mname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    oldPassword: new FormControl(null),
    newPassword: new FormControl(''),
    newPassword_confirmation: new FormControl(''),
    role: new FormControl(''),

  })

  ngOnInit() {
    this.loadUserData();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.admin_pic) {
        this.adminPic = user.admin_pic;
    } else {
        console.warn('Admin picture URL not found in localStorage');
    }
}


  loadUserData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
    console.log(user);

    if (user) {
      this.profileForm.patchValue({
        admin_id: user.admin_id,
        fname: user.fname,
        mname: user.mname,
        lname: user.lname,
        email: user.email,
        address: user.address,
        role: user.role,
        oldPassword: user.oldPassword,
      });
    }

    if (user && user.admin_pic) {
      this.adminPic = user.admin_pic;
    } else {
      console.warn('Admin picture URL not found in localStorage');
    }
  }

  saveChanges(): void {
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
  
      const adminId = Number(formData.admin_id);
      const oldPassword = formData.oldPassword ?? ''; // Ensure this is a string
  
      if (adminId <= 0 || !oldPassword) {
        console.error('Invalid admin ID or missing old password');
        return;
      }
      this.adminService.update(adminId, oldPassword, {
        fname: formData.fname,
        mname: formData.mname,
        lname: formData.lname,
        email: formData.email,
        address: formData.address,
        newPassword: formData.newPassword,
        newPassword_confirmation: formData.newPassword_confirmation // Include confirmation if needed
      }).subscribe(
        (result) => {
          console.log('Profile updated successfully', result);
          const updatedUser = {
            ...this.user,
            fname: formData.fname,
            mname: formData.mname,
            lname: formData.lname,
            email: formData.email,
            address: formData.address,
          };
  
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.loadUserData();
        },
        (error) => {
          console.error('Error updating profile:', error);
          console.error('Error details:', error.error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (file && user.admin_id) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('admin_id', user.admin_id);
    
      this.adminService.uploadImage(formData).subscribe(response => {
        console.log(response); 
        const newImageUrl = `http://localhost:8000/assets/adminPic/${response['image_url'].split('/').pop()}`;
        
        // Update adminPic variable and the service
        this.adminPic = newImageUrl;
        user.admin_pic = newImageUrl;
        localStorage.setItem('user', JSON.stringify(user)); 
        
        // Notify other components by updating the service
        this.adminService.updateAdminPic(newImageUrl); // Notify all subscribers
        console.log('Admin Picture URL:', this.adminPic);
      }, error => {
        console.error('Error uploading image:', error);
      });
    
    
    } else {
        console.error('No file selected or admin ID is missing');
    }
}



}





