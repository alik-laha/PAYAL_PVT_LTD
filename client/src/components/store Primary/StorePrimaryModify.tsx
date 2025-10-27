import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { SkuData, VendorData, storeprimaryData } from "@/type/type"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

import { TypeOnSection } from "../common/exportData";

interface Props {
    data: storeprimaryData;
}

const StorePrimaryModify = ({ data }: Props) => {

    const successdialog = document.getElementById('packageMetrialReceveUpdate') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialReciveErrorUpdate') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialRecivecrossUpdate') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigreciveerrorcrossUpdate') as HTMLInputElement;
    const [truck, settruck] = useState("")
    const [grossswt, setgrosswt] = useState("")
    const [netwt, setnetwt] = useState("")
    const [gatepassno, setgatepassno] = useState("")
    const [unit, setUnit] = useState("")
    const [errText, setErrText] = useState("")
    const [sku, setSku] = useState("")
    const [vendorName, setVendorName] = useState("")
    const [invoicedate, setinvoicedate] = useState("")
    const invoiceRef = useRef<HTMLInputElement>(null)
    
    const [skuview, setSkuView] = useState("none")
    const [vendorNameView, setVendorNameView] = useState("none")
    const [skudata, setSkuData] = useState<SkuData[]>([])
    const [vendorData, setVendorData] = useState<VendorData[]>([])
    const [date, setDate] = useState("")
    const quantityRef = useRef<HTMLInputElement>(null)
    const invoicequantityRef = useRef<HTMLInputElement>(null)
    const [remarks, setremarks] = useState("")
    const [rowWt, setrowwt] = useState<string>('')
    const [rowBill, setrowBill] = useState<string>('')
    const [type, settype] = useState<string>('')
    const [gateType, setgateType] = useState<string>('')
    const [isdisable,setisdisable]=useState<boolean>(false)
    useEffect(() => {
        setUnit(data.unit)
        setSku(data.sku)
        settruck(data.truckNo)
        setVendorName(data.vendorName)
        setgrosswt(data.grossWt)
        settype(data.type)
        data.netWeight?setnetwt(data.netWeight):setnetwt('')
        setgatepassno(data.gatePassNo)
        settype(data.type)
        setinvoicedate(data.invoicedate.slice(0, 10))
        quantityRef.current!.value = data.quantity.toString()
        invoiceRef.current!.value = data.invoice
        invoicequantityRef.current!.value = data.invoicequantity
        setremarks(data.remarks)
        setgateType(data.gateType)
        setrowwt(data.totalWt)
        setrowBill(data.totalBill)
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
        setisdisable(true)
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
            }).finally(()=>{
                setisdisable(false)
            })

    }
    const handleSkuchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSku(e.target.value)
        if (e.target.value.length > 0 && skudata.length > 0) {
            setSkuView("block")
        } else {
            setSkuView("none")
        }
        axios.post("/api/vendorSKU/skudatafind/Store", { sku: e.target.value,type:type })
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
        axios.post(`/api/vendorSKU/vendornamefind/Store/`, { vendorName: e.target.value,type:vendorType })
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
  
    const typesection='Store'


    return (
        <>
            <div className="px-2  max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
  <form className="flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
    {/* --- Basic Details Section --- */}
    <h2 className="text-md font-semibold text-blue-900 border-b pb-1 mb-2">GatePass Details</h2>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label>GatePass No.</Label>
        <Input className="text-center bg-yellow-100" value={gatepassno} readOnly required />
      </div>
      <div>
        <Label>GatePass Type</Label>
        <Input className="text-center bg-yellow-100" value={gateType} readOnly required />
      </div>
      <div>
        <Label>Vehicle No.</Label>
        <Input className="text-center bg-yellow-100" value={truck} readOnly required />
      </div>
      <div>
        <Label>Receiving Date</Label>
        <Input className="bg-yellow-100" type="date" value={date} required />
      </div>
      <div>
        <Label>{gateType === "IN" ? "Gross" : "Tare"} Wt. (Kg)</Label>
        <Input className="text-center bg-yellow-100" value={grossswt} readOnly required />
      </div>
      <div>
        <Label>Net Wt. (Kg)</Label>
        <Input className="text-center bg-yellow-100" value={netwt} readOnly required />
      </div>
    </div>

    {/* --- Invoice Section --- */}
    <h2 className="text-md font-semibold text-blue-900 border-b pb-1 mt-4 mb-2">Invoice Details</h2>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label>Invoice No</Label>
        <Input className="text-center" placeholder="Invoice No" ref={invoiceRef} required />
      </div>
      <div>
        <Label>Invoice Date</Label>
        <Input className="text-center" type="date" value={invoicedate} onChange={(e) => setinvoicedate(e.target.value)} required />
      </div>
     
    </div>

    {/* --- SKU Section --- */}
    <h2 className="text-md font-semibold text-blue-900 border-b pb-1 mt-4 mb-2">Material Details</h2>
    <div className="grid grid-cols-2 gap-3">
         <div>
        <Label>Material Type</Label>
        <select
          className="w-full text-center h-9 rounded-md border border-input bg-background px-3 text-sm 
          focus-visible:ring-1 focus-visible:ring-ring focus:outline-none"
          onChange={(e) => settype(e.target.value)}
          value={type}
          required
        >
          <option value="" disabled>Type</option>
          {typesection &&
            TypeOnSection[typesection as keyof typeof TypeOnSection].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
        </select>
      </div>
      <div className="relative">
        <Label>SKU</Label>
        <Input className="text-center" placeholder="SKU" required value={sku} onChange={handleSkuchange} />
        <ScrollArea
          className="absolute bg-white border rounded-md shadow-md max-h-28 w-full overflow-auto z-10"
          style={{ display: skuview }}
        >
          {skudata.map((item: SkuData) => (
            <div
              key={item.id}
              className="flex justify-between px-3 py-1 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleSkuidClick(item)}
            >
              <p className="font-medium text-blue-900 text-sm">{item.sku}</p>
              <p className="text-sm">{item.unit}</p>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="relative">
        <Label>{gateType === "IN" ? "Vendor" : "Party"} Name</Label>
        <Input className="text-center" placeholder="Name" required value={vendorName} onChange={handleVendorChange} />
        <ScrollArea
          className="absolute bg-white border rounded-md shadow-md max-h-28 w-full overflow-auto z-10"
          style={{ display: vendorNameView }}
        >
          {vendorData.map((item: VendorData) => (
            <div
              key={item.id}
              className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
              onClick={() => handleVendoridClick(item)}
            >
              <p className="font-medium text-blue-900 text-sm">{item.vendorName}</p>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>

    {/* --- Quantity & Other Details --- */}
    <h2 className="text-md font-semibold text-blue-900 border-b pb-1 mt-4 mb-2">Quantity & Misc</h2>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label>Invoice Qty</Label>
        <Input className="text-center" type="number" ref={invoicequantityRef} placeholder="Qty" step="0.01" required />
      </div>
      <div>
        <Label>Physical Qty</Label>
        <Input className="text-center" type="number" ref={quantityRef} placeholder="Qty" step="0.01" required />
      </div>
      <div>
        <Label>Unit</Label>
        <Input className="text-center bg-yellow-100" value={unit} onChange={(e) => setUnit(e.target.value)} required />
      </div>
      <div>
        <Label>Row Item Wt</Label>
        <Input className="text-center" type="number" value={rowWt} onChange={(e) => setrowwt(e.target.value)} step="0.01" />
      </div>
      <div>
        <Label>Bill Amount</Label>
        <Input className="text-center" type="number" value={rowBill} onChange={(e) => setrowBill(e.target.value)} step="0.01" />
      </div>
      <div>
        <Label>Remarks</Label>
        <Input className="text-center" placeholder="Remarks" value={remarks} onChange={(e) => setremarks(e.target.value)} />
      </div>
    </div>

    {/* --- Submit Button --- */}
    <div className="flex justify-center mt-6">
      <Button
        className="w-1/3 bg-orange-500 hover:bg-orange-600 transition-all duration-200 text-white font-semibold"
        disabled={isdisable}
      >
        {isdisable ? "Submitting..." : "Submit"}
      </Button>
    </div>
  </form>
</div>

            
            <dialog id="packageMetrialReceveUpdate" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="packageMetrialRecivecrossUpdate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">Modification Request Raised Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialReciveErrorUpdate" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="packagigreciveerrorcrossUpdate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errText}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )
}
export default StorePrimaryModify;