import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState, useRef, useEffect } from "react"
import { Origin } from "../common/exportData"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { RcnPrimaryEntryData } from "@/type/type"
interface Props {
    rcn: RcnPrimaryEntryData[]      
}

const RcnPrimaryEntryForm = (props:Props) => {
    const [origin, setOrigin] = useState<string>("")
    const [errortext, setErrorText] = useState<string>("")

    const blNoRef = useRef<HTMLInputElement>(null)
    const conNoRef = useRef<HTMLInputElement>(null)
    //const truckNoRef = useRef<HTMLInputElement>(null)
    const blWeightRef = useRef<HTMLInputElement>(null)
    //const netWeightRef = useRef<HTMLInputElement>(null)
    const noOfBagsRef = useRef<HTMLInputElement>(null)
    //const dateRef = useRef<HTMLInputElement>(null)

    console.log(props)

    // useEffect(() => {




    // }, [props.rcn]);

    const successdialog = document.getElementById('myDialog') as HTMLInputElement;
    const errordialog = document.getElementById('errorDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('closeDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorcloseDialog') as HTMLInputElement;

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
        const blNo = blNoRef.current?.value
        const conNo = conNoRef.current?.value
        //const truckNo = truckNoRef.current?.value
        const blWeight = blWeightRef.current?.value
        //const netWeight = netWeightRef.current?.value
        const noOfBags = noOfBagsRef.current?.value
        //const date = dateRef.current?.value
        //console.log({ origin, blNo, conNo, truckNo, blWeight, netWeight })


        axios.post('/api/rcnprimary/create', { origin, blNo, conNo,  blWeight, noOfBags })
            .then((res) => {

                //console.log(res.data.rcnPrimary.id)
                let g_id=res.data.rcnPrimary.id
                axios.post('/api/qcRcn/qcInitialEntry', { g_id , origin, blNo, conNo, date })
                .then((res) => {
                    console.log(res)
                    if (successdialog != null) {
                        (successdialog as any).showModal();
                    }
                    if (blNoRef.current != null) {
                        blNoRef.current.value = '';
                    }
                    if (conNoRef.current != null) {
                        conNoRef.current.value = '';
                    }
                    if (truckNoRef.current != null) {
                        truckNoRef.current.value = '';
                    }
                    if (blWeightRef.current != null) {
                        blWeightRef.current.value = '';
                    }
                    if (netWeightRef.current != null) {
                        netWeightRef.current.value = '';
                    }
                    if (noOfBagsRef.current != null) {
                        noOfBagsRef.current.value = '';
                    }
                    setOrigin('')
                }).catch((err) => {
                    console.log(err)
                })




            }).catch((err) => {
                console.log(err)
                // if (err.response.data.error.original.errno === 1062) {
                //     setErrorText('Duplicate Entry is Not Allowed')
                //     if (errordialog != null) {
                //         (errordialog as any).showModal();
                //     }
                //     return
                // }
                setErrorText(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }

            })

    }
    return (
        <>
            <div className="pl-10 pr-10">
                <form className='flex flex-col gap-1.5 ' onSubmit={handleSubmit}>
                <div className="flex mt-4"><Label className="w-2/4  pt-1">GatePass No.</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="GatePass No" value={props.rcn[0].gatePassNo} readOnly /> </div>
                <div className="flex"><Label className="w-2/4  pt-1">Date of Receving</Label>
                <Input className="w-2/4  font-semibold text-center" placeholder="BL No." value={props.rcn[0].date.slice(0,10)}  readOnly /> </div> 
                <div className="flex"><Label className="w-2/4  pt-1">Gross Wt (Kg)</Label>
                <Input className="w-2/4  font-semibold text-center" placeholder="BL No." value={props.rcn[0].grossWt}  readOnly /> </div>   
                <div className="flex"><Label className="w-2/4  pt-1">Truck No.</Label>
                <Input className="w-2/4  font-semibold text-center" placeholder="BL No." value={props.rcn[0].truckNo}  readOnly /> </div>       
                    
                    <div className="flex ">
                        <Label className="w-2/4  pt-1">Origin</Label>
                        <Select value={origin} onValueChange={(value) => setOrigin(value)} required={true}>
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


                    <div className="flex"><Label className="w-2/4  pt-2">BL No.</Label>
                        <Input className="w-2/4 text-center " placeholder="BL No." ref={blNoRef} required /> </div>

                   

                    <div className="flex"><Label className="w-2/4 pt-1">Container No.</Label>
                        <Input className="w-2/4 text-center" placeholder="Container No." ref={conNoRef} required /> </div>

                  
                    <div className="flex">
                        <Label className="w-2/4 pt-1">Physical Bag Count</Label>
                        <Input className="w-2/4 text-center" placeholder="Bag Count" ref={noOfBagsRef} type="number" required />
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1"> BL Weight</Label>
                        <Input className="w-2/4 text-center" placeholder="BL Weight" ref={blWeightRef} type="number" step="0.01" required />
                    </div>
                   
                    <Button className="bg-orange-500 mb-2 mt-4 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
                </form>


            </div>
            <dialog id="myDialog" className="dashboard-modal">
                <button id="closeDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">RCN Primary Entry is Created Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="errorDialog" className="dashboard-modal">
                <button id="errorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )


}
export default RcnPrimaryEntryForm