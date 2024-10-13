import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConnectService } from '../../../connect.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classlist',
  standalone: true,
  imports: [RouterLink, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css'],
})
export class ClasslistComponent implements OnInit {

  classes: any[] = [];

  constructor(private classservice: ConnectService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.classservice.getClasses().subscribe((data) => {
      this.classes = data; // Assign fetched data to classes
      console.log(this.classes); 
    }, error => {
      console.error('Error fetching classes:', error); // Error handling
    });
  }
}