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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { findskutypeData, SkuData } from "@/type/type";
import { Button } from "../ui/button";

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
    const [user, setUser] = useState<string>("")
    const [damage, setdamage] = useState<string>("")
    const [damageqty, setdamageQty] = useState<string>("")
    const [damageunit, setdamageUnit] = useState<string>("")
    const [remarks, setremarks] = useState<string>("")
    const [date, setDate] = useState<string>()
    const [errortext, setErrorText] = useState<string>("")

    useEffect(() => {
        setIssueID(props.data.issueID)
        setcategory(props.data.category)
        setmaterial(props.data.materialName)
        setquantity(props.data.quantity)
        setitemunit(props.data.itemunit)
        setUnitPrice(props.data.unitPrice)
        setTotPrice(props.data.totalPrice)
        setsection(props.data.section)
        setSectionUnit(props.data.sectionunit)
        setUser(props.data.issueUser)
        setdamage(props.data.damagereturn)
        setdamageQty(props.data.damagequantity)
        setdamageUnit(props.data.damageunit)
        setremarks(props.data.remarks)
        setDate(props.data.date.slice(0, 10))
  
    }, [])
    const [sku,setsku]=useState<findskutypeData[]>([])
    const [grade,setGrade]=useState<findskutypeData[]>([])
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

    return (
        <div className="pl-10 pr-10">
            <form className='flex flex-col gap-1 '>
            <div className="flex mt-2"><Label className="w-2/4 mt-2">Issue ID</Label>
                 <Input className="w-2/4 bg-yellow-100 text-center font-semibold" placeholder="Issue ID" value={issueID} readOnly /> </div>
                 
                <div className="flex">
                    <Label className="w-2/4 mt-2">Date of Issue</Label>
                    <Input className="w-2/4 text-center bg-yellow-100 justify-center" placeholder="Date Of Issue" type="date" value={date } readOnly/>
                </div>
                
               
               
                <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
            </form>

            <dialog id="rcneditscsDialog" className="dashboard-modal">
                <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification of RCN Primary Entry is Requested </p></span>

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