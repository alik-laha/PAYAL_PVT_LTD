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
import {useContext, useRef, useState } from "react"
import { Origin ,Size} from "../common/exportData"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { machine } from "os"
import Context from "../context/context"
import { AssetData } from "@/type/type"


interface RowData{
    origin:string;
    sizeName:string;
    size:string;
    ScoopingLine:string;
    pressure:string;
    cookingTime:string;
    cookingOn:string;
    cookingOff:string;
    breakDown:string;
    other:string;
}


const RCNBoilingEntryForm = () => {

    const lotNoRef = useRef<HTMLInputElement>(null)
    const DateRef = useRef<HTMLInputElement>(null)
    const [mc_name, setMc_name] = useState('')
    const noofEmployeeRef = useRef<HTMLInputElement>(null)

    const [rows,setRows]=useState<RowData[]>([{origin:'',sizeName:'',
        size:'',ScoopingLine:'',pressure:'',cookingTime:'',cookingOn:'',cookingOff:'',breakDown:'',other:''}
    ]);

    const [errortext, setErrortext] = useState('')

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {

        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
    const addRow = () => {
        setRows([...rows,{origin:'',sizeName:'',
        size:'',ScoopingLine:'',pressure:'',cookingTime:''
        ,cookingOn:'',cookingOff:'',breakDown:'',other:''}])
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const date = DateRef.current?.value  
        const noOfEmployees = noofEmployeeRef.current?.value
        const lotNo = lotNoRef.current?.value
        const Mc_name = mc_name

        const formData=rows.map( row=>({
            columnLotNo:lotNo,
            columnDate:date,
            columnEmployee:noOfEmployees,
            columnMC:Mc_name,...row

        }))
        console.log('Submitted Data:',formData);

       
    };

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

    const { AllMachines } = useContext(Context)
    return (
        <>
            <div>
                <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>
                   
                    <div className="flex"><Label className="w-2/4  pt-1">Date of Receving</Label>
                    <Input className="w-2/4 " placeholder="Date" ref={DateRef} type="date" required /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Lot No.</Label>
                    <Input className="w-2/4 " placeholder="Lot No." ref={lotNoRef} required /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">No. Of Labours</Label>
                    <Input className="w-2/4 " placeholder="No. Of Labour" ref={noofEmployeeRef} required /> </div>
                    <div className="flex">
                    <Label className="w-2/4">Machine Name</Label>
                    <Select value={mc_name} onValueChange={(value) => setMc_name(value)} required={true}>
                        <SelectTrigger className="w-2/4">
                            <SelectValue placeholder="Machine Name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    AllMachines.map((item: AssetData, indx) => {
                                        return (
                                            <SelectItem key={indx} value={item.machineName}>
                                                {item.machineName}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>
                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center"
                    onClick={addRow}>+Add Row</Button>

                    {rows.map((row,index)=> {
                        return(
                            <>
                            <div className="flex">
                            <Label className="w-2/4 pt-1">Origin</Label>
                            <Select value={row.origin} onValueChange={(val) => handleRowChange(index,'origin',val)} required={true}>
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
                        
                        
                        
                        
                        
                        <Label className="w-2/4 pt-1">Size</Label>
                            <Select value={row.sizeName} onValueChange={(val) => handleRowChange(index,'sizeName',val)} required={true}>
                                <SelectTrigger className="w-2/4">
                                    <SelectValue placeholder="Size Name" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            Size.map((item) => {
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
                    </>
                        )
                   
                    })}
                   
                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
                  
                   
                </form>
                
            </div>
                        
  

                    
                   


          
        </>
    )


}
export default RCNBoilingEntryForm