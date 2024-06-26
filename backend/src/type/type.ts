export interface RcnPrimaryModifyProps {
    id: number;
    origin: string;
    blNo: string;
    conNo: string;
    truckNo: string;
    noOfBags: string;
    blWeight: string;
    netWeight: string;
    rcnStatus: string;
    editedBy: string;
    date: Date

}

export interface qcapproveprops {
    rcnStatus: string;
}

export interface qcRCNModifyProps {
    id: number;
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
    editStatus: string;
    editapprovedBy: string;
}

export interface UserData {
    id: number;
    userName: string;
    password: string;
    role: string;
    dept: string;
    createdBy: string;
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
    address: string;
    pincode: string;
}

export interface TokenVerify {
    employeeId: string;
    role: string;
    dept: string;
    exp: number;
}

export interface RcnGradingData {
    id: number;
    date: Date;
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
    F: string;
    G: string;
    dust: string;
    Mc_on: string;
    Mc_off: string;
    Mc_breakdown: string;
    noOfEmployees: string;
    grading_lotNo: string;
    Mc_name: string;
    origin: string;
    otherTime: string;
    feeledBy: string;
    Mc_runTime: string;
    modifiedBy: string;
}

export interface RcnBoilingData {
    id: number;
    LotNo: string;
    date: string;
    origin: string;
    SizeName: string;
    Size: string;
    Scooping_Line_Mc: string;
    Pressure: string;
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