import axios from "axios";
import { pagelimit, pageNo, pendingCheckRole, SelectGatePassType } from "../common/exportData";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { EditPendingData, findskutypeData, pendingCheckRoles, PermissionRole } from "@/type/type";
import { format, toZonedTime } from 'date-fns-tz'
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const AlmondTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [selectType, setselectType] = useState<string>("IN")
     const [tablesearch, settablesearch] = useState<string>("IN")
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [gradeor, setgradeor] = useState<string>("")
    const [Data, setData] = useState<any[]>([])
    const [sku,setsku]=useState<findskutypeData[]>([])
    const [grade,setGrade]=useState<findskutypeData[]>([])

    const [EditData, setEditData] = useState<EditPendingData[]>([])
    const { editPendingAlmondData } = useContext(Context);
    const [blockpagen, setblockpagen] = useState('flex')

    const approvesuccessdialog = document.getElementById('rcneditapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('rcneditScscloseDialog') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;
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
        handleSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return 1
            }
            return prev
        })
    }, [page])

    const handleSearch = async () => {
         settablesearch(selectType)
        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/almondPrimary/almondprimarysearch', {
            searchitem: blConNo,
            gatetype:selectType,
            fromDate: fromdate,
            toDate: todate,
            almondtype:origin,
            almondgrade:gradeor

        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        if (data.rcnEntries.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
        setData(data.rcnEntries)
       

    }
    useEffect(() => {
        if (editPendingAlmondData) {
            //console.log(editPendingData)
            setEditData(editPendingAlmondData)
            setblockpagen('none')
        }
    }, [editPendingAlmondData])

    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Almond Type',{section:'Almond'})
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
        axios.put('/api/vendorSKU/getItembySection/Almond Grade',{section:'Almond'})
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
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

return(
    <> 
    <div className="ml-5 mt-5 ">
        <div className="flex flexbox-search">

<Input className="no-padding w-1/6 flexbox-search-width" placeholder=" GatePass No" value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />

<select className='flexbox-search-width flex h-8 w-1/7 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
    onChange={(e) => setOrigin(e.target.value)} value={origin}>
    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Type (All)</option>
    {sku.map((data, index) => (
        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data.sku} key={index}>
            {data.sku}
        </option>
    ))}
</select>


<label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
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
<select className='flexbox-search-width flex h-8 w-1/7 no-margin-left-absolute ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
    onChange={(e) => setgradeor(e.target.value)} value={gradeor}>
    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Grade (All)</option>
    {grade.map((data, index) => (
        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data.sku} key={index}>
            {data.sku}
        </option>
    ))}
</select>
<select className='flexbox-search-width no-margin-left-absolute flex h-8 w-1/7 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
    onChange={(e) => setselectType(e.target.value)} value={selectType}>
   
    {SelectGatePassType.map((data, index) => (
        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
            {data}
        </option>
    ))}
</select>


<span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

        </div>
        {/* {checkpending('RCNPrimary') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>} */}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">


                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >GatePass_No</TableHead>

                    <TableHead className="text-center" >GatePass_Type</TableHead>
                    <TableHead className="text-center" >Receiving/Dispatch Date</TableHead>
                    <TableHead className="text-center" >Vehicle_No</TableHead>
                
                    <TableHead className="text-center" >Gross_Weight</TableHead>
                    <TableHead className="text-center" >Invoice_No.</TableHead>
                    <TableHead className="text-center" >Invoice_Date</TableHead>
                   
                    <TableHead className="text-center" >Net_Weight</TableHead>
                    <TableHead className="text-center" >Type</TableHead>
                   {tablesearch==='OUT'?<TableHead className="text-center" >Grade</TableHead>:''} 
                    <TableHead className="text-center" >Vendor Name</TableHead>
                    <TableHead className="text-center" >Physical Bag Count</TableHead>
                    {tablesearch==='OUT'?<TableHead className="text-center" >Row Weight</TableHead>:''} 
             
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Entried By </TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                </TableHeader>

                <TableBody>


                {EditData.length > 0 ? (''):(

Data.length > 0 ? (Data.map((item: RcnPrimaryEntryData, idx) => {


    return (
        <TableRow key={item.id}>
            <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
            <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>
            <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
            <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
            <TableCell className="text-center">{item.blNo}</TableCell>
            <TableCell className="text-center">{item.conNo}</TableCell>
            <TableCell className="text-center">{item.truckNo}</TableCell>
            <TableCell className="text-center">{item.grossWt} kg</TableCell>
            <TableCell className="text-center">{item.blWeight} Kg</TableCell>
            <TableCell className="text-center">{item.netWeight ? item.netWeight : 0} Kg</TableCell>
            {Number(item.difference) < 0 ? (<TableCell className="text-center font-semibold text-red-600">{formatNumberWithSign(Number(item.difference))} Kg</TableCell>)
                : (<TableCell className="text-center font-semibold text-green-600">{formatNumberWithSign(Number(item.difference))} Kg</TableCell>)}
            <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
            <TableCell className="text-center font-semibold">{item.systemBags}</TableCell>
            <TableCell className="text-center">
                {item.rcnStatus === 'QC Approved' ? (
                    <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                ) : item.rcnStatus === 'QC Pending' ? (
                    <button className="bg-yellow-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                ) : (
                    <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                )}
            </TableCell>
            <TableCell className="text-center">{item.editStatus == 'Created' ?
                'NA' : item.editStatus}</TableCell>
            <TableCell className="text-center">{item.receivedBy}</TableCell>
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
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        <p className='text-1xl pb-1 text-center mt-5'>RCN Primary Entry Modification</p>
                                    </DialogTitle>
                                </DialogHeader>
                                <RcnPrimaryModify data={item} />
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
    <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
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
    
    
    
    
    </div>
              
    
    
    </>
)

}

export default AlmondTable