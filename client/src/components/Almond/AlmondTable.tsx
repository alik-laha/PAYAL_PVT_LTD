import axios from "axios";
import { pagelimit, pageNo, pendingCheckRole, SelectGatePassType } from "../common/exportData";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { findskutypeData, pendingCheckRoles, PermissionRole } from "@/type/type";
import { format, toZonedTime } from 'date-fns-tz'
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";




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

        const response = await axios.put('/api/vendorSKU/VendorSKUSearch', {
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
    <> <div className="ml-5 mt-5 ">
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
    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>In/Out (All)</option>
    {SelectGatePassType.map((data, index) => (
        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
            {data}
        </option>
    ))}
</select>


<span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

</div>
    </div>
              
    
    
    </>
)

}

export default AlmondTable