import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RowNode } from 'ag-grid-community';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorDataService {
  public selectedRowNode!: RowNode;
  public selectedRowDetails: any;
  public visitorsDetails!: any;

  constructor(private _http: HttpClient) {
   }

  public getVisitersData(): Observable<any> {
    return this._http
    .post('http://localhost:8080/api/visitor/fetch',
      [
        {
            "dataType": "DATE",
            "fieldName": "inTime",
            "operator": "BETWEEN",
            "values": [
              new Date().toISOString().slice(0,10)+'T00:00:00',
              new Date().toISOString().slice(0,10)+'T23:59:59'
            ]
        }
    ])
  }

  public userCheckedOut(id: any): Observable<any> {
    return this._http
      .put('http://localhost:8080/api/visitor/logout?id=' + id, null)
  }

  public setSelectedRowDetails(data: any): void {
    this.selectedRowDetails = data;
  }

  public getSelectedRowDetails(): any {
    return this.selectedRowDetails;
  }

  public setVisitorsDetails(data: any): void {
    this.visitorsDetails = data;
  }

  public getVisitorsDetails(): any {
    return this.visitorsDetails;
  }
}
