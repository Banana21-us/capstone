import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { ConnectService } from '../../../connect.service';

export interface Teacher {
  admin_id: number;
  fname: string;
  lname: string;
  role: string;
}

@Component({
  selector: 'app-editclassdialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatSelectModule
  ],
  templateUrl: './editclassdialog.component.html',
  styleUrls: ['./editclassdialog.component.css']
})
export class EditclassdialogComponent implements OnInit {
  editclassForm = new FormGroup({
    admin_id: new FormControl(null),
    time: new FormControl('', { validators: [/* Your Validators Here */]}), 
    selectedDays: new FormControl([]),
    room: new FormControl(''), 
    schedule: new FormControl(''), 
    section_id: new FormControl(''),
    subject_id: new FormControl('')
  });

  room: any;
  teachers: Teacher[] = [];
  availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
 
  level: any;
  section_name: any;
  subject_name: any;
  strand: any;
  constructor(
    private dialogRef: MatDialogRef<EditclassdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private classservice: ConnectService
  ) {
    this.room = data.room;
    this.level = data.level;
    this.section_name = data.section_name;
    this.subject_name = data.subject_name;
    this.strand = data.strand;
    console.log('Dialog opened with data:', data);
  }

  ngOnInit(): void {
    this.fetchTeachers();
    this.editclassForm.patchValue({
      admin_id: this.data.admin_id,
      time: this.data.time,
      selectedDays: this.data.schedule.split(','), 
      room: this.data.room,
      section_id: this.data.section_id,
      subject_id: this.data.subject_id
    });
  }

  onSubmit(): void {
    if (this.editclassForm.valid) {
      const adminIdControl = this.editclassForm.get('admin_id');
      const subjectIdControl = this.editclassForm.get('subject_id');
      const timeControl = this.editclassForm.get('time');
      const selectedDaysControl = this.editclassForm.get('selectedDays');

      const formData = {
        ...this.editclassForm.value,
        class_id: this.data.class_id,
        subject_id: this.data.subject_id,
        section_id: this.data.section_id,
        forms: [
          {
            teacher: adminIdControl ? adminIdControl.value : null,
            subject_id: subjectIdControl ? subjectIdControl.value : null,
            time: timeControl ? timeControl.value : null,
            selectedDays: selectedDaysControl ? selectedDaysControl.value : []
          }
        ]
      };

      this.classservice.updateClass(formData).subscribe(
        response => {
          console.log('Update response:', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error updating class:', error);
        }
      );
    }
  }

  fetchTeachers() {
    this.classservice.getTeachers().subscribe(
      (data: Teacher[]) => {
        this.teachers = data.filter(teacher => teacher.role === 'Teacher');
        console.log('Fetched teachers:', this.teachers); 
      },
      (error) => {
        console.error('Error fetching teachers:', error); 
      }
    );
  }

  onCancel(): void {
    console.log('Dialog closed without saving changes'); 
    this.dialogRef.close(); 
  }
}