import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface EditSectionDialogData {
  grade_level: number;
  strand: string; // Include strand in the interface
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
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './editsectiondialog.component.html',
})
export class EditsectiondialogComponent {
  editSectionForm: FormGroup;
  grade_level: number;

  constructor(
    private dialogRef: MatDialogRef<EditsectiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditSectionDialogData,
    private formBuilder: FormBuilder
  ) {
    this.grade_level = data.grade_level; // Assign passed grade level
    this.editSectionForm = this.formBuilder.group({
      grade_level: [data.grade_level, Validators.required],
      strand: [data.strand, Validators.required], // Initialize strand field with passed value
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
    if (this.sectionNamesArray.length > 1) { // Ensure at least one section remains
      this.sectionNamesArray.removeAt(index); // Remove the section at the specified index
    }
  }

  onSubmit(): void {
    if (this.editSectionForm.valid) {
      const formData = {
        grade_level: this.editSectionForm.value.grade_level,
        strand: this.editSectionForm.value.strand, // Include strand in submitted data
        section_names: this.editSectionForm.value.section_names // Ensure this matches what the backend expects
      };
      console.log('Form Data:', JSON.stringify(formData, null, 2));
      this.dialogRef.close(formData); // Return updated values
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}