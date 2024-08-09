import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SidepanelparentComponent } from './sidepanelparent/sidepanelparent.component';
import { NewparentComponent } from './newparent/newparent.component';

export const Dashboardroute: Routes = [
    {path: 'newparent', component: NewparentComponent},
    {path:'Homepage', component: HomepageComponent,
    children:[
        {path: 'sidepanel', component: SidepanelparentComponent},
        // {path: 'newparent', component: NewparentComponent},
        {path: '', redirectTo: 'Homepage', pathMatch: 'full'}
    ]
},
{path: '', redirectTo: 'Homepage', pathMatch: 'full'}

];
