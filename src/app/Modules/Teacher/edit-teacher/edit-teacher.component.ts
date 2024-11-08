import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConnectService } from '../../../connect.service';
import Swal from 'sweetalert2';  // Ensure SweetAlert2 is imported

@Component({
  selector: 'app-edit-teacher',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatDialogContent,MatDialogActions],
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent {

  editteacherform = new FormGroup({
    lname: new FormControl(''),
    fname: new FormControl(''),
    mname: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl('')
  });

  constructor(
    private dialogRef: MatDialogRef<EditTeacherComponent>,
    private classservice: ConnectService,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecting data
) {
    // Populate form with data received from dialog
    this.editteacherform.patchValue({
        lname: data.lname,
        fname: data.fname,
        mname: data.mname,
        email: data.email,
        address: data.address
    });
}

  onCancel(): void {
      console.log('Dialog closed without saving changes'); 
      this.dialogRef.close(); 
  }

  onSubmit() {
    if (this.editteacherform.valid) {
        const updatedAdmin = {
            admin_id: this.data.admin_id, // Use admin_id here
            ...this.editteacherform.value
        };

        console.log('Updating admin with data:', updatedAdmin); // Log for debugging

        this.classservice.updateAdmin(updatedAdmin).subscribe(
            response => {
                console.log('Admin updated successfully:', response);
                this.dialogRef.close(true); // Close dialog and return true
                Swal.fire({
                  title: "Success!",
                  text: "Teacher updated successfully!",
                  icon: "success"
                });
            },
            error => {
                console.error('Error updating admin:', error);
            }
        );
    }
}
}