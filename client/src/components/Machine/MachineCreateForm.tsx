
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Section,MachineStatus } from "../common/exportData"
import { useState, useRef } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

const MachineCreateForm = () =>{
    const [section, setSection] =useState<string>('')
    const [machinestatus, setMachineStatus] = useState<string>("")
    const [errortext, setErrorText] = useState<string>("")

    const machineIdref = useRef<HTMLInputElement>(null)
    const machinenameref = useRef<HTMLInputElement>(null)
    const descriptionref = useRef<HTMLTextAreaElement>(null)
    
    const successdialog = document.getElementById('machinescs') as HTMLInputElement;
    const errordialog = document.getElementById('machineerror') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('machinescsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('machineerrorbtn') as HTMLInputElement;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const machineId = machineIdref.current?.value
        const machinename = machinenameref.current?.value
        const description = descriptionref.current?.value

        if(closeDialogButton){
            closeDialogButton.addEventListener('click', () => {
                if(successdialog!=null){
                    (successdialog as any).close();
                   // window.location.reload()
                }
                
                
              });
        }
        if(errorcloseDialogButton){
            errorcloseDialogButton.addEventListener('click', () => {
                if(errordialog!=null){
                    (errordialog as any).close();
                   
                }
                
              });
        }
       
        console.log({ machineId,machinename,section, machinestatus,description })
        axios.post('/api/asset/createmachine', { machineId,machinename,section, machinestatus,description})
        .then((res) => {
            console.log(res)
            if(successdialog!=null){
                (successdialog as any).showModal();
            }
            if(machineIdref.current!=null){
                machineIdref.current.value='';
            }
            if(machinenameref.current!=null){
                machinenameref.current.value='';
            }
            if(descriptionref.current!=null){
                descriptionref.current.value='';
            }
            setSection('')
            setMachineStatus('')
           
              
}).catch((err) => {
    console.log(err)
    if(err.response.data.error.original.errno===1062)
        {
            setErrorText('Duplicate Entry is Not Allowed')
            if(errordialog!=null){
                (errordialog as any).showModal();
            }
            return
        }
    setErrorText(err.response.data.message)
    if(errordialog!=null){
        (errordialog as any).showModal();
    }
    
})
      
    }
   
    return (
        <>
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

            <div className="flex"><Label className="w-2/4  pt-1">Machine ID</Label>
                    <Input className="w-2/4 " placeholder="Machine Id" ref={machineIdref} required/> </div>
                <div className="flex"><Label className="w-2/4 pt-1">Machine Name</Label>
                    <Input className="w-2/4 " placeholder="Machine Name" ref={machinenameref} required/> </div>
                

                <div className="flex"><Label className="w-2/4  pt-1">Section</Label>
                    <Select value={section} onValueChange={(value) => setSection(value)} required={true}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Section" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Section.map((item) => {
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
                    {/* <Input   placeholder="Section"/>  */}
                    </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Machine Status</Label>
                    <Select value={machinestatus} onValueChange={(value) => setMachineStatus(value)} required={true}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    MachineStatus.map((item) => {
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
                    {/* <Input   placeholder="Section"/>  */}</div>
                    <div className="flex"><Label className="w-2/4 pt-1" > Description</Label>
                    <Textarea className="w-2/4 " placeholder="Description" ref={descriptionref}  />
                </div>
                
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>

            
        </div>
        <dialog id="machinescs" className="dashboard-modal">
        <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={tick} height={2} width={35} alt='tick_image'/>
        <p id="modal-text" className="pl-3 mt-1 font-medium">New Asset has created Successfully</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>

    <dialog id="machineerror" className="dashboard-modal">
        <button id="machineerrorbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={cross} height={25} width={25} alt='error_image'/>
        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>
    </>
    )
}
export default MachineCreateForm

