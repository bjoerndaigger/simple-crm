import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-chart-investors-by-country',
  templateUrl: './chart-investors-by-country.component.html',
  styleUrls: ['./chart-investors-by-country.component.scss']
})
export class ChartInvestorsByCountryComponent implements OnInit, OnDestroy {
  public chart: any;
  userListSubscription;
  countryCounter = [];
  countryNames = [];

  chartColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ];

  constructor(public userListService: UserListService) { }
  
  ngOnInit(): void {
    this.userListSubscription = this.userListService.userList$.subscribe(list => {
      this.getInvestmentData(list);
    });
  }

  ngOnDestroy(): void {
    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }
  }

  getInvestmentData(list) {
    list.forEach(user => {
      const countryName = user.country; // get countries
      const index = this.countryNames.indexOf(countryName); // search index of countries
  
      if (index === -1) { // If country isn't in list, push name to Array
        this.countryNames.push(countryName);
        this.countryCounter.push(1);  // add a counter for this country and set it to 1
      } else {
        this.countryCounter[index]++; // If Country is in list, increase counter by 1
      }
    });
    
    this.createChart();
  }
  

  createChart() {
    this.chart = new Chart("countryChart", {
      type: 'pie',
      data: {
        labels: this.countryNames,
        datasets: [{
          label: '$',
          data: this.countryCounter,
          borderWidth: 1,
          backgroundColor: this.chartColors,
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
