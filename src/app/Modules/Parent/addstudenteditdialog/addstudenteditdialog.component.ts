import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-addstudenteditdialog',
  standalone: true,
  imports: [MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule, // Add MatSelectModule here
    MatDialogContent,
    MatDialogActions,
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './addstudenteditdialog.component.html',
  styleUrl: './addstudenteditdialog.component.css'
})
export class AddstudenteditdialogComponent implements OnInit{

  readonly dialogRef = inject(MatDialogRef<AddstudenteditdialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  
  students: any[] = []; // Array to hold available students
  selectedStudent: any; // Variable to hold the selected student
  myControl = new FormControl();
  filteredOptions!: Observable<any[]>;
  @Output() studentAdded = new EventEmitter<any>();

  constructor(private parentservice: ConnectService) {}

  ngOnInit(): void {
    this.fetchStudents(); // Fetch available students when the dialog initializes
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : this.displayFn(value))),
      map((name) => this._filter(name || ''))
    );
  }
  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.students.filter((student) =>
      (`${student.lname}, ${student.fname}`.toLowerCase().includes(filterValue))
    );
  }

  displayFn(student: any): string {
    return student ? `${student.lname}, ${student.fname}` : '';
  }

  onOptionSelected(student: any): void {
    this.studentAdded.emit(student); 
    this.dialogRef.close(student);    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchStudents(): void {
    this.parentservice.getAllStudents().subscribe(
      (students) => {
        this.students = students; // Assuming students is an array of student objects
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  searchStudent(): void {
      if (this.selectedStudent) {
        const lrn = this.selectedStudent.LRN; 
        this.parentservice.getStudentByLRN(lrn).subscribe(
          (student) => {
            if (student) {
              const fullName = `${student.fname} ${student.lname} ${student.mname || ''}`.trim();
              // this.dialogRef.close({ fullName, LRN: student.LRN });
            }
            
          },
          (error) => {
            console.error('Error fetching student:', error);
          }
        );
      }
    }
  
}