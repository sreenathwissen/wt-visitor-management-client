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
import { AgGridModule } from 'ag-grid-angular';
import { AdminModule } from './modules/admin.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
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
    AdminModule
  ],
  exports: [
  ],
})
export class AppModule {}
