import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddInvestorComponent } from '../dialog-add-investor/dialog-add-investor.component';
import { InvestorListService } from '../firebase-services/investor-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-investor',
  templateUrl: './dialog-edit-investor.component.html',
  styleUrls: ['./dialog-edit-investor.component.scss']
})

export class DialogEditInvestorComponent {
  /**
   * Creates an instance of DialogEditInvestorComponent.
   * @param dialogRef - Reference to the MatDialogRef object.
   * @param investorListService - The service handling customer list data.
   * @param router - Angular router for navigation.
   */
  constructor(public dialogRef: MatDialogRef<DialogAddInvestorComponent>, public investorListService: InvestorListService, private router: Router) {
    this.datePickerSettings();
  }

  /**
   * Saves the customer's changes and closes the dialog.
   */
  saveInvestor() {
    this.investorListService.editInvestor();
    this.dialogRef.close();
  }

  /**
   * Configures date picker settings in investor list service.
   */
  datePickerSettings() {
    this.investorListService.defaultSettingsDatePicker();
  }

  /**
   * Closes the dialog and navigates to the 'investor' route while clearing customer data.
   */
  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['investor']);
    this.investorListService.clearInvestorData();
  }
}
