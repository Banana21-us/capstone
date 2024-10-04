import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-addsubject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent {

  subjectManagementForm: FormGroup;
  isStrandVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private subservice: ConnectService,
    private router: Router
  ) {
    this.subjectManagementForm = this.fb.group({
      subject_name: ['', Validators.required],
      grade_level: ['', Validators.required],
      strand: ['']
    });
  }

  onGradeChange() {
    const selectedGrade = this.subjectManagementForm.get('grade_level')?.value;
    this.isStrandVisible = selectedGrade === '11' || selectedGrade === '12';

    if (!this.isStrandVisible) {
      this.subjectManagementForm.get('strand')?.setValue('-');
    }
  }

  submitsubjects() {
    this.subservice.postsubject(this.subjectManagementForm.value).subscribe(
      (result: any) => {
        console.log('Subject submitted successfully:', result);
        this.subjectManagementForm.reset();
        this.navigateToMainPage();
      },
      (error) => {
        console.error('Error submitting subject:', error);
      }
    );
  }

  navigateToMainPage() {
    this.router.navigate(['/main-page/subjectmanagement/subjectlist']);
  }
}
