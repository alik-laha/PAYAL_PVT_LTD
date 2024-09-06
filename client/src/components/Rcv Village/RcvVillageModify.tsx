import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { findskutypeData, RcvVillagePrimaryEntryData, VendorData } from "@/type/type"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Textarea } from "../ui/textarea";


interface Props {
    data: RcvVillagePrimaryEntryData;
}

const RcvVillageModify = ({ data }: Props) => {

    const successdialog = document.getElementById('packageMetrialReceveUpdate') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialReciveErrorUpdate') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialRecivecrossUpdate') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigreciveerrorcrossUpdate') as HTMLInputElement;
    const [vendorNameView, setVendorNameView] = useState("none")
    const [vendorData, setVendorData] = useState<VendorData[]>([])
    const invoiceref = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)
    const [date, setDate] = useState<string>('')
    const [gateType, setgateType] = useState<string>('')
    const [gatepass, setGatePass] = useState<string>('')
    const [grossWt, setGrossWt] = useState<string>('')
    const [truck, settruck] = useState<string>('')
    const [VendorName, setVendorName] = useState<string>('')
    const [remarks, setRemarks] = useState<string>('')
    const [netwt, setnetwt] = useState<string>('')
    const [itemtype, setItemType] = useState<string>('')
    const [itemname, setItemname] = useState<string>('')
    const [totalWt, setTotalWt] = useState<string>('')
    const [sku, setsku] = useState<findskutypeData[]>([])
    const [grade, setGrade] = useState<findskutypeData[]>([])
    const [errText, setErrText] = useState<string>('')
    const [isdisable,setisdisable]=useState<boolean>(false)


    useEffect(() => {
        settruck(data.truckNo)
        setVendorName(data.vendorName)
        setGrossWt(data.grossWt)
        setItemType(data.type)
        setItemname(data.sku)
        data.netWeight ? setnetwt(data.netWeight) : setnetwt('')
        setGatePass(data.gatePassNo)
        invoiceref.current!.value = data.invoice
        quantityRef.current!.value=data.quantity
        setRemarks(data.remarks)
        setgateType(data.gateType)
        setTotalWt(data.totalWt)
        setDate(data.recevingDate.slice(0, 10))
        // console.log(data.recevingDate.slice(0, 10))
    }, [])


    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Type', { section: 'Village' })
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
        axios.put('/api/vendorSKU/getItembySection/Item Name', { section: 'Village' })
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
    const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //handleRowChange(index,'vendorName',e.target.value)
        setVendorName(e.target.value)
        //setActvindex(index)
        if (e.target.value.length > 0 && vendorData.length > 0) {
            setVendorNameView("block")
        } else {
            setVendorNameView("none")
        }
        let vendortype: string;
        if (gateType === 'IN') {
            vendortype = 'Vendor'
        } else {
            vendortype = 'Party'
        }
        axios.post(`/api/vendorSKU/vendornamefind/Village/`, { vendorName: e.target.value, type: vendortype })
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

    const handleVendoridClick = (item: VendorData) => {
        setVendorName(item.vendorName)
        //handleRowChange(index,'vendorName',item.vendorName)
        setVendorNameView("none")
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setisdisable(true)
        console.log("submit")
        axios.post(`/api/rcvVillage/editVillagePrimary/${data.id}`, {
            grossWt, netwt, gateType, recevingDate: date, 
            truck, gatepass, invoice: invoiceref.current?.value, 
            itemtype, itemname, VendorName,
            quantity: quantityRef.current?.value, totalWt, remarks
        })
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
            .finally(()=>{
                setisdisable(false)
            })

    }





    return (
        <>
            <div className="pl-10 pr-10 mt-3 max-h-80 overflow-y-scroll">
                <form className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
                    <div className="flex"><Label className="w-2/4  pt-1">GatePass No.</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassNo." value={gatepass} readOnly required /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">GatePass Type</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassType" value={gateType} readOnly required /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Date</Label>
                        <Input className="w-2/4 justify-center bg-yellow-100" placeholder="Receiving Date" value={date} required type="date" /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Vehicle No.</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassNo." value={truck} readOnly required /> </div>


                    <div className="flex"><Label className="w-2/4  pt-1">{gateType === 'IN' ? 'Gross' : 'Tare'} Wt.(Kg)</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Gross/Tare Wt." value={grossWt} readOnly required /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Net Wt.(Kg)</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Nt Wt." value={netwt} readOnly required /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Doc No</Label>
                        <Input className="w-2/4 text-center" placeholder="Invoice No" required ref={invoiceref} /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">{gateType === 'IN' ? 'Vendor' : 'Party'} Name</Label>
                        <Input className="w-2/4 text-center" placeholder="Name" required value={VendorName} onChange={handleVendorChange} /> </div>

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
                        <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setItemType(e.target.value)}
                            value={itemtype} required>
                            <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Type</option>
                            {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                            {sku ? (
                                sku.map((item: findskutypeData) => (
                                    <option key={item.sku} value={item.sku}>{item.sku}</option>
                                ))
                            ) : null}
                        </select></div>

                    <div className="flex"><Label className="w-2/4  pt-1">Item Name</Label>
                        <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setItemname(e.target.value)}
                            value={itemname} required>
                            <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Name</option>
                            {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                            {grade ? (
                                grade.map((item: findskutypeData) => (
                                    <option key={item.sku} value={item.sku}>{item.sku}</option>
                                ))
                            ) : null}
                        </select>
                    </div>





                    <div className="flex"><Label className="w-2/4  pt-1">Item/Bag Count</Label>
                        <Input className="w-2/4 text-center" placeholder="Qty" required type="number" ref={quantityRef} step='0.01' /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Item Wt</Label>
                        <Input className="w-2/4 text-center" placeholder="Wt" type="number" value={totalWt } step='0.01' onChange={(e) => setTotalWt(e.target.value)} /> </div>


                    <div className="flex"><Label className="w-2/4  pt-1">Remarks</Label>
                        <Textarea className="w-2/4 text-center" placeholder="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} /> </div>







                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
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