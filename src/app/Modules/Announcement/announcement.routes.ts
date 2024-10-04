import { Routes } from '@angular/router';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';
import { AnnouncementListComponent } from './announcement-list/announcement-list.component';
import { UpdateAnnoucementComponent } from './update-annoucement/update-annoucement.component';

export const announcementroutes: Routes = [
        {path: 'addannouncement', component: AddAnnouncementComponent},
        {path: 'announcementlist', component: AnnouncementListComponent},
        {path: 'announcements/update/:id', component: UpdateAnnoucementComponent},
        {path: '', redirectTo: 'announcementlist', pathMatch: 'full'}
];
