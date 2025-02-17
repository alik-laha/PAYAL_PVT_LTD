import {   SortingData  } from "@/type/type";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Origin } from "../common/exportData";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import axios from "axios";

interface Props {
    borma: SortingData     
}
interface RCNEntries {
    rcv_jjh: string;
    rcv_sjh: string;
    rcv_sjh1: string;
    rcv_jh1: string;
    rcv_jk_k: string;
    rcv_sp1: string;
    rcv_bigTaiho: string;
    current_backlog: string;
    issue_add_4:string;
    issue_add_5:string;
    issue_add_6:string;
    issue_add_7:string;
    issue_add_8:string;
    issue_add_9:string;
    Status:string;
}
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
const RCNSortingReMix = (props:Props) => {

        const [sourcercv_sjh, setsourcercv_sjh] = useState<number>(0);
        const [sourcercv_jjh, setsourcercv_jjh] = useState<number>(0);
        const [sourcercv_sjh1, setsourcercv_sjh1] = useState<number>(0);
        const [sourcercv_jh1, setsourcercv_jh1] = useState<number>(0);
        const [sourcercv_jkk, setsourcercv_jkk] = useState<number>(0);
        const [sourcercv_sp1, setsourcercv_sp1] = useState<number>(0);
        const [sourcercv_bigt, setsourcercv_bigt] = useState<number>(0);

        const [fsourcercv_sjh, setfsourcercv_sjh] = useState<string>();
        const [fsourcercv_sjh1, setfsourcercv_sjh1] = useState<string>();
        const [fsourcercv_jh1, setfsourcercv_jh1] = useState<string>();
        const [fsourcercv_jjh, setfsourcercv_jjh] = useState<string>();
        const [fsourcercv_jkk, setfsourcercv_jkk] = useState<string>();
        const [fsourcercv_sp1, setfsourcercv_sp1] = useState<string>();
        const [fsourcercv_bigt, setfsourcercv_bigt] = useState<string>('0');
        const [fsourcebacklog, setfSourcebacklog] = useState<string>('');
         
        const [successflag, setSuccessflag] = useState<string>('none');
        const [successflagtable, setSuccessflagtable] = useState<string>('none');

        const [destbacklog, setdestbacklog] = useState<string>("");
        const [destlot, setdestlot] = useState<string>("");
        const [destid, setdestid] = useState<number>(0);

        const [destrcv_sjh, setdestrcv_sjh] = useState<string>("");
        const [destrcv_sjh1, setdestrcv_sjh1] = useState<string>("");
        const [destrcv_jjh, setdestrcv_jjh] = useState<string>("");
        const [destrcv_jkk, setdestrcv_jkk] = useState<string>("");
        const [destrcv_sp1, setdestrcv_sp1] = useState<string>("");
        const [destrcv_jh1, setdestrcv_jh1] = useState<string>("");
        const [destrcv_bigt, setdestrcv_bigt] = useState<string>("");
        const [destrcv_sjhN, setdestrcv_sjhN] = useState<string>("");
        const [destrcv_sjh1N, setdestrcv_sjh1N] = useState<string>("");
        const [destrcv_jjhN, setdestrcv_jjhN] = useState<string>("");
        const [destrcv_jkkN, setdestrcv_jkkN] = useState<string>("");
        const [destrcv_sp1N, setdestrcv_sp1N] = useState<string>("");
        const [destrcv_jh1N, setdestrcv_jh1N] = useState<string>("");
        const [destrcv_status, setdestrcv_status] = useState<string>("");

        const [destorigin, setdestorigin] = useState<string>("");
        const [sourceactualbacklog, setsourceactualbacklog] = useState<string>("");
       
        const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
        const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
        // const dialog = document.getElementById('myDialog');
        const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
        const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;
        const [isdisable,setisdisable]=useState<boolean>(false)
        const [errortext, setErrortext] = useState('')
        if (closeDialogButton) {
            closeDialogButton.addEventListener('click', () => {
                if (successdialog != null) {
                    (successdialog as any).close();
                    window.location.reload();
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
        const [datarcv, setdatarcv] = useState<RCNEntries>({} as RCNEntries);
        useEffect(() => {
            setfsourcercv_sjh(props.borma ?((props.borma.issue_add_5 ?Number(props.borma.issue_add_5):0)-sourcercv_sjh).toFixed(2):'');
            setfsourcercv_sjh1(props.borma ?((props.borma.issue_add_6 ?Number(props.borma.issue_add_6):0)-sourcercv_sjh1).toFixed(2):'');
            setfsourcercv_jjh(props.borma ?((props.borma.issue_add_4 ?Number(props.borma.issue_add_4):0)-sourcercv_jjh).toFixed(2):'');
            setfsourcercv_jh1(props.borma ?((props.borma.issue_add_7 ?Number(props.borma.issue_add_7):0)-sourcercv_jh1).toFixed(2):'');
            setfsourcercv_jkk(props.borma ?((props.borma.issue_add_8 ?Number(props.borma.issue_add_8):0)-sourcercv_jkk).toFixed(2):'');
            setfsourcercv_sp1(props.borma ?((props.borma.issue_add_9 ?Number(props.borma.issue_add_9):0)-sourcercv_sp1).toFixed(2):'');
            setfsourcercv_bigt(props.borma ?((props.borma.rcv_bigTaiho ?Number(props.borma.rcv_bigTaiho):0)-sourcercv_bigt).toFixed(2):''); 
            setfSourcebacklog(props.borma ?(Number(props.borma.current_backlog) - 
            (sourcercv_sjh+sourcercv_sjh1+sourcercv_jjh+sourcercv_jh1+sourcercv_jkk+sourcercv_sp1+
            sourcercv_bigt)).toFixed(2):'');
            
            setdestrcv_sjh(((datarcv.rcv_sjh ?Number(datarcv.rcv_sjh):0)+sourcercv_sjh).toFixed(2));
            setdestrcv_sjh1(((datarcv.rcv_sjh1 ?Number(datarcv.rcv_sjh1):0)+sourcercv_sjh1).toFixed(2));
            setdestrcv_jjh(((datarcv.rcv_jjh ?Number(datarcv.rcv_jjh):0)+sourcercv_jjh).toFixed(2));
            setdestrcv_jkk(((datarcv.rcv_jk_k ?Number(datarcv.rcv_jk_k):0)+sourcercv_jkk).toFixed(2));
            setdestrcv_sp1(((datarcv.rcv_sp1 ?Number(datarcv.rcv_sp1):0)+sourcercv_sp1).toFixed(2));
            setdestrcv_jh1(((datarcv.rcv_jh1 ?Number(datarcv.rcv_jh1):0)+sourcercv_jh1).toFixed(2));
            setdestrcv_bigt(((datarcv.rcv_bigTaiho ?Number(datarcv.rcv_bigTaiho):0)+sourcercv_bigt).toFixed(2));
            setdestrcv_sjhN(((datarcv.issue_add_5 ?Number(datarcv.issue_add_5):0)+sourcercv_sjh).toFixed(2));
            setdestrcv_sjh1N(((datarcv.issue_add_6 ?Number(datarcv.issue_add_6):0)+sourcercv_sjh1).toFixed(2));
            setdestrcv_jjhN(((datarcv.issue_add_4 ?Number(datarcv.issue_add_4):0)+sourcercv_jjh).toFixed(2));
            setdestrcv_jkkN(((datarcv.issue_add_8 ?Number(datarcv.issue_add_8):0)+sourcercv_jkk).toFixed(2));
            setdestrcv_sp1N(((datarcv.issue_add_9 ?Number(datarcv.issue_add_9):0)+sourcercv_sp1).toFixed(2));
            setdestrcv_jh1N(((datarcv.issue_add_7 ?Number(datarcv.issue_add_7):0)+sourcercv_jh1).toFixed(2));
         
         
            setdestbacklog(((datarcv.current_backlog?Number(datarcv.current_backlog):0) + 
            (sourcercv_sjh+sourcercv_sjh1+sourcercv_jjh+sourcercv_jh1+sourcercv_jkk+sourcercv_sp1+
                sourcercv_bigt)).toFixed(2));
        }, [ sourcercv_sjh,sourcercv_sjh1,sourcercv_jjh,sourcercv_jh1,sourcercv_jkk,sourcercv_sp1,sourcercv_bigt]);

        useEffect(() => {
            setfsourcercv_sjh(props.borma ? props.borma.issue_add_5:'');
            setfsourcercv_sjh1(props.borma ? props.borma.issue_add_6:'');
            setfsourcercv_jjh(props.borma ? props.borma.issue_add_4:'');
            setfsourcercv_jh1(props.borma ?props.borma.issue_add_7:'');
            setfsourcercv_sp1(props.borma ?props.borma.issue_add_9:'');
            setfsourcercv_jkk(props.borma ?props.borma.issue_add_8:'');
            setfsourcercv_bigt(props.borma ?props.borma.rcv_bigTaiho:'');
            setfSourcebacklog(props.borma ?props.borma.current_backlog:'');
            setsourceactualbacklog(props.borma ?props.borma.current_backlog:'')
        }, [ props.borma]);

        const handleSearch = async () => {
            setSuccessflag('none')
            setSuccessflagtable('none')
            if(Number(destlot.split("-")[1])<Number(props.borma.LotNo.split("-")[1])){
                
                if(successflag==='flex'){
                    setSuccessflag('none') 
                    setSuccessflagtable('none')
                    setErrortext('Mixing Cant be performed with Previous Lot')
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialogerror.showModal()
                    return 
                }
                else{
                    setSuccessflag('none') 
                    setSuccessflagtable('none')
                    setErrortext('Mixing Cant be performed with Previous Lot')
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialogerror.showModal()
                    return 
                }    
            }

            const response = await axios.post('/api/sorting/sortingmixsearch', {
                lotNo: destlot,
                origin: destorigin,
            })
            const data1 = await response.data
      
            //console.log(data1.rcnEntries.current_backlog)
            if(data1.rcnEntries && data1.rcnEntries.current_backlog && data1.rcnEntries.editStatus!=='Pending'){
                setSuccessflag('flex')
                setSuccessflagtable('contents')
                setdatarcv(data1.rcnEntries)
                setdestid(data1.rcnEntries.id)
                setdestbacklog(data1.rcnEntries.current_backlog)
               
          
                setdestrcv_sjh(data1.rcnEntries.rcv_sjh ? data1.rcnEntries.rcv_sjh :0)
                setdestrcv_sjh1(data1.rcnEntries.rcv_sjh1 ? data1.rcnEntries.rcv_sjh1 :0)
                setdestrcv_jjh(data1.rcnEntries.rcv_jjh ? data1.rcnEntries.rcv_jjh :0)
                setdestrcv_jh1(data1.rcnEntries.rcv_jh1 ? data1.rcnEntries.rcv_jh1 :0)
                setdestrcv_sp1(data1.rcnEntries.rcv_sp1 ? data1.rcnEntries.rcv_sp1 :0)
                setdestrcv_jkk(data1.rcnEntries.rcv_jkk ? data1.rcnEntries.rcv_jkk :0)
                setdestrcv_sjhN(data1.rcnEntries.issue_add_5 ? data1.rcnEntries.issue_add_5 :0)
                setdestrcv_sjh1N(data1.rcnEntries.issue_add_6 ? data1.rcnEntries.issue_add_6 :0)
                setdestrcv_jjhN(data1.rcnEntries.issue_add_4 ? data1.rcnEntries.issue_add_4 :0)
                setdestrcv_jh1N(data1.rcnEntries.issue_add_7 ? data1.rcnEntries.issue_add_7 :0)
                setdestrcv_sp1N(data1.rcnEntries.issue_add_9 ? data1.rcnEntries.issue_add_9 :0)
                setdestrcv_jkkN(data1.rcnEntries.issue_add_8 ? data1.rcnEntries.issue_add_8 :0)
                setdestrcv_bigt(data1.rcnEntries.rcv_bigTaiho ? data1.rcnEntries.rcv_bigTaiho :0)
               setdestbacklog(data1.rcnEntries.current_backlog)
            }
            else if(data1.rcnEntries && data1.rcnEntries.current_backlog && data1.rcnEntries.editStatus==='Pending'){
                setSuccessflag('none')
                setSuccessflagtable('none')
                setdestbacklog('NA')
                setErrortext('Target Lot & Origin is in Pending Modification')
                const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                dialogerror.showModal()
                return
            }
            else{

                setSuccessflag('none')
                setSuccessflagtable('none')
                setdestbacklog('NA')
                setErrortext('Target Lot & Origin Not found')
                const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                dialogerror.showModal()
                return
            }

        }

        const handleMix = async () => {

            
            const resStatus1 = await axios.post('/api/boiling/pendingLotCountOrigin', { lotNo: props.borma.LotNo,origin:props.borma.origin})
            console.log(resStatus1)
            if (resStatus1.data.scoopingLot && resStatus1.data.scoopingLot[0].editStatus ==='Pending') 
                {
                    setErrortext(`Modification of Lot is Pending in Linked  ${resStatus1.data.scoopingLot[0].latest_section} Section`)
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
            }

            if((Number(fsourcercv_sjh) < 0) || (Number(fsourcercv_sjh1) < 0) 
                || (Number(fsourcercv_jjh) < 0) || (Number(fsourcercv_jh1) < 0)
                 || (Number(fsourcercv_sp1) < 0) || (Number(fsourcercv_jkk) < 0) 
                 || (Number(fsourcercv_bigt) < 0)){
                    setErrortext('Transfer cant Exceed Remaining Stock')
                   
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialogerror.showModal()
                   // console.log(rows)
                    return
        
            }

                setisdisable(true)
                try {

                    if(parseInt(destrcv_status)===0){
                        const initialhumid = await axios.post('/api/sorting/createMixSorting', {
                            destid,
                            destlot,
                            destorigin,
                            destbacklog,
                            destrcv_sjh,destrcv_sjh1,destrcv_jjh,destrcv_jh1,destrcv_jkk,destrcv_sp1,destrcv_bigt,destrcv_status,
                            fsourceid:props.borma.id,
                            fsourcelot:props.borma.LotNo,
                            fsourceorigin:props.borma.origin,
                            fsourcebacklog,
                            fsourcercv_sjh,fsourcercv_sjh1,fsourcercv_jjh,fsourcercv_jh1,fsourcercv_jkk,fsourcercv_sp1,fsourcercv_bigt,
                            amount:(sourcercv_sjh+sourcercv_sjh1+sourcercv_jjh+sourcercv_jh1+sourcercv_jkk+sourcercv_sp1+
                                sourcercv_bigt).toFixed(2),
                            bsourcebacklog:props.borma.current_backlog,
                            bdestbacklog:datarcv.current_backlog
                         })
                        console.log(initialhumid)         
                            setErrortext(initialhumid.data.message)
                            if (initialhumid.status === 200) {
                                const dialog2 = document.getElementById("successemployeedialog") as HTMLDialogElement
                                dialog2.showModal()
                                setTimeout(() => {
                                    dialog2.close()
                                    window.location.reload()
                                }, 3000)
                            }
                    }
                    else{
                        const initialhumid = await axios.post('/api/sorting/createMixSorting', {
                            destid,
                            destlot,
                            destorigin,
                            destbacklog,
                            destrcv_sjh:destrcv_sjhN,destrcv_sjh1:destrcv_sjh1N,destrcv_jjh:destrcv_jjhN,
                            destrcv_jh1:destrcv_jh1N,destrcv_jkk:destrcv_jkkN,destrcv_sp1:destrcv_sp1N,destrcv_bigt,destrcv_status,
                            fsourceid:props.borma.id,
                            fsourcelot:props.borma.LotNo,
                            fsourceorigin:props.borma.origin,
                            fsourcebacklog,
                            fsourcercv_sjh,fsourcercv_sjh1,fsourcercv_jjh,fsourcercv_jh1,fsourcercv_jkk,fsourcercv_sp1,fsourcercv_bigt,
                            amount:(sourcercv_sjh+sourcercv_sjh1+sourcercv_jjh+sourcercv_jh1+sourcercv_jkk+sourcercv_sp1+
                                sourcercv_bigt).toFixed(2),
                            bsourcebacklog:props.borma.current_backlog,
                            bdestbacklog:datarcv.current_backlog
                         })
                        console.log(initialhumid)         
                            setErrortext(initialhumid.data.message)
                            if (initialhumid.status === 200) {
                                const dialog2 = document.getElementById("successemployeedialog") as HTMLDialogElement
                                dialog2.showModal()
                                setTimeout(() => {
                                    dialog2.close()
                                    window.location.reload()
                                }, 3000)
                            }

                    }
                    
                        
                }
                catch (err) {
                    console.log(err)
                    if (axios.isAxiosError(err)) {
                        setErrortext(err.response?.data.message || 'An Unexpected Error Occured')
                    }
                    else {
                        setErrortext('An Unexpected Error Occured')
                    }
                    const dialog = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialog.showModal()
                    setTimeout(() => {
                        dialog.close()
                    }, 2000)
                }
                finally{
                    setisdisable(false)
                }
          
        }



    return (
        <>

            <div className="px-5 py-2 overflow-auto">
           

                <div className="mx-8 flex flex-row gap-0.5">


                    <div className="flex"><Label className="w-2/4 pt-2 text-cyan-500">Transfer to Lot No</Label>
                        <Input className="w-2/4 justify-center" placeholder="Lot No" value={destlot} onChange={(e) => setdestlot(e.target.value)} required /> </div>

                    <div className="flex"><Label className="w-2/4 pt-2 text-center text-cyan-500">Origin</Label>
                        <select className='flex h-8 w-1/2 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setdestorigin(e.target.value)} value={destorigin}>

                            {Origin.map((data, index) => (
                                <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                    {data}
                                </option>
                            ))}
                        </select> </div>

                    <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>
                </div>
               
                <div className="flex mt-5  mx-8 pb-2 bg-green-100" style={{ display: successflag }}>
                <Label className="w-100 pt-2 font-semibold text-red-500 text-base">Fill Up Transfer Amount in Details </Label>
                {/* <Label className="w-100 pt-2 font-semibold ml-3">(Maximum Total {sourceactualbacklog} Kg can be Transfered)</Label> */}
                
                </div>
                <div className="flex mt-2 ml-5 gtext-center" >
                <Label className=" w-100 pt-2 font-semibold ml-3 text-center">Maximum {sourceactualbacklog} Kg can be Transfered</Label>
                </div>

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">1. SJH Amount</Label>
                
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_sjh} 
                onChange={(e) => setsourcercv_sjh(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_sjh} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">2. SJH1 Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_sjh1} 
                onChange={(e) => setsourcercv_sjh1(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_sjh1} kg </Label> 
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">3. JJH Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_jjh} 
                onChange={(e) => setsourcercv_jjh(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_jjh} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">4. JK/K Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_jkk} 
                onChange={(e) => setsourcercv_jkk(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_jkk} kg </Label>
                </div>
                
                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">5. JH1 Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_jh1} 
                onChange={(e) => setsourcercv_jh1(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_jh1} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">6. SP1 Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_sp1} 
                onChange={(e) => setsourcercv_sp1(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_sp1} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">5. BigTaiho Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_bigt} 
                onChange={(e) => setsourcercv_bigt(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_bigt} kg </Label>
                </div>

               
                

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 "> Total Transfer Amount </Label>
                <Input className="w-1/4 justify-center items-center text-center bg-yellow-100" type='number' placeholder="Amount" 
                value={(sourcercv_sjh+sourcercv_sjh1+sourcercv_jjh+sourcercv_jh1+sourcercv_jkk+sourcercv_sp1+
                    sourcercv_bigt).toFixed(2)}  required />
                <Label className="w-1/4 pt-2 text-red-500 text-center">Source Final Backlog : </Label>
                <Label className="w-1/4 pt-2  ">{fsourcebacklog} kg </Label>
                </div>
                

                <Table className="mt-8">



                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl No.</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Lot_No</TableHead>
                        <TableHead className="text-center">Origin</TableHead>
                        <TableHead className="text-center">Previous SJH </TableHead>
                    <TableHead className="text-center">Current SJH </TableHead>
                    <TableHead className="text-center">Previous SJH1 </TableHead>
                    <TableHead className="text-center">Current SJH1 </TableHead>
                      <TableHead className="text-center">Previous JJH </TableHead>                     
                      <TableHead className="text-center">Current JJH </TableHead>
                      <TableHead className="text-center">Previous JK/K </TableHead>        
                      <TableHead className="text-center">Current JK/K </TableHead>
                      <TableHead className="text-center">Previous SP1 </TableHead>                     
                      <TableHead className="text-center">Current SP1 </TableHead>
                      <TableHead className="text-center">Previous JH1 </TableHead>        
                      <TableHead className="text-center">Current JH1 </TableHead>
                      <TableHead className="text-center">Previous BigTaiho </TableHead>        
                      <TableHead className="text-center">Current BigTaiho </TableHead>
                      
                
                       <TableHead className="text-center">Current Backlog</TableHead>
                        <TableHead className="text-center">Final Backlog</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="boiling-row-height-scoop">
                        <TableCell className="text-center ">1</TableCell>
                        <TableCell className="text-center font-semibold  flex">Source<CircleArrowRight size={30} color="red"/>  </TableCell>
                        
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ?props.borma.LotNo :''}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ?props.borma.origin:''}</TableCell>
                            <TableCell className="text-center  bg-cyan-100">{props.borma ? props.borma.issue_add_5 :0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_sjh:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100">{props.borma  ? props.borma.issue_add_6 :0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_sjh1:'NA'}</TableCell>                    
                            <TableCell className="text-center  bg-yellow-100">{props.borma ? props.borma.issue_add_4:0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_jjh:'NA'}</TableCell>                           
                            <TableCell className="text-center bg-green-100 ">{props.borma? props.borma.issue_add_8:0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_jkk:'NA'}</TableCell>
                            <TableCell className="text-center  bg-yellow-100">{props.borma  ? props.borma.issue_add_9 :0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_sp1:'NA'}</TableCell>  
                            <TableCell className="text-center bg-red-100 ">{props.borma? props.borma.issue_add_7:0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_jh1:'NA'}</TableCell>
                            <TableCell className="text-center  bg-cyan-100">{props.borma  ? props.borma.rcv_bigTaiho :0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_bigt:'NA'}</TableCell>                
                            
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ? props.borma.current_backlog :0 }</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? fsourcebacklog:'NA'}</TableCell>
                        </TableRow>
                        <TableRow className="boiling-row-height-scoop" style={{ display: successflagtable }}>
                        <TableCell className="text-center ">2</TableCell>
                        <TableCell className="text-center font-semibold  flex">Target<CircleArrowLeft size={30} color="green"/></TableCell>
                            <TableCell className="text-center font-semibold text-green-600 ">{destlot ? destlot :'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{destorigin ? destorigin :'NA'}</TableCell>

                            <TableCell className="text-center  bg-cyan-100">{parseInt(datarcv.Status)===0? datarcv.rcv_sjh :datarcv.issue_add_5}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_sjh:'NA'}</TableCell>
                            :<TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_sjhN:'NA'}</TableCell>}

                            <TableCell className="text-center  bg-cyan-100">{parseInt(datarcv.Status)===0? datarcv.rcv_sjh1 :datarcv.issue_add_6}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_sjh1:'NA'}</TableCell>
                            :<TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_sjh1N:'NA'}</TableCell>}

                            <TableCell className="text-center  bg-cyan-100">{parseInt(datarcv.Status)===0? datarcv.rcv_jjh :datarcv.issue_add_4}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_jjh:'NA'}</TableCell>
                            :<TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_jjhN:'NA'}</TableCell>}

                            <TableCell className="text-center  bg-cyan-100">{parseInt(datarcv.Status)===0? datarcv.rcv_jk_k :datarcv.issue_add_8}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_jkk:'NA'}</TableCell>
                            :<TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_jkkN:'NA'}</TableCell>}

                            <TableCell className="text-center  bg-cyan-100">{parseInt(datarcv.Status)===0? datarcv.rcv_sp1 :datarcv.issue_add_9}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_sp1:'NA'}</TableCell>
                            :<TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_sp1N:'NA'}</TableCell>}

                            <TableCell className="text-center  bg-cyan-100">{parseInt(datarcv.Status)===0? datarcv.rcv_jh1 :datarcv.issue_add_7}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_jh1:'NA'}</TableCell>
                            :<TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_jh1N:'NA'}</TableCell>}

                            
                            <TableCell className="text-center  bg-cyan-100">{datarcv.rcv_bigTaiho ? datarcv.rcv_bigTaiho:''}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_bigt:'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{datarcv.current_backlog ? datarcv.current_backlog : ''}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? destbacklog:'NA'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <span className="w-100 text-center ml-6 no-margin " style={{ display: successflag }}>
                    <Button className="bg-slate-500 h-8 mt-4" onClick={handleMix} disabled={isdisable}>{isdisable? 'Submitting':'Submit'}</Button></span>


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
export default RCNSortingReMix