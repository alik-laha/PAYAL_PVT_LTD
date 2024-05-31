export interface RcnPrimaryModifyProps {
    id: number;
    origin: string;
    blNo: string;
    conNo: string;
    truckNo: string;
    noOfBags: string;
    blWeight: string;
    netWeight: string;
}

export interface UserData {
    id: number;
    userName: string;
    password: string;
    role: string;
    dept: string;
    createdBy: string;
}