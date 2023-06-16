import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { FilterComponent } from '../components/admin-dashboard/filter/filter.component';
import { ProfileImageCellRenderComponent } from '../components/admin-dashboard/grid/cells/profile-image-cell-render/profile-image-cell-render.component';
import { GridComponent } from '../components/admin-dashboard/grid/grid.component';
import { HeaderComponent } from '../components/admin-dashboard/header/header.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FilterComponent,
    GridComponent,
    ProfileImageCellRenderComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AgGridModule

  ],
  providers: [],
})
export class AdminModule { }
