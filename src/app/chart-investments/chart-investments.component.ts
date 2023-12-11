import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-investments',
  templateUrl: './chart-investments.component.html',
  styleUrls: ['./chart-investments.component.scss']
})
export class ChartInvestmentsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any;

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '$',
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


