import { VisitorEntity } from "./visitor-model";

export class TimingEntity {

    id?: number;
    visitor?: VisitorEntity;
    inTime?: Date;
    outTime?: Date;
    employeeId?: string;
    visitorType: string = '';
}