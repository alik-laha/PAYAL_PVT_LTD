
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
   
    origin: string;
    mixing_lot: string|null;
    rcv_wholespeel: string;
    rcv_wholesunpeel: string;
    rcv_sorting:string|null;
    rcv_DPDS:string|null;
    rcv_village:string|null;
    rcv_transfer:string|null;
    issue_pw_w: number;
    issue_w_lot: number;
    issue_ww: number;
    issue_rejection: number;
    issue_village: number;
    issue_bigTaiho: number;
    issue_LW: number;
    issue_JB: number;

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



const RCNMayurCreateForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [LotNo,setLotNo]=useState<string>('')
    const [vilLot,setVilLot]=useState<boolean>(false)
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

      
        const initialform = props.borma.map((item: MayurData) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            mixing_lot: item.mixingLot,
            rcv_wholespeel: item.rcv_wholespeel,
            rcv_wholesunpeel: item.rcv_wholesunpeel,
            rcv_sorting: item.rcv_sorting,
            rcv_DPDS: item.rcv_DPDS,
            rcv_village:item.rcv_village,
            rcv_transfer: item.rcv_transfer,
            issue_pw_w: 0,
            issue_w_lot: 0,
            issue_ww: 0,
            issue_rejection: 0,
            issue_village: 0,
            issue_bigTaiho: 0,
            issue_LW: 0,
            issue_JB: 0,
            Mc_on_133: '00:00',
            Mc_off_133: '00:00',
            Mc_breakdown_133: '00:00',
            otherTime_133: '00:00',
            Mc_on_331: '00:00',
            Mc_off_331: '00:00',
            Mc_breakdown_331: '00:00',
            otherTime_331: '00:00',
            Mc_on_292: '00:00',
            Mc_off_292: '00:00',
            Mc_breakdown_292: '00:00',
            otherTime_292: '00:00',
            Mc_on_293: '00:00',
            Mc_off_293: '00:00',
            Mc_breakdown_293: '00:00',
            otherTime_293: '00:00',
        }));
        if(props.borma[0]){
            setLotNo(props.borma[0].LotNo)
            if(props.borma[0].LotNo.includes('V')){
                setVilLot(true)
            }
        }
        
      
        //console.log(initialform)
        setRows(initialform)
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
                const initialhumid = await axios.post('/api/mayur/createEntireMayur', { linehumid:formData,
                    LotNo:props.borma[0].LotNo,vilLot
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
            <form className='flex flex-col gap-1 pt-5' onSubmit={handleSubmit2}>
               <div className="mx-1 flex flex-col gap-1"> 
               {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                <div className="flex"><Label className="w-1/4 pt-1">Date of Entry</Label>
                <Input className="w-1/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> 
                <Label className="w-1/4  text-end font-semibold ">Total Receiving : </Label>
                {props.borma[0] ? <Label className="w-1/4 text-left ml-2 font-semibold text-red-500">{props.borma[0].current_backlog} Kg</Label>  : <Label className="w-1/4 text-center font-semibold text-red-500">0</Label> }
                
                
                </div>
               
                     <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Day)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={dayOpRef}  />

                    <Label className="w-1/4 text-end font-semibold ">Total Issue : </Label>
                 <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">{rows[0] ?(Number(rows[0].issue_w_lot)+Number(rows[0].issue_village)+
                    Number(rows[0].issue_ww)+Number(rows[0].issue_pw_w)+Number(rows[0].issue_JB)+Number(rows[0].issue_LW)+Number(rows[0].issue_bigTaiho)+Number(rows[0].issue_rejection)).toFixed(2):0} Kg</Label> 
                  
                     </div>
                     <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Night)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={nightOpRef}  />

                     <Label className="w-1/4 text-end font-semibold  ">Backlog : </Label>
                 <Label className="w-1/4 text-left font-semibold ml-2 text-red-500 " >{props.borma[0] && rows[0] ?(Number(props.borma[0].current_backlog)-(Number(rows[0].issue_w_lot)+Number(rows[0].issue_village)+
                    Number(rows[0].issue_ww)+Number(rows[0].issue_pw_w)+Number(rows[0].issue_JB)+Number(rows[0].issue_LW)+Number(rows[0].issue_bigTaiho)+Number(rows[0].issue_rejection))).toFixed(2):0} Kg</Label>
                  
                     </div>
                   
                     
                   
                </div>
                <Label className="w-100 pt-5 text-center">1. General Information</Label>
                   <Table className="mt-3">
                   <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl. No.</TableHead>
                    <TableHead className="text-center">Lot_No</TableHead>
              
                    <TableHead className="text-center">Origin</TableHead>
                    <TableHead className="text-center">Mixed_Lot</TableHead>
                    {/* <TableHead className="text-center">Mixed Amount</TableHead> */}
                    <TableHead className="text-center">{LotNo ? (LotNo.includes('V')?'Receive Wholes_&_JB':'Receive_Wholes_Peel'):'Receive_Wholes_Peel'}</TableHead>
                    <TableHead className="text-center">{LotNo ? (LotNo.includes('V')?'Receive LW':'Receive_Wholes_UnPeel'):'Receive_Wholes_UnPeel'}</TableHead>
                    <TableHead className="text-center">Receive Peeling</TableHead>
                    <TableHead className="text-center">Receive DPDS</TableHead>
                    <TableHead className="text-center">Receive Sorting</TableHead>
                    <TableHead className="text-center">Receive Village</TableHead>
                   
 
                   
                   
                    <TableHead className="text-center">{LotNo ? (LotNo.includes('V')?'Issue V_PW_W':'Issue PW_W'):'Issue PW_W'}</TableHead>
                    <TableHead className="text-center">{LotNo ?(LotNo.includes('V')?'Issue V_W_Lot':'Issue W_Lot'):'Issue W_Lot'}</TableHead>
                    <TableHead className="text-center">{LotNo ?(LotNo.includes('V')?'Issue V_WW':'Issue WW'):'Issue WW'}</TableHead>
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    <TableHead className="text-center">Issue Village</TableHead>
                    <TableHead className="text-center">Issue Big_Taiho</TableHead>
                    <TableHead className="text-center">Issue LW</TableHead>
                    <TableHead className="text-center">Issue JB</TableHead>
                   
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:mayurRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.mixing_lot}</TableCell>
                                        {/* <TableCell className="text-center font-semibold text-red-500">{row.rcv_transfer ? formatNumber(row.rcv_transfer) :''} </TableCell> */}
                                        <TableCell className="text-center bg-yellow-100 font-semibold ">{formatNumber(row.rcv_wholespeel)} Kg</TableCell>
                                        <TableCell className="text-center bg-yellow-100 font-semibold ">{formatNumber(row.rcv_wholesunpeel)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{formatNumber((Number(row.rcv_wholespeel)+Number(row.rcv_wholesunpeel)).toString())} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{row.rcv_DPDS ? formatNumber(row.rcv_DPDS):0} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{row.rcv_sorting ? formatNumber(row.rcv_sorting):0} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{row.rcv_village ? formatNumber(row.rcv_village):0} Kg</TableCell>
                                        
                                        
                                        {/* <TableCell className="text-center font-semibold ">{Number(formatNumber(row.rcv_wholesunpeel)) + Number(formatNumber(row.rcv_wholespeel))} Kg</TableCell> */}
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_pw_w} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_w', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_w_lot} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_lot', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ww} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_LW} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_LW', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_JB} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_JB', e.target.value)} required /></TableCell>
                                     


                                       
                                    
                                    </TableRow>
                                );
                            })
                        ) : null}
                    </TableBody>
                </Table>  

                    <Label className="w-100 pt-5 text-center">2. Machine Information</Label>
                                                <Table className="mt-3">
                                                   <TableHeader className="bg-neutral-100 text-stone-950 ">
                                                   <TableHead className="text-center">Mc On 133</TableHead>
                    <TableHead className="text-center ">Mc Off 133</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 133</TableHead>
                    <TableHead className="text-center ">Other_Time 133</TableHead>
                    <TableHead className="text-center ">Mc On 331</TableHead>
                    <TableHead className="text-center ">Mc Off 331</TableHead>
                    <TableHead className="text-center ">Mc_Breakdown 331</TableHead>
                    <TableHead className="text-center ">Other_Time 331</TableHead>
                    <TableHead className="text-center ">Mc On 292</TableHead>
                    <TableHead className="text-center ">Mc Off 292</TableHead>
                    <TableHead className="text-center ">Mc_Breakdown 292</TableHead>
                    <TableHead className="text-center ">Other_Time 292</TableHead>
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
                                                                  
                                                                     <TableCell className='bg-sky-100'> <FormRow idx={idx} row={row} column='Mc_on_133' handleRowChange={handleRowChange}/></TableCell>
                                                                      
                                                                        <TableCell className='bg-sky-100'><FormRow idx={idx} row={row} column='Mc_off_133' handleRowChange={handleRowChange}/></TableCell>
                                        <TableCell className="text-center bg-neutral-300"><Input  value={row.Mc_breakdown_133} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_133',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-neutral-300"><Input  value={row.otherTime_133} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_133',e.target.value)} type='time'  /></TableCell>
                                     
                                        <TableCell className='bg-neutral-100'><FormRow idx={idx} row={row} column='Mc_on_331' handleRowChange={handleRowChange}/></TableCell>
                                        <TableCell className='bg-neutral-100'><FormRow idx={idx} row={row} column='Mc_off_331' handleRowChange={handleRowChange}/></TableCell>
                                        <TableCell className="text-center bg-neutral-100"><Input  value={row.Mc_breakdown_331} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_331',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-neutral-100"><Input  value={row.otherTime_331} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_331',e.target.value)} type='time'  /></TableCell>
                                    
                                        <TableCell className='bg-neutral-300'><FormRow idx={idx} row={row} column='Mc_on_292' handleRowChange={handleRowChange}/></TableCell>
                                        <TableCell className='bg-neutral-300'><FormRow idx={idx} row={row} column='Mc_off_292' handleRowChange={handleRowChange}/></TableCell>
                                        <TableCell className="text-center bg-neutral-300"><Input  value={row.Mc_breakdown_292} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_292',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-neutral-300"><Input  value={row.otherTime_292} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_292',e.target.value)} type='time'  /></TableCell>
                                    
                                        <TableCell className='bg-neutral-100'><FormRow idx={idx} row={row} column='Mc_on_293' handleRowChange={handleRowChange}/></TableCell>
                                        <TableCell className='bg-neutral-100'><FormRow idx={idx} row={row} column='Mc_off_293' handleRowChange={handleRowChange}/></TableCell>
                                        <TableCell className="text-center bg-neutral-100"><Input  value={row.Mc_breakdown_293} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_293',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-neutral-100"><Input  value={row.otherTime_293} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_293',e.target.value)} type='time'  /></TableCell>
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
export default RCNMayurCreateForm;
