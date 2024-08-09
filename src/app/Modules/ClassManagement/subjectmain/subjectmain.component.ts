import { Component } from '@angular/core';
import { AddsubjectComponent } from '../addsubject/addsubject.component';
import { SubjectlistComponent } from '../subjectlist/subjectlist.component';

@Component({
  selector: 'app-subjectmain',
  standalone: true,
  imports: [AddsubjectComponent,SubjectlistComponent],
  templateUrl: './subjectmain.component.html',
  styleUrl: './subjectmain.component.css'
})
export class SubjectmainComponent {

}
