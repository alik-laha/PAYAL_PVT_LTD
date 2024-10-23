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
import TimePicker from "../common/TimePicker"
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
        moisture:string;
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
    const [cookingtime, setCookingTime] = useState('')
    const [moist, setMoist] = useState<string>("")
    const [Mc_name, setMc_name] = useState<string>("")
    const [Mc_on, setMc_on] = useState('')
    const [Mc_off, setMc_off] = useState('')
    const [noOfEmployees, setNoOfEmployees] = useState<string>()
    const [Mc_breakdown, setMc_breakdown] = useState('00:00')
    const [otherTime, setOtherTime] = useState('00:00')
    const { AllMachines } = useContext(Context)
    //const { AllNewMachines } = useContext(Context)
    
      
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const resStatus = await axios.post('/api/boiling/getStatusBoiling', { lotNo: props.data.LotNo})
        console.log(resStatus)
        if (resStatus.data.lotStatus.modifiedBy && resStatus.data.lotStatus.modifiedBy !== 'Boiling') {
            setErrortext(`Lot has Already Crossed ${resStatus.data.lotStatus.modifiedBy} Section`)
            const dialog = document.getElementById("rcnediterrDialog") as HTMLDialogElement
            dialog.showModal()
            return
        }
        axios.put(`/api/boiling/updateBoiling/${props.data.id}`, { 
            origin,
            LotNo,
            date,moisture:moist,cookingTime:cookingtime,
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
                setCookingTime('')
                setMoist('')
             
            

            }).catch((err) => {
                console.log(err)
                setErrortext(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            })
    }
    const handleonchangeon = (value:string) => {
       // console.log(value)
        setMc_on(value)
        
    }
    const handleonchangeoff = (value:string) => {
       // console.log(value)
        setMc_off(value)
        
    }

    useEffect(() => {
        setOrigin(props.data.origin)
        //setDate(new Date(props.data.date).toISOString().slice(0, 10))
        setDate(props.data.date.slice(0, 10))
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
        setMoist(props.data.moisture)
        setCookingTime(props.data.CookingTime)
    }, [])


    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>
                {/* <div className="flex mt-4">
                <Label className="w-2/4 pt-2 bg-green-500 rounded-md text-white text-center">MC ON</Label>
            <Input className="w-2/4 justify-center bg-green-100 " placeholder="MC ON Time" value={Mc_on} onChange={(e) => setMc_on(e.target.value)} type='time' />
            
            <Input className="w-2/4 ml-1 justify-center bg-red-100" placeholder="MC OFF Time" value={Mc_off} onChange={(e) => setMc_off(e.target.value)} type='time' />
            <Label className="w-2/4 pt-2 text-end bg-red-500 text-white rounded-md text-center">MC OFF</Label>
            
            </div> */}

            <div className="flex mt-2"><Label className="w-2/4 pt-1" >Lot No.</Label>
            <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Lot No." value={LotNo} onChange={(e) => setLotNo(e.target.value)} readOnly/> </div>
            <div className="flex"><Label className="w-2/4 pt-1">Scooping Line</Label>
            <Input className="w-2/4 text-center bg-yellow-100" placeholder="Scop Line" value={scopline} readOnly required/>
                    {/* <Select value={scopline} onValueChange={(value) => setscopline(value)}>
                        <SelectTrigger className="w-2/4 justify-center">
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
                    </Select> */}
            </div>
            <div className="flex">
                    <Label className="w-2/4 pt-1">Date Of Boiling</Label>
                    <Input className="w-2/4 justify-center" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} type='date' /> </div>
                <div className="flex"><Label className="w-2/4 ">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
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
                   </div>

    

              
           
            
            
            <div className="flex"><Label className="w-2/4 pt-1">Pressure (psi)</Label>
            <Input className="w-2/4 text-center" placeholder="Pressure" value={presr} onChange={(e) => setpresr(e.target.value)} required /> </div>
            <div className="flex"><Label className="w-2/4 pt-1">Moisture (%)</Label>
            <Input className="w-2/4 text-center" placeholder="Moisture (%)" value={moist} onChange={(e) => setMoist(e.target.value)} required/></div>
            <div className="flex"><Label className="w-2/4 ">Size</Label>
                    <Select value={sizename} onValueChange={(value) => setsizename(value)}>
                        <SelectTrigger className="w-2/4 justify-center">
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
            <div className="flex"><Label className="w-2/4 pt-1">Boiling Qty(Kg)</Label>
            <Input className="w-2/4 text-center" placeholder="Boiling Qty." value={size} onChange={(e) => setsize(e.target.value)} required/> </div>
             <div className="flex"><Label className="w-2/4 pt-1">No. Of Labour</Label>
            <Input className="w-2/4 text-center" placeholder="No. Of Employees" value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)} required/> </div>
            
            <div className="flex"><Label className="w-2/4 pt-1">Machine Name</Label>
                    <Select value={Mc_name} onValueChange={(value) => setMc_name(value)}>
                        <SelectTrigger className="w-2/4 justify-center">
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
                <div className="flex pt-2">

                    <Label className="w-2/4 pt-1 ">MC ON  </Label>
                    <div className="w-2/4 text-center items-center justify-center" ><TimePicker onChange={handleonchangeon} value={Mc_on} /> </div>
                </div>

                <div className="flex pt-1">
                    <Label className="w-2/4  pt-2 ">MC OFF</Label>
                    <div className="w-2/4 " ><TimePicker onChange={handleonchangeoff} value={Mc_off} /></div>
                </div> 
            
            <div className="flex"><Label className="w-2/4 mt-1">Cooking Time</Label>
            <Input className="w-2/4 justify-center" placeholder="Cooking Time" value={cookingtime} onChange={(e) => setCookingTime(e.target.value)} type='time' required/></div>
            <div className="flex"><Label className="w-2/4 mt-1">BreakDown Duration</Label>
            <Input className="w-2/4 justify-center" placeholder="Breakdown Duration" value={Mc_breakdown} onChange={(e) => setMc_breakdown(e.target.value)} type='time' /></div>
            <div className="flex"><Label className="w-2/4 mt-1">Other Duration</Label>
            <Input className="w-2/4 justify-center" placeholder="Other Duration" value={otherTime} onChange={(e) => setOtherTime(e.target.value)} type='time' /></div>
            
           
            
            <Button className="bg-orange-500 mt-1 ml-20 mr-20 text-center items-center justify-center">Modify</Button>
            </form>

            <dialog id="rcneditscsDialog" className="dashboard-modal">
                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">RCN Boiling  Modify request has Created</p></span>

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