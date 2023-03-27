import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from '../components/form/form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
  ],
  providers: []
})
export class FormModule { }
