import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddlrndialogComponent } from '../addlrndialog/addlrndialog.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { ConnectService } from '../../../connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addparent',
  standalone: true,
  templateUrl: './addparent.component.html',
  styleUrls: ['./addparent.component.css'],
  imports: [MatButtonModule, CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
})
export class AddparentComponent {
  parentform = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    mname: new FormControl(''),
    email: new FormControl(''),
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
                
            },
            error => {
                console.error('Error during registration:', error.error); // Log specific error details
            }
        );
    } else {
        console.log('Form is invalid', this.parentform.errors); // Log form errors if any
    }
}
    navigateToMainPage() {
      console.log('Router:', this.router); // Check if router is defined
      this.router.navigate(['/main-page/parent/parentlist']);
    }
}
