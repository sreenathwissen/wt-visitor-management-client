import { Component, Input, OnInit } from '@angular/core';
import { CheckoutCellRenderComponent } from './cells/checkout-cell-render/checkout-cell-render.component';
import { ProfileImageCellRenderComponent } from './cells/profile-image-cell-render/profile-image-cell-render.component';
import { StatusCellRenderComponent } from './cells/status-cell-render/status-cell-render.component';
import { GridApi, GridOptions, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { VisitorEntity } from 'src/app/model/visitor-model';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  constructor() { }

  /** Declaration of variables used in the componet */
  private gridApi!: GridApi<VisitorEntity>;
  gridOptions: GridOptions = <GridOptions>{};
  private _searchText!: string;

  /** Input arguments to the Ag-Grid which is been passed from parent component - FilterComponent */
  @Input() agGridData: VisitorEntity[] = [];
  /** Search Text with Getter and setter since the data comes when user enter in input text area */
  @Input() set searchText(value: string) {
    //this._searchText = value;
    this.externalFilterChanged(value);
  }
  get searchText(): string { return this._searchText; }



  /** On loading of the component */
  ngOnInit(): void {
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowData = this.agGridData;
    //this.gridOptions?.api.sizeColumnsToFit();

  }

  /** AG Grid columns */
  columnDefs = [
    { headerName: '', field: 'visitorImageBase64', pinned: false, cellRenderer: ProfileImageCellRenderComponent, flex: 1},
    { headerName: 'Full Name', field: 'fullName', flex: 3},
    // { headerName: 'Full Name', field: 'fullName', pinned: false },
    { headerName: 'Email', field: 'email', flex: 3 },
    { headerName: 'Phone Number', field: 'phoneNumber', flex: 2 },
    { headerName: 'Point of Contact', field: 'pocInfo', flex: 3 },
    { headerName: 'Check-In', field: 'inTime', flex: 2 },
    { headerName: 'Check-Out', field: 'outTime', flex: 2 },
    { headerName: 'status', field: 'test', flex: 2, cellRenderer: StatusCellRenderComponent },
    { headerName: '', field: 'test', flex: 1, cellRenderer: CheckoutCellRenderComponent }
  ];


  /** Default vaues to AG-Grid  */
  defaultColDef = {
    sortable: true,
    filter: false,
    floatingFilter: false,
    resizable: true,
    cellStyle: { border: 'none' },
  };

  /** On AG-Grid loading of the data and details */
  onGridReady(params: GridReadyEvent<VisitorEntity>) {
    this.gridApi = params.api;
  }

  /** When user use the text field to search the data in the component */
  externalFilterChanged(textSearch: string) {
    // this._searchText = textSearch;
    // this.gridApi.setQuickFilter(textSearch);
    if(textSearch!=undefined && textSearch != null){
      console.log(textSearch);
      this.gridApi.setQuickFilter(textSearch);
    }
  }


}


