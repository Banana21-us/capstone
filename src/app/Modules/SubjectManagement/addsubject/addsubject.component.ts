import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { AddsubjectdialogComponent } from '../addsubjectdialog/addsubjectdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-addsubject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatFormField,MatLabel],
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent {

  isStrandVisible: boolean = false;
  subjectsList: string[] = [];

  constructor ( private dialog: MatDialog,private subservice: ConnectService,private router: Router) {}

  subjectManagementForm = new FormGroup({
    subject_name: new FormControl(''),
    grade_level: new FormControl(''),
    strand: new FormControl(''),
    section_name: new FormControl(''),
  });
   

  onGradeChange() {
    const selectedGrade = this.subjectManagementForm.get('grade_level')?.value;
    this.isStrandVisible = selectedGrade === '11' || selectedGrade === '12';

    if (!this.isStrandVisible) {
      this.subjectManagementForm.get('strand')?.setValue('-');
    }
  }

  submitsubjects() {
    const formData = {
        ...this.subjectManagementForm.value,
        subject_name: this.subjectsList, // Ensure this is an array
        section: this.subjectManagementForm.get('section_name')?.value // Change to 'section'
    };

    // Log the formData to see what is being submitted
    console.log('Submitting the following data:', formData);

    // Check if subject_name array is empty
    if (formData.subject_name.length === 0) {
        console.error('Subject name array is empty.');
        return; // Prevent submission if empty
    }

    this.subservice.postsubject(formData).subscribe(
        (result) => {
            console.log('Subjects submitted successfully:', result);
            this.subjectManagementForm.reset();
            this.subjectsList = []; // Reset subjects list after submission
            this.navigateToMainPage();
        },
        (error) => {
            console.error('Error submitting subjects:', error);
        }
    );
}

  navigateToMainPage() {
    this.router.navigate(['/main-page/subjectmanagement/subjectlist']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddsubjectdialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subjectsList.push(result);
      }
    });
  }
  removeSubject(index: number): void {
    this.subjectsList.splice(index, 1); // Remove the subject from the list
  }
}
