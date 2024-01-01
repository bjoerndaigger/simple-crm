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

  /**
   * Creates an instance of DashboardComponent.
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
   * Retrieves investment data from the user list.
   * @param list The list of users with investment data.
   */
  getInvestmentData(list) {
    this.totalInvestors = list.length;
    list.forEach(user => {
      this.investments.push(Number(user.investment));
    });
    this.getInvestmentSum();
  }

  /**
   * Calculates the sum of all investments.
   */
  getInvestmentSum() {
    let sum = 0;
    for (let i = 0; i < this.investments.length; i++) {
      sum += this.investments[i];
    }
    this.totalInvestments = sum;
  }
}