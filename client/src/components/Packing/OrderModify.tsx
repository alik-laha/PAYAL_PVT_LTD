import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { useState,  useEffect } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FY, Origin } from "../common/exportData";

interface Props {
    mapping: any[]       
}

const OrderModify = (props:Props) => {

    const successdialog = document.getElementById('packageMetrialReceveUpdate') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialReciveErrorUpdate') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialRecivecrossUpdate') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigreciveerrorcrossUpdate') as HTMLInputElement;
    const [id, setid] = useState<number>()
    const [origin, setOrigin] = useState("")
    const [orderid, setOrderID] = useState("")
    const [orderDate, setOrderDate] = useState("")
    const [invDate, setInvDate] = useState("")
    const [gradeName, setgradeName] = useState<string>('')
    const [vendor, setVendor] = useState("")
    const [broker, setBroker] = useState("")
    const [quantity, setQuantity] = useState("")
    const [gst, setGst] = useState<boolean>()
    const [totalBill, setTotalBill] = useState("")
    
    const [unitRate, setUnitRate] = useState("")
    const [remarks, setremarks] = useState("")
   
   
   const [gradeview, setGradeView] = useState("none")
   const [gradeData, setGradeData] = useState<any[]>([])
    const [errText, setErrText] = useState("")
    const fy=FY?FY:'2026-27'
    
    const [isdisable,setisdisable]=useState<boolean>(false)
    useEffect(() => {
        console.log(props.mapping[0])
        setid(props.mapping[0].id)
        setOrigin(props.mapping[0].origin)
        setOrderID(props.mapping[0].orderID)
        setOrderDate(props.mapping[0].orderDate.slice(0,10))
        setInvDate(props.mapping[0].orderInvDate.slice(0,10))
        setgradeName(props.mapping[0].gradeName)
        setVendor(props.mapping[0].vendorName)
        setBroker(props.mapping[0].brokerName)
        setQuantity(props.mapping[0].quantity)
        setGst(props.mapping[0].gst)
        setUnitRate(props.mapping[0].unitRate)
        setremarks(props.mapping[0].remarks)
        setTotalBill(props.mapping[0].totalBill)
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
        // if(Number(quantity)<Number(mapqty)
        //    ){
        //        setErrText('Demand Quantity should be greater than or equal to Mapping Quantity')       
        //        const dialogerror = document.getElementById("packagingMetirialReciveErrorUpdate") as HTMLDialogElement
        //        dialogerror.showModal()
        //       // console.log(rows)
        //        return
        //    }
        setisdisable(true)
        console.log("submit")
        axios.put(`/api/packing/modifyOrder/${id}`, { 
           origin,gradeName,orderDate,invDate,vendor,
           broker,quantity,gst,totalBill,
           unitRate,remarks,fy,changeqty:(Number(props.mapping[0].quantity||0)-Number(quantity)),
           mappingStatus:props.mapping[0].ordMappingStatus})
            .then((res) => {
                if (res.status === 200) {
                    setErrText(res.data.message)
                    if (successdialog) {
                        (successdialog as any).showModal();
                    }
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
  
    const handleGradechange = ( e: React.ChangeEvent<HTMLInputElement>) => {
       setgradeName(e.target.value)
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

    const handleGradeidClick = ( item: any) => {
        // setSku(item.sku)
        setgradeName(item.sku)
        setGradeView("none")
    }

    return (
        <>
             <div className="pl-10 pr-10 mt-4 max-h-80 overflow-y-scroll" >
                <form className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
                <div className="flex"><Label className="w-2/4  pt-1">Order ID</Label>
                <Input className="w-2/4 text-center bg-yellow-100" placeholder="Order ID" value={orderid} readOnly required /> </div>
                
                <div className="flex"><Label className="w-2/4 pt-1">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)} >
                        <SelectTrigger className="w-2/4 justify-center">
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
                    {/* <Input   placeholder="Origin"/>  */}</div>
                
                <div className="flex"><Label className="w-2/4  pt-1">Final Grade</Label>
                        <Input className="w-2/4 text-center" placeholder="Grade" value={gradeName} onChange={ handleGradechange}  required/> </div>  
                        <ScrollArea className="max-h-24 w-auto overflow-scroll  
                                                dropdown-content" style={{ display: gradeview }}>
                                                        {
                                                            gradeData.map((item: any) => (
                                                                <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3"
                                                                    onClick={() => handleGradeidClick(item)}>
                                                                    <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.sku}</p>

                                                                </div>
                                                            ))
                                                        }
                                                    </ScrollArea>
                    <div className="flex"><Label className="w-2/4  pt-1">Order Receiving Date</Label>
                        <Input className="w-2/4 justify-center " placeholder="Receiving Date" value={orderDate} onChange={(e)=> setOrderDate(e.target.value)} required type="date" /> </div>
                        
                        <div className="flex"><Label className="w-2/4  pt-1">Order Entry Date</Label>
                        <Input className="w-2/4 justify-center " placeholder="Entry Date" value={invDate} onChange={(e)=> setInvDate(e.target.value)} required type="date" /> </div>
                        
                       
                        <div className="flex"><Label className="w-2/4  pt-1">Vendor</Label>
                        <Input className="w-2/4 text-center " placeholder="Vendor" value={vendor} onChange={(e)=> setVendor(e.target.value)} required/> </div>  

                        <div className="flex"><Label className="w-2/4  pt-1">Broker</Label>
                        <Input className="w-2/4 text-center " placeholder="Broker" value={broker} onChange={(e)=> setBroker(e.target.value)} required/> </div>  

                       {props.mapping[0].ordMappingStatus===0 ?
                       <div className="flex"><Label className="w-2/4  pt-1">Demand Quantity</Label>
                        <Input className="w-2/4 text-center " placeholder="Quantity" value={quantity} onChange={(e)=> setQuantity(e.target.value)} required/> </div> :
                         <div className="flex"><Label className="w-2/4  pt-1">Demand Quantity <p className="font-bold text-red-700"> (Order Mapping is Done Already, It can't be Changed, Delete Order Mapping First)</p></Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Quantity" value={quantity} readOnly required/> </div>} 
                        

                        <div className="flex"><Label className="w-2/4  pt-1">Unit rate</Label>
                        <Input className="w-2/4 text-center " placeholder="Unit Rate" value={unitRate} onChange={(e)=> setUnitRate(e.target.value)} required/> </div>


                        <div className="flex"><Label className="w-2/4 ">GST</Label>
                        <Input type='checkbox' className="w-2/4 h-5 text-center " placeholder="GST" checked={gst} onChange={(e)=> setGst(e.target.checked)} /> </div>
                        
                        <div className="flex"><Label className="w-2/4  pt-1">Total Bill</Label>
                        <Input className="w-2/4 text-center " placeholder="Quantity" value={totalBill} onChange={(e)=> setTotalBill(e.target.value)} required/> </div>

                        <div className="flex"><Label className="w-2/4  pt-1">Remarks</Label>
                        <textarea className="w-2/4 text-center " placeholder="Remarks" value={remarks} onChange={(e)=> setremarks(e.target.value)} /> </div>

                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                </form>


            </div>
            
            <dialog id="packageMetrialReceveUpdate" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="packageMetrialRecivecrossUpdate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errText}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialReciveErrorUpdate" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="packagigreciveerrorcrossUpdate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-red-500">{errText}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )
}
export default OrderModify;