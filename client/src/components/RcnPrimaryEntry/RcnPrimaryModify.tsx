import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Origin } from "../common/exportData"
import React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"


const RcnPrimaryModify = () => {
    
    const [origin, setOrigin] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('button pressed')
      
        
    }
   
      
return(
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
                    <Input className="w-2/4 " placeholder="BL No."  /> </div>
                <div className="flex"><Label className="w-2/4 ">Container No.</Label>
                    <Input className="w-2/4 " placeholder="Container No." /> </div>
                <div className="flex"><Label className="w-2/4 " > Truck No.</Label>
                    <Input className="w-2/4 " placeholder="Truck No."  />
                </div>
                <div className="flex">
                    <Label className="w-2/4 ">Total Bags</Label>
                    <Input className="w-2/4 " placeholder="Total Bags"  type="number" />
                </div>
                <div className="flex">
                    <Label className="w-2/4 "> BL Weight</Label>
                    <Input className="w-2/4 " placeholder="BL Weight"  type="number" />
                </div>
                <div className="flex"><Label className="w-2/4 "> Net Weight</Label>
                    <Input className="w-2/4 " placeholder="Net Weight"  type="number" />
                </div>
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>



    </div>
)


}
export default RcnPrimaryModify