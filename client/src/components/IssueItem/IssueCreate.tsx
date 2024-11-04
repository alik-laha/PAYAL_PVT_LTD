import { useRef, useState } from "react";
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

interface SectionRowData {
    category: string;
    material: string;
    quantity: number;
    unit: string;
    unitprice: number;
    totalprice: number;
    section: string;
    sectionunit: string;

    damagestatus: string;
    damageqty: number;
    damageunit: string;
    remarks: string;

}


const IssueCreateForm = () => {

    const dateIssueref = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const [errortext, setErrortext] = useState('')
    const [isdisable, setisdisable] = useState<boolean>(false)

    const [rows, setRows] = useState<SectionRowData[]>([{
        category: '',
        material: '',
        quantity: 0,
        unit: '',
        unitprice: 0,
        totalprice: 0,
        section: '',
        sectionunit: '',

        damagestatus: '',
        damageqty: 0,
        damageunit: '',
        remarks: ''
    }
    ]);

    const handleRowChange = (index: number, field: string, fieldvalue: string) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: fieldvalue };
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows, {
            category: '',
            material: '',
            quantity: 0,
            unit: '',
            unitprice: 0,
            totalprice: 0,
            section: '',
            sectionunit: '',

            damagestatus: '',
            damageqty: 0,
            damageunit: '',
            remarks: ''
        }])
    }

    const deleteRow = (index: number) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows)
    }

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        const dateissue = dateIssueref.current?.value
        const username = usernameRef.current?.value

        setisdisable(true)
        const formData = rows.map(row => ({

            Date: dateissue,
            User: username,

            ...row
        }))

        try {

            const res = await axios.post(`/api/issue/createIssueItemEntire`, { data: formData })
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


        <div className="pl-5 pr-5 ">
            <form className='flex flex-col gap-1 text-xs responsive-80-width' onSubmit={handleSubmit2}>

                <div className="mx-8 flex flex-col gap-0.5">
                    <div className="flex mt-1">
                        <Label className="w-2/4 pt-1">Date(*)</Label>
                        <Input type='date' className="w-2/4 text-center justify-center" placeholder="Vehicle No" ref={dateIssueref} required />
                    </div>
                    <div className="flex mt-1">
                        <Label className="w-2/4 pt-1">Issue to User</Label>
                        <Input className="w-2/4 text-center" placeholder="User Name" ref={usernameRef} />
                    </div>
                </div>
                <div className="flex mt-1">

                    <div className=" w-1/5 mt-3">
                        <button className="ml-4 mt-1 bg-blue-400 font-bold w-2/3 text-grey-700  h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                            onClick={addRow2}>+ Add </button>
                    </div>

                    <div  className="mt-1 w-4/5 ml-4 max-h-28 overflow-y-scroll">
                <Table >
                <TableHeader className="bg-neutral-100 text-stone-950" >
                             <TableHead className="text-center " >Sl. No.</TableHead>
                             <TableHead className="text-center " > Section</TableHead>

                             <TableHead className="text-center" >Action</TableHead>
                             </TableHeader>
                             {rows.map((row,index)=> {
                        return(
                            <>
                             <TableBody>
                             <TableRow key={index} className="boiling-row-height">

                             <TableCell className="text-center " >{index+1}</TableCell>
                             <TableCell className="text-center " >{index+1}</TableCell>

                                <TableCell className="text-center">
                                          <Button className="bg-red-400 text-grey-700 w-7 h-7  text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={()=>deleteRow(index)}><MdDelete size={20}/></Button>
                                          </TableCell>

                                </TableRow>
                             </TableBody>
                             </>
                        )
                   
                    })}


                </Table>
                </div>
                </div>


                {/* <Table >
                <TableHeader className="bg-neutral-100 text-stone-950" >

                <TableHead className="text-center " >Sl. No.</TableHead>
                             <TableHead className="text-center " > Category</TableHead>
                             <TableHead className="text-center " > Material_Name</TableHead>
                             <TableHead className="text-center " > Quantity</TableHead>
                             <TableHead className="text-center " > Unit</TableHead>
                             <TableHead className="text-center " > Unit_Price</TableHead>
                             <TableHead className="text-center " > Total_Price</TableHead>
                             <TableHead className="text-center " > Section</TableHead>
                             <TableHead className="text-center " > Section_Unit</TableHead>
                             <TableHead className="text-center " > Damage_Return</TableHead>
                             <TableHead className="text-center " > Return_Qty</TableHead>
                             <TableHead className="text-center " > Unit</TableHead>
                             <TableHead className="text-center " > Remarks</TableHead>

                             <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>
                    {rows.map((row,index)=> {
                        return(
                            <>
                            <TableBody>

                            <TableRow key={index} className="boiling-row-height">
                            <TableCell className="text-center " >{index+1}</TableCell>
                            <TableCell className="text-center " >{index+1}</TableCell>
                            <TableCell className="text-center " >{index+1}</TableCell>
                            <TableCell className="text-center " >{index+1}</TableCell>
                            <TableCell className="text-center " >{index+1}</TableCell>
                            <TableCell className="text-center " >{index+1}</TableCell>
                            <TableCell className="text-center " >{index+1}</TableCell>
                            <TableCell className="text-center " >{index+1}</TableCell>
                            <TableCell className="text-center " >{index+1}</TableCell>

                                </TableRow>
                            </TableBody>
                            </>
                        )}
                    )}
                    </Table> */}
                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>

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

    )

}
export default IssueCreateForm