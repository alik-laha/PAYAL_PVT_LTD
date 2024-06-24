

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

export interface QcRcnEntryExcelData {
    id: number;
    blNo: string;
    conNo: string;
    date: string;
    origin: string;
    truckNo: string;
    BLWeight: string;
    NoOfBags: string;
    QCStatus: string;
    sampling: string;
    moisture: string;
    nutCount: string;
    fluteRate: string;
    goodKernel: string;
    spIm: string;
    reject: string;
    shell: string;
    outTurn: string;
    Remarks: string;
    qcapprovedBy: string;
    reportStatus: string;
    EntriedBy: string;

    editStatus: string;
    editapprovedorRejectedBy: string;


}
export interface QcRcnEntryData {

    id: number;
    blNo: string;
    conNo: string;
    date: string;
    origin: string;
    sampling: string;
    moisture: string;
    nutCount: string;
    fluteRate: string;
    goodKernel: string;
    spIm: string;
    reject: string;
    shell: string;
    outTurn: string;
    Remarks: string;
    qcapprovedBy: string;
    reportStatus: number;
    createdBy: string;
    rcnEntry: RcnPrimaryEntryData;
    editStatus: string;
    editapprovedBy: string;
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
    createdBy: string;
    modifyedBy: string;
}


export interface User {
    id: number;
    employeeId: string;
    employeeName: string;
    userName: string;
    dept: string;
    role: string;
    createdBy: string;
    modifyedBy: string;
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
    primaryAsset: number;
    id: number;
    machineID: string;
    machineName: string;
    description: string;
    status: string;
    section: string;
    createdBy: string;
    modifiedBy: string;
}
export interface AssetDataExcel {
    primaryAsset: string;
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
    ReceivingManager: string[];
    FactoryManager: string[];
    ReceivingSupervisor: string[];
    QCSupervisor: string[];
    QCManager: string[];
    GradingSupervisor: string[];
    ScoopingSupervisor:string[];
    BoilingSupervisor:string[];


}

export interface PermissionDept {
    Admin: string[];
    Receiving: string[];
    Maintainance: string[];
    Production: string[];
    QualityControl: string[];
    Grading: string[];
    Boiling:string[];

}
export interface BoilingEntryData{
        id: number;
        LotNo: string;
        date: string;
        origin: string;
        SizeName: string;
        Size: string;
        Scooping_Line_Mc: string;
        Pressure: 56;
        CookingTime: string;
        MCName: string;
        Mc_on: string;
        Mc_off: string;
        noOfEmployees: string;
        Mc_breakdown: string;
        otherTime: string;
        CreatedBy: string;
        editStatus: string;
        Mc_runTime: string;
        modifiedBy: string;
       

}

export interface GradingData {
    id: number;
    date: string;
    origin: string;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    G: number;
    dust: number;
    Mc_name: string;
    Mc_on: string;
    Mc_off: string;
    noOfEmployees: number;
    Mc_breakdown: string;
    otherTime: string;
    grading_lotNo: string;
    Mc_runTime: string;
    editStatus: string;
    feeledBy: string;
    modifiedBy: string;
}

export interface pendingCheckRoles {
    RCNPrimary: string[];
    QCRCN: string[];
    Grading: string[];
}

export interface GradingExcelData {
    Sl_No: number;
    Entry_Date: string;
    Origin: string;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    F: number;
    G: number;
    Dust: number;
    Machine: string;
    MC_On: string;
    MC_Off: string;
    Labour_No: number;
    Breakdown_Duration: string;
    Other_Duration: string;
    Grading_Lot_No: string;
    Run_Duration: string;
    Edit_Status: string;
    Entried_By: string;
    ApprovedOrRejectedBy:string;
}

export interface TimePeriodProps {

    timeString:string
}
