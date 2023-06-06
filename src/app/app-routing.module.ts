import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { GridComponent } from './components/grid/grid.component';
import { AdminComponent } from './components/admin/admin.component';
import { VisitorComponent } from './components/visitor/visitor.component';
import { ThankyouComponent } from './sharedModules/thankyou/thankyou.component';

const routes: Routes = [
  {
    path: 'home',
    component: AdminComponent,
  },
  {
    path: 'visitor',
    component: VisitorComponent,
  },
  {
    path: 'add',
    component: FormComponent,
  },
  {
    path: 'thankyou',
    component: ThankyouComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
