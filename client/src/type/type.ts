export interface DatePickerProps {
    buttonName: string;
    value: Date | undefined;
    setValue: (value: Date | undefined) => void;
}

export interface RcnPrimaryEntryData {
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
    releaseDate: string;
    status: string;
    address: string;
    emergencyContact: string;
    emergencyMobNo: string;
    pfNo: string;
    pincode: string;
}