import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RefdataDto } from 'src/app/model/refdata-dto';
import { AppUrlConstants } from '../components/constants/app-url.constants';

@Injectable()
export class RefDataService {

  constructor(private httpClient: HttpClient) {

  }

  refdata: RefdataDto = new RefdataDto();

  public refdataApiCall(): Observable<any> {
    return this.httpClient.get(AppUrlConstants.refDataUrl);
  }

}