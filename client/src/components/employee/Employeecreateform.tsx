import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";
import { Textarea } from "@/components/ui/textarea"
import React from "react"


const Employeecreateform = () => {
    const [date, setDate] = React.useState<Date | undefined>()
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('button pressed')
      
        
    }
   
      
return(
    <div >
    <form className='flex flex-col gap-3 text-center ' onSubmit={handleSubmit}>  
       <div className="flex">
        <Label className="w-1/4 pt-2">Name</Label>
       <Input  className="w-3/4 " placeholder="Name"/>

       <Label className="w-1/4 pt-2 ">Desg.</Label>
       <Input  className="w-3/4 " placeholder="Designation"/> 
        </div>

       <div className="flex">
        <Label className="w-1/4  pt-2">Email </Label>
       <Input  className="w-3/4" placeholder="Email"/>
       <Label className="w-1/4 pt-2 ">Date Of Birth </Label>
      <DatePicker  buttonName="D.O.B" value={date} setValue={setDate} />
       
        </div>

       <div className="flex">
       <Label className="w-1/4 pt-2 ">Contact No.</Label>
       <Input  className="w-3/4 " placeholder="Contact No."/>
       <Label className="w-1/4 pt-2 ">Blood Group</Label>
       <Input  className="w-3/4" placeholder="Blood Group"/>
       
        </div>

       <div className="flex">
       <Label className="w-1/4 pt-2 ">Contact No.(Alt)</Label>
       <Input  className="w-3/4 " placeholder="Alt No."/>
       <Label className="w-1/4 pt-2 ">Highest Study </Label>
       <Input  className="w-3/4 " placeholder=" Quaification"/>
       </div>
      

       <div className="flex">
       <Label className="w-1/4 pt-2">Aadhar No.</Label>
       <Input  className="w-3/4 " placeholder=" Aadhar No."/>
       <Label className="w-1/4 pt-2 ">Pan No.</Label>
       <Input  className="w-3/4 " placeholder="Pan No."/>  </div>

       <div className="flex">
       <Label className="w-1/4  pt-2 ">Emergency Contact Name </Label>
       <Input  className="w-3/4 " placeholder=" Contact Name "/>
       <Label className="w-1/4 pt-2 ">Emergency Contact No. </Label>
       <Input  className="w-3/4" placeholder="Contact No. "/>  </div>

       <div className="flex">
       <Label className="w-1/4 pt-2 ">PF No.(Optional) </Label>
       <Input  className="w-3/4 " placeholder="PF No. "/>
       
       <Label className="w-1/4  pt-2 "> Pincode</Label>
       <Input  className="w-3/4" placeholder=" Pincode "/>  </div>
       <div className="flex">
       <Label className="w-1/4 pt-2 ">Address </Label>
       <Textarea  className="w-2/4 " placeholder="Address "/>
       
        </div>
      
       
      
       
       
       <Button className="bg-orange-500 mb-2 w-1/6 text-center items-center justify-center float-right">Submit</Button>
       </form> 




    </div>
)


}
export default Employeecreateform