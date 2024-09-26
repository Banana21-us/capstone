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
  // classes: any[] = [];

  teachers: any[] = [];

  constructor(private teacherservice: ConnectService) {}

  ngOnInit(): void {
    this.teacherservice.getteacher().subscribe((data) => {
      this.teachers = data;
    });
  }
  
}
