import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css'],
})
export class SubjectlistComponent  {
  // implements OnInit
  states: string[] = ['Math', 'English', 'Literature', 'Science', 'Bible'];
  // classes: any[] = [];

  // constructor(private logservice: LoginService) {}

  // ngOnInit(): void {
  //   this.logservice.getclasses().subscribe((data) => {
  //     this.classes = data;
  //   });
  // }
}