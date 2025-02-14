
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
    borma: SortingData[]       
}


interface SortingRowData{
        id: number;
        LotNo: string;
        origin: string;
        rcv_transfer: string|null;
        rcv_jjh: string;
        rcv_sjh: string;
        rcv_sjh1: string;
        rcv_sp1: string;
        rcv_jk_k: string; 
        rcv_jh1: string;
        rcv_bigTaiho:string|null;
        issue_jjh: number ;
        issue_jjh1: number ;
        issue_sjh: number ;
        issue_jk:number;
        issue_jk1: number ;
        issue_k: number ;
        issue_k1:number;
        issue_lwp: number ;
        issue_lwp1: number ;
        issue_s:number;
        issue_ss: number ;
        issue_yk: number ;
        issue_sp2:number;
        issue_kp: number ;
        issue_village: number ;
        issue_mayur:number;
        issue_bigTaiho: number ;
        issue_dpds:number;
        issue_rejection:number;
        issue_add_1: number;
        issue_add_2: number;
        issue_add_3: number;
        issue_add_4: number;
        issue_add_5: number;
        issue_add_6: number;
        issue_add_7: number;
        issue_add_8: number;
        issue_add_9: number;
        issue_add_10: number; 
        mixingLot: string|null;    
       
}


import {    SortingData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";




const SortingCreateForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<SortingRowData[]>([])
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
        const initialform = props.borma.map((item: SortingData) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            rcv_transfer: item.rcv_transfer,
            rcv_jjh:  item.rcv_jjh,
            rcv_sjh:  item.rcv_sjh,
            rcv_sjh1:  item.rcv_sjh1,
            rcv_sp1:  item.rcv_sp1,
            rcv_jk_k:  item.rcv_jk_k,
            rcv_jh1:  item.rcv_jh1,
            rcv_bigTaiho:item.rcv_bigTaiho,
            issue_jjh: 0,
            issue_jjh1: 0,
            issue_sjh: 0,
            issue_jk:0,
            issue_jk1:0,
            issue_k: 0,
            issue_k1:0,
            issue_lwp: 0,
            issue_lwp1:0,
            issue_s:0,
            issue_ss: 0,
            issue_yk: 0,
            issue_sp2:0,
            issue_kp: 0,
            issue_village: 0,
            issue_mayur:0,
            issue_bigTaiho:0,
            issue_dpds:0,
            issue_rejection:0,
            issue_add_1: 0,
            issue_add_2:  0,
            issue_add_3:  0,
            issue_add_4:  0,
            issue_add_5:  0,
            issue_add_6:  0,
            issue_add_7:  0,
            issue_add_8:  0,
            issue_add_9:  0,
            issue_add_10:  0,
            mixingLot: item.mixingLot 
        }));
      
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
        props.borma.map((item: SortingData, idx: number) => {
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
                const initialhumid = await axios.post('/api/sorting/createEntireSorting', { linehumid:formData,
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
               
                     <div className="flex"><Label className="w-2/4 pt-1">No. of Labour</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-2/4 text-center" placeholder="No. of Labour" ref={dayOpRef}  />
                     </div>
                     {/* <div className="flex"><Label className="w-2/4 pt-1">No. of Operator(Night)</Label>
                    <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required />
                    <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={nightOpRef}  />
                     </div> */}
                   
                     
                   
                </div>
            
                   <Table className="mt-3">
                   <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl. No.</TableHead>
                    <TableHead className="text-center">Lot_No</TableHead>
              
                    <TableHead className="text-center">Origin</TableHead>
                    <TableHead className="text-center">Mixed_Lot</TableHead>
                  
                    <TableHead className="text-center">Receive SJH</TableHead>
                    <TableHead className="text-center">Receive JJH</TableHead>
                    <TableHead className="text-center">Receive JJH1</TableHead>
                    <TableHead className="text-center">Receive JH1</TableHead>
                    <TableHead className="text-center">Receive JK_K</TableHead>
                    <TableHead className="text-center">Receive SP1</TableHead>
                    <TableHead className="text-center">Receive Peeling</TableHead>
                    <TableHead className="text-center">Receive BigTaiho</TableHead>
                    
                    <TableHead className="text-center">Issue JJH</TableHead>
                    <TableHead className="text-center">Issue JJH1</TableHead>
                    <TableHead className="text-center">Issue SJH</TableHead>
                    <TableHead className="text-center">Issue JK</TableHead>
                    <TableHead className="text-center">Issue JK1</TableHead>
                    <TableHead className="text-center">Issue K</TableHead>
                    <TableHead className="text-center">Issue K1</TableHead>
                    <TableHead className="text-center">Issue LWP</TableHead>
                    <TableHead className="text-center">Issue LWP1</TableHead>
                    <TableHead className="text-center">Issue S</TableHead>
                    <TableHead className="text-center">Issue SS</TableHead>
                    <TableHead className="text-center">Issue YK</TableHead>
                    <TableHead className="text-center">Issue SP2</TableHead>
                    <TableHead className="text-center">Issue KP</TableHead>
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
                    <TableHead className="text-center">Issue Village</TableHead>
                    <TableHead className="text-center">Issue Mayur</TableHead>
                    <TableHead className="text-center">Issue BigTaiho</TableHead>
                    <TableHead className="text-center">Issue DPDS</TableHead>
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    {/* <TableHead className="text-center">Mixed Amount</TableHead> */}
               
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:SortingRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.mixingLot}</TableCell>
                                        <TableCell className="text-center font-semibold  bg-yellow-100">{formatNumber(row.rcv_jjh)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold  bg-yellow-100">{formatNumber(row.rcv_sjh)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold  bg-yellow-100">{formatNumber(row.rcv_sjh1)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold  bg-yellow-100">{formatNumber(row.rcv_jh1)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold  bg-yellow-100">{formatNumber(row.rcv_jk_k)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(row.rcv_sp1)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-600  ">{formatNumber((parseFloat(row.rcv_jjh) +
                                         parseFloat(row.rcv_sjh)+parseFloat(row.rcv_sjh1)+parseFloat(row.rcv_jh1) +
                                         parseFloat(row.rcv_jk_k)+parseFloat(row.rcv_sp1)).toString())} kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-600">{row.rcv_bigTaiho ? formatNumber(row.rcv_bigTaiho) :0} Kg</TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_jjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jjh', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_jjh1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jjh1', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_sjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sjh', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_jk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jk', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_jk1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jk1', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_k} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_k1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k1', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_lwp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lwp', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_lwp1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lwp1', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_s} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_s', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ss} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ss', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_yk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_yk', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_sp2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sp2', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_kp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_kp', e.target.value)} required /></TableCell>
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
                                         <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell> 
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_mayur} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_mayur', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_dpds} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dpds', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>
                                        
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
export default SortingCreateForm;
