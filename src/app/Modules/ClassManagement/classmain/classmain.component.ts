import { Component } from '@angular/core';
import { AddclassComponent } from '../addclass/addclass.component';
import { ClasslistComponent } from '../classlist/classlist.component';

@Component({
  selector: 'app-classmain',
  standalone: true,
  imports: [AddclassComponent,ClasslistComponent],
  templateUrl: './classmain.component.html',
  styleUrl: './classmain.component.css'
})
export class ClassmainComponent {

}
