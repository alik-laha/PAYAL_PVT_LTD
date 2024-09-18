import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import React, { useEffect } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

import { useState } from "react"
import axios from "axios"
import TimePicker from '../common/TimePicker'

interface HumidModifyProps {
    data: {
        id: number;
        LotNo: string;
        date: string;
        origin: string;
        TotalInput: string;
        Mc_on: string;
        Mc_off: string;
        Mc_breakdown: string;
        Mc_runTime: string;
        noOfOperators:string;
        otherTime: string;
        NoOfTrolley: string;
        InputMoisture: string;
        OutputMoisture: string;
        TotalOutput: string;
        MoistGain:string;
        Status: string;
        CreatedBy: string;
        editStatus: string;
        modifiedBy: string;
    }
}

const HumidifierModify = (props: HumidModifyProps) => {
    const [lotNo, setLotNo] = useState('')
    const [date, setDate] = useState('')
   
    const [ipmositure, setipmoisture] = useState('')
    const [iptot, setiptot] = useState('')
    const [optot, setoptot] = useState('')
    const [opmositure, setopmoisture] = useState('')
   
    const [trolley, settrolley] = useState('')
    const [origin, setOrigin] = useState('')
    const [Mc_on, setMc_on] = useState('')
    const [Mc_off, setMc_off] = useState('')
    const [noOfEmployees, setNoOfEmployees] = useState<number | string>()
    const [Mc_breakdown, setMc_breakdown] = useState('00:00')
    const [otherTime, setOtherTime] = useState('00:00')
    const [isdisable, setisdisable] = useState<boolean>(false)
    const [errortext, setErrorText] = useState<string>("")
    useEffect(() => {
        // console.log(typeof (props.data.date))
        // console.log(props.data.date)
        setLotNo(props.data.LotNo)
        setDate(props.data.date.slice(0, 10))
        setOrigin(props.data.origin)
        settrolley(props.data.NoOfTrolley)
        setiptot(props.data.TotalInput)
        setoptot(props.data.TotalOutput)
        setipmoisture(props.data.InputMoisture)
        setopmoisture(props.data.OutputMoisture)
        setMc_on(props.data.Mc_on)
        setMc_off(props.data.Mc_off)
        setNoOfEmployees(props.data.noOfOperators)
        setMc_breakdown(props.data.Mc_breakdown)
        setOtherTime(props.data.otherTime)
       

    }, [])
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
        if (resStatus.data.lotStatus.modifiedBy && resStatus.data.lotStatus.modifiedBy !== 'Humidifier') {
            setErrorText(`Lot has Already Crossed ${resStatus.data.lotStatus.modifiedBy} Section`)
            if(errordialog){
                (errordialog as any).showModal()
            }
            
            return
        }
        setisdisable(true)
        axios.post(`/api/humid/updateHumid/${props.data.id}`, {origin,iptot,lotNo,
            ipmositure, opmositure,optot,
            Mc_off, Mc_on, Mc_breakdown, otherTime, trolley, noOfEmployees, date
        })
            .then((res) => {
                console.log(res)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
                setipmoisture('')
                setopmoisture('')
              
                settrolley('')
                setNoOfEmployees('')
                setDate('')
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
    const handleonchangeon = (value: string) => {
        //console.log(value)
        setMc_on(value)

    }
    const handleonchangeoff = (value: string) => {
        //console.log(value)
        setMc_off(value)

    }
    return (
        <>
            <div className="pl-10 pr-10 max-h-80 overflow-y-scroll">
                <form className='flex flex-col gap-1 text-xs ' onSubmit={handleSubmit}>

                    <div className="flex mt-2"><Label className="w-2/4 mt-2">Lot No</Label>
                        <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Lot No." value={lotNo} readOnly /> </div>
                    <div className="flex"><Label className="w-2/4 mt-2" > Origin</Label>

                        <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Origin" value={origin} readOnly /></div>
                    <div className="flex"><Label className="w-2/4 mt-2">Date</Label>
                        <Input className="w-2/4 text-center justify-center" placeholder="Date" type='date' value={date} onChange={(e) => setDate(e.target.value)} /> </div>
                   
                    <div className="flex"><Label className="w-2/4 mt-2" > Total Input (Kg)</Label>
                        <Input className="w-2/4 bg-yellow-100 text-center" placeholder="Kg" value={iptot} readOnly /></div>
                        <div className="flex"><Label className="w-2/4 mt-2">Total Output (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="Kg" value={optot} onChange={(e) => setoptot(e.target.value)} /> </div>

                    <div className="flex"><Label className="w-2/4 mt-2">Input Moisture (%)</Label>
                        <Input className="w-2/4 text-center" placeholder="Moisture" value={ipmositure} onChange={(e) => setipmoisture(e.target.value)} /> </div>
                
                  
                    <div className="flex"><Label className="w-2/4 mt-2">Output Moisture (%)</Label>
                        <Input className="w-2/4 text-center" placeholder="Piece" value={opmositure} onChange={(e) => setopmoisture(e.target.value)} /> </div>
                 
                    <div className="flex"><Label className="w-2/4 mt-2">No of Trolley</Label>
                        <Input className="w-2/4 text-center" placeholder="Trolley" value={trolley} onChange={(e) => settrolley(e.target.value)} /> </div>
                    <div className="flex"><Label className="w-2/4 mt-2">No Of Operator</Label>
                        <Input className="w-2/4 text-center" placeholder="Operator" value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)} /> </div>
                    <div className="flex pt-2">

                        <Label className="w-2/4 pt-1 ">MC ON  </Label>
                        <div className="w-2/4 text-center items-center justify-center" ><TimePicker onChange={handleonchangeon} value={Mc_on} /> </div>
                    </div>

                    <div className="flex pt-1">
                        <Label className="w-2/4  pt-2 ">MC OFF</Label>
                        <div className="w-2/4 " ><TimePicker onChange={handleonchangeoff} value={Mc_off} /></div>
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-2">Break Down Duration</Label>
                        <Input className="w-2/4 justify-center" placeholder="MC BreakDown" value={Mc_breakdown} onChange={(e) => setMc_breakdown(e.target.value)} type='time' />
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-2">Other Duration</Label>
                        <Input className="w-2/4 justify-center" placeholder="Other Time" value={otherTime} onChange={(e) => setOtherTime(e.target.value)} type='time' />
                    </div>
                    <div>
                        <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable ? 'Submitting' : 'Submit'}</Button>
                    </div>
                </form>
                <dialog id="rcneditscsDialog" className="dashboard-modal">
                    <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium">Modification of Humidifier Entry is Requested </p></span>

                    {/* <!-- Add more elements as needed --> */}
                </dialog>

                <dialog id="rcnediterrDialog" className="dashboard-modal">
                    <button id="rcnerrorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                    {/* <!-- Add more elements as needed --> */}
                </dialog>
            </div>
        </>
    )


}
export default HumidifierModify