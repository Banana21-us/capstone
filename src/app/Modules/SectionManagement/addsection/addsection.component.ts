import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { ViewsectionComponent } from '../viewsection/viewsection.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsection',
  standalone: true,
  imports: [ViewsectionComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './addsection.component.html',
  styleUrl: './addsection.component.css'
})
export class AddsectionComponent {

  constructor (private sectionservice: ConnectService,private router: Router) {}

  sectionform = new FormGroup({
    sectionname: new FormControl('', Validators.required),
  });

  submitsection() {
    this.sectionservice.postsection(this.sectionform.value).subscribe(
      (result: any) => {
        console.log('Teacher submitted successfully:', result);
        // Optionally, reset the form or show a success message
        this.sectionform.reset();
        this.navigateToMainPage(); // Navigate to the main page

      },
      (error) => {
        console.error('Error submitting teacher account:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }
  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/section/viewsection']);
  }
}
