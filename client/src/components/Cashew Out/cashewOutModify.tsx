import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import React, { useEffect } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

import { useState } from "react"
import axios from "axios"
import { ScrollArea } from "../ui/scroll-area"
interface CashewOutModifyProps {
    data: {
        id: number;
        date: string; // ISO date string (e.g. "2025-05-12T00:00:00.000Z")
        gatePassNo: string;
        batchNo: string;
        partyName: string;
        gradeName: string;
        grossWt: string;
        truckNo: string;
        quantity: string;
        actualquantity: string;
        status: number;
        invoice: string;
        netWeight: string;
        noOfBags: string;
        noOfActualBags: string;
        origin: string;
        editStatus: string;
        createdBy: string;
        approvedBy: string;
    }
}




const CashewOutModify = (props: CashewOutModifyProps) => {


    const [invoice, setinvoice] = useState<string>("")
    const [netWeight, setNetWeight] = useState<string>("")
    const [gatePassNo, setgatePassNo] = useState<string>("")
    const [grossWt, setgrossWt] = useState<string>("")
    const [truckNo, setTruckNo] = useState<string>("")
    const [noOfBags, setNoOfBags] = useState<string>("")
    const [batchno, setBatchno] = useState<string>("")
    const [partyName, setPartyName] = useState<string>("")
    const [gradeName, setGradeName] = useState<string>("")
    const [noOfactualBags, setNoOfactualBags] = useState<string>("")
    const [quantity, setquantity] = useState<string>("")
    const [actquantity, setactquantity] = useState<string>("")
    const [origin, setorigin] = useState<string>("")
    const [date, setDate] = useState<Date>()

    const [errortext, setErrorText] = useState<string>("")
    const [isdisable, setisdisable] = useState<boolean>(false)
    const [lotdata, setLotData] = useState<any[]>([])
    const [lotview, setLotView] = useState("none")

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
        setisdisable(true)
        axios.post(`/api/cashewOut/updateCashewOut/${props.data.id}`, {
            gatePassNo,invoice,date,oldbatchNo:props.data.batchNo,
            grossWt, netWeight, truckNo, noOfBags, noOfactualBags,quantity,actquantity,origin,partyName,gradeName,batchno
        })
            .then((res) => {
                console.log(res)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }  
                setinvoice('')
                setNoOfBags('')
                setNoOfactualBags('')
                setNetWeight('')
                setPartyName('')
                setgrossWt('')
                setgatePassNo('')
                setTruckNo('')
               

            }).catch((err) => {
                console.log(err)
                setErrorText(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            }).finally(() => {
                setisdisable(false)
            })
    }

    useEffect(() => {
        // console.log(typeof (props.data.date))
        // console.log(props.data.date)

        setinvoice(props.data.invoice)
        setNoOfactualBags(props.data.noOfActualBags)
        setNoOfBags(props.data.noOfBags)
        setorigin(props.data.origin)
        setNetWeight(props.data.netWeight)
        setDate(new Date(props.data.date))
        setgrossWt(props.data.grossWt)
        setgatePassNo(props.data.gatePassNo)
        setTruckNo(props.data.truckNo)
        setPartyName(props.data.partyName)
        setGradeName(props.data.gradeName)
        setquantity(props.data.quantity)
        setactquantity(props.data.actualquantity)
        setBatchno(props.data.batchNo)

    }, [])



    const handleBatchNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
        setBatchno(e.target.value)
        setquantity('')
        setNoOfBags('')
        setorigin('')
        setGradeName('')
        setPartyName('')
        if (e.target.value.length > 0 && lotdata.length > 0) {
            setLotView("block")
        } else {
            setLotView("none")
        }
        axios.post("/api/cashewOut/findcompleteBatchNo", {
            LotNo: e.target.value,
        })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setLotData(res.data.skuData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setLotData([])


                }
            })

    }

    const handleBatchIdClick = (item: any) => {
        axios.post("/api/cashewOut/findcompleteBatchNo", {
            LotNo: item.BatchID
        })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setquantity(res.data.skuData[0].fulfillquantity)
                    setNoOfBags(res.data.skuData[0].convpackingquantity)
                    setorigin(res.data.skuData[0].origin)
                    setGradeName(res.data.skuData[0].gradeName)
                    setPartyName(res.data.skuData[0].vendorName)
                }

            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setBatchno('')
                }
            })
        setBatchno(item.BatchID)
        setLotData([]);
        setLotView("none");
    };


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>
                <div className="flex mt-2"><Label className="w-2/4 mt-2">Gate Pass No.</Label>
                    <Input className="w-2/4 bg-yellow-200 text-center" placeholder="Gate Pass No." value={gatePassNo} readOnly /> </div>

                <div className="flex"><Label className="w-2/4 mt-2" > Truck No.</Label>
                    <Input className="w-2/4 bg-yellow-200 text-center" placeholder="Truck No." value={truckNo} readOnly />
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Date of Receiving</Label>
                    <Input className="w-2/4 text-center bg-yellow-200 justify-center" placeholder="Date Of Receiving" type="date" value={date ? date.toISOString().split('T')[0] : ''} readOnly />
                </div>
                <div className="flex"><Label className="w-2/4 mt-2"> Gross Weight (Kg)</Label>
                    <Input className="w-2/4 text-center bg-yellow-200" placeholder="Gross Weight" type="number" value={grossWt} readOnly />
                </div>
                {/*<div className="flex"><Label className="w-2/4 mt-2"> Net Weight (Kg)</Label>
                    <Input className="w-2/4 text-center bg-yellow-100" placeholder="Net Weight" type="number" value={netWeight} readOnly />
                </div> */}

                
                    

                   <div className="flex"><Label className="w-2/4  pt-2">Batch No</Label>
                    <Input className="w-2/4 text-center bg-cyan-100 font-semibold" placeholder="Batch No" required value={batchno} onChange={(e) => { handleBatchNoChange(e) }} />
                    
                        </div>
                <ScrollArea className="max-h-28 w-2/4 overflow-scroll w-30 dropdown-content" style={{ display: lotview }}>
                    {
                        lotdata.map((item: any) => (
                            <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleBatchIdClick(item)}>
                                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.BatchID}</p>
                            </div>
                        ))
                    }
                </ScrollArea>
                
                    
                     <div className="flex"><Label className="w-2/4 mt-2">Invoice No.</Label>
                        <Input className="w-2/4 text-center" placeholder="Invoice No" value={invoice} onChange={(e) => setinvoice(e.target.value)} />
                      </div>  
                <div className="flex"><Label className="w-2/4 mt-2" >Party Name</Label>
                    <Input className="w-2/4 text-center justify-center bg-yellow-100" placeholder="Party Name" value={partyName} readOnly required /> </div>

                <div className="flex"><Label className="w-2/4 mt-2" >Grade Name</Label>
                    <Input className="w-2/4 text-center justify-center bg-yellow-100" placeholder="Grade Name" value={gradeName} readOnly required /> </div> 

                <div className="flex"><Label className="w-2/4 mt-2">Origin</Label>
                                      <Input className="w-2/4 text-center justify-center bg-yellow-100" placeholder="Origin" value={origin} readOnly required /> </div> 

                <div className="flex">
                    <Label className="w-2/4 mt-2">Pouch/Bucket Count</Label>
                    <Input className="w-2/4 text-center bg-yellow-100" placeholder="Pouch/Bucket" type="number" value={noOfBags} required readOnly />
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Map Weight</Label>
                    <Input className="w-2/4 text-center bg-yellow-100" placeholder="Kg" type="number" value={quantity} required readOnly />
                </div>

                <div className="flex">
                                    <Label className="w-2/4 mt-2">Actual Pouch/Bucket Count</Label>
                                    <Input className="w-2/4 text-center " placeholder="Pouch/Bucket" type="number" value={noOfactualBags} onChange={(e) => setNoOfactualBags(e.target.value)} />
                                </div>

                <div className="flex">
                                    <Label className="w-2/4 mt-2">Actual Row Weight</Label>
                                    <Input className="w-2/4 text-center " placeholder="kg" type="number" value={actquantity} onChange={(e) => setactquantity(e.target.value)} />
                                </div>


                <Button className="bg-orange-500 mb-1 mt-1 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable ? 'Submitting' : 'Submit'}</Button>
            </form>

            <dialog id="rcneditscsDialog" className="dashboard-modal">
                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification of Cashew Out Entry is Requested </p></span>

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
export default CashewOutModify