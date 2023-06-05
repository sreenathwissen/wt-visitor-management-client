
export interface responseData {
    email: string;
    fullName: string;
    id: string;
    idProofImageBase64: string;
    idProofNumber: string;
    idProofType: string;
    inTime: string;
    location: string;
    outTime: string;
    phoneNumber: string;
    pointOfContact: string;
    pointOfContactEmail: string;
    purposeOfVisit: string;
    tempCardNo: string;
    visitorImageBase64: string;
    visitorType: string;
}

export interface visitorsDataType {
    errors: string;
    responseData: responseData[];
    responseStatus: string;
}

export interface visitorTypesCount {
    img: string;
    visitorType: string;
    count: number;
}

export interface refData {
        responseStatus: string;
        responseData: refResponseData;
        errors: string;
}

export interface refResponseData {
        "visitorsIdTypes": Array<string>;
        "visitorsPurposes": Array<string>;
        "visitorsTypes": Array<string>;
}