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
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

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

    const successdialog = document.getElementById('userscs') as HTMLInputElement;
    const errordialog = document.getElementById('usererror') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('userscsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('usererrorbtn') as HTMLInputElement;
    const [errortext, setErrorText] = useState<string>("")

    if(closeDialogButton){
        closeDialogButton.addEventListener('click', () => {
            if(successdialog!=null){
                (successdialog as any).close();
                window.location.reload()
            }
            
            
          });
    }
    if(errorcloseDialogButton){
        errorcloseDialogButton.addEventListener('click', () => {
            if(errordialog!=null){
                (errordialog as any).close();
               
            }
            
          });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const userName = userNameRef.current?.value
        const password = passwordRef.current?.value
        const confirmPassword = confirmPasswordRef.current?.value
        axios.post('/api/user/createuser', { userName, password, dept, role, employeeId, confirmPassword, employeeName })
            .then((res) => {
                console.log(res.data)
                if(successdialog!=null){
                    (successdialog as any).showModal();
                }
                if(userNameRef.current!=null){
                    userNameRef.current.value='';
                }
                if(passwordRef.current!=null){
                    passwordRef.current.value='';
                }
                if(confirmPasswordRef.current!=null){
                    confirmPasswordRef.current.value='';
                }
                setRole('')
                setDept('')
                setEmployeeName('')
                setEmployeeData([])
            })
            .catch((err) => {
                console.log(err.response.data.message)
                // if(err.response.data.error.original.errno===1062)
                //     {
                //         setErrorText('Duplicate Entry is Not Allowed')
                //         if(errordialog!=null){
                //             (errordialog as any).showModal();
                //         }
                //         return
                //     }
                setErrorText(err.response.data.message)
                if(errordialog!=null){
                    (errordialog as any).showModal();
                }
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
        <>
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
                <div className="flex"><Label className="w-2/4 mt-1">Employee Id</Label>
                    <Input className="w-2/4 " placeholder="Search " value={employeeId} onChange={fetchemployeeId} /> </div>
                <ScrollArea className="h-30 w-30 dropdown-content " style={{ display: scrollView }}>
                    {
                        employeeData.map((item) => {
                            return (
                                <div key={item.id} className="flex gap-x-5 hover:bg-gray-300 " onClick={() => handleEmployeeIdClick(item)}>
                                    <p className="font-medium text-sm text-blue-900">{item.employeeId}</p>
                                    <p className="text-sm">{item.employeeName}</p>
                                </div>
                            )
                        })
                    }
                </ScrollArea>
                <div className="flex"><Label className="w-2/4 mt-1">User Name</Label>
                    <Input className="w-2/4 " placeholder="User Name" ref={userNameRef} /> </div>

                <div className="flex"><Label className="w-2/4 mt-1">Password</Label>
                    <Input type="password" className="w-2/4 " placeholder="Password" ref={passwordRef} /> </div>


                <div className="flex"><Label className="w-2/4 mt-1">Confirm Password</Label>
                    <Input type="password" className="w-2/4" placeholder="Confirm Password" ref={confirmPasswordRef} /> </div>
                <div className="flex"><Label className="w-2/4 mt-1">Department</Label>
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
              <dialog id="userscs" className="dashboard-modal">
              <button id="userscsbtn" className="dashboard-modal-close-btn ">X </button>
              <span className="flex"><img src={tick} height={2} width={35} alt='tick_image'/>
              <p id="modal-text" className="pl-3 mt-1 font-medium">New User has Created Successfully</p></span>
              
              {/* <!-- Add more elements as needed --> */}
          </dialog>
      
          <dialog id="usererror" className="dashboard-modal">
              <button id="usererrorbtn" className="dashboard-modal-close-btn ">X </button>
              <span className="flex"><img src={cross} height={25} width={25} alt='error_image'/>
              <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
              
              {/* <!-- Add more elements as needed --> */}
          </dialog>
          </>
    )


}
export default DashboardUserEntryForm