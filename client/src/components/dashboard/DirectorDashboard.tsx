
import axios from "axios";
import { useEffect, useState } from "react";



import { StatCard } from "../common/StatCard";
import { DateRangeForm } from "../common/DateRangeForm";
import { StatCardBig } from "../common/StatCardBig";
import { FY } from "../common/exportData";
import ProdAllExcel from "../common/ProdAllExcel";



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

  //   const tileBase =
  // "relative rounded-xl p-6 flex flex-col items-center text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-lg border border-white/20 overflow-hidden";


  const tileBase =
  "bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1";


    return (
        <>


        {data && (<>
          {/* Users Card */}


          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
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
                {data.fyReceivingTotal.Total_Receiving ? formatNumber(Number(data.fyReceivingTotal.Total_Receiving) / 1000) : 0} Ton
              </span>
            </div>

            <div className={`${tileBase} bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 shadow-purple-500/30 shadow-lg`}>

              <div className="text-3xl mb-3">🫖</div>
              <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
                Total Boiling
              </h2>
              <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
                {data.currentYearBoiling ? formatNumber(Number(data.currentYearBoiling) / 1000) : 0} Ton
              </span>
            </div>
            <div className={`${tileBase} bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-500 shadow-cyan-500/30 shadow-lg`}>

              <div className="text-3xl mb-3">💦</div>
              <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
                Avg Moisture Gain
              </h2>
              <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
                {data.fyResultHumid.total ? formatNumber(data.fyResultHumid.total) : 0} %
              </span>
            </div>

            <div className={`${tileBase} bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700 shadow-gray-500/30 shadow-lg`}>

              <div className="text-3xl mb-3">💹</div>
              <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
                Avg Borma Loss
              </h2>
              <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
                {data.fyResultBorma.total ? formatNumber(data.fyResultBorma.total) : 0} %
              </span>
            </div>


            <div className={`${tileBase} bg-gradient-to-br from-indigo-400 via-blue-500 to-indigo-600 shadow-indigo-500/30 shadow-lg`}>

              <div className="text-3xl mb-3">🏠</div>
              <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
                Village In (GatePass)
              </h2>
              <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
                {data.Ville_Inside_gatepass.Village_In ? formatNumber(Number(data.Ville_Inside_gatepass.Village_In) / 1000) : 0} Ton
              </span>
            </div>
            <div className={`${tileBase} bg-gradient-to-br from-stone-400 via-neutral-500 to-stone-600 shadow-stone-500/30 shadow-lg`}>

              <div className="text-3xl mb-3">🏛️</div>
              <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
                Village Out (GatePass)
              </h2>
              <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
                {data.village_out_gate ? formatNumber(Number(data.village_out_gate) / 1000) : 0} Ton
              </span>
            </div>
            <div className={`${tileBase} bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 shadow-pink-500/30 shadow-lg`}>

              <div className="text-3xl mb-3">🏫</div>
              <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-90">
                Village Out (Prod)
              </h2>
              <span className="text-2xl font-extrabold text-white mt-2 drop-shadow-lg">
                {data.village_out_prod ? formatNumber(Number(data.village_out_prod) / 1000) : 0} Ton
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
                {data.village_pending_in ? formatNumber(Number(data.village_pending_in) / 1000) : 0} Ton
              </span>
            </div>


          </div> */}
          <p className="md:text-lg md:mt-0 mt-5 mb-3 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md">CURRENT FY {FY} OVERALL REPORT</p>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-5">

            {/* Total Users */}
            <div className={`${tileBase} border-l-[6px] border-l-red-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total Users
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.usercount}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Registered users
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl">
                  🧑‍💻
                </div>
              </div>
            </div>

            {/* Total Employee */}
            <div className={`${tileBase} border-l-[6px] border-l-yellow-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total Employee
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.employeecount}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Active employees
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-yellow-50 flex items-center justify-center text-2xl">
                  👥
                </div>
              </div>
            </div>

            {/* Pending GatePass */}
            <div className={`${tileBase} border-l-[6px] border-l-blue-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Pending GatePass
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.pendingGatepass}
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Awaiting approval
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                  🚒
                </div>
              </div>
            </div>

            {/* Total RCN Receiving */}
            <div className={`${tileBase} border-l-[6px] border-l-green-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total RCN Receiving
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.fyReceivingTotal.Total_Receiving
                      ? formatNumber(
                        Number(data.fyReceivingTotal.Total_Receiving) / 1000
                      )
                      : 0}{" "}
                    Ton
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Current FY receiving
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">
                  🥔
                </div>
              </div>
            </div>

            {/* Total Boiling */}
            <div className={`${tileBase} border-l-[6px] border-l-purple-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total Boiling
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.currentYearBoiling
                      ? formatNumber(Number(data.currentYearBoiling) / 1000)
                      : 0}{" "}
                    Ton
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Total boiled quantity
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                  🫖
                </div>
              </div>
            </div>

            {/* Avg Moisture Gain */}
            <div className={`${tileBase} border-l-[6px] border-l-cyan-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Avg Moisture Gain
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.fyResultHumid.total
                      ? formatNumber(data.fyResultHumid.total)
                      : 0}{" "}
                    %
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Average humidity gain
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-cyan-50 flex items-center justify-center text-2xl">
                  💦
                </div>
              </div>
            </div>

            {/* Avg Borma Loss */}
            <div className={`${tileBase} border-l-[6px] border-l-gray-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Avg Borma Loss
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.fyResultBorma.total
                      ? formatNumber(data.fyResultBorma.total)
                      : 0}{" "}
                    %
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Production loss ratio
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                  💹
                </div>
              </div>
            </div>

            {/* Village In */}
            <div className={`${tileBase} border-l-[6px] border-l-indigo-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Village In (GatePass)
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.Ville_Inside_gatepass.Village_In
                      ? formatNumber(
                        Number(data.Ville_Inside_gatepass.Village_In) / 1000
                      )
                      : 0}{" "}
                    Ton
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Incoming gatepass stock
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl">
                  🏠
                </div>
              </div>
            </div>

            {/* Village Out GatePass */}
            <div className={`${tileBase} border-l-[6px] border-l-stone-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Village Out (GatePass)
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.village_out_gate
                      ? formatNumber(Number(data.village_out_gate) / 1000)
                      : 0}{" "}
                    Ton
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Outgoing gatepass stock
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-stone-100 flex items-center justify-center text-2xl">
                  🏛️
                </div>
              </div>
            </div>

            {/* Village Out Prod */}
            <div className={`${tileBase} border-l-[6px] border-l-pink-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Village Out (Prod)
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.village_out_prod
                      ? formatNumber(Number(data.village_out_prod) / 1000)
                      : 0}{" "}
                    Ton
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Production outgoing
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-pink-50 flex items-center justify-center text-2xl">
                  🏫
                </div>
              </div>
            </div>

            {/* Pending Village Outside */}
            <div className={`${tileBase} border-l-[6px] border-l-sky-500`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Pending Village (Outside)
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-gray-800">
                    {data.village_pending_in
                      ? formatNumber(Number(data.village_pending_in) / 1000)
                      : 0}{" "}
                    Ton
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    Pending outside stock
                  </p>
                </div>

                <div className="h-12 w-12 rounded-xl bg-sky-50 flex items-center justify-center text-2xl">
                  🧆
                </div>
              </div>
            </div>

          </div>
          {/* ================= GATEPASS ================= */}

           <p className="md:text-lg md:mt-0 my-3 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md">SECTION REPORT (DAY, WEEK, MONTH)</p>
           <ProdAllExcel/>

          <div className="bg-white shadow-sm border border-gray-100 py-3 mt-2">

         

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

              <div className="bg-white border border-gray-100 rounded-xl p-4 border-l-[5px] border-l-orange-500 shadow-sm">
                <p className="text-xs uppercase font-semibold tracking-wider text-gray-500">
                  GATEPASS
                </p>

                <h2 className="mt-3 text-2xl font-bold text-gray-800">
                  Pending
                </h2>
              </div>

              <StatCard
                title="Previous Day"
                value={`${data.previousGate}`}
                subtitle={
                  data.previousGateDate
                    ? `Date: ${data.previousGateDate.slice(0, 10)}`
                    : "No data"
                }
              />

              <StatCard
                title="Current Week"
                value={`${data.weekResultGate}`}
              />

              <StatCard
                title="Current Month"
                value={`${data.monthResultGate}`}
              />

              <DateRangeForm
                onSearch={(from, to) =>
                  handleSearch("gatepass", from, to)
                }
              />

              <StatCard
                title="Custom Date Range"
                value={`${data.customGate}`}
              />

            </div>
          </div>


          {/* ================= BOILING ================= */}

          <div className="bg-white  shadow-sm border border-gray-100 py-3 mt-2">


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

              <div className="bg-white border border-gray-100 rounded-xl p-4 border-l-[5px] border-l-green-500 shadow-sm">
                <p className="text-xs uppercase font-semibold tracking-wider text-gray-500">
                  BOILING
                </p>

                <h2 className="mt-3 text-2xl font-bold text-gray-800">
                  Bag
                </h2>
              </div>

              <StatCard
                title="Previous Day"
                value={`${formatNumber(Number(data.previousBoiling) / 80)}`}
                subtitle={
                  data.previousBoilingDate
                    ? `Date: ${data.previousBoilingDate.slice(0, 10)}`
                    : "No data"
                }
              />

              <StatCard
                title="Current Week"
                value={`${formatNumber(Number(data.currentWeekBoil) / 80)}`}
              />

              <StatCard
                title="Current Month"
                value={`${formatNumber(Number(data.currentMonthBoiling) / 80)}`}
              />

              <DateRangeForm
                onSearch={(from, to) =>
                  handleSearch("boiling", from, to)
                }
              />

              <StatCard
                title="Custom Date Range"
                value={`${Number(data.customBoiling) / 1000}`}
              />

            </div>
          </div>


          {/* ================= SCOOPING ================= */}

          <div className="bg-white  shadow-sm border border-gray-100 py-3 mt-2">

            

            

            

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

               <div className="bg-white border border-gray-100 rounded-xl p-4 border-l-[5px] border-l-purple-500 shadow-sm">
                <p className="text-xs uppercase font-semibold tracking-wider text-gray-500">
                  SCOOPING
                </p>

                <h2 className="mt-4 text-xl font-bold text-gray-800">
                  Broken
                </h2>
                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  Uncut
                </h2>
                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  NonCut
                </h2>
                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  Unscoop
                </h2>
                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  Dust
                </h2>
                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  KOR (Prod)
                </h2>
                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  KOR (Lab)
                </h2>

              </div>

              {/* <StatCardBig
                title="Scooping"
                value1={"Broken"}
                value2={"Uncut"}
                value3={"NonCut"}
                value4={"Unscoop"}
                value5={"Dust"}
                value6={"KOR (Prod)"}
                value7={"KOR (Lab)"}
                color={"purple"}
              /> */}

              <StatCardBig
                title="Previous Day"
                value1={`${formatNumber(data.previousbrokenprcntg)} %`}
                value2={`${formatNumber(data.previousuncutprcntg)} %`}
                value3={`${formatNumber(data.previousnoncutprcntg)} %`}
                value4={`${formatNumber(data.previousunscoopprcntg)} %`}
                value5={`${formatNumber(data.previousdustprcntg)} %`}
                value6={`${formatNumber(data.previouskor)}`}
                value7={`${formatNumber(data.previouskorlab)}`}
                subtitle={
                  data.previousscoopDate
                    ? `Date: ${data.previousscoopDate.slice(0, 10)}`
                    : "No data"
                }
              />

              <StatCardBig
                title="Current Week"
                value1={`${formatNumber(data.weeklyBrokenAvg)} %`}
                value2={`${formatNumber(data.weeklyUncutAvg)} %`}
                value3={`${formatNumber(data.weeklyNoncutAvg)} %`}
                value4={`${formatNumber(data.weeklyUnscoopAvg)} %`}
                value5={`${formatNumber(data.weeklyDustAvg)} %`}
                value6={`${formatNumber(data.weeklyKORAvg)}`}
                value7={`${formatNumber(data.weeklyKORLabAvg)}`}
              />

              <StatCardBig
                title="Current Month"
                value1={`${formatNumber(data.monthlyBrokenAvg)} %`}
                value2={`${formatNumber(data.monthlyUncutAvg)} %`}
                value3={`${formatNumber(data.monthlyNoncutAvg)} %`}
                value4={`${formatNumber(data.monthlyUnscoopAvg)} %`}
                value5={`${formatNumber(data.monthlyDustAvg)} %`}
                value6={`${formatNumber(data.monthlyKORAvg)}`}
                value7={`${formatNumber(data.monthlyKORAvglab)}`}
              />

              <DateRangeForm
                onSearch={(from, to) =>
                  handleSearch("scoop", from, to)
                }
              />

              <StatCardBig
                title="Custom Date Range"
                value1={`${formatNumber(data.customBrokenAvg)} %`}
                value2={`${formatNumber(data.customUncutAvg)} %`}
                value3={`${formatNumber(data.customNoncutAvg)} %`}
                value4={`${formatNumber(data.customUnscoopAvg)} %`}
                value5={`${formatNumber(data.customDustAvg)} %`}
                value6={`${formatNumber(data.customKORAvg)}`}
                value7={`${formatNumber(data.customKORAvglab)}`}
              />

            </div>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
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
              value={`${formatNumber(Number(data.previousBoiling) / 80)} `}
              subtitle={
                data.previousBoilingDate
                  ? `Date: ${data.previousBoilingDate.slice(0, 10)}`
                  : "No data"
              }
            />
            <StatCard title="Current Week" value={`${formatNumber(Number(data.currentWeekBoil) / 80)} `} />
            <StatCard title="Current Month" value={`${formatNumber(Number(data.currentMonthBoiling) / 80)} `} />

            <DateRangeForm
              onSearch={(from, to) => handleSearch("boiling", from, to)}
            />

            <StatCard title="Custom Date Range" value={`${Number(data.customBoiling) / 1000} `} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
            <StatCardBig title="Scooping" value1={'Broken'}
              value2={'Uncut'}
              value3={'NonCut'}
              value4={'Unscoop'}

              value5={'Dust'} value6={'KOR (Prod)'} value7={'KOR (Lab)'} color={'purple'} />
            <StatCardBig
              title="Previous Day"
              // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
              value1={` ${formatNumber(data.previousbrokenprcntg)} %`}
              value2={` ${formatNumber(data.previousuncutprcntg)} %`}
              value3={` ${formatNumber(data.previousnoncutprcntg)} %`}
              value4={` ${formatNumber(data.previousunscoopprcntg)} %`}
              value5={` ${formatNumber(data.previousdustprcntg)} %`}
              value6={` ${formatNumber(data.previouskor)}`}
              value7={` ${formatNumber(data.previouskorlab)}`}

              subtitle={
                data.previousscoopDate
                  ? `Date: ${data.previousscoopDate.slice(0, 10)}`
                  : "No data"
              }
            />
            <StatCardBig
              title="Current Week"
              // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
              value1={`${formatNumber(data.weeklyBrokenAvg)} %`}
              value2={` ${formatNumber(data.weeklyUncutAvg)} %`}
              value3={` ${formatNumber(data.weeklyNoncutAvg)} %`}
              value4={` ${formatNumber(data.weeklyUnscoopAvg)} %`}
              value5={` ${formatNumber(data.weeklyDustAvg)} %`}
              value6={` ${formatNumber(data.weeklyKORAvg)} `}
              value7={` ${formatNumber(data.weeklyKORLabAvg)} `}
            //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}


            />
            <StatCardBig
              title="Current Month"
              // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
              value1={`${formatNumber(data.monthlyBrokenAvg)} %`}
              value2={` ${formatNumber(data.monthlyUncutAvg)} %`}
              value3={` ${formatNumber(data.monthlyNoncutAvg)} %`}
              value4={` ${formatNumber(data.monthlyUnscoopAvg)} %`}
              value5={` ${formatNumber(data.monthlyDustAvg)} %`}
              value6={` ${formatNumber(data.monthlyKORAvg)} `}
              value7={` ${formatNumber(data.monthlyKORAvglab)} `}
            //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}


            />
            <DateRangeForm
              onSearch={(from, to) => handleSearch("scoop", from, to)}
            />

            <StatCardBig
              title="Custom Date Range"
              // value1={`Wholes : ${formatNumber(data.previouswholesprcntg)} %`}
              value1={`${formatNumber(data.customBrokenAvg)} %`}
              value2={` ${formatNumber(data.customUncutAvg)} %`}
              value3={` ${formatNumber(data.customNoncutAvg)} %`}
              value4={` ${formatNumber(data.customUnscoopAvg)} %`}
              value5={` ${formatNumber(data.customDustAvg)} %`}
              value6={` ${formatNumber(data.customKORAvg)}`}
              value7={` ${formatNumber(data.customKORAvglab)}`}
            //  value7={`Rejection : ${formatNumber(data.previousrejectionprcntg)} %`}


            />



          </div> */}
                        

                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
                            <StatCardBig title="Borma" value1={'Loss (Prod)'} value2={'Loss (Lab)'} color={'blue'} />
                            <StatCardBig
                                title="Previous Day"
                                value1={` ${formatNumber(data.previousBorma)} %`}
                                value2={` ${formatNumber(data.previousBormalab)} %`}
                                subtitle={
                                    data.previousBormaDate
                                        ? `Date: ${data.previousBormaDate.slice(0, 10)}`
                                        : "No data"
                                } 
                            />
                            <StatCardBig title="Current Week" value1={` ${formatNumber(data.currentWeekBorma)} %`} 
                            value2={` ${formatNumber(data.currentWeekBormaLab)} %`}/>
                            <StatCardBig title="Current Month" value1={` ${formatNumber(data.currentMonthBorma)} %`}
                            value2={` ${formatNumber(data.currentMonthBormaLab)} %`} />

                            <DateRangeForm
                                onSearch={(from, to) => handleSearch("borma", from, to)}
                            />

                            <StatCardBig title="Custom Date Range" value1={`${formatNumber(data.customBorma)} %`} 
                            value2={`${formatNumber(data.customBormalab)} %`}/>
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
                            <StatCardBig title="Peeling" value1={'Broken'} 
                            value2={'Unpeel'} 
                            value3={'Chura'} 
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
                                 value3={` ${formatNumber(data.currentMonthUnpeel)} %`}
                                  value4={` ${formatNumber(data.currentMonthChura)} %`}
                                   
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
                            

                            
                        </div> */}

                        {/* ================= BORMA ================= */}

<div className="bg-white shadow-sm border border-gray-100 py-3 mt-2">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

    <div className="bg-white border border-gray-100 rounded-xl p-4 border-l-[5px] border-l-blue-500 shadow-sm">
      
      <p className="text-xs uppercase font-semibold tracking-wider text-gray-500">
        BORMA
      </p>

      <h2 className="mt-4 text-xl font-bold text-gray-800">
        Loss (Prod)
      </h2>

      <h2 className="mt-3 text-xl font-bold text-gray-800">
        Loss (Lab)
      </h2>

    </div>

    <StatCardBig
      title="Previous Day"
      value1={`${formatNumber(data.previousBorma)} %`}
      value2={`${formatNumber(data.previousBormalab)} %`}
      subtitle={
        data.previousBormaDate
          ? `Date: ${data.previousBormaDate.slice(0, 10)}`
          : "No data"
      }
    />

    <StatCardBig
      title="Current Week"
      value1={`${formatNumber(data.currentWeekBorma)} %`}
      value2={`${formatNumber(data.currentWeekBormaLab)} %`}
    />

    <StatCardBig
      title="Current Month"
      value1={`${formatNumber(data.currentMonthBorma)} %`}
      value2={`${formatNumber(data.currentMonthBormaLab)} %`}
    />

    <DateRangeForm
      onSearch={(from, to) =>
        handleSearch("borma", from, to)
      }
    />

    <StatCardBig
      title="Custom Date Range"
      value1={`${formatNumber(data.customBorma)} %`}
      value2={`${formatNumber(data.customBormalab)} %`}
    />

  </div>
</div>


{/* ================= HUMIDIFIER ================= */}

<div className="bg-white shadow-sm border border-gray-100 py-3 mt-2">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

    <div className="bg-white border border-gray-100 rounded-xl p-4 border-l-[5px] border-l-red-500 shadow-sm">
      
      <p className="text-xs uppercase font-semibold tracking-wider text-gray-500">
        HUMIDIFIER
      </p>

      <h2 className="mt-4 text-2xl font-bold text-gray-800">
        Gain
      </h2>

    </div>

    <StatCard
      title="Previous Day"
      value={`${formatNumber(data.previousHumid)} %`}
      subtitle={
        data.previousHumidDate
          ? `Date: ${data.previousHumidDate.slice(0, 10)}`
          : "No data"
      }
    />

    <StatCard
      title="Current Week"
      value={`${formatNumber(data.currentWeekHumid)} %`}
    />

    <StatCard
      title="Current Month"
      value={`${formatNumber(data.currentMonthHumid)} %`}
    />

    <DateRangeForm
      onSearch={(from, to) =>
        handleSearch("humid", from, to)
      }
    />

    <StatCard
      title="Custom Date Range"
      value={`${formatNumber(data.customHumid)} %`}
    />

  </div>
</div>


{/* ================= PEELING ================= */}

<div className="bg-white shadow-sm border border-gray-100 py-3 mt-2">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

    <div className="bg-white border border-gray-100 rounded-xl p-4 border-l-[5px] border-l-gray-500 shadow-sm">

      <p className="text-xs uppercase font-semibold tracking-wider text-gray-500">
        PEELING
      </p>

      <h2 className="mt-4 text-xl font-bold text-gray-800">
        Broken
      </h2>

      <h2 className="mt-2 text-xl font-bold text-gray-800">
        Unpeel
      </h2>

      <h2 className="mt-2 text-xl font-bold text-gray-800">
        Chura
      </h2>

    </div>

    <StatCardBig
      title="Previous Day"
      value2={`${formatNumber(data.previousBroken)} %`}
      value3={`${formatNumber(data.previousUnpeel)} %`}
      value4={`${formatNumber(data.previousChura)} %`}
      subtitle={
        data.previousPeelDate
          ? `Date: ${data.previousPeelDate.slice(0, 10)}`
          : "No data"
      }
    />

    <StatCardBig
      title="Current Week"
      value2={`${formatNumber(data.currentWeekBroken)} %`}
      value3={`${formatNumber(data.currentWeekUnpeel)} %`}
      value4={`${formatNumber(data.currentWeekChura)} %`}
    />

    <StatCardBig
      title="Current Month"
      value2={`${formatNumber(data.currentMonthBroken)} %`}
      value3={`${formatNumber(data.currentMonthUnpeel)} %`}
      value4={`${formatNumber(data.currentMonthChura)} %`}
    />

    <DateRangeForm
      onSearch={(from, to) =>
        handleSearch("peeling", from, to)
      }
    />

    <StatCardBig
      title="Custom Date Range"
      value2={`${formatNumber(data.customBroken)} %`}
      value3={`${formatNumber(data.customUnpeel)} %`}
      value4={`${formatNumber(data.customChura)} %`}
    />

  </div>
</div>
                        
                    </>
                      
                    )}



           

        </>
    )
}

export default DirectorDashboard;