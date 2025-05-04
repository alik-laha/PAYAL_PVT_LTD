import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { findskutypeData, rcvVillageInprimaryData, VendorData } from "@/type/type"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Origin } from "../common/exportData";

interface Props {
    data: rcvVillageInprimaryData;
}

const RcvVillageInModify = ({ data }: Props) => {

    const successdialog = document.getElementById('packageMetrialReceveUpdate') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialReciveErrorUpdate') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialRecivecrossUpdate') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigreciveerrorcrossUpdate') as HTMLInputElement;
    const [vendorNameView, setVendorNameView] = useState("none")
    const [vendorData, setVendorData] = useState<VendorData[]>([])
    const invoiceref = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)
    const [date, setDate] = useState<string>('')
    const [gateType, setgateType] = useState<string>('')
    const [gatepass, setGatePass] = useState<string>('')
    const [grossWt, setGrossWt] = useState<string>('')
    const [truck, settruck] = useState<string>('')
    const [VendorName, setVendorName] = useState<string>('')
    const [remarks, setRemarks] = useState<string>('')
    const [netwt, setnetwt] = useState<string>('')
    const [itemtype, setItemType] = useState<string>('')
    const [itemname, setItemname] = useState<string>('')
    const [totalWt, setTotalWt] = useState<string>('')

    const [wholes, setWholes] = useState<string>('');
const [wholesprcntg, setWholesprcntg] = useState<string>('');

const [lw, setLw] = useState<string>('');
const [lwprcntg, setLwprcntg] = useState<string>('');

const [jb, setJb] = useState<string>('');
const [jbprcntg, setJbprcntg] = useState<string>('');

const [jbp, setJbp] = useState<string>('');
const [jbpprcntg, setJbpprcntg] = useState<string>('');

const [sdp, setSdp] = useState<string>('');
const [sdpprcntg, setSdpprcntg] = useState<string>('');

const [husk, setHusk] = useState<string>('');
const [huskprcntg, setHuskprcntg] = useState<string>('');

const [piece, setPiece] = useState<string>('');
const [pieceprcntg, setPieceprcntg] = useState<string>('');

const [dp, setDp] = useState<string>('');
const [dpprcntg, setDpprcntg] = useState<string>('');

