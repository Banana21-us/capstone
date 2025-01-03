import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { RouterLink, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// Register all necessary components of Chart.js
Chart.register(...registerables);

// Define interfaces for the expected data structure
interface EnrollmentCount {
  grade_level: string;
  strand: string | null; // Assuming strand can be null
  total: number;
}

interface EnrollmentData {
  totalEnrollments: number;
  juniorHighTotal: number;
  seniorHighTotal: number;
  enrollmentCounts: EnrollmentCount[];
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, MatProgressSpinnerModule,MatFormField,MatLabel,
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;
  inquiries: any;
  students: any[] = [];
  totalEnrollments: number = 0;
  juniorHighTotal: number = 0;
  seniorHighTotal: number = 0;
  currentDate: Date = new Date();
  activeSection: string = 'dashboard'; // Default active section
  uid: any;
  searchTerm: string = '';
  private intervalId: any;
  
  constructor(private dashboard: ConnectService) {}
  

  getStudents() {
    this.dashboard.getdashStudents().subscribe(
      (data) => {
        this.students = data; 
        console.log(this.students); 
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  get filteredStudents() {
    return this.students.filter(student => 
      student.grade_level.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
  }

  
  setActive(section: string): void {
    this.activeSection = section; // Update the active section
    if (this.activeSection === 'dashboard') {
      this.initializeChart(); // Call a method to initialize or refresh the chart
  }
  }
  initializeChart(): void {
    // Fetch data needed for the chart
    this.ngAfterViewInit();  
  }
  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  getInquiry(){
    this.dashboard.getInquiries(this.uid).subscribe((result: any) => {
      this.inquiries = result;
      this.inquiries.forEach((inquiry:any) => {
        console.log(inquiry);

        const uniqueMessages = [];
        const seenSenders = new Set();
  
        for (const msg of result) {
            if (!seenSenders.has(msg.sender_name)) {
                seenSenders.add(msg.sender_name);
                uniqueMessages.push(msg);
            }
        }
  
        this.inquiries = uniqueMessages;
      });
    })
  }
  // getInquiry() {
  //   const inqId = localStorage.getItem('admin_id'); // Get the inq_id from localStorage
  //   console.log('inqId:', inqId); // Check the value of inqId

  //   if (inqId) {
  //     this.dashboard.getInquiries().subscribe(
  //       (result: any) => {
  //         // No parameters needed here
  //         console.log('All inquiries:', result); // Log the full result
  //         this.inquiries = result;

  //         // Log inquiries before filtering
  //         console.log('All inquiries before filtering:', this.inquiries);

  //         const uniqueMessages = [];
  //         const seenSenders = new Set();

  //         // Filter to get only the latest message from each sender
  //         for (const inquiry of this.inquiries) {
  //           if (
  //             inquiry.message_reciever === parseInt(inqId) &&
  //             !seenSenders.has(inquiry.sender_name)
  //           ) {
  //             seenSenders.add(inquiry.sender_name);
  //             uniqueMessages.push(inquiry);
  //           }
  //         }

  //         this.inquiries = uniqueMessages; // Assign filtered messages to 'inquiries'

  //         // Log the filtered inquiries
  //         console.log('Filtered inquiries:', this.inquiries);
  //       },
  //       (error) => {
  //         console.error('Error fetching inquiries:', error); // Handle errors if necessary
  //       }
  //     );
  //   } else {
  //     console.log('inq_id not found in localStorage');
  //   }
  // }

  ngAfterViewInit(): void {
    this.uid = localStorage.getItem('admin_id');
    this.intervalId = setInterval(() => {
      this.getInquiry();
      this.dashboard.getdash();
    }, 60000);
    this.getStudents();
    this.getInquiry();
    this.dashboard.getdash().subscribe((response: any) => {
      const enrollmentData: EnrollmentData = response;
      this.totalEnrollments = enrollmentData.totalEnrollments;
      this.juniorHighTotal = enrollmentData.juniorHighTotal;
      this.seniorHighTotal = enrollmentData.seniorHighTotal;
      const labels: string[] = [];
      const data: number[] = [];
      const gradeMap: {
        [key: string]: { total: number; strand: string | null };
      } = {};
      let maxCount = 0;
      enrollmentData.enrollmentCounts.forEach(
        (enrollmentCount: EnrollmentCount) => {
          const key = `${enrollmentCount.grade_level}-${
            enrollmentCount.strand || 'N/A'
          }`;
          if (!gradeMap[key]) {
            gradeMap[key] = { total: 0, strand: enrollmentCount.strand };
          }
          gradeMap[key].total += enrollmentCount.total;
          if (gradeMap[key].total > maxCount) {
            maxCount = gradeMap[key].total;
          }
        }
      );
      for (let grade = 7; grade <= 12; grade++) {
        const strands = ['N/A', 'STEM', 'ABM', 'HUMMS'];
        strands.forEach((strand) => {
          const key = `${grade}-${strand}`;
          if (gradeMap[key]) {
            const label =
              strand === 'N/A' ? `${grade}` : `${grade} - ${strand}`;
            labels.push(label);
            data.push(gradeMap[key].total);
          }
        });
      }
      this.renderChart(labels, data, maxCount);
    });
  }

  renderChart(labels: string[], data: number[], maxCount: number): void {
    const ctx = this.myChart.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels.map(label => `Grade ${label}`),
          datasets: [
            {
              label: 'Number of Students',
              data:  data,
              borderWidth: 1,
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)', // Light teal
                'rgba(255, 99, 132, 0.2)', // Light pink
                'rgba(255, 159, 64, 0.2)', // Light orange
                'rgba(54, 162, 235, 0.2)', // Light blue
                'rgba(153, 102, 255, 0.2)', // Light purple
                'rgba(255, 206, 86, 0.2)', // Light yellow
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 206, 86, 1)',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: Math.ceil(maxCount * 1.2), // Add padding above max value for visual spacing
              ticks: {
                stepSize: Math.ceil(maxCount / 500), // Dynamic steps for cleaner scale
              },
            },
          },
        },
      });
    }
  }
}
