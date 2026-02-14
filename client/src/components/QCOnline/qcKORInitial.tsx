
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

 import QCKORCreateForm from "./QCKORCreateForm";

import cross from '../../assets/Static_Images/error_img.png'

interface lotPropsdata {
    LotNo: string;
}

const QcKORInitial = (props: any) => {
    const [bormaData, setBormaData] = useState<any[]>([])
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
    //let scoopdata:ScoopData[]=[]
    console.log(props)
    const handleLineEntry = async (lotNO: string) => {


        axios.get(`/api/qconline/getKORBylot/${lotNO}`).then(res => {
            console.log(res)
            if (Array.isArray(res.data.scoopingLot)) {
                //scoopdata=res.data.scoopingLot
                setBormaData(res.data.scoopingLot)
                console.log(bormaData)
            }
            else{
                seterrorText('error in Finding LOT')
                setBormaData([])
            }

            //set(res.data.scoopingLot)
        })
    }
    return (
        <>
            <div className="px-2 max-h-64 overflow-scroll">

                <Table className="mt-1">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl⠀No</TableHead>
                        <TableHead className="text-center" >Lot⠀No</TableHead>
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
                                                {/* <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.LotNo)} disabled={idx!=0?true:false}>+ Add </Button></DialogTrigger> */}

                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={() => handleLineEntry(item.LotNo)} >+ Add </Button></DialogTrigger>
                                                {/* { idx==0 &&  <DialogContent className='max-w-7xl'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-1xl text-center mt-1'>Borma Line Entry</p></DialogTitle>

                                                    </DialogHeader>
                                                
                                                    <RCNBormaLineCreateForm borma={bormaData}/>
                                                </DialogContent>} */}
                                                <DialogContent className='max-w-3xl'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-lg text-orange-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold'>KOR Line Entry</p></DialogTitle>

                                                    </DialogHeader>

                                                    <QCKORCreateForm borma={bormaData}/>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        ) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-left  text-red-500 font-semibold">No Pending Borma</TableCell>
                            <TableCell></TableCell>
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
export default QcKORInitial