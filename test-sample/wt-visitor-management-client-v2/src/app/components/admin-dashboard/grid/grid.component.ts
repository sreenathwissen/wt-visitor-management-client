import { Component, Input } from '@angular/core';
import { TimingEntity } from 'src/app/model/timings-model';
import { ProfileImageCellRenderComponent } from './cells/profile-image-cell-render/profile-image-cell-render.component';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  constructor() { }

  // @Input() myinputMsg: string = '';
  // @Output() myOutput: EventEmitter<string> = new EventEmitter();
  // outputMessage: string = "I am child component.";
  // sendValues() {
  //   this.myOutput.emit(this.outputMessage);
  // }

  @Input() agGridData: any = [];

  columnDefs = [
    { headerName: 'Full Name', field: 'visitorImageBase64', pinned: false, cellRenderer: ProfileImageCellRenderComponent, flex: 4 },
    // { headerName: 'Full Name', field: 'fullName', pinned: false },
    { headerName: 'Email', field: 'email', flex: 3 },
    { headerName: 'Phone Number', field: 'phoneNumber', flex: 2 },
    { headerName: 'Point of Contact', field: 'employeeId', flex: 3 },
    { headerName: 'Check-In', field: 'inTime', flex: 2 },
    { headerName: 'Check-Out', field: 'outTime', flex: 2 },
    { headerName: 'status', field: 'test', flex: 2 },
    { headerName: 'T', field: 'test', flex: 1 }
  ];


  defaultColDef = {
    sortable: true,
    filter: false,
    floatingFilter: false,
    resizable: true,
    cellStyle: { border: 'none' },
  };



}
