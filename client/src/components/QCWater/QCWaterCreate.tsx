import {  useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import {  QC_Boiler } from "../common/exportData";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import TimePicker from "../common/TimePicker";
interface SectionRowData {
    ph: number;
    tds: number;
    day: string;
    night: string;
    reading: number;
    waterUse: number;
    remarks: string;
    type:string;
}


const QCWaterCreate = () => {

    const dateIssueref = useRef<HTMLInputElement>(null)
  
    const [errortext, setErrortext] = useState('')
    const [isdisable, setisdisable] = useState<boolean>(false)
    const phRef = useRef<HTMLInputElement>(null)
    const tdsRef = useRef<HTMLInputElement>(null)
    const hardnessRef = useRef<HTMLInputElement>(null)
    const [mc_on, setmc_on] = useState<string>('00:00')
   
    const [rows, setRows] = useState<SectionRowData[]>([{
        ph: 0,
        tds: 0,
        day: '',
        night: '',
        reading: 0,
        waterUse: 0,
        remarks: '',
        type:''
        
    }
    ]);

    const handleRowChange = (index: number, field: string, fieldvalue: string) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: fieldvalue };
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows, {
            ph: 0,
            tds: 0,
            day: '',
            night: '',
            reading: 0,
            waterUse: 0,
            remarks: '',
            type:''
        }])
    }

    const deleteRow = (index: number) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows)
    }
    const handleonchangeon = (value:string) => {
        console.log(value)
        setmc_on(value)
        
    }
 

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        const sections = rows.map((row) => row.type)

        const hasduplicate = sections.some((item, index) => sections.indexOf(item) !== index);
        if (hasduplicate) {
            setErrortext('Boiler Type Can not be Same')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
        const dateissue = dateIssueref.current?.value
        const phwater = phRef.current?.value
        const tdswater = tdsRef.current?.value
        const hardwater = hardnessRef.current?.value

        setisdisable(true)
        const formData = rows.map(row => ({

            Date: dateissue,
            Time: mc_on,
            waterPh:phwater,
            waterTDS:tdswater,
            waterHardness:hardwater,
            ...row
        }))

        try {

            const res = await axios.post(`/api/qcwater/createQCWaterEntire`, { data: formData })
            setErrortext(res.data.message)
            if (successdialog) {
                (successdialog as any).showModal();
            }

        }
        catch (err) {
            console.log(err)
            if (axios.isAxiosError(err)) {
                setErrortext(err.response?.data.message || 'An Unexpected Error Occured in  QC Water Entry')
            }
            else {
                setErrortext('An Unexpected Error Occured in  QC Water Entry')
            }
            if(errordialog){
                (errordialog as any).showModal()
            }
        }
        finally {
            setisdisable(false)
        }

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
   
    
    
    return (
        <>
            <div className="px-5 mt-4">
                     <form className='flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 border border-gray-200 ' onSubmit={handleSubmit2}>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div>
                            <Label className="text-xs text-gray-500 font-bold">Testing Date(*)</Label>
                            <Input type='date' className="mt-1 text-center border-gray-400" placeholder="Vehicle No" ref={dateIssueref} required />
                        </div>
                       
                          <div>
                            <Label className="text-xs text-gray-500 font-bold">Feed-Water PH</Label>
                            <Input className="mt-1 text-center border-gray-400" placeholder="PH" ref={phRef} type='number' step="0.01" required />
                        </div>
                       <div>
                            <Label className="text-xs text-gray-500 font-bold">Feed-Water TDS</Label>
                            <Input className="mt-1 text-center border-gray-400" placeholder="TDS" ref={tdsRef} type='number' step="0.01" required />
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-bold">Feed-Water Hardness</Label>
                            <Input className="mt-1 text-center border-gray-400" placeholder="Hardness" ref={hardnessRef} type='number' step="0.01" required />
                        </div>
                         <div>
                            <Label className="text-xs text-gray-500 font-bold">Testing Time</Label>
                            <div className="mt-2 text-center border-gray-400" ><TimePicker onChange={handleonchangeon} value={mc_on}/> </div>                        </div>
                    </div>

                    <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                        onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                        <Table className="mt-1 ">
                            <TableHeader className="bg-neutral-100 text-stone-950" >
                                <TableHead className="text-center" >Sl⠀No</TableHead>
                                <TableHead className="text-center" >Boiler⠀Type</TableHead>
                                <TableHead className="text-center" >Water⠀PH</TableHead>
                                <TableHead className="text-center" >Water⠀TDS</TableHead>
                                <TableHead className="text-center" >BlownDown⠀Time⠀Day⠀Shift</TableHead>
                                <TableHead className="text-center" >BlownDown⠀Time⠀Night⠀Shift</TableHead>
                                <TableHead className="text-center" >Water⠀Reading</TableHead>
                                <TableHead className="text-center" >Water⠀Used</TableHead>
                                <TableHead className="text-center" >Remarks</TableHead>
                               
                                <TableHead className="text-center" >Action</TableHead>

                            </TableHeader>
                            {rows.map((row, index) => {
                                return (
                                    <>
                                        <TableBody>
                                            <TableRow key={index} className="boiling-row-height">
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell className="text-center" >
                                            <Select value={row.type} onValueChange={(val) => handleRowChange(index, 'type', val)} required={true}>
                                                <SelectTrigger className="justify-center w-40" >
                                                    <SelectValue placeholder="Boiler Name" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            QC_Boiler.map((item) => {
                                                                return (
                                                                    <SelectItem key={item} value={item}>
                                                                        {item}
                                                                    </SelectItem>
                                                                )
                                                            })
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                                </TableCell>
                                            
                                           
                                               
                                                <TableCell className="text-center" >
                                                <Input value={row.ph} placeholder="PH." type='number'
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'ph', e.target.value)
                                                    }} required/>
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                <Input value={row.tds} placeholder="TDS" type='number'
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'tds', e.target.value)
                                                    }} required/>
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                <Input value={row.day} placeholder="Day Shift" 
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'day', e.target.value)
                                                    }} required/>
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                <Input value={row.night} placeholder="Night Shift" 
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'night', e.target.value)
                                                    }} required/>
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                <Input value={row.reading} placeholder="Water reading"  type='number'
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'reading', e.target.value)
                                                    }} required/>
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                <Input value={row.waterUse} placeholder="Water Used"  type='number'
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'waterUse', e.target.value)
                                                    }} required/>
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                <Input value={row.remarks} placeholder="Remarks" 
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'remarks', e.target.value)
                                                    }} />
                                                </TableCell>
                                          
                                            
                                            
                                            
                                      <TableCell className="text-center">
                                                <button className="bg-red-400 text-grey-700 w-7 h-7  text-primary-foreground rounded-md text-center items-center justify-center"
                                                    onClick={() => deleteRow(index)}><MdDelete size={20} /></button>
                                            </TableCell>



                                            </TableRow>

                                        </TableBody>

                                    </>
                                )

                            })}



                        </Table>


                    </div>



                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable ? 'Submitting' : 'Submit'}</Button>

                </form>

                <dialog id="successemployeedialog" className="rounded-lg p-6 shadow-xl bg-white border
                 border-green-300 text-center">
                    <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p>
                    </span>


                </dialog>

                <dialog id="erroremployeedialog" className="rounded-lg p-6 shadow-xl bg-white border
                 border-red-300 text-center">
                    <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p>
                    </span>


                </dialog>
            </div>
        </>



    )

}
export default QCWaterCreate