import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Announcement } from '../announcement-list/announcement-list.component';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-annoucement',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './update-annoucement.component.html',
  styleUrl: './update-annoucement.component.css'
})
export class UpdateAnnoucementComponent implements OnInit {
  updateannouncementForm: FormGroup; // FormGroup for the update form
  ancmnt_id!: number; // Use definite assignment assertion
  announcement: any; // Variable to hold the announcement data

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ConnectService
  ) {
    // Initialize the form with validation
    this.updateannouncementForm = this.fb.group({
      title: ['', Validators.required],
      announcement: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedId = localStorage.getItem('AnnouncementID');
    console.log('Announcement ID:', storedId);
    
    if (storedId) {
      this.ancmnt_id = Number(storedId); // Convert to number
      
      // Call the service method with the ID
      this.apiService.getupdateannouncement(this.ancmnt_id).subscribe(
        (result) => {
          this.announcement = result;
          console.log(result);
          
          // Check if announcement is valid before setting values
          if (this.announcement) {
            this.updateannouncementForm.controls['title'].setValue(this.announcement.title);
            this.updateannouncementForm.controls['announcement'].setValue(this.announcement.announcement);
          } else {
            console.error('Announcement data is null or undefined.');
          }
        },
        (error) => {
          console.error('Error loading announcement:', error);
        }
      );
    } else {
      console.error('No Announcement ID found in local storage.');
      // Optionally navigate back or show an error message
    }
  }

  onSubmit(): void {
    if (this.updateannouncementForm.valid) {
      const updatedAnnouncement = {
        title: this.updateannouncementForm.value.title,
        announcement: this.updateannouncementForm.value.announcement
      };
      
      this.apiService.updateannouncement(this.ancmnt_id, updatedAnnouncement).subscribe(
        (response) => {
          console.log('Announcement updated successfully:', response);
          // Optionally, navigate back to the list or show a success message
          this.router.navigate(['/main-page/announcement/announcementlist']);
        },
        (error) => {
          console.error('Error updating announcement:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

 

}
