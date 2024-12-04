import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { AddsubjectdialogComponent } from '../addsubjectdialog/addsubjectdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-addsubject',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,MatError],
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
    
    if (this.subjectsList.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "No subjects to submit",  
      });
      return;
    }
    const formData = {
        ...this.subjectManagementForm.value,
        subject_name: this.subjectsList, 
        section: this.subjectManagementForm.get('section_name')?.value 
    };

    if (!formData.grade_level || !formData.strand || formData.subject_name.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "No grade level to submit",  
      });
      console.error('Form is invalid:', formData);
      return;
    }

    this.subservice.postsubject(formData).subscribe(
        (result) => {
            console.log('Subjects submitted successfully:', result);
            this.subjectManagementForm.reset();
            this.subjectsList = []; // Reset subjects list after submission
            Swal.fire({
              title: "Success!",
              text: "Subjects created successfully!",
              icon: "success"
            });
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
      width: 'auto',
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
