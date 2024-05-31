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
import { useState, useRef } from "react"
import { Origin } from "../common/exportData"
import axios from "axios"


const RcnPrimaryEntryForm = () => {
    const [origin, setOrigin] = useState<string>("")
    const blNoRef = useRef<HTMLInputElement>(null)
    const conNoRef = useRef<HTMLInputElement>(null)
    const truckNoRef = useRef<HTMLInputElement>(null)
    const blWeightRef = useRef<HTMLInputElement>(null)
    const netWeightRef = useRef<HTMLInputElement>(null)
    const noOfBagsRef = useRef<HTMLInputElement>(null)
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const blNo = blNoRef.current?.value
        const conNo = conNoRef.current?.value
        const truckNo = truckNoRef.current?.value
        const blWeight = blWeightRef.current?.value
        const netWeight = netWeightRef.current?.value
        const noOfBags = noOfBagsRef.current?.value
        console.log({ origin, blNo, conNo, truckNo, blWeight, netWeight })
        axios.post('/api/rcnprimary/create', { origin, blNo, conNo, truckNo, blWeight, netWeight, noOfBags })
      
    }
    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                <div className="flex mt-8"><Label className="w-2/4  pt-1">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Origin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Origin.map((item) => {
                                        return (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* <Input   placeholder="Origin"/>  */}</div>
                <div className="flex"><Label className="w-2/4  pt-1">BL No.</Label>
                    <Input className="w-2/4 " placeholder="BL No." ref={blNoRef} /> </div>
                <div className="flex"><Label className="w-2/4 pt-1">Container No.</Label>
                    <Input className="w-2/4 " placeholder="Container No." ref={conNoRef} /> </div>
                <div className="flex"><Label className="w-2/4 pt-1" > Truck No.</Label>
                    <Input className="w-2/4 " placeholder="Truck No." ref={truckNoRef} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Total Bags</Label>
                    <Input className="w-2/4 " placeholder="Total Bags" ref={noOfBagsRef} type="number" />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1"> BL Weight</Label>
                    <Input className="w-2/4 " placeholder="BL Weight" ref={blWeightRef} type="number" />
                </div>
                <div className="flex"><Label className="w-2/4 pt-1"> Net Weight</Label>
                    <Input className="w-2/4 " placeholder="Net Weight" ref={netWeightRef} type="number" />
                </div>
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>
        </div>
    )


}
export default RcnPrimaryEntryForm