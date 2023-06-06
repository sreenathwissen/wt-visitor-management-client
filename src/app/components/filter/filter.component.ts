import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RefdataService } from 'src/app/services/refdata.service';
import { VisitorDataService } from 'src/app/services/visitor-data.service';
import { refData } from 'src/app/services/visitor-dataTypes';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() searchWithFilterParams = new EventEmitter<{}[]>();
  public visitorsPurposes!: any;
  public purposeOfVisitForm: any;
  public visitorTypes!: string[];
  showSpinner!: boolean;
  visitorData: any;

  constructor(private _formBuilder: FormBuilder, public refdata: RefdataService, 
    public dialogRef: MatDialogRef<FilterComponent>, private _refdataService: RefdataService,
    private _http: HttpClient, private _visitorDataService: VisitorDataService) {}

  formGroup = this._formBuilder.group({
    purposeOfVisit: ['Meeting'],
    checkInTimeFrom:['12:00:00'],
    checkInTimeTo:['12:59:59'],
    checkOutTimeFrom: ['12:00:00'],
    checkOutTimeTo: ['12:59:59'],
    pointOfContact: [''],
    otherPurpose: [''],
    visitorType: [''],
    checkinSelected: ['checkin-selected'],
    inTimeFrom: [new Date().toISOString().split('T')[0]],
    inTimeTo: [new Date().toISOString().split('T')[0]],
    outTimeFrom: [new Date().toISOString().split('T')[0]],
    outTimeTo: [new Date().toISOString().split('T')[0]],
  });

  ngOnInit(): void {
    this._refdataService.getRefdata().subscribe((refData: refData)=> {
      this.visitorsPurposes = refData.responseData.visitorsPurposes;
      this.visitorTypes = refData.responseData.visitorsTypes;
   });
  }

  onSubmit() {
    let filterParams: any[] = [];
    (
      Object.keys(this.formGroup.controls) as (keyof typeof FormGroup)[]
    ).forEach((key: any, index) => {
      if(key === 'purposeOfVisit' && this.purposeOfVisitForm === 'Others') {
        filterParams.push({
          dataType: "STRING",
          fieldName: 'purposeOfVisit',
          operator: 'EQUALS',
          values: [this.formGroup.controls['otherPurpose'].value],
        });
      }
      if (
        JSON.stringify(filterParams).indexOf('inTime') === -1 &&
        (key === 'inTimeFrom' || key === 'inTimeTo') &&
        (this.formGroup.controls['inTimeFrom'].touched ||
          this.formGroup.controls['inTimeTo'].touched)
      ) {
        this.formGroup.controls['inTimeFrom'].setValue(
          this.formGroup.controls['inTimeFrom'].value || '2023-01-01'
        );
        this.formGroup.controls['inTimeTo'].setValue(
          this.formGroup.controls['inTimeTo'].value ||
            new Date().toISOString().split('T')[0]
        );
        this.formGroup.controls['checkInTimeFrom'].setValue(
          this.formGroup.controls['checkInTimeFrom'].value ||
          '00:00:00'
        );
        this.formGroup.controls['checkInTimeTo'].setValue(
          this.formGroup.controls['checkInTimeTo'].value ||
          '23:59:59'
        );
        filterParams.push({
          dataType: "DATE",
          fieldName: 'inTime',
          operator: 'BETWEEN',
          values: [
            new Date(this.formGroup.controls['inTimeFrom'].value).toISOString().slice(0,10)+'T'+ this.formGroup.controls['checkInTimeFrom'].value,
            new Date(this.formGroup.controls['inTimeTo'].value).toISOString().slice(0,10)+'T'+ this.formGroup.controls['checkInTimeTo'].value,
          ],
        });
      } else if (
        JSON.stringify(filterParams).indexOf('outTime') === -1 &&
        (key === 'outTimeFrom' || key === 'outTimeTo') &&
        (this.formGroup.controls['outTimeFrom'].touched ||
          this.formGroup.controls['outTimeTo'].touched)
      ) {
        this.formGroup.controls['outTimeFrom'].setValue(
          this.formGroup.controls['outTimeFrom'].value || '2023-01-01'
        );
        this.formGroup.controls['outTimeTo'].setValue(
          this.formGroup.controls['outTimeTo'].value ||
            new Date().toISOString().split('T')[0]
        );
        this.formGroup.controls['checkOutTimeFrom'].setValue(
          this.formGroup.controls['checkOutTimeFrom'].value ||
          '00:00:00'
        );
        this.formGroup.controls['checkOutTimeTo'].setValue(
          this.formGroup.controls['checkOutTimeTo'].value ||
          '23:59:59'
        );
        filterParams.push({
          dataType: "DATE",
          fieldName: 'outTime',
          operator: 'BETWEEN',
          values: [
            new Date(this.formGroup.controls['outTimeFrom'].value).toISOString().slice(0,10)+'T'+this.formGroup.controls['checkOutTimeFrom'].value,
            new Date(this.formGroup.controls['outTimeTo'].value).toISOString().slice(0,10)+'T'+this.formGroup.controls['checkOutTimeTo'].value
          ],
        });
      } else if (
        key.indexOf('Time') === -1 &&
        this.formGroup.controls[key].touched &&
        this.formGroup.controls['purposeOfVisit'].value !== 'Others' &&
        key !== 'checkinSelected'
      ) {
        filterParams.push({
          dataType: "STRING",
          fieldName: key,
          operator: 'LIKE',
          values: [this.formGroup.controls[key].value],
        });
      }
    });
    this.searchWithFilter(filterParams);
  }

  public searchWithFilter(params: any): void {
    this.showSpinner = true;
    this._http
      .post('http://localhost:8080/api/visitor/fetch', params)
      .subscribe((resp: any) => {
        if (resp.responseStatus === 'SUCCESS') {
          this.visitorData = resp.responseData;
          this.dialogRef.close(this.visitorData);
        }
      })
      .add(() => {
        this.showSpinner = false;
      });
  }

  get f() {
    return this.formGroup.controls;
  }

  changePurposeOfVisit(e: any) {
    this.purposeOfVisitForm = this.formGroup.controls['purposeOfVisit'].value;
  }

  changeVisitorType(e: any) {
    this.formGroup.controls['visitorType'].setValue(e.target.value);
  }

  changeIdProofType(e: any) {
    this.formGroup.controls['idProofType'].setValue(e.target.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
