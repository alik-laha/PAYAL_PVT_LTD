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
import { useState, useRef, useEffect,   } from "react"
import { Origin } from "../common/exportData"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { RcnPrimaryEntryData } from "@/type/type"
interface Props {
    rcn: any[]      
}

const AlmondPrimaryEntryForm = (props:Props) => {
    
    const [errortext, setErrorText] = useState<string>("")

    const [origin, setOrigin] = useState<string>("")
    const blNoRef = useRef<HTMLInputElement>(null)
    const conNoRef = useRef<HTMLInputElement>(null)
    const blWeightRef = useRef<HTMLInputElement>(null)

    const [id, setId] = useState<number>()
    const [date, setDate] = useState<string>('')
    const [gatepass, setGatePass] = useState<string>('')
    const [grossWt, setGrossWt] = useState<string>('')
    const [truck, settruck] = useState<string>('')

    const noOfBagsRef = useRef<HTMLInputElement>(null)
    console.log(props)

    useEffect(() => {  
        if(props.rcn[0]){
            setId(props.rcn[0].id)
        setDate(props.rcn[0].recevingDate.slice(0,10))
        setGrossWt(props.rcn[0].grossWt)
        setGatePass(props.rcn[0].gatePassNo)
        settruck(props.rcn[0].truckNo)
        }
        
    }, [props.rcn[0]]);
    


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
   
        const blWeight = blWeightRef.current?.value
    
        const noOfBags = noOfBagsRef.current?.value
     
        console.log({ origin, blNo, conNo,noOfBags , blWeight  })


        axios.post('/api/rcnprimary/updateRcnEntry', { id,origin, blNo, conNo,  blWeight, noOfBags,gatepass })
            .then((res) => {

                console.log(res)
                //let g_id=res.data.rcnPrimary.id
    
            }).catch((err) => {
                console.log(err)
        
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
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="GatePass No" value={gatepass} readOnly /> </div>
                <div className="flex"><Label className="w-2/4  pt-1">Date of Receving</Label>
                <Input className="w-2/4  bg-yellow-100 font-semibold text-center" placeholder="BL No." value={date}  readOnly /> </div> 
                <div className="flex"><Label className="w-2/4  pt-1">Gross Wt (Kg)</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="BL No." value={grossWt}  readOnly /> </div>   
                <div className="flex"><Label className="w-2/4  pt-1">Truck No.</Label>
                <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="BL No." value={truck}  readOnly /> </div>       
                    
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
                        <Input className="w-2/4 text-center " placeholder="BL No." ref={blNoRef}  /> </div>

                   

                    <div className="flex"><Label className="w-2/4 pt-1">Container No.</Label>
                        <Input className="w-2/4 text-center" placeholder="Container No." ref={conNoRef}  /> </div>

                  
                    <div className="flex">
                        <Label className="w-2/4 pt-1">Physical Bag Count</Label>
                        <Input className="w-2/4 text-center" placeholder="Bag Count" ref={noOfBagsRef} type="number" required />
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1"> BL Weight (Kg)</Label>
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
export default AlmondPrimaryEntryForm