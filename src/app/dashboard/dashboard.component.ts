import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserListService } from '../firebase-services/user-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userListSubscription;
  totalInvestors;
  totalInvestments;
  investments = [];

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
    this.totalInvestors = list.length;
    list.forEach(user => {
      this.investments.push(Number(user.investment));
    });
    this.getInvestmentSum();
  }

  getInvestmentSum() {
    let sum = 0;
    for (let i = 0; i < this.investments.length; i++) {
      sum += this.investments[i];
    }
    this.totalInvestments = sum;
  }
}