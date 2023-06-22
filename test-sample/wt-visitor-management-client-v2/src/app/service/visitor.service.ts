import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AppUrlConstants } from '../components/constants/app-url.constants';

@Injectable()
export class VisitorService {

  otpSubject: Subject<any> = new Subject();
  otpQueryParams!: string;

  constructor(private httpClient: HttpClient) { }

  /** Method to save Visitor Details */
  public saveVisitor(requestBody: any): Observable<any> {
    let requestHeaders = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.httpClient.post(AppUrlConstants.visitorSave, requestBody, requestHeaders);
  }

  /** Method to fetch Visitor Details */
  fetchVisitor(requestBody: any): Observable<any> {
    let requestHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    return this.httpClient.post(AppUrlConstants.visitorFetch, requestBody, requestHeaders);
  }

  /** Method to update visitor details on check-out */
  checkooutVisitor(queryParams: string) {
    let requestHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    let url = AppUrlConstants.checkoutVisitor.concat(queryParams);
    return this.httpClient.put(url, requestHeaders);
  }

  /** Method to send otp to registerd email if valid */
  sendOtpToVisitor(queryParams: string): Observable<any> {
    // let url = AppUrlConstants.sendOtpToVisitor.concat(queryParams);
    // return this.httpClient.get(url);

    let requestHeaders = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    let url = AppUrlConstants.checkoutVisitor.concat(queryParams);
    return this.httpClient.put(url, requestHeaders);
  }

}



