import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";
import { useRef } from "react"
import React from "react"
import axios from "axios"


const Employeecreateform = () => {
    const [date, setDate] = React.useState<Date | undefined>()


    const nameref = useRef<HTMLInputElement>(null)
    const emailref = useRef<HTMLInputElement>(null)
    const desgref = useRef<HTMLInputElement>(null)
    const dobref = useRef<HTMLInputElement>(null)
    const contactNoref = useRef<HTMLInputElement>(null)
    const bloodgpref = useRef<HTMLInputElement>(null)
    const studyref = useRef<HTMLInputElement>(null)
    const altcontactref = useRef<HTMLInputElement>(null)
    const adharref = useRef<HTMLInputElement>(null)
    const panref = useRef<HTMLInputElement>(null)
    const emgNameref = useRef<HTMLInputElement>(null)
    const emgContactref = useRef<HTMLInputElement>(null)
    const pfref = useRef<HTMLInputElement>(null)
    const pincoderef = useRef<HTMLInputElement>(null)
    const addressref = useRef<HTMLInputElement>(null)




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const employeeName = nameref.current?.value
        const email = emailref.current?.value
        const designation = desgref.current?.value
        const dateOfJoining = dobref.current?.value
        const mobNo = contactNoref.current?.value
        const bloodGroup = bloodgpref.current?.value

        const heighstQualification = studyref.current?.value
        const alternateMobNo = altcontactref.current?.value
        const aadhaarNo = adharref.current?.value
        const panNo = panref.current?.value
        const emergencyContact = emgNameref.current?.value
        const emergencyMobNo = emgContactref.current?.value

        const pfNo = pfref.current?.value
        const pincode = pincoderef.current?.value
        const address = addressref.current?.value

        console.log(employeeName, email, designation, dateOfJoining, mobNo, bloodGroup, heighstQualification, alternateMobNo, aadhaarNo, panNo, emergencyContact, emergencyMobNo, pfNo, pincode, address)
        axios.post("/api/employee/createemployee", {
            employeeName,
            email,
            designation,
            dateOfJoining: date,
            mobNo,
            bloodGroup,
            heighstQualification,
            alternateMobNo,
            aadhaarNo,
            panNo,
            emergencyContact,
            emergencyMobNo,
            pfNo,
            pincode,
            address
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)

        })
    }


    return (
        <div className="pl-10 pr-10 ">
            <form className='flex flex-col gap-0.5 text-xs' onSubmit={handleSubmit}>

                <div className="flex">
                    <Label className="w-2/4 pt-1">Name</Label>
                    <Input className="w-2/4 " placeholder="Name" ref={nameref} /> </div>

                <div className="flex">
                    <Label className="w-2/4  pt-1">Email </Label>
                    <Input className="w-2/4" placeholder="Email" ref={emailref} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1 ">Desg.</Label>
                    <Input className="w-2/4 " placeholder="Designation" ref={desgref} />
                </div>

                <div className='flex'>
                    <Label className="w-2/4 pt-1 ">Date Of Birth </Label>
                    <span className="w-/3"><DatePicker buttonName="D.O.B" value={date} setValue={setDate} /></span>
                </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1 ">Contact No.</Label>
                    <Input className="w-2/4 " placeholder="Contact No." ref={contactNoref} /></div>


                <div className="flex">
                    <Label className="w-2/4 pt-1 ">Blood Group</Label>
                    <Input className="w-2/4" placeholder="Blood Group" ref={bloodgpref} /></div>

                <div className="flex">
                    <Label className="w-2/4 pt-1 ">Highest Study </Label>
                    <Input className="w-2/4 " placeholder=" Quaification" ref={studyref} /></div>


                <div className="flex">
                    <Label className="w-2/4 pt-2 ">Contact No.(Alt)</Label>
                    <Input className="w-2/4 " placeholder="Alt No." ref={altcontactref} />

                </div>


                <div className="flex">
                    <Label className="w-2/4 pt-1">Aadhar No.</Label>
                    <Input className="w-2/4 " placeholder=" Aadhar No." ref={adharref} /></div>

                <div className="flex">
                    <Label className="w-2/4 pt-1 ">Pan No.</Label>
                    <Input className="w-2/4 " placeholder="Pan No." ref={panref} />
                </div>


                <div className="flex">
                    <Label className="w-2/4  pt-1 ">Emergency Contact Name </Label>
                    <Input className="w-2/4 " placeholder=" Contact Name " ref={emgNameref} /></div>
                <div className="flex">
                    <Label className="w-2/4 pt-1 ">Emergency Contact No. </Label>
                    <Input className="w-2/4" placeholder="Contact No. " ref={emgContactref} />
                </div>


                <div className="flex">
                    <Label className="w-2/4 pt-1 ">PF No.(Optional) </Label>
                    <Input className="w-2/4 " placeholder="PF No. " ref={pfref} /> </div>

                <div className="flex"><Label className="w-2/4  pt-1 "> Pincode</Label>
                    <Input className="w-2/4" placeholder=" Pincode " ref={pincoderef} /> </div>

                <div className="flex">
                    <Label className="w-2/4 pt-1 ">Address </Label>
                    <Input className="w-2/4 " placeholder="Address " ref={addressref} />

                </div>





                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
            </form>




        </div>
    )


}
export default Employeecreateform