import { useContext, useEffect } from "react";
import { Input } from "../ui/input";
import React from "react";
import axios from "axios";
import { pendingCheckRoles, PermissionRole, QCWaterData } from "@/type/type";
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


const QCWaterTable = (props: any) => {


    const [selectType, setselectType] = useState<string>('')
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    // const [hidetodate, sethidetoDate] = React.useState<string>('');


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
    // const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const selected = e.target.value;
    //     if (!selected) {
    //         settoDate('')
    //         sethidetoDate('')
    //         return
    //     }
    //     //console.log(selected)
    //     const date = new Date(selected)
    //     date.setDate(date.getDate() + 1);
    //     //console.log(date)
    //     const nextday = date.toISOString().split('T')[0];
    //     //console.log(nextday)
    //     sethidetoDate(selected)
    //     settoDate(nextday)
    // }


    useEffect(() => {
        setEditData([])
        //setEditPendingBoilingData([])
        setblockpagen('flex')
        handleSearch()
    }, [page])

    useEffect(() => {
        if (editPendiningQCWaterData.length > 0) {
            //console.log(editPendingData)
            setEditData(editPendiningQCWaterData)
            if (props.props === 'edit') { setblockpagen('none') }
        }
    }, [editPendiningQCWaterData, props.props])

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
        if (editPendiningQCWaterData.length > 0) {
            console.log('Hi')
            transformed = editPendiningQCWaterData.map((item: QCWaterData, idx: number) => ({
                Sl_No: idx + 1,

                Testing_Date: handletimezone(item.date),
                Testing_Time: handleAMPM(item.Mc_on.slice(0, 5)),
                Feed_Water_PH: formatNumber(parseFloat(item.feedph)),
                Feed_Water_TDS: formatNumber(parseFloat(item.feedtds)),
                Feed_Water_Hardness: formatNumber(parseFloat(item.feedhardness)),
                Boiler_Type: item.boilertype,
                Blown_Down_Time_Day_Shift: item.day,
                Blown_Down_Time_Night_Shift: item.night,
                Boiler_PH: formatNumber(parseFloat(item.ph)),
                Boiler_TDS: formatNumber(parseFloat(item.tds)),
                Water_Used: formatNumber(parseFloat(item.wateruse)),
                Water_Reading: formatNumber(parseFloat(item.reading)),

                Remarks: item.remarks,
                Edit_Status: item.editStatus,
                Created_By: item.CreatedBy,
                Approved_Or_Rejected_By: item.modifiedBy
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data.map((item: QCWaterData, idx: number) => ({

                Sl_No: idx + 1,
                Testing_Date: handletimezone(item.date),
                Testing_Time: handleAMPM(item.Mc_on.slice(0, 5)),
                Feed_Water_PH: formatNumber(parseFloat(item.feedph)),
                Feed_Water_TDS: formatNumber(parseFloat(item.feedtds)),
                Feed_Water_Hardness: formatNumber(parseFloat(item.feedhardness)),
                Boiler_Type: item.boilertype,
                Blown_Down_Time_Day_Shift: item.day,
                Blown_Down_Time_Night_Shift: item.night,
                Boiler_PH: formatNumber(parseFloat(item.ph)),
                Boiler_TDS: formatNumber(parseFloat(item.tds)),
                Water_Used: formatNumber(parseFloat(item.wateruse)),
                Water_Reading: formatNumber(parseFloat(item.reading)),

                Remarks: item.remarks,
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
        <div className="mx-2 mt-5 ">

            {props.props === 'non-edit' && <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-4 gap-4 items-end">

                    {/* Boiler */}
                    <div className="flex flex-col gap-1">
                        <select
                            className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                            onChange={(e) => setselectType(e.target.value)}
                            value={selectType}
                        >
                            <option value="">Boiler (All)</option>
                            {QC_Boiler.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>



                    {/* From Date */}
                    <div className="flex flex-col md:flex-row gap-1 md:items-center ">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            From
                        </label>
                        <Input
                            type="date"
                            className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                            value={fromdate}
                            onChange={(e) => setfromDate(e.target.value)}
                        />
                    </div>

                    {/* To Date */}
                    <div className="flex flex-col md:flex-row gap-1 md:items-center">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            To
                        </label>
                        <Input
                            type="date"
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                            value={todate}
                            onChange={(e) => settoDate(e.target.value)}
                        />
                    </div>

                    {/* Search & Export Buttons */}
                    <div className="flex flex-wrap justify-end md:justify-between gap-3 mt-2 md:mt-0">
                        <Button
                            className="flex w-40 items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                            onClick={handleSearch}
                        >
                            <FaSearch size={14} />
                            Search
                        </Button>

                        {checkpending('QCRCN') && (
                            <Button
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={exportToExcel}
                            >
                                <LuDownload size={16} />

                            </Button>
                        )}
                    </div>

                </div>
            </div>}

             {props.props==='edit' &&   <Button
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                  onClick={exportToExcel}
                >
                  <LuDownload size={16} />

                </Button>}
            
          

            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Id</TableHead>

                     <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Action</TableHead>
               
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Date⠀Of⠀Testing</TableHead>

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`}>Testing⠀Time</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Feed⠀Water⠀PH</TableHead>

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Feed⠀Water⠀TDS</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Feed⠀Water⠀Hardness</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Water⠀Boiler⠀Type</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Boiler⠀PH</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Boiler⠀TDS</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`}>Blown⠀Down⠀Time⠀(Day⠀Shift)</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Blown⠀Down⠀Time⠀(Night⠀Shift)</TableHead>

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Water⠀Used</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Water⠀Reading </TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Remarks(QC⠀Water⠀Entry)</TableHead>

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Edit⠀Status</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Created⠀By</TableHead>
                   {props.props==='non-edit' && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Actioned⠀By</TableHead>}
                </TableHeader>
                   
                <TableBody>
                    {EditData.length > 0 && props.props==='edit' ? (
                        EditData.map((item: QCWaterData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{idx + 1}</TableCell>
                                    <TableCell className="text-center flex flex-row gap-3">
                                        <AlertDialog>
                                            <AlertDialogTrigger >
                                                <div className="flex flex-row gap-1 bg-green-50 px-3 py-1 rounded border border-green-300 "> <FcApprove size={18} />
                                                    <button className="text-green-600">
                                                        Approve
                                                    </button>

                                                </div>

                                            </AlertDialogTrigger>
                                            <AlertDialogContent  >
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Do you want to Approve the Edit Request?
                                                    </AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleApprove(item.id)}>
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <div className="flex flex-row gap-1 bg-red-50 px-3 py-1 rounded border border-red-300">
                                                    <FcDisapprove size={18} />
                                                    <button className=" text-red-600">
                                                        Revert
                                                    </button>
                                                </div>

                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Do you want to Decline the Edit Request?
                                                    </AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleRejection(item.id)}>
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                    <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>

                                    <TableCell className="text-center ">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(parseFloat(item.feedph))}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(parseFloat(item.feedtds))} ppm</TableCell>
                                    <TableCell className="text-center ">{formatNumber(parseFloat(item.feedhardness))} mg/ltr</TableCell>
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
                                    {/* <TableCell className="text-center ">{item.modifiedBy}</TableCell> */}
                                   
                                </TableRow>
                            );
                        })
                    ) : (

                        ItemWiseData.length > 0 ? (ItemWiseData.map((item: QCWaterData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>

                                      <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                 <button className={`p-2 bg-white rounded ${item.editStatus === 'Pending' ? 'text-red-500 h-8  w-20 border border-red-400 font-bold rounded-lg opacity-60 hover:bg-red-200' : 'text-blue-500 h-8  w-20 border border-blue-400 font-bold rounded-lg hover:bg-blue-200'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
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
                                    <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>

                                    <TableCell className="text-center ">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(parseFloat(item.feedph))}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(parseFloat(item.feedtds))} ppm</TableCell>
                                    <TableCell className="text-center ">{formatNumber(parseFloat(item.feedhardness))} mg/ltr</TableCell>
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

             <Pagination  style={{ display: blockpagen }} className="pt-5 flex flex-row justify-end ">
                                                 <PaginationContent className="">
                                                     {page > 1 && <PaginationItem>
                                                         <PaginationPrevious onClick={() => setPage((prev) => {
                                                             if (prev === 1) {
                                                                 return prev
                                                             }
                                                             if (prev <= 0) {
                                                                 return prev + 1
                                                             }
                                                             return prev - 1
                                                         })} />
                                                     </PaginationItem>}
                                                     {page > 2 && <PaginationItem>
                                                         <PaginationLink onClick={() => setPage((prev) => prev - 2)}>{page - 2}</PaginationLink>
                                                     </PaginationItem>}
                                                     {page > 1 && <PaginationItem>
                                                         <PaginationLink onClick={() => setPage((prev) => prev - 1)}>{page - 1}</PaginationLink>
                                                     </PaginationItem>}
                                 
                                 
                                                     <PaginationItem>
                                                         <PaginationLink href="#" className="font-bold bg-blue-200  rounded-md">{page}</PaginationLink>
                                                     </PaginationItem>
                                                     <PaginationItem>
                                                         <PaginationLink onClick={() => setPage((prev) => prev + 1)}>{page + 1}</PaginationLink>
                                                     </PaginationItem>
                                                     <PaginationItem>
                                                         <PaginationLink onClick={() => setPage((prev) => prev + 2)}>{page + 2}</PaginationLink>
                                                     </PaginationItem>
                                                     <PaginationItem>
                                                         <PaginationEllipsis />
                                                     </PaginationItem>
                                                     <PaginationItem>
                                                         <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
                                                     </PaginationItem>
                                                 </PaginationContent>
                                             </Pagination>
            <dialog id="recevingeditapprove" className="rounded-lg p-6 shadow-xl bg-white border
                 border-green-300 text-center">
                <button id="recevingeditapproveclose" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">Modification Request has Been Approved</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="recevingeditreject" className="rounded-lg p-6 shadow-xl bg-white border
                 border-red-300 text-center">
                <button id="recevingeditrejectclose" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-red-500">Modification Request has Been Reverted</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </div>
    )
}
export default QCWaterTable;