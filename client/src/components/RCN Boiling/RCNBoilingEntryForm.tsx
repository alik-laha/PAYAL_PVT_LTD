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

import Context from "../context/context"
import { AssetData } from "@/type/type"


interface RowData{
    origin:string;
    sizeName:string;
    size:string;
    ScoopingLine:string;
    CookingTime:string;
    moisture:string;
    pressure:string;  
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
import { MdDelete } from "react-icons/md";
const RCNBoilingEntryForm = () => {

    //const lotNoRef = useRef<HTMLInputElement>(null)
    const DateRef = useRef<HTMLInputElement>(null)
    const [mc_name, setMc_name] = useState('')
  //  const [lotNo, setLotNO] = useState<string>('')
    //const [mc2_name, setMc2_name] = useState('')
    const noofEmployeeRef = useRef<HTMLInputElement>(null)

    const [rows,setRows]=useState<RowData[]>([{origin:'',sizeName:'',
        size:'',ScoopingLine:'',pressure:'',moisture:'',CookingTime:'',cookingOn:'',cookingOff:'',breakDown:'00:00',other:'00:00'}
    ]);

    const [errortext, setErrortext] = useState('')

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {

        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
    const addRow = () => {
        setRows([...rows,{origin:'',sizeName:'',
        size:'',ScoopingLine:'',pressure:'',moisture:'',CookingTime:'',
        cookingOn:'',cookingOff:'',breakDown:'00:00',other:'00:00'}])
    }

    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const date = DateRef.current?.value  
        const noOfEmployees = noofEmployeeRef.current?.value
       // const lotNo = lotNoRef.current?.value
        const Mc_name = mc_name

        // const formData=rows.map( row=>({
        //     columnLotNo:lotNo,
        //     columnDate:date,
        //     columnEmployee:noOfEmployees,
        //     columnMC:Mc_name,...row

        // }))
        //console.log('Submitted Data:',formData);
  
       try{
        axios.post('/api/boiling/createLotNo', { }) .then(res => {
            console.log(res)
            //setLotNO(res.data.newSequence)  
            const formData=rows.map( row=>({
                columnLotNo:res.data.newSequence,
                columnDate:date,
                columnEmployee:noOfEmployees,
                columnMC:Mc_name,...row
    
            }))
            let boilingcount=0
           
                for (const data of formData){
                    axios.post('/api/boiling/createBoiling', { data }) .then(res => {
                       boilingcount++;
                       if(formData.length===boilingcount){
                           setErrortext(res.data.message)
                            
                           if (res.status === 200) {
                               const dialog = document.getElementById("successemployeedialog") as HTMLDialogElement
                               dialog.showModal()
                               setTimeout(() => {
                                   dialog.close()
                                   window.location.reload()
                               }, 2000)
                           }
       
                       }
                      
                   })
                   .catch(err => {
                       console.log(err)
                       setErrortext(err.response.data.message)
                       axios.delete(`/api/boiling/deleteLotNo/${data.columnLotNo}`).then((res) => {
                        console.log(res.data)
                        })
                        axios.delete(`/api/boiling/deleteBoilingByLotNo/${data.columnLotNo}`).then((res) => {
                            console.log(res.data)
                            })
                       const dialog = document.getElementById("erroremployeedialog") as HTMLDialogElement
                       dialog.showModal()
                       setTimeout(() => {
                           dialog.close()
                       }, 2000)
                   })
       
               
    
            }
        }).catch(err => {
            console.log(err)
            
        })
        
        
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
    const { AllNewMachines } = useContext(Context)
    return (
        <>
            <div className="px-5">
                <form className='flex flex-col gap-1 pt-4' onSubmit={handleSubmit}>
                   <div className="mx-8 flex flex-col gap-1"> 
                    <div className="flex"><Label className="w-2/4 pt-1">Date of Entry</Label>
                    <Input className="w-2/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>
                   
                    <div className="flex"><Label className="w-2/4  pt-1">Labours</Label>
                    <Input className="w-2/4 " placeholder="No. of Labours" ref={noofEmployeeRef} required /> </div>
                    <div className="flex">
                    <Label className="w-2/4 pt-1">Machine Name</Label>
                    <Select value={mc_name} onValueChange={(value) => setMc_name(value)} required={true}>
                        <SelectTrigger className="w-2/4 justify-center">
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
                    </div>
                    <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow}>+</button>
                    <Table className="mt-1">
                             <TableHeader className="bg-neutral-100 text-stone-950" >
                             <TableHead className="text-center" >Sl. No.</TableHead>
                             <TableHead className="text-center" >Origin</TableHead>
                             <TableHead className="text-center" >Size</TableHead>
                             <TableHead className="text-center" >Boiling Quantity</TableHead>
                             <TableHead className="text-center" >Scooping Line No.</TableHead>
                             <TableHead className="text-center" >Pressure</TableHead>
                             <TableHead className="text-center" >Moisture</TableHead>
                             <TableHead className="text-center" >Cooking On</TableHead>
                             <TableHead className="text-center" >Cooking Off</TableHead>
                             <TableHead className="text-center" >Cooking Time</TableHead>
                             <TableHead className="text-center" >Breakdown Duration</TableHead>
                             <TableHead className="text-center" >Other Duration</TableHead>
                             <TableHead className="text-center" >Action</TableHead>
                             </TableHeader>
                    {rows.map((row,index)=> {
                        return(
                            <>
                             
                                 <TableBody>
                                        <TableRow key={index} className="boiling-row-height">
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell className="text-center">
                                            <Select value={row.origin} onValueChange={(val) => handleRowChange(index, 'origin', val)} required={true}>
                                                <SelectTrigger className="justify-center w-20">
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
                                                <SelectTrigger className="justify-center w-20" >
                                                    <SelectValue placeholder="Size" />
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
                                    
                                        
                                        <TableCell className="text-center">
                                        <Input  value={row.size} placeholder="Bag" onChange={(e) => handleRowChange(index,'size',e.target.value)} required />
                                        </TableCell>
                                            <TableCell className="text-center" >
                                            <Select value={row.ScoopingLine} onValueChange={(val) => handleRowChange(index, 'ScoopingLine', val)} required={true}>
                                                <SelectTrigger  className="justify-center w-40">
                                                    <SelectValue placeholder="Line No." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                           AllNewMachines &&  AllNewMachines.map((item) => {
                                                                return (
                                                                    <SelectItem key={item.machineID} value={item.machineName}>
                                                                        {item.machineName}
                                                                    </SelectItem>
                                                                )
                                                            })
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                        </TableCell>
                                     
                                        <TableCell className="text-center"><Input  value={row.pressure} placeholder="psi" onChange={(e) => handleRowChange(index,'pressure',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.moisture} placeholder="%" onChange={(e) => handleRowChange(index,'moisture',e.target.value)} required /></TableCell>

                                        <TableCell className="text-center "> <Input className="bg-green-100"  value={row.cookingOn} placeholder="MC ON Time" onChange={(e) => handleRowChange(index,'cookingOn',e.target.value)} type='time' required /></TableCell>
                                        <TableCell className="text-center"><Input className="bg-red-100" value={row.cookingOff} placeholder="MC Off Time" onChange={(e) => handleRowChange(index,'cookingOff',e.target.value)} type='time' required /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.CookingTime}  placeholder="CookingTime" onChange={(e) => handleRowChange(index,'CookingTime',e.target.value)} type='time' required /></TableCell>
                                          <TableCell className="text-center"><Input  value={row.breakDown} defaultValue='00:00' placeholder="Break Down Time" onChange={(e) => handleRowChange(index,'breakDown',e.target.value)} type='time'  /></TableCell>
                                          <TableCell className="text-center"><Input  value={row.other} defaultValue='00:00' placeholder="Other" onChange={(e) => handleRowChange(index,'other',e.target.value)} type='time'  /></TableCell>
                                          <TableCell className="text-center">
                                          <button className="bg-red-400 text-grey-700 w-7 h-7  text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={()=>deleteRow(index)}><MdDelete size={20}/></button>
                                          </TableCell>
                                        
                                         
                                        </TableRow>

                </TableBody>
                            
                    </>
                        )
                   
                    })}

                    </Table>
                   
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
export default RCNBoilingEntryForm