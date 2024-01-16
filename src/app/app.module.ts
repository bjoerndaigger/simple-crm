import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestorComponent } from './investor/investor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddInvestorComponent } from './dialog-add-investor/dialog-add-investor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { InvestorDetailComponent } from './investor-detail/investor-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditInvestorComponent } from './dialog-edit-investor/dialog-edit-investor.component';
import { ChartInvestmentsComponent } from './chart-investments/chart-investments.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { ChartInvestorsByCountryComponent } from './chart-investors-by-country/chart-investors-by-country.component';
import { ChartInvestorsByAgeComponent } from './chart-investors-by-age/chart-investors-by-age.component';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordResetComponent } from './password-reset/password-reset.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InvestorComponent,
    DialogAddInvestorComponent,
    InvestorDetailComponent,
    DialogEditInvestorComponent,
    ChartInvestmentsComponent,
    LegalNoticeComponent,
    ChartInvestorsByCountryComponent,
    ChartInvestorsByAgeComponent,
    StartPageComponent,
    LoginComponent,
    SignUpComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-daced","appId":"1:605265573908:web:b4dfb062f77bde47accf01","storageBucket":"simple-crm-daced.appspot.com","apiKey":"AIzaSyBWrxcYrJLzAroN1tDMVtbgom2KZSguygs","authDomain":"simple-crm-daced.firebaseapp.com","messagingSenderId":"605265573908"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

