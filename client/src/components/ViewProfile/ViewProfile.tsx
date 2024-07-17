import axios from 'axios';
import "./ViewProfile.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const ViewProfile = () => {
    useEffect(() => {
        axios.get("/api/user/profile").then((res) => {
            console.log(res.data)
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
                                        <div className='flex items-center justify-center'>{localStorage.getItem("image") == null ? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" /> : <img src={`/api/cleaning/view?filename=${localStorage.getItem('image')}`} alt="Admin" className="rounded-circle" width="150" />}</div>
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
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 ">
                                            Kenneth Valdez
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            fip@jukmuh.al
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            (239) 816-9029
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Mobile</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            (320) 380-4539
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            Bay Area, San Francisco, CA
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1 className='text-center'>User Profile</h1>
                            <div className="row gutters-sm">
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                                            <small>Web Design</small>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <small>Website Markup</small>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "72%" }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <small>One Page</small>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "89%" }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <small>Mobile Template</small>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "55%" }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <small>Backend API</small>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "66%" }} aria-valuenow={66} aria-valuemin={0} aria-valuemax={100}></div>
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