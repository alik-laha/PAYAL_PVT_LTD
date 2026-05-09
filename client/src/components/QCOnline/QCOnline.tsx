import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import { QC_Online_Section } from "../common/exportData";

import { useState } from "react";

import Loader from "../common/Loader";
import UseQueryData from "../common/dataFetcher";
import { Label } from "../ui/label";
import QCOnlineBoiler from "./QCOnlineBoiler";
import QCOnlineBoiling from "./QCOnlineBoiling";
import QCOnlineGrading from "./QCOnlineGrading";
import QCOnlineScooping from "./QCOnlineScooping";
import QCOnlineBorma from "./QCOnlineBorma";
import QCOnlineHumid from "./QCOnlineHumid";
import QCOnlineBoilerTable from "./QCOnlineBoilerTable";
import QCOnlineGradingTable from "./QCOnlineGradingTable";
import QCOnlineBoilingTable from "./QCOnlineBoilingTable";
import QCOnlineScoopingTable from "./QCOnlineScoopingTable";
import QCOnlineBormaTable from "./QCOnlineBormaTable";
import QCOnlineHumidifierTable from "./QCOnlineHumidifierTable";
import QCOnlinePouch from "./QCOnlinePouch";
import QCOnlineTaiho from "./QCOnlineTaiho";
import QCOnlineBucket from "./QCOnlineBucket";
import QCOnlineNanopix from "./QCOnlineNanopix";
import QCOnlinePeeling from "./QCOnlinePeeling";
import QCOnlineHandGrade from "./QCOnlineHandGrade";
import QCOnlinePeelingTable from "./QCOnlinePeelingTable";
import QCOnlineTaihoTable from "./QCOnlineTaihoTable";
import QCOnlineNanopixTable from "./QCOnlineNanopixTable";
import QCOnlinePouchTable from "./QCOnlinePouchTable";
import QCOnlineBucketTable from "./QCOnlineBucketTable";
import QCOnlineHandGradeTable from "./QCOnlineHandGradeTable";
import DashboardFooter from "../dashboard/DashboardFooter";
import axios from "axios";
import QcKORInitial from './qcKORInitial'
import { FaHistory } from "react-icons/fa";
import QCProductionKORTable from "./QCKORTable";
import saveAs from "file-saver";
import { format, toZonedTime } from "date-fns-tz";
import { Input } from "../ui/input";
import { Download } from "lucide-react";

//import QCWaterCreate from "./QCWaterCreate";
//import QCWaterTable from "./QCWaterTable";

// import IssueTable from "./IssueTable";

