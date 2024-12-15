import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ConnectService } from '../../../connect.service';
import { MatDialog } from '@angular/material/dialog';
import { Editsubjectdialogcomponent } from '../editsubjectdialog/editsubjectdialog.component';
import Swal from 'sweetalert2' // Ensure SweetAlert2 is imported
import { SearchFilterPipe } from '../../../search-filter.pipe';

interface Subject {
    name: string;
    id: number;
}

interface SubjectData {
    level: number;
    strand: string;
    subject_name: Subject[];
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
        SearchFilterPipe
    ],
    templateUrl: './subjectlist.component.html',
    styleUrls: ['./subjectlist.component.css'],
})
export class SubjectlistComponent implements OnInit {
    subjects: any[] = [];
    // filteredSubject: any[] = [];
    keyword: any;

    constructor(private subjectservice: ConnectService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.fetchSubjects();

    }

    
      fetchSubjects() {
        this.subjectservice.getsubjects().subscribe((data: SubjectData[]) => {
          console.log('Fetched subjects:', data);
          this.subjects = data.map(subject => ({
            ...subject,
            subject_name: Array.isArray(subject.subject_name) ? subject.subject_name : []
          }));
        }, (error: any) => {
          console.error('Error fetching subjects:', error);
        });
      }
    
      get filteredSubject() {
        if (!this.keyword) {
          return this.subjects; // Return all subjects if no keyword is entered
        }
        return this.subjects.filter(subject =>
          subject.level.toLowerCase().includes(this.keyword.toLowerCase())
        );
      }
    
    

    openEditSubjectModal(subject: SubjectData): void {
        const dialogRef = this.dialog.open(Editsubjectdialogcomponent, {
            width: '700px',
            data: {
                grade_level: subject.level,
                strand: subject.strand,
                subject_name: subject.subject_name.map((item: Subject) => ({
                    name: item.name,
                    id: item.id
                }))
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.updateSubjects(result);
                

                console.log('Data passed to dialog:', result);
            }
            this.fetchSubjects();
        });
    }

    updateSubjects(updatedData: any): void {
        const gradeLevel = updatedData.grade_level; 
        const strand = updatedData.strand;

        const subjectNames = (updatedData.subject_name || []).map((subject: { name: string }) => subject.name); // Corrected to subject_name

        const subjectData = { 
            subject_name: subjectNames,
            grade_level: gradeLevel,
            strand: strand
        }; 

        console.log('Sending data to API:', subjectData);

        this.subjectservice.updateSubjectsByGrade(gradeLevel, strand, subjectData).subscribe(
            response => {
                console.log('Subjects updated successfully:', response);
                this.fetchSubjects(); 
            },
            error => {
                console.error('Error updating subjects:', error);
                alert('Failed to update subjects. Please try again.');
            }
        );
    }

    deleteSubjects(gradeLevel: number, strand: string): void {
        // Show confirmation alert before attempting to delete the subjects
        Swal.fire({
          title: "Are you sure?",
          text: `This will delete all subjects for grade level ${gradeLevel.toString().trim()} ${strand.trim() === '-' ? ' ' : strand.trim()} permanently.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete subjects!"
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(`Attempting to delete subjects for grade level: ${gradeLevel} and strand: ${strand}`);
    
            this.subjectservice.deleteSubjectByGrade(gradeLevel, strand).subscribe(
              (response) => {
                console.log('Subjects deleted successfully:', response);
                
                // Refresh the subjects list after deletion
                this.fetchSubjects();
    
                // Show success message
                // Swal.fire({
                //   title: "Deleted!",
                //   text: "The subjects have been deleted.",
                //   icon: "success"
                // });
              },
              (error: any) => {
                console.error('Error deleting subjects:', error);
    
                // Show error message
                Swal.fire({
                  title: "Error",
                  text: error.error?.message || "An error occurred while deleting the subjects.",
                  icon: "error"
                });
              }
            );
          }
        });
    }
    


}