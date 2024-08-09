import { Component } from '@angular/core';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';
import { AnnouncementListComponent } from '../announcement-list/announcement-list.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [AddAnnouncementComponent,AnnouncementListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
