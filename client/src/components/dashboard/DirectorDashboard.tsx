
import axios from "axios";
import { useEffect, useState } from "react";



import { StatCard } from "../common/StatCard";
import { DateRangeForm } from "../common/DateRangeForm";
import { StatCardBig } from "../common/StatCardBig";



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

    const tileBase =
  "relative rounded-2xl p-6 flex flex-col items-center text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-lg border border-white/20 overflow-hidden";


    return (
        <>
            

                    {data && (<>
                     {/* Users Card */}
                    
           


      



        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className={`${tileBase} bg-gradient-to-br from-rose-500 via-red-500 to-red-600 shadow-red-500/30 shadow-lg`}>
            <div className="text-3xl mb-3">🧑‍💻</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Total Users
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.usercount}
            </span>
          </div>

         <div className={`${tileBase} bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 shadow-yellow-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">👥</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Total Employee
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.employeecount}
            </span>
          </div>

        <div className={`${tileBase} bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-blue-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">🚒</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Pending GatePass
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.pendingGatepass}
            </span>
          </div>

          <div className={`${tileBase} bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 shadow-green-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">🥔</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Total RCN Receiving
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.fyReceivingTotal.Total_Receiving ? formatNumber(Number(data.fyReceivingTotal.Total_Receiving)/1000):0} Ton
            </span>
          </div>

         <div className={`${tileBase} bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-purple-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">🫖</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Total Boiling
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.currentYearBoiling? formatNumber(Number(data.currentYearBoiling)/1000):0} Ton
            </span>
          </div>
           <div className={`${tileBase} bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-500 shadow-cyan-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">💦</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Avg Moisture Gain
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.fyResultHumid.total ?formatNumber(data.fyResultHumid.total):0} %
            </span>
          </div>

        <div className={`${tileBase} bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700 shadow-gray-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">💹</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
              Avg Borma Loss
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.fyResultBorma.total ?formatNumber(data.fyResultBorma.total) :0} %
            </span>
          </div>
      
          
         <div className={`${tileBase} bg-gradient-to-br from-indigo-400 via-blue-500 to-indigo-600 shadow-indigo-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">🏠</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Village In
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.Ville_Inside_gatepass.Village_In ? formatNumber(Number(data.Ville_Inside_gatepass.Village_In)/1000):0} Ton
            </span>
          </div>
      <div className={`${tileBase} bg-gradient-to-br from-stone-400 via-neutral-500 to-stone-600 shadow-stone-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">🏛️</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Village Out (GatePass)
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.village_out_gate ? formatNumber(Number(data.village_out_gate)/1000):0} Ton
            </span>
          </div>
           <div className={`${tileBase} bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 shadow-pink-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">🏫</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Village Out (Prod)
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.village_out_prod ? formatNumber(Number(data.village_out_prod)/1000):0} Ton
            </span>
          </div>
        <div className={`${tileBase} bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600 shadow-emerald-500/30 shadow-lg`}>

            <div className="text-3xl mb-3">🧆</div>
            <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
             Pending Village (Floor) 
            </h2>
            <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
              {data.village_pending ? formatNumber(Number(data.village_pending)/1000):0} Ton
            </span>
          </div>
           <div className={`${tileBase} bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 shadow-blue-500/30 shadow-lg`}>

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
                            <StatCard title="GatePass" value={'Pending'} color={'orange'} />
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
                            <StatCard title="Boiling" value={'Bag'} color={'green'} />
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
                            <StatCard title="Borma" value={'Loss'} color={'blue'} />
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
                            <StatCard title="Humidifier" value={'Gain'} color={'red'} />
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                            <StatCardBig title="Peeling" value1={'Broken %'} 
                            value2={'Unpeel %'} 
                            value3={'Chura %'} 
                            color={'gray'} />
                            <StatCardBig
                                title="Previous Day"
                                // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
                                value2={` ${formatNumber(data.previousBroken)} %`}
                                 value3={` ${formatNumber(data.previousUnpeel)} %`}
                                  value4={` ${formatNumber(data.previousChura)} %`}
                                  
                                    //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}

                                subtitle={
                                    data.previousPeelDate
                                        ? `Date: ${data.previousPeelDate.slice(0, 10)}`
                                        : "No data"
                                }
                            />
                            <StatCardBig
                                title="Current Week"
                                // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
                                value2={`${formatNumber(data.currentWeekBroken)} %`}
                                 value3={` ${formatNumber(data.currentWeekUnpeel)} %`}
                                  value4={` ${formatNumber(data.currentWeekChura)} %`}
                                  
                                    //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}

                       
                            />
                             <StatCardBig
                                title="Current Month"
                                // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
                                value2={`${formatNumber(data.currentMonthBroken)} %`}
                                 value3={` ${formatNumber(data.monthlyUncutAvg)} %`}
                                  value4={` ${formatNumber(data.monthlyNoncutAvg)} %`}
                                   
                                    //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}

                       
                            />
                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("peeling", from, to)}
                            />

                             <StatCardBig
                                title="Custom Date Range"
                                // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
                                value2={`${formatNumber(data.customBroken)} %`}
                                 value3={` ${formatNumber(data.customUnpeel)} %`}
                                  value4={` ${formatNumber(data.customChura)} %`}
                                   
                                    //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}

                       
                            />
                            

                            
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                            <StatCardBig title="Scooping" value1={'Broken'} 
                            value2={'Uncut'} 
                            value3={'NonCut'} 
                            value4={'Unscoop'} 
                            
                            value5={'Dust'} value6={'KOR'} color={'purple'} />
                            <StatCardBig
                                title="Previous Day"
                                // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
                                value2={` ${formatNumber(data.previousbrokenprcntg)} %`}
                                 value3={` ${formatNumber(data.previousuncutprcntg)} %`}
                                  value4={` ${formatNumber(data.previousnoncutprcntg)} %`}
                                   value5={` ${formatNumber(data.previousunscoopprcntg)} %`}
                                    value6={` ${formatNumber(data.previousdustprcntg)} %`}
                                    value7={` ${formatNumber(data.previouskor)}`}
                                    //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}

                                subtitle={
                                    data.previousscoopDate
                                        ? `Date: ${data.previousscoopDate.slice(0, 10)}`
                                        : "No data"
                                }
                            />
                            <StatCardBig
                                title="Current Week"
                                // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
                                value2={`${formatNumber(data.weeklyBrokenAvg)} %`}
                                 value3={` ${formatNumber(data.weeklyUncutAvg)} %`}
                                  value4={` ${formatNumber(data.weeklyNoncutAvg)} %`}
                                   value5={` ${formatNumber(data.weeklyUnscoopAvg)} %`}
                                    value6={` ${formatNumber(data.weeklyDustAvg)} %`}
                                    value7={` ${formatNumber(data.weeklyKORAvg)} `}
                                    //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}

                       
                            />
                             <StatCardBig
                                title="Current Month"
                                // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
                                value2={`${formatNumber(data.monthlyBrokenAvg)} %`}
                                 value3={` ${formatNumber(data.monthlyUncutAvg)} %`}
                                  value4={` ${formatNumber(data.monthlyNoncutAvg)} %`}
                                   value5={` ${formatNumber(data.monthlyUnscoopAvg)} %`}
                                    value6={` ${formatNumber(data.monthlyDustAvg)} %`}
                                    value7={` ${formatNumber(data.monthlyKORAvg)} `}
                                    //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}

                       
                            />
                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("scoop", from, to)}
                            />

                             <StatCardBig
                                title="Custom Date Range"
                                // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
                                value2={`${formatNumber(data.customBrokenAvg)} %`}
                                 value3={` ${formatNumber(data.customUncutAvg)} %`}
                                  value4={` ${formatNumber(data.customNoncutAvg)} %`}
                                   value5={` ${formatNumber(data.customUnscoopAvg)} %`}
                                    value6={` ${formatNumber(data.customDustAvg)} %`}
                                    value7={` ${formatNumber(data.customKORAvg)}`}
                                    //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}

                       
                            />
                            

                            
                        </div>
                    </>
                      
                    )}



           

        </>
    )
}

export default DirectorDashboard;