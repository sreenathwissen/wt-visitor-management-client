import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-profile-image-cell-render',
  templateUrl: './profile-image-cell-render.component.html',
  styleUrls: ['./profile-image-cell-render.component.scss']
})
export class ProfileImageCellRenderComponent implements ICellRendererAngularComp {

  public profileImage!: string;
  public fullName!: string;

  agInit(params: ICellRendererParams): void {
    this.profileImage = params.data.visitorImageBase64;
    this.fullName = params.data.fullName;
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

}