import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataType, GenericFilter, OperatorOperator } from 'src/app/model/generic-filter-dto';
import { RefdataDto } from 'src/app/model/refdata-dto';
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

  /** Declaration of variables */
  refdata: RefdataDto = new RefdataDto(); //used for refdata from server side
  agGridResults: Array<VisitorEntity> = []; // used in ag grid view to load internally from the filter results  :::::used as input in grid component
  filterResponse: Array<VisitorEntity> = []; //used to capture response from the api
  selectedTab: string = 'Meeting'; // used to know which tab is selected in admin dashboard
  gridSearch!:string; //Serch the text in the AG-GRID the data is avialble or not:::used as input in grid component


  activeMeetingCount: number = 0; // used to show active count in the dashboard- calculated post filter api search is done
  activeInterviewCount: number = 0;
  activeVendorCount: number = 0;
  activeOtherCount: number = 0;

  /** Model */
  submitted = false; //used to know the form is submitted or not
  filterForm!: FormGroup; //used to validate the filter fields and fetch the data for the grid
  defaultVisitorType: Array<String> = ["Interview", "Meeting", "Vendor", "Others"]; //default values in the admin dashboard

  constructor(private formBuilder: FormBuilder, private visitorService: VisitorService, private refdataService: RefDataService) { }

  /** On Initilaize the component  **/
  ngOnInit(): void {
    /** Fetch data from the service for visitor type and proof type */
    this.fetchRefdata();
    /** Form for filter model to validate and fetch the data */
    this.filterForm = this.formBuilder.group({
      visitorType: [this.defaultVisitorType, Validators.required],
      copyVisitorType: [this.defaultVisitorType],
      // validates date format yyyy-mm-dd
      durationFromDate: [this.defaultDate(true), [Validators.required]],
      durationFromTime: [this.defaultTime(true), [Validators.required]],
      durationToDate: [this.defaultDate(false), [Validators.required]],
      durationToTime: [this.defaultTime(false), [Validators.required]],
      timingType: ['inTime', Validators.required],
      proofType: [''],
      employeeId: [''],
      fullName: ['']
    });

    /** Initial loading of the page with default values */
    this.fetchVisitorData();

  }

  /** Used for form validation */
  get form(): { [key: string]: AbstractControl } {
    return this.filterForm.controls;
  }

  /** Method used to select checkbox in the filter model to fech the data */
  onCheckboxChange(value: string, event: any): void {
    let set = new Set(this.filterForm.get('copyVisitorType')?.value);
    if (event.target.checked) {
      set.add(event.target.value);
    } else {
      set.delete(event.target.value);
    }
    this.filterForm.get('visitorType')?.setValue(set);
    this.filterForm.get('copyVisitorType')?.setValue(set);
  }

  /** Fetch Refdata from the service */
  fetchRefdata() {
    if (this.refdata.visitorsTypes.length == 0) {
      this.refdataService.refdataApiCall().subscribe((data: any) => {
        if (data.responseStatus == 'SUCCESS') {
          this.refdata.proofTypes = data?.responseData?.proofTypes || [];
          this.refdata.visitorsTypes = data?.responseData?.visitorsTypes || [];
        }
      }).add(() => {
        console.log(this.refdata)
      });
    }
  }

  /** Add default values to the filter - date section */
  defaultDate(isPast: boolean) {
    // let date = new Date();
    // if (isPast)
    //   date = this.addDays(new Date(), -30);
    // const format = 'yyyy-mm-dd';    
    // return formatDate(date, format, 'en-US');


    var datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(Date.now(), 'yyyy-mm-dd');

  }

  /** 
   * Add default values to the filter - time section 
   * if isPast is true then start of the time
   * else end of the time
   */

  defaultTime(isPast: boolean) {
    if (isPast)
      return '00:00'
    else
      return '23:59';
  }


  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  /** On Search general to filter from the dashboard */

  /** On Reset of Visitor Filter Form */
  onFilterReset() {
    this.submitted = false;
    this.filterForm.reset();
    this.filterForm.controls['proofType'].setValue('');
    this.filterForm.controls['visitorType'].setValue(this.defaultVisitorType);
    this.filterForm.controls['copyVisitorType'].setValue(this.defaultVisitorType);
    this.filterForm.controls['durationFromDate'].setValue(this.defaultDate(true));
    this.filterForm.controls['durationFromTime'].setValue(this.defaultTime(true));
    this.filterForm.controls['durationToDate'].setValue(this.defaultDate(false));
    this.filterForm.controls['durationToTime'].setValue(this.defaultTime(false));
    this.filterForm.controls['timingType'].setValue('inTime');
    this.filterForm.controls['proofType'].setValue('');
    this.filterForm.controls['employeeId'].setValue('');
    this.filterForm.controls['fullName'].setValue('');

  }


  /** On clicking Submitting visitor form */
  onFilterSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.filterForm.invalid) {
      return;
    }

    // display form values on success
    let jsonString = JSON.stringify(this.filterForm.value, null, 4);
    console.log(jsonString);
    this.fetchVisitorData();
    this.closeCustomModal();
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
          this.setActiveCount(); //Setting active coutn
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

  /** Show the active count of the visitors in the dashboard card view */
  private setActiveCount() {
    this.activeMeetingCount = this.filterResponse.filter(res => res.visitorType == 'Meeting' && (res.outTime == undefined || res.outTime == null)).length;
    this.activeInterviewCount = this.filterResponse.filter(res => res.visitorType == 'Interview' && (res.outTime == undefined || res.outTime == null)).length;
    this.activeVendorCount = this.filterResponse.filter(res => res.visitorType == 'Vendor' && (res.outTime == undefined || res.outTime == null)).length;
    this.activeOtherCount = this.filterResponse.filter(res => res.visitorType == 'Other' && (res.outTime == undefined || res.outTime == null)).length;
  }

  /** Create a filter request based on the filter form data */
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
    let timingType = filterForm.controls['timingType'].value;
    if (visitorTypeValue != null && visitorTypeValue.length > 0) {
      let fromTime: string = filterForm.controls['durationFromDate'].value + ' ' + filterForm.controls['durationFromTime'].value;
      let toTime: string = filterForm.controls['durationToDate'].value + ' ' + filterForm.controls['durationToTime'].value;
      filterRequest.push(this.createBetweenRequest(timingType, fromTime, toTime));
    }

    return filterRequest;

  }

  /** Generic way to create a request with IN clause and String request */
  private createInStringRequest(fieldName: string, value: string): GenericFilter {
    return new GenericFilter(fieldName, OperatorOperator.IN, [value], DataType.STRING);
  }

  /** Generic way to create a request with IN clause and Array request */
  private createInArrayRequest(fieldName: string, value: Array<string>): GenericFilter {
    return new GenericFilter(fieldName, OperatorOperator.IN, value, DataType.STRING);
  }

  /** Generic way to create a request with BETWEEN request */
  private createBetweenRequest(fieldName: string, value1: string, value2: string): GenericFilter {
    return new GenericFilter(fieldName, OperatorOperator.BETWEEN, [value1, value2], DataType.STRING);
  }

