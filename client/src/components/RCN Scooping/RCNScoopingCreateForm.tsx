
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
import cross from '../../assets/Static_Images/error_img.png'


interface lotPropsdata{
    LotNo:string;
}

const RCNScoopingCreateForm = (props: any) => {
    const [scoopdata, setscoopdata ]  = useState<ScoopData[]>([])
    const [errortext, seterrorText] = useState<string>('');
    
    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;
    //let scoopdata:ScoopData[]=[]
    if (rejectcloseDialogButton) {
        rejectcloseDialogButton.addEventListener('click', () => {
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).close();
                //window.location.reload()
            }


        });
    }
    console.log(props)
    const handleLineEntry = async (lotNO:string) => {

        const resStatus = await axios.post('/api/boiling/pendingLotCount', { lotNo: lotNO,section:'Boiling'})
        console.log(resStatus)
        if (resStatus.data.count && resStatus.data.count >0) 
            {
                seterrorText(`Modification of Lot is Pending in Previous Section`)
                if (rejectsuccessdialog != null) {
                    (rejectsuccessdialog as any).showModal();
                }
                return
            }
        axios.get(`/api/scooping/getScoopByLot/${lotNO}`).then(res=>{
           console.log(res)
           if(Array.isArray(res.data.scoopingLot)){
            //scoopdata=res.data.scoopingLot
            setscoopdata(res.data.scoopingLot)
             console.log(scoopdata)
           }
             
            //set(res.data.scoopingLot)
        })
    }
   
    return (
        <>
            <div className="max-h-64 overflow-scroll">
         
                <Table className="mt-3">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl⠀No</TableHead>
                        <TableHead className="text-center" >rcn⠀Lot⠀No</TableHead>
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

                                        <TableCell className="text-center font-semibold text-orange-500">PENDING</TableCell>
                                        <TableCell className="text-center">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.LotNo)} disabled={idx!=0?true:false}>+ Add </Button></DialogTrigger>
                                            { idx==0 &&  <DialogContent className='max-w-screen'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-lg text-orange-600 text-center my-1 tracking-wider drop-shadow-xl font-bold'>Scooping Line Entry</p></DialogTitle>

                                                    </DialogHeader>
                                                <RCNScoopingLineCreateForm scoop={scoopdata}/>
                                                    
                                                </DialogContent>}
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        ) : <TableRow>
                          
                            <TableCell colSpan={4} className="text-center py-3 text-md text-red-500 font-semibold">No Pending Scooping</TableCell>
                            
                            </TableRow>}
                    </TableBody>
                </Table>




            </div>
            
            <dialog id="rcneditapproveRejectDialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="rcneditRejectcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        
        </>
    )


}
export default RCNScoopingCreateForm