import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {  sectionDataonTypeGate } from "../common/exportData";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'


interface SectionRowData{
    section:string;
}
const GatePassCreateForm = () => {
    const vehicleNoRef = useRef<HTMLInputElement>(null)
    const DocumentNoRef = useRef<HTMLInputElement>(null)
    const DriverNameRef = useRef<HTMLInputElement>(null)
    const DriverContactNoref = useRef<HTMLInputElement>(null)
    const GrossWtRef = useRef<HTMLInputElement>(null)
    const GrossWtSlipRef = useRef<HTMLInputElement>(null)
    const NameRef = useRef<HTMLInputElement>(null)
    const [date,setDate]=useState<string>('')
    const [time,setTime]=useState<string>('')
    const [type,setType]=useState<string>('IN')
    const [errortext, setErrortext] = useState('')
    const [isdisable,setisdisable]=useState<boolean>(false)
    useEffect(()=>{
        setDate(new Date().toISOString().slice(0,10))
        setTime(new Date().toTimeString().slice(0,5))

    },[])
    
    const [rows,setRows]=useState<SectionRowData[]>([{section:''}
    ]);

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows,{section:''}])
    }

    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }
    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
// const dialog = document.getElementById('myDialog');
const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;

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
    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const vehicle = vehicleNoRef.current?.value
        const document = DocumentNoRef.current?.value
        const drivername = DriverNameRef.current?.value
        const drivercontact = DriverContactNoref.current?.value
        const grossWt = GrossWtRef.current?.value
        const grossWtSlip = GrossWtSlipRef.current?.value
        const name = NameRef.current?.value

        const sections = rows.map((row) => row.section)

        const hasduplicate = sections.some((item, index) => sections.indexOf(item) !== index);
        if (hasduplicate) {
            setErrortext('Duplicate Section Values Found !')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
        setisdisable(true)
        const formData = rows.map(row => ({
               
            Date: date,
            Time: time,
            vehicle: vehicle,
            document: document,
            drivername: drivername,
            driverContact: drivercontact,
            grossWt: grossWt,
            GrossWtSlip: grossWtSlip,
            SecName: name,
            type: type,
            ...row
        }))
        

        try {
            
            const res=await axios.post(`/api/gatepass/createGatePassEntire`, { data: formData })
            setErrortext(res.data.message)
                if (successdialog) {
                    (successdialog as any).showModal();
                }

        }
        catch (err) {
            console.log(err)
            if (axios.isAxiosError(err)) {
                setErrortext(err.response?.data.message || 'An Unexpected Error Occured in Creating Gate Pass')
            }
            else {
                setErrortext('An Unexpected Error Occured in Creating Gate Pass')
            }
        }
        finally{
            setisdisable(false)
        }
    }



return(
<>

<div className="w-full px-5 pt-3 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ">
              <form
    className="flex flex-col gap-6 text-sm md:text-[13px] max-w-4xl mx-auto"
    onSubmit={handleSubmit2}
  >
     {/* --- TYPE --- */}
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <Label className="sm:w-1/2 font-bold text-gray-600 dark:text-gray-300 text-left" >
        Select Gatepass Type (IN / OUT)
      </Label>
      <select
        className="select-with-icon w-full sm:w-1/2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 px-3 py-2 focus:ring-2 focus:ring-blue-500 text-center"
        onChange={(e) => setType(e.target.value)}
        value={type}
        required
      >
        <option value="IN" className="w-auto">IN</option>
        <option value="OUT" className="w-auto">OUT</option>
      </select>
    </div>

    {/* --- DATE & TIME SECTION --- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <Label className="font-medium text-gray-600 dark:text-gray-300">Date</Label>
        <Input
          className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-center focus:ring-2 focus:ring-blue-500"
          type="date"
          value={date}
          readOnly
          required
        />
      </div>
      <div className="flex flex-col">
        <Label className="font-medium text-gray-600 dark:text-gray-300">Time</Label>
        <Input
          className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-center focus:ring-2 focus:ring-blue-500"
          type="time"
          value={time}
          readOnly
          required
        />
      </div>
    </div>

  

    {/* --- VEHICLE INFO --- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label className="font-medium text-gray-600 dark:text-gray-300">Vehicle No *</Label>
        <Input
          className="text-center rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          placeholder="Vehicle No"
          ref={vehicleNoRef}
          required
        />
      </div>
      <div>
        <Label className="font-medium text-gray-600 dark:text-gray-300">Driver Name</Label>
        <Input
          className="text-center rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          placeholder="Driver Name"
          ref={DriverNameRef}
        />
      </div>
      <div>
        <Label className="font-medium text-gray-600 dark:text-gray-300">Driver Contact</Label>
        <Input
          className="text-center rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          placeholder="Contact No"
          ref={DriverContactNoref}
        />
      </div>
      <div>
        <Label className="font-medium text-gray-600 dark:text-gray-300">Challan / Invoice No *</Label>
        <Input
          className="text-center rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          placeholder="Document No."
          ref={DocumentNoRef}
          required
        />
      </div>
    </div>

    {/* --- WEIGHT SECTION --- */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label className="font-medium text-gray-600 dark:text-gray-300">
          {type === "IN" ? "Gross" : "Tare"} Weight (Kg) *
        </Label>
        <Input
          className="text-center rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          type="number"
          step="0.01"
          placeholder="Weight"
          ref={GrossWtRef}
          required
        />
      </div>
      <div>
        <Label className="font-medium text-gray-600 dark:text-gray-300">Weight Slip *</Label>
        <Input
          className="text-center rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          placeholder="Slip No."
          ref={GrossWtSlipRef}
          required
        />
      </div>
      <div>
        <Label className="font-medium text-gray-600 dark:text-gray-300">Security Name *</Label>
        <Input
          className="text-center rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          placeholder="Security Name"
          ref={NameRef}
          required
        />
      </div>
    </div>

    {/* --- SECTION TABLE --- */}
    <div className="mt-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Section Details</h3>
        <button
          type="button"
          onClick={addRow2}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-8 h-8 rounded-md flex items-center justify-center transition-all"
        >
          +
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg max-h-48 overflow-y-scroll">
        <Table className="min-w-full text-center text-sm">
          <TableHeader className="bg-gray-100 dark:bg-gray-800 sticky top-0">
            <TableHead className="text-center">Sl. No.</TableHead>
            <TableHead className="text-center">Section</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableHeader>

          {rows.map((row, index) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <select
                    className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 px-2 py-1 focus:ring-2 focus:ring-blue-500 text-sm"
                    onChange={(e) =>
                      handleRowChange(index, "section", e.target.value)
                    }
                    value={row.section}
                    required
                  >
                    <option value="">Select Section</option>
                    {type &&
                      sectionDataonTypeGate[type as keyof typeof sectionDataonTypeGate].map(
                        (item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        )
                      )}
                  </select>
                </TableCell>
                <TableCell className="text-center"> <Button className="bg-red-400  w-12 h-7 text-primary-foreground rounded-md text-center items-center justify-center" onClick={()=>deleteRow(index)}><MdDelete size={12} color="white"/></Button> </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </div>

    {/* --- SUBMIT BUTTON --- */}
    <div className="flex justify-center">
      <Button
        className={`${
          isdisable
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        } text-white font-semibold rounded-md h-9 w-28 transition-all`}
        disabled={isdisable}
      >
        {isdisable ? "Submitting..." : "Submit"}
      </Button>
    </div>
  </form>



                <dialog id="successemployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p>
                </span>


            </dialog>

            <dialog id="erroremployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p>
                </span>


            </dialog>
</div>  

</>

)


}

export default GatePassCreateForm;