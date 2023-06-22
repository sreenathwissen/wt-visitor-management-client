import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { EmployeeTypeheadComponent } from '../components/shared/employee-typehead/employee-typehead.component';



@NgModule({
  declarations: [
    EmployeeTypeheadComponent
    
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule

  ],
  exports:[EmployeeTypeheadComponent],
  providers: [],
})
export class SharedModule { }
