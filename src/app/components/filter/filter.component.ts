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
    inTime: [''],
    outTime: [''],
  });
  ngOnInit(): void {}
  onSubmit() {
    let filterParams: any[] = [];
    (
      Object.keys(this.formGroup.controls) as (keyof typeof FormGroup)[]
    ).forEach((key: any, index) => {
      if (this.formGroup.controls[key].touched) {
        filterParams.push({
          fieldName: key,
          operator: 'LIKE',
          values: [
            key === 'inTime' || key === 'outTime'
              ? new Date(this.formGroup.controls[key].value)
              : this.formGroup.controls[key].value,
          ],
        });
      }
    });
    this.searchWithFilterParams.emit(filterParams);
  }
}
