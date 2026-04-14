
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
    borma: BormaData[]       
}


interface BormaRowData{
            id: number;
            LotNo: string;
            origin: string;
            InputWholes: string;
            InputPieces: string;
            TotalInput: string;
            Mc_on: string;
            Mc_off: string;
            Mc_breakdown: string;
            otherTime: string;
            NoOfTrolley: string;
            InputMoisture: string;
            OutputMoisture: string;
            OutputWholes: string;
            OutputPieces: string;
            TotalOutput: string;
            BormaLoss: string;
            Temp:string;
}


import { BormaData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";
import FormRow from "../common/FormRowTime";


const RCNBormaLineCreateForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const operatorRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<BormaRowData[]>([])
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
        const initialform =  props.borma.map((item: BormaData) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            InputWholes: item.InputWholes,
            InputPieces: item.InputPieces,
            TotalInput: item.TotalInput,
            Mc_on: '00:00',
            Mc_off: '00:00',
            Mc_breakdown: '00:00', 
            otherTime: '00:00',
            NoOfTrolley: '',
            InputMoisture: '',
            OutputMoisture: '',
            OutputWholes: '',
            OutputPieces: '',
            TotalOutput: '',
            BormaLoss: '',
            Temp:''
        }));
      
        //console.log(initialform)
        setRows(initialform)
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
        props.borma.map((item: BormaData, idx: number) => {
            rows[idx].id=item.id
        })
        console.log(rows)
        const date = DateRef.current?.value  
        const operator = operatorRef.current?.value
       
            const formData = rows.map((row: any) => ({
                Date: date,
                operator: operator,
                 ...row
            }))
        
            try {
                const initialborma = await axios.post('/api/borma/createEntireBorma', { lineborma:formData,
                    LotNo:props.borma[0].LotNo
                 })
                console.log(initialborma)         
                    setErrortext(initialborma.data.message)
                    if (initialborma.status === 200) {
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
            <form className='flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 border border-gray-200' onSubmit={handleSubmit2}>
               <div className="grid grid-cols-2 md:grid-cols-5 gap-3"> 
               {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                <div ><Label className="text-gray-500 font-bold text-xs">Date of Entry</Label>
                <Input className="mt-1 bg-gray-50 font-semibold text-center border-gray-300" placeholder="Date" ref={DateRef} type="date" required /> </div>
                <div ><Label className="text-gray-500 font-bold text-xs">No. of Operator</Label>
                    <Input className="mt-1 bg-gray-50 font-semibold text-center border-gray-300" placeholder="Operator" ref={operatorRef} required /> </div>
                   
                </div>
            
                   <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl⠀No</TableHead>
                        <TableHead className="text-center" >Lot⠀No</TableHead>
                       
                       
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Input⠀Wholes⠀(Kg)</TableHead>
                        <TableHead className="text-center" >Input⠀Pieces⠀(Kg)</TableHead>
                        <TableHead className="text-center" >Total⠀Input</TableHead>
                        <TableHead className="text-center" >Input⠀Moisture</TableHead>
                        <TableHead className="text-center" >Output⠀Moisture</TableHead>
                        <TableHead className="text-center" >Output⠀Wholes⠀(Kg)</TableHead>
                        <TableHead className="text-center" >Output⠀Pieces⠀(Kg)</TableHead>
                        <TableHead className="text-center" >No⠀Of⠀Trolley</TableHead>
                        <TableHead className="text-center" >Temparature</TableHead>
                        <TableHead className="text-center" >Borma⠀On</TableHead>
                        <TableHead className="text-center" >Borma⠀Off</TableHead>
                        <TableHead className="text-center" >Breakdown⠀Duration</TableHead>
                        <TableHead className="text-center" >Other⠀Duration</TableHead>
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:BormaRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                        <TableCell className="text-center font-semibold ">{formatNumber(row.InputWholes)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold ">{formatNumber(row.InputPieces)} Kg</TableCell>
                                        <TableCell className="text-center font-semibold text-green-500">{formatNumber(row.TotalInput)} Kg</TableCell>
                                        <TableCell className="text-center "> <Input className="bg-cyan-100" value={row.InputMoisture} placeholder="%" onChange={(e) => handleRowChange(idx,'InputMoisture',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className="bg-cyan-100" value={row.OutputMoisture} placeholder="%" onChange={(e) => handleRowChange(idx,'OutputMoisture',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className="bg-yellow-100" value={row.OutputWholes} placeholder="Wholes" onChange={(e) => handleRowChange(idx,'OutputWholes',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className="bg-yellow-100" value={row.OutputPieces} placeholder="Pieces" onChange={(e) => handleRowChange(idx,'OutputPieces',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.NoOfTrolley} placeholder="No." onChange={(e) => handleRowChange(idx,'NoOfTrolley',e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input  value={row.Temp} placeholder="Degree" onChange={(e) => handleRowChange(idx,'Temp',e.target.value)} required /></TableCell>
                                        {/* <TableCell className="text-center "> <Input className="bg-green-100"  value={row.Mc_on} placeholder="MC ON Time" onChange={(e) => handleRowChange(idx,'Mc_on',e.target.value)} type='time' required /></TableCell> */}
                                        <FormRow idx={idx} row={row} column='Mc_on' handleRowChange={handleRowChange}/>
                                        <FormRow idx={idx} row={row} column='Mc_off' handleRowChange={handleRowChange}/>
                                        {/* <TableCell className="text-center"><Input className="bg-red-100" value={row.Mc_off} placeholder="MC Off Time" onChange={(e) => handleRowChange(idx,'Mc_off',e.target.value)} type='time' required /></TableCell> */}
                                        <TableCell className="text-center"><Input  value={row.Mc_breakdown} placeholder="BreakDown" onChange={(e) => handleRowChange(idx,'Mc_breakdown',e.target.value)} type='time'  /></TableCell>
                                        <TableCell className="text-center"><Input  value={row.otherTime} placeholder="Other Time" onChange={(e) => handleRowChange(idx,'otherTime',e.target.value)} type='time'  /></TableCell>
                                 
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
export default RCNBormaLineCreateForm;
