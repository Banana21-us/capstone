import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import { EditclassdialogComponent } from '../editclassdialog/editclassdialog.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-classlist',
  standalone: true,
  imports: [ RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,],
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit {

  classes: any[] = [];
  classss: string[] = ['Emerald','Diamond'];
  classFilterCtrl = new FormControl();
  filteredClasses: any[] = []; // To hold filtered results

  constructor(private classservice: ConnectService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.loadClasses();
    this.classFilterCtrl.valueChanges.subscribe(() => {
        this.filterSection();
    });
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

filterSection() {
  const filterValue = this.classFilterCtrl.value ? this.classFilterCtrl.value.toLowerCase() : '';

  if (!filterValue) {
      this.filteredClasses = [...this.classes]; // Reset to all classes if no filter
      return;
  }

  this.filteredClasses = this.classes.filter(classItem => {
      console.log('Checking class item:', classItem); // Log each item being checked

      // Convert level and room to string if they are not already
      const levelString = classItem.level ? String(classItem.level) : '';
      const roomString = classItem.room ? String(classItem.room) : '';
      const sectionNameString = classItem.section_name ? String(classItem.section_name) : '';

      return (
          (levelString.toLowerCase().includes(filterValue)) || 
          (classItem.strand && typeof classItem.strand === 'string' && classItem.strand.toLowerCase().includes(filterValue)) ||
          (classItem.subject_name && typeof classItem.subject_name === 'string' && classItem.subject_name.toLowerCase().includes(filterValue)) ||
          (classItem.fname && typeof classItem.fname === 'string' && classItem.fname.toLowerCase().includes(filterValue)) ||
          (classItem.lname && typeof classItem.lname === 'string' && classItem.lname.toLowerCase().includes(filterValue)) ||
          (classItem.time && typeof classItem.time === 'string' && classItem.time.toLowerCase().includes(filterValue)) ||
          (classItem.schedule && typeof classItem.schedule === 'string' && classItem.schedule.toLowerCase().includes(filterValue)) ||
          (roomString.toLowerCase().includes(filterValue)) ||
          (sectionNameString.toLowerCase().includes(filterValue)) // Include section_name in the filter
      );
  });
}


  deleteClass(classId: number) {
    console.log('Attempting to delete class with ID:', classId);

    this.classservice.deleteClass(classId).subscribe(
      response => {
        console.log('Class deletion response:', response.message);
        this.classes = this.classes.filter(c => c.class_id !== classId);
        console.log('Updated class list after deletion:', this.classes);
      },
      error => {
        console.error('Error deleting class:', error);
      }
    );
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
