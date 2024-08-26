import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import React, { useEffect } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

import { useState } from "react"
import axios from "axios"
import { findskutypeData, VendorData } from "@/type/type"
import { ScrollArea } from "../ui/scroll-area"
interface AlmondPrimaryModifyProps {
    data: {
        approvedBy: string;
        id: number;
        recevingDate: string;
        noOfBags: string;
        truckNo: string;
        netWeight: string;
        editStatus: string;
        createdBy: string;
        gatePassNo:string;
        grossWt:string;
        status:number;
        systemBags:string;  
        gateType: string,
        invoicedate: string;  
        invoice: string;  
        grade: string;  
        type: string;  
        vendorName: string;  
        totalWt:string;  
        totalBill:string;  
    }
}


const AlmondModify = (props: AlmondPrimaryModifyProps) => {

    const [weight, setweight] = useState<string>("")
   
    const [gatePassNo, setgatePassNo] = useState<string>("")
    const [grossWt, setgrossWt] = useState<string>("")
    const [almondtype, setalmondtype] = useState<string>("")
    const [almondgrade, setalmondgrade] = useState<string>("")
    const [gatetype, setGateType] = useState<string>("")
    const [truckNo, setTruckNo] = useState<string>("")
    const [noOfBags, setNoOfBags] = useState<string>("")
    const [invoice, setinvoice] = useState<string>("")
    const [invoicedate, setinvoicedate] = useState<string>('')
    const [netWeight, setNetWeight] = useState<string>("")
    const [sku, setsku] = useState<findskutypeData[]>()
    const [grade, setGrade] = useState<findskutypeData[]>()
    const [billamt, setBillamt] = useState<string>("")
    
    const [errortext, setErrorText] = useState<string>("")
    const [date, setDate] = useState<Date>()

    const [VendorName, setVendorName] = useState<string>('')
    const [vendorNameView, setVendorNameView] = useState("none")
    const [vendorData, setVendorData] = useState<VendorData[]>([])

    const successdialog = document.getElementById('rcneditscsDialog') as HTMLInputElement;
    const errordialog = document.getElementById('rcnediterrDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('rcnscscloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('rcnerrorcloseDialog') as HTMLInputElement;

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
        axios.post(`/api/almondPrimary/updateAlmond/${props.data.id}`, { gatePassNo,gatetype,almondtype,almondgrade,
            grossWt, netWeight, truckNo, noOfBags,VendorNam: VendorName, weight, invoice, invoicedate,date,totalBill:billamt })
            .then((res) => {
                console.log(res)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
                setalmondtype('')
        setinvoice('')
        setinvoicedate('')
       
        setNoOfBags('')
    setweight('')

        setNetWeight('')
       
        setgrossWt('')
        setgatePassNo('')
        setTruckNo('')
        setGateType('')
        setVendorName('')

            }).catch((err) => {
                console.log(err)
                setErrorText(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            })
    }

    useEffect(() => {
        // console.log(typeof (props.data.date))
        // console.log(props.data.date)
        setalmondtype(props.data.type)
        setinvoice(props.data.invoice)
        setinvoicedate(props.data.invoicedate.slice(0,10))
        setalmondgrade(props.data.grade)
        setNoOfBags(props.data.noOfBags)
    setweight(props.data.totalWt)

        setNetWeight(props.data.netWeight)
        setDate(new Date(props.data.recevingDate))
        setgrossWt(props.data.grossWt)
        setgatePassNo(props.data.gatePassNo)
        setTruckNo(props.data.truckNo)
        setGateType(props.data.gateType)
        setVendorName(props.data.vendorName)
        setBillamt(props.data.totalBill)

    }, [])
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
        if(gatetype==='IN'){
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


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>
            <div className="flex mt-2"><Label className="w-2/4 mt-2">Gate Pass No.</Label>
                 <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Gate Pass No." value={gatePassNo} readOnly /> </div>
                 {/* <div className="flex "><Label className="w-2/4 mt-2">Gate Pass Type</Label>
                 <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Gate Type" value={gatetype} readOnly /> </div> */}
                 <div className="flex"><Label className="w-2/4 mt-2" > Truck No.</Label>
                    <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Truck No." value={truckNo} readOnly />
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Date of Receiving</Label>
                    <Input className="w-2/4 text-center bg-yellow-100 justify-center" placeholder="Date Of Receiving" type="date" value={date ? date.toISOString().split('T')[0] : '' } readOnly/>
                </div>
                {/* <div className="flex"><Label className="w-2/4 mt-2"> Gross Weight (Kg)</Label>
                    <Input className="w-2/4 text-center bg-yellow-100" placeholder="Gross Weight" type="number" value={grossWt} readOnly />
                </div>
                <div className="flex"><Label className="w-2/4 mt-2"> Net Weight (Kg)</Label>
                    <Input className="w-2/4 text-center bg-yellow-100" placeholder="Net Weight" type="number" value={netWeight} readOnly />
                </div> */}

                <div className="flex"><Label className="w-2/4 mt-2">Almond Type</Label>
                    <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setalmondtype(e.target.value)}
                        value={almondtype} required>
                        {/* <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Grade</option> */}
                        {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                        {sku ? (
                            sku.map((item: findskutypeData) => (
                                <option key={item.sku} value={item.sku}>{item.sku}</option>
                            ))
                        ) : null}
                    </select>
                    {/* <Input   placeholder="Origin"/>  */}</div>

                {gatetype === 'OUT' ? (<div className="flex"><Label className="w-2/4 mt-2">Almond Grade</Label>
                    <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setalmondgrade(e.target.value)}
                        value={almondgrade} required>
                        {/* <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Grade</option> */}
                        {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                        {grade ? (
                            grade.map((item: findskutypeData) => (
                                <option key={item.sku} value={item.sku}>{item.sku}</option>
                            ))
                        ) : null}
                    </select>
                    {/* <Input   placeholder="Origin"/>  */}</div>) : ''}  
                    <div className="flex"><Label className="w-2/4  pt-2">{gatetype==='IN'? 'Vendor': 'Party'} Name</Label>
                    <Input className="w-2/4 text-center" placeholder="Name" required value={VendorName} onChange={(e)=>{handleVendorChange(e)}} />    </div>
                    <ScrollArea className="max-h-28 w-2/4 overflow-scroll w-30 dropdown-content" style={{ display: vendorNameView}}>
                                                    {
                                                        vendorData.map((item: VendorData) => (
                                                            <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick( item)}>
                                                                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.vendorName}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </ScrollArea>
                    
                    
                  
                
                
                
                
                
                <div className="flex"><Label className="w-2/4 mt-2">Invoice No.</Label>
                    <Input className="w-2/4 text-center" placeholder="Invoice No" value={invoice} onChange={(e) => setinvoice(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 mt-2" >Invoice Date</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Invoice Date" value={invoicedate} onChange={(e) => setinvoicedate(e.target.value)} type="date"/> </div>
                    
                 {gatetype==='OUT' ? (<div className="flex"><Label className="w-2/4 mt-2" >Weight</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Row Weight" value={weight} onChange={(e) => setweight(e.target.value)} /> </div>):''}   
          
             
                
                <div className="flex">
                    <Label className="w-2/4 mt-2">Bag/Item Count</Label>
                    <Input className="w-2/4 text-center " placeholder="Total Bags" type="number" value={noOfBags} onChange={(e) => setNoOfBags(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Bill Amount</Label>
                    <Input className="w-2/4 text-center " placeholder="Bill Amount" type="number" value={billamt} onChange={(e) => setBillamt(e.target.value)} />
                </div>
              
               
                <Button className="bg-orange-500 mb-1 mt-1 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>

            <dialog id="rcneditscsDialog" className="dashboard-modal">
                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification of Almond Entry is Requested </p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="rcnediterrDialog" className="dashboard-modal">
                <button id="rcnerrorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>



        </div>
    )


}
export default AlmondModify