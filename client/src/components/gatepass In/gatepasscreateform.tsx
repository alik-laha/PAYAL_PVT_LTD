import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GatePassSection } from "../common/exportData";
import { MdDelete } from "react-icons/md";



interface SectionRowData{
    section:string;
}
const GatePassCreateForm = () => {
    const vehicleNoRef = useRef<HTMLInputElement>(null)
    const DocumentNoRef = useRef<HTMLInputElement>(null)
    const DriverNameRef = useRef<HTMLInputElement>(null)
    const DriverContactNoref = useRef<HTMLInputElement>(null)
    const GrossWtRef = useRef<HTMLInputElement>(null)
    const GrossWtSlipRef = useRef<HTMLInputElement>(null)
    
    const [rows,setRows]=useState<SectionRowData[]>([{section:''}
    ]);

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
    const addRow = () => {
        setRows([...rows,{section:''}])
    }

    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }

const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const vehicle = vehicleNoRef.current?.value
        const document = DocumentNoRef.current?.value
        const drivername = DriverNameRef.current?.value
        const drivercontact = DriverContactNoref.current?.value
        const grossWt = GrossWtRef.current?.value
        const grossWtSlip = GrossWtSlipRef.current?.value 
}



return(
<>

<div className="pl-5 pr-5 ">
            <form className='flex flex-col gap-1.5 text-xs' onSubmit={handleSubmit}>
         
                
            <div className="mx-8 flex flex-col gap-1">                                          
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Vehicle No</Label>
                    <Input className="w-2/4 text-center" placeholder="Vehicle No" ref={vehicleNoRef} required/>
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Chalan No(*)</Label>
                    <Input className="w-2/4 text-center" placeholder="Doc No." ref={DocumentNoRef} required/>
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Driver Name</Label>
                    <Input className="w-2/4 text-center" placeholder="Driver Name" ref={DriverNameRef} />
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Driver Contact</Label>
                    <Input className="w-2/4 text-center" placeholder="Contact No" ref={DriverContactNoref} />
                </div>
                
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Gross Wt.</Label>
                    <Input className="w-2/4 text-center" placeholder="Gross Wt." ref={GrossWtRef} required/>
                </div>
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Gross Wt. Slip </Label>
                    <Input className="w-2/4 text-center" placeholder="Slip No." ref={GrossWtSlipRef} />
                </div>
                
                </div>
                <button className="ml-5 bg-blue-400 font-bold text-grey-700 w-20 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow}>+ Add </button>
                <Table className="mt-1 w-4/5 ml-5">
                <TableHeader className="bg-neutral-100 text-stone-950" >
                             <TableHead className="text-center w-20" >Sl. No.</TableHead>
                             <TableHead className="text-center w-30" > Section</TableHead>
                            
                             <TableHead className="text-center" >Action</TableHead>
                             </TableHeader>
                             {rows.map((row,index)=> {
                        return(
                            <>
                             <TableBody>
                             <TableRow key={index} className="boiling-row-height">

                             <TableCell className="text-center w-20" >{index+1}</TableCell>
                             <TableCell className="text-center w-30" >

                             <Select value={row.section} onValueChange={(val) => handleRowChange(index, 'section', val)} required={true}>
                                                <SelectTrigger className="justify-center items-center text-center ml-5" >
                                                    <SelectValue placeholder="Section" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            GatePassSection.map((item) => {
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

                                <TableCell className="text-center">
                                          <Button className="bg-red-400 text-grey-700 w-7 h-7  text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={()=>deleteRow(index)}><MdDelete size={20}/></Button>
                                          </TableCell>

                                </TableRow>
                             </TableBody>
                             </>
                        )
                   
                    })}


                </Table>
                
                
                <div>
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>
                </form>
</div>  

</>

)


}

export default GatePassCreateForm;