import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { VisitorCreateComponent } from './components/visitor-create/visitor-create.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { VisitorExistComponent } from './components/visitor-exist/visitor-exist.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'visitor', component: VisitorCreateComponent },
  { path: 'thankyou', component: ThankyouComponent },
  { path: 'existingVisitor', component: VisitorExistComponent },
  { path: 'verification', component: OtpVerificationComponent },
  { path: 'admin', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
