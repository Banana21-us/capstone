import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [RouterLink,MatExpansionModule,CommonModule,
    ReactiveFormsModule, RouterModule,FormsModule
    ],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css',
})
export class AnnouncementListComponent implements OnInit{
  

  announcements: any[] = [];

  constructor(private announcement: ConnectService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAnnouncements();
  }
  fetchAnnouncements(){
    this.announcement.getannouncement().subscribe((data) => {
      this.announcements = data;
      console.log(this.announcements); 
    });
  }

  onDelete(ancmnt_id: number): void {
    
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.announcement.deleteAnnouncement(ancmnt_id).subscribe(
          response => {
            console.log('Deleting announcement:', response.message);
            Swal.fire({
              title: "Deleted!",
              text: "Your announcement has been deleted succesfully.",
              icon: "success"
            });
            this.fetchAnnouncements();
          },
          error => {
            console.error('Error deleting announcement:', error);
            if (error.status) {
              console.error('HTTP Status:', error.status);
            }
            if (error.error && error.error.message) {
              console.error('Server message:', error.error.message);
            } else {
              console.error('Unexpected error format:', error);
            }
          }
        );
      }
    });
  }
  onUpdate(ancmnt_id: number): void {
    localStorage.setItem('AnnouncementID', ancmnt_id.toString()); 
    this.router.navigate(['/main-page/announcement/announcements/update', ancmnt_id]);
}
  
}
export interface Announcement {
  id: number;
  title: string;
  content: string;  
}
