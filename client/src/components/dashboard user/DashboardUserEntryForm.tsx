import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Dept, roleDataonDept } from "../common/exportData";
import axios from "axios";
import { EmployeeData } from "@/type/type";
import { ScrollArea } from "@/components/ui/scroll-area";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png';
import cross from '../../assets/Static_Images/error_img.png';
import { debounce } from "lodash"
//import { hashPassword } from "@/Utils/hashPassword";

const DashboardUserEntryForm = () => {
    const [dept, setDept] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
    const [employeeId, setEmployeeId] = useState<string>("");
    const [scrollView, setScrollView] = useState<string>("none");
    const userNameRef = useRef<HTMLInputElement>(null);
    //const passwordRef = useRef<HTMLInputElement>(null);
    const [employeeName, setEmployeeName] = useState<string>("");
   // const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [errortext, setErrorText] = useState<string>("");
    const [pssword,SetPssword]=useState<string>('');
    const [confirmpassword,SetconfirmPassword]=useState<string>('');

    const successdialog = document.getElementById('userscs') as HTMLInputElement;
    const errordialog = document.getElementById('usererror') as HTMLInputElement;
    const closeDialogButton = document.getElementById('userscsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('usererrorbtn') as HTMLInputElement;
    const [isdisable,setisdisable]=useState<boolean>(false)

    useEffect(() => {
        if (closeDialogButton) {
            closeDialogButton.addEventListener('click', () => {
                if (successdialog != null) {
                    (successdialog as any).close();
                    window.location.reload()
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
    }, [closeDialogButton, successdialog, errorcloseDialogButton, errordialog]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const userName = userNameRef.current?.value;
       // const oldpassword = passwordRef.current?.value;
       // const oldconfirmPassword = confirmPasswordRef.current?.value;
        if (pssword !== confirmpassword  ) {
            setErrorText('Password and Confirm Password does not Match');
            (errordialog as any).showModal();
            return
        }
        if (!specialCharRegex.test(pssword)) {
            setErrorText('Password Should Contain One special Character');
            (errordialog as any).showModal();
            return
        }
        if (pssword.length < 6){
            setErrorText('Password Length should Be greater than 6 Characters');
            (errordialog as any).showModal();
            return

        }
        const password = pssword
        //const password = await hashPassword(pssword)
        //const confirmPassword =  hashPassword(confirmpassword);
        setisdisable(true)
        axios.post('/api/user/createuser', { userName, password, dept, role, employeeId, employeeName })
            .then((res) => {
                console.log(res.data);
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
                if (userNameRef.current != null) {
                    userNameRef.current.value = '';
                }
                // if (passwordRef.current != null) {
                //     passwordRef.current.value = '';
                // }
                // if (confirmPasswordRef.current != null) {
                //     confirmPasswordRef.current.value = '';
                // }
                setRole('');
                setDept('');
                SetPssword('')
                SetconfirmPassword('')
                setEmployeeId('');
                setEmployeeName('');
                setEmployeeData([]); // Clear the employeeData list
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setErrorText(err.response.data.message);
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            }).finally(()=>{
                setisdisable(false)
            })
           
    };

    const fetchEmployeeId = useCallback(
        debounce((value: string) => {
            axios.post('/api/employee/get/employeefor/user', { searchData: value })
                .then((res) => {
                    console.log(res.data);
                    setEmployeeData(res.data.Employees);
                    setScrollView("block");
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 300), // 300ms delay
        []
    );

    const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmployeeId(value);
        if (value) {
            fetchEmployeeId(value);
        } else {
            setEmployeeData([]);
            setScrollView("none");
        }
    };

    const handleEmployeeIdClick = (data: EmployeeData) => {
        setEmployeeId(data.employeeId);
        setEmployeeName(data.employeeName);
        setEmployeeData([]);
        setScrollView("none");
    };

    return (
        <>
            <div className="pl-10 pr-10">
                <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
                    <div className="flex">
                        <Label className="w-2/4 mt-1">Employee Id</Label>
                        <Input className="w-2/4" placeholder="Search" value={employeeId} onChange={handleEmployeeIdChange} />
                    </div>
                    <ScrollArea className="h-30 w-30 dropdown-content" style={{ display: scrollView }}>
                        {
                            employeeData.map((item) => (
                                <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleEmployeeIdClick(item)}>
                                    <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.employeeId}</p>
                                    <p className="text-sm py-1 focus:text-base">{item.employeeName}</p>
                                </div>
                            ))
                        }
                    </ScrollArea>
                    <div className="flex">
                        <Label className="w-2/4 mt-1">User Name</Label>
                        <Input className="w-2/4" placeholder="User Name" ref={userNameRef} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 mt-1">Password</Label>
                        <Input type="password" className="w-2/4" placeholder="Password" value={pssword} 
                        onChange={(e)=> SetPssword(e.target.value)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 mt-1">Confirm Password</Label>
                        <Input type="password" className="w-2/4" placeholder="Confirm Password" value={confirmpassword} 
                        onChange={(e)=> SetconfirmPassword(e.target.value)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 mt-1">Department</Label>
                        <Select value={dept} onValueChange={(value) => setDept(value)}>
                            <SelectTrigger className="w-2/4">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Dept.map((item) => (
                                        <SelectItem key={item} value={item}>{item}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 mt-1">Role</Label>
                        <Select value={role} onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="w-2/4">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {dept ? (
                                        roleDataonDept[dept as keyof typeof roleDataonDept].map((item) => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))
                                    ) : null}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="bg-orange-500 mb-2 ml-20 mr-20 text-center items-center justify-center mt-8" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                </form>
            </div>
            <dialog id="userscs" className="dashboard-modal">
                <button id="userscsbtn" className="dashboard-modal-close-btn">X</button>
                <span className="flex">
                    <img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">New User has Created Successfully</p>
                </span>
            </dialog>
            <dialog id="usererror" className="dashboard-modal">
                <button id="usererrorbtn" className="dashboard-modal-close-btn">X</button>
                <span className="flex">
                    <img src={cross} height={25} width={25} alt='cross_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                </span>
            </dialog>
        </>
    );
};

export default DashboardUserEntryForm;