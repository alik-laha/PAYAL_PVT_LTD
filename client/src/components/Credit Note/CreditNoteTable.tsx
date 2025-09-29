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
  SelectGatePassType,
} from "../common/exportData";
import {
  pendingCheckRoles,
  PermissionRole,
  findskutypeData,
  rcvVillageInprimaryData,
  creditNoteEntryData,
} from "@/type/type";
import axios from "axios";

import { LuDownload } from "react-icons/lu";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Context from "../context/context";
import CreditNoteModify from "./CreditNoteModify";
//import RcvVillageInModify from "./RcvVillageInModify"

const CreditNoteTable = () => {
  const [Data, setData] = useState([]);

  // const [EditPendingData, setEditPendingData] = useState()

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
  const [gradeor, setgradeor] = useState<string>("");
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
      setblockpagen("none");
    }
  }, [editPendingCreditNoteData]);

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
      .get(`/api/rcvVillageIn/acceptEditVillageInPrimary/${item}`)
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
      .get(`/api/rcvVillageIn/rejectEditVillageInPrimary/${item}`)
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
        "/api/rcvVillageIn/getVillageInPrimary",
        {
          searchitem: blConNo,
          gatetype: selectType,
          fromDate: fromdate,
          toDate: todate,
          almondtype: origin,
          origin: originp,
          almondgrade: gradeor,
        }
      );
      const data1 = response.data.rcnEntries;
      console.log(data1);

      let ws;
      let transformed: any[] = [];
      if (EditData.length > 0) {
        transformed = EditData.map(
          (item: rcvVillageInprimaryData, idx: number) => ({
            id: idx + 1,
            gatePassNo: item.gatePassNo,
            gateType: item.gateType,
            ReceivingDate: handletimezone(item.recevingDate),
            Vehicle_No: item.truckNo,
            vendorName: item.vendorName,
            grossWt: formatNumber(item.grossWt),
            netWeight: item.netWeight ? item.netWeight : 0,
            type: item.type,
            grade: item.sku,
            invoice: item.invoice,
            origin: item.origin,

            totalWt: item.totalWt ? formatNumber(item.totalWt) : 0,
            wholes: formatNumber(item.wholes_quantity),
            wholes_prcntg: formatNumber(item.wholes_quantity),
            lw: formatNumber(item.lw_quantity),
            lw_prcntg: formatNumber(item.lw_prcntg),
            jb: formatNumber(item.jb_quantity),
            jb_prcntg: formatNumber(item.jb_prcntg),
            husk: formatNumber(item.husk_quantity),
            husk_prcntg: formatNumber(item.husk_prcntg),
            jbp: formatNumber(item.jbp_quantity),
            jbp_prcntg: formatNumber(item.jbp_prcntg),
            sdp: formatNumber(item.sdp_quantity),
            sdp_prcntg: formatNumber(item.sdp_prcntg),
            pieces: formatNumber(item.pieces_quantity),
            pieces_prcntg: formatNumber(item.pieces_prcntg),
            Unpeel: formatNumber(item.e1_quantity),
            Unpeel_prcntg: formatNumber(item.e1_prcntg),
            Item_Or_Bag_Count: item.quantity,
            editStatus: item.editStatus,
            createdBy: item.createdBy,
            ApprovedBy: item.approvedBy,
          })
        );
        ws = XLSX.utils.json_to_sheet(transformed);
      } else {
        transformed = data1.map(
          (item: rcvVillageInprimaryData, idx: number) => ({
            id: idx + 1,
            gatePassNo: item.gatePassNo,
            gateType: item.gateType,
            ReceivingDate: handletimezone(item.recevingDate),
            Vehicle_No: item.truckNo,
            vendorName: item.vendorName,
            grossWt: formatNumber(item.grossWt),
            netWeight: item.netWeight ? item.netWeight : 0,
            type: item.type,
            grade: item.sku,
            invoice: item.invoice,
            origin: item.origin,

            totalWt: item.totalWt ? formatNumber(item.totalWt) : 0,
            wholes: formatNumber(item.wholes_quantity),
            wholes_prcntg: formatNumber(item.wholes_quantity),
            lw: formatNumber(item.lw_quantity),
            lw_prcntg: formatNumber(item.lw_prcntg),
            jb: formatNumber(item.jb_quantity),
            jb_prcntg: formatNumber(item.jb_prcntg),
            husk: formatNumber(item.husk_quantity),
            husk_prcntg: formatNumber(item.husk_prcntg),
            jbp: formatNumber(item.jbp_quantity),
            jbp_prcntg: formatNumber(item.jbp_prcntg),
            sdp: formatNumber(item.sdp_quantity),
            sdp_prcntg: formatNumber(item.sdp_prcntg),
            pieces: formatNumber(item.pieces_quantity),
            pieces_prcntg: formatNumber(item.pieces_prcntg),
            Unpeel: formatNumber(item.e1_quantity),
            Unpeel_prcntg: formatNumber(item.e1_prcntg),

            Item_Or_Bag_Count: item.quantity,
            editStatus: item.editStatus,
            createdBy: item.createdBy,
            ApprovedBy: item.approvedBy,
          })
        );
        // setTransformedData(transformed);
        ws = XLSX.utils.json_to_sheet(transformed);
      }
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, "Village_In_Primary_Material_" + currDate + ".xlsx");
    } else {
      const response = await axios.post("/api/rcvVillageIn/getVLOTDetails", {
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
        VlotNo: item.vlotNo,
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
      saveAs(blob, "VLOT_Details_" + currDate + ".xlsx");
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
      <div className="ml-5 mt-5 ">
        <div className="w-full ">
          <select
            className="mb-5 h-10 bg-purple-100 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            onChange={(e) => setsearchType(e.target.value)}
            value={searchType}>
            {dropdown.map((data, index) => (
              <option
                className="relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                value={data}
                key={index}>
                {data}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flexbox-search">
          <Input
            className="no-padding w-1/7 "
            placeholder={
              searchType === "Credit Details" ? " GatePass No" : "V-Lot No"
            }
            value={blConNo}
            onChange={(e) => setBlConNo(e.target.value)}
          />
          {searchType === "Credit Details" && (
            <select
              className="flexbox-search-width flex h-8 w-1/7 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              onChange={(e) => setOrigin(e.target.value)}
              value={origin}>
              <option
                className="relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                value="">
                Type (All)
              </option>
              {sku.map((data, index) => (
                <option
                  className="relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  value={data.sku}
                  key={index}>
                  {data.sku}
                </option>
              ))}
            </select>
          )}

          <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">
            From{" "}
          </label>
          <Input
            className="w-1/7 flexbox-search-width-calender"
            type="date"
            value={fromdate}
            onChange={(e) => setfromDate(e.target.value)}
            placeholder="From Date"
          />
          <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">
            To{" "}
          </label>
          <Input
            className="w-1/7 flexbox-search-width-calender"
            type="date"
            // value={hidetodate}
            // onChange={handleTodate}
            value={todate}
            onChange={(e) => settoDate(e.target.value)}
            placeholder="To Date"
          />

          <select
            className="flexbox-search-width flex h-8 w-1/7 no-margin-left-absolute ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            onChange={(e) => setOriginp(e.target.value)}
            value={originp}>
            <option
              className="relative flex w-full cursor-default select-none items-center rounded-sm 
                                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              value="">
              Origin (All)
            </option>
            {Origin.map((data, index) => (
              <option
                className="relative flex w-full cursor-default select-none items-center rounded-sm 
                                                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                value={data}
                key={index}>
                {data}
              </option>
            ))}
          </select>

          <span className="w-1/8 ml-6 no-margin">
            <Button className="bg-slate-500 h-8" onClick={handleSearch}>
              <FaSearch size={15} /> Search
            </Button>
          </span>
        </div>
        {checkpending("Village") && (
          <span className="w-1/8 ">
            <Button
              className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4"
              onClick={exportToExcel}>
              <LuDownload size={18} />
            </Button>{" "}
          </span>
        )}

        {searchTableType === "Credit Details" ? (
          <Table className="mt-4">
            <TableHeader className="bg-neutral-100 text-stone-950 ">
              <TableHead className="text-center">Id</TableHead>
              <TableHead className="text-center">GatePass_No</TableHead>
              <TableHead className="text-center">GatePass_Type</TableHead>
              <TableHead className="text-center">Receiving_Date</TableHead>
              <TableHead className="text-center">Vehicle_No</TableHead>
              <TableHead className="text-center">Initial_Weight</TableHead>
              <TableHead className="text-center">Credit_Note_No</TableHead>
              <TableHead className="text-center">Receiving_Origin</TableHead>
              <TableHead className="text-center">Item_Type</TableHead>
              <TableHead className="text-center">Grade_Name</TableHead>

              <TableHead className="text-center">Net_Weight</TableHead>
              <TableHead className="text-center">Vendor_Name</TableHead>

              <TableHead className="text-center">Qty/Bag_Count</TableHead>
              <TableHead className="text-center">Total_Weight(Kg)</TableHead>

              <TableHead className="text-center">Item_Unit_Price</TableHead>
              <TableHead className="text-center">Total_Bill_Amount</TableHead>

              <TableHead className="text-center">Edit Status </TableHead>
              <TableHead className="text-center">Item_Remarks</TableHead>
              <TableHead className="text-center">Created_By </TableHead>
              <TableHead className="text-center">Approved_By </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableHeader>
            <TableBody>
              {EditData.length > 0 ? (
                EditData.map((item: creditNoteEntryData, idx: number) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="text-center font-bold">
                        {idx + 1}
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
                      <TableCell className="text-center font-bold bg-purple-500 text-white">
                        {item.creditNoteNo}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-cyan-600">
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
                      <TableCell className="text-center">
                        <Popover>
                          <PopoverTrigger>
                            <button className="bg-cyan-500 p-2 text-white rounded">
                              Action
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                            <AlertDialog>
                              <AlertDialogTrigger className="flex">
                                <FcApprove size={25} />{" "}
                                <button className="bg-transparent pb-2 pl-1 text-left hover:text-green-500">
                                  Approve
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
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
                              <AlertDialogTrigger className="flex mt-2">
                                <FcDisapprove size={25} />{" "}
                                <button className="bg-transparent pt-0.5 pl-1 text-left hover:text-red-500">
                                  Revert
                                </button>
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
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : Data.length > 0 ? (
                Data.map((item: creditNoteEntryData, idx: number) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        {limit * (page - 1) + idx + 1}
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
                      <TableCell className="text-center font-bold bg-purple-500 text-white">
                        {item.creditNoteNo}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-cyan-600">
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
                      <TableCell className="text-center">
                        <Popover>
                          <PopoverTrigger>
                            <button
                              className={`p-2 text-white rounded ${
                                item.editStatus === "Pending"
                                  ? "bg-cyan-200"
                                  : "bg-cyan-500"
                              }`}
                              disabled={
                                item.editStatus === "Pending" ? true : false
                              }>
                              Action
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                            <Dialog>
                              <DialogTrigger className="flex">
                                <CiEdit size={20} />
                                <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500">
                                  Modify
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    <p className="text-1xl pb-1 text-center mt-5">
                                      Village Item Modification
                                    </p>
                                  </DialogTitle>
                                  <DialogDescription>
                                    <p className="text-1xl text-center">
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
              <TableHead className="text-center">VLOT-NO</TableHead>
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
                       
                        {item.vlotNo}
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
                      No Result{" "}
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
        <Pagination className="pt-5 " style={{ display: blockpagen }}>
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
        </Pagination>
        <dialog id="recevingeditapprove" className="dashboard-modal">
          <button
            id="recevingeditapproveclose"
            className="dashboard-modal-close-btn ">
            X{" "}
          </button>
          <span className="flex">
            <img src={tick} height={2} width={35} alt="tick_image" />
            <p id="modal-text" className="pl-3 mt-1 font-medium">
              Modification Request has Been Approved
            </p>
          </span>

          {/* <!-- Add more elements as needed --> */}
        </dialog>

        <dialog id="recevingeditreject" className="dashboard-modal">
          <button
            id="recevingeditrejectclose"
            className="dashboard-modal-close-btn ">
            X{" "}
          </button>
          <span className="flex">
            <img src={cross} height={25} width={25} alt="error_image" />
            <p id="modal-text" className="pl-3 mt-1 text-base font-medium">
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
