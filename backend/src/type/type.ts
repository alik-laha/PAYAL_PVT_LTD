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