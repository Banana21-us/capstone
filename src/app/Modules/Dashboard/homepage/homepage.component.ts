import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// import { SidepanelparentComponent } from '../sidepanelparent/sidepanelparent.component';
import { Chart, registerables } from 'chart.js';

// Register all necessary components of Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;

  chart: Chart | undefined;

  ngAfterViewInit(): void {
    const ctx = this.myChart.nativeElement.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['7', '8', '9', '10', 'STEM', 'ABM','HUMMS'],
          datasets: [{
            label: '# of Students',
            data: [78, 287, 80, 41, 177, 40,  237,],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
