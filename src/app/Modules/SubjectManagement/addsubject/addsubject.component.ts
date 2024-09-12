import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SubjectService } from '../../../subject.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addsubject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent {
  subjectManagementForm: FormGroup;

  constructor(private fb: FormBuilder, private subservice: SubjectService) {
    this.subjectManagementForm = this.fb.group({
      subjectname: ['', Validators.required],
      gradelevel: ['', [Validators.required, Validators.min(1)]],
      strand: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.subjectManagementForm.valid) {
      this.subservice.postsubject(this.subjectManagementForm.value).subscribe(
        (result: any) => {
          console.log('Subject submitted successfully:', result);
          this.subjectManagementForm.reset();
        },
        error => {
          console.error('Error submitting subject:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}