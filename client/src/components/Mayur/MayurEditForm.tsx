
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

interface Props {
    borma: MayurData[]      
}


interface mayurRowData{
    
    id: number;
    LotNo: string;
    alt_id:number;
    origin: string;

    
    rcv_wholespeel: string;
    rcv_wholesunpeel: string;
    rcv_sorting:string|null;
    rcv_DPDS:string|null;
    rcv_village:string|null;
    
    issue_pw_w: string;
    issue_w_lot: string;
    issue_ww: string;
    issue_rejection: string;
    issue_village: string;
    issue_bigTaiho: string;
    issue_LW: string;
    issue_JB: string;

    Mc_on_133: string ;
    Mc_off_133: string ;
    Mc_breakdown_133: string ;
    otherTime_133: string ;
    
    Mc_on_331: string ;
    Mc_off_331: string ;
    Mc_breakdown_331: string ;
    otherTime_331: string ;
   
    Mc_on_292: string ;
    Mc_off_292: string ;
    Mc_breakdown_292: string ;
    otherTime_292: string ;
    
    Mc_on_293: string ;
    Mc_off_293: string ;
    Mc_breakdown_293: string ;
    otherTime_293: string ;
           
}


import {   MayurData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";
import FormRow from "../common/FormRowTime";


const RCNMayurEditForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<mayurRowData[]>([])
    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;
    const [isdisable,setisdisable]=useState<boolean>(false)
    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
                window.location.reload();
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
    useEffect(() => { 
        if(DateRef.current) {
            DateRef.current.value = props.borma[0].date.slice(0,10)
        }

        if(dayOpRef.current) {
            dayOpRef.current.value = props.borma[0].noOfdayOperators.toString()
        }

        if(nightOpRef.current) {
            nightOpRef.current.value = props.borma[0].noOfnightOperators.toString()
        }
      
        const initialform =  {
            id: props.borma[0].id,
            LotNo: props.borma[0].LotNo,
            alt_id:props.borma[0].altid,
            origin: props.borma[0].origin,

            rcv_sorting:props.borma[0].rcv_sorting,
            rcv_DPDS:props.borma[0].rcv_DPDS,
            rcv_village:props.borma[0].rcv_village,
            
            rcv_wholespeel: props.borma[0].rcv_wholespeel,
            rcv_wholesunpeel: props.borma[0].rcv_wholesunpeel,
            issue_pw_w: props.borma[0].issue_pw_w,
            issue_w_lot: props.borma[0].issue_w_lot,
            issue_ww: props.borma[0].issue_ww,
            issue_rejection: props.borma[0].issue_rejection,
            issue_village: props.borma[0].issue_village,
            issue_bigTaiho: props.borma[0].issue_bigTaiho,
            issue_LW: props.borma[0].issue_LW,
            issue_JB: props.borma[0].issue_JB,
      
            Mc_on_133: props.borma[0].Mc_on_133,
            Mc_off_133: props.borma[0].Mc_off_133,
            Mc_breakdown_133: props.borma[0].Mc_breakdown_133,
            otherTime_133: props.borma[0].otherTime_133,
            Mc_on_331: props.borma[0].Mc_on_331,
            Mc_off_331: props.borma[0].Mc_off_331,
            Mc_breakdown_331: props.borma[0].Mc_breakdown_331,
            otherTime_331: props.borma[0].otherTime_331,
            Mc_on_292: props.borma[0].Mc_on_292,
            Mc_off_292: props.borma[0].Mc_off_292,
            Mc_breakdown_292: props.borma[0].Mc_breakdown_292,
            otherTime_292: props.borma[0].otherTime_292,
            Mc_on_293: props.borma[0].Mc_on_293,
            Mc_off_293: props.borma[0].Mc_off_293,
            Mc_breakdown_293: props.borma[0].Mc_breakdown_293,
            otherTime_293: props.borma[0].otherTime_293,
        };
        
      
        //console.log(initialform)
        setRows([initialform])
           //console.log(props.borma[0])
      
        //console.log(rows)
    }, [props.borma]); 

    const [errortext, setErrortext] = useState('')
    const handleRowChange = (index:number,field:string,fieldvalue:string|number) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
        //console.log(rows)
    }
    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        
        setisdisable(true)
        props.borma.map((item: MayurData, idx: number) => {
            rows[idx].id=item.id
        })
        console.log(rows)
        const date = DateRef.current?.value 
        const dayop = dayOpRef.current?.value  
        const nightop = nightOpRef.current?.value   
       
        //const operator = operatorRef.current?.value
       
            const formData = rows.map((row: any) => ({
                Date: date,
                //operator: operator,
                dayoperator: dayop,
                nightoperator: nightop,
               
                 ...row
            }))
        
            try {
                const initialhumid = await axios.post('/api/mayur/updateMayur', { linehumid:formData,
                    LotNo:props.borma[0].LotNo
                 })
                console.log(initialhumid)         
                    setErrortext(initialhumid.data.message)
                    if (initialhumid.status === 200) {
                        const dialog2 = document.getElementById("successemployeedialog") as HTMLDialogElement
                        dialog2.showModal()
                        setTimeout(() => {
                            dialog2.close()
                            window.location.reload()
                        }, 3000)
                    }
                    
            }
            catch (err) {
                console.log(err)
                if (axios.isAxiosError(err)) {
                    setErrortext(err.response?.data.message || 'An Unexpected Error Occured')
                }
                else {
                    setErrortext('An Unexpected Error Occured')
                }
                const dialog = document.getElementById("erroremployeedialog") as HTMLDialogElement
                dialog.showModal()
                setTimeout(() => {
                    dialog.close()
                }, 2000)
            }
            finally{
                setisdisable(false)
            }

                         
       
    }
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }

 
    return (
        <>
        <div className="px-5 py-2 overflow-auto">
            <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit2}>
               <div className="mx-8 flex flex-col gap-0.5"> 
               {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                <div className="flex"><Label className="w-2/4 pt-1">Date of Entry</Label>
                <Input className="w-2/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>
               
                     <div className="flex"><Label className="w-2/4 pt-1">No. of Operator(Day)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={dayOpRef}  />
                     </div>
                     <div className="flex"><Label className="w-2/4 pt-1">No. of Operator(Night)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={nightOpRef}  />
                     </div>
                   
                     
                   
                </div>
            
                   <Table className="mt-3">
                   <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl. No.</TableHead>
                    <TableHead className="text-center">Lot_No</TableHead>
              
                    <TableHead className="text-center">Origin</TableHead>
                 
                   
                    <TableHead className="text-center">Opening Wholes_Peel</TableHead>
                    <TableHead className="text-center">Opening Wholes_UnPeel</TableHead>
                   
                    <TableHead className="text-center">Issue PW_W</TableHead>
                    <TableHead className="text-center">Issue W_Lot</TableHead>
                    <TableHead className="text-center">Issue WW</TableHead>
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    <TableHead className="text-center">Issue Village</TableHead>
                    <TableHead className="text-center">Issue Big_Taiho</TableHead>
                    <TableHead className="text-center">Issue LW</TableHead>
                    <TableHead className="text-center">Issue JB</TableHead>
                    <TableHead className="text-center">Mc On 133</TableHead>
                    <TableHead className="text-center">Mc Off 133</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 133</TableHead>
                    <TableHead className="text-center">Other_Time 133</TableHead>
                    <TableHead className="text-center">Mc On 331</TableHead>
                    <TableHead className="text-center">Mc Off 331</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 331</TableHead>
                    <TableHead className="text-center">Other_Time 331</TableHead>
                    <TableHead className="text-center">Mc On 292</TableHead>
                    <TableHead className="text-center">Mc Off 292</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 292</TableHead>
                    <TableHead className="text-center">Other_Time 292</TableHead>
                    <TableHead className="text-center">Mc On 293</TableHead>
                    <TableHead className="text-center">Mc Off 293</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 293</TableHead>
                    <TableHead className="text-center">Other_Time 293</TableHead>
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:mayurRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>

                                        <TableCell className="text-center font-semibold ">{formatNumber(row.rcv_wholespeel)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold ">{formatNumber(row.rcv_wholesunpeel)} Kg</TableCell>
                                       
                                        {/* <TableCell className="text-center font-semibold ">{Number(formatNumber(row.rcv_wholesunpeel)) + Number(formatNumber(row.rcv_wholespeel))} Kg</TableCell> */}
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_pw_w} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_w', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_w_lot} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_lot', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ww} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_LW} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_LW', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_JB} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_JB', e.target.value)} required /></TableCell>
                                     


                                        <FormRow idx={idx} row={row} column='Mc_on_133' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_133' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center"><Input  value={row.Mc_breakdown_133} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_133',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.otherTime_133} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_133',e.target.value)} type='time'  /></TableCell>
                                     
                                        <FormRow idx={idx} row={row} column='Mc_on_331' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_331' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center"><Input  value={row.Mc_breakdown_331} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_331',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.otherTime_331} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_331',e.target.value)} type='time'  /></TableCell>
                                    
                                        <FormRow idx={idx} row={row} column='Mc_on_292' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_292' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center"><Input  value={row.Mc_breakdown_292} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_292',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.otherTime_292} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_292',e.target.value)} type='time'  /></TableCell>
                                    
                                        <FormRow idx={idx} row={row} column='Mc_on_293' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_293' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center"><Input  value={row.Mc_breakdown_293} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_293',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.otherTime_293} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_293',e.target.value)} type='time'  /></TableCell>
                                    
                                    </TableRow>
                                );
                            })
                        ) : null}
                    </TableBody>
                </Table>  
                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                  
                   
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
export default RCNMayurEditForm;
