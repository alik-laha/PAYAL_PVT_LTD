
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {  SKUSection, SKUUnit, TypeOnSection } from "../common/exportData"
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
    const [type, setType] =useState<string>('')
    
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
      
       

       
        axios.post('/api/vendorSKU/createSKU', { sku,unit,section,type})
        .then((res) => {
            console.log(res)
            if(successdialog!=null){
                (successdialog as any).showModal();
            }
            if(skuref.current!=null){
                skuref.current.value='';
            }
        setUnit('')
        setType('')  
        setSection('')
       
           
              
}).catch((err) => {
    console.log(err)
    
            setErrorText(err.response.data.message)
            if(errordialog!=null){
                (errordialog as any).showModal();
            }
        
    
})
      
    }


   
    return (
        <>
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-2 mt-5' onSubmit={handleSubmit}>
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

                    <div className="flex"><Label className="w-2/4  pt-1">Type of SKU</Label>
                    <select className="w-2/4 text-center flex h-8 rounded-md border border-input bg-background 
                                            px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                            placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                                            focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>setType(e.target.value)} 
                                            value={type} required>
                                                <option value="" disabled className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
                                                focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">type</option>
                                            
                                                 {section ? (
                                        TypeOnSection[section as keyof typeof TypeOnSection].map((item) => (
                                            <option key={item} value={item}>{item}</option>
                                        ))
                                    ) : null}
                                            </select>
                    {/* <Input   placeholder="Section"/>  */}
                    </div>
                    
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

