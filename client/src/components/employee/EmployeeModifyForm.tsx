import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";
import { Textarea } from "@/components/ui/textarea"
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
        <div >
            <form className='flex flex-col gap-4 text-center' onSubmit={handleSubmit}>
                <div className="flex"><Label className="w-1/4 pl-5 pt-2 mr-2 ">Name</Label>
                    <Input className="w-3/4 mr-2" placeholder="Name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} /><Label className="w-1/4 pl-2 pt-2 mr-2">Desg.</Label>
                    <Input className="w-3/4 mr-2" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />  </div>

                <div className="flex"><Label className="w-1/4 pl-5 pt-2 mr-2">Email </Label>
                    <Input className="w-3/4 mr-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Label className="w-1/4 pl-3 pt-2 mr-2">Date Of Joining </Label>
                    <DatePicker buttonName="D.O.B" value={date} setValue={setDate} />

                </div>

                <div className="flex">
                    <Label className="w-1/4 pl-2 pt-2 mr-2" >Contact No.</Label>
                    <Input className="w-3/4 mr-2" placeholder="Contact No." value={mobNo} onChange={(e) => setMobNo(e.target.value)} />
                    <Label className="w-1/4 pl-2 pt-2 mr-2">Blood Gp.</Label>
                    <Input className="w-3/4 mr-2" placeholder="Blood Group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />

                </div>

                <div className="flex">
                    <Label className="w-1/4 pl-5 pt-2 mr-2">Contact No.(Alt)</Label>
                    <Input className="w-3/4 mr-2" placeholder="Alt No." value={alternateMobNo} onChange={(e) => setAlternateMobNo(e.target.value)} />
                    <Label className="w-1/4 pl-2 pt-2 mr-2">Highest Study </Label>
                    <Input className="w-3/4 mr-2" placeholder=" Quaification" value={heighstQualification} onChange={(e) => setHeighstQualification(e.target.value)} />
                </div>


                <div className="flex">
                    <Label className="w-1/4 pl-2 pt-2 mr-2">Aadhar No.</Label>
                    <Input className="w-3/4 mr-2" placeholder=" Aadhar No." value={aadhaarNo} onChange={(e) => setAadhaarNo(e.target.value)} />
                    <Label className="w-1/4 pl-3 pt-2 mr-2">Pan No.</Label>
                    <Input className="w-3/4 mr-2" placeholder="Pan No." value={panNo} onChange={(e) => setPanNo(e.target.value)} />  </div>

                <div className="flex">
                    <Label className="w-1/4 pl-2 pt-2 mr-2">Emergency Contact Name </Label>
                    <Input className="w-3/4 mr-2" placeholder=" Contact Name " value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
                    <Label className="w-1/4 pl-3 pt-2 mr-2">Emergency Contact No. </Label>
                    <Input className="w-3/4 mr-2" placeholder="Contact No." value={emergencyMobNo} onChange={(e) => setEmergencyMobNo(e.target.value)} />  </div>

                <div className="flex">
                    <Label className="w-1/4 pl-3 pt-2 mr-2">PF No.(Optional) </Label>
                    <Input className="w-3/4 mr-2" placeholder="PF No. " value={pfNo} onChange={(e) => setPfNo(e.target.value)} />

                    <Label className="w-1/4 pl-2 pt-2 mr-2"> Pincode</Label>
                    <Input className="w-3/4 mr-2" placeholder=" Pincode " value={pincode} onChange={(e) => setPincode(e.target.value)} />  </div>
                <div className="flex">
                    <Label className="w-1/4 pl-3 pt-2 mr-2">Address </Label>
                    <Textarea className="w-2/4 mr-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

                </div>





                <Button className="bg-orange-500 mb-2 w-1/6  text-center items-center justify-center">Submit</Button>
            </form>




        </div>
    )


}
export default EmployeeModifyForm