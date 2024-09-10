import { Routes } from '@angular/router';
import { AddclassComponent } from './addclass/addclass.component';
import { ClasslistComponent } from './classlist/classlist.component';

export const managementroute: Routes = [
    {path: 'addclass', component: AddclassComponent},
    {path: 'classlist', component: ClasslistComponent},
    {path: '', redirectTo: 'classlist', pathMatch: 'full'}
    ];
