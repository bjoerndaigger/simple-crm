import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddInvestorComponent } from '../dialog-add-investor/dialog-add-investor.component';
import { InvestorListService } from '../firebase-services/investor-list.service';
import { LoginService } from '../firebase-services/login.service';


@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss'],
})

export class InvestorComponent implements OnInit {
  mobile = false;  // Hides email adresses in Mobile version when value is true.

  /**
   * Creates an instance of InvestorComponent.
   * @param dialog - MatDialog for displaying dialogs.
   * @param investorListService - The service handling customer list data.
   * @param loginService - The service handling login data.
   */
  constructor(public dialog: MatDialog, public investorListService: InvestorListService,  private loginService: LoginService) {
  }

  /**
   * Lifecycle hook invoked after component initialization.
   * Retrieves the customer list.
   * Monitors which user is logged in.
   * Checks if the view is on a mobile device,
   * Sets up a listener for window resize events.
   */
  ngOnInit(): void {
    this.investorListService.investorList();
    this.loginService.showActiveUser();
    this.checkIfMobile();
    window.addEventListener('resize', () => {
      this.checkIfMobile(); 
    });
  }

  /**
   * Checks if the current viewport width indicates a mobile device and hides the email adresses in DOM.
   */
  checkIfMobile() {
    this.mobile = window.innerWidth <= 768; 
  }

  /**
   * Opens the dialog for adding a new customer.
   */
  openDialog() {
    this.dialog.open(DialogAddInvestorComponent);
  }
}

