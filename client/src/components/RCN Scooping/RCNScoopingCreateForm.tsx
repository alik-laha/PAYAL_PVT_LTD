
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import RCNScoopingLineCreateForm from "./RCNScoopingLineCreateForm";
import axios from "axios";
import { useState } from "react";
import { ScoopData } from "@/type/type";



interface lotPropsdata{
    LotNo:string;
}

const RCNScoopingCreateForm = (props: any) => {
    const [scoopdata, setscoopdata ]  = useState<ScoopData[]>([])
    console.log(props)
    const handleLineEntry = async (lotNO:string) => {
        axios.get(`/api/scooping/getScoopByLot/${lotNO}`).then(res=>{
           // console.log(res)
             setscoopdata(res.data.scoopingLot)
            //set(res.data.scoopingLot)
        })
    }
    return (
        <>
            <div className="pl-10 pr-10">

                <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >Lot No</TableHead>
                        <TableHead className="text-center" >Status</TableHead>
                        <TableHead className="text-center" >Action</TableHead>


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
                                            {item.LotNo}
                                        </TableCell>

                                        <TableCell className="text-center"><Button className="bg-orange-500 h-8 text-white rounded-md">Pending</Button></TableCell>
                                        <TableCell className="text-center">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.LotNo)}>+ Add </Button></DialogTrigger>
                                                <DialogContent className='max-w-2xl'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-2xl pb-1 text-center mt-2'>Scooping Line Entry</p></DialogTitle>

                                                    </DialogHeader>
                                                <RCNScoopingLineCreateForm scoop={scoopdata}/>
                                                    
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        ) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>Nothing Pending</TableCell>
                            <TableCell></TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>




            </div>
        
        </>
    )


}
export default RCNScoopingCreateForm