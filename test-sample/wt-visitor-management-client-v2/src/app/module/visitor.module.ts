import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { VisitorCreateComponent } from 'src/app/components/visitor-create/visitor-create.component';
import { OtpVerificationComponent } from '../components/otp-verification/otp-verification.component';
import { ThankyouComponent } from '../components/thankyou/thankyou.component';
import { VisitorExistComponent } from '../components/visitor-exist/visitor-exist.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { SharedModule } from './shared.module';
import { VisitorMaterialModule } from './visitor-material.module';



@NgModule({
  declarations: [
    VisitorCreateComponent,
    WelcomeComponent,
    VisitorExistComponent,
    ThankyouComponent,
    OtpVerificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    VisitorMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [NgxImageCompressService],
})
export class VisitorModule { }
