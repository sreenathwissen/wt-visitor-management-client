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
    console.log(params);
    this.profileImage = params.data.visitorImageBase64;
    this.fullName = params.data.fullName;
  }

  /*   // gets called whenever the user gets the cell to refresh
    refresh(params: ICellRendererParams) {
      // set value into cell again
      this.cellValue = this.getValueToDisplay(params);
      return true;
    }
  
    getValueToDisplay(params: ICellRendererParams) {
      return params.valueFormatted ? params.valueFormatted : params.value;
    } */

  refresh(params: ICellRendererParams) {
    return true;
  }

}