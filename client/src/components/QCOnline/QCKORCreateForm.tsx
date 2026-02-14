
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
    borma: any[]       
}


interface BormaRowData{
            id: number;
            LotNo: string;
            origin: string;
            qcKOR:string;
            qcBormaLoss:string;
}



import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";



const QCKORCreateForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
   
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
        const initialform =  props.borma.map((item: any) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            qcKOR:'',
            qcBormaLoss:''
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
        props.borma.map((item: any, idx: number) => {
            rows[idx].id=item.id
        })
        console.log(rows)
        const date = DateRef.current?.value  
        
       
            const formData = rows.map((row: any) => ({
                Date: date,
               
                 ...row
            }))
        
            try {
                const initialborma = await axios.post('/api/qconline/createEntireQCKOR', { lineborma:formData,
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



 
    return (
        <>
        <div className="px-5 py-2 overflow-auto">
            <form className='flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 border border-gray-200' onSubmit={handleSubmit2}>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-3"> 
               {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                <div ><Label className="text-gray-500 font-bold text-xs">Date of Entry</Label>
                <Input className="mt-1 bg-gray-50 font-semibold text-center border-gray-300" placeholder="Date" ref={DateRef} type="date" required /> </div>
              
                   
                </div>
            
                   <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl⠀No</TableHead>
                        <TableHead className="text-center" >Lot⠀No</TableHead>
                       
                       
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >QC⠀KOR</TableHead>
                        <TableHead className="text-center" >Weight⠀Loss</TableHead>
                  
                    </TableHeader>
                    <TableBody>
                        {props.borma.length > 0 ? (
                            rows.map(( row:BormaRowData,idx:number) => {
                              
                                return (
                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-blue-500">{row.origin}</TableCell>
                                       
                                         <TableCell className="text-center "> <Input className="bg-cyan-100" value={row.qcKOR} placeholder="KOR" onChange={(e) => handleRowChange(idx,'qcKOR',e.target.value)} required /></TableCell>
                                          <TableCell className="text-center "> <Input className="bg-cyan-100" value={row.qcBormaLoss} placeholder="%" onChange={(e) => handleRowChange(idx,'qcBormaLoss',e.target.value)} required /></TableCell>
                                       
                                    </TableRow>
                                );
                            })
                        ) : null}
                    </TableBody>
                </Table>  
                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                  
                   
                  </form>
                  <dialog id="successemployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
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
export default QCKORCreateForm;
