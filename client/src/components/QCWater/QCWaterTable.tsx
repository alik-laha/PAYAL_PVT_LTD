import { useContext, useEffect } from "react";
import { Input } from "../ui/input";
import React from "react";
import axios from "axios";
import {  pendingCheckRoles, PermissionRole, QCWaterData } from "@/type/type";
import { pagelimit, pageNo, pendingCheckRole, QC_Boiler } from "../common/exportData";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Context from "../context/context";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format, toZonedTime } from 'date-fns-tz'
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CiEdit } from "react-icons/ci";

import { LuDownload } from "react-icons/lu";

//import IssueModify from "./IssueModify";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
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
import { FcApprove, FcDisapprove } from "react-icons/fc";
import QCWaterModify from "./QCWaterModify";


const QCWaterTable = () => {
 
   
    const [selectType, setselectType] = useState<string>('')
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
   
  
    const [page, setPage] = useState(pageNo)
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<QCWaterData[]>([])
    const limit = pagelimit
   
  
    const { editPendiningQCWaterData } = useContext(Context);

    const [ItemWiseData, setItemWiseData] = useState<QCWaterData[]>([])
 
    //const [transformedData, setTransformedData] = useState<ExcelRcnPrimaryEntryData[]>([]);
    const currDate = new Date().toLocaleDateString();
    const successdialog = document.getElementById('recevingeditapprove') as HTMLInputElement;
    const closeDialogButton = document.getElementById('recevingeditapproveclose') as HTMLInputElement;
    const errordialog = document.getElementById('recevingeditreject') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('recevingeditrejectclose') as HTMLInputElement;
    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
                window.location.reload()
            }


        });
    }
    if (errorcloseDialogButton) {
        errorcloseDialogButton.addEventListener('click', () => {
            if (errordialog != null) {
                (errordialog as any).close();
                window.location.reload()
            }

        });
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
   

    useEffect(() => {
        setEditData([])
        //setEditPendingBoilingData([])
        setblockpagen('flex')
        handleSearch()
    }, [page])

    useEffect(() => {
        if (editPendiningQCWaterData.length>0) {
            //console.log(editPendingData)
            setEditData(editPendiningQCWaterData)
            setblockpagen('none')
        }
    }, [editPendiningQCWaterData])

    const handleSearch = async () => {
        //console.log('search button pressed')
        //setEditPendingBoilingData([])
        setEditData([])
        //setSearchType(selectType)
     
        const response = await axios.post('/api/qcWater/searchQCWater', {
          
            fromDate: fromdate,
            toDate: todate,
            type: selectType

        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        setItemWiseData(data)
        //console.log(data)
        if (data.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
      
           
        
       

    }
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    function formatNumber(num: any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }
    const exportToExcel = async () => {
       
        const response = await axios.post('/api/qcWater/searchQCWater', {
          
            fromDate: fromdate,
            toDate: todate,
            type: selectType

        })
        const data = await response.data
        let ws
        let transformed: any[] = [];
        if (editPendiningQCWaterData.length>0 ) {
            console.log('Hi')
            transformed = editPendiningQCWaterData.map((item: QCWaterData,idx:number) => ({
                Sl_No: idx+1,
               
                Testing_Date:handletimezone(item.date),
                Testing_Time: handleAMPM(item.Mc_on.slice(0, 5)),
                Feed_Water_PH:formatNumber(parseFloat(item.feedph)),
                Feed_Water_TDS:formatNumber(parseFloat(item.feedtds)),
                Feed_Water_Hardness:formatNumber(parseFloat(item.feedhardness)),
                Boiler_Type:item.boilertype,
                Blown_Down_Time_Day_Shift:item.day,
                Blown_Down_Time_Night_Shift:item.night,
                Boiler_PH: formatNumber(parseFloat(item.ph)),
                Boiler_TDS:formatNumber(parseFloat(item.tds)),
              Water_Used:formatNumber(parseFloat(item.wateruse)),
              Water_Reading:formatNumber(parseFloat(item.reading)),
             
                Remarks:item.remarks,
                Edit_Status: item.editStatus,
                Created_By: item.CreatedBy,
                Approved_Or_Rejected_By: item.modifiedBy
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data.map((item: QCWaterData,idx:number) => ({
                
                Sl_No: idx+1,
                Testing_Date:handletimezone(item.date),
                Testing_Time: handleAMPM(item.Mc_on.slice(0, 5)),
                Feed_Water_PH:formatNumber(parseFloat(item.feedph)),
                Feed_Water_TDS:formatNumber(parseFloat(item.feedtds)),
                Feed_Water_Hardness:formatNumber(parseFloat(item.feedhardness)),
                Boiler_Type:item.boilertype,
                Blown_Down_Time_Day_Shift:item.day,
                Blown_Down_Time_Night_Shift:item.night,
                Boiler_PH: formatNumber(parseFloat(item.ph)),
                Boiler_TDS:formatNumber(parseFloat(item.tds)),
              Water_Used:formatNumber(parseFloat(item.wateruse)),
              Water_Reading:formatNumber(parseFloat(item.reading)),
             
                Remarks:item.remarks,
                Edit_Status: item.editStatus,
                Created_By: item.CreatedBy,
                Approved_Or_Rejected_By: item.modifiedBy

            }));
            // setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'QC_Water_Report' + currDate + '.xlsx');
    }
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const checkpending = (tab: string) => {
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }
    const handleApprove = (item: number) => {
        console.log(item)
        axios.get(`/api/qcWater/acceptEditQCWaterPrimary/${item}`)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    (successdialog as any).showModal();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleRejection = (item: number) => {
        axios.get(`/api/qcWater/rejectEditQCWaterPrimary/${item}`)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    (errordialog as any).showModal();
                }
            })
            .catch((err) => {
                console.log(err)
            })
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
                
                <select className='flexbox-search-width flex h-8 w-1/5 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setselectType(e.target.value)} value={selectType}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Boiler (All)</option>
                    {QC_Boiler.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>
                
                

                
             


                

               

                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            {checkpending('QCRCN') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
           
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Id</TableHead>
                      
                        
                        <TableHead className="text-center" >Date_Of_Testing</TableHead>
                    
                        <TableHead className="text-center" >Testing_Time</TableHead>
                        <TableHead className="text-center" >Feed_Water_PH</TableHead>
                        
                        <TableHead className="text-center" >Feed_Water_TDS</TableHead>
                        <TableHead className="text-center" >Feed_Water_Hardness</TableHead>
                        <TableHead className="text-center" >Boiler_Type</TableHead>
                        <TableHead className="text-center" >Boiler_PH</TableHead>
                        <TableHead className="text-center" >Boiler_TDS</TableHead>
                        <TableHead className="text-center" >Blown_Down_Time_(Day_Shift)</TableHead>
                        <TableHead className="text-center" >Blown_Down_Time_(Night_Shift)</TableHead>
                        
                        <TableHead className="text-center" >Water_Used</TableHead>
                        <TableHead className="text-center" >Water_Reading </TableHead>
                        <TableHead className="text-center" >Remarks(QC_Water_Entry)</TableHead>
                      
                        <TableHead className="text-center" >EditStatus</TableHead>
                        <TableHead className="text-center" >Created_By</TableHead>
                        <TableHead className="text-center" >Actioned_By</TableHead>
                      
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>
                    <TableBody>
                        {EditData.length > 0 ? (
                            EditData.map((item: QCWaterData, idx) => {

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                      
                                      <TableCell className="text-center ">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.feedph))}</TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.feedtds))}</TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.feedhardness))}</TableCell>
                                      <TableCell className="text-center font-semibold text-cyan-500">{item.boilertype}</TableCell>
                                      <TableCell className="text-center">{formatNumber(parseFloat(item.ph))} </TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.tds))}</TableCell>
                                      <TableCell className="text-center">{item.day} </TableCell>
                                      <TableCell className="text-center">{item.night} </TableCell>
                                      
                                      
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.wateruse))}</TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.reading))}</TableCell>
                                      <TableCell className="text-center">{item.remarks} </TableCell>
                                  
                                      <TableCell className="text-center ">{item.editStatus}</TableCell>
                                      <TableCell className="text-center ">{item.CreatedBy}</TableCell>
                                      <TableCell className="text-center ">{item.modifiedBy}</TableCell>
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
                                                                <AlertDialogAction onClick={() => handleApprove(item.id)}>Continue</AlertDialogAction>
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
                                                                <AlertDialogAction onClick={() => handleRejection(item.id)}>Continue</AlertDialogAction>
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
                           
                            ItemWiseData.length > 0 ? (ItemWiseData.map((item: QCWaterData, idx) => {

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                       
                                    
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                      
                                      <TableCell className="text-center ">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.feedph))}</TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.feedtds))}</TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.feedhardness))}</TableCell>
                                      <TableCell className="text-center font-semibold text-cyan-500">{item.boilertype}</TableCell>
                                      <TableCell className="text-center">{formatNumber(parseFloat(item.ph))} </TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.tds))}</TableCell>
                                      <TableCell className="text-center">{item.day} </TableCell>
                                      <TableCell className="text-center">{item.night} </TableCell>
                                      
                                      
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.wateruse))}</TableCell>
                                      <TableCell className="text-center ">{formatNumber(parseFloat(item.reading))}</TableCell>
                                      <TableCell className="text-center">{item.remarks} </TableCell>
                                  
                                      <TableCell className="text-center ">{item.editStatus}</TableCell>
                                      <TableCell className="text-center ">{item.CreatedBy}</TableCell>
                                      <TableCell className="text-center ">{item.modifiedBy}</TableCell>


                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className={`p-2 text-white rounded ${item.editStatus === 'Pending' ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <Dialog>
                                                        <DialogTrigger className="flex"><CiEdit size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent className='max-w-3xl'>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-5'>QC Water Modify</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            {/* <RCNLineCreateEditForm scoop={scoopdata} /> */}
                                                            <QCWaterModify data={item} />
                                                        </DialogContent>
                                                    </Dialog>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
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
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
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

            <Pagination style={{ display: blockpagen }} className="pt-5 ">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPage((prev) => {
                            if (prev === 1) {
                                return prev
                            }
                            if (prev <= 0) {
                                return prev + 1
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
            <dialog id="recevingeditapprove" className="dashboard-modal">
                    <button id="recevingeditapproveclose" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium">Modification Request has Been Approved</p></span>

                    {/* <!-- Add more elements as needed --> */}
                </dialog>

                <dialog id="recevingeditreject" className="dashboard-modal">
                    <button id="recevingeditrejectclose" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">Modification Request has Been Reverted</p></span>

                    {/* <!-- Add more elements as needed --> */}
                </dialog>
        </div>
    )
}
export default QCWaterTable;