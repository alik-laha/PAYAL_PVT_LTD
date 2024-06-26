import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { DatePickerProps } from "@/type/type"

const DatePicker = (props: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal w-100 mr-2 h-7",
                        !props.value && "text-muted-foreground"
                        
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-8" />
                    {props.value ? format(props.value, "PPP") : <span>{props.buttonName}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={props.value}
                    onSelect={props.setValue}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
export default DatePicker;