import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormModule } from './modules/form.module';
import { GridModule } from './modules/grid.module';
import { AdminComponent } from './components/admin/admin.component';
import { AgGridModule } from 'ag-grid-angular';
import { CheckoutComponent } from './components/admin/checkout/checkout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckoutPopupComponent } from './sharedModules/checkout-popup/checkout-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [AppComponent, NavbarComponent, AdminComponent, CheckoutComponent, CheckoutPopupComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    AgGridModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormModule,
    GridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class AppModule {}
