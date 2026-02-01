import { NavLink } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { FY, FY_Array, Origin } from "../common/exportData";
import { Input } from "../ui/input";

import { FaSearch } from "react-icons/fa";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";



const DirectorDashboard: React.FC = () => {



   
    const [data, setData] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fromdate, setfromDate] = useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [todate, settoDate] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');


    useEffect(() => {
        const fetchPanelData = async () => {
            try {

                axios.put('/api/dashboard/director', {
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


    const formatString = (input: string) => {
        return input.replace(/_/g, " ");
    };

    const handleSearch = async () => {
        const res = await axios.put('/api/dashboard/factory-manager', {
           
            fromDate: fromdate,
            toDate: todate,
           
            type: 'search'
        })

        const data = await res.data.mergedData
        setData(data);

    }

    if (loading) {
        return <div className="dashboard-container">Loading...</div>;
    }


   
    return (
        <>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container' style={{ backgroundColor: 'white' }} >
                <div className="dashboard-container" style={{ backgroundColor: 'ghostwhite' }}>


                    <div className='text-2xl text-white text-center bg-rose-200 py-5 shadow-md '>Director Dashboard

                        <NavLink to="/dashboard/dashboard1/" >
                            <Button className="mr-6  right bg-orange-500 float-right h-8">Back</Button>

                        </NavLink>
                    </div>



                </div>
            </div>

        </>
    )
}

export default DirectorDashboard;