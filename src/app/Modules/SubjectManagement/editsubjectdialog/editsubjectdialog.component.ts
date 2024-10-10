import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface EditSectionDialogData {
  grade_level: number;
  strand: string;
  subject_names: string[];
}

@Component({
    selector: 'app-editsectiondialog',
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
export class Editsubjectdialog {
  editSubjectForm: FormGroup;
  grade_level: number;

  constructor(
    private dialogRef: MatDialogRef<Editsubjectdialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditSectionDialogData,
    private formBuilder: FormBuilder
) {
  this.grade_level = data.grade_level; // Initialize here
  this.editSubjectForm = this.formBuilder.group({
    grade_level: [this.grade_level, Validators.required],
    strand: [data.strand, Validators.required],
    subject_names: this.formBuilder.array(
        Array.isArray(data.subject_names) ? data.subject_names.map(name => this.createSubjectGroup(name)) : []
    )
  });
}

  private createSubjectGroup(name: string): FormGroup {
      return this.formBuilder.group({
          name: [name, Validators.required] // Use 'name' as the control name
      });
  }

  get subjectNamesArray(): FormArray {
      return this.editSubjectForm.get('subject_names') as FormArray; // Ensure it's subject_names
  }

  addsubject(): void {
      this.subjectNamesArray.push(this.createSubjectGroup('')); // Add an empty subject
  }

  removesubject(index: number): void {
      if (this.subjectNamesArray.length > 1) { 
          this.subjectNamesArray.removeAt(index); 
      }
  }

  onSubmit(): void {
    if (this.editSubjectForm.valid) {
        const formData = {
            grade_level: this.editSubjectForm.value.grade_level,
            strand: this.editSubjectForm.value.strand,
            subject_name: this.editSubjectForm.value.subject_names.map((subject: any) => subject.name)
        };
        console.log('Form Data:', JSON.stringify(formData, null, 2));
        this.dialogRef.close(formData);
    }
}

  onCancel(): void {
      this.dialogRef.close(); 
  }
}
