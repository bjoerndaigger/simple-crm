import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Investor } from 'src/models/investor.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditInvestorComponent } from '../dialog-edit-investor/dialog-edit-investor.component';
import { InvestorListService } from '../firebase-services/investor-list.service';

@Component({
  selector: 'app-investor-detail',
  templateUrl: './investor-detail.component.html',
  styleUrls: ['./investor-detail.component.scss'],
})

export class InvestorDetailComponent {
  investorId = '';

  /**
   * Creates an instance of InvestorDetailComponent.
   * @param route - The activated route for retrieving route information.
   * @param dialog - The dialog service for displaying dialogs.
   * @param investorListService - The service handling customer list data.
  */
  constructor(private route: ActivatedRoute, public dialog: MatDialog, public investorListService: InvestorListService) { }

  /** 
   * Lifecycle hook that initializes the component.
   */
  ngOnInit(): void {
    this.getInvestorId();
  }

  /**
   * Extracts the customer ID from the current Route and fetches the corresponding investor details.
   */
  getInvestorId() {
    this.investorId = this.route.snapshot.paramMap.get('id');
    this.investorListService.getSingleInvestor(this.investorId);
  }

  /** 
   * Opens a dialog to edit customer details 
   */
  editInvestor() {
    const dialog = this.dialog.open(DialogEditInvestorComponent);
    dialog.componentInstance.investorListService.investor = new Investor(this.investorListService.investor.toJSON());
    dialog.componentInstance.investorListService.investorId = this.investorId;
  }

  /** 
   * Deletes the customer
   */
  deleteInvestor() {
    this.investorListService.deleteInvestor(this.investorId);
  }
}









