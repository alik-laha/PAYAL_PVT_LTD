import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { useState, useEffect,   } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { findskutypeData } from "@/type/type"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { MdDelete } from "react-icons/md"
import { Origin } from "../common/exportData"
interface Props {
    rcn: any[]      
}
interface SectionRowData{
 
    creditNoteNo:string;
    grade:string;
    origin:string;
    vendorName:string;
    quantity:number;
    totalWt:number;
    type:string;
    unitPrice:number;
    remarks:string;
    totalBill:number;
  
}

const CreditNoteCreate = (props:Props) => {
    
    const [errortext, setErrorText] = useState<string>("")
    const [gateType, setGateType] = useState<string>("")
   
    const [id, setId] = useState<number>()
    const [date, setDate] = useState<string>('')
    const [gatepass, setGatePass] = useState<string>('')
    const [grossWt, setGrossWt] = useState<string>('')
    const [truck, settruck] = useState<string>('')
    const [sku,setsku]=useState<findskutypeData[]>([])

    const [isdisable,setisdisable]=useState<boolean>(false)

    //const noOfBagsRef = useRef<HTMLInputElement>(null)
    //console.log(props)

    useEffect(() => {  
        if(props.rcn[0]){
        setId(props.rcn[0].id)
        setDate(props.rcn[0].recevingDate.slice(0,10))
        setGrossWt(props.rcn[0].grossWt)
        setGatePass(props.rcn[0].gatePassNo)
        settruck(props.rcn[0].truckNo)
        setGateType(props.rcn[0].gateType)
        }
        
    }, [props.rcn[0]]);

    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Type',{section:'CreditNote'})
            .then(res => {
                //console.log(res.data)
                setsku(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

    const [grade, setGrade] = useState<findskutypeData[]>([])
    const [actvgradeindex, setActvgradeindex] = useState<number>()
    const [gradeview, setGradeView] = useState("none")
    const [gradeData, setGradeData] = useState<any[]>([])

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
   

     const [rows, setRows] = useState<SectionRowData[]>([
    {
     
      creditNoteNo: "",
      grade: "",
      origin: "",
      vendorName: "",
      quantity: 0,
      totalWt: 0,
      type: "",
      unitPrice: 0,
      remarks: "",
      totalBill: 0,
    },
  ])

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
     const addRow2 = () => {
    setRows([
      ...rows,
      {
        
        creditNoteNo: "",
        grade: "",
        origin: "",
        vendorName: "",
        quantity: 0,
        totalWt: 0,
        type: "",
        unitPrice: 0,
        remarks: "",
        totalBill: 0,
      },
    ])
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


    const successdialog = document.getElementById('myDialog') as HTMLInputElement;
    const errordialog = document.getElementById('errorDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('closeDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorcloseDialog') as HTMLInputElement;

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

    const handleSubmit3 = async (e: React.FormEvent) => {
        e.preventDefault()
        setisdisable(true)
     


        const formData = rows.map(row => ({
            GatePassNo: gatepass,
            recevingDate: date,
            TruckNo: truck,
            gateType: gateType,
            GrossWt: grossWt,
            ...row
        }))


        try {
            if (formData.length === 1) {
                for (var data of formData) {
                    await axios.put(`/api/creditNote/updateRcvCreditNote/${id}`, { data })
                    await axios.post("/api/gatepass/updateRcvDisptchStatus", {
                        gatePassNo: gatepass,
                        section: 'CreditNote'
                    })
                    setErrorText('Credit Note Items Received Successfully')
                    if (successdialog) {
                        (successdialog as any).showModal();
                    }

                }
            }

            else if (formData.length > 1) {
                await axios.put(`/api/creditNote/updateRcvCreditNotetEntire/${id}`, { formData })
                await axios.post("/api/gatepass/updateRcvDisptchStatus", {
                    gatePassNo: gatepass,
                    section: 'CreditNote'
                })
                setErrorText('Credit Note Items Received Successfully')
                if (successdialog) {
                    (successdialog as any).showModal();
                }
            }

        }
        catch (err) {
            console.log(err)
            //await axios.post('/api/storePrimary/deleteStorePrimaryByID',{ id:id,gatepass:gatepass})
            if (axios.isAxiosError(err)) {
                setErrorText(err.response?.data.message || 'An Unexpected Error Occured')
            }
            if (errordialog) {
                (errordialog as any).showModal()
            }



        }
        finally{
          setisdisable(false)  
        }

    }

   
   
    
    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }

    return (
        <>
            <div className="pl-10 pr-10">
              
                

                <form className='flex flex-col gap-0.5 ' onSubmit={handleSubmit3}>
                <div className="mx-8 flex flex-col gap-1"> 
                <div className="flex mt-4"><Label className="w-2/4  pt-1">GatePass No.</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="GatePass No" value={gatepass} readOnly /> </div>
                <div className="flex"><Label className="w-2/4  pt-1">GatePass Type</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="GatePass Type" value={gateType} readOnly /> </div>
                <div className="flex"><Label className="w-2/4  pt-1">Date of Receving</Label>
                <Input className="w-2/4  bg-yellow-100 font-semibold text-center" placeholder="Date" value={date}  readOnly /> </div> 
                
                <div className="flex"><Label className="w-2/4  pt-1">Gross Wt (Kg)</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="Gross Wt." value={grossWt}  readOnly /> </div>   
                
                <div className="flex"><Label className="w-2/4  pt-1">Vehicle No.</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="Vehicle No." value={truck}  readOnly /> </div>       
               
                
             
                </div>
                <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                    <Table className="mt-1 ">
                        <TableHeader className="bg-neutral-100 text-stone-950" >
                            <TableHead className="text-center" >Sl. No.</TableHead>
                            <TableHead className="text-center" >Credit_Note No</TableHead>
                            <TableHead className="text-center" >Vendor Name</TableHead>
                             <TableHead className="text-center" >Origin</TableHead>
                            <TableHead className="text-center" >Item Type</TableHead>                   
                           <TableHead className="text-center" >GradeName</TableHead>
                            <TableHead className="text-center" >Bag/Quantity</TableHead>
                            <TableHead className="text-center" >TotalWt</TableHead>                  
                            <TableHead className="text-center" >Unit Price</TableHead> 
                            <TableHead className="text-center" >Total_Bill Amount</TableHead>    
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
                                                <Input value={row.creditNoteNo} placeholder="Note Number" className="bg-cyan-100"
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'creditNoteNo', e.target.value)
                                                    }} />
                                            </TableCell>
                                            <TableCell className="text-center" >
                                                <Input value={row.vendorName} placeholder="Vendor Name" 
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'vendorName', e.target.value)
                                                    }} />
                                            </TableCell>
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
                                            <TableCell className="text-center " >
                                            <select className="text-center w-40 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleRowChange(index, 'type', e.target.value)}
                                                    value={row.type} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Type</option>
                                                    {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                                                    {sku ? (
                                                        sku.map((item:findskutypeData) => (
                                                            <option key={item.sku} value={item.sku}>{item.sku}</option>
                                                        ))
                                                    ) : null}
                                                </select>
                                            </TableCell>

                                   
                                            <TableCell className="text-center" >
                                                    <Input value={row.grade} placeholder="Final Grade"
                                                        onChange={(e) => handleGradechange(index, e)} required />
                                                    {actvgradeindex === index && <ScrollArea className="max-h-24 w-auto overflow-auto 
                                                dropdown-content" style={{ display: gradeview }}>
                                                        {
                                                            gradeData.map((item: any) => (
                                                                <div key={item.id} className=" gap-y-10 gap-x-4 hover:bg-gray-300 pl-3"
                                                                    onClick={() => handleGradeidClick(index, item)}>
                                                                    <p className="font-medium text-xs text-left text-blue-900 ml-2 hover:font-semibold py-1 focus:text-base">{item.sku}</p>

                                                                </div>
                                                            ))
                                                        }
                                                    </ScrollArea>}
                                            </TableCell>


                                            <TableCell className="text-center" >
                                                <Input value={row.quantity} placeholder="Qty." type='number' step='0'
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'quantity', e.target.value)

                                                    }} />
                                            </TableCell>
                                           
                                            <TableCell className="text-center" >
                                                <Input value={row.totalWt} placeholder="unitWt" type="number"
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'totalWt', e.target.value)
                                                    }} />
                                            </TableCell>

                                             <TableCell className="text-center" >
                                                <Input value={row.unitPrice} placeholder="billAmt" type="number"
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'unitPrice', e.target.value)
                                                    }} />
                                            </TableCell>
                                            <TableCell className="text-center" >
                                                <Input value={row.totalBill} placeholder="billAmt" type="number"
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'totalBill', e.target.value)
                                                    }} />
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
                    
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                </form>
                
                


            </div>
            <dialog id="myDialog" className="dashboard-modal">
                <button id="closeDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="errorDialog" className="dashboard-modal">
                <button id="errorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )


}
export default CreditNoteCreate