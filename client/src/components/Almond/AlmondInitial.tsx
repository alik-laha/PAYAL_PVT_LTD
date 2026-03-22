
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

import AlmondPrimaryEntryForm from "./AlmondCreateForm";




interface lotPropsdata{
    gatePassNo:string;
    gateType:string;
}

const AlmondInitialForm = (props: any) => {
    const [rcnData, setrcnData]  = useState<[]>([])

    //let scoopdata:ScoopData[]=[]
    console.log(props)
    const handleLineEntry = async (gatePassNo:string) => {
        axios.get(`/api/almondPrimary/getAlmondByGatePass/${gatePassNo}`).then(res=>{
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
            <div className="mx-5 max-h-64 overflow-scroll">
         
                <Table>
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >GatePass No</TableHead>
                        <TableHead className="text-center" >GatePass Type</TableHead>
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
                                        <TableCell className="text-center font-semibold text-blue-500">
                                            {item.gatePassNo}
                                        </TableCell>

                                         <TableCell className="text-center font-semibold">
                                            {item.gateType}
                                        </TableCell>
                                      

                                        <TableCell className="text-center text-orange-500 font-semibold">PENDING</TableCell>
                                        <TableCell className="text-center">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.gatePassNo)} >+ Add </Button></DialogTrigger>
                                              <DialogContent style={{display:'block'}} className='max-w-7xl max-h-screen overflow-auto'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Almond Entry/Exit Form</p></DialogTitle>

                                                    </DialogHeader>
                                                <AlmondPrimaryEntryForm rcn={rcnData}/>
                                                    
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        ) : <TableRow>
                             <TableCell colSpan={5} className="text-center py-3 text-md text-red-500 font-semibold">No Pending Entry</TableCell>
                         
                            </TableRow>}
                    </TableBody>
                </Table>




            </div>
        
        </>
    )


}
export default AlmondInitialForm