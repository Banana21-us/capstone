import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { ConnectService } from "../../../connect.service";
import { AddupdatelrndialogComponent } from "../addupdatelrndialog/addupdatelrndialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2"; // Ensure SweetAlert2 is imported
import { SearchFilterPipe } from "../../../search-filter.pipe";

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
  selector: "app-parentlist",
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
    SearchFilterPipe,
  ],
  templateUrl: "./parentlist.component.html",
  styleUrls: ["./parentlist.component.css"],
})
export class ParentlistComponent implements OnInit {
  filteredParents: Parent[] = []; // Initialize as an array of Parent
  parents: Parent[] = []; // Ensure this is typed as Parent[]
  keyword: any;

  constructor(
    private parentservice: ConnectService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchParent();
    console.log(this.parents);
  }

  fetchParent() {
    this.parentservice.getparent().subscribe((data) => {
      this.parents = data;
      this.filteredParents = [...this.parents]; // Initialize filteredParents with all fetched parents
      console.log("Fetched parents data:", this.parents); // Log the entire data
    });
  }

  openDialog(email: string, parent: any): void {
    const fullName = `${parent.lname}, ${parent.fname} ${
      parent.mname ? parent.mname : ""
    }`; // Build the full name here

    const dialogRef = this.dialog.open(AddupdatelrndialogComponent, {
      width: "700px",
      data: {
        email,
        fullName,
        students: parent.students, 
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Data passed to dialog:", result);
        
      }
      this.fetchParent();
    });
  }
    
  // updateddata(updatedData: any): void {
  //   const email = updatedData.email;

  //   this.parentservice.updateParentGuardian(email, updatedData).subscribe(
  //     (response) => {
  //       console.log("Sections updated successfully:", response);
  //       this.fetchParent(); 
  //     },
  //     (error) => {
  //       console.error("Error updating sections:", error);
  //     }
  //   );
  // }

  deleteParent(email: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the account permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.parentservice.deleteParent(email).subscribe(
          () => {
            // Remove parent from both lists after deletion
            this.parents = this.parents.filter(
              (parent) => parent.email !== email
            );
            this.filteredParents = this.filteredParents.filter(
              (parent) => parent.email !== email
            );

            // Show success message
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "The Parent/Guardian has been deleted.",
            //   icon: "success",
            // });
          },
          (error) => {
            console.error("Error deleting Parent/Guardian:", error);
            Swal.fire({
              title: "Error",
              text:
                error.error?.message ||
                "An error occurred while deleting the Parent/Guardian.",
              icon: "error",
            });
          }
        );
      }
    });
  }
  // updateParentsList(email: string, lrn: number) {
  //   const parent = this.parents.find((p) => p.email === email);
  //   if (parent) {
  //     parent.students = parent.students.filter(
  //       (student: Student) => student.LRN !== lrn
  //     ); // Specify the type here
  //   }
  // }
}