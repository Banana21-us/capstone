import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { AddupdatelrndialogComponent } from '../../Parent/addupdatelrndialog/addupdatelrndialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditsectiondialogComponent } from '../editsectiondialog/editsectiondialog.component';


export interface Section {
  name: any; // Adjust as necessary based on your actual data structure
}

@Component({
  selector: 'app-viewsection',
  standalone: true,
  imports: [RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './viewsection.component.html',
  styleUrl: './viewsection.component.css'
})
export class ViewsectionComponent {
  states: string[] = ['Math', 'English', 'Literature', 'Science', 'Bible'];
  
  grades: any[] = [];
  section: any;
  strand:any;

  constructor(private sectionservice: ConnectService,private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.fetchGrades();
  }

  fetchGrades() {
    this.sectionservice.getsection().subscribe((data) => {
        console.log('Fetched Grades:', data); // Log full response
        this.grades = data.map(grade => ({
            ...grade,
            sections: Array.isArray(grade.sections) ? grade.sections : [] // Ensure sections is an array
        }));
    }, error => {
        console.error('Error fetching grades:', error);
    });
}
  deleteGrade(gradeLevel: number) {
    // Log the grade level being deleted
    console.log(`Attempting to delete sections for grade level: ${gradeLevel}`);

    // Call the service method to delete sections by grade level
    this.sectionservice.deleteSectionsByGrade(gradeLevel).subscribe(
        response => {
            console.log('Sections deleted successfully:', response);
            this.fetchGrades(); // Refresh the grades list after deletion
        },
        error => {
            console.error('Error deleting sections:', error);
        }
    );
  }
 

  openEditSectionModal(grade: any): void {
    console.log('Opening Edit Section Modal with:', {
        grade_level: grade.level,
        strand: grade.strand, // Assuming strand is part of grade object
        section_name: grade.sections // This should be an array
    });

    const dialogRef = this.dialog.open(EditsectiondialogComponent, {
      width: 'auto',
      data: {
          grade_level: grade.level,
          strand: grade.strand, // Pass strand to dialog
          section_name: Array.isArray(grade.sections) ? grade.sections : [] // Ensure it's an array
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.updateSection(result);
            console.log('Data passed to dialog:', result);
        }
    });
}
updateSection(updatedData: any): void {
  const gradeLevel = updatedData.grade_level; // Get grade level from updated data

  // Transform section names into the expected format
  const sectionNames = updatedData.section_names.map((section: Section) => section.name);

  // Correct the key names to match API expectations
  const sectionData = { 
      section_name: sectionNames, // Change from 'section_names' to 'section_name'
      grade_level: gradeLevel,
      strand: updatedData.strand // Include strand in the payload
  }; 

  this.sectionservice.updateSectionsByGrade(gradeLevel, sectionData).subscribe(
      response => {
          console.log('Sections updated successfully:', response);
          this.fetchGrades(); // Optionally refresh your sections or grades here
      },
      error => {
          console.error('Error updating sections:', error);
      }
  );
}
}