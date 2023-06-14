import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { VisitorCreateComponent } from './components/visitor-create/visitor-create.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: '', component: VisitorCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
