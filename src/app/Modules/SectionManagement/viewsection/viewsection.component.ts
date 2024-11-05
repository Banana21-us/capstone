import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  sectionFilterCtrl = new FormControl();
  grades: any[] = [];
  section: any;
  strand:any;
  filteredGrades: any[] = [];

  constructor(private sectionservice: ConnectService,private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.fetchSections();
    this.sectionFilterCtrl.valueChanges.subscribe(() => {
      this.filterSection();
  });
  }

  filterSection() {
    const filterValue = this.sectionFilterCtrl.value ? this.sectionFilterCtrl.value.toLowerCase() : '';
    if (!filterValue) {
      this.filteredGrades = [...this.grades];
      return;
    }
    this.filteredGrades = this.grades.filter(grade => {
      const hasMatchingSection = grade.sections && grade.sections.some((section: any) => 
        section.name.toLowerCase().includes(filterValue)
      );
      return hasMatchingSection;
    });
  }

  fetchSections() {
    this.sectionservice.getsection().subscribe((data) => {
      console.log('Fetched Grades:', data);
      this.grades = data.map(grade => ({
        ...grade,
        sections: Array.isArray(grade.sections) ? grade.sections : []
      }));
  
      this.filteredGrades = [...this.grades];
    }, error => {
      console.error('Error fetching grades:', error);
    });
  }
deleteGrade(gradeLevel: number, strand: string) {
  console.log(`Attempting to delete sections for grade level: ${gradeLevel}, strand: ${strand}`);
  this.sectionservice.deleteSectionsByGrade(gradeLevel, strand).subscribe(
      response => {
          console.log('Sections deleted successfully:', response);
          this.fetchSections(); 
      },
      error => {
          console.error('Error deleting sections:', error);
      } 
  );
}
 

openEditSectionModal(grade: any): void {
  const dialogRef = this.dialog.open(EditsectiondialogComponent, {
      width: '700px',
      data: {
          grade_level: grade.level,
          strand: grade.strand,
          section_names: grade.sections.map((section: any) => ({
              name: section.name, // Assuming section has a 'name' property
              id: section.id      // Assuming section has an 'id' property
          }))
      }
  });

  dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.updateSection(result); // Update the section with the returned data
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
          this.fetchSections(); // Refresh grades after updating
      },
      error => {
          console.error('Error updating sections:', error);
      }
  );
}
}