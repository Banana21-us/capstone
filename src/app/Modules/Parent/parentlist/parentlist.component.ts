// parentlist.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { AddupdatelrndialogComponent } from '../addupdatelrndialog/addupdatelrndialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

interface Student {
    fname: string;
    lname: string;
    mname: string;
    LRNs:string;
}

interface Parent {
    lname: string;
    fname: string;
    mname: string;
    address: string;
    relationship: string;
    contact_no: string;
    email: string;
    students: Student[]; // Ensure student is an array
}

@Component({
  selector: 'app-parentlist',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './parentlist.component.html',
  styleUrls: ['./parentlist.component.css'] // Fixed typo here
})
export class ParentlistComponent implements OnInit {
  
  states: string[] = [
    'Mario Miko Ofiaza',
    'Rianne Agnieka',
    'Arjay Subido',
    'Dionece College',
    'Glen Lozada',
  ];
  
  parents: Parent[] = []; 

  constructor(private parentservice: ConnectService, private router: Router,private dialog: MatDialog,) {}

  ngOnInit(): void {
      this.fetchParent();
      console.log(this.parents);

  }
  openDialog(email: string): void {
    const dialogRef = this.dialog.open(AddupdatelrndialogComponent, {
        data: { email }
    });

    // Listen for update success event
    dialogRef.componentInstance.updateSuccess.subscribe(() => {
        this.fetchParent(); // Call method to fetch updated parent list
    });
  }

  fetchParent() {
    this.parentservice.getparent().subscribe((data) => {
        // Assuming 'data' is an array of parents with their associated students
        this.parents = data.map(parent => ({
            ...parent,
            // Ensure 'students' is populated correctly
            students: parent.students || [] // Use existing students or an empty array
        }));
        
        console.log(this.parents); // Log the structure of parents for debugging
    }, error => {
        console.error('Error fetching parents:', error);
    });
  }
  // Method to check if a value is an array
  isArray(value: any): boolean {
      return Array.isArray(value);
  }
  deleteParent(email: string): void {
    this.parentservice.deleteParent(email).subscribe(
      () => {
        this.parents = this.parents.filter(parent => parent.email !== email);
        console.log('All Parent/Guardians with that email deleted successfully.');
      },
      (error) => {
        console.error('Error deleting Parent/Guardian:', error);
      }
    );
  }
}
