interface Props {
    data: {
        id:number;
    machineID:string;
    machineName:string;
    description:string;
    status:string;
    section:string;
    createdBy:string;
    modifiedBy:string;
    }
}

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Section,MachineStatus } from "../common/exportData"
import {  useEffect } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import React from "react";



const ModifymachineForm = (props: Props) => {

    const [machineid, setmachineid] = React.useState<string>("")
    
    const [description, setDescription] = React.useState<string>("")
    const [section, setSection] = React.useState<string>("")
    const [machinename, setMachinename] = React.useState<string>("")
    const [status, setStatus] = React.useState<string>("")


    const [errortext, setErrorText] = React.useState<string>("")
    
    const successdialog = document.getElementById('modifymachinescs') as HTMLInputElement;
    const errordialog = document.getElementById('modifymachineerror') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('modifymachinescsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('modifymachineerrorbtn') as HTMLInputElement;

  

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

        useEffect(() => {
            setmachineid(props.data.machineID)
            setMachinename(props.data.machineName)
            setStatus(props.data.status)
            setDescription(props.data.description)
            setSection(props.data.section)     
        }, [props.data])

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
        }
    
   
    return (
        <>
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

            <div className="flex"><Label className="w-2/4  pt-1">Machine ID</Label>
                    <Input className="w-2/4 " placeholder="Machine Id" value={machineid} onChange={(e) => setmachineid(e.target.value)}  required/> </div>
                <div className="flex"><Label className="w-2/4 pt-1">Machine Name</Label>
                    <Input className="w-2/4 " placeholder="Machine Name" value={machinename} onChange={(e) => setMachinename(e.target.value)}required/> </div>
                

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
                    <Select value={status} onValueChange={(value) => setStatus(value)} required={true}>
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
                    <Textarea className="w-2/4 " placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}    />
                </div>
                
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>

            
        </div>
        <dialog id="modifymachinescs" className="dashboard-modal">
        <button id="modifymachinescsbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={tick} height={2} width={35} alt='tick_image'/>
        <p id="modal-text" className="pl-3 mt-1 font-medium"> Asset has Modified Successfully</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>

    <dialog id="modifymachineerror" className="dashboard-modal">
        <button id="modifymachineerrorbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={cross} height={25} width={25} alt='error_image'/>
        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
        
        {/* <!-- Add more elements as needed --> */}
    </dialog>
    </>)
}
export default ModifymachineForm