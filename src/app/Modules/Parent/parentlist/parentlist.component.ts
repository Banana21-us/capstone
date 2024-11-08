import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { AddupdatelrndialogComponent } from '../addupdatelrndialog/addupdatelrndialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';  // Ensure SweetAlert2 is imported

interface Student {
  LRN: number;
  fname: string;
  lname: string;
  mname?: string; // Optional property
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
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './parentlist.component.html',
  styleUrls: ['./parentlist.component.css']
})
export class ParentlistComponent implements OnInit {
  
  parentFilterCtrl = new FormControl(); // Control for the search input
  filteredParents: Parent[] = []; // Initialize as an array of Parent
  parents: Parent[] = []; // Ensure this is typed as Parent[]

  constructor(private parentservice: ConnectService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
      this.fetchParent();
      this.parentFilterCtrl.valueChanges.subscribe(() => {
          this.filterParents();
      });
      console.log(this.parents);
  }
  
  fetchParent() {
    this.parentservice.getparent().subscribe((data) => {
        this.parents = data;
        this.filteredParents = [...this.parents]; // Initialize filteredParents with all fetched parents
        console.log('Fetched parents data:', this.parents); // Log the entire data
    });
}

filterParents() {
    const filterValue = this.parentFilterCtrl.value ? this.parentFilterCtrl.value.toLowerCase() : '';
    this.filteredParents = this.parents.filter(parent =>
        `${parent.fname} ${parent.lname}`.toLowerCase().includes(filterValue) // Filter based on name
    );
}

openDialog(email: string): void {
    const dialogRef = this.dialog.open(AddupdatelrndialogComponent, {
        data: { email }
    });

    dialogRef.componentInstance.updateSuccess.subscribe(() => {
        this.fetchParent(); // Call method to fetch updated parent list
    });
}

deleteParent(email: string): void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.parentservice.deleteParent(email).subscribe(
        () => {
          // Remove parent from both lists after deletion
          this.parents = this.parents.filter(parent => parent.email !== email);
          this.filteredParents = this.filteredParents.filter(parent => parent.email !== email);

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The Parent/Guardian has been deleted.",
            icon: "success"
          });
        },
        (error) => {
          console.error('Error deleting Parent/Guardian:', error);
          Swal.fire({
            title: "Error",
            text: error.error?.message || "An error occurred while deleting the Parent/Guardian.",
            icon: "error"
          });
        }
      );
    }
  });
}


// Update the deletion logic to check if studentLRN is in the LRNs array
removelrn(email: string, lrn: number): void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove Student!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.parentservice.removelrn(email, lrn).subscribe(
        (response) => {
          console.log('Student removed successfully!'); // Log success message
          this.updateParentsList(email, lrn); // Update local state after deletion

          // Show success message
          Swal.fire({
            title: "Removed!",
            text: "The student has been removed.",
            icon: "success"
          });
        },
        (error) => {
          console.error('Error removing student:', error); // Log error message

          // Show error message
          Swal.fire({
            title: "Error",
            text: error.error?.message || "An error occurred while removing the student's LRN.",
            icon: "error"
          });
        }
      );
    }
  });
}


updateParentsList(email: string, lrn: number) {
    const parent = this.parents.find(p => p.email === email);
    if (parent) {
        parent.students = parent.students.filter((student: Student) => student.LRN !== lrn); // Specify the type here
        this.filterParents(); // Call filter change to update displayed list after removal
    }
}
}