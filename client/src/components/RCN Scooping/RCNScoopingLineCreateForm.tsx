
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
interface ScoopingRowData{
    id:number;
    Scooping_Line_Mc: string;
    Opening_Qty:string;
    Receiving_Qty: string;
    Wholes:string;
    Broken: string;
    Uncut: string;
    Unscoop: string;
    NonCut:string;
    Rejection: string;
    Dust:string;
    KOR:string;
    Trolley_Broken: string;
    Trolley_Small_JB: string;
   
    Mc_on: string;
    Mc_off: string;
    noOfEmployees: string;
    Mc_breakdown: string;
    otherTime: string;
    Brkdwn_reason: string;
    noOfOperators: string;
}

import { ScoopData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {  useRef, useState } from "react"
import axios from "axios";

const RCNScoopingLineCreateForm = (props:any) => {
    //console.log(props)
   
   
    const DateRef = useRef<HTMLInputElement>(null);
    const maleRef = useRef<HTMLInputElement>(null);
    const femaleRef = useRef<HTMLInputElement>(null);
    const supervisorRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<ScoopingRowData[]>([{id:0,Scooping_Line_Mc:'',
        Opening_Qty:'',Receiving_Qty:'',Wholes:'',Broken:'',Uncut:'',
        Unscoop:'',NonCut:'',Rejection:'',Dust:'',KOR:'',Trolley_Small_JB:'',Trolley_Broken:'',
        Mc_on:'',Mc_off:'',Brkdwn_reason:'',Mc_breakdown:'00:00',otherTime:'00:00',noOfEmployees:'',
    noOfOperators:''}
    ]);
    const [errortext, setErrortext] = useState('')

    const handleRowChange = (index:number,field:string,fieldvalue:string|number) => {

        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        props.scoop.map((item: ScoopData, idx: number) => {
            rows[idx].id=item.id
            //rows[idx].Scooping_Line_Mc=item.Scooping_Line_Mc

        })
        console.log(rows)
        const date = DateRef.current?.value  
        const male = maleRef.current?.value
        const female = femaleRef.current?.value
        const supervisor = supervisorRef.current?.value
        try {


            const formData = rows.map((row: any) => ({
                male: male,
                Date: date,
                female: female,
                supervisor: supervisor,
                 ...row

            }))
            let scoopingcount = 0
                for (var data of formData) 
                {
                    axios.put(`/api/scooping/createScooping/${data.id}`, { data }).then(res => {
                        scoopingcount++;
                        if (formData.length === scoopingcount) {
                            setErrortext(res.data.message)

                            // if (res.status === 200) {
                            //    const dialog = document.getElementById("successemployeedialog") as HTMLDialogElement
                            //    dialog.showModal()
                            //     setTimeout(() => {
                            //         dialog.close()
                            //         window.location.reload()
                            //     }, 2000)
                            // }

                        }

                    })
                    .catch(err => {
                            console.log(err)
                            setErrortext(err.response.data.message)
                           
                    }) 
                }
        }
        catch (err) {
            console.log(err)
        }
    }

 
   const handleopen=()=>{

   }
   const handleclose=()=>{

   }


    return (
        <>
        <div className="px-5 py-2 overflow-auto">
            <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit}>
               <div className="mx-8 flex flex-col gap-0.5"> 
               {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                <div className="flex"><Label className="w-2/4 pt-1">Date of Entry</Label>
                <Input className="w-2/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>
                <div className="flex"><Label className="w-2/4 pt-1">No. of Male</Label>
                    <Input className="w-2/4 text-center" placeholder="No. of Male" ref={maleRef} required /> </div>
                    <div className="flex"><Label className="w-2/4 pt-1">No. of Female</Label>
                    <Input className="w-2/4 text-center" placeholder="No. of Female" ref={femaleRef} required /> </div>
                    <div className="flex"><Label className="w-2/4 pt-1">No. Of Supervisors</Label>
                    <Input className="w-2/4 text-center" placeholder="No. of Supervisor" ref={supervisorRef} required /> </div>
                </div>
                   <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
           
  
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >LotNo</TableHead>
                        <TableHead className="text-center" >Scooping Line</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Size Name</TableHead>
                        <TableHead className="text-center" >Opening Qty</TableHead>
                        <TableHead className="text-center" >Receiving Qty</TableHead>
                        <TableHead className="text-center" >Wholes</TableHead>
                        <TableHead className="text-center" >Broken</TableHead>
                        <TableHead className="text-center" >Uncut</TableHead>
                        <TableHead className="text-center" >Unscoop</TableHead>
                        <TableHead className="text-center" >Non Cut</TableHead>
                        <TableHead className="text-center" >Rejection</TableHead>
                        <TableHead className="text-center" >Dust</TableHead>
                        <TableHead className="text-center" >KOR</TableHead>
                        <TableHead className="text-center" >Trolley Broken(%)</TableHead>
                        <TableHead className="text-center" >Trolley SmallJB(%)</TableHead>
                        <TableHead className="text-center" >Scooping On</TableHead>
                        <TableHead className="text-center" >Scooping Off</TableHead>
                        <TableHead className="text-center" >Breakdown Duration</TableHead>
                        <TableHead className="text-center" >Breakdown Reason</TableHead>
                        <TableHead className="text-center" >Other Duration</TableHead>
                        <TableHead className="text-center" >No Of Ladies</TableHead>
                        <TableHead className="text-center" >No Of Operator</TableHead>
                      
                       


                    </TableHeader>
                    <TableBody>
                        {props.scoop.length > 0 ? (
                            props.scoop.map((item: ScoopData, idx: number,row:ScoopingRowData) => {
                                //rows[idx].id=item.id
                                //  {handleRowChange(idx,'id',item.id)}
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{item.LotNo}</TableCell>
                                        
                                        {/* <TableCell className="text-center"><Input value={item.Scooping_Line_Mc} placeholder="Wholes" onChange={(value) => handleRowChange(idx,'Scooping_Line_Mc',value)} required /></TableCell> */}
                                        <TableCell className="text-center">{item.Scooping_Line_Mc}</TableCell>
                                        <TableCell className="text-center">{item.origin}</TableCell>
                                        <TableCell className="text-center">{item.SizeName}</TableCell>
                                        <TableCell className="text-center">{item.Opening_Qty} kg</TableCell>
                                        <TableCell className="text-center">{item.Receiving_Qty} kg</TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Wholes} placeholder="Wholes" onChange={(e) => handleRowChange(idx,'Wholes',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Broken} placeholder="Broken" onChange={(e) => handleRowChange(idx,'Broken',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Uncut} placeholder="Uncut" onChange={(e) => handleRowChange(idx,'Uncut',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Unscoop} placeholder="Unscoop" onChange={(e) => handleRowChange(idx,'Unscoop',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.NonCut} placeholder="NonCut" onChange={(e) => handleRowChange(idx,'NonCut',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Rejection} placeholder="Rejection" onChange={(e) => handleRowChange(idx,'Rejection',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Dust} placeholder="Dust" onChange={(e) => handleRowChange(idx,'Dust',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.KOR} placeholder="KOR" onChange={(e) => handleRowChange(idx,'KOR',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Trolley_Broken} placeholder="Trolley Broken" onChange={(e) => handleRowChange(idx,'Trolley_Broken',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Trolley_Small_JB} placeholder="Trolley SmallJB" onChange={(e) => handleRowChange(idx,'Trolley_Small_JB',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center "> <Input className="bg-green-100"  value={row.Mc_on} placeholder="MC ON Time" onChange={(e) => handleRowChange(idx,'Mc_on',e.target.value)} type='time' required /></TableCell>
                                        <TableCell className="text-center"><Input className="bg-red-100" value={row.Mc_off} placeholder="MC Off Time" onChange={(e) => handleRowChange(idx,'Mc_off',e.target.value)} type='time' required /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.Mc_breakdown} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Brkdwn_reason} placeholder="Reason" onChange={(e) => handleRowChange(idx,'Brkdwn_reason',e.target.value)}  /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.otherTime} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.noOfEmployees} placeholder="Ladies" onChange={(e) => handleRowChange(idx,'noOfEmployees',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.noOfOperators} placeholder="Operators" onChange={(e) => handleRowChange(idx,'noOfOperators',e.target.value)} required /></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        




                                    </TableRow>
                                );
                            })
                        ) : null}
                    </TableBody>
                </Table>  
                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20">Submit</Button>
                  
                   
                  </form>
                  <dialog id="successemployeedialog" className="dashboard-modal">
                  <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                  {/* <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                      <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                  </span> */}
  
  
              </dialog>
  
              <dialog id="erroremployeedialog" className="dashboard-modal">
                  <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                  {/* <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                      <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p>
                  </span> */}
  
  
              </dialog>
                  
              </div>
                          
    
  
                      
                     
  
  
            
          </>
    )
}
export default RCNScoopingLineCreateForm;
