import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { LuFileScan, LuWarehouse } from "react-icons/lu";
import { TbFileBarcode, TbLineScan } from "react-icons/tb";
import QRDispatchCreate from "./QRDispatchCreate";
import DashboardFooter from "../dashboard/DashboardFooter";
import QRDispatchTable from "./QRDispatchTable";
import JsBarcode from "jsbarcode";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { IoMdPrint } from "react-icons/io";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
//import QRPostScanForm from "./QRPostScanForm";
import QRStockTable from "./QRStockTable";
import { pendingCheckRoles, PermissionRole } from "@/type/type";
import {  pendingCheckRole } from "../common/exportData";
import UseQueryData from "../common/dataFetcher";
import Loader from "../common/Loader";
import { MdOutlinePostAdd } from "react-icons/md";



import QRThreshold from "./QRThreshold";
import QRPostScanForm2 from "./QRPostScanForm2";
import { TiTick } from "react-icons/ti";
import axios from "axios";


const QRDispatch = () => {


    const fromRangeRef = useRef<HTMLInputElement>(null)
    const toRangeRef = useRef<HTMLInputElement>(null)
    const [barcodeList, setBarcodeList] = useState<string[]>([]);
     //const [markbarcodeList, setmarkBarcodeList] = useState<string[]>([]);
     const [isdisable, setisdisable] = useState<boolean>(false);
    const barcodeRefs = useRef<(SVGSVGElement | null)[]>([]);
    const [shouldPrint, setShouldPrint] = useState(false);
    const [stocktable, setStockTable] = useState<boolean>(false)
    const [transactable, setTransacTable] = useState<boolean>(true)
    
    
    const handleTransferFetch = () => {
        if (stocktable) {
            setStockTable(false)
            setTransacTable(true)
        }
        else {
            setStockTable(true)
            setTransacTable(false)
        }
    }


    const generateBarcodes = (from: number, to: number) => {
        const list = [];
        const currentYear = new Date().getFullYear(); // 2026
        for (let i = from; i <= to; i++) {
            list.push(`${currentYear}-${i.toString().padStart(6, "0")}`);
        }
        return list;
    };

    const printBarcodeAll = (
        e: MouseEvent<HTMLButtonElement>,
        from: string | undefined,
        to: string | undefined
    ) => {
        e.preventDefault();
        if (!from || !to) return;
        const list = generateBarcodes(Number(from), Number(to));
        setBarcodeList(list);
        console.log(list)
        setShouldPrint(true);

    };

    const printMarkAll = async (
    e: MouseEvent<HTMLButtonElement>,
    from: string | undefined,
    to: string | undefined
) => {
    e.preventDefault();

    if (!from || !to) return;

    try {
        setisdisable(true);

        const barcodeList = generateBarcodes(
            Number(from),
            Number(to)
        );

       // setmarkBarcodeList(barcodeList);

        const response = await axios.post(
            "/api/qrOperation/bulkAddToStock",
            {
                qr_ids: barcodeList,
            }
        );

        console.log(response.data);

        alert(
            `Success: ${response.data.successCount}
Failed: ${response.data.failedCount}`
        );

        //handleSearch();
        window.location.reload();

    } catch (error: any) {
        console.error(error);

        alert(
            error?.response?.data?.message ||
            "Bulk stock update failed"
        );
    } finally {
        setisdisable(false);
    }
};


    useEffect(() => {
        barcodeList.forEach((code: string, index: number) => {
            const svg = barcodeRefs.current[index];
            if (svg) {
                JsBarcode(svg, code, {
                    format: "CODE128",
                    width: 3,
                    height: 150,
                    displayValue: true,
                    fontSize: 25,
                    margin: 5,
                });
            }
        });
    }, [barcodeList]);

    useEffect(() => {
        if (!shouldPrint || barcodeList.length === 0) return;

        const printContent = document.getElementById("print-area")?.innerHTML;
        if (!printContent) return;

        const printWindow = window.open("", "", "width=800,height=600");

        printWindow?.document.write(`
    <html>
      <head>
        <style>
          @page {
            size: 50mm 35mm;
            margin: 0;
          }
          body { margin: 0; padding: 0; }
          .barcode-item {
            width: 50mm;
            height: 35mm;
            display: flex;
            justify-content: center;
            align-items: center;
            page-break-after: always;
          }
          svg {
            width: 90%;
            height: auto;
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${printContent}
      </body>
    </html>
  `);

        printWindow?.document.close();
        setShouldPrint(false); // ✅ reset
    }, [barcodeList, shouldPrint]);

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
    

    const { data, error, isLoading } = UseQueryData('/api/qrOperation/qrcount', 'GET', 'getTtotalActvQR');

    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>Error</div>
    }

    return (
        <>
            <div>
                <DashboardHeader />
                <DashboardSidebar />
                <div className='dashboard-main-container'>
                    <div className="flexbox-header mx-2">
                        <div className="flexbox-tile bg-blue-500 hover:bg-blue-300">
                            <p>Total Barcode Generated</p><br /><p>{data.totalBar || 0}</p>
                        </div>
                        <div className="flexbox-tile bg-orange-500 hover:bg-orange-300">
                            <p>Barcode Marked</p><br /><p>{data.totalGen || 0}</p>
                        </div>
                        <div className="flexbox-tile bg-yellow-600 hover:bg-yellow-400">
                            <p>Total Barcode Scanned</p><br /><p>{data.totalScan || 0}</p>
                        </div>
                        <div className="flexbox-tile bg-purple-600 hover:bg-purple-400">
                            <p>Total Scan Pending</p><br /><p>{data.pendingScan || 0}</p>
                        </div>
                        <div className="flexbox-tile bg-red-500 hover:bg-red-300">
                            <p>Today's Generation</p><br /><p>{data.todayGen || 0}</p>
                        </div>
                        <div className="flexbox-tile bg-green-500 hover:bg-green-300">
                            <p>Today's Scan</p><br /><p>{data.todayScan || 0}</p>
                        </div>

                    </div>
                    <p className='md:text-lg uppercase md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md '>QR Dispatch Scan Report</p>
                    <div className="flex flex-wrap mb-2" >
                          {/* Generate */}

                        {checkpending('QRDispatch') && <Dialog>
                            <DialogTrigger> <Button
                                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-2 w-28 md:w-32"
                            >
                                <span className="text-lg font-bold"><LuFileScan /></span> Generate
                            </Button></DialogTrigger>
                            <DialogContent className='max-w-2xl'>
                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold'>Barcode Creation</p></DialogTitle>
                                    <DialogDescription>
                                        <p className='text-1xl text-center'>To Be Filled Up By Supervisor</p>
                                    </DialogDescription>
                                </DialogHeader>

                                <QRDispatchCreate />
                            </DialogContent>
                        </Dialog>}

                        {/* Scan */}
                        {checkpending('QRScan') && <Dialog
                            onOpenChange={(isOpen) => {
                                if (!isOpen) {
                                    window.location.reload()
                                }
                            }}
                        >
                            <DialogTrigger> <Button
                                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-4 w-28 md:w-32 md:ml-6"
                            >
                                <span className="text-lg font-bold"><TbLineScan /></span> Scan
                            </Button></DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                {/* <QRPostScanForm /> */}
                                <QRPostScanForm2 />
                            </DialogContent>
                        </Dialog>}

                        {/* Bulk Print */}
                        {checkpending('QRDispatch') && <Dialog>
                            <DialogTrigger> <Button
                                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-4 w-28 md:ml-6 md:w-32"
                            >
                                <span className="text-lg font-bold"><IoMdPrint /></span> Bulk Print
                            </Button></DialogTrigger>
                            <DialogContent className='max-w-2xl'>
                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center pt-4 tracking-wider drop-shadow-xl font-bold'>Bulk Barcode Print </p></DialogTitle>

                                </DialogHeader>
                                <div className="flex flex-row gap-2">
                                    <Label className=" text-gray-700 text-sm font-bold pt-1.5 "> Range (From - To) :</Label>

                                    <Input className="w-1/4 border-gray-300 font-bold text-md text-center" type='number' placeholder="From" ref={fromRangeRef} required />


                                    <Input className="w-1/4 text-center border-gray-300 font-bold text-md " type='number' placeholder="To" ref={toRangeRef} required />
                                </div>
                                <div className="flex flex-col text-center items-center w-full">

                                    <div id="print-area" style={{ display: "none" }}>
                                        {barcodeList.map((code, index) => (
                                            <div key={code} className="barcode-item">
                                                <svg ref={el => barcodeRefs.current[index] = el}></svg>
                                            </div>
                                        ))}
                                    </div>

                                    <Button className='w-1/4 mt-2 bg-orange-500' onClick={(e) => printBarcodeAll(e, fromRangeRef.current?.value, toRangeRef.current?.value)}>Print</Button>
                                </div>
                                {/* <SKUCreateForm/> */}
                            </DialogContent>
                        </Dialog>}

                        {/* Bulk Mark */}
                        {checkpending('QRDispatch') && <Dialog>
                            <DialogTrigger> <Button
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-4 w-28 md:ml-6 md:w-32"
                            >
                                <span className="text-lg font-bold"><TiTick /></span> Bulk Mark
                            </Button></DialogTrigger>
                            <DialogContent className='max-w-2xl'>
                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center pt-4 tracking-wider drop-shadow-xl font-bold'>Bulk Barcode Mark </p></DialogTitle>

                                </DialogHeader>
                                <div className="flex flex-row gap-2">
                                    <Label className=" text-gray-700 text-sm font-bold pt-1.5 "> Range (From - To) :</Label>

                                    <Input className="w-1/4 border-gray-300 font-bold text-md text-center" type='number' placeholder="From" ref={fromRangeRef} required />


                                    <Input className="w-1/4 text-center border-gray-300 font-bold text-md " type='number' placeholder="To" ref={toRangeRef} required />
                                </div>
                                <div className="flex flex-col text-center items-center w-full">

                                    

                                    <Button className='w-1/4 mt-2 bg-orange-500' onClick={(e) => printMarkAll(e, fromRangeRef.current?.value, toRangeRef.current?.value)} disabled={isdisable}>Mark All</Button>
                                </div>
                                {/* <SKUCreateForm/> */}
                            </DialogContent>
                        </Dialog>}

                        {/* Stock Check  */}
                        {checkpending('QRScan') && <Button
                            className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-purple-500 hover:from-gray-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-4 w-28 md:w-32 md:ml-6 no-margin-left" onClick={handleTransferFetch}
                        >{transactable && <LuWarehouse size={18} />}
                            {stocktable && <TbFileBarcode size={18} />}
                            {stocktable ? 'Entry' : ' Stock'}</Button>}

                        {/* Threshold Add */}
                        {checkpending('Grading') && <Dialog>
                            <DialogTrigger> <Button
                                className="flex items-center gap-2 bg-gradient-to-r from-lime-600 to-gray-500 hover:from-lime-600 hover:to-gray-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-4  w-28 md:w-32 md:ml-6"
                            >
                                <span className="text-lg font-bold"><MdOutlinePostAdd size={20} /></span> Threshold
                            </Button></DialogTrigger>

                            <DialogContent className='max-w-2xl px-5'>
                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center pt-4 tracking-wider drop-shadow-xl font-bold'>Threshold Entry</p></DialogTitle>

                                </DialogHeader>
                                
                               <QRThreshold/> 
                            </DialogContent>
                        </Dialog>}
                    </div>
                    {/* Generate */}


                    {transactable && <QRDispatchTable />}
                    {stocktable && <QRStockTable />}
                </div>
                <DashboardFooter />
            </div>
            
        </>
    )
}
export default QRDispatch