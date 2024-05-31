import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";

import React from "react"


const Employeecreateform = () => {
    const [date, setDate] = React.useState<Date | undefined>()
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('button pressed')
      
        
    }
   
      
return(
    <div className="pl-10 pr-10">
    <form className='flex flex-col gap-0.5 ' onSubmit={handleSubmit}>  

       <div className="flex">
        <Label className="w-2/4 pt-1">Name</Label>
       <Input  className="w-2/4 " placeholder="Name"/> </div>

       <div className="flex">
        <Label className="w-2/4  pt-1">Email </Label>
       <Input  className="w-2/4" placeholder="Email"/> </div>
     
       <div className="flex">
       <Label className="w-2/4 pt-1 ">Desg.</Label>
       <Input  className="w-2/4 " placeholder="Designation"/> 
       </div>

       <div className='flex'>
       <Label className="w-2/4 pt-1 ">Date Of Birth </Label>
      <DatePicker buttonName="D.O.B" value={date} setValue={setDate} />
        </div>

        <div className="flex">
       <Label className="w-2/4 pt-1 ">Contact No.</Label>
       <Input  className="w-2/4 " placeholder="Contact No."/></div>
    
       
        <div className="flex">
        <Label className="w-2/4 pt-1 ">Blood Group</Label>
       <Input  className="w-2/4" placeholder="Blood Group"/></div>
  
       <div className="flex">
       <Label className="w-2/4 pt-1 ">Highest Study </Label>
       <Input  className="w-2/4 " placeholder=" Quaification"/></div>

    
       <div className="flex">
       <Label className="w-2/4 pt-2 ">Contact No.(Alt)</Label>
       <Input  className="w-2/4 " placeholder="Alt No."/>
     
       </div>
      

       <div className="flex">
       <Label className="w-2/4 pt-1">Aadhar No.</Label>
       <Input  className="w-2/4 " placeholder=" Aadhar No."/></div>

       <div className="flex">
       <Label className="w-2/4 pt-1 ">Pan No.</Label>
       <Input  className="w-2/4 " placeholder="Pan No."/>  
       </div>
       

       <div className="flex">
       <Label className="w-2/4  pt-1 ">Emergency Contact Name </Label>
       <Input  className="w-2/4 " placeholder=" Contact Name "/></div>
       <div className="flex">
       <Label className="w-2/4 pt-1 ">Emergency Contact No. </Label>
       <Input  className="w-2/4" placeholder="Contact No. "/>  
       </div>
      

       <div className="flex">
       <Label className="w-2/4 pt-1 ">PF No.(Optional) </Label>
       <Input  className="w-2/4 " placeholder="PF No. "/> </div>

       <div className="flex"><Label className="w-2/4  pt-1 "> Pincode</Label>
       <Input  className="w-2/4" placeholder=" Pincode "/> </div>
       
       <div className="flex">
       <Label className="w-2/4 pt-1 ">Address </Label>
       <Input  className="w-2/4 " placeholder="Address "/>
       
        </div>
      
       
      
       
       
       <Button className="bg-orange-500 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
       </form> 




    </div>
)


}
export default Employeecreateform