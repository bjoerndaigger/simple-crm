import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvestorComponent } from './investor/investor.component';
import { InvestorDetailComponent } from './investor-detail/investor-detail.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'investor', component: InvestorComponent},
  { path: 'investor/:id', component: InvestorDetailComponent},
  { path: 'legal-notice', component: LegalNoticeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

