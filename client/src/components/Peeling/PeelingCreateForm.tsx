
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
    borma: PeelingData[]       
}


interface PeelingRowData{
    id: number;
    LotNo: string;
    origin: string;
    TotalInput: string;
    WholesPeel: number;
    WholesUnpeel:number;
    DP: number;
    DS: number;
    DP1: number;
    JJH: number;
    SJH: number;
    SJH1: number;
    JH1: number;
    JK_K: number;
    SP1: number;
    Mc_on: string;
    Husk: number;
    Rejection: number;
    UnpeelPiece: number;
    Big_Taiho: number;
    Mc_off: string;
    Mc_breakdown: string;
    otherTime: string;
    NoOfTrolley: number;
    pressure: string;
    moisture: string;
    peelingTime: string;
           
}


import {   PeelingData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";
import FormRow from "../common/FormRowTime";


const RCNPeelingCreateForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const huskOpRef = useRef<HTMLInputElement>(null);
    const [operator,setoperator]=useState<string>('')
    const [LotNo,setLotNo]=useState<string>('')
    const [vilLot,setVilLot]=useState<boolean>(false)

   // const operatorRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<PeelingRowData[]>([])
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

        if(props.borma[0]){
            setLotNo(props.borma[0].LotNo)
            if(props.borma[0].LotNo.includes('V')){
                setVilLot(true)
            }
        }
        const initialform =  props.borma.map((item: PeelingData) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            TotalInput: item.TotalInput,
            Mc_on: '00:00',
            Mc_off: '00:00',
            Mc_breakdown: '00:00', 
            otherTime: '00:00',
            NoOfTrolley: parseInt(item.NoOfTrolley), 
            WholesPeel: 0,
            WholesUnpeel:0,
            DP: 0,
            DS: 0,
            DP1: 0,
            JJH: 0,
            SJH: 0,
            SJH1: 0,
            JH1: 0,
            JK_K: 0,
            SP1: 0,
            Husk: 0,
            Rejection: 0,
            UnpeelPiece: 0,
            Big_Taiho: 0,
            pressure: '',
            moisture: '',
            peelingTime: '',
        }));
      
        //console.log(initialform)
        setRows(initialform)
           //console.log(props.borma[0])
        if(props.borma && props.borma[0]){
            setoperator(props.borma[0].noOfOperators)
        }
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
        props.borma.map((item: PeelingData, idx: number) => {
            rows[idx].id=item.id
        })
        //console.log(rows)
