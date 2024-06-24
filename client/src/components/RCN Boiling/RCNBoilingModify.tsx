import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Origin } from "../common/exportData"
import React, { useEffect } from "react"
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
import { useState } from "react"
import axios from "axios"
interface RcnPrimaryModifyProps {
    data: {
        id: number;
        LotNo: string;
        date: string;
        origin: string;
        SizeName: string;
        Size: string;
        Scooping_Line_Mc: string;
        Pressure: 56;
        CookingTime: string;
        MCName: string;
        Mc_on: string;
        Mc_off: string;
        noOfEmployees: string;
        Mc_breakdown: string;
        otherTime: string;
        CreatedBy: string;
        editStatus: string;
        Mc_runTime: string;
        modifiedBy: string;
    }
}


const RCNBoilingModify = (props: RcnPrimaryModifyProps) => {

    const [origin, setOrigin] = useState<string>("")
    const [LotNo, setLotNo] = useState<string>("")
    const [date, setDate] = useState('')
    const [sizename, setsizename] = useState<string>("")
    const [size, setsize] = useState<string>("")
    const [scopline, setscopline] = useState<string>("")
    const [presr, setpresr] = useState<string>("")
   
    const [Mc_on, setMc_on] = useState('')
    const [Mc_off, setMc_off] = useState('')
    const [noOfEmployees, setNoOfEmployees] = useState<number>()
    const [Mc_breakdown, setMc_breakdown] = useState('00:00')
    const [otherTime, setOtherTime] = useState('00:00')
    const [errortext, setErrortext] = useState<string>('')


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
        axios.put(`/api/rcnprimary/update/${props.data.id}`, { origin, blNo, conNo, truckNo, noOfBags, blWeight, netWeight, date })
            .then((res) => {
                console.log(res)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
                setBlNo('')
                setConNo('')
                setTruckNo('')
                setBlWeight('')
                setNetWeight('')
                setNoOfBags('')
                setOrigin('')

            }).catch((err) => {
                console.log(err)
                setErrorText(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            })
    }

    useEffect(() => {
        setOrigin(props.data.origin)
        setDate(new Date(props.data.date).toISOString().slice(0, 10))
        
        setMc_name(props.data.Mc_name)
        setMc_on(props.data.Mc_on)
        setMc_off(props.data.Mc_off)
        setNoOfEmployees(props.data.noOfEmployees)
        setMc_breakdown(props.data.Mc_breakdown)
        setOtherTime(props.data.otherTime)
        setLotNo(props.data.LotNo)
    }, [])


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                <div className="flex mt-8"><Label className="w-2/4 ">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
                        <SelectTrigger className="w-2/4 ">
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
                <div className="flex"><Label className="w-2/4 ">BL No.</Label>
                    <Input className="w-2/4 " placeholder="BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 " >Container No.</Label>
                    <Input className="w-2/4 " placeholder="Container No." value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 " > Truck No.</Label>
                    <Input className="w-2/4 " placeholder="Truck No." value={truckNo} onChange={(e) => setTruckNo(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 ">Date of Reciving</Label>
                    <Input className="w-2/4 " placeholder="Date Of Receiving" type="date" value={date ? date.toISOString().split('T')[0] : ''} onChange={(e) => setDate(new Date(e.target.value))} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 ">Total Bags</Label>
                    <Input className="w-2/4 " placeholder="Total Bags" type="number" value={noOfBags} onChange={(e) => setNoOfBags(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 "> BL Weight</Label>
                    <Input className="w-2/4 " placeholder="BL Weight" type="number" value={blWeight} onChange={(e) => setBlWeight(e.target.value)} />
                </div>
                <div className="flex"><Label className="w-2/4 "> Net Weight</Label>
                    <Input className="w-2/4 " placeholder="Net Weight" type="number" value={netWeight} onChange={(e) => setNetWeight(e.target.value)} />
                </div>
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>

            <dialog id="rcneditscsDialog" className="dashboard-modal">
                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">RCN Primary Entry Modify request has created Successfully</p></span>

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
export default RCNBoilingModify