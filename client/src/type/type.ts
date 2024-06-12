import { Interface } from "readline";

export interface DatePickerProps {
    buttonName: string;
    value: Date | undefined;
    setValue: (value: Date | undefined) => void;
   
}

export interface RcnPrimaryEntryData {
    approvedBy: string;
    id: number;
    origin: string;
    blNo: string;
    conNo: string;
    rcnStatus: string;
    date: string;
    noOfBags: string;
    truckNo: string;
    blWeight: string;
    netWeight: string;
    difference: string;
    editStatus: string;
    receivedBy: string;
    createdAt: string;
}
export interface EditPendingData extends RcnPrimaryEntryData {
    editedBy: string;

}
export interface QcRcnEntryData {
    
    id:number;
    blNo: string;
    conNo: string;
    date: string;
    origin: string;
    sampling:string;
    moisture:string;
    nutCount:string;
    fluteRate:string;
    goodKernel:string;
    spIm:string;
    reject:string;
    shell:string;
    outTurn:string;
    Remarks:string;
    qcapprovedBy:string;
    reportStatus:number;
    createdBy:string;
    rcnEntry:RcnPrimaryEntryData;
    editStatus:string;
}



export interface ExcelRcnPrimaryEntryData {
    SL_No: number;
    Approved_or_Reverted_By: string;
    Origin: string;
    Bl_No: string;
    Con_No: string;
    RCN_QC_Status: string;
    Date: string;
    No_Of_Bags: string;
    Truck_No: string;
    Bl_Weight: string;
    Net_Weight: string;
    Difference: string;
    Edit_Status: string;
    Created_by: string;

}

export interface SumofAllCuntryData {
    origin: string;
    totalBags: number;
}

export interface EmployeeData {
    id: number;
    employeeId: string;
    employeeName: string;
    designation: string;
    email: string;
    mobNo: string;
    alternateMobNo: string;
    aadhaarNo: string;
    panNo: string;
    heighstQualification: string;
    bloodGroup: string;
    dateOfJoining: string;
    releseDate: string;
    status: string;
    address: string;
    emergencyContact: string;
    emergencyMobNo: string;
    pfNo: string;
    pincode: string;
    createdBy:string;
    modifyedBy:string;
}


export interface User {
    id: number;
    employeeId: string;
    employeeName: string;
    userName: string;
    dept: string;
    role: string;
    createdBy: string;
    modifyedBy:string;
}

export interface UserProps {
    Data: {
        id: number;
        employeeId: string;
        employeeName: string;
        userName: string;
        dept: string;
        role: string;
        createdBy: string;
    }
}

export interface AssetData {
    id: number;
    machineID: string;
    machineName: string;
    description: string;
    status: string;
    section: string;
    createdBy: string;
    modifiedBy: string;
}

export interface PermissionRole {

    Director: string[];
    ReceivingManager:string[];
    FactoryManager:string[];
    ReceivingSupervisor:string[];
    QCSupervisor:string[];
    QCManager:string[];

}

export interface PermissionDept {
    Admin:string[];
    Receiving:string[];
    Maintainance:string[];
    Production:string[];
    QualityControl:string[];
    
}

export interface pendingCheckRoles  {
    RCNPrimary:string[];
    QCManager:string[]
}

