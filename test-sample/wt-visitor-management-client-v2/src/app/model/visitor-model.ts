import { TimingEntity } from "./timings-model";

export class VisitorEntity {

    visitorId?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    location?: string;
    proofType?: string;
    idProofNumber?: string;
    tempCardNo?: string;
    visitorImageBase64?: string;
    timings: Array<TimingEntity> = [];
    //making it falt map since timings will be array
    timingId?: number;
    inTime?: Date;
    outTime?: Date;
    employeeId?: string;
    visitorType: string = '';

}