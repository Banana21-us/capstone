import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ConnectService } from '../../../connect.service';
import { MatDialog } from '@angular/material/dialog';
import { Editsubjectdialog } from '../editsubjectdialog/editsubjectdialog.component';

export interface Subject {
  name: any; // Adjust as necessary based on your actual data structure
}

@Component({
  selector: 'app-subjectlist',
  standalone: true,
  providers: [ConnectService],
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
export class SubjectlistComponent implements OnInit {
  states: string[] = ['Math', 'English', 'Literature', 'Science', 'Bible'];
  subjects: any[] = [];

  constructor(private subjectservice: ConnectService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch subjects from the service
    this.fetchSubjects();
  }

  fetchSubjects() {
    this.subjectservice.getsubjects().subscribe(
      (data) => {
        // Log the received data to the console
        console.log('Fetched subjects:', data);
        // Assign the fetched data to the component's subjects property
        this.subjects = data;
      },
      (error: any) => { // Explicitly define error type
        // Log any errors that occur during the fetch
        console.error('Error fetching subjects:', error);
      }
    );
  }

  openEditSubjectModal(subject: any) {
    const dialogRef = this.dialog.open(Editsubjectdialog, {
      width: 'auto',
      data: {
          grade_level: subject.level,
          strand: subject.strand,
          subject_names: subject.subject_name // Ensure this matches your data structure
      }
  });

    // Handle the dialog closing event
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateSubjectsByGrade(subject.level, result);
      }
    });
  }

  updateSubjectsByGrade(gradeLevel: number, updatedData: any): void {
    if (!updatedData || !updatedData.subject_name || !Array.isArray(updatedData.subject_name)) {
        console.error('Invalid data received for updating subjects:', updatedData);
        return; // Exit if data is invalid
    }

    const subjectData = { 
        grade_level: gradeLevel, // Use 'grade_level' as expected by API
        strand: updatedData.strand,
        subject_name: updatedData.subject_name // Ensure it matches API expectations
    };

    console.log('Updating subjects with data:', subjectData); // Debug log

    this.subjectservice.updateSubjectsByGrades(gradeLevel, subjectData).subscribe(
        (response) => {
          console.log('Updating subjects with data:', subjectData);
            console.log('Subjects updated successfully:', response);
            this.fetchSubjects(); 
        },
        (error: any) => {
            console.error('Error updating subjects:', error);
        }
    );
}

  deleteGrade(gradeLevel: number) {
    console.log(`Attempting to delete subjects for grade level: ${gradeLevel}`);
    this.subjectservice.deleteSubjectByGrade(gradeLevel).subscribe(
      (response) => {
        console.log('Subjects deleted successfully:', response);
        this.fetchSubjects(); // Refresh the subjects list after deletion
      },
      (error: any) => { // Explicitly define error type
        console.error('Error deleting subjects:', error);
      }
    );
  }
}