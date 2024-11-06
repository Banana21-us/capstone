import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConnectService } from '../../../connect.service';

export interface EditSectionDialogData {
  grade_level: number;
  strand: string;
  section_names: { name: string; id: number }[]; // Adjust according to your actual data structure
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
  strand:any;

  constructor(
    private dialogRef: MatDialogRef<EditsectiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditSectionDialogData,
    private formBuilder: FormBuilder,
    private sectionservice: ConnectService
  ) {
    this.grade_level = data.grade_level; // Assign passed grade level
    this.strand = data.strand; 
    this.editSectionForm = this.formBuilder.group({
      grade_level: [data.grade_level, Validators.required],
      strand: [data.strand, Validators.required],
      section_names: this.formBuilder.array(
          data.section_names.map(section => this.createSectionGroup(section.name, section.id))
      )
  });
  }

  private createSectionGroup(name: string,id?: number): FormGroup {
    return this.formBuilder.group({
        name: [name, Validators.required],
        id: [id] // Include the ID as a form control, default to null for new sections
    });
}

  get sectionNamesArray(): FormArray {
    return this.editSectionForm.get('section_names') as FormArray;
  }
  

  addSection(): void {
    this.sectionNamesArray.push(this.createSectionGroup('',)); // Add an empty section
  }


  removeSection(index: number): void {
    console.log('Before removal:', this.sectionNamesArray.controls);
    
    if (this.sectionNamesArray.length > 0) {
        const sectionToRemove = this.sectionNamesArray.at(index).value; 
        console.log('Section to remove:', sectionToRemove);
        
        this.sectionNamesArray.removeAt(index);
        console.log('Section removed successfully:', sectionToRemove);
        console.log('After removal:', this.sectionNamesArray.controls);
        
        if (sectionToRemove && sectionToRemove.id) {
            this.sectionservice.removeSection(sectionToRemove.id).subscribe(
                (response) => {
                    console.log('Section removed from backend successfully!', response);
                },
                (error) => {
                    console.error('Error removing section from backend:', error);
                }
            );
        } else {
            console.error('Section ID is undefined. Cannot remove section.');
        }
    } else {
        console.warn('Cannot remove the last section.');
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


  // removeSection(index: number): void {
  //   if (this.sectionNamesArray.length > 1) { // Ensure at least one section remains
  //     this.sectionNamesArray.removeAt(index); // Remove the section at the specified index
  //   }
  // }