import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { VisitorEntity } from 'src/app/model/visitor-model';
import { FilterComponent } from '../../../filter/filter.component';

@Component({
  selector: 'app-checkout-cell-render',
  templateUrl: './checkout-cell-render.component.html',
  styleUrls: ['./checkout-cell-render.component.scss']
})
export class CheckoutCellRenderComponent implements ICellRendererAngularComp {

  constructor(private filterComponent: FilterComponent){

  }

  public isactive: boolean = false;
  cellData:VisitorEntity = new VisitorEntity();

  agInit(params: ICellRendererParams): void {
    this.cellData = params.data;
    if (params.data.outTime == undefined || params.data.outTime == null) {
      this.isactive = true;
    }
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  checkoutVisitor(event:any){
    console.log(event);
  }


  openModal() {
    this.filterComponent.openModal(this.cellData);
  }

}