import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  columnDefs = [
    { headerName: 'Visitor ID Number', field: 'visitorIdNumber' },
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
    { headerName: 'Visitor Image', field: 'visitorImage', hide: true },
    { headerName: 'ID Proof Image', field: 'idProofImage', hide: true },
  ];

  rowData!: any[];

  defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };
  selectedVisitor: any;
  constructor(private toastr: ToastrService) {}
  ngOnInit(): void {
    this.rowData = [
      {
        visitorIdNumber: 1,
        fullName: 'Toyota',
        email: 'Celica',
        phoneNumber: 35000,
        pointOfContact: 'Toyota',
        pointOfContactEmail: 'Celica',
        location: 35000,
        purposeOfVisit: 'Toyota',
        visitorType: 'Celica',
        idProofType: 35000,
        idProofNumber: 'Toyota',
        inTime: 'Celica',
        outTime: 35000,
        visitorImage: 'Toyota',
        idProofImage: 'Celica',
      },
      {
        visitorIdNumber: 2,
        fullName: 'Toyota',
        email: 'Celica',
        phoneNumber: 35000,
        pointOfContact: 'Toyota',
        pointOfContactEmail: 'Celica',
        location: 35000,
        purposeOfVisit: 'Toyota',
        visitorType: 'Celica',
        idProofType: 35000,
        idProofNumber: 'Toyota',
        inTime: 'Celica',
        outTime: 35000,
        visitorImage: 'Toyota',
        idProofImage: 'Celica',
      },
      {
        visitorIdNumber: 3,
        fullName: 'Toyota',
        email: 'Celica',
        phoneNumber: 35000,
        pointOfContact: 'Toyota',
        pointOfContactEmail: 'Celica',
        location: 35000,
        purposeOfVisit: 'Toyota',
        visitorType: 'Celica',
        idProofType: 35000,
        idProofNumber: 'Toyota',
        inTime: 'Celica',
        outTime: 35000,
        visitorImage: 'Toyota',
        idProofImage: 'Celica',
      },
    ];
  }
  onRowClicked(e: any) {
    if (e.event.target?.getAttribute('data-toggle') === 'modal') {
      console.log(e);
      this.selectedVisitor = e.data;
    }
  }
  updateOutTime(id: number) {
    console.log('id to be updated: ', id);
    this.toastr.success('Visitor Updated Successfully', 'Success');
    // delay(1000);
    // window.location.reload();
  }
}
