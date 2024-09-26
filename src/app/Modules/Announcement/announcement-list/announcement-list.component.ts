import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [RouterLink,MatExpansionModule,CommonModule],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css',
})
export class AnnouncementListComponent implements OnInit{
  

  announcements: any[] = [];

  constructor(private announcement: ConnectService) {}

  ngOnInit(): void {
    this.announcement.getannouncement().subscribe((data) => {
      this.announcements = data;
      console.log(this.announcements); 
    });
  }

  
}
