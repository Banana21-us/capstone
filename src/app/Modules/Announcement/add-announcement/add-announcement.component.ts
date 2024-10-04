import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.css'
})
export class AddAnnouncementComponent {

  constructor (private announcementservice: ConnectService,private router: Router) {}


  announcementform = new FormGroup({
    admin_id: new FormControl(1),
    class_id: new FormControl(1),
    title: new FormControl(''),
    announcement: new FormControl(''),
  });

  postannouncement() {
    this.announcementservice.submitannouncement(this.announcementform.value).subscribe(
      (result: any) => {
        console.log('anouncement submitted successfully:', result);
        // Optionally, reset the form or show a success message
        this.announcementform.reset();
        this.navigateToMainPage(); // Navigate to the main page

      },
      (error) => {
        console.error('Error submitting announcement:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }
  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/announcement/announcementlist']);
  }
}
