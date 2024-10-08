import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})

export class TeacherListComponent implements OnInit{

  states: string[] = [
    'Mario Miko Ofiaza',
    'Rianne Agnieka',
    'Arjay Subido',
    'Dionece College',
    'Glen lozada',
  ];

  teachers: any[] = [];

  constructor(private teacherservice: ConnectService) {}

  ngOnInit(): void {
    this.fetchteacher();
  }
  fetchteacher(){
    this.teacherservice.getteacher().subscribe((data) => {
      this.teachers = data;
    });
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
  
}
