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
import { useState } from "react"
import { Origin } from "../common/exportData"
import axios from "axios"

const RcnPrimaryEntryForm = () => {
    const [origin, setOrigin] = useState<string>("")
    const [blNo, setBlNo] = useState<string>("")
    const [conNo, setConNo] = useState<string>("")
    const [truckNo, setTruckNo] = useState<string>("")
    const [blWeight, setBlWeight] = useState<number | undefined>()
    const [noOfBags, setNoOfBags] = useState<number | undefined>()
    const [netWeight, setNetWeight] = useState<number | undefined>()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ origin, blNo, conNo, truckNo, blWeight, netWeight })
        axios.post('/api/rcnprimary/create', { origin, blNo, conNo, truckNo, blWeight, netWeight, noOfBags })
    }
    return (
        <div >
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                <div className="flex mt-8"><Label className="w-2/4 pl-16">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
                        <SelectTrigger className="w-2/4 mr-10">
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
                <div className="flex"><Label className="w-2/4 pl-16">BL No.</Label>
                    <Input className="w-2/4 mr-10" placeholder="BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 pl-16">Container No.</Label>
                    <Input className="w-2/4 mr-10" placeholder="Container No." value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 pl-16" > Truck No.</Label>
                    <Input className="w-2/4 mr-10" placeholder="Truck No." value={truckNo} onChange={(e) => setTruckNo(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pl-16">Total Bags</Label>
                    <Input className="w-2/4 mr-10" placeholder="Total Bags" value={noOfBags} onChange={(e) => setNoOfBags(Number(e.target.value))} type="number" />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pl-16"> BL Weight</Label>
                    <Input className="w-2/4 mr-10" placeholder="BL Weight" value={blWeight} onChange={(e) => setBlWeight(Number(e.target.value))} type="number" />
                </div>
                <div className="flex"><Label className="w-2/4 pl-16"> Net Weight</Label>
                    <Input className="w-2/4 mr-10" placeholder="Net Weight" value={netWeight} onChange={(e) => setNetWeight(Number(e.target.value))} type="number" />
                </div>
                <Button className="bg-orange-500 mb-2 mt-5 ml-40 mr-40 text-center items-center justify-center">Submit</Button>
            </form>
        </div>
    )


}
export default RcnPrimaryEntryForm