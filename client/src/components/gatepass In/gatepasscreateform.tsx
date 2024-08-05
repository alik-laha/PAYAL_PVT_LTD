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

import { GatePassSection } from "../common/exportData";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'


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
    const [type,setType]=useState<string>('IN')
    const [errortext, setErrortext] = useState('')

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
    const addRow2 = () => {
        setRows([...rows,{section:''}])
    }

    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }
    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
// const dialog = document.getElementById('myDialog');
const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;

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
            type:type,
            ...row
        }))

        let gatecount = 0

        for (var data of formData) 
            {
                const gateRes=await axios.post('/api/gatepass/createGatePassMaster', { data })             
                gatecount++;
                if (formData.length === gatecount) 
                {     
                    
                    setErrortext(gateRes.data.message)
                    if (gateRes.status === 200) 
                    {
                        await axios.post('/api/gatepass/updateGatePass', { gatePassNo:data.gatePassNo,status:'SentToReceiver'}) 
                        if(successdialog){
                                (successdialog as any).showModal()
                            }
                           
                            
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

<div className="pl-5 pr-5 ">
            <form className='flex flex-col gap-1 text-xs responsive-80-width' onSubmit={handleSubmit}>          
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
                <Label className="w-2/4 pt-1 ">Type (IN/OUT)</Label>
                <select className="pt-1 w-2/4 text-center flex h-8 rounded-md border border-input bg-background 
                                            px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                            placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                                            focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>setType(e.target.value)} 
                                            value={type} required>
                                                
                                                    <option value='IN' className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent 
                                                focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">IN</option>
                                                    <option value='OUT' className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-accent 
                                                focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">OUT</option>
                                                
                                            </select>  
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
                <div className="flex mt-1">
                    <div className=" w-1/5 mt-3">
                    <button className="ml-4 mt-1 bg-blue-400 font-bold w-2/3 text-grey-700  h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow2}>+ Add </button>
                    </div>
                <div  className="mt-1 w-4/5 ml-4 ">
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



                                            <select className="ml-5  w-38 text-center flex h-8 rounded-md border border-input bg-background 
                                            px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                            placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                                            focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>handleRowChange(index, 'section', e.target.value)} 
                                            value={row.section} required>
                                                <option value="" disabled className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
                                                focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Section</option>
                                                {GatePassSection.map((item: any,idx:number) => (
                                                    <option key={idx} value={item}>{item}</option>
                                                ))}
                                            </select>
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
                
                
                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
               
                </form>
                <dialog id="successemployeedialog" className="dashboard-modal">
                <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                </span>


            </dialog>

            <dialog id="erroremployeedialog" className="dashboard-modal">
                <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p>
                </span>


            </dialog>
</div>  

</>

)


}

export default GatePassCreateForm;