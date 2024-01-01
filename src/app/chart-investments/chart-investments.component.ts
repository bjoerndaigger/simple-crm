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

  /**
   * Creates an instance of ChartInvestmentsComponent.
   * @param userListService - The service handling user list data.
   */
  constructor(public userListService: UserListService) { }

  /** 
   * Lifecycle hook called after component initialization. 
   * Subscribes to the observable in user list service, which is automatically called on changes.
   */
  ngOnInit(): void {
    this.userListSubscription = this.userListService.userList$.subscribe(list => {
      this.getInvestmentData(list);
    });
  }

  /** 
   * Lifecycle hook called before component destruction. 
   */
  ngOnDestroy(): void {
    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }
  }

  /**
   * Retrieves investment data of top 5 investors from the provided list.
   * @param list The list of users with investment data.
   */
  getInvestmentData(list) {
    list.sort((a, b) => b.investment - a.investment); // sort users by investment in descending order
    const topInvestors = list.slice(0, 5); // show only the first five users

    topInvestors.forEach(user => {
      this.investmentData.push(user.investment);
      this.fullName.push(`${user.firstName} ${user.lastName}`);
    });

    this.createChart();
  }

  /** 
   * Creates a chart using Chart.js library. 
   */
  createChart() {
    this.chart = new Chart("topInvestorsChart", {
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


