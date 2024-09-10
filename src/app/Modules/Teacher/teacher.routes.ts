import { Routes } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';

export const teacherroutes: Routes = [
    {path: 'addteacher', component: AddTeacherComponent},
    {path: 'teacherlist', component: TeacherListComponent},
    {path: '', redirectTo: 'teacherlist', pathMatch: 'full'}
    ];

    