console.log(vilLot)
        const date = DateRef.current?.value 
        const dayop = dayOpRef.current?.value  
        const nightop = nightOpRef.current?.value   
        const huskop = huskOpRef.current?.value  
        //const operator = operatorRef.current?.value
       
            const formData = rows.map((row: any) => ({
                Date: date,
                //operator: operator,
                dayoperator: dayop,
                nightoperator: nightop,
                huskoperator: huskop,
                 ...row
            }))
        
            try {
                const initialhumid = await axios.post('/api/peeling/createEntirePeeling', { linehumid:formData,
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
            <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit2}>
               <div className="mx-1 flex flex-col gap-0.5"> 
               {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                <div className="flex"><Label className="w-1/4 pt-1">Date of Entry</Label>
                <Input className="w-1/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>
                <div className="flex"><Label className="w-1/4 pt-1">No. of Operator</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center bg-yellow-100" placeholder="No. of Operator" value={operator} readOnly />
                     </div>
                     <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Day)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={dayOpRef}  />
                     </div>
                     <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Night)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={nightOpRef}  />
                     </div>
                     <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Husk)</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={huskOpRef}  />
                     </div>
                     
                   
                </div>
            
                   <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >Item_LotNo</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Total_Input(Kg)</TableHead>
                        <TableHead className="text-center" >Pressure</TableHead>
                        <TableHead className="text-center" >Moisture (Min%_Max%)</TableHead>
                        <TableHead className="text-center" >Peeling Time (Min(s)_Max(s))</TableHead>
                        <TableHead className="text-center" >No Of Trolley</TableHead>
                        <TableHead className="text-center" >Peeling_On</TableHead>
                        <TableHead className="text-center" >Peeling_Off</TableHead>
                        <TableHead className="text-center" >Breakdown Duration</TableHead>
                        <TableHead className="text-center" >Other Duration</TableHead>
                        <TableHead className="text-center" >Pieces_Unpeel (Village)</TableHead>
                        <TableHead className="text-center">{LotNo ? (LotNo.includes('V')?'Wholes_&_JB (Mayur)':'Wholes_Peel (Mayur)'):'Wholes_Peel (Mayur)'}</TableHead>
                        <TableHead className="text-center">{LotNo ? (LotNo.includes('V')?'LW (Mayur)':'Wholes_UnPeel (Mayur)'):'Wholes_UnPeel (Mayur)'}</TableHead>
                       
                        <TableHead className="text-center" >DP (DP&DS)</TableHead>
                        <TableHead className="text-center" >DP1 (DP&DS)</TableHead>
                        <TableHead className="text-center" >DS (DP&DS)</TableHead>
                        <TableHead className="text-center" >JJH (Sorting)</TableHead>
                        <TableHead className="text-center" >SJH (Sorting)</TableHead>
                        <TableHead className="text-center" >SJH1 (Sorting)</TableHead>
                        <TableHead className="text-center" >JH1 (Sorting)</TableHead>
                        <TableHead className="text-center" >JK/K (Sorting)</TableHead>
                        <TableHead className="text-center" >SP1 (Sorting)</TableHead>
                        <TableHead className="text-center" >Big_Taiho</TableHead>
                        <TableHead className="text-center" >Husk</TableHead>
                        <TableHead className="text-center" >Rejection</TableHead>
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:PeelingRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>

                                        <TableCell className="text-center font-semibold ">{formatNumber(row.TotalInput)} Kg</TableCell>
                                     
                                        <TableCell className="text-center"> <Input  value={row.pressure} placeholder="Pr." onChange={(e) => handleRowChange(idx,'pressure',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.moisture} placeholder="%" onChange={(e) => handleRowChange(idx,'moisture',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.peelingTime} placeholder="sec" onChange={(e) => handleRowChange(idx,'peelingTime',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> {row.NoOfTrolley}</TableCell>
                                        <FormRow idx={idx} row={row} column='Mc_on' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off' handleRowChange={handleRowChange}/>

                                        {/* <TableCell className="text-center"><Input className="bg-red-100" value={row.Mc_off} placeholder="MC Off Time" onChange={(e) => handleRowChange(idx,'Mc_off',e.target.value)} type='time' required /></TableCell> */}
                                        <TableCell className="text-center"><Input  value={row.Mc_breakdown} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.otherTime} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.UnpeelPiece} placeholder="Pr." onChange={(e) => handleRowChange(idx,'UnpeelPiece',e.target.value)} required /></TableCell>

                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.WholesPeel} placeholder="Pr." onChange={(e) => handleRowChange(idx,'WholesPeel',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.WholesUnpeel} placeholder="Pr." onChange={(e) => handleRowChange(idx,'WholesUnpeel',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-red-100' type="number" value={row.DP} placeholder="Pr." onChange={(e) => handleRowChange(idx,'DP',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-red-100' type="number" value={row.DP1} placeholder="Pr." onChange={(e) => handleRowChange(idx,'DP1',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-red-100' type="number" value={row.DS} placeholder="Pr." onChange={(e) => handleRowChange(idx,'DS',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-green-100' type="number" value={row.JJH} placeholder="Pr." onChange={(e) => handleRowChange(idx,'JJH',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-green-100' type="number" value={row.SJH} placeholder="Pr." onChange={(e) => handleRowChange(idx,'SJH',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-green-100'type="number" value={row.SJH1} placeholder="Pr." onChange={(e) => handleRowChange(idx,'SJH1',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-green-100'type="number" value={row.JH1} placeholder="Pr." onChange={(e) => handleRowChange(idx,'JH1',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-green-100' type="number" value={row.JK_K} placeholder="Pr." onChange={(e) => handleRowChange(idx,'JK_K',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-green-100' type="number" value={row.SP1} placeholder="Pr." onChange={(e) => handleRowChange(idx,'SP1',e.target.value)} required /></TableCell>

                                        <TableCell className="text-center"> <Input className='bg-cyan-100' type="number" value={row.Big_Taiho} placeholder="Pr." onChange={(e) => handleRowChange(idx,'Big_Taiho',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-orange-100' type="number" value={row.Husk} placeholder="Pr." onChange={(e) => handleRowChange(idx,'Husk',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-violet-100' type="number" value={row.Rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx,'Rejection',e.target.value)} required /></TableCell>

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
export default RCNPeelingCreateForm;
