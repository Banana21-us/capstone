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
  name: any; 
  section_id: number; // Add this property
  section_name: string; // Add this property
  grade_level: number; // Add this property
  strand: string; // Add this property
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
            sections: Array.isArray(grade.sections) ? grade.sections : [] 
        }));
    }, error => {
        console.error('Error fetching grades:', error);
    });
}
deleteGrade(gradeLevel: number, strand: string) {
  // Log the grade level and strand being deleted
  console.log(`Attempting to delete sections for grade level: ${gradeLevel}, strand: ${strand}`);

  // Call the service method to delete sections by grade level and strand
  this.sectionservice.deleteSectionsByGrade(gradeLevel, strand).subscribe(
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
      strand: grade.strand,
      section_name: grade.sections 
  });

  const dialogRef = this.dialog.open(EditsectiondialogComponent, {
      width: 'auto',
      data: {
          grade_level: grade.level,
          strand: grade.strand,
          section_name: Array.isArray(grade.sections) ? grade.sections : []
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
  const gradeLevel = updatedData.grade_level; 
  const strand = updatedData.strand;

  const sectionNames = updatedData.section_names.map((section: { name: string }) => section.name);

  const sectionData = { 
      section_name: sectionNames,
      grade_level: gradeLevel,
      strand: strand
  }; 

  this.sectionservice.updateSectionsByGrade(gradeLevel, strand, sectionData).subscribe(
      response => {
          console.log('Sections updated successfully:', response);
          this.fetchGrades(); // Refresh grades after updating
      },
      error => {
          console.error('Error updating sections:', error);
      }
  );
}
}