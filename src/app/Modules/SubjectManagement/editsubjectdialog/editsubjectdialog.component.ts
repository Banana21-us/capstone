import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface EditSubjectDialogData {
    grade_level: number;
    strand: string;
    subject_name: string[]; // Use subject_names instead of subject_name
}

@Component({
    selector: 'app-editsubjectdialog',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatDialogActions,
      MatDialogContent
  ],
  templateUrl: './editsubjectdialog.component.html',
})
export class Editsubjectdialogcomponent {
    editSubjectForm: FormGroup;
    grade_level: number;
    constructor(
        private dialogRef: MatDialogRef<Editsubjectdialogcomponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditSubjectDialogData,
        private formBuilder: FormBuilder
    ) {
        console.log('Received dialog data:', data); // Log received data
            this.grade_level = data.grade_level;
            this.editSubjectForm = this.formBuilder.group({
            grade_level: [data.grade_level, Validators.required],
            strand: [data.strand,Validators.required],
            subject_names: this.formBuilder.array(
                Array.isArray(data.subject_name) ? data.subject_name.map(name => this.createSubjectGroup(name)) : []
            )
        });
    }

  private createSubjectGroup(name: string): FormGroup {
      return this.formBuilder.group({
          name: [name, Validators.required]
      });
  }

  get subjectNamesArray(): FormArray {
      return this.editSubjectForm.get('subject_names') as FormArray;
  }


  addsubject(): void {
      this.subjectNamesArray.push(this.createSubjectGroup(''));
  }

  removesubject(index: number): void {
    console.log('Before removal:', this.subjectNamesArray.controls);
    if (this.subjectNamesArray.length > 1) {
        this.subjectNamesArray.removeAt(index);
        console.log('After removal:', this.subjectNamesArray.controls);
    } else {
        console.warn('Cannot remove the last subject.');
    }
}

  onSubmit(): void {
    if (this.editSubjectForm.valid) {
        const formData = {
            grade_level: this.editSubjectForm.value.grade_level,
            strand: this.editSubjectForm.value.strand,
            subject_names: this.editSubjectForm.value.subject_names
        };
        console.log('Form Data being sent back:', formData);
        this.dialogRef.close(formData);
    }
}


  onCancel(): void {
      this.dialogRef.close();
  }
}