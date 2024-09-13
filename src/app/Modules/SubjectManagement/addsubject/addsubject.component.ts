import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { SubjectService } from '../../../subject.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addsubject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent {

  constructor (private subservice: SubjectService,private router: Router) {}

  subjectManagementForm = new FormGroup({
    subjectname: new FormControl(''),
    gradelevel: new FormControl(''),
    strand : new FormControl('')
  });

  submitsubjects() {
    this.subservice.postsubject(this.subjectManagementForm.value).subscribe(
      (result: any) => {
        console.log('Subject submitted successfully:', result);
        // Optionally, reset the form or show a success message
        this.subjectManagementForm.reset();
        this.navigateToMainPage(); // Navigate to the main page

      },
      (error) => {
        console.error('Error submitting subject:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }
  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/subjectmanagement/subjectlist']);
  }
        
    
  
}