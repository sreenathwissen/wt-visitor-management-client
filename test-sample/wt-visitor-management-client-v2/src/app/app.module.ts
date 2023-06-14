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
    AdminModule
  ],
  providers: [AppConstants, RefDataService, VisitorService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
