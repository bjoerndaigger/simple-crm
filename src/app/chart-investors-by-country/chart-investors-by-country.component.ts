import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { InvestorListService } from '../firebase-services/investor-list.service';

@Component({
  selector: 'app-chart-investors-by-country',
  templateUrl: './chart-investors-by-country.component.html',
  styleUrls: ['./chart-investors-by-country.component.scss']
})

export class ChartInvestorsByCountryComponent implements OnInit, OnDestroy {
  public chart: any;
  investorListSubscription;
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

  /**
   * Creates an instance of ChartInvestorsByCountryComponent.
   * @param investorListService The service handling customer list data.
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
   * Analyzes a list of investors to retrieve investment data based on their respective countries.
   * For each investor in the list, it identifies the country of origin and aggregates data for chart creation.
   * @param list - The list of investors with country data.
   */
  getInvestmentData(list) {
    list.forEach(investor => {
      const countryName = investor.country; // get countries
      const index = this.countryNames.indexOf(countryName); // search index of countries

      if (index === -1) { // if country isn't in list, push name to Array
        this.countryNames.push(countryName);
        this.countryCounter.push(1);  // add a counter for this country and set it to 1
      } else {
        this.countryCounter[index]++; // if Country is in list, increase counter by 1
      }
    });

    this.createChart();
  }

  /** 
   * Creates a chart using Chart.js library. 
   */
  createChart() {
    this.chart = new Chart("countryChart", {
      type: 'pie',
      data: {
        labels: this.countryNames,
        datasets: [{
          label: ' ',
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
