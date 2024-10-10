import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-subjectlist',
  standalone: true,
  providers:[ConnectService],
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css'],
})
export class SubjectlistComponent  {
  states: string[] = ['Math', 'English', 'Literature', 'Science', 'Bible'];
  subjects: any[] = [];

  constructor(private subjectservice: ConnectService) {}

  ngOnInit(): void {
    // Fetch subjects from the service
    this.fethsubject();
  }
  fethsubject(){
    this.subjectservice.getsubjects().subscribe((data) => {
      // Log the received data to the console
      console.log('Fetched subjects:', data);

      // Assign the fetched data to the component's subjects property
      this.subjects = data;
  }, (error) => {
      // Log any errors that occur during the fetch
      console.error('Error fetching subjects:', error);
  });
  }
  openEditSubjectModal(){
    
  }
  deleteGrade(gradeLevel: number) {
    console.log(`Attempting to delete sections for grade level: ${gradeLevel}`);
    this.subjectservice.deleteSubjectByGrade(gradeLevel).subscribe(
        response => {
            console.log('gradesubjects deleted successfully:', response);
            this.fethsubject(); // Refresh the grades list after deletion
        },
        error => {
            console.error('Error deleting gradesubjects:', error);
        }
    );
  }
}