import axios from 'axios';
import "./ViewProfile.css";

import { useEffect, useState } from "react";
import { EmployeeData, User } from "../../type/type"
import { IoMdCamera } from "react-icons/io";
import { Input } from '../ui/input';
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import DashboardHeader from '../dashboard/DashboardHeader';

import DashboardSidebar from '../dashboard/DashboardSidebar';

const ViewProfile = () => {
    const [EmployeeDetail, setEmployeeDetail] = useState<EmployeeData>()
    const [UserDetail, setUserDetail] = useState<User>()
    const [EmployeeEditMode, setEmployeeEditMode] = useState(false)
   
    const [altno, setaltno] = useState("")
    
    const [email, setEmail] = useState("")
    const [mobNo, setMobNo] = useState("")
    const [emergencycontact, setEmergencycontact] = useState("")
    const [emergencyMobNo, setEmergencyMobNo] = useState("")
    const [address, setAddress] = useState("")
    const [employeeImage, setEmployeeImage] = useState<any>()
    const [pinCode, setPinCode] = useState<string>("")
    const [errortext, setErrorText] = useState<string>("")
    const successdialog = document.getElementById('machinescs') as HTMLInputElement;
    const errordialog = document.getElementById('machineerror') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('machinescsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('machineerrorbtn') as HTMLInputElement;
    
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
      
        setEmail(EmployeeDetail?.email || "")
        setMobNo(EmployeeDetail?.mobNo || "")
       
        setaltno(EmployeeDetail?.alternateMobNo || "")
       
        setEmergencycontact(EmployeeDetail?.emergencyContact || "")
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
        
        formData.append("email", email)
        formData.append("mobNo", mobNo)
        formData.append("emergencyMobNo", emergencyMobNo)
        formData.append("address", address)
        formData.append("pincode", pinCode)
        formData.append("emergencycontact", emergencycontact)
        formData.append("alternatecontact", altno)
        if (employeeImage) {
            formData.append("employeeImage", employeeImage[0])
        }
        console.log(employeeImage)
        axios.post("/api/employee/profileEmployeeEdit", formData).then((res) => {
            if (res.data.image) {
                localStorage.setItem("image", res.data.image)
            }
            if(successdialog!=null){
                (successdialog as any).showModal();
            }
        }
        ).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if(errordialog!=null){
                (errordialog as any).showModal();
            }
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


                    <div className="container nopadding">
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
                                        <div className="row">
                                                    
                                                    <div className="col-sm-12 text-right mr-2 mt-2">
                                                    {EmployeeEditMode ? <button className='bg-red-500 w-20 h-7 rounded-md text-white' onClick={() => setEmployeeEditMode(false)}>Cancel</button> : null}

                                                    </div>
                                                    
                                               
                                              
                                                    <div className="col-sm-12 text-right mr-2 mt-2">
                                                        {EmployeeEditMode ? null : <button className='bg-teal-500 w-20 h-7 rounded-md text-white' onClick={handleemployeeEdit}>Edit</button>}
                                                    </div>
                                                </div>
                                            <div className="card-body">
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <div className='flex items-center justify-center flex-col'>{localStorage.getItem("image") == null ? <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-full" width="150" /> : <img src={`/api/cleaning/view?filename=${localStorage.getItem('image')}`} alt="Admin" className="rounded-full" width="160" />}
                                                    {EmployeeEditMode ? <div className='text-right'><label htmlFor='fileInput' className='flex pt-2 text-blue-500'>Upload  <IoMdCamera className='w-8 h-6' /></label></div> : null}</div>
                                                    <input type="file" className="hidden pt-2" id='fileInput' multiple onChange={handleCleanFileChange} />
                                                    
                                                </div>
                                                {
                                                    EmployeeEditMode ? <div className="row mt-4">
                                                        <div className="col-sm-12 text-center ">
                                                            <button className='bg-teal-500 w-24 h-7 rounded-3xl text-white' type='submit'>Save</button>
                                                        </div>
                                                    </div> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <h1 className='text-center font-bold pb-2'>Employee Details</h1>
                                        <div className="card mb-3">
                                            <div className="card-body">
                                               
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
                                                        {EmployeeDetail?.employeeName}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-2 font-semibold">Designation</h6>
                                                    </div>
                                                    <div className="col-sm-9 ">
                                                        {EmployeeDetail?.designation}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                              
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Aadhar No</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeDetail?.aadhaarNo}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Pan No</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeDetail?.panNo}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Blood Group</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeDetail?.bloodGroup}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Qualification</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeDetail?.heighstQualification}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Date Of Joining</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeDetail?.dateOfJoining.slice(0,10)}
                                                    </div>
                                                </div>
                                                <hr />
                                                <br />
                                              
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-2 font-semibold">Email</h6>
                                                    </div>
                                                    <div className="col-sm-9 ">
                                                    {EmployeeEditMode ? <Input className='bg-gray-100' value={email} onChange={(e) => setEmail(e.target.value)} required/> : EmployeeDetail?.email}
                                                    </div>
                                                </div>
                                                {!EmployeeEditMode ?<hr />:''}
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Contact No.</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeEditMode ? <Input className='bg-gray-100' value={mobNo} onChange={(e) => setMobNo(e.target.value)} required/> : EmployeeDetail?.mobNo}
                                                    </div>
                                                </div>
                                                {!EmployeeEditMode ?<hr />:''}
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Alternate Contact No.</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeEditMode ? <Input className='bg-gray-100' value={altno} onChange={(e) => setaltno(e.target.value)} required/> : EmployeeDetail?.alternateMobNo}
                                                    </div>
                                                </div>
                                                {!EmployeeEditMode ?<hr />:''}
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Address</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeEditMode ? <Input className='bg-gray-100' value={address} onChange={(e) => setAddress(e.target.value)} required/> : EmployeeDetail?.address}
                                                    </div>
                                                </div>
                                                {!EmployeeEditMode ?<hr />:''}
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3 font-semibold">
                                                        <h6 className="mb-2">Pincode</h6>
                                                    </div>
                                                    <div className="col-sm-9  ">
                                                        {EmployeeEditMode ? <Input className='bg-gray-100' value={pinCode} onChange={(e) => setPinCode(e.target.value)} required/> : EmployeeDetail?.pincode}
                                                    </div>
                                                </div>
                                                {!EmployeeEditMode ?<hr />:''}
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-2 font-semibold">Emergency Contact Name</h6>
                                                    </div>
                                                    <div className="col-sm-9 ">
                                                        {EmployeeEditMode ? <Input className='bg-gray-100' value={emergencycontact} onChange={(e) => setEmergencycontact(e.target.value)} required /> : EmployeeDetail?.emergencyContact}
                                                    </div>
                                                </div>
                                                {!EmployeeEditMode ?<hr />:''}
                                                <br />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <h6 className="mb-2 font-semibold">Emergency Contact No.</h6>
                                                    </div>
                                                    <div className="col-sm-9 ">
                                                        {EmployeeEditMode ? <Input className='bg-gray-100' value={emergencyMobNo} onChange={(e) => setEmergencyMobNo(e.target.value)} required/> : EmployeeDetail?.emergencyMobNo}
                                                    </div>
                                                </div>
                                                {!EmployeeEditMode ?<hr />:''}
                                                <br />
                                                
                                                
                                                
                                               
                                              
                                                
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="col-md-8">
                                    <h1 className='text-center pb-2 font-bold'>User Profile</h1>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-2 font-semibold ">User Name</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                    {UserDetail?.userName}
                                                </div>
                                            </div>
                                            <hr />
                                            <br />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-2 font-semibold">Department</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                    {UserDetail?.dept}
                                                </div>
                                            </div>
                                            <hr />
                                            <br />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-2 font-semibold">Role</h6>
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
            <dialog id="machinescs" className="dashboard-modal">
        <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={tick} height={2} width={35} alt='tick_image'/>
        <p id="modal-text" className="pl-3 mt-1 font-medium">Profile Details Updated Successfully</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>

    <dialog id="machineerror" className="dashboard-modal">
        <button id="machineerrorbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={cross} height={25} width={25} alt='error_image'/>
        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>
        </div>

    )
}
export default ViewProfile;