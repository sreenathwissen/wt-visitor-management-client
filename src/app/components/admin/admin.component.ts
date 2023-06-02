import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import 'ag-grid-enterprise';
import { VisitorDataService } from 'src/app/services/visitor-data.service';
import { refData, responseData, visitorTypesCount, visitorsDataType } from 'src/app/services/visitor-dataTypes';
import { RefdataService } from 'src/app/services/refdata.service';
import { CheckoutComponent } from './checkout/checkout.component'; 
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  columnDefs = [
    { headerName: 'Full Name', field: 'fullName', suppressSizeToFit: false},
    { headerName: 'Email Address', field: 'email', suppressSizeToFit: false},
    { headerName: 'Phone Number', field: 'phoneNumber', suppressSizeToFit: false},
    { headerName: 'Point of Contact', field: 'pointOfContact', suppressSizeToFit: false},
    { headerName: 'Check-in', field: 'inTime', suppressSizeToFit: false},
    { headerName: 'Check-out', field: 'outTime', suppressSizeToFit: false},
    {
      headerName: 'status',
      field: '',
      width: 150,
      cellRenderer: (params: any) => {
        if (params.data?.outTime) {
          return `<button
            type="button"
            class="btn btn-secondary btn-sm"
          >
          Checked Out
          </button>`;
        } else {
          return `
          <button
          type="button"
          class="btn btn-danger btn-sm"
        >
        Active
        </button>`;
        }
      },
    },
    { headerName: '', field: 'view',  headerComponentParams: { template: '<img src="./assets/images/checkout.jpg" />' },
    cellRenderer: CheckoutComponent
    }
  ];
  rowData!: any[];
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: false,
    cellStyle: { border: 'none' },
    suppressHorizontalScroll: false
  };
  public selectedVisitor: any;
  public showSpinner!: boolean;
  public api: any;
  public isNew!: boolean;
  public visitorType: Array<visitorTypesCount> = [];
  public meetings!: number;
  public interviews!: number;
  public vendors!: number;
  public others!: number;
  public visitorDetails!: Array<responseData>;
  public visitorsPurposes!: Array<string>;

  constructor(private _visitorDataService: VisitorDataService,
    private _refdataService: RefdataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.getRefData();
    this.getVisitorData();
  }

  public getRefData(): void {
    this._refdataService.getRefdata().subscribe((refData: refData)=> {
       this.visitorsPurposes = refData.responseData.visitorsPurposes;
    });
  }

  public getVisitorData(): void {
    this._visitorDataService.getVisitersData()
    .subscribe((visitorsData: visitorsDataType) => {
      if(visitorsData.responseStatus === 'SUCCESS') {
        this.getPurposeofVisitCount(visitorsData);
        this.visitorType.push({"img": "./assets/images/meeting.jpg", "visitorType": this.visitorsPurposes[0], "count": this.meetings},
                              {"img": "./assets/images/interview.jpg", "visitorType": this.visitorsPurposes[1], "count": this.interviews},
                              {"img": "./assets/images/vendor.jpg", "visitorType": this.visitorsPurposes[2], "count": this.vendors},
                              {"img": "./assets/images/others.jpg", "visitorType": this.visitorsPurposes[3], "count": this.others});
        this.visitorDetails = visitorsData.responseData || [];
        this.rowData = this.visitorDetails.filter(row => row.purposeOfVisit === "Meeting");
        this.showSpinner = false;
      }
    })
  }

  public getPurposeofVisitCount(data: visitorsDataType): void {
    this.meetings = data.responseData.filter(row => row.purposeOfVisit === "Meeting").length;
    this.interviews = data.responseData.filter(row => row.purposeOfVisit === "Interview").length;
    this.vendors = data.responseData.filter(row => row.purposeOfVisit === "Vendor").length;
    this.others = data.responseData.filter(row => (row.purposeOfVisit != "Meeting") && 
    (row.purposeOfVisit != "Interview") && (row.purposeOfVisit != "Vendor")).length;
  }

  onRowClicked(e: any) {
      this.selectedVisitor = e.data;
      this._visitorDataService.setSelectedRowDetails(this.selectedVisitor);
      this._visitorDataService.selectedRowNode = e.node;
      this.isNew = false;
  }

  onGridReady = (params: any) => {
    this.api = params.api;
    params.api.sizeColumnsToFit();
  };

  public getVisitorsDetails(item: visitorTypesCount): void {
   if(this._visitorDataService.getVisitorsDetails()) {
    this.visitorDetails = this._visitorDataService.getVisitorsDetails();
   }
    if((item.visitorType === 'Meeting') || (item.visitorType === 'Interview') || (item.visitorType === 'Vendor')) {
      this.rowData = this.visitorDetails.filter(row => row.purposeOfVisit === item.visitorType);
    } else {
      this.rowData = this.visitorDetails.filter(row => (row.purposeOfVisit != "Meeting") && 
      (row.purposeOfVisit != "Interview") && (row.purposeOfVisit != "Vendor"));
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '300px',
      height: '100%',
      position: {left:'80%'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.rowData = result;
    }); 
  }
}
