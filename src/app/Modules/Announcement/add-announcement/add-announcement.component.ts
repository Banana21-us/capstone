import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatError } from '@angular/material/form-field';
@Component({
  selector: 'app-add-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatError],
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.css'
})
export class AddAnnouncementComponent {

  constructor (private announcementservice: ConnectService,private router: Router) {}
  isLoading: boolean = false; 


  announcementform = new FormGroup({
    admin_id: new FormControl(1),
    // admin_id: new FormControl(localStorage.getItem('admin_id')),
    class_id: new FormControl(1),
    title: new FormControl(''),
    announcement: new FormControl(''),
  });

  postannouncement() {
    // Set loading state to true
    this.isLoading = true;

    this.announcementservice.submitannouncement(this.announcementform.value).subscribe(
        (result: any) => {
            console.log('Announcement submitted successfully:', result);
            // Display success message
            Swal.fire({
                title: 'Success!',
                text: 'Your announcement was posted successfully!',
                icon: 'success',
                confirmButtonText: 'OK' // You can customize the button text
            });

            this.navigateToMainPage(); // Navigate to the main page
        },
        (error) => {
            console.error('Error submitting announcement:', error);
            Swal.fire({
                icon: "error",
                title: "Oops! Something went wrong.",
                text: "There was an error posting your announcement. Please try again."
            });
        },
        () => {
            // Reset loading state after completion of request
            this.isLoading = false;
        }
    );
}

  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/announcement/announcementlist']);
  }
}
