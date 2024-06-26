import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LuDownload } from "react-icons/lu";
import { format, toZonedTime } from 'date-fns-tz'
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react"
import { Input } from "../ui/input";
// import DatePicker from "../common/DatePicker";
import { BoilingEntryData, BoilingExcelData } from "@/type/type";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Size, pageNo,pagelimit } from "../common/exportData"
import { FcApprove , FcDisapprove } from "react-icons/fc";


import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Origin } from "../common/exportData"
import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import RCNBoilingModify from './RCNBoilingModify'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,

    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useContext } from "react";
import Context from "../context/context";

import { CiEdit } from "react-icons/ci";


const RCNBoilingTable = () => {
    const [origin, setOrigin] = useState<string>("")
    const [size, setSize] = useState<string>("")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [Data, setData] = useState<BoilingEntryData[]>([])
    const [page, setPage] = useState(pageNo)
    const [EditData, setEditData] = useState<BoilingEntryData[]>([])
    const limit = pagelimit
    const { editPendingBoilingData,setEditPendingBoilingData } = useContext(Context);
    const [blockpagen, setblockpagen] = useState('flex')
    const currDate = new Date().toLocaleDateString();
    const approvesuccessdialog = document.getElementById('rcneditapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('rcneditScscloseDialog') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;

    const [transformedData, setTransformedData] = useState<BoilingExcelData[]>([]);
    const [successtext, setSuccessText] = React.useState<string>('');
    const [errortext, seterrorText] = React.useState<string>('');

    if (rejectcloseDialogButton) {
        rejectcloseDialogButton.addEventListener('click', () => {
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).close();
                window.location.reload()
            }


        });
    }
    if (approvecloseDialogButton) {
        approvecloseDialogButton.addEventListener('click', () => {
            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).close();
                window.location.reload()
            }

        });
    }

    useEffect(() => {
        if (editPendingBoilingData.length>0) {
           // console.log(editPendingBoilingData)
            setEditData(editPendingBoilingData)
           // console.log(EditData)
            setblockpagen('none')
        }
    }, [editPendingBoilingData])

    const handleSearch = async () => {
        //console.log('search button pressed')
        setEditPendingBoilingData([])
        //setEditData([])
        
        const response = await axios.post('/api/boiling/searchBoiling', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate,
            SizeName:size,
        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        console.log(data)
        if (data.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
        setData(data)

    }


    useEffect(() => {
        setEditData([])
        //setEditPendingBoilingData([])
        setblockpagen('flex')
        handleSearch()
    }, [page])

    const exportToExcel = async () => {
        const response = await axios.post('/api/boiling/searchBoiling', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate,
            SizeName:size,
        })
        const data1 = await response.data

        let ws
        let transformed
        if (EditData.length > 0) {
            
            transformed = EditData.map((item: BoilingEntryData, idx: number) => ({
                Sl_No: idx+1,
                Lot_No: item.LotNo,
                Entry_Date: handletimezone(item.date),
                Origin: item.origin,
                Size: item.SizeName,
                Boiling_Qty: item.Size,
                Scooping_Line: item.Scooping_Line_Mc,
                Pressure: item.Pressure,
                Machine: item.MCName,
                MC_On: handleAMPM(item.Mc_on.slice(0, 5)),
                MC_Off: handleAMPM(item.Mc_off.slice(0, 5)),
                Labour_No: item.noOfEmployees,
                Breakdown_Duration: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0(\d)$/, '$1')+' hr.' ,
                Other_Duration: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0(\d)$/, '$1')+' hr.',
                Cooking_Time:item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0/, '')+' hr.',
                Edit_Status: item.editStatus,
                Entried_By: item.CreatedBy,
                ApprovedOrRejectedBy:item.modifiedBy
            
            }));
            setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformedData);
        }
        else {
            transformed = data1.map((item: BoilingEntryData, idx: number) => ({
               
                Sl_No: idx+1,
                Lot_No: item.LotNo,
                Entry_Date: handletimezone(item.date),
                Origin: item.origin,
                Size: item.SizeName,
                Boiling_Qty: item.Size,
                Scooping_Line: item.Scooping_Line_Mc,
                Pressure: item.Pressure,
                Machine: item.MCName,
                MC_On: handleAMPM(item.Mc_on.slice(0, 5)),
                MC_Off: handleAMPM(item.Mc_off.slice(0, 5)),
                Labour_No: item.noOfEmployees,
                Breakdown_Duration: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0(\d)$/, '$1')+' hr.' ,
                Other_Duration: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0(\d)$/, '$1')+' hr.',
                Cooking_Time:item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0/, '')+' hr.',
                Edit_Status: item.editStatus,
                Entried_By: item.CreatedBy,
                ApprovedOrRejectedBy:item.modifiedBy
            }));
            setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformedData);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'RCN_Boiling_Entry_' + currDate + '.xlsx');
    };

    const handleRejection = async (item: BoilingEntryData) => {
        const response = await axios.post(`/api/boiling/rejectededitrcnboiling/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "RCN Boiling Modify Request is Reverted") {
            seterrorText(data.message)
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }
    const handleApprove = async (item: BoilingEntryData) => {
        const response = await axios.post(`/api/boiling/approveEditrcnBoiling/${item.id}`)
        const data = await response.data
        if (data.message === "RCN Boiling Modify Request is Approved") {
            setSuccessText(data.message)
            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }


    const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selected = e.target.value;
        if (!selected) {
            settoDate('')
            sethidetoDate('')
            return
        }
        //console.log(selected)
        const date = new Date(selected)
        date.setDate(date.getDate() + 1);
        //console.log(date)
        const nextday = date.toISOString().split('T')[0];
        //console.log(nextday)
        sethidetoDate(selected)
        settoDate(nextday)
    }
    const handleAMPM = (time: string) => {

        let [hours, minutes] = time.split(':').map(Number);
        let period = ' AM';

        if (hours === 0) {
            hours = 12;
        } else if (hours === 12) {
            period = ' PM';
        } else if (hours > 12) {
            hours -= 12;
            period = ' PM';
        }
        const finalTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + period.toString()

        // return ${hours}:${minutes.toString().padStart(2, '0')} ${period};
        return finalTime;
    }


    return (
        <div className="ml-5 mt-5 ">

            <div className="flex flexbox-search" >

                <Input className="no-padding w-1/6 flexbox-search-width" placeholder=" Lot No./ Line Name" value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />

                <select className='flexbox-search-width flex h-8 w-1/6 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setOrigin(e.target.value)} value={origin}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Origin (All)</option>
                    {Origin.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>
              
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left">From </label>
                <Input className="w-1/7 flexbox-search-width-calender"
                    type="date"
                    value={fromdate}
                    onChange={(e) => setfromDate(e.target.value)}
                    placeholder="From Date"

                />
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/7 flexbox-search-width-calender"
                    type="date"
                    value={hidetodate}
                    onChange={handleTodate}
                    placeholder="To Date"

                />
                  <select className='flexbox-search-width no-margin-left-absolute flex h-8 w-1/6 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setSize(e.target.value)} value={size}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Size (All)</option>
                    {Size.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>



            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center " >Lot No.</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                  
                   
                    <TableHead className="text-center" >Boiling-Date </TableHead>
                    <TableHead className="text-center" >Scooping Line</TableHead>
                    <TableHead className="text-center" >Size</TableHead>
                    <TableHead className="text-center" >Qty</TableHead>
                    <TableHead className="text-center" >Pressure</TableHead>
                    {/* <TableHead className="text-center" >Machine Name</TableHead> */}
                    <TableHead className="text-center" >Machine ON</TableHead>
                    <TableHead className="text-center" >Machine OFF</TableHead>
                    <TableHead className="text-center" >Breakdown Duration</TableHead>
                    <TableHead className="text-center" >Other Duration </TableHead>
                    <TableHead className="text-center" >Run Duration </TableHead>
                    <TableHead className="text-center" >Labour </TableHead>
                    <TableHead className="text-center" >Entried By </TableHead>
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>
                    {editPendingBoilingData.length > 0 ? (
                        editPendingBoilingData.map((item: BoilingEntryData, idx) => {
                                console.log(item)
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{idx + 1}</TableCell>
                                    <TableCell className="text-center font-bold text-orange-600">{item.LotNo}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    
                                    
                                    <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                    <TableCell className="text-center ">{item.Scooping_Line_Mc}</TableCell>

                                    <TableCell className="text-center font-semibold">{item.SizeName}</TableCell>
                                    <TableCell className="text-center font-semibold">{item.Size}</TableCell>
                                    <TableCell className="text-center font-semibold">{item.Pressure}</TableCell>
                                    {/* <TableCell className="text-center">{item.MCName}</TableCell> */}
                                    <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                    <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                    <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0/, '')} hr</TableCell>
                                    <TableCell className="text-center">{item.noOfEmployees}</TableCell>
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>
                                    <TableCell className="text-center">{item.editStatus}</TableCell>
                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex">
                                                    <FcApprove size={25}/> <button className="bg-transparent pb-2 pl-1 text-left hover:text-green-500">Approve</button>
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
                                                    <FcDisapprove size={25}/> <button className="bg-transparent pt-0.5 pl-1 text-left hover:text-red-500">Revert</button>
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
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        Data.length>0 ? (Data.map((item: BoilingEntryData, idx) => {


                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-bold text-orange-600">{item.LotNo}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    
                                    
                                    <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                    <TableCell className="text-center ">{item.Scooping_Line_Mc}</TableCell>

                                    <TableCell className="text-center font-bold">{item.SizeName}</TableCell>
                                    <TableCell className="text-center font-bold">{item.Size}</TableCell>
                                    <TableCell className="text-center font-bold">{item.Pressure}</TableCell>
                                    {/* <TableCell className="text-center">{item.MCName}</TableCell> */}
                                    <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                    <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                    <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0/, '')} hr</TableCell>
                                    <TableCell className="text-center">{item.noOfEmployees}</TableCell>
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>
                                    <TableCell className="text-center">{item.editStatus}</TableCell>


                                 
                                  
        
                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className={`p-2 text-white rounded ${item.editStatus === 'Pending' ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                <Dialog>
                                                    <DialogTrigger className="flex"><CiEdit size={20}/>
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-5'>RCN Boiling Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RCNBoilingModify data={item} />
                                                    </DialogContent>
                                                </Dialog>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            );
                        })):(<TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell><p className="w-100 font-medium text-center pt-3 pb-10">No Result </p></TableCell>
                          
                            </TableRow>)
                    )}
                </TableBody>
            </Table>
            <Pagination style={{ display: blockpagen }} className="pt-5 ">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPage((prev) => {
                            if (prev === 1) {
                                return prev
                            }
                            return prev - 1
                        })} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <dialog id="rcneditapproveScsDialog" className="dashboard-modal">
                <button id="rcneditScscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{successtext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="rcneditapproveRejectDialog" className="dashboard-modal">
                <button id="rcneditRejectcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </div>
    )

}
export default RCNBoilingTable;

