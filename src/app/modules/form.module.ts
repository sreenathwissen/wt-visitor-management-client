import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from '../components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [FormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [NgxImageCompressService],
  exports: [FormComponent],
})
export class FormModule {}
