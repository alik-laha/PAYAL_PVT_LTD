import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import tick from "../../assets/Static_Images/Flat_tick_icon.svg.png";
import cross from "../../assets/Static_Images/error_img.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { format, toZonedTime } from "date-fns-tz";
import { FaSearch } from "react-icons/fa";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CiEdit } from "react-icons/ci";
import {
  Origin,
  pagelimit,
  pendingCheckRole,
} from "../common/exportData";
import {
  pendingCheckRoles,
  PermissionRole,
  findskutypeData,
  creditNoteEntryData,
} from "@/type/type";
import axios from "axios";

import { LuDownload } from "react-icons/lu";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Context from "../context/context";
import CreditNoteModify from "./CreditNoteModify";


const CreditNoteTable = (props:any) => {
  const [Data, setData] = useState([]);
  const [fromdate, setfromDate] = useState("");
  // const [hidetodate, sethidetoDate] = useState('')
  const [todate, settoDate] = useState("");
  const [page, setPage] = useState(1);
  const limit = pagelimit;
  const currDate = new Date().toLocaleDateString();
  const successdialog = document.getElementById(
    "recevingeditapprove"
  ) as HTMLInputElement;
  const closeDialogButton = document.getElementById(
    "recevingeditapproveclose"
  ) as HTMLInputElement;
  const errordialog = document.getElementById(
    "recevingeditreject"
  ) as HTMLInputElement;
  const errorcloseDialogButton = document.getElementById(
    "recevingeditrejectclose"
  ) as HTMLInputElement;

  const [sku, setsku] = useState<findskutypeData[]>([]);
  const [EditData, setEditData] = useState<creditNoteEntryData[]>([]);
  const { editPendingCreditNoteData } = useContext(Context);
  const [blConNo, setBlConNo] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [originp, setOriginp] = useState<string>("");
  const [blockpagen, setblockpagen] = useState("flex");
  const [searchType, setsearchType] = useState("Credit Details");
  const [searchTableType, setsearchtableType] = useState("Credit Details");
  const dropdown = ["Credit Details", "R-LOT Details"];

  if (closeDialogButton) {
    closeDialogButton.addEventListener("click", () => {
      if (successdialog != null) {
        (successdialog as any).close();
        window.location.reload();
      }
    });
  }
  if (errorcloseDialogButton) {
    errorcloseDialogButton.addEventListener("click", () => {
      if (errordialog != null) {
        (errordialog as any).close();
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    if (editPendingCreditNoteData.length > 0) {
      //console.log(editPendingData)
      setEditData(editPendingCreditNoteData);
           if(props.props==='edit'){ setblockpagen('none')}
    }
  }, [editPendingCreditNoteData, props.props]);

  // const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

  //     const selected = e.target.value;
  //     if (!selected) {
  //         settoDate('')
  //         sethidetoDate('')
  //         return
  //     }
  //     const date = new Date(selected)
  //     date.setDate(date.getDate() + 1);
  //     const nextday = date.toISOString().split('T')[0];
  //     sethidetoDate(selected)
  //     settoDate(nextday)
  // }
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
  const handleSearch = () => {
    setEditData([]);
    searchData();
  };
  const handleApprove = (item: number) => {
    console.log(item);
    axios
      .get(`/api/creditNote/acceptEditCreditNotePrimary/${item}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          (successdialog as any).showModal();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRejection = (item: number) => {
    axios
      .get(`/api/creditnote/rejectEditCreditNotePrimary/${item}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          (errordialog as any).showModal();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchData = () => {
    setblockpagen("flex");
    if (searchType === "Credit Details") {
      axios
        .post(
          "/api/creditNote/getcreditNotePrimary",
          {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            almondtype: origin,
            origin: originp,
          },
          { params: { page: page, limit: limit } }
        )
        .then((res) => {
          setData(res.data.rcnEntries);
          setsearchtableType("Credit Details");
          if (res.data.rcnEntries.length === 0 && page > 1) {
            setPage((prev) => prev - 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          "/api/creditNote/getRLOTDetails",
          {
            searchitem: blConNo,

            fromDate: fromdate,
            toDate: todate,
            origin: originp,
          },
          { params: { page: page, limit: limit } }
        )
        .then((res) => {
          setData(res.data.rcnEntries);
          setsearchtableType("R-LOT Details");
          if (res.data.rcnEntries.length === 0 && page > 1) {
            setPage((prev) => prev - 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .put("/api/vendorSKU/getItembySection/Item Type", {
        section: "CreditNote",
      })
      .then((res) => {
        //console.log(res.data)
        setsku(res.data);
        //console.log(sku)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    searchData();
    //GetPendingEdit()
  }, [page]);

  const exportToExcel = async () => {
    if (searchType === "Credit Details") {
      const response = await axios.post(
        "/api/creditNote/getcreditNotePrimary",
          {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            almondtype: origin,
            origin: originp,
          }
      );
      const data1 = response.data.rcnEntries;
      console.log(data1);

      let ws;
      let transformed: any[] = [];
      if (EditData.length > 0) {
        transformed = EditData.map(
          (item: creditNoteEntryData, idx: number) => ({
    id: idx + 1,
    GateType: item.gateType,
    gatePassNo: item.gatePassNo,
    grossWt: formatNumber(item.grossWt),
    netWeight: formatNumber(item.netWeight),
    ReceivingDate: handletimezone(item.recevingDate),
    truckNo: item.truckNo,
    //creditNoteDate: handletimezone(item.creditNoteDate),
    creditNoteNo: item.creditNoteNo,
    gradeName: item.gradeName , // fallback if old key
    origin: item.origin,
    vendorName: item.vendorName,
    type: item.type,
    quantity: formatNumber(item.quantity),
    totalWt: formatNumber(item.totalWt),
    unitPrice: formatNumber(item.unitPrice),
    totalBill: formatNumber(item.totalBill),
    editStatus: item.editStatus,
    remarks: item.remarks || "",
    createdBy: item.createdBy,
    approvedBy: item.approvedBy,
          })
        );
        ws = XLSX.utils.json_to_sheet(transformed);
      } else {
        transformed = data1.map(
          (item: creditNoteEntryData, idx: number) => ({
              id: idx + 1,
    GateType: item.gateType,
    gatePassNo: item.gatePassNo,
    grossWt: formatNumber(item.grossWt),
    netWeight: formatNumber(item.netWeight),
    ReceivingDate: handletimezone(item.recevingDate),
    truckNo: item.truckNo,
    //creditNoteDate: handletimezone(item.creditNoteDate),
    creditNoteNo: item.creditNoteNo,
    gradeName: item.gradeName , // fallback if old key
    origin: item.origin,
    vendorName: item.vendorName,
    type: item.type,
    quantity: formatNumber(item.quantity),
    totalWt: formatNumber(item.totalWt),
    unitPrice: formatNumber(item.unitPrice),
    totalBill: formatNumber(item.totalBill),
    editStatus: item.editStatus,
    remarks: item.remarks || "",
    createdBy: item.createdBy,
    approvedBy: item.approvedBy,
          })
        );
        // setTransformedData(transformed);
        ws = XLSX.utils.json_to_sheet(transformed);
      }
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, "CreditNote_Primary_Material_" + currDate + ".xlsx");
    } else {
      const response = await axios.post("/api/creditNote/getRLOTDetails", {
        searchitem: blConNo,

        fromDate: fromdate,
        toDate: todate,
        origin: originp,
      });
      const data1 = response.data.rcnEntries;
      console.log(data1);
      let ws;
      let transformed: any[] = [];
      transformed = data1.map((item: any, idx: number) => ({
        id: idx + 1,
        RlotNo: item.rlotNo,
        Creation_Date: handletimezone(item.recevingDate),
        Origin: item.origin,
        Entry_Weight: formatNumber(item.qty),
        Actual_Weight: formatNumber(item.actual_qty),
        Loss_Kg: formatNumber(item.loss),
        Loss_Prcntg: formatNumber(item.loss_prcntg),
        Created_By: item.createdBy,
      }));
      ws = XLSX.utils.json_to_sheet(transformed);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, "RLOT_Details_" + currDate + ".xlsx");
    }
  };
  const Role = localStorage.getItem("role") as keyof PermissionRole;
  const checkpending = (tab: string) => {
    //console.log(Role)
    if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
      return true;
    } else {
      return false;
    }
  };

  function formatNumber(num: string) {
    return Number.isInteger(Number(num))
      ? parseInt(num)
      : parseFloat(num).toFixed(2);
  }

  return (
    <>
      <div className="mx-2">
      

      {props.props==='edit' ?'':<div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
          {/* Main dropdown selector */}


          {/* Grid filter section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-end">
            <div className="flex flex-col gap-1">
              {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400 block mb-1">
                Search Type
              </label> */}
              <select
                className="select-with-icon bg-yellow-100 w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 dark:text-gray-200 appearance-none font-bold"
                onChange={(e) => setsearchType(e.target.value)}
                value={searchType}
              >
                {dropdown.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            {/* GatePass or R-Lot No */}
            <div className="flex flex-col gap-1">
              {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                {searchType === "Credit Details" ? "GatePass No." : "R-Lot No."}
              </label> */}
              <Input
                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                placeholder={
                  searchType === "Credit Details" ? "Enter GatePass No." : "Enter R-Lot No."
                }
                value={blConNo}
                onChange={(e) => setBlConNo(e.target.value)}
              />
            </div>

            {/* SKU Type (conditional) */}
            {searchType === "Credit Details" && (
              <div className="flex flex-col gap-1">
                {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                  Type
                </label> */}
                <select
                  className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                  onChange={(e) => setOrigin(e.target.value)}
                  value={origin}
                >
                  <option value="">Type (All)</option>
                  {sku.map((data, index) => (
                    <option key={index} value={data.sku}>
                      {data.sku}
                    </option>
                  ))}
                </select>
              </div>
            )}

          

            {/* Origin Select */}
            <div className="flex flex-col gap-1">
              {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                Origin
              </label> */}
              <select
                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                onChange={(e) => setOriginp(e.target.value)}
                value={originp}
              >
                <option value="">Origin (All)</option>
                {Origin.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
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

            {/* Buttons Section */}
            <div className="flex flex-wrap justify-end md:justify-end gap-3 mt-2 md:mt-0 col-span-full">
              <Button
                className="flex w-36 items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                onClick={handleSearch}
              >
                <FaSearch size={14} />
                Search
              </Button>

              {checkpending("RCNPrimary") && (
                <Button
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                  onClick={exportToExcel}
                >
                  <LuDownload size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>}  

         {checkpending("RCNPrimary") && props.props==='edit' &&(
                <Button
                  className="flex justify-end items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                  onClick={exportToExcel}
                >
                  <LuDownload size={16} />
                </Button>
              )}
             
        {searchTableType === "Credit Details" ? (
          <Table className="mt-4">
            <TableHeader className="bg-neutral-100 text-stone-950 ">
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`}>Id</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Action</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>GatePass_No</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>GatePass_Type</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Receiving_Date</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Vehicle_No</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Initial_Weight</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Credit_Note_No</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Receiving_Origin</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Item_Type</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Grade_Name</TableHead>

              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Net_Weight</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Vendor_Name</TableHead>

              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Qty/Bag_Count</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Total_Weight(Kg)</TableHead>

              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Item_Unit_Price</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Total_Bill_Amount</TableHead>

              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Edit_Status </TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Item_Remarks</TableHead>
              <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Created_By </TableHead>
              {props.props==='non-edit' && <TableHead className="text-center">Approved_By </TableHead>}
             
            </TableHeader>
            <TableBody>
              {(EditData.length > 0 && props.props==='edit') ? (
                EditData.map((item: creditNoteEntryData, idx: number) => {
                  return (
                    
                    <TableRow key={item.id}>
                      <TableCell className="text-center font-bold">
                        {idx + 1}
                      </TableCell>
                     <TableCell className="text-center flex flex-row gap-3">
                        {/* <Popover>
                          <PopoverTrigger>
                            <button className="bg-cyan-500 p-2 text-white rounded">
                              Action
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="flex flex-col w-30 text-sm font-medium ">
                           
                          </PopoverContent>
                        </Popover> */}

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
                                    onClick={() => handleApprove(item.id)}>
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
                                    onClick={() => handleRejection(item.id)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                      </TableCell>
                     <TableCell className="text-center font-bold">
                        {item.gatePassNo}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-red-600">
                        {item.gateType}
                      </TableCell>
                      <TableCell className="text-center">
                        {handletimezone(item.recevingDate)}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.truckNo}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.grossWt)}
                      </TableCell>
                      <TableCell className="text-cente">
                        <button className="text-purple-500 bg-white border boreder-purple-400 w-40 font-bold rounded">
                           {item.creditNoteNo}
                        </button>
                       
                      </TableCell>
                      <TableCell className="text-center font-semibold text-cyan-600">
                        {item.origin}
                      </TableCell>
                      <TableCell className="text-center">{item.type}</TableCell>
                      <TableCell className="text-center">
                        {item.gradeName}
                      </TableCell>

                      <TableCell className="text-center">
                        {item.netWeight ? item.netWeight : 0}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.vendorName}
                      </TableCell>

                      <TableCell className="text-center ">
                        {formatNumber(item.quantity)}
                      </TableCell>
                      <TableCell className="text-center font-bold ">
                        {formatNumber(item.totalWt)} Kg
                      </TableCell>
                      <TableCell className="text-center ">
                        {formatNumber(item.unitPrice)} &#8377;
                      </TableCell>

                      <TableCell className="text-center ">
                        {formatNumber(item.totalBill)} &#8377;
                      </TableCell>

                      <TableCell className="text-center">
                        {item.editStatus}
                      </TableCell>

                      <TableCell className="text-center">
                        {item.remarks}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.createdBy}
                      </TableCell>
                     {props.props==='non-edit' && <TableCell className="text-center">
                        {item.approvedBy}
                      </TableCell>}
                     
                    </TableRow>
                  );
                })
              ) :( Data.length  > 0 && props.props==='non-edit')? (
                Data.map((item: creditNoteEntryData, idx: number) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        {limit * (page - 1) + idx + 1}
                      </TableCell>
                       <TableCell className="text-center">
                        <Popover>
                           <PopoverTrigger>
                                                    <button className={`p-2 bg-white rounded ${item.editStatus === 'Pending' ? 'text-red-500 h-8  w-20 border border-red-400 font-bold rounded-lg opacity-60 hover:bg-red-200' : 'text-blue-500 h-8  w-20 border border-blue-400 font-bold rounded-lg hover:bg-blue-200'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                                </PopoverTrigger>
                          <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                            <Dialog>
                              <DialogTrigger className="flex">
                                <CiEdit size={20} />
                                <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500">
                                  Modify
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    <p className="text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold">
                                      Credit Note Item Modification
                                    </p>
                                  </DialogTitle>
                                  <DialogDescription>
                                    <p className="text-1xl text-center mb-2">
                                      To Be Filled Up By Dispatch Supervisor
                                    </p>
                                  </DialogDescription>
                                </DialogHeader>
                                <CreditNoteModify data={item} />
                              </DialogContent>
                            </Dialog>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {item.gatePassNo}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-red-600">
                        {item.gateType}
                      </TableCell>
                      <TableCell className="text-center">
                        {handletimezone(item.recevingDate)}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.truckNo}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatNumber(item.grossWt)}
                      </TableCell>
                      <TableCell className="text-center font-bold  ">
                        {item.creditNoteNo}
                      </TableCell>
                      <TableCell className="text-center font-bold ">
                        {item.origin}
                      </TableCell>
                      <TableCell className="text-center">{item.type}</TableCell>
                      <TableCell className="text-center">
                        {item.gradeName}
                      </TableCell>

                      <TableCell className="text-center">
                        {item.netWeight ? item.netWeight : 0}{" "}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.vendorName}
                      </TableCell>

                      <TableCell className="text-center ">
                        {formatNumber(item.quantity)}
                      </TableCell>
                      <TableCell className="text-center font-bold ">
                        {formatNumber(item.totalWt)} Kg
                      </TableCell>
                      <TableCell className="text-center ">
                        {formatNumber(item.unitPrice)} &#8377;
                      </TableCell>

                      <TableCell className="text-center ">
                        {formatNumber(item.totalBill)} &#8377;
                      </TableCell>

                      <TableCell className="text-center">
                        {item.editStatus}
                      </TableCell>

                      <TableCell className="text-center">
                        {item.remarks}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.createdBy}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.approvedBy}
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
                  <TableCell>
                    <p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">
                      No Result{" "}
                    </p>
                  </TableCell>
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
        ) : (
          <Table className="mt-4">
            <TableHeader className="bg-neutral-100 text-stone-950 ">
              <TableHead className="text-center">Id</TableHead>
              <TableHead className="text-center">RLOT_NO</TableHead>
              <TableHead className="text-center">Origin</TableHead>
              <TableHead className="text-center">Date Of Entry</TableHead>
              <TableHead className="text-center">Receive Qty(Kg)</TableHead>
              <TableHead className="text-center">
                Actual Receive_Qty(Kg)
              </TableHead>
              <TableHead className="text-center">Receive_Loss(Kg)</TableHead>
              <TableHead className="text-center">Receive_Loss(%)</TableHead>
            </TableHeader>

            <TableBody>
              {Data.length > 0 ? (
                Data.map((item: any, idx) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        {limit * (page - 1) + idx + 1}
                      </TableCell>
                      <TableCell className="text-center font-bold text-red-500 ">
                       
                        {item.rlotNo}
                      </TableCell>
                      <TableCell className="text-center font-semibold  ">
                        {item.origin}
                      </TableCell>
                      <TableCell className="text-center font-semibold  ">
                        {handletimezone(item.recevingDate)}
                      </TableCell>
                      <TableCell className="text-center font-semibold ">
                        {formatNumber(item.qty)} Kg
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {formatNumber(item.actual_qty)} Kg
                      </TableCell>
                      <TableCell className="text-center font-semibold text-cyan-500">
                        {formatNumber(item.loss)} Kg
                      </TableCell>
                      <TableCell className="text-center font-semibold text-red-500">
                        {formatNumber(item.loss_prcntg)} %
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

                  <TableCell>
                    <p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">
                      No Result
                    </p>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        {props.props==='non-edit' && <Pagination className="pt-5 " style={{ display: blockpagen }}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setPage((prev) => {
                    if (prev === 1) {
                      return prev;
                    }
                    return prev - 1;
                  })
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>}
        <dialog id="recevingeditapprove" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
          <button
            id="recevingeditapproveclose"
            className="dashboard-modal-close-btn ">
            X{" "}
          </button>
          <span className="flex">
            <img src={tick} height={2} width={35} alt="tick_image" />
            <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">
              Modification Request has Been Approved
            </p>
          </span>

          {/* <!-- Add more elements as needed --> */}
        </dialog>

        <dialog id="recevingeditreject" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
          <button
            id="recevingeditrejectclose"
            className="dashboard-modal-close-btn ">
            X{" "}
          </button>
          <span className="flex">
            <img src={cross} height={25} width={25} alt="error_image" />
            <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">
              Modification Request has Been Reverted
            </p>
          </span>

          {/* <!-- Add more elements as needed --> */}
        </dialog>
      </div>
    </>
  );
};
export default CreditNoteTable;
