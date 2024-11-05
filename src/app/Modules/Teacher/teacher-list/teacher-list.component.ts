import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConnectService } from '../../../connect.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTeacherComponent } from '../edit-teacher/edit-teacher.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,CommonModule,ReactiveFormsModule ],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  teacherFilterCtrl = new FormControl(); // Control for the search input
  filteredTeachers: any[] = []; // List of filtered teachers
  teachers: any[] = []; // All teachers

  constructor(private teacherservice: ConnectService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchteacher();
    
    // Subscribe to changes in the search input
    this.teacherFilterCtrl.valueChanges.subscribe(() => {
      this.filterTeachers();
    });
  }

  fetchteacher() {
    this.teacherservice.getteacher().subscribe((data) => {
      this.teachers = data.filter(teacher => teacher.role === 'Teacher');
      this.filteredTeachers = [...this.teachers]; // Initialize filteredTeachers with all fetched teachers
      console.log(data);
    });
  }

  filterTeachers() {
    const filterValue = this.teacherFilterCtrl.value ? this.teacherFilterCtrl.value.toLowerCase() : '';
    this.filteredTeachers = this.teachers.filter(teacher =>
      `${teacher.fname} ${teacher.lname}`.toLowerCase().includes(filterValue)
    );
  }

  onDelete(admin_id: number): void {
    this.teacherservice.deleteteacher(admin_id).subscribe(
      response => {
        console.log('Deleting teacher:', response.message);
        // Optionally refresh the teacher list here
        this.fetchteacher(); 
      },
      error => {
        console.error('Error deleting teacher:', error);
        if (error.status) {
          console.error('HTTP Status:', error.status);
        }
        if (error.error && error.error.message) {
          console.error('Server message:', error.error.message);
        } else {
          console.error('Unexpected error format:', error);
        }
      }
    );
  }

  openEditSubjectModal(teacher: any): void {
    console.log(teacher);
    const dialogRef = this.dialog.open(EditTeacherComponent, {
      width: 'auto',
      data: teacher // Ensure this includes the ID
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchteacher(); // Refresh teacher list after closing dialog
      }
    });
  }
}