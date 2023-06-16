import { formatDate } from '@angular/common';
import { Visitor } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DataType, GenericFilter, OperatorOperator } from 'src/app/model/generic-filter-dto';
import { TimingEntity } from 'src/app/model/timings-model';
import { VisitorEntity } from 'src/app/model/visitor-model';
import { RefDataService } from 'src/app/service/refdata.service';
import { VisitorService } from 'src/app/service/visitor.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  //Passing data from filter to grid 
  // myInputMessage: string = "I am the parent comppnent";

  // mychildMsg: string = '';

  // GetChildData(data: any) {
  //   console.log(data);
  //   //this.mychildMsg = data;
  // }

  agGridResults: Array<VisitorEntity> = [];
  filterResponse: Array<VisitorEntity> = [];
  selectedTab: string = 'Meeting';


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


  /** Update Grid with filter results */
  filterGridResults(visitorType: string) {
    this.selectedTab = visitorType;
    this.agGridResults = [];
    if (this.filterResponse.length > 0) {
      for (var i = 0; i < this.filterResponse.length; i++) {
        var visitorDetails = this.filterResponse[i];

        for (let timing of this.filterResponse[i].timings) {
          if (timing.visitorType == visitorType) {

            this.agGridResults.push(this.filterResponse[i]);
          }

        }

      }
    }
  }

  /** Method to fetch Visitor data */
  fetchVisitorData() {

    if (this.filterForm.invalid) {
      return;
    }

    let inputRequest = this.createFetchRequest(this.filterForm);
    console.log(inputRequest);

    let jsonString = JSON.stringify(inputRequest, null, 4);
    console.log(jsonString);

    this.visitorService.fetchVisitor(jsonString).subscribe(
      (resp: any) => {
        if (resp.responseStatus === 'SUCCESS') {
          //success toaster
          //convert timings array to map one single list
          this.filterResponse = this.convertFaltMapTimings(resp.responseData);

          this.filterGridResults('Meeting');
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




  private createFetchRequest(filterForm: FormGroup<any>): Array<GenericFilter> {
    let filterRequest: Array<GenericFilter> = [];
    /** Full Name */
    let fullNameValue = filterForm.controls['fullName'].value;
    if (fullNameValue != null && fullNameValue.length > 0) {
      filterRequest.push(this.createInStringRequest('fullName', fullNameValue));
    }
    /** employeeId */
    let employeeIdValue = filterForm.controls['employeeId'].value;
    if (employeeIdValue != null && employeeIdValue.length > 0) {
      filterRequest.push(this.createInStringRequest('employeeId', employeeIdValue));
    }

    /** proofType */
    let proofTypeValue = filterForm.controls['proofType'].value;
    if (proofTypeValue != null && proofTypeValue.length > 0) {
      filterRequest.push(this.createInStringRequest('proofType', proofTypeValue));
    }

    /** visitorType */
    let visitorTypeValue = filterForm.controls['visitorType'].value;
    if (visitorTypeValue != null && visitorTypeValue.length > 0) {
      filterRequest.push(this.createInArrayRequest('visitorType', visitorTypeValue));
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


  private createInStringRequest(fieldName: string, value: string): GenericFilter {
    return new GenericFilter(fieldName, OperatorOperator.IN, [value], DataType.STRING);
  }

  private createInArrayRequest(fieldName: string, value: Array<string>): GenericFilter {
    return new GenericFilter(fieldName, OperatorOperator.IN, value, DataType.STRING);
  }



  private convertFaltMapTimings(respData: VisitorEntity[]): VisitorEntity[] {
    const out: VisitorEntity[] = []
    respData.forEach((obj: VisitorEntity) => {
      obj.timings.forEach((timing: TimingEntity) => {
        obj.timingId = timing.id;
        obj.inTime = timing.inTime;
        obj.outTime = timing.outTime;
        obj.employeeId = timing.employeeId;
        obj.visitorType = timing.visitorType;
        out.push({ ...obj });
      });
    });
    console.log(out);

    return out;
  }

  display: string = '';
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }


  //test
  customModel: boolean = false;

  openCustomModal() {
    this.customModel = true;
  }

  closeCustomModal() {
    this.customModel = false;
  }



}