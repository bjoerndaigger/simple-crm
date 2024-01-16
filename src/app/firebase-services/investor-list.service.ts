import { Injectable, inject, OnDestroy } from '@angular/core';
import { Firestore, onSnapshot, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { ReplaySubject } from 'rxjs';
import { Investor } from 'src/models/investor.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class InvestorListService implements OnDestroy {
  investor = new Investor();
  allInvestors = [];
  unsubList: any;
  unsubSingleInvestor: any;
  loading: boolean = false;
  investorId: string;
  birthDate: Date = new Date();
  minDate: Date;
  maxDate: Date;

  firestore: Firestore = inject(Firestore); // Instance of Firestore service
  investorList$ = new ReplaySubject(1); // // ReplaySubject observable for investor list data (1 (buffer) saves the last value)

  constructor(private router: Router) {
    this.investorList();
  }

  /**
   * Retrieves customer data from Firebase Firestore.
   * @returns {Function} - Unsubscribe function for the snapshot listener.
   * @returns {Promise<void>} - Promise that resolves on successfully loaded the customers.
   * Update observers with the latest investors list.
   * Calls a function to sort the customers by last name.
   */
  investorList() {
    return this.unsubList = onSnapshot(this.getInvestorRef(), (list) => {
      this.allInvestors = []; // clears list before rendering again
      list.forEach((element) => {
        let investorData = element.data();
        investorData['id'] = element.id;
        this.allInvestors.push(investorData);
      });
      this.investorList$.next(this.allInvestors); // pass allInvestors as an argument to my observers with the next method
      this.sortInvestorsByLastName();
    });
  }

  /**
   * Sorts the customers by their last names.
   */
  sortInvestorsByLastName() {
    this.allInvestors.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  /**
   * Adds a new customer to the Firestore database.
   */
  async addInvestor() {
    try {
      this.loading = true;
      this.investor.birthDate = this.birthDate.getTime();
      await addDoc(this.getInvestorRef(), this.investor.toJSON());
    } catch (error) {
      console.error('Error adding investor data:', error);
    } finally {
      this.loading = false;
      this.clearInvestorData();
    }
  }

  /**
   * Updates an existing customer's data in the Firestore database.
   */
  async editInvestor() {
    try {
      this.loading = true;
      this.investor.birthDate = this.birthDate.getTime();
      await updateDoc(this.getSingleInvestorRef(), this.investor.toJSON());
    } catch (error) {
      console.error('Error updating investor data:', error);
    } finally {
      this.loading = false;
      this.router.navigate(['investor']);
      this.clearInvestorData();
    }
  }

  /**
   * Deletes a customer from the Firestore database.
   * @param {string} investorId - ID of the investor to delete
   */
  async deleteInvestor(investorId: string) {
    try {
      await deleteDoc(doc(this.firestore, 'investors', investorId));
    } catch (error) {
      console.error('Error delete investor data:', error);
    }
    finally {
      this.router.navigate(['investor']);
      this.clearInvestorData();
    }
  }

  /**
   * Clears the input fields for investor data.
   */
  clearInvestorData() {
    this.investor = new Investor();
    this.birthDate = new Date();
  }

  /**
   * Retrieves a single customer's details from Firestore.
   * @param {string} investorId - ID of the customer
   */
  getSingleInvestor(investorId: string) {
    this.unsubSingleInvestor = onSnapshot(doc(this.firestore, 'investors', investorId), (investorDoc) => {
      this.investor = new Investor(investorDoc.data());
    });
  }

  /**
   * Retrieves a single customer's details from Firestore.
   */
  getInvestorRef() {
    return collection(this.firestore, 'investors');
  }

  /**
   * Returns a reference to a single customer in Firestore.
   * @returns {DocumentReference} Reference to a single customer
   */
  getSingleInvestorRef() {
    return doc(this.firestore, 'investors', this.investorId);
  }

  /**
   * Sets default settings for the date picker.
   * Allows only birthdates over 18 years ago.
   */
  defaultSettingsDatePicker() { 
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    this.minDate = new Date(today.getFullYear() - 100, 0, 1);
    this.maxDate = eighteenYearsAgo;
    this.birthDate = eighteenYearsAgo;
  }

  /**
   * Lifecycle hook - performs cleanup when the component is destroyed.
   * Unsubscribes from snapshot listeners.
   */
  ngOnDestroy() {
    if (this.unsubList) {
      this.unsubList();
    }
    if (this.unsubSingleInvestor) {
      this.unsubSingleInvestor();
    }
  }
}

