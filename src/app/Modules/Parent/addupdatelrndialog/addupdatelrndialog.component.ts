import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConnectService } from '../../../connect.service';
import Swal from 'sweetalert2';  // Ensure SweetAlert2 is imported
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-addupdatelrndialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogActions,
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './addupdatelrndialog.component.html',
  styleUrl: './addupdatelrndialog.component.css'
})
export class AddupdatelrndialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddupdatelrndialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  @Output() updateSuccess = new EventEmitter<void>();

  students: any[] = [];
  filteredStudents!: Observable<any[]>;
  myControl = new FormControl();
  fullName: string = this.data.fullName;
  selectedStudent!: any; // Object for selected student

  constructor(private parentService: ConnectService) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.filteredStudents = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : this.displayFn(value))),
      map((name) => (name ? this._filter(name) : this.students.slice()))
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.students.filter((student) =>
      `${student.lname}, ${student.fname}`.toLowerCase().includes(filterValue)
    );
  }

  displayFn(student: any): string {
    return student ? `${student.lname}, ${student.fname}` : '';
  }

  onStudentSelected(selectedStudent: any): void {
    this.selectedStudent = selectedStudent;
  }

  fetchStudents(): void {
    this.parentService.getAllStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  addupdateStudent(): void {
    if (!this.selectedStudent) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a student before proceeding.',
        icon: 'error',
      });
      return;
    }

    const email = this.data.email;
    const lrnArray = [this.selectedStudent.LRN];

    this.parentService.updateParentGuardian(email, lrnArray).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Student added successfully.',
          icon: 'success',
        });
        this.updateSuccess.emit();
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error updating student:', error);
        Swal.fire({
          title: 'Error',
          text: error.error?.message || 'An error occurred while updating the student.',
          icon: 'error',
        });
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
