import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { format, toZonedTime } from "date-fns-tz";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { pagelimit, pageNo } from "../common/exportData";
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CiEdit } from "react-icons/ci";
import QCKORModify from "./QCKORModify";



const QCProductionKORTable = () => {

  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");
  const [page, setPage] = useState(pageNo);
  const [data, setData] = useState<any[]>([]);
  const limit = pagelimit;

  const currDate = new Date().toLocaleDateString();

  useEffect(() => {
    handleSearch();
  }, [page]);

  const handleSearch = async () => {

    const res = await axios.post(
      "/api/qconline/searchQCKOR",
      {
        fromDate: fromdate,
        toDate: todate,
      },
      {
        params: { page, limit },
      }
    );

    const result = res.data;

    setData(result);

    if (result.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  function formatDate(date: any) {
    if (!date) return "-";

    const local = toZonedTime(
      new Date(date),
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );

    return format(local, "dd-MM-yyyy", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }

  const exportToExcel = async () => {

    const res = await axios.post("/api/qcproduction/search", {
      fromDate: fromdate,
      toDate: todate,
    });

    const excelData = res.data.map((item: any, i: number) => ({
      Sl_No: i + 1,
      Lot_No: item.LotNo,
      Date: formatDate(item.date),
      Origin: item.origin,
      QC_KOR: item.qcKOR,
      Prod_KOR: item.prodKOR,
      Borma_Loss: item.BormaLoss,
      QC_Borma_Loss: item.qcBormaLoss,
      Borma_Status: item.BormaStatus,
      Created_By: item.CreatedBy,
      Modified_By: item.modifiedBy,
      Production_Date: formatDate(item.proddate),
      Prod_Borma_Date: formatDate(item.prodbormadate),
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "QC_Production");

    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([wbout], {
      type: "application/octet-stream",
    });

    saveAs(blob, "QC_Production_Report_" + currDate + ".xlsx");
  };

  return (
    <div className="ml-5 mt-5">

      {/* Search */}
      <div className="flex justify-center">

        <label className="font-semibold mt-1 ml-8 mr-5">From</label>

        <Input
          className="w-1/6"
          type="date"
          value={fromdate}
          onChange={(e) => setfromDate(e.target.value)}
        />

        <label className="font-semibold mt-1 ml-8 mr-5">To</label>

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

      {/* Excel Download */}

      <Button
        className="bg-green-700 h-8 mt-4 float-right mr-4"
        onClick={exportToExcel}
      >
        <LuDownload size={18} />
      </Button>

      {/* Table */}

      <Table className="mt-4">

        <TableHeader className="bg-neutral-100">

         

            <TableHead className="text-center">Sl⠀NO</TableHead>
            <TableHead className="text-center">Action</TableHead>
            <TableHead className="text-center">ENTRY⠀Lot⠀No</TableHead>
            <TableHead className="text-center">QC⠀ENTRY⠀Date</TableHead>
           
              <TableHead className="text-center">Prod⠀KOR⠀Date</TableHead>
            <TableHead className="text-center">Prod⠀Borma⠀Date</TableHead>
             <TableHead className="text-center">Entry⠀Origin</TableHead>
            <TableHead className="text-center">Prod⠀KOR</TableHead>
           
             <TableHead className="text-center">QC⠀KOR</TableHead>
              <TableHead className="text-center">Prod⠀Borma⠀Loss</TableHead>
            <TableHead className="text-center">QC⠀Borma⠀Loss</TableHead>
           
         
            <TableHead className="text-center">Created⠀By</TableHead>
            <TableHead className="text-center">Modified⠀By</TableHead>

          </TableHeader>

        

        <TableBody>

          {data.length > 0 ? (
            data.map((item, idx) => (

              <TableRow key={item.id}>

                <TableCell className="text-center">
                  {(limit * (page - 1)) + idx + 1}
                </TableCell>
                 <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className={`p-1 bg-white rounded  h-8  w-20 border  font-bold   ${item.editStatus === 'Pending' ? 'text-red-800 border-red-500' : 'text-blue-800 border-blue-500'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <Dialog>
                                                        <DialogTrigger className="flex"><CiEdit size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent className='max-w-3xl'>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-3 text-center mt-5'>QC KOR & Loss Modify</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                  
                                                            <QCKORModify data={item} />
                                                        </DialogContent>
                                                    </Dialog>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                

                <TableCell className="text-center font-bold text-cyan-500">{item.LotNo}</TableCell>

                <TableCell className="text-center font-semibold text-red-500">
                  {formatDate(item.date)}
                </TableCell>

                 <TableCell className="text-center font-bold">
                  {formatDate(item.proddate)}
                </TableCell>

                <TableCell className="text-center font-bold">
                  {formatDate(item.prodbormadate)}
                </TableCell>

                <TableCell className="text-center font-bold text-purple-500">{item.origin}</TableCell>
                 <TableCell className="text-center font-semibold text-red-500">{item.prodKOR}</TableCell>

               

                <TableCell className="text-center font-semibold text-green-600">{item.qcKOR}</TableCell>

                <TableCell className="text-center font-semibold text-red-500">{item.BormaLoss} %</TableCell>

                <TableCell className="text-center font-semibold text-green-600">
                  {item.qcBormaLoss} %
                </TableCell>

              

               

                <TableCell className="text-center">
                  {item.CreatedBy}
                </TableCell>

                <TableCell className="text-center">
                  {item.modifiedBy ?? "-"}
                </TableCell>

              </TableRow>

            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={13}
                className="text-center text-red-500 py-6"
              >
                No Result
              </TableCell>
            </TableRow>
          )}

        </TableBody>

      </Table>

      {/* Pagination */}

      <Pagination className="pt-5 flex justify-end">

        <PaginationContent>

          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(page - 1)} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink className="font-bold bg-blue-200">
              {page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={() => setPage(page + 1)} />
          </PaginationItem>

        </PaginationContent>

      </Pagination>

    </div>
  );
};

export default QCProductionKORTable;