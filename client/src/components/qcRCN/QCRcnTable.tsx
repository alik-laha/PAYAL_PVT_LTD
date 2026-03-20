import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Origin } from "../common/exportData";
import React from "react";
import axios from "axios";
import { QcRcnEntryData } from "@/type/type";
import { pageNo, pagelimit } from "../common/exportData";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format, toZonedTime } from "date-fns-tz";
import { MdPendingActions } from 'react-icons/md';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import {
  MdOutlineDriveFolderUpload,
  MdOutlinePendingActions,
} from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import QCreportForm from "./QCreportForm";
import QCmodifyreportForm from "./QCmodifyreportForm";
import tick from "../../assets/Static_Images/Flat_tick_icon.svg.png";
import cross from "../../assets/Static_Images/error_img.png";
import { pendingCheckRole } from "../common/exportData";
import {
  QcRcnEntryExcelData,
  PermissionRole,
  pendingCheckRoles,
} from "@/type/type";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Context from "../context/context";
import { SiTicktick } from "react-icons/si";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } 
from '../ui/drawer';
const QCRcnTable = () => {
  const [origin, setOrigin] = useState<string>("");
  const [fromdate, setfromDate] = React.useState<string>("");
  const [todate, settoDate] = React.useState<string>("");
  // const [hidetodate, sethidetoDate] = React.useState<string>('');
  const [blConNo, setBlConNo] = useState<string>("");
  const [Data, setData] = useState<QcRcnEntryData[]>([]);
  const [page, setPage] = useState(pageNo);
  //const [EditData, setEditData] = useState<EditPendingData[]>([])
  const limit = pagelimit;
  const [blockpagen, setblockpagen] = useState("flex");
  const [pendingData, setPendingData] = useState<QcRcnEntryData[]>([]);
  const [counteditpending, setcounteditpending] = useState<number>(0);
  const { pendingqccount, pendingreportcount } = useContext(Context);

  const approvesuccessdialog = document.getElementById(
    "qcapproveScsDialog"
  ) as HTMLInputElement;
  const approvecloseDialogButton = document.getElementById(
    "qcapproveScscloseDialog"
  ) as HTMLInputElement;

  const rejectsuccessdialog = document.getElementById(
    "qcRejectDialog"
  ) as HTMLInputElement;
  const rejectcloseDialogButton = document.getElementById(
    "qcrejectcloseDialog"
  ) as HTMLInputElement;
  const [successtext, setSuccessText] = React.useState<string>("");
  const [errortext, seterrorText] = React.useState<string>("");
  //const [transformedData, setTransformedData] = useState<QcRcnEntryExcelData[]>([]);
  const Role = localStorage.getItem("role") as keyof PermissionRole;
  const currDate = new Date().toLocaleDateString();

  const exportToExcel = async () => {
    const response = await axios.put("/api/qcRcn/searchqcRcn", {
      blConNo: blConNo,
      origin: origin,
      fromDate: fromdate,
      toDate: todate,
    });
    const data1 = await response.data;

    let ws;
    let transformed: QcRcnEntryExcelData[] = [];
    if (pendingData.length > 0) {
      transformed = pendingData.map((item: QcRcnEntryData, idx: number) => ({
        id: idx + 1,
        gatePassNo: item.rcnEntry.gatePassNo,
        blNo: item.blNo,
        conNo: item.conNo,
        date: item.date,
        origin: item.origin,
        truckNo: item.rcnEntry.truckNo,
        BLWeight: item.rcnEntry.blWeight,
        NoOfBags: item.rcnEntry.noOfBags,
        QCStatus: item.rcnEntry.rcnStatus,
        sampling: item.sampling,
        moisture: item.moisture,
        nutCount: item.nutCount,
        fluteRate: item.fluteRate,
        goodKernel: item.goodKernel,
        spIm: item.spIm,
        reject: item.reject,
        shell: item.shell,
        outTurn: item.outTurn,
        Remarks: item.Remarks,
        qcapprovedBy: item.qcapprovedBy,
        reportStatus: item.reportStatus === 1 ? "Done" : "Pending",
        EntriedBy: item.createdBy,
        editStatus: item.editStatus,
        editapprovedorRejectedBy: item.editapprovedBy,
      }));
      //setTransformedData(transformed);
      ws = XLSX.utils.json_to_sheet(transformed);
    } else {
      transformed = data1.rcnEntries.map(
        (item: QcRcnEntryData, idx: number) => ({
          id: idx + 1,
          gatePassNo: item.rcnEntry.gatePassNo,
          blNo: item.blNo,
          conNo: item.conNo,
          date: item.date,
          origin: item.origin,
          truckNo: item.rcnEntry.truckNo,
          BLWeight: item.rcnEntry.blWeight,
          NoOfBags: item.rcnEntry.noOfBags,
          QCStatus: item.rcnEntry.rcnStatus,
          sampling: item.sampling,
          moisture: item.moisture,
          nutCount: item.nutCount,
          fluteRate: item.fluteRate,
          goodKernel: item.goodKernel,
          spIm: item.spIm,
          reject: item.reject,
          shell: item.shell,
          outTurn: item.outTurn,
          Remarks: item.Remarks,
          qcapprovedBy: item.qcapprovedBy,
          reportStatus: item.reportStatus === 1 ? "Done" : "Pending",
          EntriedBy: item.createdBy,
          editStatus: item.editStatus,
          editapprovedorRejectedBy: item.editapprovedBy,
        })
      );
      // setTransformedData(transformed);
      ws = XLSX.utils.json_to_sheet(transformed);
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "QC_RCN_Entry_" + currDate + ".xlsx");
  };

  if (approvecloseDialogButton) {
    approvecloseDialogButton.addEventListener("click", () => {
      if (approvesuccessdialog != null) {
        (approvesuccessdialog as any).close();
        window.location.reload();
      }
    });
  }

  if (rejectcloseDialogButton) {
    rejectcloseDialogButton.addEventListener("click", () => {
      if (rejectsuccessdialog != null) {
        (rejectsuccessdialog as any).close();
        window.location.reload();
      }
    });
  }

  const handleSearchPendingReport = async () => {
    //console.log('search button pressed')
    //setEditData([])
    //setblockpagen('flex')
    setData([]);

    const response = await axios.put("/api/qcRcn/searchqcRcn", {
      reportStatus: 0,
    });
    const data = await response.data;
    if (data.rcnEntries.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
    setPendingData(data.rcnEntries);
    setblockpagen("none");
  };

  const handleSearchPendingQC = async () => {
    //setData([])
    // //console.log('search button pressed')
    // //setEditData([])
    setData([]);

    //setblockpagen('flex')
    const response = await axios.put("/api/qcRcn/searchqcRcn", {
      qcStatus: "QC Pending",
    });
    const data = await response.data;
    if (data.rcnEntries.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
    setPendingData(data.rcnEntries);
    setblockpagen("none");
  };

  const handleSearchPendingEdit = async () => {
    // //console.log('search button pressed')
    // //setEditData([])
    setData([]);

    //setblockpagen('flex')
    const response = await axios.get("/api/qcRcn/getTotalEditQC");
    const data = await response.data;
    // if (data.rcnEntries.length === 0 && page > 1) {
    //     setPage((prev) => prev - 1)

    // }

    setPendingData(data.rcnEdit);

    setblockpagen("none");
  };

  const handleSearch = async () => {
    //console.log('search button pressed')
    setPendingData([]);

    setblockpagen("flex");
    const response = await axios.put(
      "/api/qcRcn/searchqcRcn",
      {
        blConNo: blConNo,
        origin: origin,
        fromDate: fromdate,
        toDate: todate,
      },
      {
        params: {
          page: page,
          limit: limit,
        },
      }
    );
    const data = await response.data;
    if (data.rcnEntries.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
    setData(data.rcnEntries);
    setcounteditpending(data.CountPendingEdit);
  };
  useEffect(() => {
    handleSearch();
    setPage((prev) => {
      if (prev <= 0) {
        return 1;
      }
      return prev;
    });
  }, [page]);

  const handleEditApprove = async (item: QcRcnEntryData) => {
    const response = await axios.put(
      `/api/qcRcn/approveEditQcReport/${item.id}`
    );
    const data = await response.data;

    if (data.message === "Edit Request of QC Report is Approved Successfully") {
      setSuccessText(data.message);
      if (approvesuccessdialog != null) {
        (approvesuccessdialog as any).showModal();
      }
    }
  };
  const handleEditReject = async (item: QcRcnEntryData) => {
    const response = await axios.delete(
      `/api/qcRcn/rejectEditQcReport//${item.id}`
    );
    const data = await response.data;

    if (data.message === "QC Report Edit Request is Reverted successfully") {
      seterrorText(data.message);
      if (rejectsuccessdialog != null) {
        (rejectsuccessdialog as any).showModal();
      }
    }
  };

  const handleQCApprove = async (item: QcRcnEntryData) => {
    const response = await axios.put(`/api/qcRcn/qcRcnApprove/${item.id}`);
    const data = await response.data;

    if (data.message === "QC Approval of Rcn Entry is made Successfully") {
      setSuccessText(data.message);
      if (approvesuccessdialog != null) {
        (approvesuccessdialog as any).showModal();
      }
    }
  };

  const handleQCReject = async (item: QcRcnEntryData) => {
    const response = await axios.put(`/api/qcRcn/qcRcnReject/${item.id}`);
    const data = await response.data;

    if (data.message === "QC Approval of Rcn Entry is Rejected Successfully") {
      seterrorText(data.message);
      if (rejectsuccessdialog != null) {
        (rejectsuccessdialog as any).showModal();
      }
    }
  };
  const checkpending = (tab: string) => {
    //console.log(Role)
    if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
      return true;
    } else {
      return false;
    }
  };

  function handletimezone(date: string | Date) {
    const apidate = new Date(date);
    const localdate = toZonedTime(
      apidate,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const finaldate = format(localdate, "dd-MM-yyyy", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    return finaldate;
  }

  // const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

  //     const selected = e.target.value;
  //     if (!selected) {
  //         settoDate('')
  //         sethidetoDate('')
  //         return
  //     }
  //     //console.log(selected)
  //     const date = new Date(selected)
  //     date.setDate(date.getDate() + 1);
  //     //console.log(date)
  //     const nextday = date.toISOString().split('T')[0];
  //     //console.log(nextday)
  //     sethidetoDate(selected)
  //     settoDate(nextday)
  // }
  return (
    <div className="mx-2 ">
     {(pendingqccount ?? 0) > 0 && 
     
     <div className="relative inline-block responsive-button-adjust">

      <Button
        className="w-25 md:w-40 bg-gradient-to-r from-purple-500 to-blue-400 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md"
        
        onClick={handleSearchPendingQC}
        disabled={(pendingqccount ?? 0) === 0}>
        Pending QC
      </Button>

        {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                {((pendingqccount ?? 0) ?? 0) > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                        {(pendingqccount ?? 0)?? 0}
                                    </span>
                                )}

      </div>
     
     }

      {(pendingreportcount ?? 0) > 0 && 
     
     <div className="relative inline-block ml-2 md:ml-4 responsive-button-adjust">
         <Button
        className="w-25 md:w-40 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md"
        
        onClick={handleSearchPendingReport}
        disabled={(pendingreportcount ?? 0) === 0}>
        Pending Report
      </Button>

        {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                {((pendingreportcount ?? 0) ?? 0) > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                        {(pendingreportcount ?? 0)?? 0}
                                    </span>
                                )}


      </div>}


       {checkpending('QCRCN') && (counteditpending ?? 0) > 0 && <Drawer>
                                            <DrawerTrigger asChild >
                                                <div className="relative inline-block ml-2 md:ml-4 top-1 responsive-button-adjust">
                                                    <Button
                                                        className="w-25 md:w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                                        /* FIX 1: Use ?? 0 for the disabled prop */
                                                        disabled={(counteditpending ?? 0) === 0}
                                                        onClick={handleSearchPendingEdit}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <MdPendingActions size={18} />
                                                            Actions 
                                                        </div>
                                                    </Button>
                    
                                                    {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                                    {(counteditpending ?? 0) > 0 && (
                                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                                            {counteditpending ?? 0}
                                                        </span>
                                                    )}
                                                </div>
                                            </DrawerTrigger>
                                            <DrawerContent>
                                                <DrawerHeader>
                                                    <DrawerTitle>Pending Actions</DrawerTitle>
                                                    <DrawerDescription>Approve Or Reject Modify Request</DrawerDescription>
                                                </DrawerHeader>
                                                 <div className='mx-5 flex flex-col'>
                                                  
                  <div className="flex flex-row w-full  justify-end"><Button
                                className="w-12 mb-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={exportToExcel}
                            >
                                <LuDownload size={16} />

                            </Button></div>    


                            <Table className="mt-4">
        <TableHeader className="bg-neutral-100 text-stone-950 ">
          <TableHead className="text-center bg-gray-200 text-gray-700">Id</TableHead>
           <TableHead className="text-center bg-gray-200 text-gray-700">Action</TableHead>
            <TableHead className="text-center bg-gray-200 text-gray-700">GatePass⠀No</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Origin</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Incoming⠀Date </TableHead>
         <TableHead className="text-center bg-gray-200 text-gray-700">Edit⠀Status</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">BL⠀No.</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Con⠀No.</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Entry⠀Truck⠀No.</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">BL⠀Weight</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Bag⠀Count</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">QC⠀Approval⠀Status</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Checked⠀By </TableHead>

          <TableHead className="text-center bg-gray-200 text-gray-700">Sampling⠀(%)</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Moisture⠀(%)</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Nut⠀Count⠀(Pcs)</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Flute⠀Rate⠀(gm/Kg)</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Good⠀Kernel⠀(gm)</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">SP+IM⠀(gm)</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Reject⠀(gm)</TableHead>
          <TableHead className="text-center bg-gray-200 text-gray-700">Shell⠀(gm)</TableHead>

          <TableHead className="text-center bg-gray-200 text-gray-700">Outturn(Lbs)</TableHead>

          <TableHead className="text-center bg-gray-200 text-gray-700">Report⠀By</TableHead>
          

         
        </TableHeader>

        <TableBody>
          {pendingData.length > 0 && (
            pendingData.map((item: QcRcnEntryData, idx) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell className="text-center flex flex-row gap-3">


                                                    <AlertDialog>
                                                        <AlertDialogTrigger >
                                                                <div className="flex flex-row gap-1 bg-green-50 px-3 py-1 rounded border border-green-300 "> <FcApprove size={18} />
                                                    <button className="text-green-600">
                                                        Approve
                                                    </button>

                                                </div>

                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent  >
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Do you want to Approve the Edit Request?
                                                                </AlertDialogTitle>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleEditApprove(item)}>
                                                                    Continue
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>
                                                              <div className="flex flex-row gap-1 bg-red-50 px-3 py-1 rounded border border-red-300">
                                                                                                              <FcDisapprove size={18} />
                                                                                                              <button className=" text-red-600">
                                                                                                                  Revert
                                                                                                              </button>
                                                                                                          </div>

                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Do you want to Decline the Edit Request?
                                                                </AlertDialogTitle>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleEditReject(item)}>
                                                                    Continue
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>


                                        </TableCell>
                  
                   <TableCell className="text-center font-semibold text-red-600">
                    {item.rcnEntry.gatePassNo}
                  </TableCell>
                  <TableCell className="text-center font-semibold text-cyan-600">
                    {item.origin}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {handletimezone(item.date)}
                  </TableCell>
                   <TableCell className="text-center" > <button
                                                                                className={`p-2 rounded w-20 border 
                                              ${item.editStatus === "Approved"
                                                                                        ? "text-green-600 border-green-600 bg-green-50"
                                                                                        : item.editStatus === "N/A"
                                                                                            ? "text-gray-700 border-gray-400 bg-gray-100"
                                                                                            : "text-red-600 border-red-600 bg-red-50"
                                                                                    }`}
                                                                            >
                                                                                {item.editStatus}
                                                                            </button></TableCell>
                 
                  <TableCell className="text-center">{item.blNo}</TableCell>
                  <TableCell className="text-center">{item.conNo}</TableCell>
                  <TableCell className="text-center">
                    {item.rcnEntry.truckNo}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.rcnEntry.blWeight}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.rcnEntry.noOfBags}
                  </TableCell>
                 <TableCell className="text-center">
                    {item.rcnEntry.rcnStatus === "QC Approved" ? (
                      <p className="flex flex-row justify-center">
                        <SiTicktick color="green" size={18} />
                      </p>
                    ) : item.rcnEntry.rcnStatus === "QC Pending" ? (
                      <p className="flex flex-row justify-center">
                        <MdOutlinePendingActions color="red" size={23} />
                      </p>
                    ) : (
                      <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">
                        {item.rcnEntry.rcnStatus}
                      </button>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.qcapprovedBy? item.qcapprovedBy:<p className="flex flex-row justify-center text-red-500 font-semibold">
                        Pending
                      </p>}
                  </TableCell>

                  {/* <TableCell className="text-center">

                                            <input type='checkbox' checked={item.reportStatus === 1 ? true : false} />
                                        </TableCell> */}
                  <TableCell className={`text-center  ${item.sampling ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.sampling ? `${item.sampling} %` : ""}
                  </TableCell>
                  <TableCell className={`text-center  ${item.moisture ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.moisture ? `${item.moisture} %` : ""}
                  </TableCell>
                  <TableCell className={`text-center  ${item.nutCount ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.nutCount ? `${item.nutCount} Pcs` : ""}
                  </TableCell>
                  <TableCell className={`text-center  ${item.fluteRate ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.fluteRate ? `${item.fluteRate} g/kg` : ""}
                  </TableCell>
                  <TableCell className={`text-center  ${item.goodKernel ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.goodKernel ? `${item.goodKernel} g` : ""}
                  </TableCell>
                  <TableCell className={`text-center  ${item.spIm ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.spIm ? `${item.spIm} g` : ""}
                  </TableCell>
                  <TableCell className={`text-center  ${item.reject ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.reject ? `${item.reject} g` : ""}
                  </TableCell>
                  <TableCell className={`text-center  ${item.shell ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.shell ? `${item.shell} g` : ""}
                  </TableCell>
                  <TableCell className={`text-center  ${item.outTurn ? 'bg-yellow-50':'text-red-500 font-semibold'}`}>
                    {item.outTurn ? `${item.outTurn} Lbs` : ""}
                  </TableCell>
                  <TableCell className="text-center">
                      {item.createdBy ?item.createdBy  :<p className="flex flex-row justify-center">
                        <MdOutlinePendingActions color="red" size={23} />
                      </p>}
                  </TableCell>
                
                 
                </TableRow>
              );
            })
          )}
           </TableBody>

        </Table>                              
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  
                                                  
                                                    </div>
                                                <DrawerFooter>
                    
                                                    <DrawerClose asChild>
                                                        <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                                        >Close</Button>
                                                    </DrawerClose>
                                                </DrawerFooter>
                    
                                            </DrawerContent>
                                        </Drawer>}


          <div className="mt-5">
            <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
      
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
      
                              {/* BL / Con No */}
                                                  <div className="flex flex-col gap-1">
                                                      {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                                          BL No. / Con No.
                                                      </label> */}
                                                      <Input
                                                          className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                                                          placeholder="BL / Con No."
                                                          value={blConNo}
                                                          onChange={(e) => setBlConNo(e.target.value)}
                                                      />
                                                  </div>
                              
                                             
                              
                                              
                              
                                                       {/* Origin */}
                                                  <div className="flex flex-col gap-1">
                                                      {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                                          Origin
                                                      </label> */}
                                                      <select
                                                          className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                                          onChange={(e) => setOrigin(e.target.value)}
                                                          value={origin}
                                                      >
                                                          <option value="">Origin (All)</option>
                                                          {Origin.map((item) => (
                                                              <option key={item} value={item}>{item}</option>
                                                          ))}
                                                      </select>
                              
                              
                              
                                                  </div>
      
                              {/* From Date */}
                              <div className="flex flex-col md:flex-row gap-1 md:items-center ">
                                  <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                      From
                                  </label>
                                  <Input
                                      type="date"
                                      className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                                      value={fromdate}
                                      onChange={(e) => setfromDate(e.target.value)}
                                  />
                              </div>
      
                              {/* To Date */}
                              <div className="flex flex-col md:flex-row gap-1 md:items-center">
                                  <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                      To
                                  </label>
                                  <Input
                                      type="date"
                                      className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                                      value={todate}
                                      onChange={(e) => settoDate(e.target.value)}
                                  />
                              </div>
      
                              <div className="flex flex-wrap justify-end sm:justify-between gap-3 mt-2 md:mt-0">
                                  <Button
                                      className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                      onClick={handleSearch}
                                  >
                                      <FaSearch size={14} />
                                      Search
                                  </Button>
      
                                  {checkpending("QCRCN") && <Button
                                      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                      onClick={exportToExcel}
                                  >
                                      <LuDownload size={16} />
      
                                  </Button>}
                              </div>
      
      
                          </div>
                      </div> 


        <Table className="mt-4">
          <TableHeader className="bg-neutral-100 text-stone-950 ">
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">Action</TableHead>
            <TableHead className="text-center">GatePass⠀No</TableHead>
            <TableHead className="text-center">Origin</TableHead>
            <TableHead className="text-center">Incoming⠀Date </TableHead>
            <TableHead className="text-center">Edit⠀Status</TableHead>
            <TableHead className="text-center">BL⠀No.</TableHead>
            <TableHead className="text-center">Con⠀No.</TableHead>
            <TableHead className="text-center">Entry⠀Truck⠀No.</TableHead>
            <TableHead className="text-center">BL⠀Weight</TableHead>
            <TableHead className="text-center">Bag⠀Count</TableHead>
            <TableHead className="text-center">QC⠀Approval⠀Status</TableHead>
            <TableHead className="text-center">Checked⠀By </TableHead>

            <TableHead className="text-center">Sampling⠀(%)</TableHead>
            <TableHead className="text-center">Moisture⠀(%)</TableHead>
            <TableHead className="text-center">Nut⠀Count⠀(Pcs)</TableHead>
            <TableHead className="text-center">Flute⠀Rate⠀(gm/Kg)</TableHead>
            <TableHead className="text-center">Good⠀Kernel⠀(gm)</TableHead>
            <TableHead className="text-center">SP+IM⠀(gm)</TableHead>
            <TableHead className="text-center">Reject⠀(gm)</TableHead>
            <TableHead className="text-center">Shell⠀(gm)</TableHead>

            <TableHead className="text-center">Outturn(Lbs)</TableHead>

            <TableHead className="text-center">Report⠀By</TableHead>



          </TableHeader>
          <TableBody>
            {pendingData.length > 0 ? (
              pendingData.map((item: QcRcnEntryData, idx) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell className="text-center">
                      <Popover>
                        <PopoverTrigger>

                          <button
                            className={`p-2 bg-white rounded  ${item.editStatus === "Pending" ||
                                item.rcnEntry.rcnStatus === "QC Rejected"
                                ? "text-red-500 h-8 w-20 border border-red-400 font-bold rounded-lg  hover:bg-red-200"
                                : "text-blue-500 h-8 w-20 border border-blue-400 font-bold rounded-lg  hover:bg-blue-200"
                              }`}
                            disabled={
                              item.rcnEntry.rcnStatus === "QC Rejected"
                                ? true
                                : false
                            }>
                            Action
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                          {item.rcnEntry.rcnStatus === "QC Pending" &&
                            item.editStatus !== "Pending" && (
                              <AlertDialog>
                                <AlertDialogTrigger className="flex">
                                  <FcApprove size={25} />{" "}
                                  <button className="bg-transparent  pl-1 text-left hover:text-green-500">
                                    QC Approve
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Do you want to Approve the RCN Incoming
                                      Entry?
                                    </AlertDialogTitle>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleQCApprove(item)}>
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          {item.rcnEntry.rcnStatus === "QC Pending" &&
                            item.editStatus !== "Pending" && (
                              <AlertDialog>
                                <AlertDialogTrigger className="flex mt-1">
                                  <FcDisapprove size={25} />{" "}
                                  <button className="bg-transparent pt-0.5 pl-1 text-left hover:text-red-500">
                                    QC Reject
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Do you want to Reject the RCN Incoming
                                      Entry?
                                    </AlertDialogTitle>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleQCReject(item)}>
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          {item.rcnEntry.rcnStatus === "QC Approved" &&
                            item.reportStatus === 0 &&
                            item.editStatus !== "Pending" && (
                              <Dialog>
                                <DialogTrigger className="flex py-1">
                                  <MdOutlineDriveFolderUpload
                                    size={20}
                                    color="green"
                                  />{" "}
                                  <button className="bg-transparent pl-2 text-left hover:text-green-500">
                                    Report Entry
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      <p className="text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold">
                                        QC Incoming RCN Report{" "}
                                      </p>
                                    </DialogTitle>
                                  </DialogHeader>
                                  <QCreportForm data={item} />
                                </DialogContent>
                              </Dialog>
                            )}
                          {item.rcnEntry.rcnStatus === "QC Approved" &&
                            item.reportStatus === 1 &&
                            item.editStatus !== "Pending" && (
                              <Dialog>
                                <DialogTrigger className="flex py-1">
                                  <LiaEdit size={20} />
                                  <button className="bg-transparent pl-2 text-left hover:text-green-500">
                                    Report Modify
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      <p className="text-1xl pb-1 text-center mt-5">
                                        Modify QC Incoming Report{" "}
                                      </p>
                                    </DialogTitle>
                                  </DialogHeader>
                                  <QCmodifyreportForm data={item} />
                                </DialogContent>
                              </Dialog>
                            )}
                          {item.editStatus === "Pending" && (
                            <AlertDialog>
                              <AlertDialogTrigger className="flex">
                                <FcApprove size={25} />{" "}
                                <button className="bg-transparent  pl-1 text-left hover:text-green-500">
                                  Edit Approve
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Do you want to Approve the Edit Request ?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleEditApprove(item)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          {item.editStatus === "Pending" && (
                            <AlertDialog>
                              <AlertDialogTrigger className="flex mt-1">
                                <FcDisapprove size={25} />{" "}
                                <button className="bg-transparent pt-0.5 pl-1 text-left hover:text-red-500">
                                  Edit Revert
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Do you want to Revert the Edit Request of QC
                                    Incoming Entry?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleEditReject(item)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-red-600">
                      {item.rcnEntry.gatePassNo}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-cyan-600">
                      {item.origin}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {handletimezone(item.date)}
                    </TableCell>
                    <TableCell className="text-center" > <button
                      className={`p-2 rounded w-20 border 
                                                               ${item.editStatus === "Approved"
                          ? "text-green-600 border-green-600 bg-green-50"
                          : item.editStatus === "NA"
                            ? "text-gray-700 border-gray-400 bg-gray-100"
                            : "text-red-600 border-red-600 bg-red-50"
                        }`}
                    >
                      {item.editStatus}
                    </button></TableCell>

                    <TableCell className="text-center">{item.blNo}</TableCell>
                    <TableCell className="text-center">{item.conNo}</TableCell>
                    <TableCell className="text-center">
                      {item.rcnEntry.truckNo}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.rcnEntry.blWeight}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.rcnEntry.noOfBags}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.rcnEntry.rcnStatus === "QC Approved" ? (
                        <p className="flex flex-row justify-center">
                          <SiTicktick color="green" size={18} />
                        </p>
                      ) : item.rcnEntry.rcnStatus === "QC Pending" ? (
                        <p className="flex flex-row justify-center">
                          <MdOutlinePendingActions color="red" size={23} />
                        </p>
                      ) : (
                        <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">
                          {item.rcnEntry.rcnStatus}
                        </button>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.qcapprovedBy ? item.qcapprovedBy : <p className="flex flex-row justify-center text-red-500 font-semibold">
                        Pending
                      </p>}
                    </TableCell>

                    {/* <TableCell className="text-center">

                                            <input type='checkbox' checked={item.reportStatus === 1 ? true : false} />
                                        </TableCell> */}
                    <TableCell className={`text-center  ${item.sampling ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.sampling ? `${item.sampling} %` : ""}
                    </TableCell>
                    <TableCell className={`text-center  ${item.moisture ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.moisture ? `${item.moisture} %` : ""}
                    </TableCell>
                    <TableCell className={`text-center  ${item.nutCount ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.nutCount ? `${item.nutCount} Pcs` : ""}
                    </TableCell>
                    <TableCell className={`text-center  ${item.fluteRate ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.fluteRate ? `${item.fluteRate} g/kg` : ""}
                    </TableCell>
                    <TableCell className={`text-center  ${item.goodKernel ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.goodKernel ? `${item.goodKernel} g` : ""}
                    </TableCell>
                    <TableCell className={`text-center  ${item.spIm ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.spIm ? `${item.spIm} g` : ""}
                    </TableCell>
                    <TableCell className={`text-center  ${item.reject ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.reject ? `${item.reject} g` : ""}
                    </TableCell>
                    <TableCell className={`text-center  ${item.shell ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.shell ? `${item.shell} g` : ""}
                    </TableCell>
                    <TableCell className={`text-center  ${item.outTurn ? 'bg-yellow-50' : 'text-red-500 font-semibold'}`}>
                      {item.outTurn ? `${item.outTurn} Lbs` : ""}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.createdBy ? item.createdBy : <p className="flex flex-row justify-center">
                        <MdOutlinePendingActions color="red" size={23} />
                      </p>}
                    </TableCell>


                  </TableRow>
                );
              })
            ) : Data.length > 0 ? (
              Data.map((item: QcRcnEntryData, idx) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      {limit * (page - 1) + idx + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      <Popover>
                        <PopoverTrigger>
                          <button
                            className={`p-2 bg-white rounded  ${item.editStatus === "Pending" ||
                                item.rcnEntry.rcnStatus === "QC Rejected"
                                ? "text-red-500 h-8 w-20 border border-red-400 font-bold rounded-lg  hover:bg-red-200"
                                : "text-blue-500 h-8 w-20 border border-blue-400 font-bold rounded-lg  hover:bg-blue-200"
                              }`}
                            disabled={
                              item.editStatus === "Pending" ||
                                item.rcnEntry.rcnStatus === "QC Rejected" ||
                                item.rcnEntry.editStatus === "Pending"
                                ? true
                                : false
                            }>
                            Action
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                          {item.rcnEntry.rcnStatus === "QC Pending" && (
                            <AlertDialog>
                              <AlertDialogTrigger className="flex">
                                <FcApprove size={25} />{" "}
                                <button className="bg-transparent  pl-1 text-left hover:text-green-500">
                                  QC Approve
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Do you want to Approve the RCN Incoming Entry?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleQCApprove(item)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          {item.rcnEntry.rcnStatus === "QC Pending" && (
                            <AlertDialog>
                              <AlertDialogTrigger className="flex mt-1">
                                <FcDisapprove size={25} />{" "}
                                <button className="bg-transparent pt-0.5 pl-1 text-left hover:text-red-500">
                                  QC Reject
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Do you want to Reject the RCN Incoming Entry?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleQCReject(item)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                          {item.rcnEntry.rcnStatus === "QC Approved" &&
                            item.reportStatus === 0 && (
                              <Dialog>
                                <DialogTrigger className="flex py-1">
                                  <MdOutlineDriveFolderUpload
                                    size={20}
                                    color="green"
                                  />
                                  <button className="bg-transparent pl-2 text-left hover:text-green-500">
                                    Report Entry
                                  </button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      <p className="text-1xl pb-1 text-center mt-5">
                                        QC Incoming RCN Report
                                      </p>
                                    </DialogTitle>
                                  </DialogHeader>
                                  <QCreportForm data={item} />
                                </DialogContent>
                              </Dialog>
                            )}
                          {item.rcnEntry.rcnStatus === "QC Approved" &&
                            item.reportStatus === 1 && (
                              <Dialog>
                                <DialogTrigger className="flex py-1">
                                  <LiaEdit size={20} />
                                  <button className="bg-transparent pl-2 text-left hover:text-green-500">
                                    Report Modify
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>
                                      <p className="text-lg text-gray-600 text-center py-3 tracking-wider drop-shadow-xl font-bold">
                                        Modify QC Incoming Report{" "}
                                      </p>
                                    </DialogTitle>
                                  </DialogHeader>
                                  <QCmodifyreportForm data={item} />
                                </DialogContent>
                              </Dialog>
                            )}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    <TableCell className="text-center font-bold text-purple-600">
                      {item.rcnEntry.gatePassNo}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-cyan-600">
                      {item.origin}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {handletimezone(item.date)}
                    </TableCell>
                    <TableCell className="text-center" > <button
                      className={`p-2 rounded w-20 border 
                                                               ${item.editStatus === "Approved"
                          ? "text-green-600 border-green-600 bg-green-50"
                          : item.editStatus === "NA"
                            ? "text-gray-700 border-gray-400 bg-gray-100"
                            : "text-red-600 border-red-600 bg-red-50"
                        }`}
                    >
                      {item.editStatus}
                    </button></TableCell>

                    <TableCell className="text-center">{item.blNo}</TableCell>
                    <TableCell className="text-center">{item.conNo}</TableCell>
                    <TableCell className="text-center">
                      {item.rcnEntry.truckNo}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.rcnEntry.blWeight}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.rcnEntry.noOfBags}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.rcnEntry.rcnStatus === "QC Approved" ? (
                        <p className="flex flex-row justify-center">
                          <SiTicktick color="green" size={18} />
                        </p>
                      ) : item.rcnEntry.rcnStatus === "QC Pending" ? (
                        <p className="flex flex-row justify-center">
                          <MdOutlinePendingActions color="red" size={23} />
                        </p>
                      ) : (
                        <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">
                          {item.rcnEntry.rcnStatus}
                        </button>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.qcapprovedBy ? item.qcapprovedBy : <p className="flex flex-row justify-center text-red-500 font-semibold">
                        Pending
                      </p>}
                    </TableCell>

                    {/* <TableCell className="text-center">

                                            <input type='checkbox' checked={item.reportStatus === 1 ? true : false} />
                                        </TableCell> */}
                    <TableCell className={`text-center font-semibold ${item.sampling ? 'bg-yellow-50' : 'text-red-500'}`}>
                      {item.sampling ? `${item.sampling} %` : ""}
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${item.moisture ? 'bg-yellow-50' : 'text-red-500 '}`}>
                      {item.moisture ? `${item.moisture} %` : ""}
                    </TableCell>
                    <TableCell className={`text-center font-semibold  ${item.nutCount ? 'bg-yellow-50' : 'text-red-500 '}`}>
                      {item.nutCount ? `${item.nutCount}` : ""}
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${item.fluteRate ? 'bg-yellow-50' : 'text-red-500 '}`}>
                      {item.fluteRate ? `${item.fluteRate} ` : ""}
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${item.goodKernel ? 'bg-yellow-50' : 'text-red-500 '}`}>
                      {item.goodKernel ? `${item.goodKernel} ` : ""}
                    </TableCell>
                    <TableCell className={`text-center font-semibold  ${item.spIm ? 'bg-yellow-50' : 'text-red-500 '}`}>
                      {item.spIm ? `${item.spIm} ` : ""}
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${item.reject ? 'bg-yellow-50' : 'text-red-500 '}`}>
                      {item.reject ? `${item.reject} ` : ""}
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${item.shell ? 'bg-yellow-50' : 'text-red-500 '}`}>
                      {item.shell ? `${item.shell} ` : ""}
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${item.outTurn ? 'bg-yellow-50' : 'text-red-500 '}`}>
                      {item.outTurn ? `${item.outTurn} ` : ""}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.createdBy ? item.createdBy : <p className="flex flex-row justify-center">
                        <MdOutlinePendingActions color="red" size={23} />
                      </p>}
                    </TableCell>


                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>

                <TableCell>
                  <p className="w-100 text-red-500 font-medium text-center pt-3 pb-10">
                    No Result{" "}
                  </p>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

         <Pagination style={{ display: blockpagen }} className="pt-5 flex flex-row justify-end ">
                     <PaginationContent className="">
                         {page > 1 && <PaginationItem>
                             <PaginationPrevious onClick={() => setPage((prev) => {
                                 if (prev === 1) {
                                     return prev
                                 }
                                 if (prev <= 0) {
                                     return prev + 1
                                 }
                                 return prev - 1
                             })} />
                         </PaginationItem>}
                         {page > 2 && <PaginationItem>
                             <PaginationLink onClick={() => setPage((prev) => prev - 2)}>{page - 2}</PaginationLink>
                         </PaginationItem>}
                         {page > 1 && <PaginationItem>
                             <PaginationLink onClick={() => setPage((prev) => prev - 1)}>{page - 1}</PaginationLink>
                         </PaginationItem>}
     
     
                         <PaginationItem>
                             <PaginationLink href="#" className="font-bold bg-blue-200  rounded-md">{page}</PaginationLink>
                         </PaginationItem>
                         <PaginationItem>
                             <PaginationLink onClick={() => setPage((prev) => prev + 1)}>{page + 1}</PaginationLink>
                         </PaginationItem>
                         <PaginationItem>
                             <PaginationLink onClick={() => setPage((prev) => prev + 2)}>{page + 2}</PaginationLink>
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
                                       



     


   
     

      

    
      <dialog id="qcapproveScsDialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
        <button
          id="qcapproveScscloseDialog"
          className="dashboard-modal-close-btn ">
          X{" "}
        </button>
        <span className="flex">
          <img src={tick} height={2} width={35} alt="tick_image" />
          <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-green-500">
            {successtext}
          </p>
        </span>

        {/* <!-- Add more elements as needed --> */}
      </dialog>

      <dialog id="qcRejectDialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
        <button id="qcrejectcloseDialog" className="dashboard-modal-close-btn ">
          X{" "}
        </button>
        <span className="flex">
          <img src={cross} height={25} width={25} alt="error_image" />
          <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">
            {errortext}
          </p>
        </span>

        {/* <!-- Add more elements as needed --> */}
      </dialog>
    </div>
  );
};

export default QCRcnTable;
