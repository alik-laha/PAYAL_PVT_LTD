import { creditNoteEntryData} from "@/type/type";

interface Props {
    props: creditNoteEntryData[]       
}

interface RLOTRowData{
    
    id: number;
    origin: string;
    Receiving_Qty: string;
    actual_Receiving_Qty: number;
    type:string;
    sku:string;
    Vendor:string;
    Loss:number;
    Loss_prcntg:number;
}

interface MergedUpdateData {
   
    origin: string;
    Receiving_Qty: number;
    actual_Receiving_Qty: number;
    Loss:number;
    
  }


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
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";



const RLOTCreateForm = (props:Props) => {

    const [rows,setRows]=useState<RLOTRowData[]>([])
    const [errortext, setErrortext] = useState('')
    const [rcvDate, setRcvDate] = useState('')
    const [isdisable,setisdisable]=useState<boolean>(false)
    const [newFormupdateData, setNewFormupdateData] = useState<MergedUpdateData[]>([]);
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    useEffect(() => { 
            const initialform =  props.props.map((item: creditNoteEntryData) => ({
                origin: item.origin,
                type:item.type,
                sku:item.gradeName,
                Vendor:item.vendorName,
                Receiving_Qty: item.totalWt,
                id:item.id,
                actual_Receiving_Qty:Number(item.totalWt),
                Loss:0,
                Loss_prcntg:0
            }));
          
            //console.log(initialform)
            setRows(initialform)
            if(props.props[0]){
                setRcvDate(props.props[0].recevingDate)
            }
            console.log(rows)
        }, [props.props]);


        useEffect(() => {
                const mergeRows = (data: RLOTRowData[]): MergedUpdateData[] => {
                  const filteredData = data.map(({ origin ,actual_Receiving_Qty,
                   Receiving_Qty,Loss}) => ({
                    origin,   
                    actual_Receiving_Qty:actual_Receiving_Qty,
                    Receiving_Qty:parseFloat(Receiving_Qty),
                    Loss
                  }));
                  const merged = filteredData.reduce<Record<string, { origin:string,actual_Receiving_Qty: number
                    ,Receiving_Qty: number,Loss: number}>>((acc, row) => {
                    const { origin,
                        actual_Receiving_Qty,
                        Receiving_Qty,
                      Loss
                      } = row;
                    if (!acc[origin]) {
                      acc[origin] = { origin, actual_Receiving_Qty,
                        Receiving_Qty,Loss };
                    } else {
                      acc[origin].actual_Receiving_Qty += actual_Receiving_Qty;
                      acc[origin].Receiving_Qty += Receiving_Qty;
                      acc[origin].Loss += Loss;
                    }
                    return acc;
                  }, {});
            
                  return Object.values(merged).map(item => ({
                    origin:item.origin,
                    actual_Receiving_Qty:item.actual_Receiving_Qty,
                    Receiving_Qty:item.Receiving_Qty,
                    Loss:item.Loss,
                  }));
                };
                setNewFormupdateData(mergeRows(rows));
                //console.log(newFormupdateData)
              }, [rows]);

              const successdialog = document.getElementById('packageMetrialReceve') as HTMLInputElement;
              const errordialog = document.getElementById('packagingMetirialReciveError') as HTMLInputElement;
              const closeDialogButton = document.getElementById('packageMetrialRecivecross') as HTMLInputElement;
              const errorcloseDialogButton = document.getElementById('packagigreciveerrorcross') as HTMLInputElement;
          
              if (closeDialogButton) {
                  closeDialogButton.addEventListener('click', () => {
                      if (successdialog != null) {
                          (successdialog as any).close();
                          window.location.reload()
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
    const handleRowChange = (index:number,field:string,fieldvalue:string|number) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
        //console.log(rows) 
    }
    
    const handleRowChangeActual = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        handleRowChange(index,'actual_Receiving_Qty',Number(e.target.value))
        //console.log(rows[index].Loss)
        rows[index].Loss= Number(rows[index].Receiving_Qty)-Number(e.target.value)
        rows[index].Loss_prcntg=((Number(rows[index].Receiving_Qty)-Number(e.target.value))/Number(rows[index].Receiving_Qty))*100
        handleRowChange(index,'actual_Receiving_Qty',Number(e.target.value))
     }  

     const handleSubmit2 = async (e: React.FormEvent) => {
             e.preventDefault()
             if (isdisable) return; // prevent duplicate
             setisdisable(true)
             const hasPending = props.props.some((item: creditNoteEntryData) => item.editStatus === 'Pending');
             if (hasPending) {
                setErrortext('One or More Items are having Status Pending !')
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }

            const origins = newFormupdateData.map((row) => row.origin)

            const hasduplicate = origins.some((item, index) => origins.indexOf(item) !== index);
            if (hasduplicate) {
                setErrortext('Duplicate Origin Values Found !')
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
                return
            }

             props.props.map((item: creditNoteEntryData, idx: number) => {
                         rows[idx].id=item.id
                     })
             //console.log(rows)
             console.log(newFormupdateData)
                 try {
                     const initialscoop = await axios.post('/api/creditNote/createEntireRLOT', { formData:newFormupdateData,
                        date:rcvDate
                      })
                     console.log(initialscoop)         
                         setErrortext(initialscoop.data.message)
                         if (initialscoop.status === 200) {
                            if (successdialog) {
                                (successdialog as any).showModal();
                            }
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

    return(
        <>
        <div className="px-5 py-2 mt-2 overflow-auto max-h-screen">
        <form className='flex flex-col gap-1 pt-3' onSubmit={handleSubmit2}>
            <div className="overflow-auto max-h-screen">
                <Table className="w-full mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableRow>
                        <TableHead className="text-center">SL_No</TableHead>
                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Item_Type</TableHead>
                            <TableHead className="text-center">Grade_Name</TableHead>
                            <TableHead className="text-center">Receiving_Vendor</TableHead>
                            <TableHead className="text-center">Receiving Qty</TableHead>
                            <TableHead className="text-center">Actual_Qty</TableHead>
                            <TableHead className="text-center">Weight_Loss</TableHead>
                            <TableHead className="text-center">Loss_prcntg</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.props.length > 0 ? (rows.map((row,idx:number) => (
                            <TableRow key={row.id}  className="boiling-row-height-scoop">
                                 <TableCell className="text-center">{idx+1}</TableCell>
                                <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                <TableCell className="text-center">{row.type}</TableCell>
                                <TableCell className="text-center">{row.sku}</TableCell>
                                <TableCell className="text-center">{row.Vendor}</TableCell>
                                <TableCell className="text-center font-semibold">{formatNumber(row.Receiving_Qty)} Kg</TableCell>
                                <TableCell className="text-center"> <Input type="number" value={row.actual_Receiving_Qty} placeholder="Qty" 
                                onChange={(e) => handleRowChangeActual(idx,e)} required /></TableCell>
                            <TableCell className="text-center font-semibold text-blue-500">{row.Loss} Kg</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{row.Loss_prcntg.toFixed(2)} %</TableCell>
                            </TableRow>
                        ))):null}
                    </TableBody>
                </Table>
                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                                
               
            </div>
            </form>
            <dialog id="packageMetrialReceve" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="packageMetrialRecivecross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialReciveError" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="packagigreciveerrorcross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </div>
        </>
    )

}
export default RLOTCreateForm