const [origin, setOrigin] = useState<string>('');
    const [sku, setsku] = useState<findskutypeData[]>([])
    const [grade, setGrade] = useState<findskutypeData[]>([])
    const [errText, setErrText] = useState<string>('')
    const [isdisable,setisdisable]=useState<boolean>(false)


    useEffect(() => {
        settruck(data.truckNo)
        setVendorName(data.vendorName)
        setGrossWt(data.grossWt)
        setItemType(data.type)
        setItemname(data.sku)
        data.netWeight ? setnetwt(data.netWeight) : setnetwt('')
        setGatePass(data.gatePassNo)
        invoiceref.current!.value = data.invoice
        quantityRef.current!.value=data.quantity
        setRemarks(data.remarks)
        setgateType(data.gateType)
        setTotalWt(data.totalWt)
        setOrigin(data.origin)
        setWholes(data.wholes_quantity)
        setWholesprcntg(data.wholes_prcntg)

        setLw(data.lw_quantity);
        setLwprcntg(data.lw_prcntg);

        setJb(data.jb_quantity);
        setJbprcntg(data.jb_prcntg);

        setJb(data.jbp_quantity);
        setJbprcntg(data.jbp_prcntg);

        setSdp(data.sdp_quantity);
        setSdpprcntg(data.sdp_prcntg);

        setHusk(data.husk_quantity);
        setHuskprcntg(data.husk_prcntg);

        setPiece(data.pieces_quantity);
        setPieceprcntg(data.pieces_prcntg);

        setDp(data.dp_quantity);
        setDpprcntg(data.dp_prcntg);

        setDate(data.recevingDate.slice(0, 10))
        // console.log(data.recevingDate.slice(0, 10))
    }, [])


    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Type', { section: 'Village' })
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
        axios.put('/api/vendorSKU/getItembySection/Item Name', { section: 'Village' })
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


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
    const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //handleRowChange(index,'vendorName',e.target.value)
        setVendorName(e.target.value)
        //setActvindex(index)
        if (e.target.value.length > 0 && vendorData.length > 0) {
            setVendorNameView("block")
        } else {
            setVendorNameView("none")
        }
        let vendortype: string;
        if (gateType === 'IN') {
            vendortype = 'Vendor'
        } else {
            vendortype = 'Party'
        }
        axios.post(`/api/vendorSKU/vendornamefind/Village/`, { vendorName: e.target.value, type: vendortype })
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

    const handleVendoridClick = (item: VendorData) => {
        setVendorName(item.vendorName)
        //handleRowChange(index,'vendorName',item.vendorName)
        setVendorNameView("none")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const resStatus = await axios.post('/api/rcvVillageIn/getStatusVLOT', {date:data.recevingDate})
                console.log(resStatus)
                if (resStatus.data.completed && Number(resStatus.data.completed) ===0) {
                    setErrText('V-LOT has Already Been Created For This Entry')
                    if(errordialog){
                        (errordialog as any).showModal()
                    }
                    
                    return
                }
        setisdisable(true)
        console.log("submit")
        await axios.post(`/api/rcvVillageIn/editVillageInPrimary/${data.id}`, {
             grossWt, netwt, gateType, recevingDate: date, 
             truck, gatepass, invoice: invoiceref.current?.value, 
             itemtype, itemname, VendorN:VendorName,origin,
             wholes,wholesprcntg,lw,lwprcntg,jb,jbprcntg,jbp,jbpprcntg,sdp,sdpprcntg,husk,huskprcntg,piece,pieceprcntg,dp,dpprcntg,
             quantity: quantityRef.current?.value, totalWt, remarks
         })
             .then((res) => {
                 if (res.status === 201) {
                     (successdialog as any).showModal();
                 }
             }
             )
             .catch((err) => {
                 console.log(err)
                 const errorText = err.response.data.message;
                 setErrText(errorText);
                 (errordialog as any).showModal();
             })
             .finally(()=>{
                 setisdisable(false)
             })

    }

    const handleRowChangewholes = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault()
       
        setWholesprcntg(((Number(e.target.value)/Number(totalWt))*100).toFixed(2))
        setWholes(e.target.value)
        
      }


      const handleRowChangelw = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault()
         setLwprcntg(((Number(e.target.value)/Number(totalWt))*100).toFixed(2))
         setLw(e.target.value)
      }     

      const handleRowChangejb = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault()
         setJbprcntg(((Number(e.target.value)/Number(totalWt))*100).toFixed(2))
         setJb(e.target.value)
        
      }  
      
      const handleRowChangejbp = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setJbpprcntg(((Number(e.target.value)/Number(totalWt))*100).toFixed(2))
        setJbp(e.target.value)
       
     } 

      const handleRowChangedp = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault()
         setDpprcntg(((Number(e.target.value)/Number(totalWt))*100).toFixed(2))
         setDp(e.target.value)
        
      }  
      
      const handleRowChangehusk = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault()
         setHuskprcntg(((Number(e.target.value)/Number(totalWt))*100).toFixed(2))
         setHusk(e.target.value)
        
      }  

      const handleRowChangesdp = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault()
         setSdpprcntg(((Number(e.target.value)/Number(totalWt))*100).toFixed(2))
         setSdp(e.target.value)
        
      }  
      const handleRowChangepiece = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault()
         setPieceprcntg(((Number(e.target.value)/Number(totalWt))*100).toFixed(2))
         setPiece(e.target.value)
        
      } 

      const handleRowChangetotalWt = (e: React.ChangeEvent<HTMLInputElement>) => {
         e.preventDefault()
         
         setWholesprcntg((( Number(wholes)/(Number(e.target.value)))*100).toFixed(2))
         setLwprcntg((( Number(lw)/(Number(e.target.value)))*100).toFixed(2))
         setJbprcntg((( Number(jb)/(Number(e.target.value)))*100).toFixed(2))
         setJbpprcntg((( Number(jbp)/(Number(e.target.value)))*100).toFixed(2))
         setSdpprcntg((( Number(sdp)/(Number(e.target.value)))*100).toFixed(2))
         setPieceprcntg((( Number(piece)/(Number(e.target.value)))*100).toFixed(2))
         setHuskprcntg((( Number(husk)/(Number(e.target.value)))*100).toFixed(2))
         setDpprcntg((( Number(dp)/(Number(e.target.value)))*100).toFixed(2))
         
        setTotalWt(e.target.value)
        
      } 



    return (
        <>
            <div className="pl-10 pr-10 mt-3 max-h-80 overflow-y-scroll">
                <form className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
                    <div className="flex"><Label className="w-2/4  pt-1">GatePass No.</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassNo." value={gatepass} readOnly required /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">GatePass Type</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassType" value={gateType} readOnly required /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Date</Label>
                        <Input className="w-2/4 justify-center bg-yellow-100" placeholder="Receiving Date" value={date} required type="date" /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Vehicle No.</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="GatePassNo." value={truck} readOnly required /> </div>


                    <div className="flex"><Label className="w-2/4  pt-1">{gateType === 'IN' ? 'Gross' : 'Tare'} Wt.(Kg)</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Gross/Tare Wt." value={grossWt} readOnly required /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Net Wt.(Kg)</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Nt Wt." value={netwt} readOnly required /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Doc No</Label>
                        <Input className="w-2/4 text-center" placeholder="Invoice No" required ref={invoiceref} /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">{gateType === 'IN' ? 'Vendor' : 'Party'} Name</Label>
                        <Input className="w-2/4 text-center" placeholder="Name" required value={VendorName} onChange={handleVendorChange} /> </div>

                    <ScrollArea className="max-h-24 w-2/4 overflow-scroll w-30 dropdown-content" style={{ display: vendorNameView }}>
                        {
                            vendorData.map((item: VendorData) => (
                                <div key={item.id} className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3" onClick={() => handleVendoridClick(item)}>
                                    <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">{item.vendorName}</p>
                                </div>
                            ))
                        }
                    </ScrollArea>

                    <div className="flex"><Label className="w-2/4  pt-1">Item Type</Label>
                        <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setItemType(e.target.value)}
                            value={itemtype} required>
                            <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Type</option>
                            {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                            {sku ? (
                                sku.map((item: findskutypeData) => (
                                    <option key={item.sku} value={item.sku}>{item.sku}</option>
                                ))
                            ) : null}
                        </select></div>

                    <div className="flex"><Label className="w-2/4  pt-1">Item Name</Label>
                        <select className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50" onChange={(e) => setItemname(e.target.value)}
                            value={itemname} required>
                            <option value="" disabled className="relative flex  cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent 
    focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Name</option>
                            {/* {GatePassSection.map((item: any,idx:number) => (
        <option key={idx} value={item}>{item}</option>
    ))} */}
                            {grade ? (
                                grade.map((item: findskutypeData) => (
                                    <option key={item.sku} value={item.sku}>{item.sku}</option>
                                ))
                            ) : null}
                        </select>
                    </div>

                    <div className="flex"><Label className="w-2/4 mt-2">Origin</Label>
                    <Select value={origin} onValueChange={(value) => setOrigin(value)} >
                        <SelectTrigger className="w-2/4 justify-center">
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
                    {/* <Input   placeholder="Origin"/>  */}</div>



                    <div className="flex"><Label className="w-2/4  pt-1">Item/Bag Count</Label>
                        <Input className="w-2/4 text-center" placeholder="Qty" required type="number" ref={quantityRef} step='0.01' /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Total Wt</Label>
                        <Input className="w-2/4 text-center" placeholder="Wt" type="number" value={totalWt } step='0.01' onChange={(e) => handleRowChangetotalWt(e)} required/> </div>




                    <div className="flex">
                        <Label className="w-2/4 pt-1">Wholes (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="Wholes" type="number" value={wholes} step="0.01" onChange={(e) => handleRowChangewholes(e)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1">Wholes %</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Wholes %" type="number" value={wholesprcntg} step="0.01" readOnly />
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-1">LW (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="LW" type="number" value={lw} step="0.01" onChange={(e) => handleRowChangelw(e)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1">LW %</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="LW %" type="number" value={lwprcntg} step="0.01" readOnly />
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-1">JB (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="JB" type="number" value={jb} step="0.01" onChange={(e) => handleRowChangejb(e)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1">JB %</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="JB %" type="number" value={jbprcntg} step="0.01" readOnly />
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-1">JBP (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="JBP" type="number" value={jbp} step="0.01" onChange={(e) => handleRowChangejbp(e)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1">JBP %</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="JBP %" type="number" value={jbpprcntg} step="0.01" readOnly />
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-1">SDP (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="SDP" type="number" value={sdp} step="0.01" onChange={(e) => handleRowChangesdp(e)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1">SDP %</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="SDP %" type="number" value={sdpprcntg} step="0.01" readOnly />
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-1">Husk (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="Husk" type="number" value={husk} step="0.01" onChange={(e) => handleRowChangehusk(e)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1">Husk %</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Husk %" type="number" value={huskprcntg} step="0.01" readOnly />
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-1">Piece (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="Piece" type="number" value={piece} step="0.01" onChange={(e) => handleRowChangepiece(e)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1">Piece %</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="Piece %" type="number" value={pieceprcntg} step="0.01" readOnly/>
                    </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-1">DP (Kg)</Label>
                        <Input className="w-2/4 text-center" placeholder="DP" type="number" value={dp} step="0.01" onChange={(e) => handleRowChangedp(e)} required/>
                    </div>
                    <div className="flex">
                        <Label className="w-2/4 pt-1">DP %</Label>
                        <Input className="w-2/4 text-center bg-yellow-100" placeholder="DP %" type="number" value={dpprcntg} step="0.01" readOnly />
                    </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Remarks</Label>
                        <Textarea className="w-2/4 text-center" placeholder="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} /> </div>







                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center" disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button>
                </form>


            </div>

            <dialog id="packageMetrialReceveUpdate" className="dashboard-modal">
                <button id="packageMetrialRecivecrossUpdate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification Request Raised Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialReciveErrorUpdate" className="dashboard-modal">
                <button id="packagigreciveerrorcrossUpdate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errText}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )
}
export default RcvVillageInModify;