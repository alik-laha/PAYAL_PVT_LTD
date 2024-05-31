import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";
import { useRef } from "react"
import React from "react"
import axios from "axios"


const Employeecreateform = () => {
    const [date, setDate] = React.useState<Date | undefined>()


    const nameref = useRef<HTMLInputElement>(null)
    const emailref = useRef<HTMLInputElement>(null)
    const desgref = useRef<HTMLInputElement>(null)
    const dobref = useRef<HTMLInputElement>(null)
    const contactNoref = useRef<HTMLInputElement>(null)
    const bloodgpref = useRef<HTMLInputElement>(null)
    const studyref = useRef<HTMLInputElement>(null)
    const altcontactref = useRef<HTMLInputElement>(null)
    const adharref = useRef<HTMLInputElement>(null)
    const panref = useRef<HTMLInputElement>(null)
    const emgNameref = useRef<HTMLInputElement>(null)
    const emgContactref = useRef<HTMLInputElement>(null)
    const pfref = useRef<HTMLInputElement>(null)
    const pincoderef = useRef<HTMLInputElement>(null)
    const addressref = useRef<HTMLInputElement>(null)
    
    

  
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            const name = nameref.current?.value
            const email = emailref.current?.value
            const desg = desgref.current?.value
            const dob = dobref.current?.value
            const contactNo = contactNoref.current?.value
            const bloodgp = bloodgpref.current?.value

            const study = studyref.current?.value
            const altcontact = altcontactref.current?.value
            const adhar = adharref.current?.value
            const pan = panref.current?.value
            const emgName = emgNameref.current?.value
            const emgContact = emgContactref.current?.value

            const pf = pfref.current?.value
            const pincode = pincoderef.current?.value
            const address = addressref.current?.value

            console.log({ name, email, desg, dob, contactNo, bloodgp,study,altcontact,adhar,pan ,emgName,emgContact,pf,pincode,
                address
            })
            axios.post('/api/rcnprimary/create', {name, email, desg, dob, contactNo, bloodgp,study,altcontact,adhar,pan ,emgName,emgContact,pf,pincode,
                address })
          
        
        
      
        
    }
   
      
return(
    <div className="pl-10 pr-10 ">
    <form className='flex flex-col gap-0.5 text-xs' onSubmit={handleSubmit}>  

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
      <span className="w-/3"><DatePicker buttonName="D.O.B" value={date} setValue={setDate} /></span>
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
      
       
      
       
       
       <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
       </form> 




    </div>
)


}
export default Employeecreateform