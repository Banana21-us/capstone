import { Routes } from '@angular/router';
import { AddparentComponent } from './addparent/addparent.component';
import { ParentlistComponent } from './parentlist/parentlist.component';
import { AddlrndialogComponent } from './addlrndialog/addlrndialog.component';

export const parentroutes: Routes = [
    {path: 'addparent', component: AddparentComponent},
    {path: 'parentlist', component: ParentlistComponent},    
    {path: 'addlrn', component: AddlrndialogComponent},
    {path: '', redirectTo: 'parentlist', pathMatch: 'full'}
    ];

    
