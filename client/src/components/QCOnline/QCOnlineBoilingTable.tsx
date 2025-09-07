import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { pagelimit, pageNo } from "../common/exportData";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format, toZonedTime } from 'date-fns-tz'
import { LuDownload } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
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

const QCOnlineBoilingTable = () => {

  const [fromdate, setfromDate] = useState<string>('');
  const [todate, settoDate] = useState<string>('');
  const [page, setPage] = useState(pageNo)
  const [blockpagen, setblockpagen] = useState('flex')
  const limit = pagelimit
  const [ItemWiseData, setItemWiseData] = useState<any[]>([])

  const currDate = new Date().toLocaleDateString();

  useEffect(() => {
    setblockpagen('flex')
    handleSearch()
  }, [page])

  const handleSearch = async () => {
    const response = await axios.post('/api/qconline/searchQCOnlineBoiling', {
      fromDate: fromdate,
      toDate: todate,
    }, {
      params: { page, limit }
    })
    const data = await response.data
    setItemWiseData(data)
    if (data.length === 0 && page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  function handletimezone(date: string | Date) {
    const apidate = new Date(date);
    const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
    return format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
  }

  const handleAMPM = (time: string) => {
    let [hours, minutes] = time.split(':').map(Number);
    let period = ' AM';

    if (hours === 0) {
      hours = 12;
    } else if (hours === 12) {
      period = ' PM';
    } else if (hours > 12) {
      hours -= 12;
      period = ' PM';
    }
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + period;
  }

  const exportToExcel = async () => {
    const response = await axios.post('/api/qconline/searchQCOnlineBoiling', {
      fromDate: fromdate,
      toDate: todate,
    })
    const data = await response.data

    const transformed = data.map((item: any, idx: number) => ({
      Sl_No: idx + 1,
      Date: handletimezone(item.date),
      Time: handleAMPM(item.time),
      Cooker_No: item.cookerNo,
      Cooker_Pressure: item.cookerPressure,
      Cooker_Time: item.cookerTime,
      Cashew_Status: item.cashewStatus,
      Cleaning_Status: item.cleaningStatus,
      Cleaning_Remarks: item.cleanRemarks,
      Maintainance_Status: item.maintainance,
      Maintainance_Remarks: item.maintainanceRemarks,
      Created_By: item.createdBy,
      Modified_By: item.modifiedBy,
    }))

    const ws = XLSX.utils.json_to_sheet(transformed);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cooker_Report');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'QC_Cooker_Report_' + currDate + '.xlsx');
  }

  return (
    <div className="ml-5 mt-5 ">
      <div className="flex justify-center">
        <label className="font-semibold mt-1 ml-8 mr-5">From </label>
        <Input className="w-1/6"
          type="date"
          value={fromdate}
          onChange={(e) => setfromDate(e.target.value)}
        />
        <label className="font-semibold mt-1 ml-8 mr-5">To </label>
        <Input className="w-1/6"
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

      <span className="w-1/8 ">
        <Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}>
          <LuDownload size={18} />
        </Button>
      </span>

      <Table className="mt-4">
        <TableHeader className="bg-neutral-100 text-stone-950 ">
          <TableHead className="text-center">Id</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead className="text-center">Cooker No</TableHead>
          <TableHead className="text-center">Cooker Pressure</TableHead>
          <TableHead className="text-center">Cooker Time</TableHead>
          <TableHead className="text-center">Cashew Status</TableHead>
          <TableHead className="text-center">Cleaning Status</TableHead>
          <TableHead className="text-center">Maintainance Status</TableHead>
          <TableHead className="text-center">Cleaning Remarks</TableHead>
          <TableHead className="text-center">Maintainance Remarks</TableHead>
          <TableHead className="text-center">Created By</TableHead>
          <TableHead className="text-center">Modified By</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableHeader>
        <TableBody>
          {
            ItemWiseData.length > 0 ? (ItemWiseData.map((item: any, idx: number) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                <TableCell className="text-center">{handleAMPM(item.time)}</TableCell>
                <TableCell className="text-center">{item.cookerNo}</TableCell>
                <TableCell className="text-center">{item.cookerPressure} Bar</TableCell>
                <TableCell className="text-center">{item.cookerTime} Min</TableCell>
                <TableCell className="text-center">
                  {item.cashewStatus === 'OK'
                    ? <button className="p-2 text-white rounded bg-green-500 fix-button-width">OK</button>
                    : <button className="bg-red-500 p-2 text-white rounded fix-button-width">{item.cashewStatus}</button>}
                </TableCell>
                <TableCell className="text-center">
                  {item.cleaningStatus === 'OK'
                    ? <button className="p-2 text-white rounded bg-green-500 fix-button-width">OK</button>
                    : <button className="bg-red-500 p-2 text-white rounded fix-button-width">{item.cleaningStatus}</button>}
                </TableCell>
                <TableCell className="text-center">
                  {item.maintainance === 'OK'
                    ? <button className="p-2 text-white rounded bg-green-500 fix-button-width">OK</button>
                    : <button className="bg-red-500 p-2 text-white rounded fix-button-width">{item.maintainance}</button>}
                </TableCell>
                <TableCell className="text-center">{item.cleanRemarks}</TableCell>
                <TableCell className="text-center">{item.maintainanceRemarks}</TableCell>
                <TableCell className="text-center">{item.createdBy}</TableCell>
                <TableCell className="text-center">{item.modifiedBy ?? "-"}</TableCell>
                <TableCell className="text-center">
                  <Popover>
                    <PopoverTrigger>
                      <button
                        className={`p-2 text-white rounded ${item.editStatus === 'Pending' ? 'bg-cyan-200' : 'bg-cyan-500'}`}
                        disabled={item.editStatus === 'Pending'}>
                        Action
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                      <Dialog>
                        <DialogTrigger className="flex"><CiEdit size={20} />
                          <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500">Modify</button>
                        </DialogTrigger>
                        <DialogContent className='max-w-3xl'>
                          <DialogHeader>
                            <DialogTitle>
                              <p className='text-1xl pb-1 text-center mt-5'>QC Online Cooker Modify</p>
                            </DialogTitle>
                          </DialogHeader>
                          {/* <QCCookerModify data={item} /> */}
                        </DialogContent>
                      </Dialog>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))) : (
              <TableRow>
                <TableCell colSpan={14} className="text-center text-red-500 py-6">
                  No Result
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>

      <Pagination style={{ display: blockpagen }} className="pt-5 ">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage((prev) => prev > 1 ? prev - 1 : prev)} />
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
    </div>
  )
}

export default QCOnlineBoilingTable;
