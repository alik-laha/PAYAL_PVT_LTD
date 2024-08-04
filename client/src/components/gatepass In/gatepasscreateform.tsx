import { useEffect, useRef, useState } from "react";
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
import axios from "axios";



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
    const NameRef = useRef<HTMLInputElement>(null)
    const [date,setDate]=useState<string>('')
    const [time,setTime]=useState<string>('')


    useEffect(()=>{
        setDate(new Date().toISOString().slice(0,10))
        setTime(new Date().toTimeString().slice(0,5))

    },[])
    
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

const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const vehicle = vehicleNoRef.current?.value
        const document = DocumentNoRef.current?.value
        const drivername = DriverNameRef.current?.value
        const drivercontact = DriverContactNoref.current?.value
        const grossWt = GrossWtRef.current?.value
        const grossWtSlip = GrossWtSlipRef.current?.value 
        const name = NameRef.current?.value 


try
{
    const creategatepass=await axios.post('/api/gatepass/createGatePass', {})            
    console.log(creategatepass)
    try 
    {
        const formData = rows.map(row => ({
            gatePassNo: creategatepass.data.gatepassNo,
            Date: date,
            Time:time,
            vehicle: vehicle,
            document: document,
            drivername:drivername,
            driverContact:drivercontact,
            grossWt:grossWt,
            GrossWtSlip:grossWtSlip,
            SecName:name,
            ...row
        }))

        let gatecount = 0

        for (var data of formData) 
            {
                const gateRes=await axios.post('/api/gatepass/createGatePassMaster', { data })             
                gatecount++;
                if (formData.length === gatecount) 
                {     
                    if (gateRes.status === 200) 
                    {
                        await axios.post('/api/gatepass/updateGatePass', 
                        { gatePassNo:data.gatePassNo,status:'SentToReceiver'}) 
                    }
                }     
            }

    }
    catch{


    }

}
catch{


}
}



return(
<>

<div className="pl-5 pr-5 responsive-80-width">
            <form className='flex flex-col gap-1 text-xs' onSubmit={handleSubmit}>
         
                
            <div className="mx-8 flex flex-col gap-0.5">  
            <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Date</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Date" value={date} type="date" readOnly required/>
                
                </div>
                  
                      <div className="flex mt-1">
                    <Label className="w-2/4 pt-1 ">Time</Label>
                    <Input className="w-2/4 justify-center" placeholder="Time" value={time} type='time' required readOnly/>
                
                </div>                                     
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
                <div className="flex mt-1">
                    <Label className="w-2/4 pt-1">Name Of Security</Label>
                    <Input className="w-2/4 text-center" placeholder="Security Name" ref={NameRef} required/>
                </div> 
                
                </div>
                <div className="flex">
                    <div className=" w-1/5 mt-3">
                    <button className="ml-4 mt-1 bg-blue-400 font-bold w-2/3 text-grey-700  h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow}>+ Add </button>
                    </div>
                <div  className="mt-1 w-4/5 ml-5 ">
                <Table>
                <TableHeader className="bg-neutral-100 text-stone-950" >
                             <TableHead className="text-center " >Sl. No.</TableHead>
                             <TableHead className="text-center " > Section</TableHead>

                             <TableHead className="text-center" >Action</TableHead>
                             </TableHeader>
                             {rows.map((row,index)=> {
                        return(
                            <>
                             <TableBody>
                             <TableRow key={index} className="boiling-row-height">

                             <TableCell className="text-center " >{index+1}</TableCell>
                             <TableCell className="text-center " >

                             <Select value={row.section} onValueChange={(val) => handleRowChange(index, 'section', val)} required={true}>
                                                <SelectTrigger className="justify-center items-center text-center ml-5 w-44" >
                                                    <SelectValue placeholder="Section"  className="w-44"/>
                                                </SelectTrigger>
                                                <SelectContent >
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
                </div>
               
                </div>
                
                
                
                
                <div>
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                </div>
                </form>
</div>  

</>

)


}

export default GatePassCreateForm;