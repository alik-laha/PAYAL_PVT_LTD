import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import React, { useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dept, roleDataonDept } from "../common/exportData"
import { useState, useRef } from "react"
import axios from "axios"
import { EmployeeData } from "@/type/type"
import { ScrollArea } from "@/components/ui/scroll-area"

const DashboardUserEntryForm = () => {

    const [dept, setDept] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([])
    const [employeeId, setEmployeeId] = useState<string>("")
    const [scrollView, setScrollView] = useState<string>("none")
    const userNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [employeeName, setEmployeeName] = useState<string>("")
    const confirmPasswordRef = useRef<HTMLInputElement>(null)



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const userName = userNameRef.current?.value
        const password = passwordRef.current?.value
        const confirmPassword = confirmPasswordRef.current?.value
        axios.post('/api/user/createuser', { userName, password, dept, role, employeeId, confirmPassword, employeeName })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
    }

    const fetchemployeeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeId(e.target.value)
        axios.post('/api/employee/get/employeefor/user', { searchData: e.target.value })
            .then((res) => {
                console.log(res.data)
                setEmployeeData(res.data.Employees)
                setScrollView("block")
                console.log(employeeData)
            }
            )
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (employeeId === '') {
            setEmployeeData([])
            setScrollView("none")
        }
        if (employeeData.length < 0) {
            setScrollView("none")
        }
    }, [employeeId, employeeData])
    const handleEmployeeIdClick = (data: EmployeeData) => {
        setEmployeeId(data.employeeId)
        setEmployeeName(data.employeeName)
        setEmployeeData([])
        setScrollView("none")

    }


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
                <div className="flex"><Label className="w-2/4">Employee Id</Label>
                    <Input className="w-2/4 " placeholder="Employee Id" value={employeeId} onChange={fetchemployeeId} /> </div>
                <ScrollArea className="h-30 w-30" style={{ display: scrollView }}>
                    {
                        employeeData.map((item) => {
                            return (
                                <div key={item.id} className="flex gap-x-2" onClick={() => handleEmployeeIdClick(item)}>
                                    <p >{item.employeeId}</p>
                                    <p>{item.employeeName}</p>
                                </div>
                            )
                        })
                    }
                </ScrollArea>
                <div className="flex"><Label className="w-2/4">User Name</Label>
                    <Input className="w-2/4 " placeholder="User Name" ref={userNameRef} /> </div>

                <div className="flex"><Label className="w-2/4">Password</Label>
                    <Input type="password" className="w-2/4 " placeholder="Password" ref={passwordRef} /> </div>


                <div className="flex"><Label className="w-2/4 ">Confirm Password</Label>
                    <Input type="password" className="w-2/4" placeholder="Confirm Password" ref={confirmPasswordRef} /> </div>
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
                                {dept ? (roleDataonDept[dept as keyof typeof roleDataonDept].map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))) : (null)}
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