import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from '../components/admin/checkout/checkout.component';
import { AdminComponent } from '../components/admin/admin.component';
import { AgGridModule } from 'ag-grid-angular';
import { CheckoutPopupComponent } from '../sharedModules/checkout-popup/checkout-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CheckoutComponent, AdminComponent, CheckoutPopupComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  exports: [CheckoutComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
})
export class AdminModule {}
