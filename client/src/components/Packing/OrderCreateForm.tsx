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
    const usernameRef = useRef<HTMLInputElement>(null)
    const [errortext, setErrortext] = useState('')
    const [isdisable, setisdisable] = useState<boolean>(false)


    const [grade,setGrade]=useState<findskutypeData[]>([])
    const [actvgradeindex,setActvgradeindex]=useState<number>()

    const [rows, setRows] = useState<SectionRowData[]>([{
        origin: '',
        grade:'',
        quantity: 0,
        unitrate: 0,
        totalprice: 0,
        gst:false,
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
        grade:'',
        quantity: 0,
        unitrate: 0,
        totalprice: 0,
        gst:false,
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
        axios.put('/api/vendorSKU/getItembySection/Final Grade',{section:'Packing'})
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])
   

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        const dateissue = dateIssueref.current?.value
        const username = usernameRef.current?.value

        setisdisable(true)
        const formData = rows.map(row => ({
            Date: dateissue,
            Vendor: username,

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

    const handleGradechange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
     
        handleRowChange(index,'grade',e.target.value)
        setActvgradeindex(index)
        if (e.target.value.length > 0 && gradeData.length > 0) {
            setGradeView("block")
        } else {
            setGradeView("none")
        }

       
        axios.post("/api/vendorSKU/skudatafind/Packing", { sku: e.target.value,type:'Final Grade' })
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
            <div className="px-5 mt-4">
                     <form className='flex flex-col gap-0.5 ' onSubmit={handleSubmit2}>

                    <div className="mx-8 flex flex-col gap-1">
                        <div className="flex mt-1">
                            <Label className="w-2/4 pt-1">Invoice Date (*)</Label>
                            <Input type='date' className="w-2/4 text-center justify-center" placeholder="Vehicle No" ref={dateIssueref} required />
                        </div>
                        <div className="flex mt-1">
                            <Label className="w-2/4 pt-1">Vendor Name (*)</Label>
                            <Input className="w-2/4 text-center" placeholder="Vendor Name" ref={usernameRef} required/>
                        </div>
                    </div>

                    <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                        onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                        <Table className="mt-1 ">
                            <TableHeader className="bg-neutral-100 text-stone-950" >
                                <TableHead className="text-center" >Sl. No.</TableHead>
                                <TableHead className="text-center" >Origin</TableHead>
                                <TableHead className="text-center" >Grade</TableHead>
                                <TableHead className="text-center" >Quantity</TableHead>
                                <TableHead className="text-center" >Unit_Rate</TableHead>
                                <TableHead className="text-center" >Total_Price(Rs)</TableHead>
                                <TableHead className="text-center" >GST</TableHead>
                                <TableHead className="text-center w-30" >Remarks</TableHead>
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
                                                {actvgradeindex === index && <ScrollArea className="max-h-24 w-auto overflow-scroll  
                                                dropdown-content" style={{ display: gradeview }}>
                                                    {
                                                        gradeData.map((item: any) => (
                                                            <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" 
                                                            onClick={() => handleSkuidClick(index, item)}>
                                                                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.sku}</p>

                                                            </div>
                                                        ))
                                                    }
                                                </ScrollArea>}
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

                <dialog id="successemployeedialog" className="dashboard-modal">
                    <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                    </span>


                </dialog>

                <dialog id="erroremployeedialog" className="dashboard-modal">
                    <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p>
                    </span>


                </dialog>
            </div>
        </>



    )

}
export default OrderCreateForm