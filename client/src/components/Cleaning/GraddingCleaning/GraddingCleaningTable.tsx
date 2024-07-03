import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import React, { useEffect } from "react";
import axios from "axios";
import { AssetData } from "@/type/type";


const GraddingMaintenanceTable = () => {
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [allMachine, setAllMachine] = React.useState<AssetData[]>([]);
    const [mc_name, setMc_name] = React.useState<string>('');

    const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.value;
        if (!selected) {
            settoDate('')
            sethidetoDate('')
            return
        }
        const date = new Date(selected)
        date.setDate(date.getDate() + 1);
        const nextday = date.toISOString().split('T')[0];
        sethidetoDate(selected)
        settoDate(nextday)
    }

    const handleSearch = () => {
        console.log(fromdate, todate)
    }
    useEffect(() => {
        axios.get('/api/asset/getallActiveMachine')
            .then((res) => {
                console.log(res)
                setAllMachine(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])
    return (
        <div className="ml-5 mt-5 ">
            <div className="flex flexbox-search">
                <select className='flexbox-search-width flex h-8 w-1/5 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setMc_name(e.target.value)} value={mc_name}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Origin (All)</option>
                    {allMachine.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data.machineName} key={index}>
                            {data.machineName}
                        </option>
                    ))}
                </select>

                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={fromdate}
                    onChange={(e) => setfromDate(e.target.value)}
                    placeholder="From Date"

                />
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={hidetodate}
                    onChange={handleTodate}
                    placeholder="To Date"

                />


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
        </div>
    )
}
export default GraddingMaintenanceTable