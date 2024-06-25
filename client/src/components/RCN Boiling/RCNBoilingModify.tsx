import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Origin, Size } from "../common/exportData"
import React, { useContext, useEffect } from "react"
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
import Context from "../context/context"
interface RCnBoilingModifyProps {
    data: {
        id: number;
        LotNo: string;
        date: string;
        origin: string;
        SizeName: string;
        Size: string;
        Scooping_Line_Mc: string;
        Pressure: string;
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



const RCNBoilingModify = (props: RCnBoilingModifyProps) => {

    const [origin, setOrigin] = useState<string>("")
    const [LotNo, setLotNo] = useState<string>("")
    const [date, setDate] = useState('')
    const [sizename, setsizename] = useState<string>("")
    const [size, setsize] = useState<string>("")
    const [scopline, setscopline] = useState<string>("")
    const [presr, setpresr] = useState<string>("")
    const [Mc_name, setMc_name] = useState<string>("")
    const [Mc_on, setMc_on] = useState('')
    const [Mc_off, setMc_off] = useState('')
    const [noOfEmployees, setNoOfEmployees] = useState<string>()
    const [Mc_breakdown, setMc_breakdown] = useState('00:00')
    const [otherTime, setOtherTime] = useState('00:00')
    const { AllMachines } = useContext(Context)
    const { AllNewMachines } = useContext(Context)
    
      
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
        axios.put(`/api/rcnprimary/update/${props.data.id}`, { 
            origin,
            LotNo,
            date,
            size,sizename,scopline,presr,Mc_name,Mc_on,Mc_off,noOfEmployees,Mc_breakdown,otherTime


         })
            .then((res) => {
                console.log(res)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
                setOrigin('')
                setLotNo('')
                setDate('')
                setsize('')
                setsizename('')
                setscopline('')
                setpresr('')
                setMc_name('')
                setMc_on('00:00')
                setMc_off('00:00')
                setNoOfEmployees('')
                setMc_breakdown('')
                setOtherTime('')
             
            

            }).catch((err) => {
                console.log(err)
                setErrortext(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            })
    }

    useEffect(() => {
        setOrigin(props.data.origin)
        //setDate(new Date(props.data.date).toISOString().slice(0, 10))
        setDate(props.data.date)
        setLotNo(props.data.LotNo)
        setMc_name(props.data.MCName)
        setMc_on(props.data.Mc_on)
        setMc_off(props.data.Mc_off)
        setNoOfEmployees(props.data.noOfEmployees)
        setMc_breakdown(props.data.Mc_breakdown)
        setOtherTime(props.data.otherTime)
        setLotNo(props.data.LotNo)
        setsize(props.data.Size)
        setsizename(props.data.SizeName)
        setscopline(props.data.Scooping_Line_Mc)
        setpresr(props.data.Pressure)
    }, [])


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
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
                   </div>

    

                setDate('')
             
                setOtherTime('')
            <div className="flex"><Label className="w-2/4 pt-1" >Lot No.</Label>
            <Input className="w-2/4 bg-yellow-100" placeholder="Lot No." value={LotNo} onChange={(e) => setLotNo(e.target.value)} readOnly/> </div>
            <div className="flex"><Label className="w-2/4 pt-1">Pressure</Label>
            <Input className="w-2/4" placeholder="Pressure" value={presr} onChange={(e) => setpresr(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 ">Size</Label>
                    <Select value={sizename} onValueChange={(value) => setsizename(value)}>
                        <SelectTrigger className="w-2/4 ">
                            <SelectValue placeholder="Size Name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Size.map((item) => {
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
            </div>
            <div className="flex"><Label className="w-2/4 pt-1">Boiling Qty</Label>
            <Input className="w-2/4" placeholder="Boiling Qty." value={size} onChange={(e) => setsize(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 ">Scooping Line</Label>
                    <Select value={scopline} onValueChange={(value) => setscopline(value)}>
                        <SelectTrigger className="w-2/4 ">
                            <SelectValue placeholder="Scooping Line" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    AllNewMachines.map((item) => {
                                        return (
                                            <SelectItem key={item.machineID} value={item.machineName}>
                                                {item.machineName}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            </div>
            <div className="flex"><Label className="w-2/4 ">Machine Name</Label>
                    <Select value={Mc_name} onValueChange={(value) => setMc_name(value)}>
                        <SelectTrigger className="w-2/4 ">
                            <SelectValue placeholder="Scooping Line" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    AllMachines.map((item) => {
                                        return (
                                            <SelectItem key={item.machineID} value={item.machineName}>
                                                {item.machineName}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            </div>
            <div className="flex">
                <Label className="w-1/4 pt-2 bg-green-500 rounded-md text-white text-center">ON</Label>
            <Input className="w-2/4 justify-center bg-green-100 " placeholder="MC ON Time" value={Mc_on} onChange={(e) => setMc_on(e.target.value)} type='time' />
            
            <Input className="w-2/4 ml-1 justify-center bg-red-100" placeholder="MC OFF Time" value={Mc_off} onChange={(e) => setMc_off(e.target.value)} type='time' />
            <Label className="w-1/4 pt-2 text-end bg-red-500 text-white rounded-md text-center">OFF</Label>
            
            </div>
           
            <div className="flex"><Label className="w-2/4 ">BreakDown Duration</Label>
            <Input className="w-2/4 justify-center bg-cyan-100 ml-1" placeholder="Breakdown Duration" value={Mc_breakdown} onChange={(e) => setMc_breakdown(e.target.value)} type='time' /></div>
            <div className="flex"><Label className="w-2/4 pt-1">Labour Qty.</Label>
            <Input className="w-2/4" placeholder="No. Of Employees" value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)} /> </div>
            
            <Button className="bg-orange-500 mt-1 ml-20 mr-20 text-center items-center justify-center">Modify</Button>
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