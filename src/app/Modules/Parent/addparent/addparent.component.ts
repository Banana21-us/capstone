import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddlrndialogComponent } from '../addlrndialog/addlrndialog.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn, FormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { ConnectService } from '../../../connect.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Ensure SweetAlert2 is imported
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-addparent',
  standalone: true,
  templateUrl: './addparent.component.html',
  styleUrls: ['./addparent.component.css'],
  imports: [MatButtonModule, CommonModule, ReactiveFormsModule,MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,MatError], // Add ReactiveFormsModule here
})
export class AddparentComponent {
  parentform = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    mname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email, customEmailValidator()]),
    relationship: new FormControl(''),
    address: new FormControl(''),
    contact_no: new FormControl(''),
    password: new FormControl(''),
    LRN: new FormArray([]), // Initialize as a FormArray
  });

  studentList: any[] = []; // Array to hold objects with student names and LRNs
  
  constructor(private dialog: MatDialog, private parentservice: ConnectService,private router: Router) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddlrndialogComponent, {
      width: '700px',
      data: { children: 'LRN' },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Check if the LRN already exists in the studentList
        const exists = this.studentList.some(student => student.LRN === result.LRN);
        if (!exists) {
          this.studentList.push(result); // Add the student's name and LRN to the list
          this.addLRN(result.LRN); // Add the LRN to the FormArray
        } else {
          // Optionally, you can show a message that the LRN is a duplicate
          console.log('This LRN already exists in the list.');
        }
      }
    });
  }
  

  addLRN(lrn: number): void {
    if (lrn) { // Check if lrn is valid
        (this.parentform.get('LRN') as FormArray).push(new FormControl(lrn));
    } else {
        console.error('Invalid LRN provided:', lrn);
    }
}

  removeStudent(index: number): void {
    this.studentList.splice(index, 1); // Remove the student from the list
    (this.parentform.get('LRN') as FormArray).removeAt(index); // Remove corresponding LRN from the FormArray
  }

  // Helper method to get FormArray controls for LRNs
  getLRNControls(): FormControl[] {
    return (this.parentform.get('LRN') as FormArray).controls as FormControl[];
  }
  

  registerParent(): void {
    console.log('Form Values:', this.parentform.value); // Log form values
    if (this.parentform.valid) {
        this.parentservice.submitparent(this.parentform.value).subscribe(
            response => {
                console.log('Registration successful:', response);
                this.navigateToMainPage();
                Swal.fire({
                  title: "Success!",
                  text: "Parent account created successfully!",
                  icon: "success"
                });
                
            },
            error => {
              Swal.fire({
                icon: "error",
                title: "Oopps! Validation Errors",
                html: `
                  <p>The following issues need to be resolved:</p>
                  <ul style="text-align: left;">
                    <li>Email address is already registered. Please use a different one.</li>
                    <li>Password must be at least 8 characters long.</li>
                  </ul>
                `,
              });
                console.error('Error during registration:', error.error); // Log specific error details
            }
        );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oopps! Validation Errors",
        html: `
          <p>The following issues need to be resolved:</p>
          <ul style="text-align: left;">
            <li>Email address is already registered. Please use a different one.</li>
            <li>Contact must be all numbers</li>
            <li>Password must be at least 8 characters long.</li>
          </ul>
        `,
      });
        console.log('Form is invalid', this.parentform.errors); // Log form errors if any
    }
}
    navigateToMainPage() {
      console.log('Router:', this.router); // Check if router is defined
      this.router.navigate(['/main-page/parent/parentlist']);
    }
}
export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    
    // Basic email regex to validate format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Check if the email is in a valid format
    if (!emailRegex.test(email)) {
      return { invalidEmailFormat: true };
    }

    // Check for specific invalid domains (e.g., .vom)
    const domain = email.split('@')[1];
    if (domain && domain.endsWith('.vom')) {
      return { invalidDomain: true };
    }

    return null; // Valid email
  };
}