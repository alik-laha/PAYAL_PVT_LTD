import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format, toZonedTime } from 'date-fns-tz'
import { useEffect, useState } from "react";
import { OrderStatusAll, Origin, pagelimit, pageNo, } from "../common/exportData";
import axios from "axios";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,

    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
//import { pendingCheckRoles, PermissionRole } from "@/type/type";
//import { LuDownload } from "react-icons/lu";

const ProdTransacTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [blConNo, setBlConNo] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [searchType, setsearchType] = useState('Order')
    const [searchTableType, setsearchtableType] = useState('Order')
    const [Data, setData] = useState<any[]>([])
    const [origin, setOrigin] = useState<string>("")
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const [sectionstatus, setSectionstatus] = useState<string>("")

    const dropdown = ['Order', 'Mapping','Packing']
     const successdialog = document.getElementById('machinescs') as HTMLInputElement;
      const errordialog = document.getElementById('machineerror') as HTMLInputElement;
      // const dialog = document.getElementById('myDialog');
      const closeDialogButton = document.getElementById('machinescsbtn') as HTMLInputElement;
      const errorcloseDialogButton = document.getElementById('machineerrorbtn') as HTMLInputElement;
      const [errortext, setErrorText] = useState<string>("")

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

    //const currDate = new Date().toLocaleDateString();

    useEffect(() => {
        handleTransactionSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return 1
            }
            return prev
        })
    }, [page])
    

    const handleTransactionSearch = async () => {
        setblockpagen('flex')
        if (searchType === 'Order') {
            const response = await axios.put('/api/packing/orderSearch', {
                origin: origin,
                blConNo: blConNo,
                fromDate: fromdate,
                toDate: todate,
                orderStatus: sectionstatus
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
            setsearchtableType('Order')
        }
        else {
            const response = await axios.put('/api/packing/packingSearch', {
                origin: origin,
                blConNo: blConNo,
                fromDate: fromdate,
                toDate: todate,

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
            setsearchtableType('Packing')
        }
    }
    const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selected = e.target.value;
        if (!selected) {
            settoDate('')
            sethidetoDate('')
            return
        }
        //console.log(selected)
        const date = new Date(selected)
        date.setDate(date.getDate() + 1);
        //console.log(date)
        const nextday = date.toISOString().split('T')[0];
        //console.log(nextday)
        sethidetoDate(selected)
        settoDate(nextday)
    }
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    const handleOrderreject = (id: number) => {
       
        axios.post('/api/packing/rejectPurchaseOrder', {id}).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        })

    }
    const handleOrderApprove = (item: any) => {
       
        axios.post('/api/packing/approvePurchaseOrder', {item}).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        })

    }

    return (
        <>
            <div className="ml-5 mt-5 ">
                <div className="w-full">
                    <select className='mb-5 h-10 items-center bg-yellow-100 justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        onChange={(e) => setsearchType(e.target.value)} value={searchType}>

                        {dropdown.map((data, index) => (
                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                {data}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flexbox-search">

                    <Input className="no-padding w-1/7 flexbox-search-width" placeholder=" Order No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />
                    <select className='flexbox-search-width flex h-8 w-1/7 ml-2 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        onChange={(e) => setOrigin(e.target.value)} value={origin}>
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Origin (All)</option>
                        {Origin.map((data, index) => (
                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                {data}
                            </option>
                        ))}
                    </select>
                    <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
                    <Input className="w-1/7 flexbox-search-width-calender"
                        type="date"
                        value={fromdate}
                        onChange={(e) => setfromDate(e.target.value)}
                        placeholder="From Date"

                    />
                    <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                    <Input className="w-1/7 flexbox-search-width-calender"
                        type="date"
                        value={hidetodate}
                        onChange={handleTodate}
                        placeholder="To Date"

                    />



                    <select className='flexbox-search-width flex h-8 w-1/7 ml-5 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        onChange={(e) => setSectionstatus(e.target.value)} value={sectionstatus}>
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Status (All)
                        </option>
                        {
                            OrderStatusAll.map((item) => {
                                return (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                )
                            })
                        }


                    </select>


                    <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleTransactionSearch}><FaSearch size={15} /> Search</Button></span>

                </div>
                {/* {checkpending('Packing') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>} */}
                {searchTableType === 'Order' ?
                    (<Table className="mt-4">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl No.</TableHead>
                           
                            <TableHead className="text-center">Generated_Purchase_Order_ID</TableHead>
                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Final_GradeName</TableHead>
                            <TableHead className="text-center">Approval</TableHead>
                            <TableHead className="text-center">Mapping</TableHead>
                            <TableHead className="text-center">Packing</TableHead>
                            <TableHead className="text-center">Order_Receive_Date</TableHead>
                            <TableHead className="text-center">Order_Entry_Date</TableHead>
                           
                            <TableHead className="text-center">Purchase_Vendor_Name</TableHead>
                            <TableHead className="text-center">Demand_Quantity</TableHead>
                            <TableHead className="text-center">Prepared_Quantity</TableHead>
                            <TableHead className="text-center">Backlog_Quantity</TableHead>
                            <TableHead className="text-center">Unit_Rate</TableHead>
                            <TableHead className="text-center">PO_Total_Amount</TableHead>
                            <TableHead className="text-center">GST</TableHead>
                            {/* <TableHead className="text-center">Edit Status</TableHead> */}
                            <TableHead className="text-center">Created_By</TableHead>
                            <TableHead className="text-center">Actioned_By</TableHead>
                            <TableHead className="text-center">Order_Remarks</TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        </TableHeader>
                        <TableBody>
                            {Data.length > 0 ? (Data.map((item: any, idx) => {
                                return (
                                    <TableRow key={item.id} >
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        
                                        <TableCell className="text-center font-bold ">{item.orderID}</TableCell>
                                        <TableCell className="text-center text-purple-500 font-semibold">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{item.gradeName}</TableCell>
                                        <TableCell className="text-center">
                                            {item.ordApproveStatus === 'Pending' ? (
                                                <button className="bg-red-400 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary">Pending</button>
                                            ) : (
                                                item.ordApproveStatus === 'Approved' ? (
                                                    <button className="bg-green-500 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary">Approved</button>
                                                ) : (
                                                    <p className="font-bold">Rejected</p>
                                                )
                                            )}</TableCell>
                                        <TableCell className="text-center">{item.ordApproveStatus !== 'Rejected' ?( item.ordMappingStatus === 0 ? (
                                            <button className="bg-red-400 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary">Pending</button>
                                        ) : (
                                            <button className="bg-green-400 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary ">Completed</button>
                                        )):null}</TableCell>
                                        <TableCell className="text-center">{item.ordApproveStatus !== 'Rejected' ?(item.ordStatus === 0 ? (
                                            <button className="bg-red-400 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary">Pending</button>
                                        ) : (
                                            <button className="bg-green-400 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary ">Completed</button>
                                        )):null}</TableCell> {/* Order completion Status */}
                                        <TableCell className="text-center">{handletimezone(item.orderDate)}</TableCell> {/* Order Receiving Date (Can be mapped to "orderDate") */}
                                        <TableCell className="text-center">{handletimezone(item.orderInvDate)}</TableCell>
                                      
                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.quantity)} Kg </TableCell> {/* Demand Quantity */}
                                        <TableCell className="text-center">{formatNumber(item.actualquantity)} Kg</TableCell> {/* Prepared Quantity */}
                                        <TableCell className="text-center font-semibold text-red-500">{formatNumber((parseFloat(item.quantity) - parseFloat(item.actualquantity)).toString())} Kg</TableCell> {/* Prepared Quantity */}
                                        <TableCell className="text-center">{formatNumber(item.unitRate)} &#8377;</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.totalBill)} &#8377;</TableCell>
                                        <TableCell className="text-center">
                                            <input type="checkbox" checked={item.gst} />
                                        </TableCell> {/* GST */}
                                        {/* <TableCell className="text-center">{item.editStatus}</TableCell> */}
                                        <TableCell className="text-center">{item.createdBy}</TableCell> {/* Created By */}
                                        <TableCell className="text-center">{item.approvedBy}</TableCell> {/* Actioned By */}
                                        <TableCell className="text-center">{item.remarks}</TableCell>
                                        <TableCell className="text-center">

                                            {item.ordStatus !== 1 && (item.ordStatus === 1 ?
                                                (<button className="bg-red-500  p-2 text-white rounded opacity-40 " disabled={true}>Closed</button>) :
                                                (<Popover>
                                                    <PopoverTrigger>
                                                        <button className={`p-2 text-white rounded ${(item.ordApproveStatus === 'Approved' ||
                                                            item.ordApproveStatus === 'Rejected'
                                                        ) ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={(item.ordApproveStatus === 'Approved' ||
                                                            item.ordApproveStatus === 'Rejected') ? true : false}>Action</button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                        {/* Approve Order */}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger className="flex">
                                                                <FcApprove size={25} /> <button className="bg-transparent  pl-1 text-left hover:text-green-500" >Approve</button>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle> Do You want to Approve the Purhase Order ?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will Trigger Mapping of the Purchase Order
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>

                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleOrderApprove(item)}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>

                                                        </AlertDialog>

                                                        {/* Reject Order */}
                                                        <AlertDialog >
                                                            <AlertDialogTrigger className="flex mt-2">
                                                                <FcDisapprove size={25} /> <button className="bg-transparent  pl-1 text-left hover:text-red-500" >Reject</button>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle> Do You want to Reject the Purhase Order ?</AlertDialogTitle>
                                                                    <AlertDialogDescription>

                                                                        This will close the Purchase Order

                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>

                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleOrderreject(item.id)}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>

                                                        </AlertDialog>
 
                                                    </PopoverContent>

                                                </Popover>))}
                                        </TableCell>

                                    </TableRow>
                                );
                            })) : (<TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                            </TableRow>)}

                        </TableBody>

                    </Table>) : (<Table className="mt-4">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">


                            <TableHead className="text-center" >Sl No.</TableHead>

                            <TableHead className="text-center" >Origin</TableHead>
                            <TableHead className="text-center" >Final Grade</TableHead>
                            <TableHead className="text-center" >Demand Order Stock </TableHead>
                            <TableHead className="text-center" >Issued Order Stock</TableHead>
                            <TableHead className="text-center" >Current Backlog</TableHead>




                        </TableHeader>
                        <TableBody>
                            {Data.length > 0 ? (Data.map((item: any, idx) => {
                                return (
                                    <TableRow key={item.id} >
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>

                                        <TableCell className="text-center  ">{item.origin}</TableCell>
                                        <TableCell className="text-center  ">{item.grade}</TableCell>
                                        <TableCell className="text-center ">{formatNumber((parseFloat(item.openquantity) + parseFloat(item.thresoldopenquantity)).toString())} Kg</TableCell>
                                        <TableCell className="text-center ">{formatNumber(((item.consumequantity ? parseFloat(item.consumequantity) : 0) + (item.thresoldconsumequantity ? parseFloat(item.thresoldconsumequantity) : 0)).toString())} Kg</TableCell>
                                        <TableCell className="text-center ">{formatNumber(((parseFloat(item.openquantity) + parseFloat(item.thresoldopenquantity))
                                            - (item.consumequantity ? parseFloat(item.consumequantity) : 0 + item.thresoldconsumequantity ? parseFloat(item.thresoldconsumequantity) : 0)).toString())} Kg</TableCell>


                                        <TableCell className="text-center font-semibold">{item.createdBy}</TableCell>





                                    </TableRow>
                                );
                            })) : (<TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                            </TableRow>)}

                        </TableBody>

                    </Table>)}





                <Pagination style={{ display: blockpagen }} className="pt-5 ">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setPage((prev) => {
                                if (prev === 1) {
                                    return prev
                                }
                                if (prev <= 0) {
                                    return prev + 1
                                }
                                return prev - 1
                            })} />
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
                <dialog id="machinescs" className="dashboard-modal">
                          <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
                          <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                            <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>
                
                          {/* <!-- Add more elements as needed --> */}
                        </dialog>
                
                        <dialog id="machineerror" className="dashboard-modal">
                          <button id="machineerrorbtn" className="dashboard-modal-close-btn ">X </button>
                          <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                            <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
                
                          {/* <!-- Add more elements as needed --> */}
                        </dialog>
            </div>

        </>
    )
}

export default ProdTransacTable;
