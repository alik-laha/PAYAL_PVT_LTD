import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { pagelimit, pageNo } from "../common/exportData";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, toZonedTime } from "date-fns-tz";
import { LuDownload } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiEdit } from "react-icons/ci";
import ModifyBucket from "./QCOnlineBucketModify";
import { BiErrorCircle } from "react-icons/bi";
import { SiTicktick } from "react-icons/si";
//import EditQCOnlinePouch from "./QCOnlinePouchModify";

const QCOnlineBucketTable = () => {
  const [fromdate, setfromDate] = useState<string>("");
  const [todate, settoDate] = useState<string>("");
  const [page, setPage] = useState(pageNo);
  const [blockpagen, setblockpagen] = useState("flex");
  const limit = pagelimit;
  const [ItemWiseData, setItemWiseData] = useState<any[]>([]);

  const currDate = new Date().toLocaleDateString();

  useEffect(() => {
    setblockpagen("flex");
    handleSearch();
  }, [page]);

  const handleSearch = async () => {
    const response = await axios.post(
      "/api/qconline/searchQCOnlineBucket",
      { fromDate: fromdate, toDate: todate },
      { params: { page, limit } }
    );
    const data = await response.data;
    setItemWiseData(data);
    if (data.length === 0 && page > 1) setPage((prev) => prev - 1);
  };

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

  const exportToExcel = async () => {
    const response = await axios.post("/api/qconline/searchQCOnlineBucket", {
      fromDate: fromdate,
      toDate: todate,
    });
    const data = await response.data;

    const transformed = data.map((item: any, idx: number) => ({
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
    }));

    const ws = XLSX.utils.json_to_sheet(transformed);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pouch_Report");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "QC_Bucket_Report_" + currDate + ".xlsx");
  };

  return (
    <div className="ml-5 mt-5 ">
      {/* Filters */}
      <div className="flex justify-center">
        <label className="font-semibold mt-1 ml-8 mr-5">From </label>
        <Input
          className="w-1/6"
          type="date"
          value={fromdate}
          onChange={(e) => setfromDate(e.target.value)}
        />
        <label className="font-semibold mt-1 ml-8 mr-5">To </label>
        <Input
          className="w-1/6"
          type="date"
          value={todate}
          onChange={(e) => settoDate(e.target.value)}
        />
        <span className="ml-6">
          <Button className="bg-slate-500 h-8" onClick={handleSearch}>
            <FaSearch size={15} /> Search
          </Button>
        </span>
      </div>

      {/* Download */}
      <span className="w-1/8 ">
        <Button
          className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4"
          onClick={exportToExcel}
        >
          <LuDownload size={18} />
        </Button>
      </span>

      {/* Table */}
      <Table className="mt-4">
        <TableHeader className="bg-neutral-100 text-stone-950 ">
          <TableHead className="text-center">Id</TableHead>
           <TableHead className="text-center">Action</TableHead>
          <TableHead className="text-center">Entry⠀Date</TableHead>
          <TableHead className="text-center">Entry⠀Time</TableHead>
          <TableHead className="text-center">Entry⠀Lot⠀No</TableHead>
          <TableHead className="text-center">Batch⠀No</TableHead>
          <TableHead className="text-center">Origin</TableHead>
          <TableHead className="text-center">Grade⠀Name</TableHead>
          <TableHead className="text-center">Moisture⠀%</TableHead>
          <TableHead className="text-center">Nut⠀Count</TableHead>
          <TableHead className="text-center">Avg⠀Weight</TableHead>
          <TableHead className="text-center">Packet⠀Quality</TableHead>
         
          <TableHead className="text-center">Cleaning⠀Status</TableHead>
          <TableHead className="text-center">Maintainance⠀Status</TableHead>
           <TableHead className="text-center">Pkt⠀Quality⠀Remarks</TableHead>
          <TableHead className="text-center">Cleaning⠀Remarks</TableHead>
          <TableHead className="text-center">Maintainance⠀Remarks</TableHead>
          <TableHead className="text-center">Remarks</TableHead>
          <TableHead className="text-center">Created⠀By</TableHead>
          <TableHead className="text-center">Modified⠀By</TableHead>
         
        </TableHeader>
        <TableBody>
          {ItemWiseData.length > 0 ? (
            ItemWiseData.map((item: any, idx: number) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">
                  {(limit * (page - 1)) + idx + 1}
                </TableCell>
                
                <TableCell className="text-center">
                  <Popover>
                    <PopoverTrigger>
                 <button className={`p-1 bg-white rounded  h-8  w-20 border  font-bold   ${item.editStatus === 'Pending' ? 'text-red-800 border-red-500' : 'text-blue-800 border-blue-500'}`} disabled={item.editStatus === 'Pending' ? true : false}>
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
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>
                              <p className="text-1xl pb-1 text-center mt-5">
                                QC Online Pouch Modify
                              </p>
                            </DialogTitle>
                          </DialogHeader>
                          <ModifyBucket data={item} />
                        </DialogContent>
                      </Dialog>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {handletimezone(item.date)}
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {handleAMPM(item.time)}
                </TableCell>
                <TableCell className="text-center font-semibold text-red-500">{item.LotNo}</TableCell>
                <TableCell className="text-center text-red-500 font-semibold">{item.BatchNo}</TableCell>
                <TableCell className="text-center font-semibold text-cyan-500">{item.Origin}</TableCell>
                <TableCell className="text-center">{item.Grade}</TableCell>
                <TableCell className="text-center">{item.moisture} %</TableCell>
                <TableCell className="text-center">{item.nutcount}</TableCell>
                <TableCell className="text-center">{item.avgWeight}</TableCell>
                 {/* Status Buttons */}
                 <TableCell className="text-center">
                                                                                
                                                                                 {item.pktQuality === "OK" ? (
                                                                                   <p className="flex flex-row justify-center">
                                                                                     <SiTicktick color="green" size={18} />
                                                                                   </p>
                                                                                 ) : item.pktQuality === "NOT OK" ? (
                                                                                   <p className="flex flex-row justify-center">
                                                                                     <BiErrorCircle color="red" size={23} />
                                                                                   </p>
                                                                                 ) : (
                                                                                   item.pktQuality
                                                                                 )}
                                                                               </TableCell>
               
                               {/* Status Buttons */}
                                  <TableCell className="text-center">
                                                                                
                                                                                 {item.cleaningStatus === "OK" ? (
                                                                                   <p className="flex flex-row justify-center">
                                                                                     <SiTicktick color="green" size={18} />
                                                                                   </p>
                                                                                 ) : item.cleaningStatus === "NOT OK" ? (
                                                                                   <p className="flex flex-row justify-center">
                                                                                     <BiErrorCircle color="red" size={23} />
                                                                                   </p>
                                                                                 ) : (
                                                                                   item.cleaningStatus
                                                                                 )}
                                                                               </TableCell>
                                                                               <TableCell className="text-center">
                                                                              
                                                                                 {item.maintainance === "OK" ? (
                                                                                   <p className="flex flex-row justify-center">
                                                                                     <SiTicktick color="green" size={18} />
                                                                                   </p>
                                                                                 ) : item.maintainance === "NOT OK" ? (
                                                                                   <p className="flex flex-row justify-center">
                                                                                     <BiErrorCircle color="red" size={23} />
                                                                                   </p>
                                                                                 ) : (
                                                                                   item.maintainance
                                                                                 )}
                                                                               </TableCell>
  <TableCell className="text-center">{item.pktQualityRemarks ? item.pktQualityRemarks:'NA'}</TableCell>
                <TableCell className="text-center">{item.cleanRemarks ? item.cleanRemarks:'OK'}</TableCell>
               
                <TableCell className="text-center">{item.maintainanceRemarks ? item.maintainanceRemarks:'OK'}</TableCell>
                <TableCell className="text-center">{item.Remarks ? item.Remarks:''}</TableCell>
                <TableCell className="text-center">{item.createdBy}</TableCell>
                <TableCell className="text-center">{item.modifiedBy ?? "-"}</TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={18}
                className="text-center text-red-500 py-6"
              >
                No Result
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination  style={{ display: blockpagen }} className="pt-5 flex flex-row justify-end ">
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
  );
};

export default QCOnlineBucketTable;
