
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
import { HumidData } from "@/type/type";


import cross from '../../assets/Static_Images/error_img.png'
import RCNHumidLineCreateForm from "./HumidifierLineCreateForm";

interface lotPropsdata{
    LotNo:string;
}

const RCNHumidCreateForm = (props: any) => {
    const [bormaData, setBormaData ]  = useState<HumidData[]>([])
    const [errortext, seterrorText] = useState<string>('');
    
    const rejectsuccessdialoghumid = document.getElementById('rcneditapproveRejectDialoghumid') as HTMLInputElement;
    const rejectcloseDialogButtonhumid = document.getElementById('rcneditRejectcloseDialoghumid') as HTMLInputElement;
    //let scoopdata:ScoopData[]=[]
    if (rejectcloseDialogButtonhumid) {
        rejectcloseDialogButtonhumid.addEventListener('click', () => {
            if (rejectsuccessdialoghumid != null) {
                (rejectsuccessdialoghumid as any).close();
                //window.location.reload()
            }


        });
    }
    //let scoopdata:ScoopData[]=[]
    console.log(props)
    const handleLineEntry = async (lotNO:string) => {
        const resStatus = await axios.post('/api/boiling/pendingLotCount', { lotNo: lotNO,section:'Borma'})
        console.log(resStatus)
        if (resStatus.data.count && resStatus.data.count >0) 
            {
                seterrorText('Modification of Lot is Pending in Previous Section')
                if (rejectsuccessdialoghumid != null) {
                    (rejectsuccessdialoghumid as any).showModal();
                }
                return
            }
        axios.get(`/api/humid/getHumidByLot/${lotNO}`).then(res=>{
           console.log(res)
           if(Array.isArray(res.data.scoopingLot)){
            //scoopdata=res.data.scoopingLot
            setBormaData(res.data.scoopingLot)
             console.log(bormaData)
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
                                            {/* <Dialog>
                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.LotNo)} disabled={idx!=0?true:false}>+ Add </Button></DialogTrigger>
                                            { idx==0 &&  <DialogContent className='max-w-7xl'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-1xl text-center mt-1'>Humidifier Line Entry</p></DialogTitle>

                                                    </DialogHeader>
                                                
                                                    <RCNHumidLineCreateForm borma={bormaData}/>
                                                </DialogContent>}
                                            </Dialog> */}
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.LotNo)}>+ Add </Button></DialogTrigger>
                                         <DialogContent className='max-w-screen'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-1xl text-center mt-1'>Humidifier Line Entry</p></DialogTitle>

                                                    </DialogHeader>
                                                
                                                    <RCNHumidLineCreateForm borma={bormaData}/>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        ) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-left  text-red-500 font-semibold">No Pending Humidification</TableCell>
                            <TableCell></TableCell>
                            </TableRow>}
                    </TableBody>
                </Table>




            </div>
            <dialog id="rcneditapproveRejectDialoghumid" className="dashboard-modal">
                <button id="rcneditRejectcloseDialoghumid" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        
        </>
    )


}
export default RCNHumidCreateForm