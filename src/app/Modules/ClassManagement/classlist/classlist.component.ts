import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import { EditclassdialogComponent } from '../editclassdialog/editclassdialog.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-classlist',
  standalone: true,
  imports: [CommonModule, RouterLink,MatFormField,MatLabel,MatSelect,MatOption],
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit {

  classes: any[] = [];
  classss: string[] = ['Emerald','Diamond'];

  constructor(private classservice: ConnectService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.classservice.getClasses().subscribe((data) => {
        this.classes = data;
        console.log('Classes loaded:', this.classes);
    }, error => {
        console.error('Error fetching classes:', error);
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
