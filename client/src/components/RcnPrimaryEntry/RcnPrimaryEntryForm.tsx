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
import { useState, useRef } from "react"
import { Origin } from "../common/exportData"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'


const RcnPrimaryEntryForm = () => {
    const [origin, setOrigin] = useState<string>("")
    const blNoRef = useRef<HTMLInputElement>(null)
    const conNoRef = useRef<HTMLInputElement>(null)
    const truckNoRef = useRef<HTMLInputElement>(null)
    const blWeightRef = useRef<HTMLInputElement>(null)
    const netWeightRef = useRef<HTMLInputElement>(null)
    const noOfBagsRef = useRef<HTMLInputElement>(null)
    
    const dialog = document.getElementById('myDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('closeDialog') as HTMLInputElement;
    if(closeDialogButton){
        closeDialogButton.addEventListener('click', () => {
            if(dialog!=null){
                (dialog as any).close();
            }
            
          });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const blNo = blNoRef.current?.value
        const conNo = conNoRef.current?.value
        const truckNo = truckNoRef.current?.value
        const blWeight = blWeightRef.current?.value
        const netWeight = netWeightRef.current?.value
        const noOfBags = noOfBagsRef.current?.value
        console.log({ origin, blNo, conNo, truckNo, blWeight, netWeight })
        axios.post('/api/rcnprimary/create', { origin, blNo, conNo, truckNo, blWeight, netWeight, noOfBags })
        .then((res) => {
            console.log(res)
            if(dialog!=null){
                (dialog as any).showModal();
            }
            if(blNoRef.current!=null){
                blNoRef.current.value='';
            }
            if(conNoRef.current!=null){
                conNoRef.current.value='';
            }
            if(truckNoRef.current!=null){
                truckNoRef.current.value='';
            }
            if(blWeightRef.current!=null){
                blWeightRef.current.value='';
            }
            if(netWeightRef.current!=null){
                netWeightRef.current.value='';
            }
            if(noOfBagsRef.current!=null){
                noOfBagsRef.current.value='';
            }
            setOrigin('')
           
          
            
})
      
    }
    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                <div className="flex mt-8"><Label className="w-2/4  pt-1">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)} required={true}>
                        <SelectTrigger className="w-2/4">
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
                    {/* <Input   placeholder="Origin"/>  */}</div>
                <div className="flex"><Label className="w-2/4  pt-1">BL No.</Label>
                    <Input className="w-2/4 " placeholder="BL No." ref={blNoRef} required/> </div>
                <div className="flex"><Label className="w-2/4 pt-1">Container No.</Label>
                    <Input className="w-2/4 " placeholder="Container No." ref={conNoRef} required/> </div>
                <div className="flex"><Label className="w-2/4 pt-1" > Truck No.</Label>
                    <Input className="w-2/4 " placeholder="Truck No." ref={truckNoRef} required />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1">Total Bags</Label>
                    <Input className="w-2/4 " placeholder="Total Bags" ref={noOfBagsRef} type="number" required />
                </div>
                <div className="flex">
                    <Label className="w-2/4 pt-1"> BL Weight</Label>
                    <Input className="w-2/4 " placeholder="BL Weight" ref={blWeightRef} type="number" required/>
                </div>
                <div className="flex"><Label className="w-2/4 pt-1"> Net Weight</Label>
                    <Input className="w-2/4 " placeholder="Net Weight" ref={netWeightRef} type="number" required/>
                </div>
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>

            <dialog id="myDialog" className="dashboard-modal">
                <button id="closeDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={30} width={40} alt='tick_image'/>
                <p id="modal-text" className="pl-3 mt-1 font-medium">RCN Primary Entry Submitted Successfully</p></span>
                
                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </div>
    )


}
export default RcnPrimaryEntryForm