/** Convert the response from the server to AG-Grid viewable data */
  private convertFaltMapTimings(respData: VisitorEntity[]): VisitorEntity[] {
    const out: VisitorEntity[] = []
    respData.forEach((obj: VisitorEntity) => {
      obj.timings.forEach((timing: TimingEntity) => {
        obj.timingId = timing.id;
        obj.inTime = timing.inTime;
        obj.outTime = timing.outTime;
        obj.visitorType = timing.visitorType;
        //employee data inside timings table
        obj.pocId = timing.employee?.wissenId;
        obj.pocFirstName = timing.employee?.firstName;
        obj.pocLastName = timing.employee?.lastName;
        obj.pocEmail = timing.employee?.email;
        obj.pocGender = timing.employee?.gender;
        obj.pocManager = timing.employee?.manager;

        obj.pocInfo =  timing.employee?.wissenId.concat('-').concat(timing.employee?.firstName).concat(' ').concat(timing.employee?.lastName);

        out.push({ ...obj });
      });
    });
    //console.log(out);

    return out;
  }




  /** Filter side model to open */
  customModel: boolean = false;

  /** Open the custom filter section on the right */
  openCustomModal(): void {
    this.customModel = !this.customModel;
  }

    /** Close the custom filter section on the right */
  closeCustomModal(): void {
    this.customModel = false;
  }
  /** Filter side model to open */


  /** Check-Out pop up for confirmation */
  display: string = '';
  celldata: VisitorEntity = new VisitorEntity();
  /** Open the bootstrap model */
  openModal(cellData: VisitorEntity) {
    this.celldata = cellData;
    this.display = "block";
  }
  /** Close the bootstrap model */
  onCloseHandled(isConfirmCheckout: boolean) {
    if (isConfirmCheckout) {
      //call service
      console.log(this.celldata);
      this.checkoutVisitor();
    } else {
      this.celldata = new VisitorEntity();
    }
    this.display = "none";
  }
  /** Check-Out pop up for confirmation */


  /** Method to update Visitor timings data */
  private checkoutVisitor() {


    let queryParams = 'timingsId=' + this.celldata.timingId + '&visitorId=' + this.celldata.visitorId;
    this.visitorService.checkooutVisitor(queryParams).subscribe(
      (resp: any) => {
        console.log(resp);
        //let resp: any = { "responseStatus": "SUCCESS", "responseData": [{ "id": this.celldata.timingId, "inTime": "2023-06-16 23:18:20", "outTime": "2023-06-18 09:17:46", "employeeId": "34354", "visitorType": "Interview" }], "errors": null };
        if (resp.responseStatus === 'SUCCESS') {
          this.filterResponse.filter(data => data.timingId === resp.responseData[0].id).map(time => time.outTime = resp.responseData[0].outTime);
          //refresh the grid post save
          this.celldata = new VisitorEntity();
        } else {
          //failure toaster
          console.log('Failed to Update the visitor details!!');
        }
      },
      (err) => {
        //failure toaster
        console.log('Error Occurred while updating the vistor details');
      }
    ).add(() => {
      console.log('API call done!!');
    });
  }

}