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
    purposeOfVisit: [''],
    inDate: [''],
    checkInTime:[''],
    outDate: [''],
    checkOutTime: [''],
    pointOfContact: [''],
    otherPurpose: [''],
    visitorType: ['']
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
        (key === 'inDate' || key === 'checkInTime') &&
        (this.formGroup.controls['inDate'].touched ||
          this.formGroup.controls['checkInTime'].touched)
      ) {
        this.formGroup.controls['inDate'].setValue(
          this.formGroup.controls['inDate'].value || '2023-01-01'
        );
        this.formGroup.controls['checkInTime'].setValue(
          this.formGroup.controls['checkInTime'].value ||
            '00:00:00'
        );
        filterParams.push({
          dataType: "DATE",
          fieldName: 'inTime',
          operator: 'BETWEEN',
          values: [
            new Date(this.formGroup.controls['inDate'].value).toISOString().slice(0,10)+'T00:00:00',
            new Date(this.formGroup.controls['inDate'].value).toISOString().slice(0,10)+'T'+this.formGroup.controls['checkInTime'].value
          ],
        });
      } else if (
        JSON.stringify(filterParams).indexOf('outTime') === -1 &&
        (key === 'outDate' || key === 'checkOutTime') &&
        (this.formGroup.controls['outDate'].touched ||
          this.formGroup.controls['checkOutTime'].touched)
      ) {
        this.formGroup.controls['outDate'].setValue(
          this.formGroup.controls['outDate'].value || '2023-01-01'
        );
        this.formGroup.controls['checkOutTime'].setValue(
          this.formGroup.controls['checkOutTime'].value ||
            new Date().toISOString().split('T')[0]
        );
        filterParams.push({
          dataType: "DATE",
          fieldName: 'outTime',
          operator: 'BETWEEN',
          values: [
            new Date(this.formGroup.controls['outDate'].value).toISOString().slice(0,10)+'T00:00:00',
            new Date(this.formGroup.controls['outDate'].value).toISOString().slice(0,10)+'T'+this.formGroup.controls['checkOutTime'].value
          ],
        });
      } else if (
        key.indexOf('Time') === -1 &&
        this.formGroup.controls[key].touched &&
        this.formGroup.controls['purposeOfVisit'].value !== 'Others'
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
