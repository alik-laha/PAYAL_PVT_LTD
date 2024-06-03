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
import { Dept, Role } from "../common/exportData"
import { useState } from "react"
import { UserProps } from "@/type/type"

const DashboardUserModifyForm = (props: UserProps) => {

    const [dept, setDept] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('button pressed')


    }
    useEffect(() => {
        setDept(props.Data.dept)
        setRole(props.Data.role)
        setUserName(props.Data.userName)
    }, [])


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 mt-5 ' onSubmit={handleSubmit}>
                <div className="flex"><Label className="w-2/4 ">User Name</Label>
                    <Input className="w-2/4 " placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 "  >Password</Label>
                    <Input type="password" className="w-2/4 " placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 ">Confirm Password</Label>
                    <Input type="password" className="w-2/4 " placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 ">Department</Label>
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






                <Button className="bg-orange-500 mb-2 mt-8 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>





        </div>
    )


}
export default DashboardUserModifyForm