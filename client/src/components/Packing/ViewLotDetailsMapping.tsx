

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { LuDownload } from "react-icons/lu";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';



interface lotPropsdata{
    LotNo:string;
    origin:string;
    stock:number;
}

const ViewLotDetailsMapping = (props: any) => {
    
    //let scoopdata:ScoopData[]=[]
    console.log(props)
    const currDate = new Date().toLocaleDateString();

     const exportToExcel = async () => {

        
        let transformed: any[] = [];

        transformed = props.props.map((item: lotPropsdata, idx: number) => ({
            id: idx + 1,
            Grade: props.grade,
            LotNo: item.LotNo,
            Origin: item.origin,
            Stock: item.stock ?Number(item.stock): 0 ,
            

        }));
        //setTransformedData(transformed);
        const ws = XLSX.utils.json_to_sheet(transformed);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Lot_Stock_Details' + currDate + '.xlsx');



    }

    const SelectValue = async (item:lotPropsdata) => {
        props.rows[props.index].stockquantity=item.stock
        props.handleRowChange(props.index,'stockquantity',item.stock)
        props.rows[props.index].actual_stockquantity=item.stock
        props.handleRowChange(props.index,'actual_stockquantity',item.stock)
        props.rows[props.index].LotNo=item.LotNo
        props.handleRowChange(props.index,'LotNo',item.LotNo)
        props.rows[props.index].porigin=item.origin
        props.handleRowChange(props.index,'porigin',item.origin)
        props.rows[props.index].mixquantity=item.stock
        props.handleRowChange(props.index,'mixquantity',item.stock)
    }
  
    return (
        <>
           <div className="mx-2 max-h-80 overflow-scroll">
            <Button
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                            onClick={exportToExcel}
                        >
                            <LuDownload size={16} />
                        </Button>
         
                <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl</TableHead>
                        <TableHead className="text-center" >GradeName</TableHead>
                        <TableHead className="text-center" >Lot No</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >StoCK(Kg)</TableHead>
                        <TableHead className="text-center" >Use</TableHead>


                    </TableHeader>
                    <TableBody>
                        {props.props.length > 0 ? (
                            props.props.map((item: lotPropsdata, idx: number) => {

                                return (
                                    <TableRow key={idx}>
                                        <TableCell className="text-center">
                                            {idx + 1}
                                        </TableCell>
                                           <TableCell className="text-center font-semibold">
                                            {props.grade}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">
                                            {item.LotNo}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold "> {item.origin} </TableCell> <TableCell className="text-center font-semibold text-blue-500"> {item.stock} Kg </TableCell>
                                        <TableCell className="text-center font-semibold text-blue-500 rounded border border-blue-300"> <button onClick={()=>{SelectValue(item)}}>Use
                                            </button> </TableCell>
                                        

                                        
                                      

                                    </TableRow>
                                );
                            })
                        ) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-left  text-red-500 font-semibold">No Pending Peeling</TableCell>
                            <TableCell></TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>




            </div>
           
        
        </>
    )


}
export default ViewLotDetailsMapping