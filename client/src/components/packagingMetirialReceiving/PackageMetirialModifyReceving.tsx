import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkuData, VendorData, PackageMaterialReceivingData } from "@/type/type"

const PackageMaterialReceivingModify = ({ data }: PackageMaterialReceivingData) => {
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

    const handleSubmit = () => {
        console.log("submit")
    }
    const handleSkuchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSku(e.target.value)
        if (e.target.value.length > 0 && skudata.length > 0) {
            setSkuView("block")
        } else {
            setSkuView("none")
        }

    }
    const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVendorName(e.target.value)
        if (e.target.value.length > 0 && vendorData.length > 0) {
            setVendorNameView("block")
        } else {
            setVendorNameView("none")
        }
    }
    const handleSkuidClick = (item: SkuData) => {
        setSku(item.sku)
        setSkuView("none")
    }
    const handleVendoridClick = (item: VendorData) => {
        setVendorName(item.vendorName)
        setVendorNameView("none")
    }


    return (
        <>
            <div className="pl-10 pr-10">
                <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

                    <div className="flex"><Label className="w-2/4  pt-1">Receiving Date</Label>
                        <Input className="w-2/4 " placeholder="Receiving Date" required value={date} onChange={(e) => setDate(e.target.value)} type="date" /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">SKU</Label>
                        <Input className="w-2/4 " placeholder="SKU" required value={sku} onChange={handleSkuchange} /> </div>
                    <ScrollArea className="h-30 w-30 dropdown-content" style={{ display: skuview }}>
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

                    <ScrollArea className="h-30 w-30 dropdown-content" style={{ display: vendorNameView }}>
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
                        <Select value={unit} onValueChange={(value) => setUnit(value)} required={true}>
                            <SelectTrigger className="w-2/4">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>

                                    <SelectItem value="kg">
                                        KG
                                    </SelectItem>
                                    <SelectItem value="pcs">
                                        PCS
                                    </SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
                </form>
            </div>
        </>
    )
}
export default PackageMaterialReceivingModify;