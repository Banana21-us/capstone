import { Routes } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherpageComponent } from './teacherpage/teacherpage.component';

export const teacherroutes: Routes = [
    {path:'teacherpage', component: TeacherpageComponent,
        children:[
            {path: 'addteacher', component: AddTeacherComponent},
            {path: 'teacherlist', component: TeacherListComponent},
        ]
    },
    {path: '', redirectTo: 'teacherpage', pathMatch: 'full'}
    ];

    
