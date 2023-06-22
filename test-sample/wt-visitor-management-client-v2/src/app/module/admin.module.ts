import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { FilterComponent } from '../components/admin-dashboard/filter/filter.component';
import { CheckoutCellRenderComponent } from '../components/admin-dashboard/grid/cells/checkout-cell-render/checkout-cell-render.component';
import { ProfileImageCellRenderComponent } from '../components/admin-dashboard/grid/cells/profile-image-cell-render/profile-image-cell-render.component';
import { StatusCellRenderComponent } from '../components/admin-dashboard/grid/cells/status-cell-render/status-cell-render.component';
import { GridComponent } from '../components/admin-dashboard/grid/grid.component';
import { HeaderComponent } from '../components/admin-dashboard/header/header.component';
import { SharedModule } from './shared.module';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FilterComponent,
    GridComponent,
    ProfileImageCellRenderComponent,
    StatusCellRenderComponent,
    CheckoutCellRenderComponent
    
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ],
  providers: [],
})
export class AdminModule { }
