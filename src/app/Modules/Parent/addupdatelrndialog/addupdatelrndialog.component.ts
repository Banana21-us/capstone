import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConnectService } from '../../../connect.service';
import Swal from 'sweetalert2';  // Ensure SweetAlert2 is imported

@Component({
  selector: 'app-addupdatelrndialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogActions,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './addupdatelrndialog.component.html',
  styleUrl: './addupdatelrndialog.component.css'
})
export class AddupdatelrndialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddupdatelrndialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  @Output() updateSuccess = new EventEmitter<void>(); // Create an 
  
  constructor(private parentservice: ConnectService) {}

  students: any[] = [];
  selectedStudent!: string; // Holds the selected student's LRN

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.parentservice.getAllStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addupdateStudent(): void {
    const email = this.data.email; // Get the email passed to the dialog
    const lrnArray = [this.selectedStudent]; // Create an array with the selected LRN
    
    this.parentservice.updateParentGuardian(email, lrnArray).subscribe(
      response => {
        console.log('Success:', response);
        
        // Show success message
        Swal.fire({
          title: "Success!",
          text: "Student added successfully .",
          icon: "success"
        });
        
        this.updateSuccess.emit(); // Emit event on success
        this.dialogRef.close(); // Close the dialog on success
      },
      error => {
        console.error('Error updating student:', error);
        Swal.fire({
          title: "Error",
          text: error.error?.message || "An error occurred while updating the student.",
          icon: "error"
        });
      }
    );
  }
  
  

}
