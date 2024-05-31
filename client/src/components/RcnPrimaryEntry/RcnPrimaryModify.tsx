import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Origin } from "../common/exportData"
import React, { useEffect } from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import axios from "axios"
interface RcnPrimaryModifyProps {
    data: {
        id: number;
        origin: string;
        blNo: string;
        conNo: string;
        truckNo: string;
        noOfBags: string;
        blWeight: string;
        netWeight: string;
    }
}


const RcnPrimaryModify = (props: RcnPrimaryModifyProps) => {

    const [origin, setOrigin] = useState<string>("")
    const [blNo, setBlNo] = useState<string>("")
    const [conNo, setConNo] = useState<string>("")
    const [truckNo, setTruckNo] = useState<string>("")
    const [noOfBags, setNoOfBags] = useState<string>("")
    const [blWeight, setBlWeight] = useState<string>("")
    const [netWeight, setNetWeight] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.put(`/api/rcnprimary/update/${props.data.id}`, { origin, blNo, conNo, truckNo, noOfBags, blWeight, netWeight })
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        setOrigin(props.data.origin)
        setBlNo(props.data.blNo)
        setConNo(props.data.conNo)
        setTruckNo(props.data.truckNo)
        setNoOfBags(props.data.noOfBags)
        setBlWeight(props.data.blWeight)
        setNetWeight(props.data.netWeight)
    }, [])


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                <div className="flex mt-8"><Label className="w-2/4 ">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
                        <SelectTrigger className="w-2/4 ">
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
                <div className="flex"><Label className="w-2/4 ">BL No.</Label>
                    <Input className="w-2/4 " placeholder="BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 " >Container No.</Label>
                    <Input className="w-2/4 " placeholder="Container No." value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 " > Truck No.</Label>
                    <Input className="w-2/4 " placeholder="Truck No." value={truckNo} onChange={(e) => setTruckNo(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 ">Total Bags</Label>
                    <Input className="w-2/4 " placeholder="Total Bags" type="number" value={noOfBags} onChange={(e) => setNoOfBags(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 "> BL Weight</Label>
                    <Input className="w-2/4 " placeholder="BL Weight" type="number" value={blWeight} onChange={(e) => setBlWeight(e.target.value)} />
                </div>
                <div className="flex"><Label className="w-2/4 "> Net Weight</Label>
                    <Input className="w-2/4 " placeholder="Net Weight" type="number" value={netWeight} onChange={(e) => setNetWeight(e.target.value)} />
                </div>
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>



        </div>
    )


}
export default RcnPrimaryModify