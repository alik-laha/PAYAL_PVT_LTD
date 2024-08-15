import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import DatePicker from "../common/DatePicker";
import { useRef, useState } from "react"
import React from "react"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'


const Employeecreateform = () => {
    const [date, setDate] = React.useState<Date | undefined>()
    const [errortext, setErrorText] = useState<string>("")
    const [file, setFile] = useState<any>()

    const nameref = useRef<HTMLInputElement>(null)
    const emailref = useRef<HTMLInputElement>(null)
    const desgref = useRef<HTMLInputElement>(null)
    //const dobref = useRef<HTMLInputElement>(null)
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

    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;

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
        const employeeName = nameref.current?.value
        const email = emailref.current?.value
        const designation = desgref.current?.value
        //const dateOfJoining = dobref.current?.value
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
        const formData = new FormData();
        formData.append('employeeName', employeeName as string);
        formData.append('email', email as string);
        formData.append('designation', designation as string);
        formData.append('dateOfJoining', date?.toString() as string);
        formData.append('mobNo', mobNo as string);
        formData.append('bloodGroup', bloodGroup as string);
        formData.append('heighstQualification', heighstQualification as string);
        formData.append('alternateMobNo', alternateMobNo as string);
        formData.append('aadhaarNo', aadhaarNo as string);
        formData.append('panNo', panNo as string);
        formData.append('emergencyContact', emergencyContact as string);
        formData.append('emergencyMobNo', emergencyMobNo as string);
        formData.append('pfNo', pfNo as string);
        formData.append('pincode', pincode as string);
        formData.append('address', address as string);
        if(file){
            formData.append('employeeImage', file[0]);
        }
       

        axios.post("/api/employee/createemployee", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res)
            setErrorText(res.data.msg)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }
            if (nameref.current != null) {
                nameref.current.value = '';
            }
            if (emailref.current != null) {
                emailref.current.value = '';
            }
            if (desgref.current != null) {
                desgref.current.value = '';
            }
            // if (dobref.current != null) {
            //     dobref.current.value = '';
            // }
            if (contactNoref.current != null) {
                contactNoref.current.value = '';
            }
            if (bloodgpref.current != null) {
                bloodgpref.current.value = '';
            }
            if (studyref.current != null) {
                studyref.current.value = '';
            }
            if (altcontactref.current != null) {
                altcontactref.current.value = '';
            }
            if (adharref.current != null) {
                adharref.current.value = '';
            }
            if (panref.current != null) {
                panref.current.value = '';
            }
            if (emgNameref.current != null) {
                emgNameref.current.value = '';
            }
            if (emgContactref.current != null) {
                emgContactref.current.value = '';
            }
            if (pfref.current != null) {
                pfref.current.value = '';
            }
            if (pincoderef.current != null) {
                pincoderef.current.value = '';
            }
            if (addressref.current != null) {
                addressref.current.value = '';
            }
            setDate(undefined);


        }).catch((err) => {
            console.log(err)
            // if(err.response.data.error.original.errno===1062)
            //     {
            //         setErrorText('Duplicate Entry is Not Allowed')
            //         if(errordialog!=null){
            //             (errordialog as any).showModal();
            //         }
            //         return
            //     }
            setErrorText(err.response.data.msg)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }

        })
    }
    const handleCleanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files);
        }
    }

    return (
        <div className="pl-10 pr-10 max-h-80 overflow-y-scroll">
            <form className='flex flex-col gap-0.5 text-xs mt-5' onSubmit={handleSubmit}>

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
                    <Label className="w-2/4 pt-1 ">Date Of Joining </Label>
                    <span className=""><DatePicker buttonName="Date Of Joining." value={date} setValue={setDate} /></span>
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
                <div className="flex">
                    <Label className="w-2/4 pt-1 ">Employee Image </Label>
                    <input type="file" multiple onChange={handleCleanFileChange} />
                </div>





                <Button className="bg-orange-500 mt-4 text-center items-center justify-center h-8 w-20">Submit</Button>
            </form>
            <dialog id="successemployeedialog" className="dashboard-modal">
                <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="erroremployeedialog" className="dashboard-modal">
                <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>




        </div>
    )


}
export default Employeecreateform