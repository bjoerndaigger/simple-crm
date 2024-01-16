import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { InvestorListService } from '../firebase-services/investor-list.service';

@Component({
  selector: 'app-chart-investments',
  templateUrl: './chart-investments.component.html',
  styleUrls: ['./chart-investments.component.scss']
})

export class ChartInvestmentsComponent implements OnInit, OnDestroy {
  public chart: any;
  investorListSubscription;
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
   * @param investorListService - The service handling customer list data.
   */
  constructor(public investorListService: InvestorListService) { }

  /** 
   * Lifecycle hook called after component initialization. 
   * Subscribes to the observable in investor list service, which is automatically called on changes.
   */
  ngOnInit(): void {
    this.investorListSubscription = this.investorListService.investorList$.subscribe(list => {
      this.getInvestmentData(list);
    });
  }

  /** 
   * Lifecycle hook called before component destruction. 
   */
  ngOnDestroy(): void {
    if (this.investorListSubscription) {
      this.investorListSubscription.unsubscribe();
    }
  }

  /**
   * Retrieves investment data of top 5 investors from the provided list.
   * @param list The list of investors with investment data.
   */
  getInvestmentData(list) {
    list.sort((a, b) => b.investment - a.investment); // sort investors by investment in descending order
    const topInvestors = list.slice(0, 5); // show only the first five investors

    topInvestors.forEach(investor => {
      this.investmentData.push(investor.investment);
      this.fullName.push(`${investor.firstName} ${investor.lastName}`);
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


