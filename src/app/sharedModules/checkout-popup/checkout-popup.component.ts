import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { VisitorDataService } from 'src/app/services/visitor-data.service';

@Component({
  selector: 'app-checkout-popup',
  templateUrl: './checkout-popup.component.html',
  styleUrls: ['./checkout-popup.component.scss']
})
export class CheckoutPopupComponent {
  public showSpinner = false;
  public selectedVisitorsDetails: any;

  @ViewChild('checkoutVisitorModal') checkoutVisitorModal!: ElementRef;
  constructor(private _visitorDataService: VisitorDataService,
    public dialogRef: MatDialogRef<CheckoutPopupComponent>, private toastr: ToastrService) {
     
    }

  cancel(): void {
    this.dialogRef.close();
  }

  public confirm(): void {
    this.showSpinner = true;
      this.selectedVisitorsDetails = this._visitorDataService.getSelectedRowDetails();
      this._visitorDataService.userCheckedOut(this.selectedVisitorsDetails.id)
        .subscribe(
          (resp: any) => {
            if (resp.responseStatus === 'SUCCESS') {
              this.toastr.success('Visitor Updated Successfully', 'Success');
              this._visitorDataService.selectedRowNode.setData(resp.responseData);
              this.dialogRef.close();
            }
          },
          (error) => {
            this.toastr.error('Some error occurred', 'Failure');
          }
        )
        .add(() => {
          this.showSpinner = false;
        });
  }
}
