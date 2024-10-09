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
  sectionList: string[] = [];

  constructor ( private dialog: MatDialog,private sectionservice: ConnectService,private router: Router) {}

  sectionform = new FormGroup({
    grade_level: new FormControl('', Validators.required),
  });

  openDialog(): void {
    const dialogRef = this.dialog.open(AddsectiondialogComponent, {
      width: '250px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sectionList.push(result); 
      }
    });
  }

  submitsection() {
    const form = {
        section_name: this.sectionList, 
        grade_level: this.sectionform.value.grade_level
    };

    console.log('form to be sent:', form);
    this.sectionservice.postsection(form).subscribe(
      (result: any) => {
        console.log('section submitted successfully:', result);
        this.sectionform.reset();
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
