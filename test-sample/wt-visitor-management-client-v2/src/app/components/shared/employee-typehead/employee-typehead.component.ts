import { Component, Input,Output, EventEmitter  } from '@angular/core';
import { EmployeeDto } from 'src/app/model/employee-dto';
import { EmployeeService } from 'src/app/service/employee.service';


@Component({
  selector: 'app-employee-typehead',
  templateUrl: './employee-typehead.component.html',
  styleUrls: ['./employee-typehead.component.scss']
})
export class EmployeeTypeheadComponent {

  constructor(private employeeService: EmployeeService) {}

  @Input() inputPlaceholder: string = 'Please select';
  @Output() outputEmployeeEmit = new EventEmitter<EmployeeDto>();

  /** Method to fetch Employee from the server */
  fetchEmployeeDetails(searchText:string):EmployeeDto[] {
    const out: EmployeeDto[] = []
    this.employeeService.fetchEmployee(searchText).subscribe((data: any) => {
      if (data.responseStatus == 'SUCCESS') {
        data.responseData?.map((obj: EmployeeDto)=>{
          obj.allData = obj.wissenId.concat('-').concat(obj.firstName).concat(' ').concat(obj.lastName).concat('-').concat(obj.email)
        });
        console.log(data.responseData);
        this.data = data.responseData;
      }
    }).add(() => {
      console.log('Done');
    });
    return [];
  }



  /**
   * Autocomplete Featue with liberary
   * Reference for auto complete is https://www.npmjs.com/package/angular-ng-autocomplete
   */
  itemTemplate!:any;
  notFoundTemplate!:any;
  // Please select Point of contact
  keyword = 'allData';
  data:EmployeeDto[] = [];


  selectEvent(item:any):void {
    //console.log('selected Event ::', item);
    this.outputEmployeeEmit.emit(item);
    // do something with selected item
  }

  onChangeSearch(inputVal: string) {
    console.log('On Changed ::', inputVal);
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    this.fetchEmployeeDetails(inputVal);
  }


}
