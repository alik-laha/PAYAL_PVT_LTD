export interface DatePickerProps {
    buttonName: string;
    value: Date | undefined;
    setValue: (value: Date | undefined) => void;
}