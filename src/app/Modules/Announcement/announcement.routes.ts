import { Routes } from '@angular/router';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementListComponent } from './announcement-list/announcement-list.component';

export const announcementroutes: Routes = [
        {path: 'addannouncement', component: AddAnnouncementComponent},
        {path: 'announcementlist', component: AnnouncementListComponent},
        {path: '', redirectTo: 'announcementlist', pathMatch: 'full'}
];
