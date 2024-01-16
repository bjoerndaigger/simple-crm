import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InvestorListService } from '../firebase-services/investor-list.service';

@Component({
  selector: 'app-dialog-add-investor',
  templateUrl: './dialog-add-investor.component.html',
  styleUrls: ['./dialog-add-investor.component.scss'],
})

export class DialogAddInvestorComponent {
  /**
   * Creates an instance of DialogAddInvestorComponent.
   * @param dialogRef - Reference to the MatDialogRef object.
   * @param investorListService - The service handling customer list data.
   */
  constructor(public dialogRef: MatDialogRef<DialogAddInvestorComponent>, public investorListService: InvestorListService) {
    this.datePickerSettings();
  }

  /**
   * Checks if all input fields are filled.
   * @returns {boolean} - Returns true if all input fields are filled, otherwise false.
   */
  areAllInputFieldsFilled() {
    if (
      this.investorListService.investor.firstName &&
      this.investorListService.investor.lastName &&
      this.investorListService.investor.email &&
      this.investorListService.investor.investment &&
      this.investorListService.investor.street &&
      this.investorListService.investor.city &&
      this.investorListService.investor.zipCode &&
      this.investorListService.investor.country
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Adds a customer and then closes the dialog.
   */
  addInvestor() {
    this.investorListService.addInvestor();
    this.dialogRef.close();
  }

  /**
   * Configures the settings for the datepicker in investor list service.
   */
  datePickerSettings() {
    this.investorListService.defaultSettingsDatePicker();
  }

  /**
   * Closes the dialog and clears the investor data.
   */
  closeDialog() {
    this.dialogRef.close();
    this.investorListService.clearInvestorData();
  }
}
