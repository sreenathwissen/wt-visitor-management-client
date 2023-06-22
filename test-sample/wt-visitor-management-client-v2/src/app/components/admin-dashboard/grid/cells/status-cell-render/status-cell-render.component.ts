import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-cell-render',
  templateUrl: './status-cell-render.component.html',
  styleUrls: ['./status-cell-render.component.scss']
})
export class StatusCellRenderComponent implements ICellRendererAngularComp {

  public isactive: boolean = false;

  agInit(params: ICellRendererParams): void {
    if (params.data.outTime == undefined || params.data.outTime == null) {
      this.isactive = true;
    }
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

}