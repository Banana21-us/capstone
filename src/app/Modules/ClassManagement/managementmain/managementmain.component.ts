import { Component } from '@angular/core';
import { ClassmainComponent } from '../classmain/classmain.component';
import { SubjectmainComponent } from '../subjectmain/subjectmain.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-managementmain',
  standalone: true,
  imports: [ClassmainComponent,SubjectmainComponent,RouterLink,RouterModule],
  templateUrl: './managementmain.component.html',
  styleUrl: './managementmain.component.css'
})
export class ManagementmainComponent {

}
