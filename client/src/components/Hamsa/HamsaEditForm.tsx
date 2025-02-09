
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
    borma: HamsaData[]      
}


interface HamsaRowData{
    
    id: number;
    LotNo: string;
    alt_id:number;
    origin: string;
    mixingLot:string|null;
    rcv_village: string | null;
    rcv_lw: string | null;
    rcv_pw_w: string ;
    rcv_w_lot: string ;
    rcv_ww: string ;   
     issue_pw_210: string ;
        issue_w_210: string ;
        issue_ww_210: string ;
        issue_pw_240: string;
        issue_w_240: string ;
        issue_ww_240: string ;
        issue_pw_280: string;
        issue_w_280: string ;
        issue_ww_280: string ;
        issue_pw_320: string;
        issue_w_320: string ;
        issue_ww_320: string ;
        issue_pw_400: string;
        issue_w_400: string ;
        issue_ww_400: string ;
        issue_lw: string ;
        issue_bigTaiho: string ;
        issue_jb: string ;
        issue_add_1: string;
        issue_add_2: string;
        issue_add_3: string;
        issue_add_4: string;
        issue_add_5: string;
        issue_add_6: string;
        issue_add_7: string;  
        issue_add_8:string ;
    issue_add_9:string ;
    issue_add_10:string ;  
    Mc_on_1: string ;
    Mc_off_1: string ;
    Mc_breakdown_1: string ;
    otherTime_1: string ;
    Mc_on_2: string ;
    Mc_off_2: string ;
    Mc_breakdown_2: string ;
    otherTime_2: string ;
    Mc_on_3: string ;
    Mc_off_3: string ;
    Mc_breakdown_3: string ;
    otherTime_3: string ;
    Mc_on_4: string ;
    Mc_off_4: string ;
    Mc_breakdown_4: string ;
    otherTime_4: string ;
    Mc_on_5: string ;
    Mc_off_5: string ;
    Mc_breakdown_5: string ;
    otherTime_5: string ;
    Mc_on_6: string ;
    Mc_off_6: string ;
    Mc_breakdown_6: string ;
    otherTime_6: string ;
    Mc_on_7: string ;
    Mc_off_7: string ;
    Mc_breakdown_7: string ;
    otherTime_7: string ; 
           
}


