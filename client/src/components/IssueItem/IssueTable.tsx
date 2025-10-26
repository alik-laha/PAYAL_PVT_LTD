import { useContext, useEffect } from "react";
import { Input } from "../ui/input";
import React from "react";
import axios from "axios";
import {  findskutypeData, IssueItemData, IssueItemDaywiseData } from "@/type/type";
import { pagelimit, pageNo, SelectTypeIssue } from "../common/exportData";
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
import IssueDayWiseTable from "./IssueDayWiseTable";
import IssueModify from "./IssueModify";
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


const IssueTable = (props:any) => {
    const [unit, setUnit] = useState<string>("")
    const [section, setSection] = useState<string>("")
    const [subsection, setSubSection] = useState<string>("")
    const [selectType, setselectType] = useState<string>("ItemWise")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    //const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [sku,setsku]=useState<findskutypeData[]>([])
    const [grade,setGrade]=useState<findskutypeData[]>([])
    const [subgrade,setsubGrade]=useState<findskutypeData[]>([])
    const [page, setPage] = useState(pageNo)
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<IssueItemData[]>([])
    const limit = pagelimit
    const [tablesearch, settablesearch] = useState<string>("ItemWise")
  
    const { editPendiningIssueItemData } = useContext(Context);

    const [ItemWiseData, setItemWiseData] = useState<IssueItemData[]>([])
    const [DayWiseData, setDayWiseData] = useState<IssueItemDaywiseData[]>([])
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
        axios.put('/api/vendorSKU/getItembySection/Issue Unit',{section:'Issue'})
            .then(res => {
                //console.log(res.data)
                setsku(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Issue Section',{section:'Issue'})
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Issue SubSection',{section:'Issue'})
            .then(res => {
                //console.log(res.data)
                setsubGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

    useEffect(() => {
        setEditData([])
        //setEditPendingBoilingData([])
        setblockpagen('flex')
        handleSearch()
    }, [page])

    useEffect(() => {
        if (editPendiningIssueItemData.length>0) {
            //console.log(editPendingData)
            setEditData(editPendiningIssueItemData)
            if(props.props==='edit'){ setblockpagen('none')}  
        }
    }, [editPendiningIssueItemData, props.props])

    const handleSearch = async () => {
        //console.log('search button pressed')
        //setEditPendingBoilingData([])
        setEditData([])
        //setSearchType(selectType)
        settablesearch(selectType)
        const response = await axios.post('/api/issue/searchItemIssue', {
            isssueId: blConNo,
            unit: unit,
            section: section,
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
        //console.log(data)
        if (data.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
        if (selectType === 'ItemWise') {
            setItemWiseData(data)
        }
        else {
            // setData(data)
            setDayWiseData(data)
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
       
        const response = await axios.post('/api/issue/searchItemIssue', {
            isssueId: blConNo,
            unit: unit,
            section: section,
            fromDate: fromdate,
            toDate: todate,
            type: selectType

        })
        const data = await response.data
        let ws
        let transformed: any[] = [];
        if (editPendiningIssueItemData.length>0 ) {
            console.log('Hi')
            transformed = editPendiningIssueItemData.map((item: IssueItemData,idx:number) => ({
                Sl_No: idx+1,
                IssueID:item.issueID,
                Issue_Date:handletimezone(item.date),
                Section_Unit: item.sectionunit,
                Section:item.section,
                Subsection:item.subsection,
                Category:item.category,
                Material_Name:item.materialName,
                Unit:item.itemunit,
                Qty: Number(item.quantity) || 0,
                Unit_Price:  Number(item.unitPrice) || 0,
                Total_Price: Number(item.totalPrice) || 0,
              Issued_To:item.issueUser,
              Damage_Status:item.damagereturn,
              Damage_Qty:formatNumber(parseFloat(item.damagequantity)),
              DamageUnit:item.damageunit,
                Remarks:item.remarks,
                Edit_Status: item.editStatus,
                Created_By: item.CreatedBy,
                Approved_Or_Rejected_By: item.modifiedBy
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        if(DayWiseData.length>0){
            transformed = DayWiseData.map((item: IssueItemDaywiseData,idx:number) => ({
                Sl_No: idx+1,
                Issue_Date:handletimezone(item.date),
                
                Section_Unit: item.sectionunit,
                Category:item.category,
           
                Total_Price:Number(item.totalIssuePrice) || 0,
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data.map((item: IssueItemData,idx:number) => ({
                
                Sl_No: idx+1,
                IssueID:item.issueID,
                Issue_Date:handletimezone(item.date),
                Section_Unit: item.sectionunit,
                Section:item.section,
                SubSection:item.subsection,
                Category:item.category,
                Material_Name:item.materialName,
                Unit:item.itemunit,
                 Qty: Number(item.quantity) || 0,
                Unit_Price:  Number(item.unitPrice) || 0,
                Total_Price: Number(item.totalPrice) || 0,
              Issued_To:item.issueUser,
              Damage_Status:item.damagereturn,
              Damage_Qty:formatNumber(parseFloat(item.damagequantity)),
              DamageUnit:item.damageunit,
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
        saveAs(blob, 'Store_Item_Issue_' + currDate + '.xlsx');
    }
    //const Role = localStorage.getItem('role') as keyof PermissionRole
    // const checkpending = (tab: string) => {
    //     //console.log(Role)
    //     if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
    //         return true
    //     }
    //     else {
    //         return false;
    //     }

    // }
    const handleApprove = (item: number) => {
        console.log(item)
        axios.get(`/api/issue/acceptEditIssuePrimary/${item}`)
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
        axios.get(`/api/issue/rejectEditIssuePrimary/${item}`)
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
    return (
        <div className="mx-2 mt-5 ">
           

             {props.props==='edit' ?'':<div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">

                    {/* Issue No */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Issue No.
                        </label>
                        <Input
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                            placeholder="Search"
                            value={blConNo}
                            onChange={(e) => setBlConNo(e.target.value)}
                        />
                    </div>

                

                    {/* From Date */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            From Date
                        </label>
                        <Input
                            type="date"
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                            value={fromdate}
                            onChange={(e) => setfromDate(e.target.value)}
                        />
                    </div>

                    {/* To Date */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            To Date
                        </label>
                        <Input
                            type="date"
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                            value={todate}
                            onChange={(e) => settoDate(e.target.value)}
                        />
                    </div>

                        {/* Unit */}
                    <div className="relative">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Unit
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setUnit(e.target.value)}
                                value={unit}
                            >
                                <option value="">Unit (All)</option>
                                {sku.map((data, index) => (
                                    <option key={index} value={data.sku}>{data.sku}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Section */}
                    <div className="relative">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Section
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setSection(e.target.value)}
                                value={section}
                            >
                                <option value="">Section (All)</option>
                                {grade.map((data, index) => (
                                    <option key={index} value={data.sku}>{data.sku}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Sub Section */}
                    <div className="relative">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Sub Section
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setSubSection(e.target.value)}
                                value={subsection}
                            >
                                <option value="">Sub Section (All)</option>
                                {subgrade.map((data, index) => (
                                    <option key={index} value={data.sku}>{data.sku}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Type */}
                    <div className="relative">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Type
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setselectType(e.target.value)}
                                value={selectType}
                            >
                                {SelectTypeIssue.map((data, index) => (
                                    <option key={index} value={data}>{data}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Buttons */}
                <div className="flex col-span-full justify-end gap-3 mt-2 md:mt-0">
                        <Button
                            className="flex w-40 items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                            onClick={handleSearch}
                        >
                            <FaSearch size={14} />
                            Search
                        </Button>

                        <Button
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                            onClick={exportToExcel}
                        >
                            <LuDownload size={16} />
                            
                        </Button>
                    </div>
                    
                </div>
            </div>}

           {props.props==='edit' &&(
                <Button
                  className="flex justify-end items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                  onClick={exportToExcel}
                >
                  <LuDownload size={16} />
                </Button>
              )}
            
            {tablesearch === "ItemWise" ? (
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Id</TableHead>
                          {props.props==='edit' && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Action</TableHead>}
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >IssueID</TableHead>
                        
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Date_Of_Issue</TableHead>
                    
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Issue_Unit</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Issue_Section</TableHead>
                        
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Issue_Subsection</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Category</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Issue_Material_Name</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Issue_Quantity</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Unit</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Unit_Price</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Total_Price</TableHead>
                        
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Issued_To_User</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Damage_Return </TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Damage_Quantity</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Damage_Unit</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Issue_Item_Remarks</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Edit_Status</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Created_By</TableHead>
                       {props.props==='non-edit' && <TableHead className="text-center" >Actioned_By</TableHead>}
                      
                         {props.props==='non-edit' && <TableHead className="text-center">Action</TableHead>}
                    </TableHeader>
                    <TableBody>
                        {(EditData.length > 0 && props.props==='edit')? (
                            
                            EditData.map((item: IssueItemData, idx) => {

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
                                        <TableCell className="text-center font-semibold text-orange-600">{item.issueID}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                       
                                        <TableCell className="text-center ">{item.sectionunit}</TableCell>
                                        <TableCell className="text-left ">{item.section}</TableCell>
                                        <TableCell className="text-left ">{item.subsection}</TableCell>
                                        
                                        <TableCell className="text-left font-semibold text-cyan-500">{item.category}</TableCell>
                                        <TableCell className="text-left ">{item.materialName}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.quantity))} </TableCell>
                                        <TableCell className="text-center ">{item.itemunit}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.unitPrice))} &#8377;</TableCell>

                                        <TableCell className="text-center">{formatNumber(parseFloat(item.totalPrice))} &#8377;</TableCell>
                                
                                        <TableCell className="text-center ">{item.issueUser}</TableCell>
                                        <TableCell className="text-center ">{item.damagereturn}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.damagequantity))} </TableCell>
                                        <TableCell className="text-center ">{item.damageunit}</TableCell>
                                        <TableCell className="text-center ">{item.remarks}</TableCell>
                                        
                                        <TableCell className="text-center ">{item.editStatus}</TableCell>
                                        <TableCell className="text-center ">{item.CreatedBy}</TableCell>
                                       
                                       
                                    </TableRow>
                                );
                            })
                        ) : (
                           
                            (ItemWiseData.length > 0 && props.props==='non-edit')? (ItemWiseData.map((item: IssueItemData, idx) => {

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-orange-600">{item.issueID}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                      
                                        <TableCell className="text-left ">{item.sectionunit}</TableCell>
                                        <TableCell className="text-left ">{item.section}</TableCell>
                                        <TableCell className="text-left ">{item.subsection}</TableCell>
                                        <TableCell className="text-left font-semibold text-cyan-500">{item.category}</TableCell>
                                        <TableCell className="text-left ">{item.materialName}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.quantity))} </TableCell>
                                        <TableCell className="text-center ">{item.itemunit}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.unitPrice))} &#8377;</TableCell>

                                        <TableCell className="text-center">{formatNumber(parseFloat(item.totalPrice))} &#8377;</TableCell>
                                        
                                        <TableCell className=" text-left">{item.issueUser}</TableCell>
                                        <TableCell className="text-center ">{item.damagereturn}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.damagequantity))} </TableCell>
                                        <TableCell className="text-center ">{item.damageunit}</TableCell>
                                        <TableCell className="text-center ">{item.remarks}</TableCell>
                                        
                                        <TableCell className="text-center ">{item.editStatus}</TableCell>
                                        <TableCell className="text-center ">{item.CreatedBy}</TableCell>
                                      {props.props==='non-edit' &&  <TableCell className="text-center ">{item.modifiedBy}</TableCell>}


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
                                                                    <p className='text-lg text-gray-600 text-center my-5 tracking-wider drop-shadow-xl font-bold'>Issue Item Modify</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            {/* <RCNLineCreateEditForm scoop={scoopdata} /> */}
                                                            <IssueModify data={item} />
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
                </Table>) : (<IssueDayWiseTable DayWise={DayWiseData} page={page} />)
            }

            {props.props==='non-edit' && <Pagination style={{ display: blockpagen }} className="pt-5 ">
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
            </Pagination>}   
            <dialog id="recevingeditapprove" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                    <button id="recevingeditapproveclose" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">Modification Request has Been Approved</p></span>

                    {/* <!-- Add more elements as needed --> */}
                </dialog>

                <dialog id="recevingeditreject" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                    <button id="recevingeditrejectclose" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">Modification Request has Been Reverted</p></span>

                    {/* <!-- Add more elements as needed --> */}
                </dialog>
        </div>
    )
}
export default IssueTable;