import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { VisitorCreateComponent } from 'src/app/components/visitor-create/visitor-create.component';
import { VisitorMaterialModule } from './visitor-material.module';



@NgModule({
  declarations: [VisitorCreateComponent],
  imports: [
    CommonModule,
    VisitorMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NgxImageCompressService],
})
export class VisitorModule { }
