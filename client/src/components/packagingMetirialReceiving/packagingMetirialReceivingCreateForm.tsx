import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { Button } from "../ui/button"
import { useState, useRef, useEffect } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import axios from "axios"
import { ScrollArea } from "@/components/ui/scroll-area";
import { PackageMaterialReceivingData, SkuData, VendorData } from "@/type/type"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MdDelete } from "react-icons/md"
import { TypeOnSection } from "../common/exportData"


interface Props {
    rcn: PackageMaterialReceivingData[]      
}
interface SectionRowData{
    sku:string;
   // vendorName:string;
    quantity:number;
    invoicequantity:number;
    type:string;
    unit:string;
    unitWt:number;
    totalWt:number;
}
const PackagingMetirialReceivingCreateForm = (props:Props) => {
    //const [unit, setUnit] = useState("")

   // const [sku, setSku] = useState("")
    //const [vendorName, setVendorName] = useState("")
    
    
    const [skuview, setSkuView] = useState("none")
    const [vendorNameView, setVendorNameView] = useState("none")
    const [skudata, setSkuData] = useState<SkuData[]>([])
    const [vendorData, setVendorData] = useState<VendorData[]>([])
   
    
    const invoicedateRef = useRef<HTMLInputElement>(null)
   // const quantityRef = useRef<HTMLInputElement>(null)
    const invoiceref = useRef<HTMLInputElement>(null)
    
    const [id, setId] = useState<number>()
    const [date, setDate] = useState<string>('')
    const [gatepass, setGatePass] = useState<string>('')
    const [grossWt, setGrossWt] = useState<string>('')
    const [truck, settruck] = useState<string>('')
    //const [actvindex,setActvindex]=useState<number>()
    const [actvskuindex,setActvskuindex]=useState<number>()
    const [VendorName, setVendorName] = useState<string>('')

    useEffect(() => {  
        if(props.rcn[0]){
        setId(props.rcn[0].id)
        setDate(props.rcn[0].recevingDate.slice(0,10))
        setGrossWt(props.rcn[0].grossWt)
        setGatePass(props.rcn[0].gatePassNo)
        settruck(props.rcn[0].truckNo)
        }
        
    }, [props.rcn[0]]);

    const [rows,setRows]=useState<SectionRowData[]>([{sku:'',type:'',quantity:0,invoicequantity:0,unit:'',unitWt:0,totalWt:0}
    ]);

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows,{sku:'',type:'',quantity:0,invoicequantity:0,unit:'',unitWt:0,totalWt:0}])
    }

    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }
    const type='PackagingMaterial'
    const [errortext, setErrortext] = useState('')
    const successdialog = document.getElementById('packageMetrialReceve') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialReciveError') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialRecivecross') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigreciveerrorcross') as HTMLInputElement;

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        //const quantity = quantityRef.current?.value
        const invoicedate=invoicedateRef.current?.value
        const invoice=invoiceref.current?.value
         
        const formData = rows.map(row => ({
                GatePassNo: gatepass,
                recevingDate: date,
                TruckNo: truck,
                GrossWt: grossWt,
                invoicedate:invoicedate,
                invoice:invoice,
                vendorName:VendorName,
                ...row
        }))
        try 
        { 
            if(formData.length===1){
            for (var data of formData) 
                {
                    await axios.put(`/api/packageMaterial/updateRcvPM/${id}`, {data })
                    await axios.post("/api/qcpackage/qcpackaginginitialEntry", { id: id,gatePassNo:gatepass })
                   
                    await axios.post("/api/gatepass/updateRcvDisptchStatus", { gatePassNo: gatepass,
                        section:'PackagingMaterial' })
                        setErrortext('Packaging Material Received Successfully')
                    if(successdialog){
                        (successdialog as any).showModal();
                    }
                    
                }
            }  
       
            else if(formData.length>1){
            const firstrow=formData[0]
          
                await axios.put(`/api/packageMaterial/updateRcvPM/${id}`, {data:firstrow })
                await axios.post("/api/qcpackage/qcpackaginginitialEntry", { id: id,gatePassNo:gatepass })
           
           
                let pmrescount=0
            for(let i=1;i<formData.length;i++){
                
                const data1=formData[i];
                const Pmres=await axios.post('/api/packageMaterial/createPM', {data:data1 })
                await axios.post("/api/qcpackage/qcpackaginginitialEntry", { id: Pmres.data.newPackageMaterial.id,gatePassNo:gatepass })
                pmrescount++
                if(pmrescount==(formData.length-1))
                {
                    
                    await axios.post("/api/gatepass/updateRcvDisptchStatus", { gatePassNo: gatepass,
                        section:'PackagingMaterial' })
                        setErrortext('Packaging Material Received Successfully')
                    if(successdialog){
                        (successdialog as any).showModal();
                    }
                }
            }
           
        } 
    }
    catch (err){
        console.log(err)
        await axios.post('/api/packageMaterial/deletePMByID',{ id:id,gatepass:gatepass})
        if(axios.isAxiosError(err)){
            setErrortext(err.response?.data.message ||'An Unexpected Error Occured')
        }
        if(errordialog){
            (errordialog as any).showModal()
        }
        
        

    }
                    
        
}

    const handleSkuchange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
        if(!rows[index].type){
            setErrortext('Please Select Item Type First')
            if(errordialog!== null)
            {
                (errordialog as any).showModal()
            }
            return
        }
        handleRowChange(index,'sku',e.target.value)
        setActvskuindex(index)
        if (e.target.value.length > 0 && skudata.length > 0) {
            setSkuView("block")
        } else {
            setSkuView("none")
        }

       
        axios.post("/api/vendorSKU/skudatafind/PackagingMaterial", { sku: e.target.value,type:rows[index].type })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setSkuData(res.data.skuData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setSkuData([])
                }
            })
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
        axios.post(`/api/vendorSKU/vendornamefind/PackagingMaterial/`, { vendorName: e.target.value,type:'Vendor'  })
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
    const handleSkuidClick = (index:any,item: SkuData) => {
       // setSku(item.sku)
       rows[index].sku=item.sku
       rows[index].unit=item.unit
       handleRowChange(index,'sku',item.sku)
       
        setSkuView("none")
    }
    const handleVendoridClick = (item: VendorData) => {
        setVendorName(item.vendorName)
        //handleRowChange(index,'vendorName',item.vendorName)
        setVendorNameView("none")
    }
    const handleTypeChange = (index:number,e: React.ChangeEvent<HTMLSelectElement>) => {
        if(rows[index].sku){
            rows[index].sku=''
        }
        handleRowChange(index,'type',e.target.value)
        //setVendorName(e.target.value)
        
       
    }
    const handleunitWtChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
    
       // handleRowChange(index,'unitWt',e.target.value)
        rows[index].unitWt=parseFloat(e.target.value) 
        const totalWt=e.target.value ?formatNumber(Number(e.target.value)*rows[index].quantity):0
        //setVendorName(e.target.value)
        handleRowChange(index,'totalWt',totalWt.toString())
        
       
    }
    const handleQtyChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
    
        //handleRowChange(index,'quantity',e.target.value)
        rows[index].quantity=parseFloat(e.target.value)
        const totalWt=e.target.value ?formatNumber(Number(e.target.value)*rows[index].unitWt):0
        //setVendorName(e.target.value)
        handleRowChange(index,'totalWt',totalWt.toString())
        
       
    }
    function formatNumber(num: any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }
    

    return (
        <>
            <div className="px-5 mt-4">
                <form className='flex flex-col gap-1.5 ' onSubmit={handleSubmit}>
                <div className="mx-8 flex flex-col gap-1"> 
                <div className="flex mt-4"><Label className="w-2/4  pt-2">GatePass No.</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="GatePass No" value={gatepass} readOnly /> </div>
                <div className="flex"><Label className="w-2/4  pt-2">Date</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="BL No." value={date}  readOnly /> </div> 
                <div className="flex"><Label className="w-2/4  pt-2">Gross Wt (Kg)</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="BL No." value={grossWt}  readOnly /> </div>   
                <div className="flex"><Label className="w-2/4  pt-2">Truck No.</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="BL No." value={truck}  readOnly /> </div> 
                <div className="flex"><Label className="w-2/4  pt-2">Invoice No</Label>
                <Input className="w-2/4 text-center" placeholder="Invoice No" required  ref={invoiceref} /> </div>

                <div className="flex"><Label className="w-2/4  pt-2">Invoice Date</Label>
                <Input className="w-2/4 justify-center" placeholder="Invoice Date" required ref={invoicedateRef} type="date" /> </div>
                <div className="flex "><Label className="w-2/4  pt-2">Vendor Name</Label>
                <div className="w-2/4">
                <Input className="justify-center text-center" placeholder="Vendor" required value={VendorName} onChange={(e)=>{handleVendorChange(e)}} /> 
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
                            <TableHead className="text-center" >Sl. No.</TableHead>
                            <TableHead className="text-center" >Item_Type</TableHead>
                            <TableHead className="text-center" >SKU/Item_Name</TableHead>
                       
                            <TableHead className="text-center" >Invoice_Qty</TableHead>
                            <TableHead className="text-center" >Unit</TableHead>
                            <TableHead className="text-center" >Physical_Qty</TableHead>
                            
                            <TableHead className="text-center" >Unit_Wt(Kg)</TableHead>
                            <TableHead className="text-center" >Total_Wt(Kg)</TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        </TableHeader>
                        {rows.map((row, index) => {
                            return (
                                <>
                                    <TableBody>
                                        <TableRow key={index} className="boiling-row-height">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="text-center " >



                                                <select className="text-center flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleTypeChange(index, e)}
                                                    value={row.type} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Type</option>
                                                    {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                                                    {type ? (
                                                        TypeOnSection[type as keyof typeof TypeOnSection].map((item) => (
                                                            <option key={item} value={item}>{item}</option>
                                                        ))
                                                    ) : null}
                                                </select>
                                            </TableCell>


                                            <TableCell className="text-center" >
                                                <Input value={row.sku} placeholder="SKU"
                                                    onChange={(e) => handleSkuchange(index, e)} required />
                                                {actvskuindex === index && <ScrollArea className="max-h-24 w-32 overflow-scroll  dropdown-content" style={{ display: skuview, position: 'fixed' }}>
                                                    {
                                                        skudata.map((item: SkuData) => (
                                                            <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleSkuidClick(index, item)}>
                                                                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.sku}</p>

                                                            </div>
                                                        ))
                                                    }
                                                </ScrollArea>}
                                            </TableCell>
                                           


                                            <TableCell className="text-center" >
                                                <Input value={row.invoicequantity} placeholder="Qty." type='number'
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'invoicequantity', e.target.value)
                                                    }} required/>
                                            </TableCell>
                                            <TableCell className="text-center" >
                                          
                                                <Input value={row.unit} placeholder="unit" required readOnly className="bg-yellow-100"/> 
                                            </TableCell>

                                            <TableCell className="text-center" >
                                                <Input value={row.quantity} placeholder="Qty." type='number'
                                                    onChange={(e) => {
                                                        handleQtyChange(index, e)

                                                    }} required/>
                                            </TableCell>
                                           
                                            <TableCell className="text-center" >
                                                <Input value={row.unitWt} placeholder="unitWt" type="number"
                                                    onChange={(e) => {
                                                        handleunitWtChange(index, e)
                                                    }} required/>
                                            </TableCell>
                                           
                                            <TableCell className="text-center" >
                                          
                                                <Input value={row.totalWt} placeholder="unit" required readOnly /> 
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
                    
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                </form>
                <dialog id="packageMetrialReceve" className="dashboard-modal">
                <button id="packageMetrialRecivecross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialReciveError" className="dashboard-modal">
                <button id="packagigreciveerrorcross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            </div>

           
        </>
    )
}

export default PackagingMetirialReceivingCreateForm;