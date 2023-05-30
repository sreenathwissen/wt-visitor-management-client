import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { VisitorDataService } from 'src/app/services/visitor-data.service';
import { CheckoutPopupComponent } from 'src/app/sharedModules/checkout-popup/checkout-popup.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, ICellRendererAngularComp {
  public checkedOut!: boolean;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  agInit(params: ICellRendererParams): void {
    if(params.data?.outTime) {
      this.checkedOut = true;
    } else {
      this.checkedOut = false;
    }
  }
  
  refresh(params: ICellRendererParams) {
    return true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutPopupComponent, {
      width: '300px',
      height: '150px',
      panelClass: 'modal-content-color',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }); 
  }
}
