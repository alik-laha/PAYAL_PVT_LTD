import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { findskutypeData, RcvVillagePrimaryEntryData, SkuData, VendorData } from "@/type/type"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

import { TypeOnSection } from "../common/exportData";

interface Props {
    data: RcvVillagePrimaryEntryData;
}

const RcvVillageModify = ({ data }: Props) => {

    const successdialog = document.getElementById('packageMetrialReceveUpdate') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialReciveErrorUpdate') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialRecivecrossUpdate') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigreciveerrorcrossUpdate') as HTMLInputElement;
    const [truck, settruck] = useState("")
    const [grossswt, setgrosswt] = useState("")
    const [netwt, setnetwt] = useState("")
    const [gatepassno, setgatepassno] = useState("")
   
    const [errText, setErrText] = useState("")
    const [sku,setsku]=useState<findskutypeData[]>([])
    const [vendorName, setVendorName] = useState("")
   
    const invoiceRef = useRef<HTMLInputElement>(null)
    
    const [skuview, setSkuView] = useState("none")
    const [vendorNameView, setVendorNameView] = useState("none")
    const [skudata, setSkuData] = useState<SkuData[]>([])
    const [vendorData, setVendorData] = useState<VendorData[]>([])
    const [date, setDate] = useState("")
    const quantityRef = useRef<HTMLInputElement>(null)
    
    const [remarks, setremarks] = useState("")
    const [rowWt, setrowwt] = useState<string>('')
   
    const [type, settype] = useState<string>('')
    const [gateType, setgateType] = useState<string>('')

    useEffect(() => {
        settruck(data.truckNo)
        setVendorName(data.vendorName)
        setgrosswt(data.grossWt)
        settype(data.type)
        data.netWeight?setnetwt(data.netWeight):setnetwt('')
        setgatepassno(data.gatePassNo)
        quantityRef.current!.value = data.quantity.toString()
        invoiceRef.current!.value = data.invoice
        setremarks(data.remarks)
        setgateType(data.gateType)
        setrowwt(data.totalWt)
        setDate(data.recevingDate.slice(0, 10))
        console.log(data.recevingDate.slice(0, 10))
    }, [])


    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Type',{section:'Village'})
            .then(res => {
                //console.log(res.data)
                setsku(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

    const [grade,setGrade]=useState<findskutypeData[]>([])
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Name',{section:'Village'})
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

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
        console.log("submit")
        axios.post(`/api/storePrimary/editStorePrimary/${data.id}`, { 
            grossswt,netwt,gateType,recevingDate:date,truck,gatepassno, invoicedate,invoice:invoiceRef.current?.value, type,sku,vendorName, 
            quantity: quantityRef.current?.value,invoicequantity:invoicequantityRef.current?.value, unit,totalWt:rowWt,remarks,totalBill:rowBill })
            .then((res) => {
                if (res.status === 201) {
                    (successdialog as any).showModal();
                }
            }
            )
            .catch((err) => {
                console.log(err)
                const errorText = err.response.data.message;
                setErrText(errorText);
                (errordialog as any).showModal();
            })

    }
    const handleSkuchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSku(e.target.value)
        if (e.target.value.length > 0 && skudata.length > 0) {
            setSkuView("block")
        } else {
            setSkuView("none")
        }
        axios.post("/api/vendorSKU/skudatafind/Village", { sku: e.target.value,type:type })
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
        setVendorName(e.target.value)
        if (e.target.value.length > 0 && vendorData.length > 0) {
            setVendorNameView("block")
        } else {
            setVendorNameView("none")
        }
        let vendorType:string;
        if(gateType==='IN'){
            vendorType='Vendor'
        }
        else{

             vendorType='Party'
        }
        axios.post(`/api/vendorSKU/vendornamefind/Village/`, { vendorName: e.target.value,type:vendorType })
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
    const handleSkuidClick = (item: SkuData) => {
        setSku(item.sku)
       
        setSkuView("none")
    }
    const handleVendoridClick = (item: VendorData) => {
        setVendorName(item.vendorName)
        setVendorNameView("none")
    }
  
    const typesection='Village'


    return (
        <>
             <div className="pl-10 pr-10 mt-3 max-h-80 overflow-y-scroll">
                <form className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
                <div className="flex"><Label className="w-2/4  pt-1">GatePass No.</Label>
                <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassNo." value={gatepassno} readOnly required /> </div>
                
                <div className="flex"><Label className="w-2/4  pt-1">GatePass Type</Label>
                <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassType" value={gateType} readOnly required /> </div>
                <div className="flex"><Label className="w-2/4  pt-1">Date</Label>
                <Input className="w-2/4 justify-center bg-yellow-100" placeholder="Receiving Date" value={date} required type="date" /> </div>
                <div className="flex"><Label className="w-2/4  pt-1">Vehicle No.</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassNo." value={truck} readOnly required /> </div>  
                   
                        
                        <div className="flex"><Label className="w-2/4  pt-1">{gateType==='IN'?'Gross':'Tare'} Wt.(Kg)</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Gross/Tare Wt." value={grossswt} readOnly required /> </div>        
                        
                        <div className="flex"><Label className="w-2/4  pt-1">Net Wt.(Kg)</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Nt Wt." value={netwt} readOnly required /> </div>  

                        <div className="flex"><Label className="w-2/4  pt-1">Doc No</Label>
                        <Input className="w-2/4 text-center" placeholder="Invoice No" required  ref={invoiceRef} /> </div>
                        <div className="flex"><Label className="w-2/4  pt-1">{gateType==='IN'? 'Vendor':'Party'} Name</Label>
                        <Input className="w-2/4 text-center" placeholder="Name" required value={vendorName} onChange={handleVendorChange} /> </div>

                    <ScrollArea className="max-h-24 w-2/4 overflow-scroll w-30 dropdown-content" style={{ display: vendorNameView }}>
                        {
                            vendorData.map((item: VendorData) => (
                                <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick(item)}>
                                    <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.vendorName}</p>
                                </div>
                            ))
                        }
                    </ScrollArea>
                        
                        <div className="flex"><Label className="w-2/4  pt-1">Item Type</Label>
                        <select className="text-center flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => settype(e.target.value())}
                                                    value={type} required>
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
                                                </select></div>
                     
                    <div className="flex"><Label className="w-2/4  pt-1">SKU</Label>
                        <Input className="w-2/4 text-center" placeholder="SKU" required value={sku} onChange={handleSkuchange} /> </div>
                    <ScrollArea className="max-h-24 w-2/4 overflow-scroll w-30 dropdown-content" style={{ display: skuview }}>
                        {
                            skudata.map((item: SkuData) => (
                                <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleSkuidClick(item)}>
                                    <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.sku}</p>
                                    <p className="text-sm py-1 focus:text-base">{item.unit}</p>
                                </div>
                            ))
                        }
                    </ScrollArea>

                   
                    

                    <div className="flex"><Label className="w-2/4  pt-1">Physical Qty</Label>
                        <Input className="w-2/4 text-center" placeholder="Qty" required type="number" ref={quantityRef} step='0.01'/> </div>
                       
                        <div className="flex"><Label className="w-2/4  pt-1">Row Item Wt</Label>
                        <Input className="w-2/4 text-center" placeholder="Wt"  type="number" value={rowWt} step='0.01' onChange={(e)=> setrowwt(e.target.value)}/> </div>
                       
                        
                        <div className="flex"><Label className="w-2/4  pt-1">Remarks</Label>
                        <Input className="w-2/4 text-center" placeholder="remarks"   value={remarks} onChange={(e)=> setremarks(e.target.value)}/> </div>
                   






                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
                </form>


            </div>
            
            <dialog id="packageMetrialReceveUpdate" className="dashboard-modal">
                <button id="packageMetrialRecivecrossUpdate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification Request Raised Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialReciveErrorUpdate" className="dashboard-modal">
                <button id="packagigreciveerrorcrossUpdate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errText}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )
}
export default RcvVillageModify;