import { Routes } from '@angular/router';
import { AddsectionComponent } from './addsection/addsection.component';
import { ViewsectionComponent } from './viewsection/viewsection.component';

export const sectionroutes: Routes = [
    {path: 'addsection', component: AddsectionComponent},
    {path: 'viewsection', component: ViewsectionComponent},
    {path: '', redirectTo: 'viewsection', pathMatch: 'full'}
    ];
