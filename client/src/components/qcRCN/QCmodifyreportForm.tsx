import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RcnPrimaryEntryData } from "@/type/type";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'


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
        spIm:string;
        reject:string;
        shell:string;
        outTurn:string;
        Remarks:string;
        qcapprovedBy:string;   
        createdBy:string;
        rcnEntry:RcnPrimaryEntryData;
    }
}

const QCmodifyreportForm = (props: QcRcnEntryDataprops) => {

    const [origin, setOrigin] = useState<string>("")
    const [date, setDate] = useState<string>("")
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
    const [errortext, setErrorText] = useState<string>("")
    const [qcapprvBy,setQcapprvBy]=useState<string>('')

    const successdialog = document.getElementById('qcrcnscsDialog') as HTMLInputElement;
    const errordialog = document.getElementById('qcrcnerrDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('qcrcncloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('qcrcnerrorcloseDialog') as HTMLInputElement;


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
        axios.put(`/api/qcRcn/modifyQcRcn/${props.data.id}`, { origin,blNo,conNo,date,qcapprvBy,sampling,moisture,nutCount,fluteRate,goodKernel,spim,reject,shell
            ,outturn,remarks
        })
            .then((res) => {
                console.log(res)
                if (successdialog != null) {
                    (successdialog as any).showModal();
                }
                setSampling('')
                setMoisture('')
                setNutCount('')
                setSpim('')
                setShell('')
                setGoodKernel('')
                setReject('')
                setFluteRate('')
                setOutTurn('')
                setRemarks('')
                setDate('')

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
        setBlNo(props.data.blNo)
        setConNo(props.data.conNo)
        setSampling(props.data.sampling)
        setMoisture(props.data.moisture)
        setNutCount(props.data.nutCount)
        setFluteRate(props.data.fluteRate)
        setGoodKernel(props.data.goodKernel)
        setSpim(props.data.spIm)
        setReject(props.data.reject)
        setShell(props.data.shell)
        setOutTurn(props.data.outTurn)
        setRemarks(props.data.Remarks)
        setDate(props.data.date)
       setQcapprvBy(props.data.qcapprovedBy)
    }, [])
    return (
        <>
            <div className="pl-10 pr-10">


       
            <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>
            <div className="flex"><Label className="w-2/4 pt-1" >Origin</Label>
                    <Input className="w-2/4 bg-yellow-100" placeholder="Container No." value={origin} onChange={(e) => setOrigin(e.target.value)} /> </div>
            <div className="flex"><Label className="w-2/4 pt-1">BL No.</Label>
            <Input className="w-2/4 bg-yellow-100" placeholder="BL No." value={blNo} onChange={(e) => setBlNo(e.target.value)} readOnly/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Container No.</Label>
            <Input className="w-2/4 bg-yellow-100" placeholder="Container No." value={conNo} onChange={(e) => setConNo(e.target.value)} readOnly/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Sampling (%)</Label>
            <Input type='number'className="w-2/4 " placeholder="Sampling" value={sampling} onChange={(e) => setSampling(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Moisture (%)</Label>
            <Input className="w-2/4 " placeholder="Moisture" value={moisture} onChange={(e) => setMoisture(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Nut Count (PCs)</Label>
            <Input className="w-2/4 " placeholder="Nut Count" value={nutCount} onChange={(e) => setNutCount(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Flute Rate (gm/Kg)</Label>
            <Input className="w-2/4 " placeholder="Flute Rate" value={fluteRate} onChange={(e) => setFluteRate(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Total Good Kernel (gm)</Label>
            <Input className="w-2/4 " placeholder="Good Kernel" value={goodKernel} onChange={(e) => setGoodKernel(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >SP+IM (gm)</Label>
            <Input className="w-2/4 " placeholder="SP+IM" value={spim} onChange={(e) => setSpim(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Reject(With Shell) (gm)</Label>
            <Input className="w-2/4 " placeholder="Reject" value={reject} onChange={(e) => setReject(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Shell</Label>
            <Input className="w-2/4 " placeholder="Shell" value={shell} onChange={(e) => setShell(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Out Turn (Lbs)</Label>
            <Input className="w-2/4 " placeholder="Out Turn" value={outturn} onChange={(e) => setOutTurn(e.target.value)} required/> </div>
            <div className="flex"><Label className="w-2/4 pt-1" >Remarks</Label>
            <Textarea className="w-2/4 " placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} /> </div>
            <Button className="bg-orange-500 mt-1 ml-20 mr-20 text-center items-center justify-center">Modify</Button>
            </form>

            <dialog id="qcrcnscsDialog" className="dashboard-modal">
                <button id="qcrcncloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">RCN QC Incoming Report Uploaded Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="qcrcnerrDialog" className="dashboard-modal">
                <button id="qcrcnerrorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

                </div></>)
}



export default QCmodifyreportForm