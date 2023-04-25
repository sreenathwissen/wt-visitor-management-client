import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefdataService {

  constructor(private http: HttpClient) { }

  refDataObj: any = {};

  getRefdata(): Observable<any> {
    return this.http
      .get('http://localhost:8080/api/refdata');
  }

}
