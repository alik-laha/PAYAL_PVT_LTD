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
        origin: string;
        blNo: string;
        conNo: string;
        truckNo: string;
        noOfBags: string;
        blWeight: string;
        netWeight: string;
        date: string;

      
     gatePassNo:string;
     grossWt:string;
    }
}


const RcnPrimaryModify = (props: RcnPrimaryModifyProps) => {

    const [origin, setOrigin] = useState<string>("")
    const [gatePassNo, setgatePassNo] = useState<string>("")
    const [grossWt, setgrossWt] = useState<string>("")
    const [blNo, setBlNo] = useState<string>("")
    const [conNo, setConNo] = useState<string>("")
    const [truckNo, setTruckNo] = useState<string>("")
    const [noOfBags, setNoOfBags] = useState<string>("")
    const [blWeight, setBlWeight] = useState<string>("")
    const [netWeight, setNetWeight] = useState<string>("")
    const [errortext, setErrorText] = useState<string>("")
    const [date, setDate] = useState<Date>()
    const [isdisable,setisdisable]=useState<boolean>(false)
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
        axios.put(`/api/rcnprimary/update/${props.data.id}`, { gatePassNo,origin, blNo, conNo, truckNo, noOfBags, blWeight, netWeight, date })
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
            }).finally(()=>{
                setisdisable(false)
            })
    }

    useEffect(() => {
        console.log(typeof (props.data.date))
        console.log(props.data.date)
        setOrigin(props.data.origin)
        setBlNo(props.data.blNo)
        setConNo(props.data.conNo)
        setTruckNo(props.data.truckNo)
        setNoOfBags(props.data.noOfBags)
        setBlWeight(props.data.blWeight)
        setNetWeight(props.data.netWeight)
        setDate(new Date(props.data.date))
        setgrossWt(props.data.grossWt)
        setgatePassNo(props.data.gatePassNo)
    }, [])


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>
            <div className="flex mt-2"><Label className="w-2/4 mt-2">Gate Pass No.</Label>
                 <Input className="w-2/4 bg-yellow-100 text-center" placeholder="BL No." value={gatePassNo} readOnly /> </div>
                 <div className="flex"><Label className="w-2/4 mt-2" > Truck No.</Label>
                    <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Truck No." value={truckNo} readOnly />
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Date of Receiving</Label>
                    <Input className="w-2/4 text-center bg-yellow-100 justify-center" placeholder="Date Of Receiving" type="date" value={date ? date.toISOString().split('T')[0] : '' } readOnly/>
                </div>
                <div className="flex"><Label className="w-2/4 mt-2"> Gross Weight (Kg)</Label>
                    <Input className="w-2/4 text-center bg-yellow-100" placeholder="Gross Weight" type="number" value={grossWt} readOnly />
                </div>
                <div className="flex"><Label className="w-2/4 mt-2"> Net Weight (Kg)</Label>
                    <Input className="w-2/4 text-center bg-yellow-100" placeholder="Net Weight" type="number" value={netWeight} readOnly />
                </div>
                <div className="flex"><Label className="w-2/4 mt-2">Origin</Label>
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
                <div className="flex"><Label className="w-2/4 mt-3">BL No.</Label>
                    <Input className="w-2/4 text-center" placeholder="BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)} /> </div>
                <div className="flex"><Label className="w-2/4 mt-2" >Container No.</Label>
                    <Input className="w-2/4 text-center" placeholder="Container No." value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
                
                
                <div className="flex">
                    <Label className="w-2/4 mt-2">Physical Bag Count</Label>
                    <Input className="w-2/4 text-center " placeholder="Total Bags" type="number" value={noOfBags} onChange={(e) => setNoOfBags(e.target.value)} />
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2"> BL Weight (Kg)</Label>
                    <Input className="w-2/4 text-center" placeholder="BL Weight" type="number" value={blWeight} onChange={(e) => setBlWeight(e.target.value)} />
                </div>
               
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
            </form>

            <dialog id="rcneditscsDialog" className="dashboard-modal">
                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification of RCN Primary Entry is Requested </p></span>

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
export default RcnPrimaryModify