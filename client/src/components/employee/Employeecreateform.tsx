import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";
import React from "react"


const Employeecreateform = () => {
    const [date, setDate] = React.useState<Date | undefined>()
return(
    <div className='flex flex-col gap-4 '>
       
       <div className="flex"><Label className="w-1/4 pl-5 pt-2 mr-2">Name</Label>
       <Input  className="w-3/4 mr-2" placeholder="Name"/><Label className="w-1/4 pl-2 pt-2 mr-2">Desg.</Label>
       <Input  className="w-3/4 mr-2" placeholder="Designation"/>  </div>

       <div className="flex"><Label className="w-1/4 pl-5 pt-2 mr-2">Email </Label>
       <Input  className="w-3/4 mr-2" placeholder="Email"/>
       <Label className="w-1/4 pl-3 pt-2 mr-2">Date Of Birth </Label>
      <DatePicker  buttonName="D.O.B" value={date} setValue={setDate} />
       
        </div>

       <div className="flex">
       <Label className="w-1/4 pl-2 pt-2 mr-2">Contact</Label>
       <Input  className="w-3/4 mr-2" placeholder="Contact No."/>
       <Label className="w-1/4 pl-2 pt-2 mr-2">Blood Gp.</Label>
       <Input  className="w-3/4 mr-2" placeholder="Blood Group"/>
       
        </div>

       <div className="flex">
       <Label className="w-1/4 pl-5 pt-2 mr-2"> Alt. No.</Label>
       <Input  className="w-3/4 mr-2" placeholder=" Alt No."/>
        <Label className="w-1/4 pl-2 pt-2 mr-2"> Aadhar </Label>
       <Input  className="w-3/4 mr-2" placeholder=" Aadhar No."/></div>

       <div className="flex">
       <Label className="w-1/4 pl-2 pt-2 mr-2">Pan</Label>
       <Input  className="w-3/4 mr-2" placeholder="Pan No."/>  </div>
       
      
       
       
       <Button className="bg-orange-500 mb-2 mt-5 ml-40 mr-40 text-center items-center justify-center">Submit</Button>
    </div>
)


}
export default Employeecreateform