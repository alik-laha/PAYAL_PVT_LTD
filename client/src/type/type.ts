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
}

export interface SumofAllCuntryData {
    origin: string;
    total: number;
}