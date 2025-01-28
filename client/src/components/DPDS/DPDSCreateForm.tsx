
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
    borma: DPDSData[]       
}


interface DPDSRowData{
        id: number;
        LotNo: string;
        origin: string;
        rcv_transfer: string|null;
        rcv_Sorting: string|null;
        rcv_dp: string;
        rcv_ds: string;
        rcv_dp1: string;
        issue_m_ds: number;
        issue_m_dp: number;
        issue_k_dp: number;
        issue_ds_1: number;
        issue_ds_2: number;
        issue_sp_2: number;
        issue_yjh: number;
        issue_yk: number;
        issue_kp: number;
        issue_wp: number;
        issue_rs: number;
        issue_dp_2: number;
        issue_dp_3: number;
        issue_dp_4: number;
        issue_dp_3l: number;
        issue_ss: number;
        issue_os: number;
        issue_os1: number;
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
        issue_rejection: number;
        issue_village: number;
        issue_bigTaiho: number;
        issue_mayur: number;  
        mixingLot: string|null;       
}


import {   DPDSData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";



const RCNDPDSCreateForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<DPDSRowData[]>([])
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

      
        const initialform = props.borma.map((item: DPDSData) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            rcv_transfer: item.rcv_transfer ,
            rcv_Sorting: item.rcv_Sorting ,
            rcv_dp: item.rcv_dp ,
            rcv_ds: item.rcv_ds ,
            rcv_dp1: item.rcv_dp1 ,
            issue_m_ds:  0,
            issue_m_dp:  0,
            issue_k_dp:  0,
            issue_ds_1:  0,
            issue_ds_2:  0,
            issue_sp_2:  0,
            issue_yjh:  0,
            issue_yk:  0,
            issue_kp:  0,
            issue_wp:  0,
            issue_rs: 0,
            issue_dp_2:  0,
            issue_dp_3: 0,
            issue_dp_4:  0,
            issue_dp_3l: 0,
            issue_ss:  0,
            issue_os:0,
            issue_os1:  0,
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
            issue_rejection:  0,
            issue_village:  0,
            issue_bigTaiho:  0,
            issue_mayur:  0,
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
        props.borma.map((item: DPDSData, idx: number) => {
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
                const initialhumid = await axios.post('/api/dpds/createEntireDPDS', { linehumid:formData,
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
                    <Input className="w-2/4 text-center" placeholder="No. of labour" ref={dayOpRef}  />
                     </div>
                     <div className="flex"><Label className="w-2/4 pt-1">No. of Supervisor</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-2/4 text-center" placeholder="No. of supervisor" ref={nightOpRef}  />
                     </div>
                   
                     
                   
                </div>
            
                   <Table className="mt-3">
                   <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl. No.</TableHead>
                    <TableHead className="text-center">Lot_No</TableHead>
              
                    <TableHead className="text-center">Origin</TableHead>
                    <TableHead className="text-center">Mixed_Lot</TableHead>
                    <TableHead className="text-center">Rcv Big_Taiho</TableHead>
                    <TableHead className="text-center">Rcv Sorting</TableHead>
                    
                    <TableHead className="text-center">Rcv DP</TableHead>
                    <TableHead className="text-center">Rcv DS</TableHead>
                    <TableHead className="text-center">Rcv DP1</TableHead>
                    <TableHead className="text-center">Issue M DS</TableHead>
                    <TableHead className="text-center">Issue M DP</TableHead>
                    <TableHead className="text-center">Issue K DP</TableHead>
                    <TableHead className="text-center">Issue DS 1</TableHead>
                    <TableHead className="text-center">Issue DS 2</TableHead>
                    <TableHead className="text-center">Issue SP 2</TableHead>
                    <TableHead className="text-center">Issue YJH</TableHead>
                    <TableHead className="text-center">Issue YK</TableHead>
                    <TableHead className="text-center">Issue KP</TableHead>
                    <TableHead className="text-center">Issue WP</TableHead>
                    <TableHead className="text-center">Issue RS</TableHead>
                    <TableHead className="text-center">Issue DP 2</TableHead>
                    <TableHead className="text-center">Issue DP 3</TableHead>
                    <TableHead className="text-center">Issue DP 4</TableHead>
                    <TableHead className="text-center">Issue DP 3L</TableHead>
                    <TableHead className="text-center">Issue SS</TableHead>
                    <TableHead className="text-center">Issue OS</TableHead>
                    <TableHead className="text-center">Issue OS1</TableHead>
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
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    <TableHead className="text-center">Issue Village</TableHead>
                    <TableHead className="text-center">Issue Big Taiho</TableHead>
                    <TableHead className="text-center">Issue Mayur</TableHead>
                    {/* <TableHead className="text-center">Mixed Amount</TableHead> */}
               
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:DPDSRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.mixingLot}</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{row.rcv_transfer ? formatNumber(row.rcv_transfer) :0} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{row.rcv_Sorting ? formatNumber(row.rcv_Sorting):0} Kg</TableCell>
                                        <TableCell className="text-center font-semibold ">{formatNumber(row.rcv_dp)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold ">{formatNumber(row.rcv_ds)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold ">{formatNumber(row.rcv_dp1)} Kg</TableCell>
                                        
                                        {/* <TableCell className="text-center font-semibold ">{Number(formatNumber(row.rcv_wholesunpeel)) + Number(formatNumber(row.rcv_wholespeel))} Kg</TableCell> */}
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_m_ds} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_m_ds', e.target.value)} required /></TableCell>

                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_m_dp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_m_dp', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_k_dp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_dp', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ds_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ds_1', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ds_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ds_2', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_sp_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sp_2', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_yjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_yjh', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_yk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_yk', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_kp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_kp', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_wp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_wp', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_rs} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rs', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_dp_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dp_2', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_dp_3} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dp_3', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_dp_4} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dp_4', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_dp_3l} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dp_3l', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ss} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ss', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_os} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_os', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_os1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_os1', e.target.value)} required /></TableCell>
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
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_mayur} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_mayur', e.target.value)} required /></TableCell>




                                      
                                    
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
export default RCNDPDSCreateForm;