import {   HamsaData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";
import FormRow from "../common/FormRowTime";



const HamsaEditForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<HamsaRowData[]>([])
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
      
        const initialform = {
            id: props.borma[0].id,
            LotNo: props.borma[0].LotNo,
            alt_id: props.borma[0].altid,
            origin: props.borma[0].origin,
            mixingLot: props.borma[0].mixingLot,
            rcv_village: props.borma[0].rcv_village,
            rcv_lw: props.borma[0].rcv_lw,
            rcv_pw_w: props.borma[0].rcv_pw_w,
            rcv_w_lot: props.borma[0].rcv_w_lot,
            rcv_ww: props.borma[0].rcv_ww,
            issue_pw_210: props.borma[0].issue_pw_210,
            issue_w_210: props.borma[0].issue_w_210,
            issue_ww_210: props.borma[0].issue_ww_210,
            issue_pw_240: props.borma[0].issue_pw_240,
            issue_w_240: props.borma[0].issue_w_240,
            issue_ww_240: props.borma[0].issue_ww_240,
            issue_pw_280: props.borma[0].issue_pw_280,
            issue_w_280: props.borma[0].issue_w_280,
            issue_ww_280: props.borma[0].issue_ww_280,
            issue_pw_320: props.borma[0].issue_pw_320,
            issue_w_320: props.borma[0].issue_w_320,
            issue_ww_320: props.borma[0].issue_ww_320,
            issue_pw_400: props.borma[0].issue_pw_400,
            issue_w_400: props.borma[0].issue_w_400,
            issue_ww_400: props.borma[0].issue_ww_400,
            issue_lw: props.borma[0].issue_lw,
            issue_bigTaiho: props.borma[0].issue_bigTaiho,
            issue_jb: props.borma[0].issue_jb,
            issue_add_1: props.borma[0].issue_add_1,
            issue_add_2: props.borma[0].issue_add_2,
            issue_add_3: props.borma[0].issue_add_3,
            issue_add_4: props.borma[0].issue_add_4,
            issue_add_5: props.borma[0].issue_add_5,
            issue_add_6: props.borma[0].issue_add_6,
            issue_add_7: props.borma[0].issue_add_7,
            issue_add_8: props.borma[0].issue_add_8,
            issue_add_9: props.borma[0].issue_add_9,
            issue_add_10: props.borma[0].issue_add_10,
            Mc_on_1: props.borma[0].Mc_on_1,
            Mc_off_1: props.borma[0].Mc_off_1,
            Mc_breakdown_1: props.borma[0].Mc_breakdown_1,
            otherTime_1: props.borma[0].otherTime_1,
            Mc_on_2: props.borma[0].Mc_on_2,
            Mc_off_2: props.borma[0].Mc_off_2,
            Mc_breakdown_2: props.borma[0].Mc_breakdown_2,
            otherTime_2: props.borma[0].otherTime_2,
            Mc_on_3: props.borma[0].Mc_on_3,
            Mc_off_3: props.borma[0].Mc_off_3,
            Mc_breakdown_3: props.borma[0].Mc_breakdown_3,
            otherTime_3: props.borma[0].otherTime_3,
            Mc_on_4: props.borma[0].Mc_on_4,
            Mc_off_4: props.borma[0].Mc_off_4,
            Mc_breakdown_4: props.borma[0].Mc_breakdown_4,
            otherTime_4: props.borma[0].otherTime_4,
            Mc_on_5: props.borma[0].Mc_on_5,
            Mc_off_5: props.borma[0].Mc_off_5,
            Mc_breakdown_5: props.borma[0].Mc_breakdown_5,
            otherTime_5: props.borma[0].otherTime_5,
            Mc_on_6: props.borma[0].Mc_on_6,
            Mc_off_6: props.borma[0].Mc_off_6,
            Mc_breakdown_6: props.borma[0].Mc_breakdown_6,
            otherTime_6: props.borma[0].otherTime_6,
            Mc_on_7: props.borma[0].Mc_on_7,
            Mc_off_7: props.borma[0].Mc_off_7,
            Mc_breakdown_7: props.borma[0].Mc_breakdown_7,
            otherTime_7: props.borma[0].otherTime_7
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
        if (resStatus1.data.scoopingLot[0].latest_section && resStatus1.data.scoopingLot[0].latest_section !=='Hamsa') 
            {
            setErrortext(`Lot is Already Linked to ${resStatus1.data.scoopingLot[0].latest_section} Section`)
            if(errordialog){
                (errordialog as any).showModal()
            }
            
            return
        }
        setisdisable(true)
        props.borma.map((item: HamsaData, idx: number) => {
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
                const initialhumid = await axios.post('/api/hamsa/updateHamsa', { linehumid:formData,
                    LotNo:props.borma[0].LotNo
                 })
                console.log(initialhumid)         
                    setErrortext(initialhumid.data.message)
                    if (initialhumid.status === 201) {
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
                    <TableHead className="text-center">Mixed_Lot</TableHead>
                    <TableHead className="text-center">Rcv PW_W</TableHead>
                    <TableHead className="text-center">Rcv W_Lot</TableHead>
                    <TableHead className="text-center">Rcv WW</TableHead>
                    <TableHead className="text-center">Rcv Village</TableHead>
                    <TableHead className="text-center">Rcv LW</TableHead>
                    
                    <TableHead className="text-center">Issue PW_210</TableHead>
                    <TableHead className="text-center">Issue W_210</TableHead>
                    <TableHead className="text-center">Issue WW_210</TableHead>
                    <TableHead className="text-center">Issue PW_240</TableHead>
                    <TableHead className="text-center">Issue W_240</TableHead>
                    <TableHead className="text-center">Issue WW_240</TableHead>
                    <TableHead className="text-center">Issue PW_280</TableHead>
                    <TableHead className="text-center">Issue W_280</TableHead>
                    <TableHead className="text-center">Issue WW_280</TableHead>
                    <TableHead className="text-center">Issue PW_320</TableHead>
                    <TableHead className="text-center">Issue W_320</TableHead>
                    <TableHead className="text-center">Issue WW_320</TableHead>
                    <TableHead className="text-center">Issue PW_400</TableHead>
                    <TableHead className="text-center">Issue W_400</TableHead>
                    <TableHead className="text-center">Issue WW_400</TableHead>
                    {/* <TableHead className="text-center">Issue Add 1</TableHead>
                    <TableHead className="text-center">Issue Add 2</TableHead>
                    <TableHead className="text-center">Issue Add 3</TableHead>
                    <TableHead className="text-center">Issue Add 4</TableHead>
                    <TableHead className="text-center">Issue Add 5</TableHead>
                    <TableHead className="text-center">Issue Add 6</TableHead>
                    <TableHead className="text-center">Issue Add 7</TableHead>
                    <TableHead className="text-center">Issue Add 8</TableHead>
                    <TableHead className="text-center">Issue Add 9</TableHead>
                    <TableHead className="text-center">Issue Add 10</TableHead> */}
                    <TableHead className="text-center">Issue LW</TableHead>
                    <TableHead className="text-center">Issue BigTaiho</TableHead>
                    <TableHead className="text-center">Issue JB</TableHead> 
                    <TableHead className="text-center">Mc On (Hamsa-1)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa-1)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-1)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-1)</TableHead>
                    <TableHead className="text-center">Mc On (Hamsa-2)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa-2)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-2)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-2)</TableHead>
                    <TableHead className="text-center">Mc On (Hamsa-3)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa-3)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-3)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-3)</TableHead>
                    <TableHead className="text-center">Mc On (Hamsa-4)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa-4)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-4)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-4)</TableHead>
                    <TableHead className="text-center">Mc On (Hamsa-5)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa-5)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-5)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-5)</TableHead>
                    <TableHead className="text-center">Mc On (Spectrum)</TableHead>
                    <TableHead className="text-center">Mc Off (Spectrum)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Spectrum)</TableHead>
                    <TableHead className="text-center">Other_Time (Spectrum)</TableHead>
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:HamsaRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.mixingLot}</TableCell>
                                        <TableCell className="text-center font-semibold text-green-600 bg-yellow-100">{formatNumber(row.rcv_pw_w)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-600 bg-yellow-100">{formatNumber(row.rcv_w_lot)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-600 bg-yellow-100">{formatNumber(row.rcv_ww)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-600">{row.rcv_village ? formatNumber(row.rcv_village) :0} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-600">{row.rcv_lw ? formatNumber(row.rcv_lw) :0} Kg</TableCell>
                                        
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_pw_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_210', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_w_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_210', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ww_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_210', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_pw_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_240', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_w_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_240', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ww_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_240', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_pw_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_280', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_w_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_280', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ww_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_280', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_pw_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_320', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_w_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_320', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ww_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_320', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_pw_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_400', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_w_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_400', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ww_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_400', e.target.value)} required /></TableCell>                             
                                    {/* <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_1', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_2', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_3} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_3', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_4} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_4', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_5} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_5', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_6} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_6', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_7} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_7', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_8} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_8', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_9} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_9', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_10} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_10', e.target.value)} required /></TableCell> */}
                                     <TableCell className="text-center"> <Input className='bg-cyan-100' type="number" value={row.issue_lw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-red-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-blue-100' type="number" value={row.issue_jb} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jb', e.target.value)} required /></TableCell>


                                    <FormRow idx={idx} row={row} column='Mc_on_1' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_1' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.Mc_breakdown_1} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_1',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.otherTime_1} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_1',e.target.value)} type='time'  /></TableCell>
                                     
                                        <FormRow idx={idx} row={row} column='Mc_on_2' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_2' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.Mc_breakdown_2} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_2',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.otherTime_2} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_2',e.target.value)} type='time'  /></TableCell>
                                    
                                        <FormRow idx={idx} row={row} column='Mc_on_3' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_3' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.Mc_breakdown_3} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_3',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.otherTime_3} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_3',e.target.value)} type='time'  /></TableCell>
                                    
                                        <FormRow idx={idx} row={row} column='Mc_on_4' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_4' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.Mc_breakdown_4} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_4',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.otherTime_4} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_4',e.target.value)} type='time'  /></TableCell>
                                      
                                        <FormRow idx={idx} row={row} column='Mc_on_5' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_5' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.Mc_breakdown_5} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_5',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.otherTime_5} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_5',e.target.value)} type='time'  /></TableCell>

                                        <FormRow idx={idx} row={row} column='Mc_on_6' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off_6' handleRowChange={handleRowChange}/>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.Mc_breakdown_6} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown_6',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center bg-purple-300"><Input  value={row.otherTime_6} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime_6',e.target.value)} type='time'  /></TableCell>
                                    
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
export default HamsaEditForm;
