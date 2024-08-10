
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

import axios from "axios";
import { useState } from "react";
import { RcnPrimaryEntryData } from "@/type/type";




interface lotPropsdata{
    gatePassNo:string;
}

const PMInitial = (props: any) => {
    const [rcnData, setrcnData]  = useState<RcnPrimaryEntryData[]>([])

    //let scoopdata:ScoopData[]=[]
    console.log(props)
    const handleLineEntry = async (gatePassNo:string) => {
        axios.get(`/api/rcnprimary/getRcnByGatePass/${gatePassNo}`).then(res=>{
           console.log(res)
           if(Array.isArray(res.data.rcnmainLot)){
            //scoopdata=res.data.scoopingLot
            setrcnData(res.data.rcnmainLot)
             console.log(rcnData)
           }
             
            //set(res.data.scoopingLot)
        })
    }
    return (
        <>
            <div className="pl-10 pr-10 max-h-64 overflow-scroll">
         
                <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >GatePass No</TableHead>
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
                                            {item.gatePassNo}
                                        </TableCell>

                                        <TableCell className="text-center"><Button className="bg-orange-500 h-8 text-white rounded-md">Pending</Button></TableCell>
                                        <TableCell className="text-center">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.gatePassNo)} disabled={idx!=0?true:false}>+ Add </Button></DialogTrigger>
                                            { idx==0 &&  <DialogContent className='max-w-2xl'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-1xl text-center mt-1'>Packaging Material Incoming Entry</p></DialogTitle>

                                                    </DialogHeader>
                                                {/* <RcnPrimaryEntryForm rcn={rcnData}/> */}
                                                    
                                                </DialogContent>}
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        ) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell className="text-right  text-red-500 font-semibold">No Pending Entry</TableCell>
                            <TableCell></TableCell>
                        
                            <TableCell></TableCell>
                         
                            </TableRow>}
                    </TableBody>
                </Table>




            </div>
        
        </>
    )


}
export default PMInitial