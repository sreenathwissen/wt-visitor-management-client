import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConstants } from './components/constants/app.constants';
import { AdminModule } from './module/admin.module';
import { VisitorModule } from './module/visitor.module';
import { RefDataService } from './service/refdata.service';
import { VisitorService } from './service/visitor.service';
import { EmployeeService } from './service/employee.service';
import { EmployeeTypeheadComponent } from './components/shared/employee-typehead/employee-typehead.component';
import { SharedModule } from './module/shared.module';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VisitorModule,
    AdminModule,
    SharedModule
  ],
  providers: [AppConstants, RefDataService, VisitorService, EmployeeService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
