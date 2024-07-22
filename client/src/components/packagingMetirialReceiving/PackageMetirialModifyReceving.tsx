import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkuData, VendorData, PackageMaterialReceivingData } from "@/type/type"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

interface Props {
    data: PackageMaterialReceivingData;
}

const PackageMaterialReceivingModify = ({ data }: Props) => {

    const successdialog = document.getElementById('packageMetrialReceveUpdate') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialReciveErrorUpdate') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialRecivecrossUpdate') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigreciveerrorcrossUpdate') as HTMLInputElement;

    const [unit, setUnit] = useState("")
    const [errText, setErrText] = useState("")
    const [sku, setSku] = useState("")
    const [vendorName, setVendorName] = useState("")
    const [skuview, setSkuView] = useState("none")
    const [vendorNameView, setVendorNameView] = useState("none")
    const [skudata, setSkuData] = useState<SkuData[]>([])
    const [vendorData, setVendorData] = useState<VendorData[]>([])
    const [date, setDate] = useState("")
    const quantityRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setUnit(data.unit)
        setSku(data.sku)
        setVendorName(data.vendorName)
        quantityRef.current!.value = data.quantity.toString()
        setDate(data.recevingDate.slice(0, 10))
        console.log(data.recevingDate.slice(0, 10))
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
        axios.post(`/api/quality/editrecevingpackagematerial/${data.id}`, { recevingDate: date, sku, vendorName, quantity: quantityRef.current?.value, unit })
            .then((res) => {
                if (res.status === 201) {
                    (errordialog as any).showModal();
                }
            }
            )
            .catch((err) => {
                console.log(err)
                const errorText = err.response.data.message;
                setErrText(errorText);
                (successdialog as any).showModal();
            })

    }
    const handleSkuchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSku(e.target.value)
        if (e.target.value.length > 0 && skudata.length > 0) {
            setSkuView("block")
        } else {
            setSkuView("none")
        }
        axios.post("/api/quality/skudatafind", { sku: e.target.value })
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
        axios.post("/api/quality/vendornamefind", { vendorName: e.target.value })
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
        setUnit(item.unit)
        setSkuView("none")
    }
    const handleVendoridClick = (item: VendorData) => {
        setVendorName(item.vendorName)
        setVendorNameView("none")
    }


    return (
        <>
             <div className="pl-10 pr-10 mt-6">
                <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

                    <div className="flex"><Label className="w-2/4  pt-1">Receiving Date</Label>
                        <Input className="w-2/4 justify-center" placeholder="Receiving Date" value={date} onChange={(e)=>setDate(e.target.value)}required type="date" /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">SKU</Label>
                        <Input className="w-2/4 " placeholder="SKU" required value={sku} onChange={handleSkuchange} /> </div>
                    <ScrollArea className="max-h-24 overflow-scroll w-30 dropdown-content" style={{ display: skuview }}>
                        {
                            skudata.map((item: SkuData) => (
                                <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleSkuidClick(item)}>
                                    <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.sku}</p>
                                    <p className="text-sm py-1 focus:text-base">{item.unit}</p>
                                </div>
                            ))
                        }
                    </ScrollArea>

                    <div className="flex"><Label className="w-2/4  pt-1">Vendor Name</Label>
                        <Input className="w-2/4 " placeholder="Vendor Name" required value={vendorName} onChange={handleVendorChange} /> </div>

                    <ScrollArea className="max-h-24 overflow-scroll w-30 dropdown-content" style={{ display: vendorNameView }}>
                        {
                            vendorData.map((item: VendorData) => (
                                <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick(item)}>
                                    <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.vendorName}</p>
                                </div>
                            ))
                        }
                    </ScrollArea>

                    <div className="flex"><Label className="w-2/4  pt-1">Quantity</Label>
                        <Input className="w-2/4 " placeholder="Quantity" required type="number" ref={quantityRef} /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Unit</Label>

                    <select className=' flex h-8 w-2/4 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 
                    disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        onChange={(e) => setUnit(e.target.value)} value={unit} required>
                        <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
                        focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value='' disabled>unit</option>
                       
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                             value="Kg">
                                Kg
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                             value="pcs">
                                Pcs
                            </option>
                       
                    </select>

                        
                    </div>

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
export default PackageMaterialReceivingModify;