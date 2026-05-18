import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, { useEffect, useRef, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import axios from "axios";
import { format, toZonedTime } from "date-fns-tz";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
//import { findskutypeData } from "@/type/type";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { LuDownload } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import JsBarcode from 'jsbarcode';
import * as XLSX from 'xlsx'

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
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MdDelete } from "react-icons/md";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { pendingCheckRoles, PermissionRole } from "@/type/type";
import saveAs from "file-saver";

const QRDispatchTable = () => {

  const [fromdate, setfromDate] = React.useState<string>('');
  const [todate, settoDate] = React.useState<string>('');

  const [origin, setOrigin] = useState<string>("")
  const [lot, setLot] = useState<string>("")

  const [batch, setBatch] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const [barstatus, setBarstatus] = useState<boolean>(false)
const [isdisable, setisdisable] = useState<boolean>(false)
  
  const [blockpagen, setblockpagen] = useState('flex')
  const [Data, setData] = useState<any[]>([])
  const [page, setPage] = useState(pageNo)

  const limit = pagelimit

  const successdialog = document.getElementById('machinescs') as HTMLInputElement;
  const errordialog = document.getElementById('machineerror') as HTMLInputElement;
  const [errview, setErrView] = useState<string>("hidden")
  const closeDialogButton = document.getElementById('machinescsbtn') as HTMLInputElement;
  const errorcloseDialogButton = document.getElementById('machineerrorbtn') as HTMLInputElement;
  const [errortext, setErrorText] = useState<string>("")
  const [barcodeValue, setBarcodeValue] = useState<string | null>(null);


    const checkpending = (tab: string) => {
      const Role = localStorage.getItem('role') as keyof PermissionRole
      //console.log(Role)
      if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
        return true
      }
      else {
        return false;
      }
  
    }

   

  if (closeDialogButton) {
    closeDialogButton.addEventListener('click', () => {
      if (successdialog != null) {
        (successdialog as any).close();
        window.location.reload()
      }
    });
  }
  if (errorcloseDialogButton) {
    errorcloseDialogButton.addEventListener('click', () => {
      if (errordialog != null) {
        (errordialog as any).close();
      }
    });
  }

  function handletimezone(date: string | Date) {
    const apidate = new Date(date);
    const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
    const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    return finaldate;
  }

  const handleSearch = async () => {
    //console.log('search button pressed')
    //setEditData([])
    setblockpagen('flex')
    const response = await axios.put('/api/qrOperation/searchTransaction', {
      lotNo: lot,
      batchNo: batch,
      gradeName: gradeN,
      origin: origin,
      fromDate: fromdate,
      toDate: todate,
      status: status
    }, {
      params: {
        page: page,
        limit: limit
      }
    })
    const data = await response.data
    if (data.rcnEntries.length === 0 && page > 1) {
      setPage((prev) => prev - 1)

    }
    setData(data.rcnEntries)
    //console.log(data)

  }
  useEffect(() => {
    handleSearch()
    setPage((prev) => {
      if (prev <= 0) {
        return 1
      }
      return prev
    })
  }, [page])

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
    const finalTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + period.toString()

    // return ${hours}:${minutes.toString().padStart(2, '0')} ${period};
    return finalTime;
  }

  function formatNumber(num: string) {
    return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
  }

  const [gradeN, setGradeN] = useState<string>()
  //const [grade, setGrade] = useState<findskutypeData[]>([])
  const [gradeview, setGradeView] = useState("none")
  const [gradeData, setGradeData] = useState<any[]>([])



  useEffect(() => {
    setTimeout(() => {
      if (barstatus && barcodeValue && barcodeRef.current) {
        console.log('reachjed')
        JsBarcode(barcodeRef.current, barcodeValue, {
          format: "CODE128",
          width: 3,
          height: 150,
          displayValue: true,
          fontSize: 25,
          margin: 5,
        });
      }
    }, 100)

  }, [barstatus, barcodeValue]);

  const handleGradechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setSku(e.target.value)
    setGradeN(e.target.value)

    if (e.target.value.length > 0 && gradeData.length > 0) {
      setGradeView("block")
    } else {
      setGradeView("none")
    }
    axios.post("/api/vendorSKU/skudatafind/Packing", { sku: e.target.value, type: 'Final Grade' })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setGradeData(res.data.skuData)
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setGradeData([])
        }
      })

  }
  const handleGradeidClick = (item: any) => {
    // setSku(item.sku)
    setGradeN(item.sku)
    setGradeView("none")
  }


  const handleMark = (item: any, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setisdisable(true)
    axios.put("/api/qrOperation/addTOStock", item)
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setBarcodeValue(item.qr_id);
          setBarstatus(true);
        }
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setErrorText(err.response?.data.message || 'An Unexpected Error Occured in Updating Stock')
        }
        else {
          setErrorText('An Unexpected Error Occured in Updating Stock')
        }
        //     if (errordialog != null) {
        //         (errordialog as any).showModal()
        //   }
        setErrView('block')
      }).finally(
        () => {
      setisdisable(false);
    }
      )
  }

  const handleDelete = async (item: any) => {
    try {
      const apiRes = await axios.delete(`/api/qrOperation/deleteTransaction/${item.id}`);

      if (apiRes.status == 200) {
        setErrorText(apiRes.data.message);

        if (successdialog != null) {

          (successdialog as any).showModal();
        }

      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorText(err.response?.data.message || 'An Unexpected Error Occured in Updating Stock')
      }
      else {
        setErrorText('An Unexpected Error Occured in Updating Stock')
      }
      if (errordialog != null) {
        (errordialog as any).showModal()
      }

    }
  }


  const printBarcode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault();
    const barcodeElement = barcodeRef.current?.cloneNode(true) as SVGSVGElement;

    if (!barcodeElement) return;

    barcodeElement.style.width = "100%";
    barcodeElement.style.height = "100%";
    barcodeElement.style.maxWidth = "100%";

    const printWindow = window.open('', '', 'width=800,height=600');

    printWindow?.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            @page {
              size: 50mm 40mm;
              margin: 0;
            }

            body { 
              margin: 0;
              padding: 0;
              width: 50mm;
              height: 40mm;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden; /* Hide scrollbars */
            }

            /* 3. Ensure SVG scales correctly */
            svg {
              width: 90%; /* Leave a tiny breathing room */
              height: auto;
              max-height: 100%;
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${barcodeElement.outerHTML}
        </body>
      </html>
    `);
    printWindow?.document.close();
  };

  const handleExcelExport = async () => {
     const response = await axios.put('/api/qrOperation/searchTransaction', {
      lotNo: lot,
      batchNo: batch,
      gradeName: gradeN,
      origin: origin,
      fromDate: fromdate,
      toDate: todate,
      status: status
    
    })
    const data = await response.data.rcnEntries

  const transformed = data.map((item: any, index: number) => ({
    'Sl No': index + 1,
    'QR ID': item.qr_id,
    'Lot No': item.lotNo,
    'Origin': item.origin,
    'Grade': item.gradeName,
    'Batch No': item.batchNo,
    'Vehicle No': item.vehicleNo ?? '',
    'Party Name': item.partyName ?? '',
    'Gross Weight': Number(item.grossWt)||0,
    'Net Weight': Number(item.netWt)||0,
    'Status': item.status,
    'Created By': item.createdBy,
    'Scanned By': item.scanedBy ?? '',
    'Place': item.place ?? '',
    'Entry Date': item.entryDate ? handletimezone(item.entryDate) : '',
    'Entry Time': item.entryTime ? handleAMPM(item.entryTime) : '',
    'Exit Date': item.exitDate ? handletimezone(item.exitDate) : '',
    'Exit Time': item.exitTime ? handleAMPM(item.exitTime) : '',
    'Remarks': item.Remarks ?? ''
  }));

  const ws = XLSX.utils.json_to_sheet(transformed);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Stock');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });

  const currDate = new Date().toLocaleDateString();
  saveAs(blob, `Scan_Report_${currDate}.xlsx`);





  
};




  return (
    <>
      <div className="mx-2 ">

        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">

            {/* Batch / Doc No */}
            <div className="flex flex-col gap-1">

              <Input
                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                placeholder="Batch No"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
              />
            </div>

            {/* Lot / Doc No */}
            <div className="flex flex-col gap-1">

              <Input
                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                placeholder="Lot No"
                value={lot}
                onChange={(e) => setLot(e.target.value)}
              />
            </div>

            {/* Final Grade (with dropdown) */}


            <div className="flex flex-col gap-1 relative overflow-visible">
              {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Grade Name
                            </label> */}
              <Input
                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                value={gradeN}
                placeholder="Grade Name"
                onChange={(e) => handleGradechange(e)}
                required
              />

              {/* Dropdown should not push other content down */}
              <div
                className={`absolute top-full left-0 w-full mt-1 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 bg-white shadow-lg z-50 transition-all duration-200 ${gradeview === "block" ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
              >
                <ScrollArea className="max-h-40 overflow-y-auto">
                  {gradeData.length > 0 ? (
                    gradeData.map((item: any) => (
                      <div
                        key={item.id}
                        className="px-3 py-2 text-xs text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer font-semibold"
                        onClick={() => handleGradeidClick(item)}
                      >
                        {item.sku}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 px-2 py-1">No results found</p>
                  )}
                </ScrollArea>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Origin
                            </label> */}
              <select
                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 appearance-none"
                onChange={(e) => setOrigin(e.target.value)}
                value={origin}
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

            {/* Status */}
            <div className="flex flex-col gap-1">
              {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                Status
              </label> */}
              <select
                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                  <option value="">Status (All)</option>
               
                  {checkpending('QRDispatch') && <option key='GENERATED' value='GENERATED'>GENERATED</option>}
                  {checkpending('QRDispatch') &&<option key='IN-STOCK' value='IN-STOCK'>IN-STOCK</option>}
                  {checkpending('QRScan') &&<option key='DISPATCHED' value='DISPATCHED'>DISPATCHED</option>}
                  {checkpending('QRScan') &&<option key='RE-PACKED' value='RE-PACKED'>RE-PACKED</option>}
               
              </select>
            </div>

            {/* Buttons: Right-aligned */}
            <div className="flex col-span-full justify-end gap-3 mt-2 md:mt-0 ">
              <Button
                className="flex w-40 items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                onClick={handleSearch}
              >
                <FaSearch size={14} />
                Search
              </Button>


              <Button
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm" onClick={handleExcelExport}

              >
                <LuDownload size={18} />

              </Button>

            </div>

          </div>

        </div>

        <Table className="mt-4">
          <TableHeader className="bg-neutral-100 text-stone-950 ">

            <TableHead className="text-center">SL⠀No</TableHead>
            <TableHead className="text-center">Action</TableHead>
            <TableHead className="text-center">GENERATED⠀Barcode⠀ID</TableHead>

            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">View⠀Barcode</TableHead>
            <TableHead className="text-center">Stock⠀Entry</TableHead>
            <TableHead className="text-center">Item⠀Lot⠀No</TableHead>
            <TableHead className="text-center">Item⠀Origin</TableHead>
            <TableHead className="text-center">Grade⠀Name</TableHead>
            <TableHead className="text-center">Item⠀Batch⠀No</TableHead>

            <TableHead className="text-center">Gross⠀Weight</TableHead>
            <TableHead className="text-center">Net⠀Weight</TableHead>

            <TableHead className="text-center">Vehicle⠀No</TableHead>
            <TableHead className="text-center">Party⠀Name</TableHead>

            <TableHead className="text-center">Place</TableHead>
            <TableHead className="text-center">Stock⠀Entry⠀Date</TableHead>
            <TableHead className="text-center">Stock⠀Entry⠀Time</TableHead>
            <TableHead className="text-center">Dispatch⠀/Repack⠀Date</TableHead>
            <TableHead className="text-center">Dispatch⠀/Repack⠀Time</TableHead>
            <TableHead className="text-center">Item⠀Remarks</TableHead>
            <TableHead className="text-center">Created⠀By</TableHead>
            <TableHead className="text-center">Scaned⠀By</TableHead>



          </TableHeader>
          <TableBody>

            {Data.length > 0 ? (Data.map((item: any, idx) => {



              return (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    {limit * (page - 1) + idx + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    <AlertDialog>
                      <AlertDialogTrigger className="flex">
                        <button className={`px-2 py-1.5 w-20 text-red-600 rounded-lg flex flex-row items-center gap-2 hover:bg-red-100/80 hover:scale-110 font-bold hover:text-text-red-800  drop-shadow-md tracking-wider border  border-red-300  text-bold ${item.status !== 'GENERATED' ? 'bg-red-100 opacity-40' :
                          'bg-white'}`} disabled={item.status !== 'GENERATED' ? true : false}><MdDelete color='Red' size={20} /> Delete</button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Do you Sure want to Delete This Item ?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>

                  <TableCell className="text-center font-bold tracking-wider text-purple-700">
                    {item.qr_id}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    <button
                      className={`p-1 h-7  rounded w-40 font-bold transition duration-300 tracking-widest 
      ${item.status === "GENERATED" ? "border-blue-500 border bg-blue-100 text-blue-600 animate-bounce [animation-duration:2s]" : ""}
      ${item.status === "IN-STOCK" ? "bg-gradient-to-br text-white from-red-800 via-orange-700 to-red-500 animate-pulse [animation-duration:3s]" : ""}
      ${item.status === "DISPATCHED" ? "bg-gradient-to-tl text-white from-green-600 via-green-500 to-green-500 animate-pulse [animation-duration:3s]" : ""}
      ${item.status === "RE-PACKED" ? " text-white bg-gradient-to-br from-purple-700 via-sky-600 to-purple-500 animate-pulse [animation-duration:3s]" : ""}
    `}
                    >
                      {item.status}
                    </button>
                  </TableCell>

                  <TableCell className="text-center">
                    {
                      (item.status === 'IN-STOCK') ? (
                        <Dialog onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            setBarstatus(false)
                            setBarcodeValue(null);
                            barcodeRef.current = null;

                          }
                        }}>
                          <DialogTrigger>
                            <button className="flex flex-row justify-center w-full text-center" onClick={() => {
                              setBarstatus(true)
                              setBarcodeValue(item.qr_id);

                            }}>


                              <FaEye size={16} className="text-center px-auto flex flex-row w-full justify-center" /></button>

                          </DialogTrigger>
                          <DialogContent >
                            <DialogHeader>
                              <DialogTitle><p className='text-lg text-gray-600 text-center my-1 tracking-wider drop-shadow-xl font-bold'>Barcode Details</p></DialogTitle>

                            </DialogHeader>
                            <div className="flex flex-col text-center items-center w-full">

                              <svg ref={barcodeRef} className="h-36 w-96"></svg>

                              <Button className='w-1/4 mt-2 bg-orange-500' onClick={(e) => printBarcode(e)}>Print</Button>
                            </div>



                          </DialogContent>
                        </Dialog>

                      ) : (<p className="w-full text-center flex"><FaEyeSlash size={14} className="text-red-500 px-auto text-center flex flex-row w-full justify-center" /></p>

                      )

                    }
                  </TableCell>
                  <TableCell className="text-center flex justify-center">
                    <AlertDialog onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        setBarstatus(false)
                      }
                    }} >
                      <AlertDialogTrigger className="flex justify-center text-center ">
                        <button className="px-2 py-1.5 w-20 text-white bg-green-500 disabled:text-green-600 
                                                rounded-lg flex flex-row items-center gap-2 hover:bg-green-100/80 hover:scale-110 font-bold hover:text-green-800  drop-shadow-md tracking-wider border  border-green-300 text-xs text-bold disabled:hover:scale-100 disabled:bg-green-100 disabled:opacity-60" disabled={item.status !== 'GENERATED'} ><TiTick /> Mark</button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-2xl">
                        <AlertDialogHeader>
                          {!barstatus && <AlertDialogTitle className="text-gray-700">Do you Sure want to Mark Item Ready for Storage ?</AlertDialogTitle>}




                        </AlertDialogHeader>
                        {barstatus && <div className="flex justify-center">
                          <svg ref={barcodeRef} className="h-36 w-96"></svg>
                        </div>}

                        <span
                          id="nameError"
                          className={`text-red-500  font-bold ${errview}`}>
                          ❌ Error in Updating Stock. Failed to generate Barcode
                        </span>



                        <AlertDialogFooter>
                          {!barstatus && <AlertDialogCancel>Cancel</AlertDialogCancel>}
                          {!barstatus && <AlertDialogAction onClick={(e) => handleMark(item, e)} className={`${isdisable
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600"
                                } `} disabled={isdisable}>{isdisable ? "Submitting..." : "Submit"}</AlertDialogAction>}
                          {barstatus && <AlertDialogAction onClick={(e) => printBarcode(e)}>Print</AlertDialogAction>}
                          {barstatus && <AlertDialogCancel onClick={() => window.location.reload()}>Cancel</AlertDialogCancel>}
                          
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>

                  <TableCell className="text-center font-bold text-gray-800 bg-red-50">
                    {item.lotNo}
                  </TableCell>
                  <TableCell className="text-center font-bold text-gray-800 bg-yellow-50">
                    {item.origin}
                  </TableCell>
                  <TableCell className="text-center font-bold text-gray-800 bg-green-50">
                    {item.gradeName}
                  </TableCell>
                  <TableCell className="text-center font-bold text-gray-800 bg-blue-50">
                    {item.batchNo}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber(item.grossWt)} Kg
                  </TableCell>
                  <TableCell className="text-center font-bold text-red-800">
                    {formatNumber(item.netWt)} Kg
                  </TableCell>
                  <TableCell className="text-center">
                    {item.vehicleNo ? item.vehicleNo : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.partyName ? item.partyName : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.place ? item.place : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {handletimezone(item.entryDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {handleAMPM(item.entryTime)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.exitDate ? handletimezone(item.exitDate) : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.exitTime ? handleAMPM(item.exitTime) : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.Remarks ? item.Remarks : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.createdBy}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.scanedBy ? item.scanedBy : '-'}
                  </TableCell>




                </TableRow>
              );

            })) : (<TableRow>

              <TableCell colSpan={22}><p className="font-bold capitalize tracking-wider text-red-500 text-center pt-3 pb-10">No Result Found</p></TableCell>


            </TableRow>)}





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

        <dialog id="machinescs" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
          <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
          <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
            <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p></span>

          {/* <!-- Add more elements as needed --> */}
        </dialog>

        <dialog id="machineerror" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
          <button id="machineerrorbtn" className="dashboard-modal-close-btn ">X </button>
          <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
            <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p></span>

          {/* <!-- Add more elements as needed --> */}
        </dialog>
      </div>

    </>
  )

}

export default QRDispatchTable