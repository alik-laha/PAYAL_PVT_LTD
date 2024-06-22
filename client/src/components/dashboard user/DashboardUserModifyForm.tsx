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

import { useState } from "react"
import { UserProps } from "@/type/type"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Dept, roleDataonDept } from "../common/exportData"

const DashboardUserModifyForm = (props: UserProps) => {

    const [dept, setDept] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [errortext, setErrorText] = React.useState<string>("")
    const [AvailableRoles, setAvailableRoles] = useState<string[]>([])

    const successdialog = document.getElementById('modifysuccessuserdialog') as HTMLInputElement;
    const errordialog = document.getElementById('modifyerroruserdialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('modifyusrcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('modifyerrorusrcloseDialog') as HTMLInputElement;

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
                window.location.reload();
            }


        });
    }
    if (errorcloseDialogButton) {
        errorcloseDialogButton.addEventListener('click', () => {
            if (errordialog != null) {
                (errordialog as any).close();
            }

        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.put('/api/user/updateuser', { userName, password, role, dept, employeeId: props.Data.employeeId, confirmPassword })
            .then((res) => {
                console.log(res.data)
                setErrorText(res.data.message)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
            })
            .catch((err) => {
                console.log(err)
                setErrorText(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            })
    }
    console.log(props.Data)
    useEffect(() => {
        setDept(props.Data.dept)
        setRole(props.Data.role)
        setUserName(props.Data.userName)
    }, [props.Data])

    useEffect(() => {
        if (dept) {
            roleDataonDept[dept as keyof typeof roleDataonDept].find((item) => {
                if (item === props.Data.role) {
                    setRole(item)
                    return
                }
                else {
                    setRole(roleDataonDept[(!dept ? props.Data.dept : dept) as keyof typeof roleDataonDept][0])
                }
            })
        }

    }, [dept, props.Data.role, props.Data.dept])


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
                <div className="flex"><Label className="w-2/4 mt-1">Role</Label>
                    <Select value={role} onValueChange={(value) => setRole(value)}>
                        <SelectTrigger className="w-2/4 ">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {props.Data.dept && (roleDataonDept[(!dept ? props.Data.dept : dept) as keyof typeof roleDataonDept].map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                )))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* <Input   placeholder="Origin"/>  */}</div>






                <Button className="bg-orange-500 mb-2 mt-8 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>
            <dialog id="modifysuccessuserdialog" className="dashboard-modal">
                <button id="modifyusrcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="modifyerroruserdialog" className="dashboard-modal">
                <button id="modifyerrorusrcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>





        </div>
    )


}
export default DashboardUserModifyForm