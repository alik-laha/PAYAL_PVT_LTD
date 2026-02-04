import { NavLink } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Button } from "../ui/button";
import axios from "axios";
import { useEffect, useState } from "react";



import { StatCard } from "../common/StatCard";
import { DateRangeForm } from "../common/DateRangeForm";



const DirectorDashboard: React.FC = () => {




    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchPanelData = async () => {
            try {

                axios.put('/api/dashboard/director', {
                    type: 'non-search'
                }).then(res => {
                    console.log(res)
                    const result = res.data.data;
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


    // const formatString = (input: string) => {
    //     return input.replace(/_/g, " ");
    // };

    const handleSearch = async (type: any,
        fromDate?: string,
        toDate?: string) => {

        setLoading(true);
        try {
            axios.put('/api/dashboard/director', {
                type, fromDate, toDate
            }).then(res => {
                console.log(res)
                const result = res.data.data;
                setData(result);
            })
        }
        catch (error) {
            console.error('Failed to fetch dashboard data', error);
        } finally {
            setLoading(false);
        }



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


                    <div className='text-2xl font-semibold text-gray-800 text-center py-5 shadow-md bg-yellow-50'>Director Dashboard

                        <NavLink to="/dashboard/dashboard1/" >
                            <Button className="mr-6  right bg-orange-500 float-right h-8">Back</Button>

                        </NavLink>
                    </div>



                    {data && (<>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mt-5">
                            <StatCard title="Section" value={'Boiling'} color={'green'} />
                            <StatCard
                                title="Previous Day"
                                value={`${data.previousBoiling} Kg`}
                                subtitle={
                                    data.previousBoilingDate
                                        ? `Date: ${data.previousBoilingDate.slice(0, 10)}`
                                        : "No data"
                                }
                            />
                            <StatCard title="Current Month" value={`${data.currentMonthBoiling} Kg`} />
                            <StatCard title="Current Year" value={`${data.currentYearBoiling} Kg`} />

                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("boiling", from, to)}
                            />

                            <StatCard title="Custom Date Range" value={`${data.customBoiling} Kg`} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mt-5">
                            <StatCard title="Section" value={'Borma'} color={'blue'} />
                            <StatCard
                                title="Previous Day"
                                value={`Loss: ${data.previousBorma} %`}
                                subtitle={
                                    data.previousBormaDate
                                        ? `Date: ${data.previousBormaDate.slice(0, 10)}`
                                        : "No data"
                                } 
                            />
                            <StatCard title="Current Week" value={`Loss: ${data.currentWeekBorma} %`} />
                            <StatCard title="Current Month" value={`Loss: ${data.currentMonthBorma} %`} />

                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("borma", from, to)}
                            />

                            <StatCard title="Custom Date Range" value={`${data.customBorma} %`} />
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mt-5">
                            <StatCard title="Section" value={'Humidifier'} color={'red'} />
                            <StatCard
                                title="Previous Day"
                                value={`Gain: ${data.previousHumid} %`}
                                subtitle={
                                    data.previousHumidDate
                                        ? `Date: ${data.previousHumidDate.slice(0, 10)}`
                                        : "No data"
                                } 
                            />
                            <StatCard title="Current Week" value={`Gain: ${data.currentWeekHumid} %`} />
                            <StatCard title="Current Month" value={`Gain: ${data.currentMonthHumid} %`} />

                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("humid", from, to)}
                            />

                            <StatCard title="Custom Date Range" value={`${data.customHumid} %`} />
                        </div>
                    </>
                      
                    )}



                </div>
            </div>

        </>
    )
}

export default DirectorDashboard;