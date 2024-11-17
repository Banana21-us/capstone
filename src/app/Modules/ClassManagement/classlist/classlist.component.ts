import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import { EditclassdialogComponent } from '../editclassdialog/editclassdialog.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2' // Ensure SweetAlert2 is imported
import { SearchFilterPipe } from '../../../search-filter.pipe';

@Component({
  selector: 'app-classlist',
  standalone: true,
  imports: [ RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SearchFilterPipe],
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit {

  classes: any[] = [];
  classss: string[] = ['Emerald','Diamond'];
  filteredClasses: any[] = []; // To hold filtered results
  keyword: any;

  constructor(private classservice: ConnectService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadClasses();
}
loadClasses() {
  this.classservice.getClasses().subscribe((data) => {
      this.classes = data;
      this.filteredClasses = [...this.classes]; // Initialize filteredClasses
      console.log('Classes loaded:', this.classes); // Log the loaded classes
  }, error => {
      console.error('Error fetching classes:', error);
  });
}


deleteClass(classId: number): void {
  // Show confirmation alert before attempting to delete the class
  Swal.fire({
    title: "Are you sure?",
    text: `This will delete the class permanently.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete class!"
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Attempting to delete class with ID:', classId);

      this.classservice.deleteClass(classId).subscribe(
        response => {
          console.log('Class deletion response:', response.message);

          // Update the class list after successful deletion
          this.classes = this.classes.filter(c => c.class_id !== classId);
          console.log('Updated class list after deletion:', this.classes);

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The class has been deleted.",
            icon: "success"
          });
          this.loadClasses();
        },
        error => {
          console.error('Error deleting class:', error);

          // Show error message
          Swal.fire({
            title: "Error",
            text: error.error?.message || "An error occurred while deleting the class.",
            icon: "error"
          });
        }
      );
    }
  });
}


  openEditSubjectModal(classData: any): void {
    console.log('Opening edit modal for class:', classData);

    const dialogRef = this.dialog.open(EditclassdialogComponent, {
      width: 'auto',
      data: classData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog closed with result:', result);
        this.loadClasses(); // Reload classes after a successful update
      } else {
        console.log('Dialog closed without changes');
      }
    });
  }
}
