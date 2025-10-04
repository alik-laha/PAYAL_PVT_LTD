import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { Button } from "../ui/button"
import { useState, useEffect } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import axios from "axios"
import { ScrollArea } from "@/components/ui/scroll-area";
import {  findskutypeData, rcvVillageInprimaryData,  VendorData } from "@/type/type"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MdDelete } from "react-icons/md"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Origin } from "../common/exportData"


interface Props {
    rcn: rcvVillageInprimaryData[]      
}
interface SectionRowData{
    sku:string;
   // vendorName:string;
    quantity:number;
    type:string;
    vendorN:string
    remarks:string;
    totalWt:number;
    invoice:string;
    origin:string;
    wholes:number;
    wholesprcntg:number;
    lw:number;
    lwprcntg:number;
    jb:number;
    jbprcntg:number;
    jbp:number;
    jbpprcntg:number;
    sdp:number;
    sdpprcntg:number;
    husk:number;
    huskprcntg:number;
    piece:number;
    pieceprcntg:number;
    unpeel:number;
    unpeelprcntg:number;
    dp:number;
    dpprcntg:number;

}
const RcvVillageInPrimaryEntry = (props:Props) => {

    const [isdisable,setisdisable]=useState<boolean>(false)
    const [vendorNameView, setVendorNameView] = useState("none")
   // const [skudata, setSkuData] = useState<SkuData[]>([])
    const [vendorData, setVendorData] = useState<VendorData[]>([])
   // const quantityRef = useRef<HTMLInputElement>(null)
   // const invoiceref = useRef<HTMLInputElement>(null)
    const [id, setId] = useState<number>()
    const [date, setDate] = useState<string>('')
    const [gateType, setgateType] = useState<string>('')
    const [gatepass, setGatePass] = useState<string>('')
    const [grossWt, setGrossWt] = useState<string>('')
    const [truck, settruck] = useState<string>('')
    //const [actvindex,setActvindex]=useState<number>()
    //const [VendorName, setVendorName] = useState<string>('')
    const [sku,setsku]=useState<findskutypeData[]>([])

    useEffect(() => {  
        if(props.rcn[0]){
        setId(props.rcn[0].id)
        setgateType(props.rcn[0].gateType)
        setDate(props.rcn[0].recevingDate.slice(0,10))
        setGrossWt(props.rcn[0].grossWt)
        setGatePass(props.rcn[0].gatePassNo)
        settruck(props.rcn[0].truckNo)
        }
        
    }, [props.rcn[0]]);

    const [rows,setRows]=useState<SectionRowData[]>([{sku:'',type:'',quantity:0,remarks:'',totalWt:0,vendorN:'',invoice:'',origin:'',
        wholes:0,wholesprcntg:0,lw:0,lwprcntg:0,jb:0,jbprcntg:0,jbp:0,jbpprcntg:0,unpeel:0,unpeelprcntg:0,
        sdp:0,sdpprcntg:0,husk:0,huskprcntg:0,piece:0,pieceprcntg:0,dp:0,dpprcntg:0}]);
    

    const handleRowChange = (index:number,field:string,fieldvalue:string) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
    }
    const addRow2 = () => {
        setRows([...rows,{sku:'',type:'',quantity:0,remarks:'',totalWt:0,vendorN:'',invoice:'',origin:'',unpeel:0,unpeelprcntg:0,
            wholes:0,wholesprcntg:0,lw:0,lwprcntg:0,jbp:0,jbpprcntg:0,jb:0,jbprcntg:0,sdp:0,sdpprcntg:0,husk:0,huskprcntg:0,piece:0,pieceprcntg:0,dp:0,dpprcntg:0}])
    }

    const deleteRow = (index:number) =>{
        const newRows =rows.filter((_,i)=> i!==index);
        setRows(newRows)
    }
 
    const [errortext, setErrortext] = useState('')
    const successdialog = document.getElementById('packageMetrialReceve') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialReciveError') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialRecivecross') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigreciveerrorcross') as HTMLInputElement;

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

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        //const invoice=invoiceref.current?.value

      
         
        const formData = rows.map(row => ({
                GatePassNo: gatepass,
                recevingDate: date,
                TruckNo: truck,
                gateType:gateType,
                GrossWt: grossWt,          
                //invoice:invoice,
                //vendorName:VendorName, 
                ...row
        }))
        setisdisable(true)
        try{

            if(formData.length===1)
                {
                for (var data of formData) 
                    {
                        await axios.put(`/api/rcvVillageIn/updateRcvVillageIn/${id}`, {data })
                        await axios.post("/api/gatepass/updateRcvDisptchStatus", { gatePassNo: gatepass,
                            section:'Village' })
                            setErrortext('Village Items Received Successfully')
                        if(successdialog){
                            (successdialog as any).showModal();
                        }
                        
                    }
                } 

                else if(formData.length>1)
                {
                    await axios.put(`/api/rcvVillageIn/updateRcvVillageInEntire/${id}`, {formData })
                    await axios.post("/api/gatepass/updateRcvDisptchStatus", { gatePassNo: gatepass,
                        section:'Village' })
                        setErrortext('Village Items Received Successfully')
                    if(successdialog){
                        (successdialog as any).showModal();
                    }
                } 
            
        }
        catch (err){
            console.log(err)
            await axios.post('/api/rcvVillageIn/deleteVillageInPrimaryByID',{ id:id,gatepass:gatepass})
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


    const [actvindex,setActvindex]=useState<number>()
    const handleVendorChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        handleRowChange(index,'vendorN',e.target.value)
        //setVendorName(e.target.value)
        setActvindex(index)
        if (e.target.value.length > 0 && vendorData.length > 0) {
            setVendorNameView("block")
        } else {
            setVendorNameView("none")
        }
        let vendortype:string;
        if(gateType==='IN'){
            vendortype='Vendor'
        }else{
            vendortype='Party'
        }
        axios.post(`/api/vendorSKU/vendornamefind/Village/`, { vendorName: e.target.value,type:vendortype  })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setVendorData(res.data.vendorData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setVendorData([])
                }
            })
    }

    const handleVendoridClick = (index:number,item: VendorData) => {
        //setVendorName(item.vendorName)
        handleRowChange(index,'vendorN',item.vendorName)
        setVendorNameView("none")
    }

   
    // function formatNumber(num: any) {
    //     return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    // }
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Type',{section:'Village'})
            .then(res => {
                //console.log(res.data)
                setsku(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

    const [grade,setGrade]=useState<findskutypeData[]>([])
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Name',{section:'Village'})
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

     const handleRowChangewholes = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'wholes',e.target.value)
            rows[index].wholesprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'wholes',e.target.value)
           
         }


         const handleRowChangelw = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'lw',e.target.value)
            rows[index].lwprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'lw',e.target.value)
           
         }     

         const handleRowChangejb = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'jb',e.target.value)
            rows[index].jbprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'jb',e.target.value)
           
         }   

         const handleRowChangejbp = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'jbp',e.target.value)
            rows[index].jbpprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'jbp',e.target.value)
           
         }   

         const handleRowChangedp = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'dp',e.target.value)
            rows[index].dpprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'dp',e.target.value)
           
         }  
         
         const handleRowChangehusk = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'husk',e.target.value)
            rows[index].huskprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'husk',e.target.value)
           
         }  

         const handleRowChangesdp = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'sdp',e.target.value)
            rows[index].sdpprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'sdp',e.target.value)
           
         }  
         const handleRowChangepiece = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'piece',e.target.value)
            rows[index].pieceprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'piece',e.target.value)
           
         } 

         const handleRowChangeunpeel = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            if(Number(e.target.value)>rows[index].totalWt){

                setErrortext('Amount is Greater Than Total Amount')
                rows[index].quantity=0
                const dialogerror = document.getElementById("packagingMetirialReciveError") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }
            handleRowChange(index,'unpeel',e.target.value)
            rows[index].unpeelprcntg=Number(((Number(e.target.value)/(rows[index].totalWt))*100).toFixed(2))
            handleRowChange(index,'unpeel',e.target.value)
           
         } 


         const handleRowChangetotalWt = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            handleRowChange(index,'totalWt',e.target.value)
            rows[index].wholesprcntg=Number((( rows[index].wholes/(Number(e.target.value)))*100).toFixed(2))
            rows[index].lwprcntg=Number((( rows[index].lw/(Number(e.target.value)))*100).toFixed(2))
            rows[index].jbprcntg=Number((( rows[index].jb/(Number(e.target.value)))*100).toFixed(2))
            rows[index].jbpprcntg=Number((( rows[index].jbp/(Number(e.target.value)))*100).toFixed(2))
            rows[index].sdpprcntg=Number((( rows[index].sdp/(Number(e.target.value)))*100).toFixed(2))
            rows[index].pieceprcntg=Number((( rows[index].piece/(Number(e.target.value)))*100).toFixed(2))
            rows[index].huskprcntg=Number((( rows[index].husk/(Number(e.target.value)))*100).toFixed(2))
            rows[index].dpprcntg=Number((( rows[index].dp/(Number(e.target.value)))*100).toFixed(2))
            rows[index].unpeelprcntg=Number((( rows[index].unpeel/(Number(e.target.value)))*100).toFixed(2))
            
            handleRowChange(index,'totalWt',e.target.value)
           
         } 
         
    

    return (
        <>
            <div className="px-5 mt-4">
                <form className='flex flex-col gap-0.5 ' onSubmit={handleSubmit2}>
                <div className="mx-8 flex flex-col gap-1"> 
                <div className="flex mt-4"><Label className="w-1/4  pt-2">GatePass No.</Label>
                <Input className="w-1/4 bg-yellow-100 font-semibold text-center" placeholder="GatePass No" value={gatepass} readOnly /> </div>
                <div className="flex"><Label className="w-1/4  pt-2">GatePass Type</Label>
                <Input className="w-1/4 bg-yellow-100 font-semibold text-center" placeholder="Type" value={gateType} readOnly /> </div>
                <div className="flex"><Label className="w-1/4  pt-2">Date</Label>
                <Input className="w-1/4 bg-yellow-100 font-semibold text-center" placeholder="Date" value={date}  readOnly /> </div> 
                
                <div className="flex"><Label className="w-1/4  pt-2">Vehicle No.</Label>
                <Input className="w-1/4 bg-yellow-100 font-semibold text-center" placeholder="Vehicle No" value={truck}  readOnly /> </div> 
                {/* <div className="flex"><Label className="w-2/4  pt-2">Document No</Label>
                <Input className="w-2/4 text-center" placeholder="Doc No" required  ref={invoiceref} /> </div> */}

                
                {/* <div className="flex "><Label className="w-2/4  pt-2">{gateType==='IN'? 'Vendor':'Party'} Name</Label>
                <div className="w-2/4">
                <Input className="justify-center text-center" placeholder="Name" required value={VendorName} onChange={(e)=>{handleVendorChange(e)}} />  
                <ScrollArea className="max-h-24 w-1/3 overflow-y-scroll dropdown-content" style={{ display: vendorNameView,position:'fixed'}}>
                                                    {
                                                        vendorData.map((item: VendorData) => (
                                                            <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick( item)}>
                                                                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.vendorName}</p>
                                                            </div>
                                                        ))
                                                    }
                                                </ScrollArea> 
                </div>
                
     
                                                   
                </div>   */}
                       

                </div>
                <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                    onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                    <Table className="mt-1 ">
                        <TableHeader className="bg-neutral-100 text-stone-950" >
                            <TableHead className="text-center" >Sl. No.</TableHead>
                            <TableHead className="text-center" >Item_Type</TableHead>
                            <TableHead className="text-center" >Item_Name</TableHead>
                          
                            <TableHead className="text-center" >Origin</TableHead>
                            <TableHead className="text-center" >Vendor_Name</TableHead>
                            <TableHead className="text-center" >Invoice_No</TableHead>
                          
                            
                            <TableHead className="text-center" >Bucket</TableHead>   
                            <TableHead className="text-center" >Total_Weight</TableHead>
                            <TableHead className="text-center">Wholes</TableHead>
                                <TableHead className="text-center"> %</TableHead>
                                <TableHead className="text-center">LW</TableHead>
                                <TableHead className="text-center">%</TableHead>
                                <TableHead className="text-center">JB</TableHead>
                                <TableHead className="text-center">%</TableHead>
                                <TableHead className="text-center">JBP</TableHead>
                                <TableHead className="text-center">%</TableHead>
                                <TableHead className="text-center">SDP</TableHead>
                                <TableHead className="text-center"> %</TableHead>
                                <TableHead className="text-center">Husk</TableHead>
                                <TableHead className="text-center"> %</TableHead>
                                <TableHead className="text-center">Piece</TableHead>
                                <TableHead className="text-center"> %</TableHead>
                                <TableHead className="text-center">DP</TableHead>
                                <TableHead className="text-center"> %</TableHead>
                                <TableHead className="text-center">Unpeel</TableHead>
                                <TableHead className="text-center"> %</TableHead>
                            <TableHead className="text-center w-30" >Remarks</TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        </TableHeader>
                        {rows.map((row, index) => {
                            return (
                                <>
                                    <TableBody>
                                        <TableRow key={index} className="boiling-row-height">
                                            <TableCell>{index + 1}</TableCell>
                                           
                                            <TableCell className="text-center " >
                                            <select className="text-center flex w-40 h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleRowChange(index, 'type', e.target.value)}
                                                    value={row.type} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Type</option>
                                                    {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                                                    {sku ? (
                                                        sku.map((item:findskutypeData) => (
                                                            <option key={item.sku} value={item.sku}>{item.sku}</option>
                                                        ))
                                                    ) : null}
                                                </select>
                                            </TableCell>
                                            <TableCell className="text-center " >
                                            <select className="text-center flex w-40 h-8  rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleRowChange(index, 'sku', e.target.value)}
                                                    value={row.sku} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Item Name</option>
                                                    {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                                                    {grade ? (
                                                        grade.map((item:findskutypeData) => (
                                                            <option key={item.sku} value={item.sku}>{item.sku}</option>
                                                        ))
                                                    ) : null}
                                                </select>
                                            </TableCell>
                                           
                                           
                                            <TableCell className="text-center">
                                                <Select value={row.origin} onValueChange={(val) => handleRowChange(index, 'origin', val)} required={true}>
                                                    <SelectTrigger className="justify-center w-40 bg-red-100">
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
                                            <TableCell className="text-center" >
                                                <Input value={row.vendorN} placeholder="Vendor Name" className="w-40"
                                                    onChange={(e) => handleVendorChange(index, e)} required />
                                                {actvindex === index && <ScrollArea className="max-h-24 w-auto overflow-auto  dropdown-content" style={{ display: vendorNameView }}>
                                                    {
                                                        vendorData.map((item: VendorData) => (
                                                            <div key={item.id} className=" gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick(index, item)}>
                                                                <p className="font-medium text-xs text-blue-900 py-1 hover:font-semibld text-left ml-1 focus:text-base">{item.vendorName}</p>

                                                            </div>
                                                        ))
                                                    }
                                                </ScrollArea>}
                                            </TableCell>
                                            <TableCell className="text-center w-40" >
                                          
                                                <Input value={row.invoice} placeholder="invoice"  onChange={(e) => {
                                                        handleRowChange(index, 'invoice', e.target.value)
                                                    }} /> 
                                            </TableCell>


                                            <TableCell className="text-center" >
                                                <Input value={row.quantity} placeholder="Qty." type='number'
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'quantity', e.target.value)

                                                    }} required/>
                                            </TableCell>
                                           
                                            <TableCell className="text-center" >
                                                <Input value={row.totalWt} placeholder="unitWt" type="number" className="bg-purple-100"
                                                    onChange={(e) => {
                                                        handleRowChangetotalWt(index, e)
                                                    }} />
                                            </TableCell>


                                            <TableCell className="text-center">
                                                <Input value={row.wholes} placeholder="wholes" type="number" className="w-20"
                                                    onChange={(e) => {handleRowChangewholes(index,e)}} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.wholesprcntg} placeholder="wholesprcntg" type="number" className="bg-red-100 w-20"
                                                    readOnly />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.lw} placeholder="lw" type="number" className="w-20"
                                                    onChange={(e) => handleRowChangelw(index, e)} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.lwprcntg} placeholder="lwprcntg" type="number" className="bg-red-100 w-20"
                                                   readOnly />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.jb} placeholder="jb" type="number" className="w-20"
                                                    onChange={(e) => handleRowChangejb(index,e)} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.jbprcntg} placeholder="jbprcntg" type="number" className="bg-red-100 w-20"
                                                  readOnly />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.jbp} placeholder="jbp" type="number" className="w-20"
                                                    onChange={(e) => handleRowChangejbp(index,e)} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.jbpprcntg} placeholder="jbp prcntg" type="number" className="bg-red-100 w-20"
                                                  readOnly />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.sdp} placeholder="sdp" type="number" className="w-20"
                                                    onChange={(e) => handleRowChangesdp(index, e)} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.sdpprcntg} placeholder="sdpprcntg" type="number" className="bg-red-100 w-20"
                                                  readOnly />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.husk} placeholder="husk" type="number" className="w-20"
                                                    onChange={(e) => handleRowChangehusk(index, e)} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.huskprcntg} placeholder="huskprcntg" type="number" className="bg-red-100 w-20"
                                                   readOnly />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.piece} placeholder="piece" type="number" className=" w-20"
                                                    onChange={(e) => handleRowChangepiece(index,e)} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.pieceprcntg} placeholder="pieceprcntg" type="number" className="bg-red-100 w-20"
                                                   readOnly />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.dp} placeholder="dp" type="number" className="w-20"
                                                    onChange={(e) => handleRowChangedp(index, e)} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.dpprcntg} placeholder="dpprcntg" type="number" className="w-20 bg-red-100"
                                                   readOnly />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input value={row.unpeel} placeholder="Unpeel" type="number" className="w-20"
                                                    onChange={(e) => handleRowChangeunpeel(index, e)} />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input value={row.unpeelprcntg} placeholder="Unpeel prcntg" type="number" className="w-20 bg-red-100"
                                                   readOnly />
                                            </TableCell>


                                         
                                           
                                            <TableCell className="text-center w-30" >
                                          
                                                <Input value={row.remarks} placeholder="remarks" className='w-90' onChange={(e) => {
                                                        handleRowChange(index, 'remarks', e.target.value)
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
                    
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                </form>
                <dialog id="packageMetrialReceve" className="dashboard-modal">
                <button id="packageMetrialRecivecross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialReciveError" className="dashboard-modal">
                <button id="packagigreciveerrorcross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            </div>

           
        </>
    )
}

export default RcvVillageInPrimaryEntry;