
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
    function formatNumber(num: any) {
    const value = Number(num); // convert string → number
    return Number.isInteger(value) ? value : value.toFixed(2);
}



    if (loading) {
        return <div className="dashboard-container">Loading...</div>;
    }



    return (
        <>
            

                    {data && (<>
                     {/* Users Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className=" bg-red-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🧑‍💻</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Total Users
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.usercount}
            </span>
          </div>

          <div className="bg-yellow-500 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">👥</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Total Employee
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.employeecount}
            </span>
          </div>

          <div className="bg-blue-500 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🚒</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Pending GatePass
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.pendingGatepass}
            </span>
          </div>

            <div className="bg-green-600 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🥔</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Total RCN Receiving
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.fyReceivingTotal.Total_Receiving ? formatNumber(Number(data.fyReceivingTotal.Total_Receiving)/1000):0} Ton
            </span>
          </div>

          <div className="bg-purple-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🫖</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Total Boiling
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.currentYearBoiling? formatNumber(Number(data.currentYearBoiling)/1000):0} Ton
            </span>
          </div>

          <div className="bg-gray-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">💹</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Avg Borma Loss
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.fyResultBorma.total ?formatNumber(data.fyResultBorma.total) :0} %
            </span>
          </div>
          <div className="bg-orange-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">💦</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Avg Moisture Gain
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.fyResultHumid.total ?formatNumber(data.fyResultHumid.total):0} %
            </span>
          </div>
          
          <div className="bg-cyan-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🏠</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Village In
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.Ville_Inside_gatepass.Village_In ? formatNumber(Number(data.Ville_Inside_gatepass.Village_In)/1000):0} Ton
            </span>
          </div>
          <div className="bg-stone-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🏛️</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Village Out (GatePass)
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.village_out_gate ? formatNumber(Number(data.village_out_gate)/1000):0} Ton
            </span>
          </div>
           <div className="bg-pink-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🏫</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Village Out (Prod)
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.village_out_prod ? formatNumber(Number(data.village_out_prod)/1000):0} Ton
            </span>
          </div>
           <div className="bg-emerald-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🧆</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Pending Village (Floor) 
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.village_pending ? formatNumber(Number(data.village_pending)/1000):0} Ton
            </span>
          </div>
           <div className="bg-blue-400 rounded-xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 transform cursor-default">
            <div className="text-3xl mb-3">🧆</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Pending Village (Outside) 
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.village_pending_in ? formatNumber(Number(data.village_pending_in)/1000):0} Ton
            </span>
          </div>
        

          </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                            <StatCard title="Pending" value={'Gatepass'} color={'orange'} />
                            <StatCard
                                title="Previous Day"
                                value={`${data.previousGate}`}
                                subtitle={
                                    data.previousGateDate
                                        ? `Date: ${data.previousGateDate.slice(0, 10)}`
                                        : "No data"
                                }
                            />
                            <StatCard title="Current Week" value={`${data.weekResultGate}`} />
                            <StatCard title="Current Month" value={`${data.monthResultGate}`} />

                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("gatepass", from, to)}
                            />

                            <StatCard title="Custom Date Range" value={`${data.customGate}`} />
                        </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                            <StatCard title="Quantity (Bag)" value={'Boiling'} color={'green'} />
                            <StatCard
                                title="Previous Day"
                                value={`${formatNumber(Number(data.previousBoiling)/80)} `}
                                subtitle={
                                    data.previousBoilingDate
                                        ? `Date: ${data.previousBoilingDate.slice(0, 10)}`
                                        : "No data"
                                }
                            />
                            <StatCard title="Current Week" value={`${formatNumber(Number(data.currentWeekBoil)/80)} `} />
                            <StatCard title="Current Month" value={`${formatNumber(Number(data.currentMonthBoiling)/80)} `} />

                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("boiling", from, to)}
                            />

                            <StatCard title="Custom Date Range" value={`${Number(data.customBoiling)/1000} `} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                            <StatCard title="Loss %" value={'Borma'} color={'blue'} />
                            <StatCard
                                title="Previous Day"
                                value={` ${formatNumber(data.previousBorma)} %`}
                                subtitle={
                                    data.previousBormaDate
                                        ? `Date: ${data.previousBormaDate.slice(0, 10)}`
                                        : "No data"
                                } 
                            />
                            <StatCard title="Current Week" value={` ${formatNumber(data.currentWeekBorma)} %`} />
                            <StatCard title="Current Month" value={` ${formatNumber(data.currentMonthBorma)} %`} />

                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("borma", from, to)}
                            />

                            <StatCard title="Custom Date Range" value={`${formatNumber(data.customBorma)} %`} />
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                            <StatCard title="Moisture Gain %" value={'Humidifier'} color={'red'} />
                            <StatCard
                                title="Previous Day"
                                value={` ${formatNumber(data.previousHumid)} %`}
                                subtitle={
                                    data.previousHumidDate
                                        ? `Date: ${data.previousHumidDate.slice(0, 10)}`
                                        : "No data"
                                } 
                            />
                            <StatCard title="Current Week" value={`${formatNumber(data.currentWeekHumid)} %`} />
                            <StatCard title="Current Month" value={` ${formatNumber(data.currentMonthHumid)} %`} />

                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("humid", from, to)}
                            />

                            <StatCard title="Custom Date Range" value={`${formatNumber(data.customHumid)} %`} />
                        </div>
                    </>
                      
                    )}



           

        </>
    )
}

export default DirectorDashboard;