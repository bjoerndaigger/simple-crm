import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-chart-investments',
  templateUrl: './chart-investments.component.html',
  styleUrls: ['./chart-investments.component.scss']
})
export class ChartInvestmentsComponent implements OnInit, OnDestroy {
  public chart: any;
  userListSubscription;
  investmentData = [];
  fullName = [];
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
    this.userListSubscription = this.userListService.userList$.subscribe(list => { // subscribe to the observable in user list service, automatic call on changes
      this.getInvestmentData(list);
    });
  }

  ngOnDestroy(): void {
    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }
  }

  getInvestmentData(list) {
    list.sort((a, b) => b.investment - a.investment); // sort users by investment in descending order
    const topInvestors = list.slice(0, 5); // show only the first five users

    topInvestors.forEach(user => {
      this.investmentData.push(user.investment);
      this.fullName.push(`${user.firstName} ${user.lastName}`);
    });

    this.createChart();
  }


  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: this.fullName,
        datasets: [{
          label: '$',
          data: this.investmentData,
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


