import axios from 'axios';
import "./ViewProfile.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmployeeData, User } from "../../type/type"

const ViewProfile = () => {
    const [EmployeeDetail, setEmployeeDetail] = useState<EmployeeData>()
    const [UserDetail, setUserDetail] = useState<User>()

    useEffect(() => {
        axios.get("/api/user/profile").then((res) => {
            setEmployeeDetail(res.data.EmployeeDetail)
            setUserDetail(res.data.UserDetail)
        }
        ).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="new_body">
            <div className="container">
                <div className="main-body">
                    <nav aria-label="breadcrumb" className="main-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to={"/dashboard"}>Home</NavLink></li>

                        </ol>
                    </nav>


                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <div className='flex items-center justify-center'>{localStorage.getItem("image") == null ? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-full" width="150" /> : <img src={`/api/cleaning/view?filename=${localStorage.getItem('image')}`} alt="Admin" className="rounded-full" width="160" />}</div>
                                        <div className="mt-3">
                                            <h4>{localStorage.getItem("user")}  </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h1 className='text-center'>Employee Detail</h1>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-2">Employee Id</h6>
                                        </div>
                                        <div className="col-sm-9 ">
                                            {EmployeeDetail?.employeeId}
                                        </div>
                                    </div>
                                    <hr />
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-2">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 ">
                                            {EmployeeDetail?.employeeName}
                                        </div>
                                    </div>
                                    <hr />
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-2">Email</h6>
                                        </div>
                                        <div className="col-sm-9 ">
                                            {EmployeeDetail?.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-2">Employee Phone No</h6>
                                        </div>
                                        <div className="col-sm-9 ">
                                            {EmployeeDetail?.mobNo}
                                        </div>
                                    </div>
                                    <hr />
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-2">Emergency Number</h6>
                                        </div>
                                        <div className="col-sm-9 ">
                                            {EmployeeDetail?.emergencyMobNo}
                                        </div>
                                    </div>
                                    <hr />
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-2">Address</h6>
                                        </div>
                                        <div className="col-sm-9 ">
                                            {EmployeeDetail?.address}
                                        </div>
                                    </div>
                                    <hr />
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-12 text-center ">
                                            <button className='bg-teal-500 w-24 h-7 rounded-3xl'>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        <div className="row">
                                            <div className="col-sm-12 text-center ">
                                                <button className='bg-teal-500 w-24 h-7 rounded-3xl'>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewProfile;