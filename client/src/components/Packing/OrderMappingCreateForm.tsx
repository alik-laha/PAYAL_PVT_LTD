import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Button } from "../ui/button";

import { Origin, ProdGradeOnSection, prodStockSection } from "../common/exportData";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { MdDelete } from "react-icons/md";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";

interface Props {
    mapping: any[]       
}

interface SectionRowData {
    LotNo:string;
    porigin: string;
    section:string;
    grade: string;
    stockquantity: number;
    prcntg: number;
    mixquantity: number;
    remarks: string;
}


const OrderMappingCreateForm = (props:Props) => {

    const [id, setId] = useState<number>()
    const [orderID, setorderID] = useState<string>('')
    const [orderDate, setorderDate] = useState<string>('')
    const [finalGrade, setFinalGrade] = useState<string>('')
    const [origin, setOrigin] = useState<string>('')
    const [demandQty, setDemandQty] = useState<number>()
    const [ vendor, setVendor] = useState<string>('')
    const [lotview, setLotView] = useState("none")
    const [errortext, setErrortext] = useState('')
    const [isdisable, setisdisable] = useState<boolean>(false)
 const [lotdata, setLotData] = useState<any[]>([])
    useEffect(() => {  
        if(props.mapping[0]){
        setId(props.mapping[0].id)
        setorderID(props.mapping[0].orderID)
        setorderDate(props.mapping[0].orderDate.slice(0,10))
        setFinalGrade(props.mapping[0].finalgradeName)
        setOrigin(props.mapping[0].origin)
        setDemandQty(props.mapping[0].demandQuantity)
        setVendor(props.mapping[0].vendorName)
        }
        
    }, [props.mapping[0]]);


    const [rows, setRows] = useState<SectionRowData[]>([{
        LotNo:'',
        porigin: '',
        section:'',
        grade: '',
        stockquantity: 0,
        prcntg: 100,
        mixquantity: 0,
        remarks: ''
    }
    ]);

    const handleRowChange = (index: number, field: string, fieldvalue: string) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: fieldvalue };
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows, {
            LotNo:'',
            porigin: '',
            section:'',
            grade: '',
            stockquantity: 0,
            prcntg: 100,
            mixquantity: 0,
            remarks: ''
        }])
    }
    const deleteRow = (index: number) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows)
    }

    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;

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

    const [actvlotindex,setActvlotindex]=useState<number>()
    
    const handleLotNoChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            //setSku(e.target.value)
            console.log(rows[index])
            if(!rows[index].section){
                setErrortext('Please Select Section')
                if(errordialog!== null)
                {
                    (errordialog as any).showModal()
                }
                return
            }
            if(!rows[index].grade){
                setErrortext('Please Select Grade Name')
                if(errordialog!== null)
                {
                    (errordialog as any).showModal()
                }
                return
            }
            if(!rows[index].porigin){
                setErrortext('Please Select Origin')
                if(errordialog!== null)
                {
                    (errordialog as any).showModal()
                }
                return
            }
            handleRowChange(index,'LotNo',e.target.value)
            setActvlotindex(index)
            
            if (e.target.value.length > 0 && lotdata.length > 0) {
                setLotView("block")
            } else {
                setLotView("none")
            }
            axios.post("/api/packing/findcompleteLot/", { LotNo: e.target.value,
                section:rows[index].section,origin:rows[index].porigin })
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

    const handleLotIdClick = (index: any, item: any) => {
        rows[index].LotNo = item.LotNo
        rows[index].stockquantity = item.leftqty
        handleRowChange(index, 'LotNo', item.LotNo)
        setLotData([]);
        setLotView("none");

    };


    return (
        <>
            <div className="px-5 mt-4">
                <form className='flex flex-col gap-0.5 '>

                      <div className="mx-8 flex flex-col gap-1"> 
                                    <div className="flex mt-4"><Label className="w-2/4  pt-2">Order ID</Label>
                                    <Input className="w-2/4 bg-yellow-100 font-semibold text-center" placeholder="order ID" value={orderID} readOnly /> </div>
                                    <div className="flex"><Label className="w-2/4  pt-2">Order Entry Date</Label>
                                    <Input className="w-2/4  font-semibold text-center" placeholder="order Entry Date" value={orderDate} readOnly /> </div>
                                    <div className="flex"><Label className="w-2/4  pt-2">Vendor Name</Label>
                                    <Input className="w-2/4  font-semibold text-center" placeholder="Vendor Name" value={vendor}  readOnly /> </div> 
                                    <div className="flex"><Label className="w-2/4  pt-2">Origin</Label>
                                    <Input className="w-2/4  font-semibold text-center" placeholder="Origin" value={origin}  readOnly /> </div> 
                                    <div className="flex"><Label className="w-2/4  pt-2">Final Grade</Label>
                                    <Input className="w-2/4  font-semibold text-center" placeholder="Final Grade" value={finalGrade}  readOnly /> </div> 
                                    <div className="flex"><Label className="w-2/4  pt-2">Demand Quantity</Label>
                                    <Input className="w-2/4 text-center  font-semibold text-center"  placeholder="Demand Qty" value={demandQty}  readOnly/> </div>
        
                                    </div>

                    <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                        onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                        <Table className="mt-1 ">
                            <TableHeader className="bg-neutral-100 text-stone-950" >
                                <TableHead className="text-center" >Sl. No.</TableHead>             
                                <TableHead className="text-center" >Section</TableHead>
                                <TableHead className="text-center" >Grade</TableHead>
                                <TableHead className="text-center" >Origin</TableHead>
                                <TableHead className="text-center" >Production Lot_No</TableHead>
                                <TableHead className="text-center" >Mapping_Quantity (Kg)</TableHead>
                                <TableHead className="text-center" >Percentage Mix(%)</TableHead>
                                <TableHead className="text-center" >Mixed_Quantity</TableHead>
                                <TableHead className="text-center w-30" >Mapping_Remarks(Any)</TableHead>
                                <TableHead className="text-center" >Action</TableHead>

                            </TableHeader>
                            {rows.map((row, index) => {
                                return (
                                    <>
                                        <TableBody>
                                            <TableRow key={index} className="boiling-row-height">
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell className="text-center">
                                                <Select value={row.section} onValueChange={(val) => handleRowChange(index, 'section', val)} required={true}>
                                                        <SelectTrigger className="justify-center w-40">
                                                            <SelectValue placeholder="Section" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    prodStockSection.map((item) => {
                                                                        return (
                                                                            <SelectItem key={item} value={item}>
                                                                                {item}
                                                                            </SelectItem>
                                                                        )
                                                                    })
                                                                }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="text-center" >
                                  <select className=' flex w-1/7 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                                                      ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                                      onChange={ (e) => handleRowChange(index, 'grade', e.target.value)} value={row.grade}>
                                                              
                                                              {row.section ? (
                                                                ProdGradeOnSection[row.section as keyof typeof ProdGradeOnSection].map((item) => (
                                                                  <option key={item} value={item}>{item}</option>
                                                                ))
                                                              ) : <option key={index} value=''>Grade</option>}
                                                            </select>
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Select value={row.porigin} onValueChange={(val) => handleRowChange(index, 'porigin', val)} required={true}>
                                                        <SelectTrigger className="justify-center w-40">
                                                            <SelectValue placeholder="Origin" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    Origin.map((item) => {
                                                                        return (
                                                                            <SelectItem key={item} value={item}>
                                                                                {item}
                                                                            </SelectItem>
                                                                        )
                                                                    })
                                                                }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>

                                                <TableCell className="text-center">

                                                     <Input  placeholder="Lot No" value={row.LotNo} onChange={(e)=>handleLotNoChange(index, e)} />
                                                     {actvlotindex === index && <ScrollArea className="h-30 w-30 dropdown-content" style={{ display: lotview }}>
                                                                             {
                                                                                 lotdata.map((item) => (
                                                                                     <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3"
                                                                                      onClick={() => handleLotIdClick(index,item)}>
                                                                                         <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.LotNo}</p>
                                                                                     </div>
                                                                                 ))
                                                                             }
                                                                         </ScrollArea>}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                <Input  placeholder="Lot No" value={row.stockquantity} readOnly />

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

                <dialog id="successemployeedialog" className="dashboard-modal">
                    <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                    </span>


                </dialog>

                <dialog id="erroremployeedialog" className="dashboard-modal">
                    <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p>
                    </span>


                </dialog>
            </div>
        </>



    )

}
export default OrderMappingCreateForm