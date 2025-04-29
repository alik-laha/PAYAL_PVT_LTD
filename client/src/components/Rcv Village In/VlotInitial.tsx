
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
import { format, toZonedTime } from 'date-fns-tz'
import axios from "axios";
import { useState } from "react";
import {  rcvVillageInprimaryData } from "@/type/type";
import VLOTCreateForm from "./VLotCreateForm";
//import RcvVillageInPrimaryEntry from "./RcvVillageInCreate";


interface lotPropsdata{
    recevingDate:string;
    totalWeight:string;
}

const VLOTInitial = (props: any) => {
    const [rcnData, setrcnData]  = useState<rcvVillageInprimaryData[]>([])
    const comparecurrentdate=handletimezone(new Date().toISOString())
    //console.log(comparecurrentdate)
    //let scoopdata:ScoopData[]=[]
    console.log(props)
    const handleLineEntry = async (recevingDate:string) => {
        axios.get(`/api/rcvVillageIn/getRcvVillageInByDate/${recevingDate}`).then(res=>{
           console.log(res)
           if(Array.isArray(res.data.rcnmainLot)){
            //scoopdata=res.data.scoopingLot
            setrcnData(res.data.rcnmainLot)
             console.log(rcnData)
           }
             
            //set(res.data.scoopingLot)
        })
    }

    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    function handletimezone(date: string | Date) {
            const apidate = new Date(date);
            const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
            const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
            return finaldate;
        }
    return (
        <>
            <div className="pl-10 pr-10 max-h-64 overflow-scroll">
         
                <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >Receiving_Date</TableHead>
                        <TableHead className="text-center" >Status</TableHead>
                        <TableHead className="text-center" >Receiving_Qty</TableHead>
                       
                        <TableHead className="text-center" >Action</TableHead>


                    </TableHeader>
                    <TableBody>
                        {props.props.length > 0 ? (
                            props.props.map((item: lotPropsdata, idx: number) => {
if(!(handletimezone(item.recevingDate)===comparecurrentdate)){
    return (
        <TableRow key={idx}>
            <TableCell className="text-center">
                {idx + 1}
            </TableCell>
            <TableCell className="text-center font-semibold">
                {handletimezone(item.recevingDate)}
            </TableCell>
            <TableCell className="text-center"><Button className="bg-orange-500 h-8 text-white rounded-md">Pending</Button></TableCell>

            <TableCell className="text-center font-semibold">
                {item.totalWeight ?formatNumber(item.totalWeight):0} Kg
            </TableCell>

            <TableCell className="text-center">
                <Dialog>
                    <DialogTrigger>
                        <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.recevingDate)} disabled={(idx!=0 || !item.totalWeight)?true:false}>+ VLOT </Button></DialogTrigger>
                        { idx==0 && <DialogContent style={{display:'block'}} className='max-w-screen'>
                        <DialogHeader >
                            <DialogTitle><p className='text-1xl text-center mt-1'> VLOT Entry</p></DialogTitle>

                        </DialogHeader>
                    <VLOTCreateForm props={rcnData}/>
                  
                    </DialogContent>}
                </Dialog>
            </TableCell>

        </TableRow>
    );
}
                                
                            })
                        ) : <TableRow>
                            <TableCell></TableCell>
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
export default VLOTInitial