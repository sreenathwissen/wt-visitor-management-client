import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppUrlConstants } from '../components/constants/app-url.constants';

@Injectable()
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  /** Method to Fetch Employee Details */
  public fetchEmployee(queryParams: string): Observable<any> {
    let url = AppUrlConstants.employeeSearch.concat(queryParams);
    return this.httpClient.get(url);
  }

 

}



