import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastrModule } from 'ngx-toastr';
import { GridComponent } from '../components/grid/grid.component';

@NgModule({
  declarations: [GridComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AgGridModule,
    ToastrModule.forRoot(),
  ],
  providers: [NgxImageCompressService],
  exports: [GridComponent],
})
export class GridModule {}
