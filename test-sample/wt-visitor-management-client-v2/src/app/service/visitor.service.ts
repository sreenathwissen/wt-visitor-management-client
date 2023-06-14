import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUrlConstants } from '../components/constants/app-url.constants';

@Injectable()
export class VisitorService {

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
        'Content-Type': 'application/json'
      }
    };
    return this.httpClient.post(AppUrlConstants.visitorFetch, requestBody, requestHeaders);
  }
}

/* 

this.http
  .post('http://localhost:8080/api/visitor', this.formGroup.value)
  .subscribe(
    (resp: any) => {
      if (resp.responseStatus === 'SUCCESS') {
        this.toastr.success(
          'Visitor ' +
          (this.formGroup.value.inTime ? 'Updated' : 'Added') +
          ' Successfully',
          'Success'
        );
        //check if it is edit mode
        if (this.f['id'].value) {
          resp.responseData.editMode = true;
        }
        this.formRef.resetForm();
        this.formGroup.reset();
        this.formGroup.markAsUntouched();
        this.isSubmitted = false;
        //TODO: close modal and append resp to rowData
        this.closeModal.emit(resp.responseData);
      } else {
        this.handleFailure();
      }
    },
    (err) => {
      this.handleFailure();
    }
  )
  .add(() => {
    this.showSpinner = false;
  }); */