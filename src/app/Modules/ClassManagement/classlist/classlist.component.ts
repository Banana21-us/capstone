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
  // classss: string[] = ['Emerald','Diamond'];
  filteredClasses: any[] = []; // To hold filtered results
  keyword: any;

  constructor(private classservice: ConnectService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadClasses();
}
loadClasses() {
  this.classservice.getClasses().subscribe((data) => {
    this.classes = data;

    // Sort classes first by level (Junior first), then by semester (1st semester before 2nd semester)
    this.filteredClasses = [...this.classes].sort((a, b) => {
      // Sort Junior classes first (level 7-10)
      if (a.level >= 7 && a.level <= 10 && !(b.level >= 7 && b.level <= 10)) return -1;
      if (b.level >= 7 && b.level <= 10 && !(a.level >= 7 && a.level <= 10)) return 1;

      // Then sort Senior classes by semester (1st before 2nd)
      if (a.level >= 11 && a.level <= 12 && b.level >= 11 && b.level <= 12) {
        return a.semester - b.semester;
      }

      return 0; // If both are either junior or senior classes, no need to change order
    });

    console.log('Classes loaded:', this.classes);
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
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "The class has been deleted.",
          //   icon: "success"
          // });
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

getOrdinal(n: number): string {
  if (n === null || n === undefined) {
      return ''; // Return empty string if n is null or undefined
  }
  
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
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
