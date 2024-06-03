import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";

import React, { useEffect } from "react"
import axios from "axios";

interface Props {
    data: {
        employeeName: string;
        designation: string;
        email: string;
        mobNo: string;
        alternateMobNo: string;
        aadhaarNo: string;
        panNo: string;
        heighstQualification: string;
        bloodGroup: string;
        dateOfJoining: string;
        releaseDate: string;
        address: string;
        pincode: string;
        emergencyContact: string;
        emergencyMobNo: string;
        pfNo: string;
        employeeId: string;
    }
}


const EmployeeModifyForm = (props: Props) => {
    const [date, setDate] = React.useState<Date | undefined>()
    const [employeeName, setEmployeeName] = React.useState<string>('')
    const [designation, setDesignation] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [mobNo, setMobNo] = React.useState<string>('')
    const [alternateMobNo, setAlternateMobNo] = React.useState<string>('')
    const [aadhaarNo, setAadhaarNo] = React.useState<string>('')
    const [panNo, setPanNo] = React.useState<string>('')
    const [heighstQualification, setHeighstQualification] = React.useState<string>('')
    const [bloodGroup, setBloodGroup] = React.useState<string>('')
    const [emergencyContact, setEmergencyContact] = React.useState<string>('')
    const [emergencyMobNo, setEmergencyMobNo] = React.useState<string>('')
    const [pfNo, setPfNo] = React.useState<string>('')
    // const [releaseDate, setReleaseDate] = React.useState<string>('')
    const [address, setAddress] = React.useState<string>('')
    const [pincode, setPincode] = React.useState<string>('')



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.put(`/api/employee/updateemployee/${props.data.employeeId}`, { employeeName, designation, email, mobNo, alternateMobNo, aadhaarNo, panNo, heighstQualification, bloodGroup, dateOfJoining: date, address, pincode, emergencyContact, emergencyMobNo, pfNo, props }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        }
        )
    }
    useEffect(() => {
        setEmployeeName(props.data.employeeName)
        setDesignation(props.data.designation)
        setEmail(props.data.email)
        setMobNo(props.data.mobNo)
        setAlternateMobNo(props.data.alternateMobNo)
        setAadhaarNo(props.data.aadhaarNo)
        setPanNo(props.data.panNo)
        setHeighstQualification(props.data.heighstQualification)
        setBloodGroup(props.data.bloodGroup)
        // setReleaseDate(props.data.releaseDate)
        setAddress(props.data.address)
        setPincode(props.data.pincode)
        setAddress(props.data.address)
        setPincode(props.data.pincode)
        setEmergencyContact(props.data.emergencyContact)
        setEmergencyMobNo(props.data.emergencyMobNo)
        setPfNo(props.data.pfNo)
        setDate(new Date(props.data.dateOfJoining))
    }, [props.data])



    return (
        <div className="pl-10 pr-10 ">
            <form className='flex flex-col gap-0.5 text-xs' onSubmit={handleSubmit}>
                <div className="flex">
                <Label className="w-2/4 pt-1">Name</Label>
                <Input className="w-2/4 " placeholder="Name"  value={employeeName} onChange={(e) => setEmployeeName(e.target.value)}  />
                </div>

                <div className="flex">
                     <Label className="w-2/4 pt-1">Designation</Label>
                    <Input className="w-2/4" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} /> 
                     </div>

                     <div className="flex">
                <Label className="w-2/4 pt-1">Email</Label>
                <Input className="w-2/4" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="flex">
                <Label className="w-2/4 pt-1 ">Date Of Joining </Label>
                <span className=""><DatePicker buttonName="Date Of Joining." value={date} setValue={setDate} /></span>
                
                </div>

                <div className="flex">
                <Label className="w-2/4 pt-1" >Contact No.</Label>
                <Input className="w-2/4" placeholder="Contact No." value={mobNo} onChange={(e) => setMobNo(e.target.value)} />
                </div>

                <div className="flex">
                   
                  
                <Label className="w-2/4 pt-1" >Blood Group</Label>
                    <Input className="w-2/4" placeholder="Blood Group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />

                </div>

                <div className="flex">
                <Label className="w-2/4 pt-1" >Contact No.(Alt)</Label>
                
                <Input className="w-2/4" placeholder="Alt No." value={alternateMobNo} onChange={(e) => setAlternateMobNo(e.target.value)} />
                </div>

                <div className="flex">
              
                    
                    <Label className="w-2/4 pt-1">Highest Study </Label>
                    <Input className="w-2/4" placeholder=" Quaification" value={heighstQualification} onChange={(e) => setHeighstQualification(e.target.value)} />
                </div>
                <div className="flex">
              
                <Label className="w-2/4 pt-1">Aadhar No.</Label>
                    <Input className="w-2/4" placeholder=" Aadhar No." value={aadhaarNo} onChange={(e) => setAadhaarNo(e.target.value)} />
                </div>


                <div className="flex">
                  
                    <Label className="w-2/4 pt-1">Pan No.</Label>
                    <Input className="w-2/4" placeholder="Pan No." value={panNo} onChange={(e) => setPanNo(e.target.value)} /> 
                     </div>

                     <div className="flex">
                  
                     <Label className="w-2/4 pt-1">Emergency Contact Name </Label>
                    <Input className="w-2/4" placeholder=" Contact Name " value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
                   </div>

                <div className="flex">
                    
                    <Label className="w-2/4 pt-1">Emergency Contact No. </Label>
                    <Input className="w-2/4" placeholder="Contact No." value={emergencyMobNo} onChange={(e) => setEmergencyMobNo(e.target.value)} />  </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1">PF No.(Optional) </Label>
                    <Input className="w-2/4" placeholder="PF No. " value={pfNo} onChange={(e) => setPfNo(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1"> Pincode</Label>
                    <Input className="w-2/4" placeholder=" Pincode " value={pincode} onChange={(e) => setPincode(e.target.value)} />  </div>
                
                <div className="flex">
                    <Label className="w-2/4 pt-1">Address </Label>
                    <Input className="w-2/4" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

                </div>





                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
            </form>




        </div>
    )


}
export default EmployeeModifyForm