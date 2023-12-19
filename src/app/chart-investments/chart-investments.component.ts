import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-chart-investments',
  templateUrl: './chart-investments.component.html',
  styleUrls: ['./chart-investments.component.scss']
})
export class ChartInvestmentsComponent implements OnInit {
  public chart: any;

  constructor(public userListService: UserListService) { }

  ngOnInit(): void {
    this.userListService.usersChange$.subscribe(users => {  // subscribe to the observable in user list service, automatic call on changes
      this.getUsers();
    })
    this.createChart();
  }

  getUsers() {
    const userData = this.userListService.allUsers;
    console.log(userData);
    
  }

  createChart() {

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


