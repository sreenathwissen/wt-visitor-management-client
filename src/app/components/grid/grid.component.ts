import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  columnDefs = [
    { headerName: 'Visitor ID Number', field: 'id' },
    {
      headerName: 'View',
      field: 'view',
      cellRenderer: () => {
        return `<button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          View
        </button>`;
      },
    },
    { headerName: 'Full Name', field: 'fullName' },
    { headerName: 'Email', field: 'email' },
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
  showSpinner!: boolean;
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
      console.log(e);
      this.selectedVisitor = e.data;
    }
  }
  updateOutTime(id: number) {
    this.showSpinner = true;
    console.log('id to be updated: ', id);
    this.http
      .put('http://localhost:8080/api/visitor/logout?id=' + id, null)
      .subscribe((resp: any) => {
        if (resp.responseStatus === 'SUCCESS') {
          this.toastr.success('Visitor Updated Successfully', 'Success');
        }
      })
      .add(() => {
        this.showSpinner = false;
        window.location.reload();
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
}
