import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataType, GenericFilter, OperatorOperator } from 'src/app/model/generic-filter-dto';
import { RefDataService } from 'src/app/service/refdata.service';
import { VisitorService } from 'src/app/service/visitor.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  //declaration
  filterForm!: FormGroup;
  defaultVisitorType: Array<String> = ["Interview", "Meeting", "Vendor", "Others"];

  constructor(private formBuilder: FormBuilder, private visitorService: VisitorService, private refdataService: RefDataService) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      visitorType: [this.defaultVisitorType, Validators.required],
      // validates date format yyyy-mm-dd
      durationFrom: [this.defaultTime(true), [Validators.required]],
      durationTo: [this.defaultTime(false), [Validators.required]],
      timingType: ['inTime', Validators.required],
      proofType: [''],
      employeeId: [''],
      fullName: ['']
    });

    this.fetchVisitorData();
  }


  defaultTime(isPast: boolean) {
    let date = new Date();
    if (isPast)
      date = this.addDays(new Date(), -30)
    const format = 'mm/dd/yyyy hh:mm';
    return formatDate(date, format, 'en-US');
  }


  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  /** Method to fetch Visitor data */
  fetchVisitorData() {

    if (this.filterForm.invalid) {
      return;
    }

    let inputRequest = createFetchRequest(this.filterForm);
    console.log(inputRequest);

    let jsonString = JSON.stringify(inputRequest, null, 4);
    console.log(jsonString);

    this.visitorService.fetchVisitor(jsonString).subscribe(
      (resp: any) => {
        if (resp.responseStatus === 'SUCCESS') {
          //success toaster
          console.log(resp.responseData);
        } else {
          //failure toaster
          console.log('Failed to Fetch Data!!');
        }
      },
      (err) => {
        //failure toaster
        console.log('Error Occurred while fetching');
      }
    ).add(() => {
      console.log('API call done!!');
    });
  }



}
function createFetchRequest(filterForm: FormGroup<any>): Array<GenericFilter> {
  let filterRequest: Array<GenericFilter> = [];
  /** Full Name */
  let fullNameValue = filterForm.controls['fullName'].value;
  if (fullNameValue != null && fullNameValue.length > 0) {
    filterRequest.push(createInStringRequest('fullName', fullNameValue));
  }
  /** employeeId */
  let employeeIdValue = filterForm.controls['employeeId'].value;
  if (employeeIdValue != null && employeeIdValue.length > 0) {
    filterRequest.push(createInStringRequest('employeeId', employeeIdValue));
  }

  /** proofType */
  let proofTypeValue = filterForm.controls['proofType'].value;
  if (proofTypeValue != null && proofTypeValue.length > 0) {
    filterRequest.push(createInStringRequest('proofType', proofTypeValue));
  }

  /** visitorType */
  let visitorTypeValue = filterForm.controls['visitorType'].value;
  if (visitorTypeValue != null && visitorTypeValue.length > 0) {
    filterRequest.push(createInArrayRequest('visitorType', visitorTypeValue));
  }

  /** Timings */



  // : [this.defaultVisitorType, Validators.required],
  //   // validates date format yyyy-mm-dd
  //   durationFrom: [this.defaultTime(true), [Validators.required]],
  //     durationTo: [this.defaultTime(false), [Validators.required]],
  //       timingType: ['inTime', Validators.required],
  //     : [''],
  //     : [''],
  //   fullName: ['']

  return filterRequest;

}


function createInStringRequest(fieldName: string, value: string): GenericFilter {
  return new GenericFilter(fieldName, OperatorOperator.IN, [value], DataType.STRING);
}

function createInArrayRequest(fieldName: string, value: Array<string>): GenericFilter {
  return new GenericFilter(fieldName, OperatorOperator.IN, value, DataType.STRING);
}

