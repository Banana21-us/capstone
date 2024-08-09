import { Component } from '@angular/core';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';

@Component({
  selector: 'app-teacherpage',
  standalone: true,
  imports: [TeacherListComponent,AddTeacherComponent],
  templateUrl: './teacherpage.component.html',
  styleUrl: './teacherpage.component.css'
})
export class TeacherpageComponent {

}
