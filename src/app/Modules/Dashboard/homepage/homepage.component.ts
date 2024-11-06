import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';

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
  imports:[CommonModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;

  // Initialize totals
  totalEnrollments: number = 0;
  juniorHighTotal: number = 0;
  seniorHighTotal: number = 0;
  currentDate: Date = new Date();
  constructor(private dashboard: ConnectService) {}

  ngAfterViewInit(): void {
    this.dashboard.getdash().subscribe((response: any) => {
        const enrollmentData: EnrollmentData = response;
        this.totalEnrollments = enrollmentData.totalEnrollments;
        this.juniorHighTotal = enrollmentData.juniorHighTotal;
        this.seniorHighTotal = enrollmentData.seniorHighTotal;
        const labels: string[] = [];
        const data: number[] = [];
        const gradeMap: { [key: string]: { total: number; strand: string | null } } = {};
        let maxCount = 0; 
        enrollmentData.enrollmentCounts.forEach((enrollmentCount: EnrollmentCount) => {
            const key = `${enrollmentCount.grade_level}-${enrollmentCount.strand || 'N/A'}`;
            if (!gradeMap[key]) {
                gradeMap[key] = { total: 0, strand: enrollmentCount.strand };
            }
            gradeMap[key].total += enrollmentCount.total;
            if (gradeMap[key].total > maxCount) {
                maxCount = gradeMap[key].total; 
            }
        });
        for (let grade = 7; grade <= 12; grade++) {
            const strands = ['N/A', 'STEM', 'ABM', 'HUMMS'];
            strands.forEach((strand) => {
                const key = `${grade}-${strand}`;
                if (gradeMap[key]) {
                    const label = strand === 'N/A' ? `${grade}` : `${grade} - ${strand}`;
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
          labels: labels,
          datasets: [{
            label: 'Number of Students',
            data: data,
            borderWidth: 1,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',  // Light teal
              'rgba(255, 99, 132, 0.2)',  // Light pink
              'rgba(255, 159, 64, 0.2)',  // Light orange
              'rgba(54, 162, 235, 0.2)',  // Light blue
              'rgba(153, 102, 255, 0.2)', // Light purple
              'rgba(255, 206, 86, 0.2)'   // Light yellow
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)', 
              'rgba(255, 99, 132, 1)', 
              'rgba(255, 159, 64, 1)', 
              'rgba(54, 162, 235, 1)', 
              'rgba(153, 102, 255, 1)', 
              'rgba(255, 206, 86, 1)'
            ]
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: Math.ceil(maxCount * 1.2), // Add padding above max value for visual spacing
              ticks: {
                stepSize: Math.ceil(maxCount / 500) // Dynamic steps for cleaner scale
              }
            }
          }
        }
      });
    }
    
}
}