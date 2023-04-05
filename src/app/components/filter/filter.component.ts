import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() searchWithFilterParams = new EventEmitter<{}[]>();
  constructor(private _formBuilder: FormBuilder) {}
  formGroup = this._formBuilder.group({
    fullName: [''],
    email: [''],
    purposeOfVisit: [''],
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
          fieldName: 'inTime',
          operator: 'BETWEEN',
          values: [
            new Date(this.formGroup.controls['inTimeFrom'].value),
            new Date(this.formGroup.controls['inTimeTo'].value),
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
          fieldName: 'outTime',
          operator: 'BETWEEN',
          values: [
            new Date(this.formGroup.controls['outTimeFrom'].value),
            new Date(this.formGroup.controls['outTimeTo'].value),
          ],
        });
      } else if (
        key.indexOf('Time') === -1 &&
        this.formGroup.controls[key].touched
      ) {
        filterParams.push({
          fieldName: key,
          operator: 'LIKE',
          values: [this.formGroup.controls[key].value],
        });
      }
    });
    this.searchWithFilterParams.emit(filterParams);
  }
}
