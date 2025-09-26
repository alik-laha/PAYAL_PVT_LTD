import { useEffect, useState } from "react";

interface IssueModifyProps {
    data: {
    id: number;
    issueID: string;
    date: string;
    category: string;
    materialName: string;
    quantity: string;
    itemunit: string;
    unitPrice: string;
    totalPrice:string;
    section: string;
    subsection: string;
    sectionunit: string;
    issueUser: string;
    damagereturn: string;
    damagequantity: string;
    damageunit: string;
    remarks: string;
    CreatedBy: string;
    editStatus: string;
    modifiedBy:string;
    }
}

import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { findskutypeData, SkuData } from "@/type/type";
import { Button } from "../ui/button";
import { IssueStatus, TypeOnSection } from "../common/exportData";
import { ScrollArea } from "../ui/scroll-area";

const IssueModify = (props: IssueModifyProps) => {
    const [issueID, setIssueID] = useState<string>("")
    const [category, setcategory] = useState<string>("")
    const [material, setmaterial] = useState<string>("")
    const [quantity, setquantity] = useState<string>("")
    const [itemunit, setitemunit] = useState<string>("")
    const [unitprice, setUnitPrice] = useState<string>("")
    const [totPrice, setTotPrice] = useState<string>("")
    const [section, setsection] = useState<string>("")
    const [sectionunit, setSectionUnit] = useState<string>("")
    const [subsection, setsubsection] = useState<string>("")
    const [user, setUser] = useState<string>("")
    const [damage, setdamage] = useState<string>("")
    const [damageqty, setdamageQty] = useState<string>("")
    const [damageunit, setdamageUnit] = useState<string>("")
    const [remarks, setremarks] = useState<string>("")
    const [date, setDate] = useState<string>()
    const [errortext, setErrorText] = useState<string>("")
    const [leftqty, setleftQty] = useState<number>(0)
    
    const [sku,setsku]=useState<findskutypeData[]>([])
    const [grade,setGrade]=useState<findskutypeData[]>([])
    const [subgrade,setsubGrade]=useState<findskutypeData[]>([])
   

    useEffect(() => {
        console.log(props)
        setIssueID(props.data.issueID)
        setcategory(props.data.category)
        setmaterial(props.data.materialName)
        setquantity(props.data.quantity)
        setitemunit(props.data.itemunit)
        setUnitPrice(props.data.unitPrice)
        setTotPrice(props.data.totalPrice)
        setsection(props.data.section)
        setsubsection(props.data.subsection)
        setSectionUnit(props.data.sectionunit)
        setUser(props.data.issueUser)
        setdamage(props.data.damagereturn)
        setdamageQty(props.data.damagequantity)
        setdamageUnit(props.data.damageunit)
        setremarks(props.data.remarks)
        setDate(props.data.date.slice(0, 10))
      
  
    }, [])

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
        axios.post("/api/vendorSKU/skudataCountfind", { sku: props.data.materialName })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setleftQty(Number(res.data.finalSum)+Number(props.data.quantity))
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setleftQty(0)
                }
                
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
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Issue SubSection',{section:'Issue'})
            .then(res => {
                //console.log(res.data)
                setsubGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])

    useEffect(() => {

        setTotPrice((parseFloat(quantity)*parseFloat(unitprice)).toFixed(2)  )
              
    }, [quantity,unitprice])

    const [isdisable,setisdisable]=useState<boolean>(false)
    const successdialog = document.getElementById('rcneditscsDialog') as HTMLInputElement;
    const errordialog = document.getElementById('rcnediterrDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('rcnscscloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('rcnerrorcloseDialog') as HTMLInputElement;
    const [skuview, setSkuView] = useState("none")
    const [skudata, setSkuData] = useState<SkuData[]>([])

    const handleSkuchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setmaterial(e.target.value)
        if (e.target.value.length > 0 && skudata.length > 0) {
            setSkuView("block")
        } else {
            setSkuView("none")
        }
        axios.post("/api/vendorSKU/skudatafind/Store", { sku: e.target.value,type:category })
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
     const type='Store'
     const handleSkuidClick = (item: SkuData) => {

        axios.post("/api/vendorSKU/skudataCountfind", { sku: item.sku })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {

                    if (item.sku===props.data.materialName){
                        setleftQty(Number(res.data.finalSum)+Number(props.data.quantity))
                    }else{
                        setleftQty(res.data.finalSum)
                    }
                 
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setleftQty(0)
                }
                
            })
        setmaterial(item.sku)
        setitemunit(item.unit)
        setSkuView("none")
    }

    const handleRowdamageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        if(e.target.value!=='Yes'){
            setdamageUnit('')
        }
        if(e.target.value=='Yes'){
            setdamageUnit(props.data.itemunit)
        }
        setdamage(e.target.value)
     
       
     }

     const handlequantity = (e: React.ChangeEvent<HTMLInputElement>) => {
       
        if(Number(e.target.value)>leftqty){

            setErrorText('Issue Amount is Greater Than Left Amount')
            setquantity(props.data.quantity)
            const dialogerror = document.getElementById("rcnediterrDialog") as HTMLDialogElement
            dialogerror.showModal()
           // console.log(rows)
            return
        }
       
        setquantity(e.target.value)
     
       
     }
     
     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("submit")
        setisdisable(true)
        axios.post(`/api/issue/editStoreIssue/${props.data.id}`, { 
            category, material,quantity,itemunit,unitprice,totPrice,section,sectionunit,user,damage,damageqty,damageunit,remarks,date,subsection})
            .then((res) => {
                if (res.status === 201) {
                    (successdialog as any).showModal();
                }
            }
            )
            .catch((err) => {
                console.log(err)
                const errorText = err.response.data.message;
                setErrorText(errorText);
                (errordialog as any).showModal();
            }).finally(()=>{
                setisdisable(false)
            })

    }

    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>
                <div className="flex mt-2"><Label className="w-2/4 mt-2">Issue ID</Label>
                 <Input className="w-2/4 bg-yellow-100 text-center font-semibold" placeholder="Issue ID" value={issueID} readOnly /> 
                 </div>
                 
                <div className="flex">
                    <Label className="w-2/4 mt-2">Date of Issue</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Date Of Issue" type="date" value={date } onChange={(e)=> setDate(e.target.value)}/>
                </div>

                <div className="flex">
                    <Label className="w-2/4 mt-2">Section Unit</Label>

                    <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50 font-cursive" onChange={(e) => setSectionUnit(e.target.value)}
                        value={sectionunit} required>
                        {/* <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Grade</option> */}
 
                        {grade ? (
                            grade.map((item: findskutypeData) => (
                                <option className='font-cursive' key={item.sku} value={item.sku}>{item.sku}</option>
                            ))
                        ) : null}
                    </select>
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Section</Label>

                    <select className="font-cursive text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>  setsection(e.target.value)}
                                                    value={section} required>
                                                    {/* <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Unit</option> */}
       
                                               {sku.map((item) => (
                                                            <option className='font-cursive' key={item.sku} value={item.sku}>{item.sku}</option>
                                                        ))} 
                                                    
                                                </select>
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Sub Section</Label>

                    <select className="font-cursive text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>  setsubsection(e.target.value)}
                                                    value={subsection} required>
                                                    {/* <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Unit</option> */}
       
                                               {subgrade.map((item) => (
                                                            <option className='font-cursive' key={item.sku} value={item.sku}>{item.sku}</option>
                                                        ))} 
                                                    
                                                </select>
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Category</Label>

                    <select className="font-cursive text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>  setcategory(e.target.value)}
                                                    value={category} required>
                                                    {/* <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Unit</option> */}
       
       {type ? (
                                                        TypeOnSection[type as keyof typeof TypeOnSection].map((item) => (
                                                            <option className='font-cursive' key={item} value={item}>{item}</option>
                                                        ))
                                                    ) : null}
                                                    
                                                </select>
                </div>
                <div className="flex"><Label className="w-2/4  mt-2">Material Name</Label>
                        <Input className="w-2/4 text-center" placeholder="SKU" required value={material} onChange={handleSkuchange} /> </div>
                    <ScrollArea className="max-h-24 w-2/4 overflow-scroll w-30 dropdown-content" style={{ display: skuview }}>
                        {
                            skudata.map((item: SkuData) => (
                                <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleSkuidClick(item)}>
                                    <p className="font-medium text-sm text-blue-900 py-1 focus:text-base font-cursive">{item.sku}</p>
                                    <p className="text-sm py-1 focus:text-base font-cursive">{item.unit}</p>
                                </div>
                            ))
                        }
                    </ScrollArea>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Unit</Label>
                    <Input className="w-2/4 text-center  justify-center" placeholder="Unit"  value={itemunit } onChange={(e)=> setitemunit(e.target.value)}/>
                </div>
                
                <div className="flex">
                    <Label className="w-2/4 mt-2">Unit Price</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Unit Price" value={unitprice } onChange={(e)=> setUnitPrice(e.target.value)}/>
                </div>
                <div className="flex">
                    <Label className="w-1/4 mt-2">Issue Quantity</Label>
                    <Label className="w-1/4 mt-2 text-red-500">Left Quantity :{leftqty}</Label> 
                    <Input className="w-2/4 text-center justify-center" placeholder="Qty" value={quantity } onChange={(e)=> handlequantity(e)}/>
                </div>

                
                <div className="flex">
                    <Label className="w-2/4 mt-2">Total Price</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Total Price" value={totPrice } readOnly/>
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Issued To User</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="User" value={user } onChange={(e)=> setUser(e.target.value)}/>
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Damage Status</Label>

                    <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) =>  handleRowdamageChange(e)}
                                                    value={damage} required>
                                                    {/* <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Unit</option> */}
       
                                               {IssueStatus.map((item) => (
                                                            <option key={item} value={item}>{item}</option>
                                                        ))} 
                                                    
                                                </select>
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Damage Quantity</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Qty" value={damageqty } onChange={(e)=> setdamageQty(e.target.value)}/>
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Damage Unit</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Unit" value={damageunit } onChange={(e)=> setdamageUnit(e.target.value)}/>
                </div>
                <div className="flex">
                    <Label className="w-2/4 mt-2">Remarks</Label>
                    <Input className="w-2/4 text-center justify-center" placeholder="Remarks" value={remarks } onChange={(e)=> setremarks(e.target.value)}/>
                </div>

                
               
               
                <Button className="bg-orange-500  mt-6 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
            </form>

            <dialog id="rcneditscsDialog" className="dashboard-modal">
                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification of Issue Item Entry is Requested </p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="rcnediterrDialog" className="dashboard-modal">
                <button id="rcnerrorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>



        </div>
    )

}

export default IssueModify