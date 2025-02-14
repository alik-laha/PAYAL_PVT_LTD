
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
    alt_id:number;
    origin: string;
    mixingLot:string|null;

      rcv_transfer: string|null;
        rcv_Sorting: string|null;
        rcv_dp: string;
        rcv_ds: string;
        rcv_dp1: string;


        issue_m_ds: string;
        issue_m_dp: string;
        issue_k_dp: string;
        issue_ds_1: string;
        issue_ds_2: string;
        issue_sp_2: string;
        issue_yjh: string;
        issue_yk: string;
        issue_kp: string;
        issue_wp: string;
        issue_rs: string;
        issue_dp_2: string;
        issue_dp_3: string;
        issue_dp_4: string;
        issue_dp_3l: string;
        issue_ss: string;
        issue_os: string;
        issue_os1: string;
        issue_add_1: string;
        issue_add_2: string;
        issue_add_3: string;
        issue_add_4: string;
        issue_add_5: string;
        issue_add_6: string;
        issue_add_7: string;
        issue_add_8: string;
        issue_add_9: string;
        issue_add_10: string;
        issue_rejection: string;
        issue_village: string;
        issue_bigTaiho: string;
        issue_mayur: string;
           
}


import {   DPDSData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";



const DPDSEditForm = (props:Props) => {
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
            mixingLot: props.borma[0].mixingLot,

            rcv_transfer: props.borma[0].rcv_transfer ,
            rcv_Sorting: props.borma[0].rcv_Sorting ,
            rcv_dp: props.borma[0].rcv_dp ,
            rcv_ds: props.borma[0].rcv_ds ,
            rcv_dp1: props.borma[0].rcv_dp1 ,
            issue_m_ds:  props.borma[0].issue_m_ds,
            issue_m_dp:  props.borma[0].issue_m_dp,
            issue_k_dp:  props.borma[0].issue_k_dp,
            issue_ds_1:  props.borma[0].issue_ds_1,
            issue_ds_2:  props.borma[0].issue_ds_2,
            issue_sp_2:  props.borma[0].issue_sp_2,
            issue_yjh:  props.borma[0].issue_yjh,
            issue_yk:  props.borma[0].issue_yk,
            issue_kp:  props.borma[0].issue_kp,
            issue_wp:  props.borma[0].issue_wp,
            issue_rs: props.borma[0].issue_rs,
            issue_dp_2:  props.borma[0].issue_dp_2,
            issue_dp_3: props.borma[0].issue_dp_3,
            issue_dp_4:  props.borma[0].issue_dp_4,
            issue_dp_3l: props.borma[0].issue_dp_3l,
            issue_ss:  props.borma[0].issue_ss,
            issue_os:props.borma[0].issue_os,
            issue_os1:  props.borma[0].issue_os1,
            issue_add_1: props.borma[0].issue_add_1,
            issue_add_2:  props.borma[0].issue_add_2,
            issue_add_3:  props.borma[0].issue_add_3,
            issue_add_4:  props.borma[0].issue_add_4,
            issue_add_5:  props.borma[0].issue_add_5,
            issue_add_6:  props.borma[0].issue_add_6,
            issue_add_7:  props.borma[0].issue_add_7,
            issue_add_8:  props.borma[0].issue_add_8,
            issue_add_9:  props.borma[0].issue_add_9,
            issue_add_10:  props.borma[0].issue_add_10,
            issue_rejection:  props.borma[0].issue_rejection,
            issue_village:  props.borma[0].issue_village,
            issue_bigTaiho:  props.borma[0].issue_bigTaiho,
            issue_mayur:  props.borma[0].issue_mayur,
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
        if (resStatus1.data.scoopingLot[0].latest_section && resStatus1.data.scoopingLot[0].latest_section !=='DPDS') 
            {
            setErrortext(`Lot is Already Linked to ${resStatus1.data.scoopingLot[0].latest_section} Section`)
            if(errordialog){
                (errordialog as any).showModal()
            }
            
            return
        }
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
                const initialhumid = await axios.post('/api/dpds/updateDPDS', { linehumid:formData,
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
                    <TableHead className="text-center">Receive DP</TableHead>
                    <TableHead className="text-center">Receive DS</TableHead>
                    <TableHead className="text-center">Receive DP1</TableHead>
                    <TableHead className="text-center">Receive Peeling</TableHead>
                    <TableHead className="text-center">Receive BigTaiho</TableHead>
                    <TableHead className="text-center">Receive Sorting</TableHead>
                   
                   
                    <TableHead className="text-center">Issue M_DS</TableHead>
                    <TableHead className="text-center">Issue M_DP</TableHead>
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
                    <TableHead className="text-center">Issue DP_3L</TableHead>
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
                    <TableHead className="text-center">Issue BigTaiho</TableHead>
                    <TableHead className="text-center">Issue Mayur</TableHead>
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
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(row.rcv_dp)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(row.rcv_ds)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(row.rcv_dp1)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{formatNumber((Number(row.rcv_dp)+Number(row.rcv_ds)+Number(row.rcv_dp1)).toString())} Kg</TableCell>

                                        <TableCell className="text-center font-semibold text-green-500">{row.rcv_transfer ? formatNumber(row.rcv_transfer) :0} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{row.rcv_Sorting ? formatNumber(row.rcv_Sorting):0} Kg</TableCell>
                                        
                                        
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
                                    <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_mayur} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_mayur', e.target.value)} required /></TableCell>

                                    
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
export default DPDSEditForm;
