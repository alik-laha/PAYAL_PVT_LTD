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
        sampling:Float32Array;
        moisture:Float32Array;
        nutCount:number;
        fluteRate:number;
        goodKernel:number;
        spim:number;
        reject:number;
        shell:number;
        outTurn:Float32Array;
        Remarks:string;
        qcapprovedBy:string;
        reportStatus:number;
        createdBy:string;
        rcnEntry:RcnPrimaryEntryData;
    }
}

const QCreportForm = (props: QcRcnEntryDataprops) => {

    const [origin, setOrigin] = useState<string>("")
    const [blNo, setBlNo] = useState<string>("")
    const [conNo, setConNo] = useState<string>("")

    useEffect(() => {
       
        setOrigin(props.data.origin)
        setBlNo(props.data.blNo)
        setConNo(props.data.conNo)
       
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
            <Input className="w-2/4 " placeholder="Sampling" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Moisture (%)</Label>
            <Input className="w-2/4 " placeholder="Moisture" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Nut Count (PCs)</Label>
            <Input className="w-2/4 " placeholder="Nut Count" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Flute Rate (gm/Kg)</Label>
            <Input className="w-2/4 " placeholder="Flute Rate" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Total Good Kernel (gm)</Label>
            <Input className="w-2/4 " placeholder="Good Kernel" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >SP+IM</Label>
            <Input className="w-2/4 " placeholder="SP+IM" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Reject</Label>
            <Input className="w-2/4 " placeholder="Reject" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Shell</Label>
            <Input className="w-2/4 " placeholder="Shell" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Out Turn</Label>
            <Input className="w-2/4 " placeholder="Out Turn" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Remarks</Label>
            <Textarea className="w-2/4 " placeholder="Remarks" value={conNo} onChange={(e) => setConNo(e.target.value)} /> </div>
            </form>
                </div></>)
}

export default QCreportForm