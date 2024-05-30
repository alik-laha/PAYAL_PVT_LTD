import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";
import { Textarea } from "@/components/ui/textarea"
import React from "react"


const EmployeeModifyForm = () => {
    const [date, setDate] = React.useState<Date | undefined>()
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('button pressed')
      
        
    }
   
      
return(
    <div >
    <form className='flex flex-col gap-4 text-center' onSubmit={handleSubmit}>  
       <div className="flex"><Label className="w-1/4 pl-5 pt-2 mr-2 ">Name</Label>
       <Input  className="w-3/4 mr-2" placeholder="Name"/><Label className="w-1/4 pl-2 pt-2 mr-2">Desg.</Label>
       <Input  className="w-3/4 mr-2" placeholder="Designation"/>  </div>

       <div className="flex"><Label className="w-1/4 pl-5 pt-2 mr-2">Email </Label>
       <Input  className="w-3/4 mr-2" placeholder="Email"/>
       <Label className="w-1/4 pl-3 pt-2 mr-2">Date Of Birth </Label>
      <DatePicker  buttonName="D.O.B" value={date} setValue={setDate} />
       
        </div>

       <div className="flex">
       <Label className="w-1/4 pl-2 pt-2 mr-2">Contact No.</Label>
       <Input  className="w-3/4 mr-2" placeholder="Contact No."/>
       <Label className="w-1/4 pl-2 pt-2 mr-2">Blood Gp.</Label>
       <Input  className="w-3/4 mr-2" placeholder="Blood Group"/>
       
        </div>

       <div className="flex">
       <Label className="w-1/4 pl-5 pt-2 mr-2">Contact No.(Alt)</Label>
       <Input  className="w-3/4 mr-2" placeholder="Alt No."/>
       <Label className="w-1/4 pl-2 pt-2 mr-2">Highest Study </Label>
       <Input  className="w-3/4 mr-2" placeholder=" Quaification"/>
       </div>
      

       <div className="flex">
       <Label className="w-1/4 pl-2 pt-2 mr-2">Aadhar No.</Label>
       <Input  className="w-3/4 mr-2" placeholder=" Aadhar No."/>
       <Label className="w-1/4 pl-3 pt-2 mr-2">Pan No.</Label>
       <Input  className="w-3/4 mr-2" placeholder="Pan No."/>  </div>

       <div className="flex">
       <Label className="w-1/4 pl-2 pt-2 mr-2">Emergency Contact Name </Label>
       <Input  className="w-3/4 mr-2" placeholder=" Contact Name "/>
       <Label className="w-1/4 pl-3 pt-2 mr-2">Emergency Contact No. </Label>
       <Input  className="w-3/4 mr-2" placeholder="Contact No. "/>  </div>

       <div className="flex">
       <Label className="w-1/4 pl-3 pt-2 mr-2">PF No.(Optional) </Label>
       <Input  className="w-3/4 mr-2" placeholder="PF No. "/>
       
       <Label className="w-1/4 pl-2 pt-2 mr-2"> Pincode</Label>
       <Input  className="w-3/4 mr-2" placeholder=" Pincode "/>  </div>
       <div className="flex">
       <Label className="w-1/4 pl-3 pt-2 mr-2">Address </Label>
       <Textarea  className="w-3/4 mr-2" placeholder="Address "/>
       
        </div>
      
       
      
       
       
       <Button className="bg-orange-500 mb-2  ml-40 mr-40 text-center items-center justify-center">Submit</Button>
       </form> 




    </div>
)


}
export default EmployeeModifyForm