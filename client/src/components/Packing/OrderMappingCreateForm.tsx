import React, { useEffect, useRef, useState } from "react";
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
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ViewLotDetailsMapping from "./ViewLotDetailsMapping";

interface Props {
    mapping: any[]       
}

interface SectionRowData {
    LotNo:string;
    porigin: string;
    section:string;
    grade: string;
   
    stockquantity: number;
    actual_stockquantity: number;
    prcntg: number;
    mixquantity: number;
    remarks: string;
}


const OrderMappingCreateForm = (props:Props) => {
    const dateIssueref = useRef<HTMLInputElement>(null)
    const [id, setId] = useState<number>()
    const [orderpk, setorderpk] = useState<number>()
    
    const [packingpk, setpackingpk] = useState<number>()
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
    const [viewlotdata, setViewlotData] = useState<any[]>([])
    const [eye, setEye] = useState<boolean>(false)

    
  


    // Calculate the sum of mixquantity
  const calculateMixQuantitySum = (rows: SectionRowData[]) => { 
    //return rows.reduce((total, row) => total + row.mixquantity, 0);

    const mixquantitys = rows.map((row) => row.mixquantity)
    return mixquantitys.reduce((acc, curr) => {
        // If curr is a string, convert it to a number; otherwise, just use the number
        return acc + (typeof curr === 'string' ? Number(curr) : curr);
      }, 0);   
  };
 

 
    useEffect(() => {  
        if(props.mapping[0]){
            console.log(props.mapping[0])
        setId(props.mapping[0].id)
        setorderpk(props.mapping[0].orderpk)
        setpackingpk(props.mapping[0].packingpk)
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
      
        actual_stockquantity: 0,
        prcntg: 100,
        mixquantity: 0,
        remarks: ''
    }
    ]);

      // State to keep track of the mix quantity sum
   const [mixQuantitySum, setMixQuantitySum] = useState<number>(calculateMixQuantitySum(rows));

   useEffect(() => {
    setMixQuantitySum(calculateMixQuantitySum(rows));
  }, [rows]);

    const handleRowChange = (index: number, field: string, fieldvalue: string) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: fieldvalue };
        setRows(newRows)
    }
    const addRow2 = async (e:any) => {
        e.preventDefault()
        setRows([...rows, {
            LotNo:'',
            porigin: '',
            section:'',
            grade: '',
            stockquantity: 0,
         
            prcntg: 100,
            mixquantity: 0,
            actual_stockquantity: 0,
            remarks: ''
        }])
    }
    const deleteRow = (index: number,e:any) => {
        e.preventDefault()
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
         axios.post("/api/packing/prodStockQtyFind", { LotNo: item.LotNo,origin:rows[index].porigin,
            section:rows[index].section,grade:rows[index].grade})
                    .then((res) => {
                        console.log(res)
                        if (res.status === 200) {
                            rows[index].stockquantity=res.data.finalSum
                            
                            handleRowChange(index,'stockquantity',res.data.finalSum)
                            rows[index].actual_stockquantity=res.data.finalSum
                            handleRowChange(index,'actual_stockquantity',res.data.finalSum)
                            if(res.data.finalSum){
                                const mixquantity=Number((rows[index].stockquantity*(rows[index].prcntg/100)).toFixed(2))
                                handleRowChange(index, 'mixquantity', mixquantity.toString())
                            }
                        }

                    })
                    .catch((err) => {
                        if (err.response.status === 404) {
                            rows[index].stockquantity=0
                        }
                    })
        rows[index].LotNo = item.LotNo
        handleRowChange(index, 'LotNo', item.LotNo)
       
       
       
        setLotData([]);
        setLotView("none");

    };

    const handlePrcntgChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        
        rows[index].mixquantity=Number((rows[index].actual_stockquantity*(Number(e.target.value)/100)).toFixed(2))
        handleRowChange(index,'prcntg',e.target.value)
       
     }

     const handleActualQtyChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        handleRowChange(index,'actual_stockquantity',e.target.value)
        rows[index].mixquantity=Number((Number(e.target.value)*(rows[index].prcntg/100)).toFixed(2))
        handleRowChange(index,'actual_stockquantity',e.target.value)
       
     }

     const handleSubmit2 = async (e: React.FormEvent) => {
         e.preventDefault()
         const dateissue = dateIssueref.current?.value
         setisdisable(true)
         //const mixquantitys = rows.map((row) => row.mixquantity)
         //const amount = mixquantitys.reduce((acc, curr) => acc + curr, 0);
        //console.log(amount)

        if (mixQuantitySum>(demandQty?demandQty:Number(props.mapping[0].demandQuantity))) {
            setErrortext('Total Amount Can Not Exceed Demand Quantity')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
         //const quantity = quantityRef.current?.value


         const seen = new Set<string>();
         for (const row of rows) {
             const key = `${row.LotNo}-${row.porigin}-${row.section}-${row.grade}`;
             if (seen.has(key)) {
                 setErrortext(`Duplicate found: LotNo - "${row.LotNo}", Origin - "${row.porigin}", Section - "${row.section}", Grade - "${row.grade}"`);
                 if (errordialog) {
                     (errordialog as any).showModal();
                 }
                 return; // Stop submission if duplicate is found
             }
             seen.add(key);
         }
         const formData = rows.map(row => ({
            mappingDate: dateissue,
            origin: origin,
            orderID: orderID,
            orderDate: orderDate,
            finalgradeName:finalGrade,
            vendorName: vendor,
            orderpk:orderpk,
            packingpk:packingpk,
            demandQuantity:demandQty,
                 ...row
         }))
     
         try{

           
                if(formData.length===1){
                    for (var data of formData) 
                        {
                            await axios.put(`/api/packing/updateOrderMapping/${id}/${mixQuantitySum}`, {data })
                                setErrortext(`Order ID ${orderID} Mapped Successfully`)
                            if(successdialog){
                                (successdialog as any).showModal();
                            }
                            
                        }
                    } 
                    else if(formData.length>1){
                            await axios.put(`/api/packing/updateOrderMappingEntire/${id}/${mixQuantitySum}`, {data:formData })
   
                                    setErrortext(`Order ID ${orderID} Mapped Successfully`)
                                if(successdialog){
                                    (successdialog as any).showModal();
                                }     
                    } 
            
          
            
         }
     
         catch (err){
             console.log(err)
             //await axios.post('/api/storePrimary/deleteStorePrimaryByID',{ id:id,gatepass:gatepass})
             if(axios.isAxiosError(err)){
                 setErrortext(err.response?.data.message ||'An Unexpected Error Occured')
             }
             if(errordialog){
                 (errordialog as any).showModal()
             }
             
             
     
         }
         finally{
             setisdisable(false)
         }
        }

    const [selectedLotSet, setSelectedLotSet] = useState<Set<string>>(new Set());
    const buildLotKey = (
        LotNo: string,
        origin: string,
        section: string,
        grade: string
       
    ) => `${LotNo}-${origin}-${section}-${grade}`;

    const filteredViewLotData = (index: number) => {
        return viewlotdata.filter((item) => {
            const key = buildLotKey(
                item.LotNo,
                item.origin,
                rows[index]?.section,
                rows[index]?.grade
            );

            return !selectedLotSet.has(key);
        });
    };

    const handleOpenLotNo =  (index: any) => {
        // e.preventDefault()
      

        axios.post('/api/packing/viewprodStockQtyFind',{
            origin:rows[index].porigin,
            section:rows[index].section,grade:rows[index].grade}

        ).then(res => {
            console.log(res)
            setViewlotData(res.data)
            setEye(true)
            //setViewlotData(filtered);
            console.log(viewlotdata)
        }).catch((err)=>{
            console.log(err)
            setEye(false)
            
        
        }
        )
    }

    
 




    return (
        <>
            <div>
                <form className='flex flex-col gap-4 bg-white shadow-md rounded-2xl p-6 border border-gray-200 ' onSubmit={handleSubmit2}>

                     <div className="grid grid-cols-2 md:grid-cols-6 gap-3"> 
                                    <div>
                            <Label className="text-xs text-gray-500 font-bold">Order ID</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="order ID" value={orderID} readOnly /> </div>
                                    <div>
                            <Label className="text-xs text-gray-500 font-bold">Order Entry Date</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="order Entry Date" value={orderDate} readOnly /> </div>
                                     <div>
                            <Label className="text-xs text-gray-500 font-bold">Vendor Name</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Vendor Name" value={vendor}  readOnly /> </div> 
                                     <div>
                            <Label className="text-xs text-gray-500 font-bold">Origin</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Origin" value={origin}  readOnly /> </div> 
                                     <div>
                            <Label className="text-xs text-gray-500 font-bold">Final Grade</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300" placeholder="Final Grade" value={finalGrade}  readOnly /> </div> 
                                     <div>
                            <Label className="text-xs text-gray-500 font-bold">Demand Quantity</Label>
                            <Input className="mt-1 bg-yellow-50 font-semibold text-center border-gray-300"  placeholder="Demand Qty" value={demandQty}  readOnly/> </div>
                                     <div>
                            <Label className="text-xs text-gray-500 font-bold">Total Mix Quantity</Label>
                            <Input className="mt-1 bg-pink-50 font-semibold text-center border-gray-300"  placeholder="Demand Qty" value={mixQuantitySum.toFixed(2)}  readOnly/> </div>
                                    <div>
                            <Label className="text-xs text-gray-500 font-bold">Order Mapping date (*)</Label>
                            <Input type='date' className="mt-1  font-semibold text-center border-gray-500 items-center justify-between" ref={dateIssueref} required />
                        </div>
                                    </div>

                    <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                        onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                        <Table className="mt-1 ">
                            <TableHeader className="bg-neutral-100 text-stone-950" >
                                <TableHead className="text-center" >Sl⠀No</TableHead>             
                                <TableHead className="text-center" >Section</TableHead>
                                <TableHead className="text-center" >Grade</TableHead>
                                    <TableHead className="text-center" >View</TableHead>
                                <TableHead className="text-center" >Origin</TableHead>
                            
                                <TableHead className="text-center" >Production⠀Lot⠀No</TableHead>
                                <TableHead className="text-center" >Stock⠀Quantity⠀(Kg)</TableHead>
                                <TableHead className="text-center" >Actual⠀Stock⠀(Kg)</TableHead>
                                <TableHead className="text-center" >Percentage⠀Mix(%)</TableHead>
                                <TableHead className="text-center" >Mixed⠀Quantity⠀(Kg)</TableHead>
                                <TableHead className="text-center" >Mapping⠀Remarks(Any)</TableHead>
                                <TableHead className="text-center" >Action</TableHead>

                            </TableHeader>
                            {rows.map((row, index) => {
                                return (
                                    <>
                                        <TableBody>
                                            <TableRow key={index} className="boiling-row-height">
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell className="text-center ">
                                                <Select value={row.section} onValueChange={(val) => handleRowChange(index, 'section', val)} required={true}>
                                                        <SelectTrigger className="justify-center w-40 bg-purple-100">
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


                                                    
                                  <select className=' flex w-40 items-center  justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                                                      ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                                      onChange={ (e) => handleRowChange(index, 'grade', e.target.value)} value={row.grade}>
                                                              <option key={index} value='' disabled>Grade</option>
                                                              {row.section ? (
                                                                ProdGradeOnSection[row.section as keyof typeof ProdGradeOnSection].map((item) => (
                                                                  <option key={item} value={item}>{item}</option>
                                                                ))
                                                              ) : <option key={index} value=''>Grade</option>}
                                                            </select>
                                                </TableCell>
                                                 <TableCell className="text-center">
                                                    {
                                                        (row.grade && row.section && !row.porigin) ? (
                                                            <Dialog onOpenChange={(isOpen) => {
                                                                if (!isOpen) {
                                                                    rows[index].section=''
                                                                    rows[index].grade=''
                                                                }
                                                            }}>
                                                                <DialogTrigger> 
                                                                    <button className="flex flex-row justify-center w-full text-center" onClick={() => handleOpenLotNo(index)}>
                                                                        
                                                                        
                                                                        <FaEye size={20} className="text-center px-auto flex flex-row w-full justify-center"/></button>
                                                                    
                                                                    </DialogTrigger>
                                                                <DialogContent className='max-w-3xl'>
                                                                    <DialogHeader>
                                                                        <DialogTitle><p className='text-lg text-gray-600 text-center my-1 tracking-wider drop-shadow-xl font-bold'>Stock Details</p></DialogTitle>

                                                                    </DialogHeader>

                                                                    <ViewLotDetailsMapping props={filteredViewLotData(index)} grade={row.grade} index={index} rows={rows} setdata={setSelectedLotSet}
                                                                    buildLotKey={buildLotKey} eye={eye}
                                                                    handleRowChange={handleRowChange}/>

                                                                    
                                                                </DialogContent>
                                                            </Dialog>
                                                        ) : (<p className="w-full text-center flex"><FaEyeSlash size={20} className="text-red-500 px-auto"/></p>
                                                            
                                                        )

                                                    }
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
                                                    <Input className="bg-red-100" placeholder="Lot No" value={row.stockquantity} readOnly />
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Input  placeholder="Lot No" value={row.actual_stockquantity} onChange={(e) => {
                                                            handleActualQtyChange(index, e)
                                                        }} required />
                                                </TableCell>
                                                <TableCell className="text-center" >
                                                    <Input value={row.prcntg} placeholder="%" type="number"
                                                        onChange={(e) => {
                                                            handlePrcntgChange(index, e)
                                                        }} />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Input placeholder="Mix Qty" value={row.mixquantity} 
                                                    
                                                      readOnly />
                                                </TableCell>
                                                <TableCell className="text-center w-30" >

                                                    <Input value={row.remarks} placeholder="remarks" className='w-90' onChange={(e) => {
                                                        handleRowChange(index, 'remarks', e.target.value)
                                                    }} />
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <button className="bg-red-400 text-grey-700 w-7 h-7  text-primary-foreground rounded-md text-center items-center justify-center"
                                                        onClick={(e) => deleteRow(index,e)}><MdDelete size={20} /></button>
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