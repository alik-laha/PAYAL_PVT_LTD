import { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { IssueStatus, TypeOnSection } from "../common/exportData";
import { ScrollArea } from "../ui/scroll-area";
import { findskutypeData, SkuData } from "@/type/type";

interface SectionRowData {
    category: string;
    material: string;
    quantity: number;
    unit: string;
    unitprice: number;
    totalprice: string;
    section: string;
    sectionunit: string;
    leftqty:number;
    damagestatus: string;
    damageqty: number;
    damageunit: string;
    remarks: string;

}


const IssueCreateForm = () => {

    const dateIssueref = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const [errortext, setErrortext] = useState('')
    const [isdisable, setisdisable] = useState<boolean>(false)
    const [sku,setsku]=useState<findskutypeData[]>([])
    const [grade,setGrade]=useState<findskutypeData[]>([])
    const [actvskuindex,setActvskuindex]=useState<number>()
    const [rows, setRows] = useState<SectionRowData[]>([{
        category: '',
        material: '',
        quantity: 0,
        unit: '',
        unitprice: 0,
        totalprice: 0,
        section: '',
        sectionunit: '',
        leftqty:0,
        damagestatus: '',
        damageqty: 0,
        damageunit: '',
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
            category: '',
            material: '',
            quantity: 0,
            unit: '',
            unitprice: 0,
            totalprice: 0,
            section: '',
            sectionunit: '',
            leftqty:0,
            damagestatus: '',
            damageqty: 0,
            damageunit: '',
            remarks: ''
        }])
    }

    const deleteRow = (index: number) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows)
    }
    const type='Store'
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Issue Section',{section:'Issue'})
            .then(res => {
                //console.log(res.data)
                setsku(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Issue Unit',{section:'Issue'})
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        const dateissue = dateIssueref.current?.value
        const username = usernameRef.current?.value

        setisdisable(true)
        const formData = rows.map(row => ({

            Date: dateissue,
            User: username,

            ...row
        }))

        try {

            const res = await axios.post(`/api/issue/createIssueItemEntire`, { data: formData })
            setErrortext(res.data.message)
            if (successdialog) {
                (successdialog as any).showModal();
            }

        }
        catch (err) {
            console.log(err)
            if (axios.isAxiosError(err)) {
                setErrortext(err.response?.data.message || 'An Unexpected Error Occured in Creating Issue Items')
            }
            else {
                setErrortext('An Unexpected Error Occured in Creating Issue Item')
            }
            if(errordialog){
                (errordialog as any).showModal()
            }
        }
        finally {
            setisdisable(false)
        }

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
    const handleTypeChange = (index:number,e: React.ChangeEvent<HTMLSelectElement>) => {
        if(rows[index].material){
            rows[index].material=''
        }
        handleRowChange(index,'category',e.target.value)
        //setVendorName(e.target.value)
        
       
    }
    const [skudata, setSkuData] = useState<SkuData[]>([])
    const [skuview, setSkuView] = useState("none")
    const handleSkuchange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
        if(!rows[index].category){
            setErrortext('Please Select Item Category First')
            if(errordialog!== null)
            {
                (errordialog as any).showModal()
            }
            return
        }
        handleRowChange(index,'material',e.target.value)
        setActvskuindex(index)
        if (e.target.value.length > 0 && skudata.length > 0) {
            setSkuView("block")
        } else {
            setSkuView("none")
        }

       
        axios.post("/api/vendorSKU/skudatafind/Store", { sku: e.target.value,type:rows[index].category })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setSkuData(res.data.skuData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setSkuData([])
                }
            })
    }
    const handleSkuidClick = (index:any,item: SkuData) => {
        // setSku(item.sku)
        axios.post("/api/vendorSKU/skudataCountfind", { sku: item.sku })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    rows[index].leftqty=res.data.finalSum
                    handleRowChange(index,'leftqty',res.data.finalSum)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    rows[index].leftqty=0
                }
            })
        rows[index].material=item.sku
        rows[index].unit=item.unit
        rows[index].damageunit=item.unit
        handleRowChange(index,'material',item.sku)
        
         setSkuView("none")
     }

     const handleRowquantityChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(Number(e.target.value)>rows[index].leftqty){

            setErrortext('Issue Amount is Greater Than Left Amount')
            rows[index].quantity=0
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
           // console.log(rows)
            return
        }
        rows[index].totalprice=(rows[index].unitprice*Number(e.target.value)).toFixed(2)
        handleRowChange(index,'quantity',e.target.value)
       
     }
     const handleRowunitPriceChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        
        rows[index].totalprice=(rows[index].quantity*Number(e.target.value)).toFixed(2)
        handleRowChange(index,'unitprice',e.target.value)
       
     }

     const handleRowdamageChange = (index:number,e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        if(e.target.value!=='Yes'){
            rows[index].damageunit=''
        }
        if(e.target.value==='Yes'){
            rows[index].damageunit=rows[index].unit
            
        }
        
        handleRowChange(index,'damagestatus',e.target.value)
       
     }
    return (
        <>
            <div className="px-5 mt-4">
                     <form className='flex flex-col gap-0.5 ' onSubmit={handleSubmit2}>

                    <div className="mx-8 flex flex-col gap-1">
                        <div className="flex mt-1">
                            <Label className="w-2/4 pt-1">Issue Date(*)</Label>
                            <Input type='date' className="w-2/4 text-center justify-center" placeholder="Vehicle No" ref={dateIssueref} required />
                        </div>
                        <div className="flex mt-1">
                            <Label className="w-2/4 pt-1">Issue to User(*)</Label>
                            <Input className="w-2/4 text-center" placeholder="User Name" ref={usernameRef} required/>
                        </div>
                    </div>

                    <button className="bg-blue-400 font-bold text-grey-700 w-8 h-8 text-primary-foreground rounded-md text-center items-center justify-center"
                        onClick={addRow2}>+</button>
                    <div className="max-h-60 overflow-y-scroll">
                        <Table className="mt-1 ">
                            <TableHeader className="bg-neutral-100 text-stone-950" >
                                <TableHead className="text-center" >Sl. No.</TableHead>
                                <TableHead className="text-center" >Section Unit</TableHead>
                                <TableHead className="text-center" >Section</TableHead>
                                <TableHead className="text-center" >Category</TableHead>
                                <TableHead className="text-center" >SKU/Item_Name</TableHead>
                                <TableHead className="text-center" >Unit</TableHead>
                                <TableHead className="text-center" >Quantity_Left</TableHead>
                                <TableHead className="text-center" >Unit_Price(Rs)</TableHead>
                                <TableHead className="text-center" >Quantity_Issued</TableHead>
                                
                              
                                <TableHead className="text-center" >Total_Price(Rs)</TableHead>
                               
                                
                                <TableHead className="text-center" >Damage Return</TableHead>
                                <TableHead className="text-center" >Damage_Qty</TableHead>
                                <TableHead className="text-center" >Unit</TableHead>
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
                                            <select className="text-center flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleRowChange(index, 'sectionunit', e.target.value)}
                                                    value={row.sectionunit} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Issue Unit</option>
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
                                            <TableCell className="text-center " >
                                            <select className="text-center flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleRowChange(index, 'section', e.target.value)}
                                                    value={row.section} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Section</option>
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



                                                <select className="text-center flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleTypeChange(index, e)}
                                                    value={row.category} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Type</option>
                                                    {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                                                    {type ? (
                                                        TypeOnSection[type as keyof typeof TypeOnSection].map((item) => (
                                                            <option key={item} value={item}>{item}</option>
                                                        ))
                                                    ) : null}
                                                </select>
                                            </TableCell>
                                            <TableCell className="text-center" >
                                                <Input value={row.material} placeholder="material"
                                                    onChange={(e) => handleSkuchange(index, e)} required />
                                                {actvskuindex === index && <ScrollArea className="max-h-24 w-auto overflow-scroll  dropdown-content" style={{ display: skuview }}>
                                                    {
                                                        skudata.map((item: SkuData) => (
                                                            <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleSkuidClick(index, item)}>
                                                                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.sku}</p>

                                                            </div>
                                                        ))
                                                    }
                                                </ScrollArea>}
                                            </TableCell>
                                            <TableCell className="text-center" >
                                          
                                            <Input value={row.unit} placeholder="unit" required onChange={(e) => {
                                                  handleRowChange(index, 'unit', e.target.value)
                                              }}   className="bg-yellow-100"/> 
                                            </TableCell>
                                            <TableCell className="text-red-500 font-semibold">{row.leftqty}</TableCell>
                                            <TableCell className="text-center" >
                                                <Input value={row.unitprice} placeholder="Amount" type="number"
                                                    onChange={(e) => {
                                                        handleRowunitPriceChange(index, e)
                                                    }} />
                                            </TableCell>
                                            <TableCell className="text-center" >
                                                <Input value={row.quantity} placeholder="Qty." type='number'
                                                    onChange={(e) => {
                                                        handleRowquantityChange(index,  e)
                                                    }} required/>
                                            </TableCell>
                                            <TableCell className="text-center" >
                                                <Input value={row.totalprice} placeholder="Amount" type="number" readOnly
                                                  />
                                            </TableCell>
                                            
                                          
                                            
                                            <TableCell className="text-center " >
                                            <select className="text-center flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => handleRowdamageChange(index, e)}
                                                    value={row.damagestatus} required>
                                                    <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Return Status</option>
                                                    {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                                                 
                                                 {
                                                            IssueStatus.map((item) => {
                                                                return (
                                                                    <option key={item} value={item}>
                                                                        {item}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    
                                                </select>
                                            </TableCell>
                                            <TableCell className="text-center" >
                                                <Input value={row.damageqty} placeholder="Qty." type='number'
                                                    onChange={(e) => {
                                                        handleRowChange(index, 'damageqty', e.target.value)
                                                    }} required/>
                                            </TableCell>
                                            <TableCell className="text-center" >
                                          
                                          <Input value={row.damageunit} placeholder="unit" onChange={(e) => {
                                                  handleRowChange(index, 'damageunit', e.target.value)
                                              }}   className="bg-yellow-100"/> 
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
export default IssueCreateForm