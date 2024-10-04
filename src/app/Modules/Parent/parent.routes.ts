import { Routes } from '@angular/router';
import { AddparentComponent } from './addparent/addparent.component';
import { ParentlistComponent } from './parentlist/parentlist.component';

export const parentroutes: Routes = [
    {path: 'addparent', component: AddparentComponent},
    {path: 'parentlist', component: ParentlistComponent},
    {path: '', redirectTo: 'parentlist', pathMatch: 'full'}
    ];

    
