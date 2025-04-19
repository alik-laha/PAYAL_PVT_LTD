import { rcvVillageInprimaryData } from "@/type/type";

interface Props {
    props: rcvVillageInprimaryData[]       
}

interface VLOTRowData{
    
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


const VLOTCreateForm = (props:Props) => {

    const [rows,setRows]=useState<VLOTRowData[]>([])
    const [errortext, setErrortext] = useState('')
    const [isdisable,setisdisable]=useState<boolean>(false)
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    useEffect(() => { 
            const initialform =  props.props.map((item: rcvVillageInprimaryData) => ({
                origin: item.origin,
                type:item.type,
                sku:item.sku,
                Vendor:item.vendorName,
                Receiving_Qty: item.totalWt,
                id:item.id,
                actual_Receiving_Qty:Number(item.totalWt),
                Loss:0,
                Loss_prcntg:0
            }));
          
            //console.log(initialform)
            setRows(initialform)
            console.log(rows)
        }, [props.props]);

    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;

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
    const handleRowChange = (index:number,field:string,fieldvalue:string|number) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
        //console.log(rows) 
    }
    
    const handleRowChangeActual = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        handleRowChange(index,'actual_Receiving_Qty',e.target.value)
        console.log(rows[index].Loss)
        rows[index].Loss= Number(rows[index].Receiving_Qty)-Number(rows[index].actual_Receiving_Qty)
        rows[index].Loss_prcntg=((Number(rows[index].Receiving_Qty)-Number(e.target.value))/Number(rows[index].Receiving_Qty))*100
        handleRowChange(index,'actual_Receiving_Qty',e.target.value)
     }  

    return(
        <>
        <div className="px-5 py-2 mt-2 overflow-auto max-h-screen">
        <form className='flex flex-col gap-1 pt-3' >
            <div className="overflow-auto max-h-screen">
                <Table className="w-full mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableRow>
                        <TableHead className="text-center">SL_No</TableHead>
                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Item_Type</TableHead>
                            <TableHead className="text-center">Item_Name</TableHead>
                            <TableHead className="text-center">Receiving_Vendor</TableHead>
                            <TableHead className="text-center">Receiving Qty</TableHead>
                            <TableHead className="text-center">Actual_Qty</TableHead>
                            <TableHead className="text-center">Weight_Loss</TableHead>
                            {/* <TableHead className="text-center">Loss_prcntg</TableHead> */}
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
                            {/* <TableCell className="text-center font-semibold text-red-500">{row.Loss_prcntg.toFixed(2)} %</TableCell> */}
                            </TableRow>
                        ))):null}
                    </TableBody>
                </Table>
                <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                                
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
            </form>
        </div>
        </>
    )

}
export default VLOTCreateForm