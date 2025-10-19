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
  const [date, setDate] = React.useState<Date | undefined>();
  const [errortext, setErrorText] = useState<string>("");
  const [file, setFile] = useState<any>();
  const [isdisable, setisdisable] = useState<boolean>(false);

  // Refs
  const nameref = useRef<HTMLInputElement>(null);
  const emailref = useRef<HTMLInputElement>(null);
  const desgref = useRef<HTMLInputElement>(null);
  const contactNoref = useRef<HTMLInputElement>(null);
  const bloodgpref = useRef<HTMLInputElement>(null);
  const studyref = useRef<HTMLInputElement>(null);
  const altcontactref = useRef<HTMLInputElement>(null);
  const adharref = useRef<HTMLInputElement>(null);
  const panref = useRef<HTMLInputElement>(null);
  const emgNameref = useRef<HTMLInputElement>(null);
  const emgContactref = useRef<HTMLInputElement>(null);
  const pfref = useRef<HTMLInputElement>(null);
  const pincoderef = useRef<HTMLInputElement>(null);
  const addressref = useRef<HTMLInputElement>(null);

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
        setisdisable(true)
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

        }).finally(()=>{
            setisdisable(false)
        })
    }
    const handleCleanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files);
        }
    }

    return (
         <div className="px-6 py-3">
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 max-w-5xl mx-auto">
       

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
          onSubmit={handleSubmit}
        >
          <div>
            <Label>Name</Label>
            <Input className="mt-1" placeholder="Enter name" ref={nameref} />
          </div>

          <div>
            <Label>Email</Label>
            <Input className="mt-1" placeholder="Enter email" ref={emailref} />
          </div>

          <div>
            <Label>Designation</Label>
            <Input className="mt-1" placeholder="Enter designation" ref={desgref} />
          </div>

          <div>
            <Label>Date Of Joining</Label>
            <p className="mt-2"><DatePicker buttonName="Select date" value={date} setValue={setDate} /></p>
            
          </div>

          <div>
            <Label>Contact No.</Label>
            <Input className="mt-1" placeholder="Enter contact number" ref={contactNoref} />
          </div>

          <div>
            <Label>Blood Group</Label>
            <Input className="mt-1" placeholder="Enter blood group" ref={bloodgpref} />
          </div>

          <div>
            <Label>Highest Qualification</Label>
            <Input className="mt-1" placeholder="Enter qualification" ref={studyref} />
          </div>

          <div>
            <Label>Alternate Contact</Label>
            <Input className="mt-1" placeholder="Enter alternate number" ref={altcontactref} />
          </div>

          <div>
            <Label>Aadhar No.</Label>
            <Input className="mt-1" placeholder="Enter Aadhar no." ref={adharref} />
          </div>

          <div>
            <Label>PAN No.</Label>
            <Input className="mt-1" placeholder="Enter PAN no." ref={panref} />
          </div>

          <div>
            <Label>Emergency Contact Name</Label>
            <Input className="mt-1" placeholder="Enter emergency contact name" ref={emgNameref} />
          </div>

          <div>
            <Label>Emergency Contact No.</Label>
            <Input className="mt-1" placeholder="Enter emergency contact no." ref={emgContactref} />
          </div>

          <div>
            <Label>PF No. (Optional)</Label>
            <Input className="mt-1" placeholder="Enter PF number" ref={pfref} />
          </div>

          <div>
            <Label>Pincode</Label>
            <Input className="mt-1" placeholder="Enter pincode" ref={pincoderef} />
          </div>

          <div className="md:col-span-2">
            <Label>Address</Label>
            <Input className="mt-1" placeholder="Enter address" ref={addressref} />
          </div>

          <div className="md:col-span-2">
            <Label>Employee Image</Label>
            <input
              type="file"
              className="mt-2 block w-full border border-gray-300 text-sm rounded-md p-2 cursor-pointer hover:border-blue-400 transition"
              onChange={handleCleanFileChange}
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-3">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-sm transition"
              disabled={isdisable}
            >
              {isdisable ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>

      {/* ✅ Success Dialog */}
      <dialog
        id="successemployeedialog"
        className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center"
      >
   

        <button id="empcloseDialog" className="dashboard-modal-close-btn">X</button>

        <span className="flex">
                            <img src={tick} height={15} width={15} alt='tick_image' />
                            <p id="modal-text" className="pl-3 mt-1 font-medium text-green-600">{errortext}</p>
         </span>
      </dialog>

      {/* ❌ Error Dialog */}
      <dialog
        id="erroremployeedialog"
        className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center"
      >
        <button id="errorempcloseDialog" className="dashboard-modal-close-btn">X</button>
          <span className="flex">
                            <img src={cross} height={15} width={15} alt='cross_image' />
                            <p id="modal-text" className="pl-3 mt-1 font-medium text-red-600">{errortext}</p>
         </span>
      </dialog>
    </div>
    )


}
export default Employeecreateform