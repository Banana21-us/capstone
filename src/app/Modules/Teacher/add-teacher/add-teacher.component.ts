import { Component } from '@angular/core';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';

import { FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [TeacherListComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {

  constructor (private teacherservice: ConnectService,private router: Router) {}

  teacherform = new FormGroup({
    firstname: new FormControl(''),
    middlename: new FormControl(''),
    lastname : new FormControl(''),
    email : new FormControl(''),
    role : new FormControl(''),
    address : new FormControl(''),
    password : new FormControl('')
  });

  submitteacher() {
    this.teacherservice.postteacher(this.teacherform.value).subscribe(
      (result: any) => {
        console.log('Teacher submitted successfully:', result);
        // Optionally, reset the form or show a success message
        this.teacherform.reset();
        this.navigateToMainPage(); // Navigate to the main page

      },
      (error) => {
        console.error('Error submitting teacher account:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }
  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/teacher/teacherlist']);
  }
}
