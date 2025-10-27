
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
    mixingLot:string|null;
    rcv_peeling:string;
    rcv_wholespeel: number;
    rcv_wholesunpeel: number;
    rcv_sorting:number;
    rcv_DPDS:number;
    rcv_village:number;
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



const RCNMayurReCreateEditForm = (props:Props) => {
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

      
        const initialform =  {
            id: props.borma[0].id,
            LotNo: props.borma[0].LotNo,
            alt_id:props.borma[0].altid,
            origin: props.borma[0].origin,
            mixingLot:props.borma[0].mixingLot,
            rcv_sorting:Number(props.borma[0].rcv_sorting),
            rcv_DPDS:Number(props.borma[0].rcv_DPDS),
            rcv_village:Number(props.borma[0].rcv_village),
            rcv_transfer:props.borma[0].rcv_transfer,
            rcv_peeling:(props.borma[0].rcv_wholespeel) + Number(props.borma[0].rcv_wholesunpeel)+(props.borma[0].rcv_DPDS ? Number(props.borma[0].rcv_DPDS) : 0) +
            (props.borma[0].rcv_village ? Number(props.borma[0].rcv_village):0)+(props.borma[0].rcv_sorting ? Number(props.borma[0].rcv_sorting):0),
            rcv_wholespeel: Number(props.borma[0].rcv_wholespeel),
            rcv_wholesunpeel: Number(props.borma[0].rcv_wholesunpeel),
            issue_pw_w: Number(props.borma[0].issue_pw_w),
            issue_w_lot: Number(props.borma[0].issue_w_lot),
            issue_ww: Number(props.borma[0].issue_ww),
            issue_rejection: Number(props.borma[0].issue_rejection),
            issue_village: Number(props.borma[0].issue_village),
            issue_bigTaiho: Number(props.borma[0].issue_bigTaiho),
            issue_LW: Number(props.borma[0].issue_LW),
            issue_JB: Number(props.borma[0].issue_JB),
      
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
        const resStatus1 = await axios.post('/api/boiling/pendingLotCountOrigin', { lotNo: props.borma[0].LotNo,origin:props.borma[0].origin})
        console.log(resStatus1)
        if (resStatus1.data.scoopingLot && resStatus1.data.scoopingLot[0].editStatus ==='Pending') 
            {
                setErrortext(`Modification of Lot is Pending in Linked  ${resStatus1.data.scoopingLot[0].latest_section} Section`)
                const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
           // console.log(rows)
            return
            }
        if((Number(rows[0].rcv_peeling)
         !== (Number(rows[0].rcv_wholespeel) + Number(rows[0].rcv_wholesunpeel)+(rows[0].rcv_DPDS ? Number(rows[0].rcv_DPDS) : 0) +
        (rows[0].rcv_village ? Number(rows[0].rcv_village):0)+(rows[0].rcv_sorting ? Number(rows[0].rcv_sorting):0)))){
            setErrortext('Total Receiving Balance should be equal to Opening Balance')
           
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
           // console.log(rows)
            return
        }
        if(((props.borma[0].rcv_DPDS ? Number(props.borma[0].rcv_DPDS):0) < Number(rows[0].rcv_DPDS))
            || ((props.borma[0].rcv_village ? Number(props.borma[0].rcv_village):0) < Number(rows[0].rcv_village)) 
            || ((props.borma[0].rcv_sorting ? Number(props.borma[0].rcv_sorting):0) < Number(rows[0].rcv_sorting))
            || (Number(props.borma[0].rcv_wholespeel) < Number(rows[0].rcv_wholespeel) )
            || (Number(props.borma[0].rcv_wholesunpeel) < Number(rows[0].rcv_wholesunpeel))
            
        ){
               setErrortext('Current Receiving should not Exceed Previous Receiving Value')
              
               const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
               dialogerror.showModal()
              // console.log(rows)
               return
   
           }
        if(Number(props.borma[0].current_backlog) <= 0){
            setErrortext('Backlog Cannot be Zero or Negative While Re-Issue')
           
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
           // console.log(rows)
            return

        }
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
                const initialhumid = await axios.post('/api/mayur/createReissueMayur', { linehumid:formData,
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
            <form className='flex flex-col gap-1 pt-5' onSubmit={handleSubmit2}>
               <div className="mx-1 flex flex-col gap-1"> 
               {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                <div className="flex"><Label className="w-1/4 pt-1">Date of Entry</Label>
                <Input className="w-1/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>
               
                     <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Day)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={dayOpRef}  />
                     </div>
                     <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Night)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={nightOpRef}  />
                     </div>
                   
                     
                   
                </div>
                      <Label className="w-100 pt-5 text-center">1. General Information</Label>
                <div className="my-2 text-sm flex font-semibold text-red-500 ">* Current [ WholesPeel + WholesUnpeel + DPDS + Village + Sorting ] should be equal to {props.borma[0].current_backlog} Kg</div>

                   <Table className="mt-3">
                   <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl. No.</TableHead>
                    <TableHead className="text-center">Lot_No</TableHead>
              
                    <TableHead className="text-center">Origin</TableHead>
                    <TableHead className="text-center">Mixed_Lot</TableHead>
                    <TableHead className="text-center">Total Opening</TableHead>
                    <TableHead className="text-center">Previous Wholes_Peel</TableHead>
                    <TableHead className="text-center">Current Peel</TableHead>
                    <TableHead className="text-center">Previous Wholes_Unpeel</TableHead>
                    <TableHead className="text-center">Current Unpeel</TableHead>
                    <TableHead className="text-center">Previous DPDS</TableHead>
                    <TableHead className="text-center">Current DPDS</TableHead>
                    <TableHead className="text-center">Previous Village</TableHead>
                    <TableHead className="text-center">Current Village</TableHead>
                    <TableHead className="text-center">Previous Sorting</TableHead>
                    <TableHead className="text-center">Current Sorting</TableHead>
              
                    <TableHead className="text-center">Issue PW_W</TableHead>
                    <TableHead className="text-center">Issue W_Lot</TableHead>
                    <TableHead className="text-center">Issue WW</TableHead>
                    
                    <TableHead className="text-center">Issue Village</TableHead>
                    <TableHead className="text-center">Issue Big_Taiho</TableHead>
                    <TableHead className="text-center">Issue LW</TableHead>
                    <TableHead className="text-center">Issue JB</TableHead>
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    {/* <TableHead className="text-center">Mc On 133</TableHead>
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
                    <TableHead className="text-center">Other_Time 293</TableHead> */}
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:mayurRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-blue-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold ">{row.origin}</TableCell>
                                        <TableCell className="text-center font-semibold ">{row.mixingLot}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(row.rcv_peeling)} Kg</TableCell>
                                     
                                        <TableCell className="text-center font-semibold text-red-500">{formatNumber(props.borma[0].rcv_wholespeel)} Kg</TableCell>
                                        <TableCell className="text-center"> <Input className="bg-green-100" type="number" value={row.rcv_wholespeel} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_wholespeel', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{formatNumber(props.borma[0].rcv_wholesunpeel)} Kg</TableCell>
                                        <TableCell className="text-center"> <Input type="number" className="bg-green-100" value={row.rcv_wholesunpeel} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_wholesunpeel', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{props.borma[0].rcv_DPDS ?formatNumber(props.borma[0].rcv_DPDS):0} Kg</TableCell>
                                        <TableCell className="text-center"> <Input className="bg-green-100" type="number" value={row.rcv_DPDS} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_DPDS', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{props.borma[0].rcv_village ?formatNumber(props.borma[0].rcv_village):0} Kg</TableCell>
                                        <TableCell className="text-center"> <Input className="bg-green-100" type="number" value={row.rcv_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_village', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{props.borma[0].rcv_sorting ?formatNumber(props.borma[0].rcv_sorting):0} Kg</TableCell>
                                        <TableCell className="text-center"> <Input className="bg-green-100" type="number" value={row.rcv_sorting} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_sorting', e.target.value)} required /></TableCell>
                                 
                                        {/* <TableCell className="text-center font-semibold ">{Number(formatNumber(row.rcv_wholesunpeel)) + Number(formatNumber(row.rcv_wholespeel))} Kg</TableCell> */}
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_pw_w} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_w', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_w_lot} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_lot', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ww} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_LW} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_LW', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_JB} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_JB', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>



                                        {/* <FormRow idx={idx} row={row} column='Mc_on_133' handleRowChange={handleRowChange}/>
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
                                        <TableCell className="text-center"><Input  value={row.otherTime_293} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_293',e.target.value)} type='time'  /></TableCell> */}
                                    
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
                                                                                   
                                                                                      <TableCell className='bg-neutral-300'> <FormRow idx={idx} row={row} column='Mc_on_133' handleRowChange={handleRowChange}/></TableCell>
                                                                                       
                                                                                         <TableCell className='bg-neutral-300'><FormRow idx={idx} row={row} column='Mc_off_133' handleRowChange={handleRowChange}/></TableCell>
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
            <dialog id="successemployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                  <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                  <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                      <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p>
                  </span>
  
  
              </dialog>
  
              <dialog id="erroremployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                  <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                  <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                      <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p>
                  </span>
  
  
              </dialog>
                  
              </div>
                          
    
  
                      
                     
  
  
            
          </>
    )
}
export default RCNMayurReCreateEditForm;
