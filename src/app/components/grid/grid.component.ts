import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from '../form/form.component';
import { RowNode } from 'ag-grid-community';
import 'ag-grid-enterprise'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  @ViewChild('addVisitorModal') addVisitorModal!: ElementRef;
  @ViewChild('checkoutVisitorModal') checkoutVisitorModal!: ElementRef;
  columnDefs = [
    { headerName: 'Visitor ID Number', field: 'id', hide: true },
    { headerName: 'Full Name', field: 'fullName' },
    {
      headerName: 'Action',
      field: 'view',
      width: 203,
      cellRenderer: (params: any) => {    
        let ret = `<button
          type="button"
          class="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#exampleModalCenter2"
        >
        <i class="fa-solid fa-eye"></i>&nbsp;View
        </button>`;
        if(!params.data?.outTime)
        {ret = ret + `
        <button
          type="button"
          class="btn btn-success btn-sm checkout"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
        <i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i>&nbsp;Checkout
        </button>`;}
        return ret;
      },
    },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Card Number', field: 'cardNumber' },
    { headerName: 'Phone Number', field: 'phoneNumber' },
    { headerName: 'Point of Contact', field: 'pointOfContact' },
    { headerName: 'Point of Contact EMail', field: 'pointOfContactEmail' },
    { headerName: 'Location', field: 'location' },
    { headerName: 'Purpose of Visit', field: 'purposeOfVisit' },
    { headerName: 'Visitor Type', field: 'visitorType' },
    { headerName: 'ID Proof Type', field: 'idProofType' },
    { headerName: 'ID Proof Number', field: 'idProofNumber' },
    { headerName: 'In-time', field: 'inTime' },
    { headerName: 'Out-time', field: 'outTime' },
    { headerName: 'Visitor Image', field: 'visitorImageBase64', hide: true },
    { headerName: 'ID Proof Image', field: 'idProofImageBase64', hide: true },
  ];

  rowData!: any[];

  defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  selectedVisitor: any;
  selectedRowNode!: RowNode;
  showSpinner!: boolean;
  api: any;
  isNew!: boolean;
  constructor(private toastr: ToastrService, private http: HttpClient) {}
  ngOnInit(): void {
    this.showSpinner = true;
    this.http
      .post('http://localhost:8080/api/visitor/fetch', [])
      .subscribe((resp: any) => {
        if (resp.responseStatus === 'SUCCESS') {
          this.rowData = resp.responseData || [];
        }
      })
      .add(() => {
        this.showSpinner = false;
      });
  }
  onRowClicked(e: any) {
    if (e.event.target?.getAttribute('data-toggle') === 'modal') {
      this.selectedVisitor = e.data;
      this.selectedRowNode = e.node;    
      this.isNew = false;
      this.formComponent.formGroup.patchValue(this.selectedVisitor);
    }
  }
  updateOutTime(id: number) {
    this.showSpinner = true;
    console.log('id to be updated: ', id);
    this.http
      .put('http://localhost:8080/api/visitor/logout?id=' + id, null)
      .subscribe(
        (resp: any) => {
          if (resp.responseStatus === 'SUCCESS') {
            this.toastr.success('Visitor Updated Successfully', 'Success');
            this.selectedRowNode.setData(resp.responseData);
            this.checkoutVisitorModal.nativeElement.click();
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
  searchWithFilterParams(e: any) {
    console.log('event: ', e);
    this.showSpinner = true;
    this.http
      .post('http://localhost:8080/api/visitor/fetch', e)
      .subscribe((resp: any) => {
        if (resp.responseStatus === 'SUCCESS') {
          this.rowData = resp.responseData || [];
        }
      })
      .add(() => {
        this.showSpinner = false;
      });
  }
  closeModalWithAppendData(e: any) {
    this.addVisitorModal.nativeElement.click();
    if(e.editMode) {
      this.selectedRowNode.setData(e);
    } else {
      this.rowData.unshift(e);
      this.rowData = [...this.rowData];
    }
  }
  onGridReady = (params: any) => {
    this.api = params.api;
}
  downloadExcel() {
    this.api.exportDataAsExcel();
  }
}
