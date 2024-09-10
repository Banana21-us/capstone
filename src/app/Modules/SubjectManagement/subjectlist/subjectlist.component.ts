import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../../login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subjectlist',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    // ReactiveFormsModule
  ],
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css'], // Corrected styleUrls
})
export class SubjectlistComponent {
  states: string[] = [
    'Math',
    'English',
    'Literature',
    'Science',
    'Bible',
  ];

  products: any[] = [];

  constructor(private logservice: LoginService) {}

  ngOnInit(): void {
   this.logservice.getProducts().subscribe(
    (data) => {
      this.products = data;
    }
   )
  }
}