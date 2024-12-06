  import { CommonModule } from '@angular/common';
  import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';
  import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { MatButtonModule } from '@angular/material/button';
  import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatSelectModule } from '@angular/material/select';
  import { ConnectService } from '../../../connect.service';
  import Swal from 'sweetalert2';  // Ensure SweetAlert2 is imported
  import { MatAutocompleteModule } from '@angular/material/autocomplete';
  import { MatInputModule } from '@angular/material/input';
  import { map, Observable, startWith } from 'rxjs';
  import { ChangeDetectorRef } from '@angular/core'; 
import { AddstudenteditdialogComponent } from '../addstudenteditdialog/addstudenteditdialog.component';
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
    readonly dialog = inject(MatDialog);
    @Output() updateSuccess = new EventEmitter<void>();
    parent:any;
    stud: FormArray;
    students: any[] = [];
    stu: any[] = [];
    filteredStudents!: Observable<any[]>;
    myControl = new FormControl();
    emailControl = new FormControl(this.data.email, [Validators.email]);
    passwordControl = new FormControl('', Validators.required);
    fullName: string = this.data.fullName;
    selectedStudent!: any;

    constructor(
      private parentService: ConnectService, 
      @Inject(MAT_DIALOG_DATA) public data: any,  
      private fb: FormBuilder, 
      private cdr: ChangeDetectorRef) {
      this.students = data.students;
      this.stud = this.fb.array([]);
    }

    ngOnInit(): void {
      console.log('Current students:', this.students);
      this.fetchStudents();
      console.log("Injected email:", this.data.email);
      console.log("Parent object:", parent);
    }

    private _filter(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.stu.filter(student =>
        `${student.fname} ${student.lname}`.toLowerCase().includes(filterValue)
      );
    }

    displayFn(student?: any): string {
      return student ? `${student.lname}, ${student.fname}` : '';
    }

    fetchStudents(): void {
      this.parentService.getAllStudents().subscribe(
        (students) => {
          this.stu = students;  // Store the fetched students
          this.filteredStudents = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => (typeof value === 'string' ? value : this.displayFn(value))),
            map((name) => (name ? this._filter(name) : this.stu.slice()))  // Ensure filtering uses 'stu'
          );
        },
        (error) => {
          console.error('Error fetching students:', error);
        }
      );
    }
    
    trackByStudent(index: number, student: any): any {
      return student.LRN;  // Use a unique identifier for each student (e.g., LRN)
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    openaddStudent(): void {
      const dialogRef = this.dialog.open(AddstudenteditdialogComponent);
      
      dialogRef.componentInstance.studentAdded.subscribe(result => {
        if (result) {
          const exists = this.students.some(student => student.LRN === result.LRN);
          if (!exists) {
            this.students.push(result); 
            this.addLRN(result.LRN); // Add the LRN to the FormArray
            this.cdr.detectChanges();
          } else {
            console.log('This LRN already exists in the list.');
          }
        }
      });
      
      dialogRef.afterClosed().subscribe((result) => {
        console.log('Dialog closed with result:', result);
      });
    }
    addLRN(lrn: number): void {
      const existingStudent = this.students.find(s => s.LRN === lrn);
      if (!existingStudent) {
        this.students.push({ LRN: lrn });
        this.cdr.detectChanges(); 
        this.filteredStudents = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : this.displayFn(value))),
          map((name) => (name ? this._filter(name) : this.students.slice())) 
        );
      }
    }
    
    onSubmit(): void {
      const updatedData = {
        email: this.emailControl.value,
        password: this.passwordControl.value || undefined,
        LRN: this.students.map(student => student.LRN), // Include LRN array
      };
    
      this.parentService.updateParentGuardian(this.data.email, updatedData).subscribe(
        (response) => {
          console.log('Parent updated successfully:', response);
          this.dialogRef.close(updatedData);
          this.updateSuccess.emit();
          Swal.fire({
            title: "Success!",
            text: "Parent updated successfully!",
            icon: "success"
          });
        },
        (error) => {
          console.error('Error updating parent:', error);
          let errorMessage = 'There was an issue updating the parent details.';
          if (error && error.error && error.error.message) {
            errorMessage = error.error.message;
          } else if (error && error.status && error.statusText) {
            errorMessage = `Error ${error.status}: ${error.statusText}`;
          }
          Swal.fire('Error', errorMessage, 'error');
        }
      );
    }
    removelrn(email: string, lrn: number): void {
      console.log("Email:", email, "LRN:", lrn); // Log the incoming parameters
      console.log("Injected email:", this.data.email);
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove Student!"
      }).then((result) => {
          if (result.isConfirmed) {
              this.parentService.deleteGuardian(email, lrn).subscribe(
                  (response) => {
                      console.log('Student LRN nullified successfully!');
                      this.updatenewList(email, lrn); // Update the list
                      Swal.fire({
                          title: "Removed!",
                          text: "Student removed successfully!",
                          icon: "success"
                      });
                  },
                  (error) => {
                      console.error('Error removing student:', error);
                      Swal.fire({
                          title: "Error",
                          text: error.error?.message || "An error occurred while removing the student's LRN.",
                          icon: "error"
                      });
                  }
              );
          }
      });
  }

    updatenewList(email: string, lrn: number): void {
      const indexToRemove = this.students.findIndex(student => student.LRN === lrn);
      if (indexToRemove !== -1) {
        this.students.splice(indexToRemove, 1);
        console.log('Updated students list:', this.students);
        this.filteredStudents = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : this.displayFn(value))),
          map((name) => (name ? this._filter(name) : this.students.slice()))
        );
        this.cdr.detectChanges();
      } else {
        console.warn(`Student with LRN ${lrn} not found in the list.`);
      }
    }
  }