import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvestorListService } from '../firebase-services/investor-list.service';
import { LoginService } from '../firebase-services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  investorListSubscription;
  totalInvestors;
  totalInvestments;
  investments = [];

  /**
   * Creates an instance of DashboardComponent.
   * @param investorListService - The service handling customer list data.
   * @param loginService - The service handling login data.
   */
  constructor(public investorListService: InvestorListService, private loginService: LoginService) { }


  /** 
   * Lifecycle hook called after component initialization. 
   * Subscribes to the observable in investor list service, which is automatically called on changes.
   * Monitors which User is logged in.
   */
  ngOnInit(): void {
    this.investorListSubscription = this.investorListService.investorList$.subscribe(list => {
      this.getInvestmentData(list);
    });
    this.loginService.showActiveUser();
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
   * Retrieves investment data from the investor list.
   * @param list The list of investors with investment data.
   */
  getInvestmentData(list) {
    this.totalInvestors = list.length;
    list.forEach(investor => {
      this.investments.push(Number(investor.investment));
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