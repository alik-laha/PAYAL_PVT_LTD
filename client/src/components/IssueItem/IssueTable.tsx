import { useContext, useEffect } from "react";
import { Input } from "../ui/input";
import React from "react";
import axios from "axios";
import { findskutypeData, IssueItemData, IssueItemDaywiseData, pendingCheckRoles, PermissionRole } from "@/type/type";
import { pagelimit, pageNo, pendingCheckRole, SelectTypeIssue } from "../common/exportData";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
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



const IssueTable = () => {
    const [unit, setUnit] = useState<string>("")
    const [section, setSection] = useState<string>("")
    const [selectType, setselectType] = useState<string>("ItemWise")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [sku,setsku]=useState<findskutypeData[]>([])
    const [grade,setGrade]=useState<findskutypeData[]>([])
    const [page, setPage] = useState(pageNo)
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<IssueItemData[]>([])
    const limit = pagelimit
    const [tablesearch, settablesearch] = useState<string>("ItemWise")
    const approvesuccessdialog = document.getElementById('rcneditapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('rcneditScscloseDialog') as HTMLInputElement;
    const { editPendiningIssueItemData } = useContext(Context);
    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;
    const [ItemWiseData, setItemWiseData] = useState<IssueItemData[]>([])
    const [DayWiseData, setDayWiseData] = useState<IssueItemDaywiseData[]>([])
    //const [transformedData, setTransformedData] = useState<ExcelRcnPrimaryEntryData[]>([]);

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
        setEditData([])
        //setEditPendingBoilingData([])
        setblockpagen('flex')
        handleSearch()
    }, [page])

    useEffect(() => {
        if (editPendiningIssueItemData.length>0) {
            //console.log(editPendingData)
            setEditData(editPendiningIssueItemData)
            setblockpagen('none')
        }
    }, [editPendiningIssueItemData])

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
    return (
        <div className="ml-5 mt-5 ">
            <div className="flex flexbox-search" >

                <Input className="no-padding w-1/7 flexbox-search-width" placeholder=" Issue No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />
                <select className='flexbox-search-width flex h-8 w-1/6 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setUnit(e.target.value)} value={unit}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Unit (All)</option>
                    {sku.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data.sku} key={index}>
                            {data.sku}
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
                
                <select className='flexbox-search-width flex h-8 w-1/7 ml-10 qc-responsive-right responsive-no-margin items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setSection(e.target.value)} value={section}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Section (All)</option>
                    {grade.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data.sku} key={index}>
                            {data.sku}
                        </option>
                    ))}
                </select>
                <select className='flexbox-search-width no-margin-left-absolute font-semibold flex h-8 w-1/7 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => {
                        setselectType(e.target.value)

                    }} value={selectType}>

                    {SelectTypeIssue.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>


                

               

                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            {checkpending('RCNPrimary') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" ><LuDownload size={18} /></Button>  </span>}
            {tablesearch === "ItemWise" ? (
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >IssueID</TableHead>
                        
                        <TableHead className="text-center" >Date_Of_Issue</TableHead>
                    
                        <TableHead className="text-center" >Issue_Unit</TableHead>
                        <TableHead className="text-center" >Issue_Section</TableHead>
                        <TableHead className="text-center" >Category</TableHead>
                        <TableHead className="text-center" >Issue_Material_Name</TableHead>
                        <TableHead className="text-center" >Issue_Quantity</TableHead>
                        <TableHead className="text-center" >Unit</TableHead>
                        <TableHead className="text-center" >Unit_Price</TableHead>
                        <TableHead className="text-center" >Total_Price</TableHead>
                        
                        <TableHead className="text-center" >Issued_To_User</TableHead>
                        <TableHead className="text-center" >Damage_Return </TableHead>
                        <TableHead className="text-center" >Damage_Quantity</TableHead>
                        <TableHead className="text-center" >damage_Unit</TableHead>
                        <TableHead className="text-center" >Remarks</TableHead>
                        <TableHead className="text-center" >EditStatus</TableHead>
                        <TableHead className="text-center" >Created_By</TableHead>
                        <TableHead className="text-center" >Modified_By</TableHead>
                      
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>
                    <TableBody>
                        {EditData.length > 0 ? (
                            EditData.map((item: IssueItemData, idx) => {

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-orange-600">{item.issueID}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                       
                                        <TableCell className="text-center ">{item.sectionunit}</TableCell>
                                        <TableCell className="text-center ">{item.section}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-500">{item.category}</TableCell>
                                        <TableCell className="text-center ">{item.materialName}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.quantity))} </TableCell>
                                        <TableCell className="text-center ">{item.itemunit}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.unitPrice))} </TableCell>

                                        <TableCell className="text-center">{formatNumber(parseFloat(item.totalPrice))} </TableCell>
                                
                                        <TableCell className="text-center ">{item.issueUser}</TableCell>
                                        <TableCell className="text-center ">{item.damagereturn}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.damagequantity))} </TableCell>
                                        <TableCell className="text-center ">{item.damageunit}</TableCell>
                                        <TableCell className="text-center ">{item.remarks}</TableCell>
                                        
                                        <TableCell className="text-center ">{item.editStatus}</TableCell>
                                        <TableCell className="text-center ">{item.CreatedBy}</TableCell>
                                        <TableCell className="text-center ">{item.modifiedBy}</TableCell>
                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className='p-2 text-white rounded bg-cyan-500' >Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <Dialog>
                                                        <DialogTrigger className="flex"><CiEdit size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Approve/Revert</button>
                                                        </DialogTrigger>
                                                        <DialogContent className='max-w-3xl'>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center '>Issue Approve/Revert</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            {/* <RCNLineCreateApproveForm scoop={scoopeditdata} /> */}
                                                            {/* <RcnPrimaryModify data={item} /> */}
                                                        </DialogContent>
                                                    </Dialog>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            console.log(ItemWiseData),
                            ItemWiseData.length > 0 ? (ItemWiseData.map((item: IssueItemData, idx) => {

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-orange-600">{item.issueID}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                      
                                        <TableCell className="text-center ">{item.sectionunit}</TableCell>
                                        <TableCell className="text-center ">{item.section}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-500">{item.category}</TableCell>
                                        <TableCell className="text-center ">{item.materialName}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.quantity))} </TableCell>
                                        <TableCell className="text-center ">{item.itemunit}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.unitPrice))} </TableCell>

                                        <TableCell className="text-center">{formatNumber(parseFloat(item.totalPrice))} </TableCell>
                                        
                                        <TableCell className="text-center ">{item.issueUser}</TableCell>
                                        <TableCell className="text-center ">{item.damagereturn}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.damagequantity))} </TableCell>
                                        <TableCell className="text-center ">{item.damageunit}</TableCell>
                                        <TableCell className="text-center ">{item.remarks}</TableCell>
                                        
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
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >View</button>
                                                        </DialogTrigger>
                                                        <DialogContent className='max-w-3xl'>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-5'>Line Wise Scooping Modify</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            {/* <RCNLineCreateEditForm scoop={scoopdata} /> */}
                                                            {/* <RcnPrimaryModify data={item} /> */}
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
                </Table>) : (<IssueDayWiseTable DayWise={DayWiseData} page={page} />)
            }

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
        </div>
    )
}
export default IssueTable;