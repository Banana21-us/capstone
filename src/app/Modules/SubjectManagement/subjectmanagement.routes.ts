import { Routes } from '@angular/router';
import { AddsubjectComponent } from './addsubject/addsubject.component';
import { SubjectlistComponent } from './subjectlist/subjectlist.component';

export const subjectmanagementroute: Routes = [
    {path: 'addsubject', component: AddsubjectComponent},
    {path: 'subjectlist', component: SubjectlistComponent},
    {path: '', redirectTo: 'subjectlist', pathMatch: 'full'}
    ];
