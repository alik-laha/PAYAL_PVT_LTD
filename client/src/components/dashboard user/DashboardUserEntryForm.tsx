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
import { Dept, Role } from "../common/exportData"
import { useState } from "react"
import axios from "axios"
import { EmployeeData } from "@/type/type"

const DashboardUserEntryForm = () => {

    const [dept, setDept] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([])
    const [employeeId, setEmployeeId] = useState<string>("")


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('button pressed')
    }

    const fetchemployeeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeId(e.target.value)
        axios.post('/api/employee/get/employeefor/user', { searchData: e.target.value })
            .then((res) => {
                console.log(res.data)
                setEmployeeData(res.data.Employees)
                console.log(employeeData)
            }
            )
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
                <div className="flex"><Label className="w-2/4">Employee Id</Label>
                    <Input className="w-2/4 " placeholder="Employee Id" value={employeeId} onChange={fetchemployeeId} /> </div>
                <div className="flex"><Label className="w-2/4">User Name</Label>
                    <Input className="w-2/4 " placeholder="User Name" /> </div>

                <div className="flex"><Label className="w-2/4">Password</Label>
                    <Input type="password" className="w-2/4 " placeholder="Password" /> </div>


                <div className="flex"><Label className="w-2/4 ">Confirm Password</Label>
                    <Input type="password" className="w-2/4" placeholder="Confirm Password" /> </div>
                <div className="flex"><Label className="w-2/4">Department</Label>
                    <Select value={dept} onValueChange={(value) => setDept(value)}>
                        <SelectTrigger className="w-2/4">
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
                <div className="flex"><Label className="w-2/4 ">Role</Label>
                    <Select value={role} onValueChange={(value) => setRole(value)}>
                        <SelectTrigger className="w-2/4 ">
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






                <Button className="bg-orange-500 mb-2 ml-20 mr-20 text-center items-center justify-center mt-8">Submit</Button>
            </form>




        </div>
    )


}
export default DashboardUserEntryForm