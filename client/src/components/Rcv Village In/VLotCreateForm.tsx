import { rcvVillageInprimaryData } from "@/type/type";

interface Props {
    props: rcvVillageInprimaryData[]       
}

interface VLOTRowData{
    
    id: number;
    origin: string;
    Receiving_Qty: string;
    actual_Receiving_Qty: string;
    type:string;
    sku:string;
    Vendor:string;
    Loss:string;
    Loss_prcntg:string;
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
                actual_Receiving_Qty:item.totalWt,
                
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
        rows[index].huskprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
        handleRowChange(index,'husk',e.target.value)
       
     }  

    return(
        <>
        <div className="px-5 py-2 overflow-auto max-h-screen">
        <form className='flex flex-col gap-1 pt-1' >
            <div className="overflow-auto max-h-screen">
                <Table className="w-full mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableRow>
                        <TableHead className="text-center">SL_No</TableHead>
                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Item_Type</TableHead>
                            <TableHead className="text-center">Item_Name</TableHead>
                            <TableHead className="text-center">Vendor</TableHead>
                            <TableHead className="text-center">Receiving Qty</TableHead>
                            <TableHead className="text-center">Actual_Qty</TableHead>
                            <TableHead className="text-center">Loss</TableHead>
                            <TableHead className="text-center">Loss_prcntg</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.props.length > 0 ? (rows.map((row,idx:number) => (
                            <TableRow key={row.id} >
                                 <TableCell className="text-center">{idx+1}</TableCell>
                                <TableCell className="text-center font-semibold">{row.origin}</TableCell>
                                <TableCell className="text-center">{row.type}</TableCell>
                                <TableCell className="text-center">{row.sku}</TableCell>
                                <TableCell className="text-center">{row.Vendor}</TableCell>
                                <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.Receiving_Qty)} Kg</TableCell>
                                <TableCell className="text-center"> <Input  value={row.actual_Receiving_Qty} placeholder="Qty" 
                                onChange={(e) => handleRowChangeActual(idx,e)} required /></TableCell>
                           
                            </TableRow>
                        ))):null}
                    </TableBody>
                </Table>
            </div>
            </form>
        </div>
        </>
    )

}
export default VLOTCreateForm