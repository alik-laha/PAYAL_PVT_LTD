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
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { LuDownload } from "react-icons/lu";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { CiEdit } from "react-icons/ci";
import { Label } from "../ui/label";
import { pendingCheckRoles, PermissionRole } from "@/type/type";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const QRStockTable = () => {

  const [origin, setOrigin] = useState<string>("")
  const [blockpagen, setblockpagen] = useState('flex')
  const [Data, setData] = useState<any[]>([])
  const [page, setPage] = useState(pageNo)

  const limit = pagelimit
  const thqtyref = useRef<HTMLInputElement>(null)
  const thqtyBucketref = useRef<HTMLInputElement>(null)
  //const [thqty, setThQty] = useState<number>(0)
  const [errortext, setErrorText] = useState<string>("")

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSearch = async () => {

    setblockpagen('flex')
    const response = await axios.put('/api/qrOperation/searchStock', {

      gradeName: gradeN,
      origin: origin,
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



  function formatNumber(num: string) {
    return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
  }

  const [gradeN, setGradeN] = useState<string>()
  //const [grade, setGrade] = useState<findskutypeData[]>([])
  const [gradeview, setGradeView] = useState("none")
  const [gradeData, setGradeData] = useState<any[]>([])





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

  const handleModify = async ({ item, e }: any) => {
    e.preventDefault();
    const thqty = thqtyref.current?.value
    const thresholdBucket = thqtyBucketref.current?.value
    try {
      const apiRes = await axios.put('/api/qrOperation/updateStock', {
        id: item.id,
        threshold: thqty, thresholdBucket
      });

      if (apiRes.status === 200) {
        setErrorText(apiRes.data.message);
        setSuccessOpen(true);
        if (thqtyref.current != null) {
          thqtyref.current.value = '';
        }


      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorText(
          err.response?.data.message ||
          'An Unexpected Error Occured in Updating Stock'
        );
      } else {
        setErrorText('An Unexpected Error Occured in Updating Stock');
      }
      setErrorOpen(true);
    }
  };

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

  const exportToExcel = async () => {
  const currDate = new Date().toLocaleDateString();

  try {
    if (!Data || Data.length === 0) return;

    const transformed = Data.map((item: any, idx: number) => ({
      Sl_No: idx + 1,
      ID: item.id,

      Grade_Name: item.gradeName,
      Origin: item.origin,

      Threshold_Qty: item.threshold ?? "0.00",
      Threshold_Bucket: item.thresholdBucket ?? 0,

      Input_Stock_Qty: item.inputStock ?? "0.00",
      Input_Bucket_Stock: item.inputBucketStock ?? 0,

      Output_Dispatch_Qty: item.outputDispatchStock ?? "0.00",
      Output_Repack_Qty: item.outputRepackStock ?? "0.00",

      Output_Bucket_Dispatch: item.outputBucketDispatchStock ?? 0,
      Output_Bucket_Repack: item.outputBucketRepackStock ?? 0,

      Current_Stock_Qty: item.currentStock ?? "0.00",
      Current_Bucket_Stock: item.currentBucketStock ?? 0,

      
    }));

    const ws = XLSX.utils.json_to_sheet(transformed);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock Summary");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(blob, `Stock_Summary_${currDate}.xlsx`);
  } catch (err) {
    console.error("Error exporting to Excel:", err);
  }
};








  return (
    <>
      <div className="mx-2 ">

        <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">

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
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm" onClick={exportToExcel}

              >
                <LuDownload size={18} />

              </Button>

            </div>

          </div>

        </div>

        <Table className="mt-4">
          <TableHeader className="bg-neutral-100 text-stone-950 ">

            <TableHead className="text-center">SL⠀No</TableHead>
            {checkpending('Grading') && <TableHead className="text-center">Action</TableHead>}

            <TableHead className="text-center">Item⠀Origin</TableHead>
            <TableHead className="text-center">Item⠀Grade⠀Name</TableHead>
            {checkpending('Grading') && <TableHead className="text-center">Threshold⠀(Kg)</TableHead>}
            {checkpending('Grading') && <TableHead className="text-center">Threshold⠀(Bucket)</TableHead>}
            <TableHead className="text-center">Stock⠀Input⠀(Kg)</TableHead>
            <TableHead className="text-center">Dispatch⠀(Kg)</TableHead>
            <TableHead className="text-center">Repack⠀(Kg)</TableHead>



            <TableHead className="text-center">Stock⠀Input⠀(Bucket)</TableHead>

            <TableHead className="text-center">Dispatch⠀(Bucket)</TableHead>

            <TableHead className="text-center">Repack⠀(Bucket)</TableHead>

            <TableHead className="text-center">Current⠀Stock⠀(Kg)</TableHead>
            <TableHead className="text-center">Current⠀Stock⠀(Bucket)</TableHead>
          </TableHeader>
          <TableBody>

            {Data.length > 0 ? (Data.map((item: any, idx) => {



              return (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    {limit * (page - 1) + idx + 1}
                  </TableCell>
                  {checkpending('Grading') && <TableCell className="flex text-center items-center justify-center">
                    <AlertDialog>
                      <AlertDialogTrigger className="flex">
                        <button className='px-2 py-1.5  text-blue-600 rounded-lg flex flex-row items-center gap-2 hover:bg-blue-500 hover:scale-110 font-bold hover:text-white
                         drop-shadow-md tracking-wider border  border-blue-300 text-bold bg-white' ><CiEdit color='blue' size={20} />Threshold</button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Do you Sure want to Modify Threshold ?</AlertDialogTitle>

                        </AlertDialogHeader>
                        <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">Previous Threshold (Qty)</Label>
                          <Input className="w-2/4 text-center bg-yellow-100 border-gray-300" placeholder="Lot No" value={item.threshold} /> </div>
                        <div className="flex">
                          <Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">Previous Threshold (Bucket)</Label>
                          <Input className="w-2/4 text-center bg-yellow-100 border-gray-300" placeholder="Lot No" value={item.thresholdBucket} /> </div>

                        <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">Modified Threshold (Qty)</Label>
                          <Input className="w-2/4 text-center border-gray-300" placeholder="Value" ref={thqtyref} /> </div>
                        <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">Modified Threshold (Bucket)</Label>
                          <Input className="w-2/4 text-center border-gray-300" placeholder="Value" ref={thqtyBucketref} /> </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={(e) => handleModify({ item, e })}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>}


                  <TableCell className="text-center font-bold text-orange-500 ">
                    {item.origin}
                  </TableCell>
                  <TableCell className="text-center font-bold text-orange-500 ">
                    {item.gradeName}
                  </TableCell>
                  {checkpending('Grading') && <TableCell className="text-center font-bold tracking-wider text-blue-500">
                    {formatNumber(item.threshold)}
                  </TableCell>}
                  {checkpending('Grading') && <TableCell className="text-center font-bold tracking-wider text-blue-500 ">
                    {formatNumber(item.thresholdBucket)}
                  </TableCell>}
                  <TableCell className="text-center font-bold tracking-wider text-green-600 bg-blue-100">
                    {formatNumber(item.inputStock)}
                  </TableCell>
                  <TableCell className="text-center font-bold text-red-500 bg-blue-100">
                    {formatNumber(item.outputDispatchStock)}
                  </TableCell>
                  <TableCell className="text-center font-bold tracking-wider text-red-500 bg-blue-100">
                    {formatNumber(item.outputRepackStock)}
                  </TableCell>



                  <TableCell className="text-center font-bold tracking-wider text-green-600 bg-yellow-100">
                    {formatNumber(item.inputBucketStock)}
                  </TableCell>

                  <TableCell className="text-center font-bold tracking-wider text-red-500 bg-yellow-100">
                    {formatNumber(item.outputBucketDispatchStock)}
                  </TableCell>

                  <TableCell className="text-center font-bold tracking-wider text-red-500 bg-yellow-100">
                    {formatNumber(item.outputBucketRepackStock)}
                  </TableCell>
                  <TableCell className="text-center font-bold bg-blue-500 text-white">
                    {formatNumber(item.currentStock)}
                  </TableCell>

                  <TableCell className="text-center font-bold bg-blue-500 text-white">
                    {formatNumber(item.currentBucketStock)}
                  </TableCell>

                </TableRow>
              );

            })) : (<TableRow>

              <TableCell colSpan={12}><p className="font-bold capitalize tracking-wider text-red-500 text-center pt-3 pb-10">No Result Found</p></TableCell>

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
        <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-green-600">
                <img src={tick} width={28} alt="success" />
                Success
              </AlertDialogTitle>
            </AlertDialogHeader>

            <p className="text-sm text-gray-600 mt-2">{errortext}</p>

            <AlertDialogFooter>
              <AlertDialogAction onClick={() => {
                setSuccessOpen(false);
                window.location.reload();
              }
              }>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={errorOpen} onOpenChange={setErrorOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                <img src={cross} width={24} alt="error" />
                Error
              </AlertDialogTitle>
            </AlertDialogHeader>

            <p className="text-sm text-gray-600 mt-2">{errortext}</p>

            <AlertDialogFooter>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => setErrorOpen(false)}
              >
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


      </div>


    </>
  )

}

export default QRStockTable