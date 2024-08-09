import { Component } from '@angular/core';
import { TeacherListComponent } from '../teacher-list/teacher-list.component';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [TeacherListComponent],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent {

}
