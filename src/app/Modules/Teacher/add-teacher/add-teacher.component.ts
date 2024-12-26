import { Component } from '@angular/core';
// import { TeacherListComponent } from '../teacher-list/teacher-list.component';

import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import Swal from 'sweetalert2'; 
import { MatError } from '@angular/material/form-field';
@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
  MatError],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {

  constructor (private teacherservice: ConnectService,private router: Router) {}
  isLoading: boolean = false; 
  teacherform = new FormGroup({
    fname: new FormControl('', Validators.required),
    mname: new FormControl(''),
    lname : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('Teacher', Validators.required),
    address : new FormControl('', Validators.required),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submitteacher() {
    // Set loading state to true
    this.isLoading = true;

    this.teacherservice.postteacher(this.teacherform.value).subscribe(
        (result: any) => {
            console.log('Teacher submitted successfully:', result);
            Swal.fire({
                title: 'Success!',
                text: 'Teacher registered successfully!',
                icon: 'success',
                confirmButtonText: 'OK' // You can customize the button text
            });

            this.teacherform.reset();
            this.navigateToMainPage(); // Navigate to the main page
        },
        (error) => {
            Swal.fire({
                icon: "error",
                title: "Oopps! Validation Errors",
                html: `
                    <p>The following issues need to be resolved:</p>
                    <ul style="text-align: left;">
                        <li>Email address is already registered. Please use a different one.</li>
                        <li>Password must be at least 8 characters long.</li>
                    </ul>
                `,
            });
            
            console.error('Error submitting teacher account:', error);
        },
        () => {
            // Reset loading state after completion of request
            this.isLoading = false;
        }
    );
}

  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/teacher/teacherlist']);
  }
}
