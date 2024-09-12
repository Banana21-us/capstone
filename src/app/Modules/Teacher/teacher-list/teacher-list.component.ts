import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule} from '@angular/common/http';
import { ClassService } from '../../../class.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  providers:[ClassService],
  imports: [RouterLink, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,HttpClientModule],
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
  classes: any[] = [];

  constructor(private classservice: ClassService) {}

  ngOnInit(): void {
    this.classservice.getclasses().subscribe((data) => {
      this.classes = data;
    });
  }
  
}
