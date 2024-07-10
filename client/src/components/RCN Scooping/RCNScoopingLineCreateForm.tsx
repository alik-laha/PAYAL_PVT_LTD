
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { ScoopData } from "@/type/type"
import { Button } from "../ui/button"

const RCNScoopingLineCreateForm = (props:any) => {
    console.log(props)
   
   
    return (
        <div className="pl-5 pr-5 ">
            
            <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >Lot No</TableHead>
                        <TableHead className="text-center" >Status</TableHead>
                        <TableHead className="text-center" >Action</TableHead>


                    </TableHeader>
                    <TableBody>
                        {props.scoop.length > 0 ? (
                            props.scoop.map((item: ScoopData, idx: number) => {

                                return (
                                    <TableRow key={idx}>
                                        <TableCell className="text-center">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold">
                                            {item.LotNo}
                                        </TableCell>

                                        <TableCell className="text-center"><Button className="bg-orange-500 h-8 text-white rounded-md">Pending</Button></TableCell>
                                        <TableCell className="text-center">
                                           


                                        </TableCell>




                                    </TableRow>
                                );
                            })
                        ) : null}
                    </TableBody>
                </Table>  




        </div>
    )
}
export default RCNScoopingLineCreateForm;
