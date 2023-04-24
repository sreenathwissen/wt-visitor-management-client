import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RefdataService } from 'src/app/services/refdata.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() searchWithFilterParams = new EventEmitter<{}[]>();
  constructor(private _formBuilder: FormBuilder, public refdata: RefdataService) {}
  formGroup = this._formBuilder.group({
    fullName: [''],
    email: [''],
    purposeOfVisit: [''],
    otherPurpose: [''],
    pointOfContact: [''],
    location: [''],
    visitorType: [''],
    idProofType: [''],
    inTimeFrom: [''],
    inTimeTo: [''],
    outTimeFrom: [''],
    outTimeTo: [''],
  });
  ngOnInit(): void {}
  onSubmit() {
    let filterParams: any[] = [];
    (
      Object.keys(this.formGroup.controls) as (keyof typeof FormGroup)[]
    ).forEach((key: any, index) => {
      if(key === 'purposeOfVisit' && this.formGroup.controls['purposeOfVisit'].value === 'Others') {
        filterParams.push({
          dataType: "STRING",
          fieldName: 'purposeOfVisit',
          operator: 'LIKE',
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
        filterParams.push({
          dataType: "DATE",
          fieldName: 'inTime',
          operator: 'BETWEEN',
          values: [
            new Date(this.formGroup.controls['inTimeFrom'].value).toISOString().slice(0,10)+'T00:00:00',
            new Date(this.formGroup.controls['inTimeTo'].value).toISOString().slice(0,10)+'T23:59:59',
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
        filterParams.push({
          dataType: "DATE",
          fieldName: 'outTime',
          operator: 'BETWEEN',
          values: [
            new Date(this.formGroup.controls['outTimeFrom'].value).toISOString().slice(0,10)+'T00:00:00',
            new Date(this.formGroup.controls['outTimeTo'].value).toISOString().slice(0,10)+'T23:59:59',
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
    this.searchWithFilterParams.emit(filterParams);
  }

  get f() {
    return this.formGroup.controls;
  }

  changePurposeOfVisit(e: any) {
    this.formGroup.controls['purposeOfVisit'].setValue(e.target.value);
    this.formGroup.controls['visitorType'].setValue('');
    this.formGroup.controls['visitorType'].markAsUntouched();
    this.formGroup.controls['otherPurpose'].setValue('');
    this.formGroup.controls['otherPurpose'].markAsUntouched();
  }

  changeVisitorType(e: any) {
    this.formGroup.controls['visitorType'].setValue(e.target.value);
  }

  changeIdProofType(e: any) {
    this.formGroup.controls['idProofType'].setValue(e.target.value);
  }
}
