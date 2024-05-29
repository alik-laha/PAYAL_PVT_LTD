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

const RcnPrimaryEntryForm = () => {
return(
    <div className='flex flex-col gap-4 '>
        <div className="flex mt-8"><Label className="w-2/4 pl-16">Origin</Label>
        <Select >
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
       <Input  className="w-2/4 mr-10" placeholder="BL No."/> </div>
       <div className="flex"><Label className="w-2/4 pl-16">Container No.</Label>
       <Input  className="w-2/4 mr-10" placeholder="Container No."/> </div>
       <div className="flex"><Label className="w-2/4 pl-16"> Truck No.</Label>
       <Input  className="w-2/4 mr-10" placeholder="Truck No."/> 
       </div>
       <div className="flex"><Label className="w-2/4 pl-16"> BL Weight</Label>
       <Input  className="w-2/4 mr-10" placeholder="BL Weight"/> 
       </div>
       <div className="flex"><Label className="w-2/4 pl-16"> Net Weight</Label>
       <Input  className="w-2/4 mr-10" placeholder="Net Weight"/> 
       </div>
       <div className="flex"><Label className="w-2/4 pl-16"> Difference</Label>
       <Input  className="w-2/4 mr-10" placeholder="Difference"/> 
       </div>
       
       <Button className="bg-orange-500 mb-2 mt-5 ml-40 mr-40 text-center items-center justify-center">Submit</Button>
    </div>
)


}
export default RcnPrimaryEntryForm