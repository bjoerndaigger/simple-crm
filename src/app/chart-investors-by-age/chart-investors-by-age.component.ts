import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-chart-investors-by-age',
  templateUrl: './chart-investors-by-age.component.html',
  styleUrls: ['./chart-investors-by-age.component.scss']
})

export class ChartInvestorsByAgeComponent implements OnInit, OnDestroy {
  public chart: any;
  userListSubscription;
  investorsBirthday = [];
  ageGroups = {
    '18-29': 0,
    '30-39': 0,
    '40-49': 0,
    '50-59': 0,
    '60-69': 0,
    'over 70': 0
  };
  chartColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ];

  /**
   * Creates an instance of ChartInvestorsByAgeComponent.
   * @param userListService - The service handling customer list data.
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
   * Retrieves birthday data of investors from the provided list.
   * @param list The list of users with birthday data.
   */
  getInvestmentData(list) {
    list.forEach(user => {
      this.investorsBirthday.push(user.birthDate);
    });
    this.createChart(this.getAge());
  }

  /**
   * Calculates the age groups based on provided birthdates.
   * @returns {Object} - An object containing age group data.
   */
  getAge() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    this.investorsBirthday.forEach(birthday => {
      const birthDate = new Date(birthday);
      const age = currentYear - birthDate.getFullYear();
      this.calculateAge(age);
    });

    return this.ageGroups;
  }

  /**
   * Sorts the users into specific age groups.
   * @param {number} age - The age to sort.
   */
  calculateAge(age) {
    if (age >= 18 && age <= 29) {
      this.ageGroups['18-29']++;
    } else if (age >= 30 && age <= 39) {
      this.ageGroups['30-39']++;
    } else if (age >= 40 && age <= 49) {
      this.ageGroups['40-49']++;
    } else if (age >= 50 && age <= 59) {
      this.ageGroups['50-59']++;
    } else if (age >= 60 && age <= 69) {
      this.ageGroups['60-69']++;
    } else if (age >= 70) {
      this.ageGroups['over 70']++;
    }
  }

  /** 
   * Creates a chart using Chart.js library. 
   */
  createChart(ageGroups) {
    this.chart = new Chart("ageChart", {
      type: 'bar',
      data: {
        labels: ['18 - 29', '30 - 39', '40-49', '50-59', '60-69', 'over 70'],
        datasets: [
          {
            label: ' ',
            data: [
              ageGroups['18-29'],
              ageGroups['30-39'],
              ageGroups['40-49'],
              ageGroups['50-59'],
              ageGroups['60-69'],
              ageGroups['over 70']
            ],
            backgroundColor: this.chartColors
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
