import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SidepanelparentComponent } from '../sidepanelparent/sidepanelparent.component';
import { Chart, registerables } from 'chart.js';

// Register all necessary components of Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SidepanelparentComponent],
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
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