const QCOnline = () => {
  const [section, setSection] = useState<string>("");
  const [tablesection, setTablesection] = useState<string>("BOILER");
   const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [loading, setLoading] = useState(false);

  const currDate = new Date().toISOString().split("T")[0];
  const [lotdata, setLotData] = useState<any[]>([])
  const [maintable, setMainTable] = useState<string>('block')
  const [kortable, setKorTable] = useState<string>('none')
  const { data, isLoading, error } = UseQueryData(
    "/api/qconline/sumofallQCOnline",
    "GET",
    "AllBoilerQCOnlineSum"
  );
  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error</div>;
  }

  function handletimezone(date: string | Date) {
      const apidate = new Date(date);
      const localdate = toZonedTime(
        apidate,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      return format(localdate, "dd-MM-yyyy", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    }

    const handleAMPM = (time: string) => {
    let [hours, minutes] = time.split(":").map(Number);
    let period = " AM";
    if (hours === 0) hours = 12;
    else if (hours === 12) period = " PM";
    else if (hours > 12) {
      hours -= 12;
      period = " PM";
    }
    return (
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      period
    );
  };
  const handleTransferFetch =  () => {
        if(maintable === 'block'){
            setMainTable('none')
            setKorTable('block')
        }
        else{
            setMainTable('block')
            setKorTable('none')
        }
    }

   const handleOpenLotNo = async () => {
        axios.get('/api/qconline/getUnKOREntry/0').then(res => {
            console.log(res)
            setLotData(res.data.scoopingLot)
        })




    }

  const exportAllToExcel = async () => {
    try {
      setLoading(true)
      const commonPayload = {
        fromDate: fromdate,
        toDate: todate,
      };

      // Fetch all APIs together
      const [
        gradingRes,
        boilerRes,
        boilingRes,
        scoopingRes,
        bormaRes,
        humidifierRes,
        peelingRes,
        taihoRes,
        nanopixRes,
        handgradeRes,
        pouchRes,
        bucketRes,
      ] = await Promise.all([
        axios.post("/api/qconline/searchQCOnlineGrading", commonPayload),
        axios.post("/api/qconline/searchQCOnlineBoiler", commonPayload),
        axios.post("/api/qconline/searchQCOnlineBoiling", commonPayload),
        axios.post("/api/qconline/searchQCOnlineScooping", commonPayload),
        axios.post("/api/qconline/searchQCOnlineBorma", commonPayload),
        axios.post("/api/qconline/searchQCOnlineHumidifier", commonPayload),
        axios.post("/api/qconline/searchQCOnlinePeeling", commonPayload),
        axios.post("/api/qconline/searchQCOnlineTaiho", commonPayload),
        axios.post("/api/qconline/searchQCOnlineNanopix", commonPayload),
        axios.post("/api/qconline/searchQCOnlineHandGrade", commonPayload),
        axios.post("/api/qconline/searchQCOnlinePouch", commonPayload),
        axios.post("/api/qconline/searchQCOnlineBucket", commonPayload),
      ]);

      const wb = XLSX.utils.book_new();

      // Helper function
      const addSheet = (
        data: any[],
        transformFn: (item: any, idx: number) => any,
        sheetName: string
      ) => {
        const transformed = data.map(transformFn);

        const ws = XLSX.utils.json_to_sheet(transformed);

        // Auto column width
        const colWidths = Object.keys(transformed[0] || {}).map((key) => ({
          wch: Math.max(
            key.length,
            ...transformed.map((row) =>
              row[key] ? row[key].toString().length : 10
            )
          ) + 5,
        }));

        ws["!cols"] = colWidths;

        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      };

      // ===================== GRADING =====================
      addSheet(
        gradingRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Vibrator_Speed_1: item.vibratorspeed1,
          Vibrator_Speed_2: item.vibratorspeed2,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Grading"
      );

      // ===================== BOILER =====================
      addSheet(
        boilerRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Boiler1_Pressure: item.boiler1pressure,
          Boiler2_Pressure: item.boiler2pressure,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Boiler"
      );

      // ===================== BOILING =====================
      addSheet(
        boilingRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Cooker_No: item.cookerNo,
          Cooker_Pressure: item.cookerPressure,
          Cooker_Time: item.cookerTime,
          Cashew_After_Boiling_Status: item.cashewStatus,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Boiling"
      );

      // ===================== SCOOPING =====================
      addSheet(
        scoopingRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Oil_Contain_Status: item.oilcontainStatus,
          Sieve_Cleaning_Status: item.chalnacontainStatus,
          Cashew_Percent_In_Husk: item.cashewHuskprcnt,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Scooping"
      );

      // ===================== BORMA =====================
      addSheet(
        bormaRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Pressure: item.pressure,
          Lot_No: item.LotNo,
          Borma_No: item.bormaNo,
          Origin: item.Origin,
          NW_Quality: item.nwQuality,
          Trolley_Burn_Quality: item.burnQuality,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Borma"
      );

      // ===================== HUMIDIFIER =====================
      addSheet(
        humidifierRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Moisture: item.pressure,
          Lot_No: item.LotNo,
          Origin: item.Origin,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Humidifier"
      );

      // ===================== PEELING =====================
      addSheet(
        peelingRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Pressure: item.pressure,
          Peeling_Time: item.peelingTime,
          Unpeeled_Pcnt: item.unpeelPcntng,
          Cashew_Pcnt: item.cashewPcntng,
          Peeling_Qty: item.peelingQty,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Peeling"
      );

      // ===================== TAIHO =====================
      addSheet(
        taihoRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Pressure: item.pressure,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Taiho"
      );

      // ===================== NANOPIX =====================
      addSheet(
        nanopixRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Cup_Cleaning_Status: item.cupcleaningStatus,
          Magic_Cleaning_Status: item.magiccleaningStatus,
          Grading_Count: item.gradingCount,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Nanopix"
      );

      // ===================== HANDGRADE =====================
      addSheet(
        handgradeRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Lot_No: item.LotNo,
          Origin: item.Origin,
          Grade: item.Grade,
          Moisture: item.moisture,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "HandGrade"
      );

      // ===================== POUCH =====================
      addSheet(
        pouchRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Lot_No: item.LotNo,
          Batch_No: item.BatchNo,
          Origin: item.Origin,
          Grade: item.Grade,
          Moisture: item.moisture,
          Nut_Count: item.nutcount,
          Avg_Weight: item.avgWeight,
          Packet_Quality: item.pktQuality,
          Packet_Quality_Remarks: item.pktQualityRemarks,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Remarks: item.Remarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Pouch"
      );

      // ===================== BUCKET =====================
      addSheet(
        bucketRes.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
          Date: handletimezone(item.date),
          Time: handleAMPM(item.time),
          Lot_No: item.LotNo,
          Batch_No: item.BatchNo,
          Origin: item.Origin,
          Grade: item.Grade,
          Moisture: item.moisture,
          Nut_Count: item.nutcount,
          Avg_Weight: item.avgWeight,
          Packet_Quality: item.pktQuality,
          Packet_Quality_Remarks: item.pktQualityRemarks,
          Cleaning_Status: item.cleaningStatus,
          Cleaning_Remarks: item.cleanRemarks,
          Maintainance_Status: item.maintainance,
          Maintainance_Remarks: item.maintainanceRemarks,
          Remarks: item.Remarks,
          Created_By: item.createdBy,
          Modified_By: item.modifiedBy,
        }),
        "Bucket"
      );

      // Final Export
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([wbout], {
        type: "application/octet-stream",
      });

      saveAs(blob, `QC_All_Report_${currDate}.xlsx`);
     
    } catch (error) {
      console.error("Excel Export Error:", error);
    }
     finally {
                setLoading(false);
            }
  };
  return (
    <>
      <div>
        <DashboardHeader />
        <DashboardSidebar />

        <div className="dashboard-main-container">
          <div className="flexbox-header mx-2">
            <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
              <p>Boiler</p> <br />
              <p>{data.boilerdata} </p>
            </div>
            <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
              <p>Grading</p>
              <br />
              <p>{data.gradingdata}</p>
            </div>
            <div className="flexbox-tile bg-green-500 hover:bg-green-400">
              <p>Boiling</p>
              <br />
              <p>{data.boilingdata}</p>
            </div>
            <div className="flexbox-tile bg-red-500 hover:bg-red-400">
              <p>Scooping</p> <br />
              <p>{data.scoopingdata} </p>
            </div>
            <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
              <p>Borma</p>
              <br />
              <p>{data.bormadata} </p>
            </div>
            <div className="flexbox-tile bg-slate-400 hover:bg-slate-300">
             <p>Humidifier</p> 
              <br />
              <p>{data.humiddata} </p>
            </div>

           
          </div>
           <div className="flexbox-header mx-2">
            

            <div className="flexbox-tile bg-rose-500 hover:bg-rose-400">
              <p>Peeling</p>
              <br />
              <p>{data.peelingData} </p>
            </div>

            <div className="flexbox-tile bg-lime-500 hover:bg-lime-400">
              <p>Hand Grading</p>
              <br />
              <p>{data.handgradeData} </p>
            </div>

            <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
              <p>Nanopix</p>
              <br />
              <p>{data.nanopixData} </p>
            </div>

            <div className="flexbox-tile bg-slate-400 hover:bg-slate-300">
              <p>Taiho</p>
              <br />
              <p>{data.taihodata} </p>
            </div>

            <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
              <p>Bucket</p>
              <br />
              <p>{data.bucketData} </p>
            </div>

            <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
              <p>Pouch</p>
              <br />
              <p>{data.pouchData} </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold">
            QC DAILY ONLINE TRANSACTION
          </p>
          <div className="flex">
            <Dialog>
              <DialogTrigger >
                {" "}
                <Button
                  className="w-20 md:w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                  >
                  +  Add QC
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl" style={{ display: "block" }}>
                <DialogHeader>
                  <DialogTitle>
                    <p className="text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold">
                      QC Online Test
                    </p>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex mt-2 px-6 pt-6 pb-3">
                  <Label className="w-2/4 pt-1 ">Section Name</Label>
                  <Select
                    value={section}
                    onValueChange={(value) => setSection(value)}
                    required={true}>
                    <SelectTrigger className="w-2/4 justify-center bg-cyan-100 ">
                      <SelectValue placeholder="Section Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {QC_Online_Section.map((item: any, indx) => {
                          return (
                            <SelectItem key={indx} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {section === "BOILER" && <QCOnlineBoiler />}
                {section === "BOILING" && <QCOnlineBoiling />}
                {section === "GRADING" && <QCOnlineGrading />}
                {section === "SCOOPING" && <QCOnlineScooping />}
                {section === "BORMA" && <QCOnlineBorma />}
                {section === "HUMIDIFIER" && <QCOnlineHumid />}

                {section === "TAIHO" && <QCOnlineTaiho />}
                {section === "POUCH" && <QCOnlinePouch />}
                {section === "BUCKET" && <QCOnlineBucket />}
                {section === "NANOPIX" && <QCOnlineNanopix />}
                {section === "PEELING" && <QCOnlinePeeling />}
                {section === "HAND_GRADE" && <QCOnlineHandGrade />}
                  
                {/* <QCWaterCreate /> */}
              </DialogContent>
            </Dialog>

            <Dialog>
                        <DialogTrigger> <Button className="w-20 md:w-40 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add KOR</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>KOR Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <QcKORInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>

                      <Button className="w-20 md:w-40 bg-gradient-to-r from-purple-600 to-blue-400 hover:from-slate-500 hover:to-slate-300 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleTransferFetch}> {maintable==='block' ? 'KOR':'Online'}<FaHistory size={16} className='ml-2'/></Button>


            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-20 md:w-40 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md">
                  <Download size={18} />
                  Export QC
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Download QC Excel Report</DialogTitle>
                </DialogHeader>

                <div className="space-y-5 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      From Date
                    </label>

                    <Input
                      type="date"
                      value={fromdate}
                      onChange={(e) => setFromdate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      To Date
                    </label>

                    <Input
                      type="date"
                      value={todate}
                      onChange={(e) => setTodate(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={exportAllToExcel}
                    disabled={loading}
                  >
                    {loading ? "Downloading..." : "Download Excel"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
           {/* <div className="mb-2 mt-5 responsive-button-adjust no-margin-left ml-4"> */}
           {maintable === 'block' && <Select
              value={tablesection}
              onValueChange={(value) => setTablesection(value)}
              required={true}>
              <SelectTrigger className="w-28 md:w-40 justify-center h-10 bg-yellow-100 font-bold border-2 border-gray-300 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md">
                <SelectValue placeholder="Section Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Section.map((item: any, indx) => {
                    return (
                      <SelectItem key={indx} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>}
          

          
           
          </div>
          {/* <div className="mt-2 mb-5 flex justify-center items-center">
           
          </div> */}

          <div style={{ display: maintable }}>
          {tablesection==='BOILER' && <QCOnlineBoilerTable />}
          {tablesection==='GRADING' && <QCOnlineGradingTable />}
          {tablesection==='BOILING' && <QCOnlineBoilingTable />}
          {tablesection==='SCOOPING' && <QCOnlineScoopingTable />}
          {tablesection==='BORMA' && <QCOnlineBormaTable />}
          {tablesection==='HUMIDIFIER' && <QCOnlineHumidifierTable />}
          
           {tablesection==='PEELING' && <QCOnlinePeelingTable />}
           {tablesection==='TAIHO' && <QCOnlineTaihoTable />}
           {tablesection==='NANOPIX' && <QCOnlineNanopixTable />}
           {tablesection==='POUCH' && <QCOnlinePouchTable />}
           {tablesection==='BUCKET' && <QCOnlineBucketTable />}
           {tablesection==='HAND_GRADE' && <QCOnlineHandGradeTable />}
          </div>
            <div style={{ display: kortable }}>
              <QCProductionKORTable/>
            </div>

        
        </div>
        <DashboardFooter/>
      </div>
    </>
  );
};

export default QCOnline;
