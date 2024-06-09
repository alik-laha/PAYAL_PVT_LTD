import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RcnPrimaryEntryData } from "@/type/type";
import { Textarea } from "../ui/textarea";


interface QcRcnEntryDataprops{

    data:{
        id:number;
        blNo: string;
        conNo: string;
        date: string;
        origin: string;
        sampling:string;
        moisture:string;
        nutCount:string;
        fluteRate:string;
        goodKernel:string;
        spim:string;
        reject:string;
        shell:string;
        outTurn:string;
        Remarks:string;
        qcapprovedBy:string;
        
        createdBy:string;
        rcnEntry:RcnPrimaryEntryData;
    }
}

const QCreportForm = (props: QcRcnEntryDataprops) => {

    const [origin, setOrigin] = useState<string>("")
    const [blNo, setBlNo] = useState<string>("")
    const [conNo, setConNo] = useState<string>("")
    const [sampling, setSampling] = useState<string>('')
    const [moisture, setMoisture] = useState<string>('')
    const [nutCount, setNutCount] = useState<string>('')
    const [fluteRate, setFluteRate] = useState<string>('')
    const [goodKernel, setGoodKernel] = useState<string>('')
    const [spim, setSpim] = useState<string>('')
    const [reject, setReject] = useState<string>('')
    const [shell, setShell] = useState<string>('')
    const [outturn, setOutTurn] = useState<string>('')
    const [remarks, setRemarks] = useState<string>("")
  

    useEffect(() => {
       
        setOrigin(props.data.origin)
        setBlNo(props.data.blNo)
        setConNo(props.data.conNo)
        setSampling(props.data.sampling)
        setMoisture(props.data.moisture)
        setNutCount(props.data.nutCount)
        setFluteRate(props.data.fluteRate)
        setGoodKernel(props.data.goodKernel)
        setSpim(props.data.spim)
        setReject(props.data.reject)
        setShell(props.data.shell)
        setOutTurn(props.data.outTurn)
        setRemarks(props.data.Remarks)
       
    }, [])
    return (
        <>
            <div className="pl-10 pr-10">


       
            <form className='flex flex-col gap-1 ' >
            <div className="flex"><Label className="w-2/4 pt-1" >Origin</Label>
                    <Input className="w-2/4 bg-yellow-100" placeholder="Container No." value={origin} onChange={(e) => setOrigin(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1">BL No.</Label>
            <Input className="w-2/4 bg-yellow-100" placeholder="BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)} readOnly/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Container No.</Label>
            <Input className="w-2/4 bg-yellow-100" placeholder="Container No." value={conNo} onChange={(e) => setConNo(e.target.value)} readOnly/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Sampling (%)</Label>
            <Input type='number'className="w-2/4 " placeholder="Sampling" value={sampling} onChange={(e) => setSampling(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Moisture (%)</Label>
            <Input className="w-2/4 " placeholder="Moisture" value={moisture} onChange={(e) => setMoisture(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Nut Count (PCs)</Label>
            <Input className="w-2/4 " placeholder="Nut Count" value={nutCount} onChange={(e) => setNutCount(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Flute Rate (gm/Kg)</Label>
            <Input className="w-2/4 " placeholder="Flute Rate" value={fluteRate} onChange={(e) => setFluteRate(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Total Good Kernel (gm)</Label>
            <Input className="w-2/4 " placeholder="Good Kernel" value={goodKernel} onChange={(e) => setGoodKernel(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >SP+IM</Label>
            <Input className="w-2/4 " placeholder="SP+IM" value={spim} onChange={(e) => setSpim(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Reject</Label>
            <Input className="w-2/4 " placeholder="Reject" value={reject} onChange={(e) => setReject(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Shell</Label>
            <Input className="w-2/4 " placeholder="Shell" value={shell} onChange={(e) => setShell(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Out Turn</Label>
            <Input className="w-2/4 " placeholder="Out Turn" value={outturn} onChange={(e) => setOutTurn(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Remarks</Label>
            <Textarea className="w-2/4 " placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} /> </div>
            </form>
                </div></>)
}

export default QCreportForm