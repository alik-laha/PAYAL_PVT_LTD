import { NavLink } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { FY_Array, Origin } from "../common/exportData";
import { Input } from "../ui/input";

import { FaSearch } from "react-icons/fa";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";



const FactoryManager: React.FC = () => {



    const [fy, setFy] = useState<string>("2025-26")
    const [data, setData] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fromdate, setfromDate] = useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [todate, settoDate] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');


    useEffect(() => {
        const fetchPanelData = async () => {
            try {

                axios.put('/api/dashboard/factory-manager', {
                    LotNo: blConNo,
                    fromDate: fromdate,
                    toDate: todate,
                    fy: fy,
                    origin:origin,
                    type: 'non-search'
                }).then(res => {
                    console.log(res)
                    const result = res.data.mergedData;
                    setData(result);
                })




            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPanelData();
    }, []);

    const handleSearch = async () => {
        const res = await axios.put('/api/dashboard/factory-manager', {
            LotNo: blConNo,
            fromDate: fromdate,
            toDate: todate,
            fy: fy,origin:origin,
            type: 'search'
        })

        const data = await res.data.mergedData
        setData(data);

    }

    if (loading) {
        return <div className="dashboard-container">Loading...</div>;
    }


    const entries = Object.entries(data); // Convert object to array of [key, value] pairs
    return (
        <>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container' style={{ backgroundColor: 'white' }} >
                <div className="dashboard-container" style={{ backgroundColor: 'ghostwhite' }}>


                    <div className='text-2xl text-red-600 text-center bg-yellow-200 py-5 shadow-md '>Factory Manager Dashboard

                        <NavLink to="/dashboard/dashboard1/" >
                            <Button className="mr-6  right bg-orange-500 float-right h-8">Back</Button>

                        </NavLink>
                    </div>

                    <div>

                        <div className="flex flexbox-search mt-5">
                            <label className="font-semibold mt-1 ml-8 mr-5 pt-1 responsive-no-margin ">Lot No </label>
                            <Input className="no-padding w-1/6 h-10 " placeholder=" Lot No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />
                            <label className="font-semibold mt-2 ml-8 mr-5 ">Origin </label>
                            <select className=' w-40 flex h-10 ml-2 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-lg 
                                        ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                onChange={(e) => setOrigin(e.target.value)} value={origin}>
<option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>None</option>
                                {Origin.map((data, index) => (
                                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                            
                            


                            <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left pt-1">From </label>
                            <Input className="w-1/7 flexbox-search-width-calender h-10 "
                                type="date"
                                value={fromdate}
                                onChange={(e) => setfromDate(e.target.value)}
                                placeholder="From Date"

                            />
                            <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right pt-1">To </label>
                            <Input className="w-1/7 flexbox-search-width-calender h-10 "
                                type="date"
                                value={todate}
                                onChange={(e) => settoDate(e.target.value)}
                                placeholder="To Date"

                            />
                            <label className="font-semibold mt-2 ml-8 mr-5 responsive-no-margin ">F.Y. </label>
                            <select className=' w-40 flex h-10 ml-2 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-lg 
                                        ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                onChange={(e) => setFy(e.target.value)} value={fy}>

                                {FY_Array.map((data, index) => (
                                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                            <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-10" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>
                            <span className="">

                            </span>
                        </div>




                    </div>


                    <div className="mt-5 p-4" >
                        <Table className="mt-4 text-md border border-gray-500">
                            <TableBody>
                                {entries.map(([key, value], index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <TableRow key={index} className="border border-gray-500">
                                                <TableCell className="px-2 py-2 font-semibold bg-gray-200 italic border border-gray-500">{index+1}.  {key}</TableCell>
                                                <TableCell className="px-2 py-2 font-semibold bg-gray-100 text-blue-700 border border-gray-500">{value}</TableCell>

                                                {entries[index + 1] ? (
                                                    <>
                                                        <TableCell className="px-2 py-2 font-semibold italic bg-gray-200 border border-gray-500">
                                                            {index+2}.  {entries[index + 1][0]}
                                                        </TableCell>
                                                        <TableCell className="px-2 py-2 font-semibold text-blue-700 bg-gray-100 border border-gray-500">
                                                            {entries[index + 1][1]}
                                                        </TableCell>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TableCell className="border border-gray-500"></TableCell>
                                                        <TableCell className="border border-gray-500"></TableCell>
                                                    </>
                                                )}
                                            </TableRow>
                                        );
                                    }
                                    return null;
                                })}
                            </TableBody>
                        </Table>
                    </div>


                </div>
            </div>

        </>
    )
}

export default FactoryManager;