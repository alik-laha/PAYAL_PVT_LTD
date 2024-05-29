import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRef, useState } from "react"

const RcnPrimaryEntryForm = () => {
    const [origin, setOrigin] = useState<string>("")
    const blNoRef = useRef<HTMLInputElement>(null)
    const conNoRef = useRef<HTMLInputElement>(null)
    const truckNoRef = useRef<HTMLInputElement>(null)
    const blWeightRef = useRef<HTMLInputElement>(null)
    const netWeightRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const blNo = blNoRef.current?.value
        const conNo = conNoRef.current?.value
        const truckNo = truckNoRef.current?.value
        const blWeight = blWeightRef.current?.value
        const netWeight = netWeightRef.current?.value
        console.log({ origin, blNo, conNo, truckNo, blWeight, netWeight })
    }
    return (
        <div className='flex flex-col gap-4 '>
            <form onSubmit={handleSubmit}>
                <div className="flex mt-8"><Label className="w-2/4 pl-16">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
                        <SelectTrigger className="w-2/4 mr-10">
                            <SelectValue placeholder="Origin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">Country 1</SelectItem>
                                <SelectItem value="2">Country 2</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* <Input   placeholder="Origin"/>  */}</div>
                <div className="flex"><Label className="w-2/4 pl-16">BL No.</Label>
                    <Input className="w-2/4 mr-10" placeholder="BL No." ref={blNoRef} /> </div>
                <div className="flex"><Label className="w-2/4 pl-16">Container No.</Label>
                    <Input className="w-2/4 mr-10" placeholder="Container No." ref={conNoRef} /> </div>
                <div className="flex"><Label className="w-2/4 pl-16" > Truck No.</Label>
                    <Input className="w-2/4 mr-10" placeholder="Truck No." ref={truckNoRef} />
                </div>
                <div className="flex"><Label className="w-2/4 pl-16"> BL Weight</Label>
                    <Input className="w-2/4 mr-10" placeholder="BL Weight" ref={blWeightRef} />
                </div>
                <div className="flex"><Label className="w-2/4 pl-16"> Net Weight</Label>
                    <Input className="w-2/4 mr-10" placeholder="Net Weight" ref={netWeightRef} />
                </div>
                <Button className="bg-orange-500 mb-2 mt-5 ml-40 mr-40 text-center items-center justify-center" type="submit">Submit</Button>
            </form>
        </div>
    )


}
export default RcnPrimaryEntryForm