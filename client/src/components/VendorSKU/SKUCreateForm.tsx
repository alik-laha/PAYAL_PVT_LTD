
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {  SKUSection, SKUUnit } from "../common/exportData"
import { useState, useRef } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

const SKUCreateForm = () =>{
    const [section, setSection] =useState<string>('')
    const [unit, setUnit] =useState<string>('')
    
    const [errortext, setErrorText] = useState<string>("")
   
    const skuref = useRef<HTMLInputElement>(null)

  
    
    const successdialog = document.getElementById('machinescs') as HTMLInputElement;
    const errordialog = document.getElementById('machineerror') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('machinescsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('machineerrorbtn') as HTMLInputElement;
    
    if(closeDialogButton){
        closeDialogButton.addEventListener('click', () => {
            if(successdialog!=null){
                (successdialog as any).close();
                //window.location.reload()
                setUnit('')
            
            setSection('')
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const sku = skuref.current?.value
      
       

       
        axios.post('/api/vendorSKU/createSKU', { sku,unit,section})
        .then((res) => {
            console.log(res)
            if(successdialog!=null){
                (successdialog as any).showModal();
            }
            if(skuref.current!=null){
                skuref.current.value='';
            }
           setUnit('')
            
        setSection('')
       
           
              
}).catch((err) => {
    console.log(err)
    
            setErrorText('Duplicate Entry is Not Allowed')
            if(errordialog!=null){
                (errordialog as any).showModal();
            }
        
    
})
      
    }


   
    return (
        <>
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-2 mt-5' onSubmit={handleSubmit}>

            <div className="flex"><Label className="w-2/4  pt-1">Item Name (SKU)</Label>
                    <Input className="w-2/4 text-center" placeholder="item" ref={skuref} required/> </div>


               <div className="flex"><Label className="w-2/4  pt-1">Unit</Label>
                    <Select value={unit} onValueChange={(value) => setUnit(value)} required={true}>
                        <SelectTrigger className="w-2/4 justify-center">
                            <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    SKUUnit.map((item) => {
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
                 

                <div className="flex"><Label className="w-2/4  pt-1">Section</Label>
                    <Select value={section} onValueChange={(value) => setSection(value)} required={true}>
                        <SelectTrigger className="w-2/4 justify-center">
                            <SelectValue placeholder="Section" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    SKUSection.map((item) => {
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
                  
                  
                
                <Button className="bg-orange-500 mb-4 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
            </form>

            
        </div>
        <dialog id="machinescs" className="dashboard-modal">
        <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
        <span className="flex"><img src={tick} height={2} width={35} alt='tick_image'/>
        <p id="modal-text" className="pl-3 mt-1 font-medium">New SKU has Created Successfully</p></span>
        
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
export default SKUCreateForm
