import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RcnPrimaryEntryData } from "@/type/type";


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


       
            <form className='flex flex-col gap-2 ' >
            <div className="flex"><Label className="w-2/4 " >Origin</Label>
                    <Input className="w-2/4 " placeholder="Container No." value={origin} onChange={(e) => setOrigin(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 ">BL No.</Label>
            <Input className="w-2/4 " placeholder="BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)} readOnly/> </div>
            <div className="flex"><Label className="w-2/4 " >Container No.</Label>
            <Input className="w-2/4 " placeholder="Container No." value={conNo} onChange={(e) => setConNo(e.target.value)} readOnly/> </div>


            </form>
                </div></>)
}

export default QCreportForm