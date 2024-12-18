import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import React, { useEffect } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

import { useState } from "react"
import axios from "axios"
import TimePicker from '../common/TimePicker'

interface PeelingModifyProps {
    data: {
        id: number;
            LotNo: string;
            date: string;
            origin: string;
            CreatedBy: string;
            editStatus: string;
            modifiedBy: string;
            Status:string;
            TotalInput: string;
            WholesPeel: string;
            WholesUnpeel:string;
            DP: string;
            DS: string;
            DP1: string;
            JJH: string;
            SJH: string;
            SJH1: string;
            JH1: string;
            JK_K: string;
            SP1: string;
            Mc_on: string;
            Husk: string;
            Rejection: string;
            UnpeelPiece: string;
            Big_Taiho: string;
            Mc_off: string;
            Mc_breakdown: string;
            Mc_runTime: string;
            noOfOperators: string;
            otherTime: string;
            NoOfTrolley: string;
            pressure: string;
            moisture: string;
            peelingTime: string;
            difference:string;
    }
}

const PeelingModify = (props: PeelingModifyProps) => {
    const [lotNo, setLotNo] = useState('')
    const [date, setDate] = useState('')
    const [iptot, setiptot] = useState('')
    const [wholepeel, setwholepeel] = useState('')
    const [wholeunpeel, setwholeunpeel] = useState('')
    const [dp, setdp] = useState('')
    const [ds, setds] = useState('')
    const [dp1, setdp1] = useState('')
    const [sjh, setsjh] = useState('')
    const [sjh1, setsjh1] = useState('')
    const [jjh, setjjh] = useState('')
    const [sp1, setsp1] = useState('')
    const [jh1, setjh1] = useState('')
    const [jkK, setjkK] = useState('')
    const [husk, sethusk] = useState('')
    const [rejection, setrejection] = useState('')
    const [pieceunpeel, setpieceunpeel] = useState('')
    const [bigT, setbigT] = useState('')

    const [pres, setPres] = useState('')
    const [moist, setMoist] = useState('')
    const [peeltime, setPeelTime] = useState('')


   
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

        setwholepeel(props.data.WholesPeel)
        setwholeunpeel(props.data.WholesUnpeel)
        setpieceunpeel(props.data.UnpeelPiece)
        setdp(props.data.DP)
        setdp1(props.data.DP1)
        setds(props.data.DS)

        setjh1(props.data.JH1)
        setsjh(props.data.SJH)
        setsjh1(props.data.SJH1)
        setjjh(props.data.JJH)
        setjkK(props.data.JK_K)
        setsp1(props.data.SP1)

        setbigT(props.data.Big_Taiho)
        sethusk(props.data.Husk)
        setrejection(props.data.Rejection)
        setPres(props.data.pressure)
        setPeelTime(props.data.peelingTime)
        setMoist(props.data.moisture)

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
        if (resStatus.data.lotStatus.modifiedBy && resStatus.data.lotStatus.modifiedBy !== 'Peeling') {
            setErrorText(`Lot has Already Crossed ${resStatus.data.lotStatus.modifiedBy} Section`)
            if(errordialog){
                (errordialog as any).showModal()
            }
            
            return
        }
        setisdisable(true)
        axios.post(`/api/peeling/updatePeeling/${props.data.id}`, {origin,iptot,lotNo,pres,moist,peeltime,
            wholepeel,wholeunpeel,pieceunpeel,dp,dp1,ds,sjh,sjh1,jjh,jkK,jh1,sp1,husk,rejection,bigT,
            
            Mc_off, Mc_on, Mc_breakdown, otherTime, trolley, noOfEmployees, date
        })
            .then((res) => {
                console.log(res)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
               
              
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

                        <div className="flex"><Label className="w-2/4 mt-2">Pressure</Label>
                        <Input className="w-2/4 text-center" placeholder="Pressure" value={pres} onChange={(e) => setPres(e.target.value)} required/> </div>
                        
                        
                        <div className="flex"><Label className="w-2/4 mt-2">Moisture(Min-Max) </Label>
                        <Input className="w-2/4 text-center" placeholder="%" value={moist} onChange={(e) => setMoist(e.target.value)} required/> </div>  
                
                        <div className="flex"><Label className="w-2/4 mt-2">Peeling-Time(Min-Max) </Label>
                        <Input className="w-2/4 text-center" placeholder="%" value={peeltime} onChange={(e) => setPeelTime(e.target.value)} required/> </div> 


    
                 
                    <div className="flex"><Label className="w-2/4 mt-2">No of Trolley</Label>
                        <Input className="w-2/4 text-center" placeholder="Trolley" value={trolley} onChange={(e) => settrolley(e.target.value)} required/> </div>
                    <div className="flex"><Label className="w-2/4 mt-2">No Of Operator</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Operator" value={noOfEmployees} onChange={(e) => setNoOfEmployees(e.target.value)} readOnly/> </div>

                    <div className="flex"><Label className="w-2/4 mt-2">Wholes Peel (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="Kg" value={wholepeel} onChange={(e) => setwholepeel(e.target.value)} required/> </div>

                    <div className="flex"><Label className="w-2/4 mt-2">Wholes Unpeel</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={wholeunpeel} onChange={(e) => setwholeunpeel(e.target.value)} required/> </div>

                        <div className="flex"><Label className="w-2/4 mt-2">Pieces Unpeel</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={pieceunpeel} onChange={(e) => setpieceunpeel(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">DP</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={dp} onChange={(e) => setdp(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">DP1</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={dp1} onChange={(e) => setdp1(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">DS</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={ds} onChange={(e) => setds(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">SJH</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={sjh} onChange={(e) => setsjh(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">SJH1</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={sjh1} onChange={(e) => setsjh1(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">SP1</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={sp1} onChange={(e) => setsp1(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">JJH</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={jjh} onChange={(e) => setjjh(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">JK/K</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={jkK} onChange={(e) => setjkK(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">JH1</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={jh1} onChange={(e) => setjh1(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">Husk</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={husk} onChange={(e) => sethusk(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">Rejection</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={rejection} onChange={(e) => setrejection(e.target.value)} required/> </div>
                        <div className="flex"><Label className="w-2/4 mt-2">Big_Taiho</Label>
                        <Input className="w-2/4 text-center" placeholder="kg" value={bigT} onChange={(e) => setbigT(e.target.value)} required/> </div>
                    
                    
                    <div className="flex">  
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
                        <p id="modal-text" className="pl-3 mt-1 font-medium">Modification of Peeling Entry is Requested </p></span>

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
export default PeelingModify