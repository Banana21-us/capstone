import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { ViewsectionComponent } from '../viewsection/viewsection.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddsectiondialogComponent } from '../addsectiondialog/addsectiondialog.component';

@Component({
  selector: 'app-addsection',
  standalone: true,
  imports: [ViewsectionComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './addsection.component.html',
  styleUrl: './addsection.component.css'
})
export class AddsectionComponent {
  sectionList: { name: string; strand: string }[] = []; // Updated to hold both name and strand
  isStrandVisible: boolean = false;
  constructor(private dialog: MatDialog, private sectionservice: ConnectService, private router: Router) {}

  sectionform = new FormGroup({
    grade_level: new FormControl('', Validators.required),
    strand: new FormControl('', Validators.required), // Strand control remains in the main form
  });
  onGradeChange() {
    const selectedGrade = this.sectionform.get('grade_level')?.value;
    this.isStrandVisible = selectedGrade === '11' || selectedGrade === '12';

    if (!this.isStrandVisible) {
      this.sectionform.get('strand')?.setValue('-');
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddsectiondialogComponent, {
      width: '250px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Ensure result contains only section name
        this.sectionList.push({ name: result, strand: this.sectionform.value.strand ?? '' }); // Use nullish coalescing
      }
    });
  }

  submitsection() {
    // Check if sectionList is not empty
    if (this.sectionList.length === 0) {
      console.error('No sections to submit');
      return;
    }

    const form = {
      section_name: this.sectionList.map(section => section.name), // Extract names
      grade_level: this.sectionform.value.grade_level,
      strand: this.sectionform.value.strand // Include strand from the form
    };

    console.log('form to be sent:', form);
    
    // Ensure all fields are valid before sending
    if (!form.grade_level || !form.strand || form.section_name.length === 0) {
      console.error('Form is invalid:', form);
      return;
    }

    this.sectionservice.postsection(form).subscribe(
      (result: any) => {
        console.log('Section submitted successfully:', result);
        this.sectionform.reset();
        this.sectionList = []; // Clear section list after submission
        this.navigateToMainPage();
      },
      (error) => {
        console.error('Error submitting section account:', error);
      }
    );
  }

  navigateToMainPage() {
    console.log('Router:', this.router); 
    this.router.navigate(['/main-page/section/viewsection']);
  }

  removeSection(index: number): void {
    this.sectionList.splice(index, 1); 
  }
}