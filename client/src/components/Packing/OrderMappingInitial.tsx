
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
import { format, toZonedTime } from 'date-fns-tz'
import OrderMappingCreateForm from "./OrderMappingCreateForm";
//import HamsaCreateForm from "./HamsaCreateForm";


interface orderMappingProps{
    orderID:string;
    origin:string;
    orderDate:string;
    finalgradeName:string;
    vendorName:string;
    demandQuantity:string;
}

const OrderMappingInitial = (props: any) => {
    const [bormaData, setBormaData ]  = useState<any[]>([])
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
    const handleLineEntry = async (orderId:string,origin:string,grade:string) => {
        
        
        await axios.post('/api/packing/getMappingByGradeOrigin',{orderId,origin,grade}).then(res=>{
           console.log(res)
           if(Array.isArray(res.data.scoopingLot)){
            setBormaData(res.data.scoopingLot)
             console.log(bormaData)
           }
        }).catch(err=>{
            console.log(err)
            seterrorText('An Error Occured')
            if (rejectsuccessdialog != null) {
                    (rejectsuccessdialog as any).showModal();
            }
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
         
                <Table className="mt-5">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl. No.</TableHead>
                        <TableHead className="text-center" >Puchase Order No</TableHead>
                        <TableHead className="text-center" >Order Entry Date</TableHead>
                        <TableHead className="text-center" >Vendor Name</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Final Grade</TableHead>
                        <TableHead className="text-center" >Demand Qyantity</TableHead>
                        <TableHead className="text-center" >Action</TableHead>


                    </TableHeader>
                    <TableBody>
                        {props.props.length > 0 ? (
                            props.props.map((item: orderMappingProps, idx: number) => {
                          
                                return (
                                    <TableRow key={idx}>
                                        <TableCell className="text-center">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold text-red-500">
                                            {item.orderID}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold ">
                                            {handletimezone(item.orderDate)}
                                        </TableCell>
                                        <TableCell className="text-center  ">
                                            {item.vendorName}
                                        </TableCell>
                                        <TableCell className="text-center  ">
                                            {item.origin}
                                        </TableCell>
                                        <TableCell className="text-center  ">
                                            {item.finalgradeName}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold ">
                                        {formatNumber(item.demandQuantity)} Kg
                                        </TableCell>
                                        
                                        <TableCell className="text-center">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button className="bg-green-500 h-8 rounded-md" onClick={()=>handleLineEntry(item.orderID,item.origin,item.finalgradeName)}> Map </Button></DialogTrigger>
                                          <DialogContent className='max-w-screen' style={{display:'block'}}>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-1xl text-center mt-1'>Order Mapping Entry</p></DialogTitle>

                                                    </DialogHeader>
                                                
                                                    <OrderMappingCreateForm mapping={bormaData}/>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>

                                    </TableRow>
                                );
                              
                             
                                
                            })
                        ) : <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-left  text-red-500 font-semibold">No Pending Order Mapping</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
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
export default OrderMappingInitial