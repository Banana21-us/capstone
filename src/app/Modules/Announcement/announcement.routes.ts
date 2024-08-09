import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementListComponent } from './announcement-list/announcement-list.component';

export const announcementroutes: Routes = [
    {path:'homepage', component: HomepageComponent,
    children:[
        {path: 'addannouncement', component: AddAnnouncementComponent},
        {path: 'announcementlist', component: AnnouncementListComponent},
    ]
},
{path: '', redirectTo: 'homepage', pathMatch: 'full'}
];
