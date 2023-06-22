import { EmployeeDto } from "./employee-dto";
import { VisitorEntity } from "./visitor-model";

export class TimingEntity {

    id?: number;
    visitor?: VisitorEntity;
    inTime?: Date;
    outTime?: Date;
    employee?: EmployeeDto;
    visitorType: string = '';

}