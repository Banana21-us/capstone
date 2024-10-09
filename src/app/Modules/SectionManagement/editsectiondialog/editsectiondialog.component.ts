import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormArray } from '@angular/forms';

export interface EditSectionDialogData {
  grade_level: number;
  section_name: string[];
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
    MatDialogActions,MatDialogContent
  ],
  templateUrl: './editsectiondialog.component.html',
})

export class EditsectiondialogComponent {
  editSectionForm: FormGroup;
  grade_level: number; // Property to hold grade level

  constructor(
    private dialogRef: MatDialogRef<EditsectiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditSectionDialogData,
    private formBuilder: FormBuilder
  ) {
    this.grade_level = data.grade_level; // Assign passed grade level
    this.editSectionForm = this.formBuilder.group({
      grade_level: [data.grade_level, Validators.required],
      section_names: this.formBuilder.array(
        Array.isArray(data.section_name) ? data.section_name.map(name => this.createSectionGroup(name)) : []
      )
    });
  }

  private createSectionGroup(name: string): FormGroup {
    return this.formBuilder.group({
      name: [name, Validators.required] // Use 'name' as the control name
    });
  }

  get sectionNamesArray(): FormArray {
    return this.editSectionForm.get('section_names') as FormArray;
  }

  addSection(): void {
    this.sectionNamesArray.push(this.createSectionGroup('')); // Add an empty section
  }

  removeSection(index: number): void {
    this.sectionNamesArray.removeAt(index); // Remove the section at the specified index
  }

  onSubmit(): void {
    if (this.editSectionForm.valid) {
      console.log('Form Data:', JSON.stringify(this.editSectionForm.value, null, 2));
      this.dialogRef.close(this.editSectionForm.value); // Return updated values
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}