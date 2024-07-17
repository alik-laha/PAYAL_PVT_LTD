import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useContext, useEffect, useState } from "react";
import Context from "../context/context";
import { EditPendingData, rcnScoopingData } from "@/type/type";
import { format, toZonedTime } from 'date-fns-tz'
import { pagelimit } from "../common/exportData"

const RcnTableLineWise = ({ LineWise, page }: { LineWise: rcnScoopingData[], page: number }) => {
    const limit = pagelimit;
    const { editPendingData } = useContext(Context);
    const [EditData, setEditData] = useState<EditPendingData[]>([]);

    useEffect(() => {
        setEditData(editPendingData);
    }, [editPendingData])
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    function formatNumber(num:any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }
    return (
        console.log(LineWise),
        <Table className="mt-4">
            <TableHeader className="bg-neutral-100 text-stone-950 ">

                <TableHead className="text-center" >Id</TableHead>
                <TableHead className="text-center" >RCNLotNo.</TableHead>
                <TableHead className="text-center" >DateofScooping </TableHead>
                <TableHead className="text-center" >Origin</TableHead>
                <TableHead className="text-center" >ScoopingLineMC</TableHead>
                <TableHead className="text-center" >Size Name</TableHead>
                <TableHead className="text-center" >Opening_Qty</TableHead>
                <TableHead className="text-center" >Receiving_Qty</TableHead>
                <TableHead className="text-center" >M/c On</TableHead>
                <TableHead className="text-center" >M/c Off</TableHead>
                <TableHead className="text-center" >M/c RunTime</TableHead>
                <TableHead className="text-center" >Trolley Broken</TableHead>
                <TableHead className="text-center" >Trolley SmallJB</TableHead>
                

                <TableHead className="text-center" >Wholes(kg)</TableHead>
                        <TableHead className="text-center" >Broken(Kg)</TableHead>
                        <TableHead className="text-center" >Uncut(Kg)</TableHead>
                        <TableHead className="text-center" >Unscoop(Kg)</TableHead>
                        <TableHead className="text-center" >NonCut(Kg)</TableHead>
                        <TableHead className="text-center" >Rejection(Kg)</TableHead>
                        <TableHead className="text-center" >RCNDust (Kg) </TableHead>
                        <TableHead className="text-center" >Bag Cutting</TableHead>
                        <TableHead className="text-center" >KOR</TableHead>
                        <TableHead className="text-center" >Transfered_Qty</TableHead>
                        <TableHead className="text-center" >Transfered_To_Line</TableHead>
                        <TableHead className="text-center" >Female (Common)</TableHead>
                        <TableHead className="text-center" >Male (Common)</TableHead>
                        <TableHead className="text-center" >SuperVisor (Common)</TableHead>
                        <TableHead className="text-center" >Total Operator</TableHead>
                        <TableHead className="text-center" >Total Female</TableHead>
                        <TableHead className="text-center" >EditStatus</TableHead>
                        <TableHead className="text-center" >Entried By </TableHead>

            </TableHeader>
            <TableBody>
                {EditData.length > 0 ? (
                    EditData.map((item: EditPendingData, idx) => {

                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center">{item.blNo}</TableCell>
                                <TableCell className="text-center">{item.conNo}</TableCell>
                                <TableCell className="text-center">{item.truckNo}</TableCell>

                                <TableCell className="text-center">{item.blWeight}</TableCell>
                                <TableCell className="text-center">{item.netWeight}</TableCell>

                                {Number(item.difference) < 0 ? (<TableCell className="text-center font-semibold text-red-600">{formatNumberWithSign(Number(item.difference))}</TableCell>)
                                    : (<TableCell className="text-center font-semibold text-green-600">{formatNumberWithSign(Number(item.difference))}</TableCell>)}

                                <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
                                <TableCell className="text-center ">
                                    {item.rcnStatus === 'QC Approved' ? (
                                        <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                    ) : item.rcnStatus === 'QC Pending' ? (
                                        <button className="bg-yellow-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                    ) : (
                                        <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                    )}
                                </TableCell>
                                {/* <TableCell className="text-center">{item.editStatus == 'Created' ?
                                    'NA' : item.editStatus}</TableCell>
                                <TableCell className="text-center">{item.editedBy}</TableCell>
                                <TableCell className="text-center">
                                    <Popover>
                                        <PopoverTrigger>
                                            <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                            <AlertDialog>
                                                <AlertDialogTrigger className="flex">
                                                    <FcApprove size={25} /> <button className="bg-transparent pb-2 pl-1 text-left hover:text-green-500">Approve</button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Do you want to Approve the Edit Request?</AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleApprove(item)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                            <AlertDialog>
                                                <AlertDialogTrigger className="flex mt-2">
                                                    <FcDisapprove size={25} /> <button className="bg-transparent pt-0.5 pl-1 text-left hover:text-red-500">Revert</button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Do you want to Decline the Edit Request?</AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleRejection(item)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell> */}
                            </TableRow>
                        );
                    })
                ) : (
                    LineWise.length > 0 ? (LineWise.map((item: rcnScoopingData, idx: number) => {

                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.LotNo}</TableCell>
                                <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center font-semibold">{item.origin}</TableCell>
                                <TableCell className="text-center">{item.Scooping_Line_Mc}</TableCell>
                                <TableCell className="text-center">{item.SizeName}</TableCell>
                                <TableCell className="text-center">{formatNumber(parseFloat(item.Opening_Qty))} Kg</TableCell>
                                <TableCell className="text-center">{formatNumber(parseFloat(item.Receiving_Qty))} Kg</TableCell>
                                <TableCell className="text-center">{item.Mc_on?.slice(0, 5)}</TableCell>
                                <TableCell className="text-center">{item.Mc_off?.slice(0, 5)}</TableCell>
                                <TableCell className="text-center">{item.Mc_runTime?.slice(0, 5)}</TableCell>
                                <TableCell className="text-center">{item.Trolley_Broken} %</TableCell>
                                <TableCell className="text-center">{item.Trolley_Small_JB} %</TableCell>
                               

                                <TableCell className="text-center">{formatNumber(parseFloat(item.Wholes))} Kg</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Broken))} Kg</TableCell>

                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.Uncut))} Kg</TableCell>


                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Unscoop))} Kg</TableCell>
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.NonCut))} Kg</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Rejection))} Kg</TableCell>
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.Dust))} Kg</TableCell>
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.TotBagCutting))}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.KOR))}</TableCell>
                                        
                                        <TableCell className="text-center ">{item.Transfered_Qty} Kg</TableCell>
                                        <TableCell className="text-center ">{item.Transfered_To}</TableCell>
                                     
                                <TableCell className="text-center ">{item.noOfLadies}</TableCell>
                                <TableCell className="text-center">{item.noOfGents}</TableCell>
                                <TableCell className="text-center ">{item.noOfSupervisors}</TableCell>
                                <TableCell className="text-center ">{item.noOfOperators}</TableCell>
                                <TableCell className="text-center ">{item.noOfEmployees}</TableCell>
                                <TableCell className="text-center ">{item.editStatus}</TableCell>
                                <TableCell className="text-center ">{item.CreatedBy}</TableCell>
                                {/* <TableCell className="text-center">
                                    <Popover>
                                        <PopoverTrigger>
                                            <button className={`p-2 text-white rounded ${item.editStatus === 'Pending' ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                            <Dialog>
                                                <DialogTrigger className="flex"><CiEdit size={20} />
                                                    <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" onClick={() => handleLineEntry(item.LotNo, item.origin)}>View/Modify</button>
                                                </DialogTrigger>
                                                <DialogContent className='max-w-3xl'>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            <p className='text-1xl pb-1 text-center mt-5'>Line Wise Scooping Modify</p>
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <RCNLineCreateEditForm scoop={scoopdata} />
                                                </DialogContent>
                                            </Dialog>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell> */}
                            </TableRow>
                        );
                    })) : (<TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>)
                )}
            </TableBody>
        </Table>
    )
}
export default RcnTableLineWise