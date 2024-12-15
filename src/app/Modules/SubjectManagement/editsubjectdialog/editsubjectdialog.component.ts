import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConnectService } from '../../../connect.service';
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is imported

export interface EditSubjectDialogData {
  grade_level: number;
  strand: string;
  subject_name: { name: string; id: number }[]; // Change from subject_names to subject_name
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
    MatDialogContent,
  ],
  templateUrl: './editsubjectdialog.component.html',
})
export class Editsubjectdialogcomponent {
  editSubjectForm: FormGroup;
  grade_level: number;
  strand: any;
  constructor(
    private dialogRef: MatDialogRef<Editsubjectdialogcomponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditSubjectDialogData,
    private formBuilder: FormBuilder,
    private subjectservice: ConnectService
  ) {
    console.log('Received dialog data:', data); // Log received data
    this.grade_level = data.grade_level;
    this.strand = data.strand;
    this.editSubjectForm = this.formBuilder.group({
      grade_level: [data.grade_level, Validators.required],
      strand: [data.strand, Validators.required],
      subject_names: this.formBuilder.array(
        Array.isArray(data.subject_name)
          ? data.subject_name.map((subject) =>
              this.createSubjectGroup(subject.name, subject.id)
            )
          : []
      ),
    });
  }

  private createSubjectGroup(name: string, id?: number): FormGroup {
    return this.formBuilder.group({
      id: [id || null], // Add id field, default to null if not provided
      name: [name, Validators.required],
    });
  }

  get subjectNamesArray(): FormArray {
    return this.editSubjectForm.get('subject_names') as FormArray;
  }

  addsubject(): void {
    this.subjectNamesArray.push(this.createSubjectGroup(''));
  }
  removesubject(index: number): void {
    // Check if the subject at the given index has a value
    const subjectToRemove = this.subjectNamesArray.at(index)?.value;

    // If subjectToRemove is undefined or lacks an ID, remove it directly and log an error
    if (!subjectToRemove || !subjectToRemove.id) {
      console.error('Subject ID is undefined. Cannot remove subject.');
      this.subjectNamesArray.removeAt(index); // Remove the subject without showing a confirmation dialog
      return;
    }

    // Show confirmation alert if the subject exists and has a valid ID
    Swal.fire({
      title: 'Are you sure?',
      text: `This will delete the subject "${subjectToRemove.name}" permanently.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete subject!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Before removal:', this.subjectNamesArray.controls);

        // Remove the subject from the array
        this.subjectNamesArray.removeAt(index);
        console.log('Subject removed successfully:', subjectToRemove);
        console.log('After removal:', this.subjectNamesArray.controls);

        // Remove from the backend if the subject has a valid ID
        this.subjectservice.removesubject(subjectToRemove.id).subscribe(
          (response) => {
            console.log('Subject removed from backend successfully!', response);

            // Show success message
            // Swal.fire({
            //   title: 'Deleted!',
            //   text: 'The subject has been deleted.',
            //   icon: 'success',
            // });
          },
          (error) => {
            console.error('Error removing subject from backend:', error);

            // Show error message
            Swal.fire({
              title: 'Error',
              text:
                error.error?.message ||
                'An error occurred while deleting the subject.',
              icon: 'error',
            });
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.editSubjectForm.valid) {
      const formData = {
        grade_level: this.editSubjectForm.value.grade_level,
        strand: this.editSubjectForm.value.strand,
        subject_name: this.editSubjectForm.value.subject_names,
      };
      Swal.fire({
        title: 'Success!',
        text: 'Subjects updated successfully!',
        icon: 'success',
      });
      console.log('Form Data being sent back:', formData);
      this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
