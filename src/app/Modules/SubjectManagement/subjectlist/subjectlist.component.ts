import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-subjectlist',
  standalone: true,
  providers:[ConnectService],
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css'],
})
export class SubjectlistComponent  {
  // implements OnInit
  states: string[] = ['Math', 'English', 'Literature', 'Science', 'Bible'];
  subjects: any[] = [];

  constructor(private subjectservice: ConnectService) {}

  ngOnInit(): void {
    this.subjectservice.getsubjects().subscribe((data) => {
      this.subjects = data;
    });
  }
}