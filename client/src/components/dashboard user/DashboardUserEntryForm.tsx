import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dept,Role } from "../common/exportData"
import { useState  } from "react"

const Employeecreateform = () => {

    const [dept, setDept] = useState<string>("")
    const [role, setRole] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('button pressed')
      
        
    }
   
      
return(
    <div >
     <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
     <div className="flex"><Label className="w-2/4 pl-16">User Name</Label>
                    <Input className="w-2/4 mr-10" placeholder="User Name" /> </div>
                <div className="flex"><Label className="w-2/4 pl-16">Password</Label>
                    <Input className="w-2/4 mr-10" placeholder="Password" /> </div>
                    <div className="flex mt-8"><Label className="w-2/4 pl-16">Origin</Label>
                    <Select value={dept} onValueChange={(value) => setDept(value)}>
                        <SelectTrigger className="w-2/4 mr-10">
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Dept.map((item) => {
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
                    <div className="flex mt-8"><Label className="w-2/4 pl-16">Role</Label>
                    <Select value={role} onValueChange={(value) => setRole(value)}>
                        <SelectTrigger className="w-2/4 mr-10">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Role.map((item) => {
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
              
      
       
      
       
       
       <Button className="bg-orange-500 mb-2  ml-40 mr-40 text-center items-center justify-center">Submit</Button>
       </form> 




    </div>
)


}
export default Employeecreateform