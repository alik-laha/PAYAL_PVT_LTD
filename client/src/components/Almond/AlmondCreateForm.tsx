import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useRef, useEffect,   } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { findskutypeData, VendorData } from "@/type/type"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { MdDelete } from "react-icons/md"
interface Props {
    rcn: any[]      
}
interface SectionRowData{
    sku:string;
   // vendorName:string;
    quantity:number;
   // invoicequantity:number;
    type:string;
   // unit:string;
    //remarks:string;
    totalWt:number;
    totalBill:number;
}

const AlmondPrimaryEntryForm = (props:Props) => {
    
    const [errortext, setErrorText] = useState<string>("")

    const [origin, setOrigin] = useState<string>("")
    const [gateType, setGateType] = useState<string>("")
    const blNoRef = useRef<HTMLInputElement>(null)
    const conNoRef = useRef<HTMLInputElement>(null)
    const billAmtRef = useRef<HTMLInputElement>(null)
// const blWeightRef = useRef<HTMLInputElement>(null)

    const [id, setId] = useState<number>()
    const [date, setDate] = useState<string>('')
    const [gatepass, setGatePass] = useState<string>('')
    const [grossWt, setGrossWt] = useState<string>('')
    const [truck, settruck] = useState<string>('')
    const [sku,setsku]=useState<findskutypeData[]>([])
    const [grade,setGrade]=useState<findskutypeData[]>([])
    const [isdisable,setisdisable]=useState<boolean>(false)

    const noOfBagsRef = useRef<HTMLInputElement>(null)
    const totalWtRef = useRef<HTMLInputElement>(null)
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
        axios.put('/api/vendorSKU/getItembySection/Almond Type',{section:'Almond'})
            .then(res => {
                //console.log(res.data)
                setsku(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Almond Grade',{section:'Almond'})
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

    const [rows,setRows]=useState<SectionRowData[]>([{sku:'',type:'',quantity:0,totalWt:0,totalBill:0}
    ]);

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows,{sku:'',type:'',quantity:0,totalWt:0,totalBill:0}])
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
        const blNo = blNoRef.current?.value
        const conNo = conNoRef.current?.value


        const formData = rows.map(row => ({
            GatePassNo: gatepass,
            recevingDate: date,
            TruckNo: truck,
            gateType: gateType,
            GrossWt: grossWt,
            invoicedate: conNo,
            invoice: blNo,
            vendorName: VendorName,
            ...row
        }))


        try {
            if (formData.length === 1) {
                for (var data of formData) {
                    await axios.put(`/api/almondPrimary/updateRcvAlmond/${id}`, { data })
                    await axios.post("/api/gatepass/updateRcvDisptchStatus", {
                        gatePassNo: gatepass,
                        section: 'Almond'
                    })
                    setErrorText('Almond Items Dispatched Successfully')
                    if (successdialog) {
                        (successdialog as any).showModal();
                    }

                }
            }

            else if (formData.length > 1) {
                await axios.put(`/api/almondPrimary/updateRcvAlmondEntire/${id}`, { formData })
                await axios.post("/api/gatepass/updateRcvDisptchStatus", {
                    gatePassNo: gatepass,
                    section: 'Almond'
                })
                setErrorText('Almond Items Dispatched Successfully')
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setisdisable(true)
        const blNo = blNoRef.current?.value
        const conNo = conNoRef.current?.value
        const billAmt =billAmtRef.current?.value
       // const blWeight = blWeightRef.current?.value
    
        const noOfBags = noOfBagsRef.current?.value
        const totalWt = totalWtRef.current?.value
        console.log({ origin, gateType,noOfBags })


        axios.post('/api/almondPrimary/updateAlmondEntry', { id,origin,blNo, conNo,gateType, noOfBags,gatepass ,Vendor:VendorName,totalBill:billAmt,totalWt})
            .then((res) => {

                console.log(res)
                setErrorText(res.data.message)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
                //let g_id=res.data.rcnPrimary.id
    
            }).catch((err) => {
                console.log(err)
        
                setErrorText(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }

            }).finally(()=>{
                setisdisable(false)
            })

    }
    
    const [VendorName, setVendorName] = useState<string>('')
    const [vendorNameView, setVendorNameView] = useState("none")
    const [vendorData, setVendorData] = useState<VendorData[]>([])

    const handleVendoridClick = (item: VendorData) => {
        setVendorName(item.vendorName)
        //handleRowChange(index,'vendorName',item.vendorName)
        setVendorNameView("none")
    }
    const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //handleRowChange(index,'vendorName',e.target.value)
        setVendorName(e.target.value)
        //setActvindex(index)
        if (e.target.value.length > 0 && vendorData.length > 0) {
            setVendorNameView("block")
        } else {
            setVendorNameView("none")
        }
        let vendortype:string;
        if(gateType==='IN'){
            vendortype='Vendor'
        }else{
            vendortype='Party'
        }
        axios.post(`/api/vendorSKU/vendornamefind/Almond/`, { vendorName: e.target.value,type:vendortype  })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setVendorData(res.data.vendorData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setVendorData([])
                }
            })
    }
    
    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }

    return (
        <>
            <div className="mx-5">
               {gateType==='IN'? 
                <form className='flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 border border-gray-200 ' onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3"> 
                <div><Label className="text-xs text-gray-500 font-bold">GatePass No.</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="GatePass No" value={gatepass} readOnly /> </div>

                <div><Label className="text-xs text-gray-500 font-bold">GatePass Type</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="GatePass Type" value={gateType} readOnly /> </div>
                
                <div ><Label className="text-xs text-gray-500 font-bold">Date of Receving</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="BL No." value={date}  readOnly /> </div> 
                <div ><Label className="text-xs text-gray-500 font-bold">Gross Wt (Kg)</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="BL No." value={grossWt}  readOnly /> </div>   
                <div ><Label className="text-xs text-gray-500 font-bold">Vehicle No.</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="BL No." value={truck}  readOnly /> </div> 
                <div ><Label className="text-xs text-gray-500 font-bold">Invoice No.</Label>
                        <Input className="mt-1 text-center border-gray-400" placeholder="Invoice No." ref={blNoRef}  required/> </div>
                <div><Label className="text-xs text-gray-500 font-bold">Invoice Date</Label>
                <Input className="mt-1 justify-center text-center border-gray-400" type='date' placeholder="date" ref={conNoRef} required /> </div>
                        
                        
                        
                <div><Label className="text-xs text-gray-500 font-bold">{gateType==='IN'? 'Vendor':'Party'} Name</Label>
                <div>
                <Input className="mt-1 justify-center text-center border-gray-400" placeholder="Name" required value={VendorName} onChange={(e)=>{handleVendorChange(e)}} /> 
                <ScrollArea className="max-h-24 w-1/3 overflow-y-scroll dropdown-content" style={{ display: vendorNameView,position:'fixed'}}>
                                                    {
                                                        vendorData.map((item: VendorData) => (
                                                            <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick( item)}>
                                                                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.vendorName}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </ScrollArea>
                </div>
                
     
                                                   
                </div>  

                <div>
                        <Label className="text-xs text-gray-500 font-bold">Type</Label>
                        <Select value={origin} onValueChange={(value) => setOrigin(value)} required={true}>
                            <SelectTrigger className="mt-1 justify-center w-full border-gray-400 h-8">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        sku.map((item:findskutypeData) => {
                                            return (
                                                <SelectItem key={item.sku} value={item.sku}>
                                                    {item.sku}
                                                </SelectItem>
                                            )
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                </div>
                <div>
                        <Label className="text-xs text-gray-500 font-bold">Physical Bag Count</Label>
                        <Input className="mt-1 text-center border-gray-400" placeholder="Bag Count" ref={noOfBagsRef} type="number" required />
                </div>
                <div>
                        <Label className="text-xs text-gray-500 font-bold">Weight</Label>
                        <Input className="mt-1 text-center border-gray-400" placeholder="Weight" ref={totalWtRef} type="number" required step="0.01"/>
                </div>
                <div>
                        <Label className="text-xs text-gray-500 font-bold">Bill Amount</Label>
                        <Input className="mt-1 text-center border-gray-400" placeholder="Bill Amount" ref={billAmtRef} type="number" required step="0.01"/>
                </div>








                        </div>
               
                     
                
              
                
                    {/* <div className="flex">
                        <Label className="w-2/4 pt-1"> BL Weight (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="BL Weight" ref={blWeightRef} type="number" step="0.01" required />
                    </div> */}
                   
                         <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                </form> :

                <form className='flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 border border-gray-200 ' onSubmit={handleSubmit3}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3"> 
                <div ><Label className="text-xs text-gray-500 font-bold">GatePass No.</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="GatePass No" value={gatepass} readOnly /> </div>
                <div ><Label className="text-xs text-gray-500 font-bold">GatePass Type</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="GatePass Type" value={gateType} readOnly /> </div>
                <div><Label className="text-xs text-gray-500 font-bold">Date of Receving</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Date" value={date}  readOnly /> </div> 
                
                <div><Label className="text-xs text-gray-500 font-bold">Gross Wt (Kg)</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Gross Wt." value={grossWt}  readOnly /> </div>   
                
                <div><Label className="text-xs text-gray-500 font-bold">Vehicle No.</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Vehicle No." value={truck}  readOnly /> </div>       
                <div ><Label className="text-xs text-gray-500 font-bold">Invoice No.</Label>
                <Input className="mt-1 text-center border-gray-400" placeholder="Invoice No." ref={blNoRef}  required/> </div>
                
                <div ><Label className="text-xs text-gray-500 font-bold">Invoice Date</Label>
                <Input className="mt-1 justify-center text-center border-gray-400" type='date' placeholder="date" ref={conNoRef} required /> </div>
                
                <div ><Label className="text-xs text-gray-500 font-bold">{gateType==='IN'? 'Vendor':'Party'} Name</Label>
                <div>
                <Input className="mt-1 justify-center text-center border-gray-400" placeholder="Name" required value={VendorName} onChange={(e)=>{handleVendorChange(e)}} /> 
                <ScrollArea className="max-h-24 w-1/3 overflow-y-scroll dropdown-content" style={{ display: vendorNameView,position:'fixed'}}>
                                                    {
                                                        vendorData.map((item: VendorData) => (
                                                            <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick( item)}>
                                                                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.vendorName}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </ScrollArea>
                </div>
                </div>
                </div>
                <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                    <Table className="mt-1 ">
                        <TableHeader className="bg-neutral-100 text-stone-950" >
                            <TableHead className="text-center" >Sl_No.</TableHead>
                            <TableHead className="text-center" >Almond⠀Type</TableHead>
                            <TableHead className="text-center" >Almond⠀Grade</TableHead>                      
                           
                           
                            <TableHead className="text-center" >Item/Bag⠀Qty</TableHead>                  
                            <TableHead className="text-center" >Weight⠀(Kg)</TableHead> 
                            <TableHead className="text-center" >Bill⠀Amount</TableHead>           
                            <TableHead className="text-center" >Action</TableHead>
                        </TableHeader>
                        {rows.map((row, index) => {
                            return (
                                <>
                                    <TableBody>
                                        <TableRow key={index} className="boiling-row-height">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="text-center " >
                                            <select className="w-full text-center flex h-8 rounded-md border border-input bg-background 
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

                                            <TableCell className="text-center " >
                                            <select className="w-full text-center flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleRowChange(index, 'sku', e.target.value)}
                                                    value={row.sku} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Grade</option>
                                                    {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                                                    {grade ? (
                                                        grade.map((item:findskutypeData) => (
                                                            <option key={item.sku} value={item.sku}>{item.sku}</option>
                                                        ))
                                                    ) : null}
                                                </select>
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
                                                <Input value={row.totalBill} placeholder="billAmt" type="number"
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'totalBill', e.target.value)
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
                
                }


            </div>
            <dialog id="myDialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="closeDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="errorDialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="errorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )


}
export default AlmondPrimaryEntryForm