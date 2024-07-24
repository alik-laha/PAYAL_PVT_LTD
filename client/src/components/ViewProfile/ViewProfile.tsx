import axios from 'axios';
import "./ViewProfile.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmployeeData, User } from "../../type/type"
import { IoMdCamera } from "react-icons/io";
import { Input } from '../ui/input';
import DashboardHeader from '../dashboard/DashboardHeader';

import DashboardSidebar from '../dashboard/DashboardSidebar';

const ViewProfile = () => {
    const [EmployeeDetail, setEmployeeDetail] = useState<EmployeeData>()
    const [UserDetail, setUserDetail] = useState<User>()
    const [EmployeeEditMode, setEmployeeEditMode] = useState(false)
    const [employeeName, setEmployeeName] = useState("")
    const [email, setEmail] = useState("")
    const [mobNo, setMobNo] = useState("")
    const [emergencyMobNo, setEmergencyMobNo] = useState("")
    const [address, setAddress] = useState("")
    const [employeeImage, setEmployeeImage] = useState<any>()
    const [pinCode, setPinCode] = useState<string>("")

    useEffect(() => {
        axios.get("/api/user/profile").then((res) => {
            setEmployeeDetail(res.data.EmployeeDetail)
            setUserDetail(res.data.UserDetail)
        }
        ).catch((err) => {
            console.log(err)
        })
    }, [])
    useEffect(() => {
        setEmployeeName(EmployeeDetail?.employeeName || "")
        setEmail(EmployeeDetail?.email || "")
        setMobNo(EmployeeDetail?.mobNo || "")
        setEmergencyMobNo(EmployeeDetail?.emergencyMobNo || "")
        setAddress(EmployeeDetail?.address || "")
        setPinCode(EmployeeDetail?.pincode || "")
    }, [EmployeeDetail, UserDetail])
    const handleemployeeEdit = () => {
        setEmployeeEditMode(true)
    }
    const HandleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("employeeName", employeeName)
        formData.append("email", email)
        formData.append("mobNo", mobNo)
        formData.append("emergencyMobNo", emergencyMobNo)
        formData.append("address", address)
        if (employeeImage) {
            formData.append("employeeImage", employeeImage[0])
        }
        console.log(employeeImage)
        axios.post("/api/employee/profileEmployeeEdit", formData).then((res) => {
            if (res.data.image) {
                localStorage.setItem("image", res.data.image)
            }
        }
        ).catch((err) => {
            console.log(err)
        })
        console.log("submit")

    }
    const handleCleanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setEmployeeImage(e.target.files);
        }
    }


    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="new_body">


                    <div className="container">
                        <div className="main-body">
                            {/* <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to={"/dashboard"}>Home</NavLink></li>

                        </ol>
                    </nav> */}


                            <div className="row gutters-sm">
                                <form onSubmit={HandleSubmit}>
                                    <div className="col-md-4 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <div className='flex items-center justify-center flex-col'>{localStorage.getItem("image") == null ? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-full" width="150" /> : <img src={`/api/cleaning/view?filename=${localStorage.getItem('image')}`} alt="Admin" className="rounded-full" width="160" />}{EmployeeEditMode ? <div className='text-right'><label htmlFor='fileInput'><IoMdCamera className='w-8 h-6' /></label></div> : null}</div>
                                                    <input type="file" className="hidden" id='fileInput' multiple onChange={handleCleanFileChange} />
                                                    <div className="mt-3">
                                                        <h4>{localStorage.getItem("user")}  </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <h1 className='text-center font-bold pb-2'>Employee Details</h1>
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-12 text-right ">
                                                        {EmployeeEditMode ? <button className='bg-teal-500 w-24 h-7 rounded-3xl' onClick={() => setEmployeeEditMode(false)}>cancel</button> : null}
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-2 font-semibold">Employee ID</h6>
                                                    </div>
                                                    <div className="col-sm-9 ">
                                                        {EmployeeDetail?.employeeId}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-2 font-semibold">Full Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 ">
                                                        {EmployeeEditMode ? <Input value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} readOnly /> : EmployeeDetail?.employeeName}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-2 font-semibold">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 ">
                                                        {EmployeeEditMode ? <Input value={email} onChange={(e) => setEmail(e.target.value)} /> : EmployeeDetail?.email}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Employee Phone No</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeEditMode ? <Input value={mobNo} onChange={(e) => setMobNo(e.target.value)} /> : EmployeeDetail?.mobNo}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-2 font-semibold">Emergency Number</h6>
                                                    </div>
                                                    <div className="col-sm-9 ">
                                                        {EmployeeEditMode ? <Input value={emergencyMobNo} onChange={(e) => setEmergencyMobNo(e.target.value)} /> : EmployeeDetail?.emergencyMobNo}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Address</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeEditMode ? <Input value={address} onChange={(e) => setAddress(e.target.value)} /> : EmployeeDetail?.address}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">pin No</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeEditMode ? <Input value={pinCode} onChange={(e) => setPinCode(e.target.value)} /> : EmployeeDetail?.pincode}
                                                    </div>
                                                </div>
                                                {
                                                    EmployeeEditMode ? <div className="row">
                                                        <div className="col-sm-12 text-center ">
                                                            <button className='bg-teal-500 w-24 h-7 rounded-3xl' type='submit'>Save</button>
                                                        </div>
                                                    </div> : null
                                                }
                                                <div className="row">
                                                    <div className="col-sm-12 text-center ">
                                                        {EmployeeEditMode ? null : <button className='bg-teal-500 w-24 h-7 rounded-3xl' onClick={handleemployeeEdit}>Edit</button>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="col-md-8">
                                    <h1 className='text-center'>User Profile</h1>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-2">User Name</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                    {UserDetail?.userName}
                                                </div>
                                            </div>
                                            <hr />
                                            <br />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-2">user Dept</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                    {UserDetail?.dept}
                                                </div>
                                            </div>
                                            <hr />
                                            <br />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-2">User Role</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                    {UserDetail?.role}
                                                </div>
                                            </div>
                                            <hr />
                                            <br />
                                        </div>
                                    </div>

                                </div>



                            </div>
                        </div>
                    </div>


                </div >
            </div>
        </div>

    )
}
export default ViewProfile;