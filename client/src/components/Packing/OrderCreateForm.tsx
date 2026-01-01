import { useEffect, useRef, useState } from "react";
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

import { findskutypeData } from "@/type/type";
import { Origin } from "../common/exportData";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "../ui/scroll-area";
import { MdDelete } from "react-icons/md";

interface SectionRowData {
    origin: string;
    grade: string;
    quantity: number;
    unitrate: number;
    totalprice: number;
    gst: boolean;
    remarks: string;
}


const OrderCreateForm = () => {

    const dateIssueref = useRef<HTMLInputElement>(null)
    const invdateIssueref = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const brokernameRef = useRef<HTMLInputElement>(null)
    const [errortext, setErrortext] = useState('')
    const [isdisable, setisdisable] = useState<boolean>(false)


    const [grade, setGrade] = useState<findskutypeData[]>([])
    const [actvgradeindex, setActvgradeindex] = useState<number>()

    const [rows, setRows] = useState<SectionRowData[]>([{
        origin: '',
        grade: '',
        quantity: 0,
        unitrate: 0,
        totalprice: 0,
        gst: false,
        remarks: '',
    }
    ]);

    const handleRowChange = (index: number, field: string, fieldvalue: string) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: fieldvalue };
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows, {
            origin: '',
            grade: '',
            quantity: 0,
            unitrate: 0,
            totalprice: 0,
            gst: false,
            remarks: ''
        }])
    }
    const [gradeview, setGradeView] = useState("none")
    const [gradeData, setGradeData] = useState<any[]>([])

    const deleteRow = (index: number) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows)
    }
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Final Grade', { section: 'Packing' })
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                console.log(grade)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleGradeidClick = (index: any, item: any) => {
        // setSku(item.sku)
        rows[index].grade = item.sku
        handleRowChange(index, 'grade', item.sku)

        setGradeView("none")
    }


    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        const dateissue = dateIssueref.current?.value
        const invdateissue = invdateIssueref.current?.value
        const username = usernameRef.current?.value
        const brokerusername = brokernameRef.current?.value
   // Validation for duplicate origin and grade
   const seen = new Set<string>();
   for (const row of rows) {
       const key = `${row.origin}-${row.grade}`;
       if (seen.has(key)) {
           setErrortext(`Duplicate found: Origin - "${row.origin}", Grade - "${row.grade}"`);
           if (errordialog) {
               (errordialog as any).showModal();
           }
           return; // Stop submission if duplicate is found
       }
       seen.add(key);
   }
        setisdisable(true)
        const formData = rows.map(row => ({
            ordDate: dateissue,
            invDate: invdateissue,
            Vendor: username,
            Broker: brokerusername,
            ...row
        }))

        try {

            const res = await axios.post(`/api/packing/createOrderEntire`, { data: formData })
            setErrortext(res.data.message)
            if (successdialog) {
                (successdialog as any).showModal();
            }

        }
        catch (err) {
            console.log(err)
            if (axios.isAxiosError(err)) {
                setErrortext(err.response?.data.message || 'An Unexpected Error Occured in Creating Issue Items')
            }
            else {
                setErrortext('An Unexpected Error Occured in Creating Issue Item')
            }
            if (errordialog) {
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

    const handleGradechange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)

        handleRowChange(index, 'grade', e.target.value)
        setActvgradeindex(index)
        if (e.target.value.length > 0 && gradeData.length > 0) {
            setGradeView("block")
        } else {
            setGradeView("none")
        }


        axios.post("/api/vendorSKU/skudatafind/Packing", { sku: e.target.value, type: 'Final Grade' })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setGradeData(res.data.skuData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setGradeData([])
                }
            })
    }




    return (
        <>
            <div>
                <form className='flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 border border-gray-200 ' onSubmit={handleSubmit2}>

                    

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3"> 
                        <div>
                            <Label className="text-xs text-gray-500 font-bold">Order Receive Date (*)</Label>
                            <Input type='date' className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Vehicle No" ref={dateIssueref} required />
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-bold">Order Entry Date (*)</Label>
                            <Input type='date' className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300"  placeholder="Vehicle No" ref={invdateIssueref} required />
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-bold">Vendor Name (*)</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Vendor Name" ref={usernameRef} required />
                        </div>
                        <div>
                            <Label className="text-xs text-gray-500 font-bold">Broker Name (*)</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Broker Name" ref={brokernameRef} required />
                        </div>
                    </div>

                    <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                        onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                        <Table className="mt-1 ">
                            <TableHeader className="bg-neutral-100 text-stone-950" >
                                <TableHead className="text-center" >Sl⠀No</TableHead>
                                <TableHead className="text-center" >Origin</TableHead>
                                <TableHead className="text-center" >Final⠀Grade</TableHead>
                                <TableHead className="text-center" >Quantity⠀(Kg)</TableHead>
                                <TableHead className="text-center" >Unit⠀Rate⠀</TableHead>
                                <TableHead className="text-center" >Total⠀Price</TableHead>
                                <TableHead className="text-center" >Included⠀GST</TableHead>
                                <TableHead className="text-center w-30" >Order⠀Remarks</TableHead>
                                <TableHead className="text-center" >Action</TableHead>

                            </TableHeader>
                            {rows.map((row, index) => {
                                return (
                                    <>
                                        <TableBody>
                                            <TableRow key={index} className="boiling-row-height">
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell className="text-center">
                                                    <Select value={row.origin} onValueChange={(val) => handleRowChange(index, 'origin', val)} required={true}>
                                                        <SelectTrigger className="justify-center w-40">
                                                            <SelectValue placeholder="Origin" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    Origin.map((item) => {
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
                                                    <Input value={row.grade} placeholder="Final Grade"
                                                        onChange={(e) => handleGradechange(index, e)} required />
                                                    {actvgradeindex === index && <ScrollArea className="max-h-24 w-auto overflow-auto  
                                                dropdown-content" style={{ display: gradeview }}>
                                                        {
                                                            gradeData.map((item: any) => (
                                                                <div key={item.id} className="gap-y-10 gap-x-4 hover:bg-gray-300 pl-3"
                                                                    onClick={() => handleGradeidClick(index, item)}>
                                                                    <p className="font-medium text-xs text-blue-900 py-1 focus:text-base hover:font-semibold ml-2 text-left">{item.sku}</p>

                                                                </div>
                                                            ))
                                                        }
                                                    </ScrollArea>}
                                                </TableCell>

                                                <TableCell className="text-center" >
                                                    <Input value={row.quantity} placeholder="Qty." type='number'
                                                        onChange={(e) => {
                                                            handleRowChange(index, 'quantity', e.target.value)
                                                        }} required />
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                    <Input value={row.unitrate} placeholder="Unit Rate." type='number'
                                                        onChange={(e) => {
                                                            handleRowChange(index, 'unitrate', e.target.value)
                                                        }} required />
                                                </TableCell>

                                                <TableCell className="text-center" >
                                                    <Input value={row.totalprice} placeholder="Total Rate" type='number'
                                                        onChange={(e) => {
                                                            handleRowChange(index, 'totalprice', e.target.value)
                                                        }} required />
                                                </TableCell>

                                                <TableCell className="text-center flex flex-row mt-2">
                                                    <Input
                                                        type="checkbox" className=" h-4 w-4 text-center justify-center items-center "
                                                        checked={row.gst}
                                                        onChange={(e) => {
                                                            handleRowChange(index, 'gst', String(e.target.checked))
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell className="text-center w-30" >

                                                    <Input value={row.remarks} placeholder="Remarks" className='w-90' onChange={(e) => {
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

                <dialog id="successemployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                    <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p>
                    </span>


                </dialog>

                <dialog id="erroremployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                    <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium text-red-500">{errortext}</p>
                    </span>


                </dialog>
            </div>
        </>



    )

}
export default OrderCreateForm