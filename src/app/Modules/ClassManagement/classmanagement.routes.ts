import { Routes } from '@angular/router';
import { ManagementmainComponent } from './managementmain/managementmain.component';
import { ClassmainComponent } from './classmain/classmain.component';
import { ClasslistComponent } from './classlist/classlist.component';
import { AddclassComponent } from './addclass/addclass.component';
import { SubjectmainComponent } from './subjectmain/subjectmain.component';
import { SubjectlistComponent } from './subjectlist/subjectlist.component';
import { AddsubjectComponent } from './addsubject/addsubject.component';

export const managementroute: Routes = [
    {
        path: 'managementmain', 
        component: ManagementmainComponent,
        children: [
          {
            path: 'classmain', 
            component: ClassmainComponent,
            children: [
              { path: 'classlist', component: ClasslistComponent },
              { path: 'addclass', component: AddclassComponent },
              { path: '', redirectTo: 'classlist', pathMatch: 'full' }
            ]
          },
          {
            path: 'subjectmain', 
            component: SubjectmainComponent,
            children: [
              { path: 'subjectlist', component: SubjectlistComponent },
              { path: 'addsubject', component: AddsubjectComponent },
              { path: '', redirectTo: 'subjectlist', pathMatch: 'full' }
            ]
          },
          { path: '', redirectTo: 'classmain', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'managementmain', pathMatch: 'full' }
    ];
