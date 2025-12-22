
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
import cross from '../../assets/Static_Images/error_img.png'
// import RCNDPDSCreateForm from "./DPDSCreateForm";
import {   RejectionData } from "@/type/type";
import RejectionCreateForm from "./RejectionCreateForm";
//import { checkFormLock } from "../common/FormLock";


interface lotPropsdata{
    LotNo: string;
    origin: string;
    current_backlog: string;
    rcv_mayur:string;
    rcv_wholes:string;
    rcv_lw:string;
    rcv_bigTaiho:string;
    rcv_peeling:string;
    rcv_dpds:string;
    rcv_village:string;
    rcv_sorting:string;
}

const RejectionInitial = (props: any) => {
    const [bormaData, setBormaData ]  = useState<RejectionData[]>([])
    const [errortext, seterrorText] = useState<string>('');
    
    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialogPeel') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialogPeel') as HTMLInputElement;
    //let scoopdata:ScoopData[]=[]
    if (rejectcloseDialogButton) {
        rejectcloseDialogButton.addEventListener('click', () => {
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).close();
                //window.location.reload()
            }


        });
    }
    //let scoopdata:ScoopData[]=[]
    console.log(props)
    const handleLineEntry = async (lotNO:string,origin:string) => {
        const resStatus = await axios.post('/api/boiling/pendingLotCount', { lotNo: lotNO,section:'Peeling'})
        console.log(resStatus)
        if (resStatus.data.count && resStatus.data.count >0) 
            {
                seterrorText('Modification of Lot is Pending in Peeling Section')
                if (rejectsuccessdialog != null) {
                    (rejectsuccessdialog as any).showModal();
                }
                return
            }
        const resStatus1 = await axios.post('/api/boiling/pendingLotCountOrigin', { lotNo: lotNO,origin:origin})
        console.log(resStatus1)
        if (resStatus1.data.scoopingLot && resStatus1.data.scoopingLot[0].editStatus ==='Pending') 
            {
                
                seterrorText(`Modification of Lot is Pending in Linked  ${resStatus1.data.scoopingLot[0].latest_section} Section`)
                if (rejectsuccessdialog != null) {
                        (rejectsuccessdialog as any).showModal();
                }
                return
            }

      
           
        await axios.get(`/api/rejection/getRejectionByLotOrigin/${lotNO}/${origin}`).then(res=>{
           console.log(res)
           if(Array.isArray(res.data.scoopingLot)){
            //scoopdata=res.data.scoopingLot
            setBormaData(res.data.scoopingLot)
             console.log(bormaData)
           }
             
            //set(res.data.scoopingLot)
        })
    }
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    return (
        <>
            <div className="pl-10 pr-10 max-h-64 overflow-scroll">
         
                <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >Lot No</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Current_Backlog</TableHead>
                        <TableHead className="text-center" >Action</TableHead>


                    </TableHeader>
                    <TableBody>
                        {props.props.length > 0 ? (
                            props.props.map((item: lotPropsdata, idx: number) => {
                              if(item.rcv_mayur && item.rcv_peeling   
                                
                                && item.rcv_wholes && (item.rcv_sorting || item.rcv_dpds) && item.rcv_lw 
                                &&((item.rcv_mayur ? parseFloat(item.rcv_mayur) : 0) + 
                              (item.rcv_dpds ? parseFloat(item.rcv_dpds) : 0) + 
                              (item.rcv_peeling ? parseFloat(item.rcv_peeling) : 0) + 
                              (item.rcv_wholes ? parseFloat(item.rcv_wholes) : 0) + 
                              (item.rcv_dpds ? parseFloat(item.rcv_dpds) : 0) + 
                              (item.rcv_village ? parseFloat(item.rcv_village) : 0) + 
                              (item.rcv_lw ? parseFloat(item.rcv_lw) : 0) + 
                              (item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0) 
                              )>0){
                                return (
                                    <TableRow key={idx}>
                                        <TableCell className="text-center">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">
                                            {item.LotNo}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold text-blue-500">
                                            {item.origin}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold ">
                                        {formatNumber(item.current_backlog)} Kg
                                        </TableCell>
                                        
                                        <TableCell className="text-center">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.LotNo,item.origin)}> Issue </Button></DialogTrigger>
                                          <DialogContent className='max-w-screen'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Rejection Line Entry</p></DialogTitle>

                                                    </DialogHeader>
                                                
                                                    <RejectionCreateForm borma={bormaData}/>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                );
                              }
                             
                                
                            })
                        ) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-left  text-red-500 font-semibold">No Pending Rejection</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>




            </div>
            <dialog id="rcneditapproveRejectDialogPeel" className="dashboard-modal">
                <button id="rcneditRejectcloseDialogPeel" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        
        </>
    )


}
export default RejectionInitial