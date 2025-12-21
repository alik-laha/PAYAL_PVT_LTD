import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { useState, useEffect, } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { CashewOutEntryData } from "@/type/type"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { MdDelete } from "react-icons/md"
interface Props {
    rcn: CashewOutEntryData[]
}
interface SectionRowData {
    batchNo: string;
    partyName: string;
    gradeName: string;
    quantity: number;
    actualquantity: number;
    noOfBags: number;
    noOfActualBags: number;
    origin: string;
    invoice: string;

}

const CashewOutEntryForm = (props: Props) => {

    const [errortext, setErrorText] = useState<string>("")
     const [gateType, setGateType] = useState<string>("OUT")
    const [id, setId] = useState<number>()
    const [date, setDate] = useState<string>('')
    const [gatepass, setGatePass] = useState<string>('')
    const [grossWt, setGrossWt] = useState<string>('')
    const [truck, settruck] = useState<string>('')
    const [isdisable, setisdisable] = useState<boolean>(false)


    useEffect(() => {
        if (props.rcn[0]) {
            setId(props.rcn[0].id)
            setDate(props.rcn[0].date.slice(0, 10))
            setGrossWt(props.rcn[0].grossWt)
            setGatePass(props.rcn[0].gatePassNo)
            settruck(props.rcn[0].truckNo)
            setGateType('OUT')

        }

    }, [props.rcn[0]]);



    const [rows, setRows] = useState<SectionRowData[]>([{
        batchNo: '',
        partyName: '',
        gradeName: '',
        quantity: 0,
        actualquantity: 0,
        noOfBags: 0,
        noOfActualBags: 0,
        origin: '',
        invoice: ''
    }]);

    const handleRowChange = (index: number, field: string, fieldvalue: string) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: fieldvalue };
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows, {
            batchNo: '',
            partyName: '',
            gradeName: '',
            quantity: 0,
            actualquantity: 0,
            noOfBags: 0,
            noOfActualBags: 0,
            origin: '',
            invoice: ''
        }])
    }
    const [lotdata, setLotData] = useState<any[]>([])
    const [lotview, setLotView] = useState("none")


    const successdialog = document.getElementById('myDialog') as HTMLInputElement;
    const errordialog = document.getElementById('errorDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('closeDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorcloseDialog') as HTMLInputElement;

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

    const handleSubmit3 = async (e: React.FormEvent) => {
        e.preventDefault()

        const sections = rows.map((row) => row.batchNo)

        const hasduplicate = sections.some((item, index) => sections.indexOf(item) !== index);
        if (hasduplicate) {
            setErrorText('Identical Batch No Found !')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
        setisdisable(true)

        const formData = rows.map(row => ({
            GatePassNo: gatepass,
            recevingDate: date,
            TruckNo: truck,
            GrossWt: grossWt,
            ...row
        }))


        try {
            if (formData.length === 1) {
                for (var data of formData) {
                    await axios.put(`/api/cashewOut/updateRcvCashewOut/${id}`, { data })
                    await axios.post("/api/gatepass/updateRcvDisptchStatus", {
                        gatePassNo: gatepass,
                        section: 'FinishedCashew'
                    })
                    setErrorText('Finished Cashew Dispatched Successfully')
                    if (successdialog) {
                        (successdialog as any).showModal();
                    }

                }
            }

            else if (formData.length > 1) {
                await axios.put(`/api/cashewOut/updateRcvCashewOutEntire/${id}`, { formData })
                await axios.post("/api/gatepass/updateRcvDisptchStatus", {
                    gatePassNo: gatepass,
                    section: 'FinishedCashew'
                })
                setErrorText('Finished Cashew Dispatched Successfully')
                if (successdialog) {
                    (successdialog as any).showModal();
                }
            }

        }
        catch (err) {
            console.log(err)
            //await axios.post('/api/storePrimary/deleteStorePrimaryByID',{ id:id,gatepass:gatepass})
            if (axios.isAxiosError(err)) {
                setErrorText(err.response?.data.message || 'An Unexpected Error Occured')
            }
            if (errordialog) {
                (errordialog as any).showModal()
            }



        }
        finally {
            setisdisable(false)
        }

    }

    const [actvbatchindex,setActvbatchindex]=useState<number>()


    const deleteRow = (index: number) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows)
    }
    const handleBatchNoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
        console.log(rows[index])


        handleRowChange(index, 'batchNo', e.target.value)
        setActvbatchindex(index)

        if (e.target.value.length > 0 && lotdata.length > 0) {
            setLotView("block")
        } else {
            setLotView("none")
        }
        axios.post("/api/cashewOut/findcompleteBatchNo", {
            LotNo: e.target.value,
        })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setLotData(res.data.skuData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setLotData([])
                     
                    
                }
            })

    }

    const handleBatchIdClick = (index: any, item: any) => {
        axios.post("/api/cashewOut/findcompleteBatchNo", {
           LotNo: item.BatchID
        })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    rows[index].quantity = res.data.skuData[0].fulfillquantity
                    handleRowChange(index, 'quantity', res.data.skuData[0].fulfillquantity)

                    rows[index].noOfBags = res.data.skuData[0].convpackingquantity
                    handleRowChange(index, 'noOfBags', res.data.skuData[0].convpackingquantity)

                    rows[index].origin = res.data.skuData[0].origin
                    handleRowChange(index, 'origin', res.data.skuData[0].origin)

                    rows[index].gradeName = res.data.skuData[0].gradeName
                    handleRowChange(index, 'gradeName', res.data.skuData[0].gradeName)

                     rows[index].partyName = res.data.skuData[0].vendorName
                    handleRowChange(index, 'partyName', res.data.skuData[0].vendorName)

                }

            })
            .catch((err) => {
                if (err.response.status === 404) {
                    rows[index].batchNo = ''
                }
            })
        rows[index].batchNo = item.BatchID
        handleRowChange(index, 'batchNo', item.BatchID)
        setLotData([]);
        setLotView("none");

    };

    return (
        <>
            <div className="mt-4">



                <form className='flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 border border-gray-200  ' onSubmit={handleSubmit3}>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div><Label className="font-bold text-xs text-gray-500">GatePass No.</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="GatePass No" value={gatepass} readOnly /> </div>
                <div><Label className="text-xs font-bold text-gray-500">GatePass Type</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="GatePass Type" value={gateType} readOnly /> </div>
                <div ><Label className="font-bold text-xs text-gray-500">Dispatch Date</Label>
                <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="BL No." value={date}  readOnly /> </div> 

                        <div><Label className="font-bold text-xs text-gray-500">Gross Wt (Kg)</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Gross Wt." value={grossWt} readOnly /> </div>

                        <div><Label className="font-bold text-xs text-gray-500">Vehicle No.</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Vehicle No." value={truck} readOnly /> </div>
                     

                       
                    </div>
                    <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                        onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                        <Table className="mt-1 ">
                            <TableHeader className="bg-neutral-100 text-stone-950" >
                                <TableHead className="text-center" >Sl⠀No</TableHead>
                                <TableHead className="text-center" >Invoice⠀No</TableHead>
                                <TableHead className="text-center" >Item⠀Batch⠀No</TableHead>
                                <TableHead className="text-center" >Sales⠀PartyName</TableHead>
                                <TableHead className="text-center" >Sale⠀Origin</TableHead>
                                <TableHead className="text-center" >Final⠀Grade⠀Name</TableHead>
                                <TableHead className="text-center" >Count⠀(Pouch/Bucket) </TableHead>
                                 <TableHead className="text-center" >Mapping⠀Weight(Kg)</TableHead>
                                <TableHead className="text-center" >Actual⠀Count⠀(Pouch/Bucket)</TableHead>
                               
                                 <TableHead className="text-center" >Actual⠀Weight(Kg)</TableHead>
                              
                                <TableHead className="text-center" >Action</TableHead>
                            </TableHeader>
                            {rows.map((row, index) => {
                                return (
                                    <>
                                        <TableBody>
                                            <TableRow key={index} className="boiling-row-height">
                                                <TableCell>{index + 1}</TableCell>

                                                <TableCell className="text-center" >
                                                    <Input value={row.invoice} placeholder="No." className="bg-purple-100"
                                                        onChange={(e) => {
                                                            handleRowChange(index, 'invoice', e.target.value)

                                                        }} required />
                                                </TableCell>

                                                <TableCell className="text-center">

                                                    <Input placeholder="Batch No" value={row.batchNo} className="bg-purple-100" onChange={(e) => handleBatchNoChange(index, e)} />
                                                    {actvbatchindex === index && <ScrollArea className="h-30 w-auto overflow-auto dropdown-content" style={{ display: lotview }}>
                                                        {
                                                            lotdata.map((item) => (
                                                                <div key={item.id} className=" gap-y-10 gap-x-4 hover:bg-gray-300 pl-3"
                                                                    onClick={() => handleBatchIdClick(index, item)}>
                                                                    <p className="font-medium text-xs text-left hover:font-semibold text-blue-900 py-1 focus:text-base">{item.BatchID}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </ScrollArea>}
                                                </TableCell>

                                                <TableCell className="text-center" >
                                                    <Input value={row.partyName} className="bg-yellow-100" placeholder="Party Name" required readOnly/>
                                                </TableCell>

                                                <TableCell className="text-center" >
                                                    <Input value={row.origin} className="bg-yellow-100" placeholder="Origin" required readOnly/>
                                                </TableCell>

                                                <TableCell className="text-center" >
                                                    <Input value={row.gradeName} className="bg-yellow-100" placeholder="Grade Name" required readOnly/>
                                                </TableCell>
                                                 <TableCell className="text-center" >
                                                    <Input value={row.noOfBags} className="bg-yellow-100" placeholder="Pouch/Bucket " required readOnly/>
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                    <Input value={row.quantity} className="bg-yellow-100" placeholder="Kg" required readOnly/>
                                                </TableCell>

                                                <TableCell className="text-center" >

                                                    <Input value={row.noOfActualBags} type='number' className='bg-purple-100' onChange={(e) => {
                                                        handleRowChange(index, 'noOfActualBags', e.target.value)
                                                    }} />
                                                </TableCell>

                                                 

                                                <TableCell className="text-center w-30" >

                                                    <Input value={row.actualquantity}  className='bg-purple-100' type='number' onChange={(e) => {
                                                        handleRowChange(index, 'actualquantity', e.target.value)
                                                    }} />
                                                </TableCell>



                                                <TableCell className="text-center">
                                                    <button className="bg-red-400 text-grey-700 w-7 h-7  text-primary-foreground rounded-md text-center items-center justify-center"
                                                        onClick={() => deleteRow(index)}><MdDelete size={20} /></button>
                                                </TableCell>

                                            </TableRow>

                                        </TableBody>

                                    </>
                                )

                            })}

                        </Table>
                    </div>

                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable ? 'Submitting' : 'Submit'}</Button>
                </form>




            </div>
            <dialog id="myDialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="closeDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="errorDialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="errorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )


}
export default CashewOutEntryForm