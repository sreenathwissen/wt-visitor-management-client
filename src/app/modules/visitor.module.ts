import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitorComponent } from '../components/visitor/visitor.component';
import { ThankyouComponent } from '../sharedModules/thankyou/thankyou.component';


@NgModule({
  declarations: [VisitorComponent, ThankyouComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  exports: [VisitorComponent],
})
export class VisitorModule {}
