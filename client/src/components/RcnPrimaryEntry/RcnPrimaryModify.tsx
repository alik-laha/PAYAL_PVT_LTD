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
                    <Input className="w-2/4 mr-10" placeholder="BL No."  /> </div>
                <div className="flex"><Label className="w-2/4 pl-16">Container No.</Label>
                    <Input className="w-2/4 mr-10" placeholder="Container No." /> </div>
                <div className="flex"><Label className="w-2/4 pl-16" > Truck No.</Label>
                    <Input className="w-2/4 mr-10" placeholder="Truck No."  />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pl-16">Total Bags</Label>
                    <Input className="w-2/4 mr-10" placeholder="Total Bags"  type="number" />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pl-16"> BL Weight</Label>
                    <Input className="w-2/4 mr-10" placeholder="BL Weight"  type="number" />
                </div>
                <div className="flex"><Label className="w-2/4 pl-16"> Net Weight</Label>
                    <Input className="w-2/4 mr-10" placeholder="Net Weight"  type="number" />
                </div>
                <Button className="bg-orange-500 mb-2 mt-5 ml-40 mr-40 text-center items-center justify-center">Submit</Button>
            </form>



    </div>
)


}
export default RcnPrimaryModify