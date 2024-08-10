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
interface Props {
    rcn: PackageMaterialReceivingData[]      
}
interface SectionRowData{
    sku:string;
    vendorName:string;
    quantityKg:string;
    qunatityPc:string;
}
const PackagingMetirialReceivingCreateForm = (props:Props) => {
    const [unit, setUnit] = useState("")

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
    const [actvindex,setActvindex]=useState<number>()
    const [actvskuindex,setActvskuindex]=useState<number>()

    useEffect(() => {  
        if(props.rcn[0]){
            setId(props.rcn[0].id)
        setDate(props.rcn[0].recevingDate.slice(0,10))
        setGrossWt(props.rcn[0].grossWt)
        setGatePass(props.rcn[0].gatePassNo)
        settruck(props.rcn[0].truckNo)
        }
        
    }, [props.rcn[0]]);

    const [rows,setRows]=useState<SectionRowData[]>([{sku:'',vendorName:'',quantityKg:'',qunatityPc:''}
    ]);

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows,{sku:'',vendorName:'',quantityKg:'',qunatityPc:''}])
    }

    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }

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
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const quantity = quantityRef.current?.value
        const invoicedate=invoicedateRef.current?.value
        const invoice=invoiceref.current?.value
        axios.post("/api/quality/createrecivingpackagematerial", { recevingDate: receivingDate, sku, vendorName, quantity, unit,invoicedate,invoice })
            .then((res) => {
                console.log(res)
                axios.post("/api/qcpackage/qcpackaginginitialEntry", { id: res.data.newPackageMaterial.id }).then(() => {
                    (successdialog as any).showModal();
                })

            })
            .catch((err) => {
                console.log(err)
                if (errordialog !== null) {
                    (errordialog as any).showModal();
                }

            })
    }

    const handleSkuchange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
        handleRowChange(index,'sku',e.target.value)
        setActvskuindex(index)
        if (e.target.value.length > 0 && skudata.length > 0) {
            setSkuView("block")
        } else {
            setSkuView("none")
        }
        axios.post("/api/packageMaterial/skudatafind", { sku: e.target.value })
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
    const handleVendorChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        handleRowChange(index,'vendorName',e.target.value)
        //setVendorName(e.target.value)
        setActvindex(index)
        if (e.target.value.length > 0 && vendorData.length > 0) {
            setVendorNameView("block")
        } else {
            setVendorNameView("none")
        }
        axios.post("/api/packageMaterial/vendornamefind", { vendorName: e.target.value })
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
       handleRowChange(index,'sku',item.sku)
        setSkuView("none")
    }
    const handleVendoridClick = (index:any,item: VendorData) => {
        //setVendorName(item.vendorName)
        handleRowChange(index,'vendorName',item.vendorName)
        setVendorNameView("none")
    }

    return (
        <>
            <div className="pl-10 pr-10">
                <form className='flex flex-col gap-1.5 ' onSubmit={handleSubmit}>

                <div className="flex mt-4"><Label className="w-2/4  pt-1">GatePass No.</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="GatePass No" value={gatepass} readOnly /> </div>
                <div className="flex"><Label className="w-2/4  pt-1">Date of Receving</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="BL No." value={date}  readOnly /> </div> 
                <div className="flex"><Label className="w-2/4  pt-1">Gross Wt (Kg)</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="BL No." value={grossWt}  readOnly /> </div>   
                <div className="flex"><Label className="w-2/4  pt-1">Truck No.</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="BL No." value={truck}  readOnly /> </div> 
                <div className="flex"><Label className="w-2/4  pt-1">Invoice No</Label>
                <Input className="w-2/4 text-center" placeholder="Invoice No" required  ref={invoiceref} /> </div>

                <div className="flex"><Label className="w-2/4  pt-1">Invoice Date</Label>
                <Input className="w-2/4 justify-center" placeholder="Invoice Date" required ref={invoicedateRef} type="date" /> </div> 
                       


                <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow2}>+</button>
                    <Table className="mt-1 overflow-scroll">
                             <TableHeader className="bg-neutral-100 text-stone-950" >
                             <TableHead className="text-center" >Sl. No.</TableHead>
                             <TableHead className="text-center" >Item_Code(SKU)</TableHead>
                             <TableHead className="text-center" >Vendor_Name</TableHead>
                             <TableHead className="text-center" >Qty(Pc)</TableHead>
                             <TableHead className="text-center" >Qty(Kg)</TableHead> 
                             <TableHead className="text-center" >Action</TableHead>
                             </TableHeader>
                    {rows.map((row,index)=> {
                        return(
                            <>
                                 <TableBody>
                                        <TableRow key={index} className="boiling-row-height">
                                        <TableCell>{index+1}</TableCell>

                                        <TableCell className="text-center" >
                                        <Input  value={row.sku} placeholder="SKU" 
                                        onChange={(e) => handleSkuchange(index,e)} required /> 
                                             {actvskuindex===index && <ScrollArea className="max-h-24 overflow-scroll w-30 dropdown-content" style={{ display: skuview ,position:'fixed' }}>
                                                {
                                                    skudata.map((item: SkuData) => (
                                                        <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleSkuidClick(index,item)}>
                                                            <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.sku}</p>
                                                          
                                                        </div>
                                                    ))
                                                }
                                        </ScrollArea>}    
                                        </TableCell>

                                       

                                        <TableCell className="text-center" >
                                        <Input  value={row.vendorName} placeholder="Vendor" 
                                        onChange={(e) =>  handleVendorChange(index,e)}  required/>     
                                            {actvindex===index && <ScrollArea className="max-h-24 overflow-scroll w-40 dropdown-content" style={{ display: vendorNameView,position:'fixed' }}>
                                                {
                                                    vendorData.map((item: VendorData) => (
                                                        <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick(index, item)}>
                                                            <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.vendorName}</p>
                                                        </div>
                                                    ))
                                                }
                                            </ScrollArea> }    
                                        </TableCell>

                                        <TableCell className="text-center" >
                                        <Input  value={row.quantityKg} placeholder="Kg" 
                                        onChange={(e) => 
                                            {
                                            handleRowChange(index,'quantityKg',e.target.value)}}  />     
                                        </TableCell>
                                        <TableCell className="text-center" >
                                        <Input  value={row.qunatityPc} placeholder="Pc." onChange={(e) => {handleRowChange(index,'qunatityPc',e.target.value)}}  />     
                                        </TableCell>


                                        <TableCell className="text-center">
                                        <button className="bg-red-400 text-grey-700 w-7 h-7  text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={()=>deleteRow(index)}><MdDelete size={20}/></button>
                                        </TableCell>
 
                                        </TableRow>

                </TableBody>
                            
                    </>
                        )
                   
                    })}

                    </Table>



                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
                </form>


            </div>

            <dialog id="packageMetrialReceve" className="dashboard-modal">
                <button id="packageMetrialRecivecross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Packaging Material is Received Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialReciveError" className="dashboard-modal">
                <button id="packagigreciveerrorcross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">Error In Receiving Packaging Material</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )
}

export default PackagingMetirialReceivingCreateForm;