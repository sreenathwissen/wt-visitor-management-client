import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RowNode } from 'ag-grid-community';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  // @ViewChild(FormComponent) formComponent!: FormComponent;
  @ViewChild('addVisitorModal') addVisitorModal!: ElementRef;
  @ViewChild('checkoutVisitorModal') checkoutVisitorModal!: ElementRef;
  columnDefs = [
    { headerName: 'Visitor ID Number', field: 'id', hide: true },
    {
      headerName: 'Action',
      field: 'view',
      pinned: true,
      filter: false,
      width: 150,
      cellRenderer: (params: any) => {
        if (params.data?.outTime) {
          return `<button
            type="button"
            class="btn btn-primary btn-sm"
            data-toggle="modal"
            data-target="#exampleModalCenter2"
          >
          <i class="fa-solid fa-eye"></i>
          </button>`;
        } else {
          return `
          <button
          type="button"
          class="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#exampleModalCenter2"
        >
        <i class="fa-solid fa-pencil"></i>
        </button>
        <button
          type="button"
          class="btn btn-success btn-sm checkout"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
        <i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i>
        </button>`;
        }
      },
    },
    { headerName: 'Full Name', field: 'fullName', pinned: true },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Temp Card No', field: 'tempCardNo' },
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
    cellStyle: { border: 'none' },
  };
  selectedVisitor: any;
  selectedRowNode!: RowNode;
  showSpinner!: boolean;
  api: any;
  isNew!: boolean;
  constructor(private http: HttpClient) { }
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
    if (
      e.event.target.parentElement.getAttribute('data-toggle') === 'modal' ||
      e.event.target?.getAttribute('data-toggle') === 'modal'
    ) {
      this.selectedVisitor = e.data;
      this.selectedRowNode = e.node;
      this.isNew = false;
      //this.formComponent.formGroup.patchValue(this.selectedVisitor);
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
            //this.toastr.success('Visitor Updated Successfully', 'Success');
            this.selectedRowNode.setData(resp.responseData);
            this.checkoutVisitorModal.nativeElement.click();
          }
        },
        (error) => {
          // this.toastr.error('Some error occurred', 'Failure');
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
    if (e.editMode) {
      this.selectedRowNode.setData(e);
    } else {
      this.rowData.unshift(e);
      this.rowData = [...this.rowData];
    }
  }
  onGridReady = (params: any) => {
    this.api = params.api;
  };
  downloadExcel() {
    this.api.exportDataAsExcel();
  }
}
