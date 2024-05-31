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
    date:string;
    noOfBags:string;
    truckNo:string;
    blWeight:string;
    netWeight:string;
    difference:string;
    editStatus:string;
}

export interface SumofAllCuntryData {
    origin: string;
    totalBags: number;
}