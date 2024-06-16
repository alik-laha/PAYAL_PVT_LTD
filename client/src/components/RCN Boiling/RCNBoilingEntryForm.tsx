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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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

       try{
        for (const data of formData){
             axios.post('/api/boiling/createBoiling', { data })

        }
       }
       catch (err){
        console.log(err)
       }
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
                <form className='flex flex-col gap-1 pt-4' onSubmit={handleSubmit}>
                   
                    <div className="flex"><Label className="w-2/4  pt-1">Date of Receving</Label>
                    <Input className="w-2/4 " placeholder="Date" ref={DateRef} type="date" required /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Lot No.</Label>
                    <Input className="w-2/4 " placeholder="Lot No." ref={lotNoRef} required /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">No. Of Labours</Label>
                    <Input className="w-2/4 " placeholder="No. Of Labour" ref={noofEmployeeRef} required /> </div>
                    <div className="flex">
                    <Label className="w-2/4 pt-1">Machine Name</Label>
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
                    <button className="bg-blue-400 text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow}>+</button>
                    <Table className="mt-1">
                             <TableHeader className="bg-neutral-100 text-stone-950" style={{height:'10px'}}>
                             <TableHead className="text-center" >Sl. No.</TableHead>
                             <TableHead className="text-center" >Origin</TableHead>
                             <TableHead className="text-center" >Size Name</TableHead>
                             <TableHead className="text-center" >Boiling Quantity</TableHead>
                             <TableHead className="text-center" >Scooping Line</TableHead>
                             <TableHead className="text-center" >Pressure</TableHead>
                             <TableHead className="text-center" >Cooking On</TableHead>
                             <TableHead className="text-center" >Cooking Off</TableHead>
                             <TableHead className="text-center" >Breakdown</TableHead>
                             <TableHead className="text-center" >Other</TableHead>
                             </TableHeader>
                    {rows.map((row,index)=> {
                        return(
                            <>
                             
                                 <TableBody>
                                        <TableRow key={index} >
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell className="text-center">
                                            <Select value={row.origin} onValueChange={(val) => handleRowChange(index, 'origin', val)} required={true}>
                                                <SelectTrigger>
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
                                        </TableCell>
                                        <TableCell className="text-center" >
                                            <Select value={row.sizeName} onValueChange={(val) => handleRowChange(index, 'sizeName', val)} required={true}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Name" />
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

                                        </TableCell>
                                        <TableCell >
                                        <Input  value={row.size} placeholder="Bag" onChange={(e) => handleRowChange(index,'size',e.target.value)} required />
                                        </TableCell>
                                        <TableCell className="text-center" >
                                            <Select value={row.sizeName} onValueChange={(val) => handleRowChange(index, 'sizeName', val)} required={true}>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Name" />
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

                                        </TableCell>
                                        <TableCell><Input  value={row.pressure} placeholder="Pr." onChange={(e) => handleRowChange(index,'pressure',e.target.value)} required /></TableCell>
                                        
                                        <TableCell> <Input  value={row.cookingOn} placeholder="MC ON Time" onChange={(e) => handleRowChange(index,'cookingOn',e.target.value)} type='time' required /></TableCell>
                                        <TableCell><Input  value={row.cookingOff} placeholder="MC Off Time" onChange={(e) => handleRowChange(index,'cookingOff',e.target.value)} type='time' required /></TableCell>

                                          <TableCell><Input  value={row.breakDown} placeholder="Break Down Time" onChange={(e) => handleRowChange(index,'breakDown',e.target.value)} type='time'  /></TableCell>
                                          <TableCell><Input  value={row.other} placeholder="Other" onChange={(e) => handleRowChange(index,'other',e.target.value)} type='time'  /></TableCell>
                                        </TableRow>

                </TableBody>
                            
                    </>
                        )
                   
                    })}

                    </Table>
                   
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                  
                   
                </form>
                
            </div>
                        
  

                    
                   


          
        </>
    )


}
export default RCNBoilingEntryForm