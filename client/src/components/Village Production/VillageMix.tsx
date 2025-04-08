import { VilageData  } from "@/type/type";
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
    borma: VilageData     
}
interface RCNEntries {
    rcv_peeling: string;
    rcv_rejection: string;
    rcv_sorting: string;
    rcv_dpds: string;
    rcv_mayur: string;
    rcv_bigTaiho: string;
    rcv_lw: string;
    rcv_wholes: string;
    current_backlog: string;
    issue_add_10:string;
    issue_add_11:string;
    issue_add_12:string;
    Status:string;
}
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
const VillageReMix = (props:Props) => {

        const [sourcercv_peeling, setsourcercv_peeling] = useState<number>(0);
        const [sourcercv_rejection, setsourcercv_rejection] = useState<number>(0);
        const [sourcercv_sorting, setsourcercv_sorting] = useState<number>(0);
        const [sourcercv_dpds, setsourcercv_dpds] = useState<number>(0);
        const [sourcercv_mayur, setsourcercv_mayur] = useState<number>(0);
        const [sourcercv_bigTaiho, setsourcercv_bigTaiho] = useState<number>(0);
        const [sourcercv_lw, setsourcercv_lw] = useState<number>(0);
        const [sourcercv_wholes, setsourcercv_wholes] = useState<number>(0);

       

        const [fsourcercv_peeling, setfsourcercv_peeling] = useState<string>();
        const [fsourcercv_rejection, setfsourcercv_rejection] = useState<string>('0');
        const [fsourcercv_sorting, setfsourcercv_sorting] = useState<string>('0');
        const [fsourcercv_dpds, setfsourcercv_dpds] = useState<string>('0');
        const [fsourcercv_mayur, setfsourcercv_mayur] = useState<string>('0');
        const [fsourcercv_bigTaiho, setfsourcercv_bigTaiho] = useState<string>('0');
        const [fsourcercv_lw, setfsourcercv_lw] = useState<string>('0');
        const [fsourcercv_wholes, setfsourcercv_wholes] = useState<string>('0');
        const [fsourcebacklog, setfSourcebacklog] = useState<string>('');
        
        
        
        const [successflag, setSuccessflag] = useState<string>('none');
        const [successflagtable, setSuccessflagtable] = useState<string>('none');

        const [destbacklog, setdestbacklog] = useState<string>("");
        const [destlot, setdestlot] = useState<string>("");
        const [destid, setdestid] = useState<number>(0);

        const [destrcv_peeling, setdestrcv_peeling] = useState<string>("");
        const [destrcv_rejection, setdestrcv_rejection] = useState<string>("");
        const [destrcv_sorting, setdestrcv_sorting] = useState<string>("");
        const [destrcv_dpds, setdestrcv_dpds] = useState<string>("");
        const [destrcv_mayur, setdestrcv_mayur] = useState<string>("");
        const [destrcv_bigTaiho, setdestrcv_bigTaiho] = useState<string>("");
        const [destrcv_lw, setdestrcv_lw] = useState<string>("");
        const [destrcv_wholes, setdestrcv_wholes] = useState<string>("");
        const [destrcv_peelingN, setdestrcv_peelingN] = useState<string>("");
        const [destrcv_rejectionN, setdestrcv_rejectionN] = useState<string>("");
        const [destrcv_mayurN, setdestrcv_mayurN] = useState<string>("");

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
            setfsourcercv_sorting(props.borma ?((props.borma.rcv_sorting ?Number(props.borma.rcv_sorting):0)-sourcercv_sorting).toFixed(2):'');
            setfsourcercv_bigTaiho(props.borma ?((props.borma.rcv_bigTaiho ?Number(props.borma.rcv_bigTaiho):0)-sourcercv_bigTaiho).toFixed(2):'');

            setfsourcercv_dpds(props.borma ?((props.borma.rcv_dpds ?Number(props.borma.rcv_dpds):0)-sourcercv_dpds).toFixed(2):'');
            setfsourcercv_lw(props.borma ?((props.borma.rcv_lw ?Number(props.borma.rcv_lw):0)-sourcercv_lw).toFixed(2):'');
            setfsourcercv_wholes(props.borma ?((props.borma.rcv_wholes ?Number(props.borma.rcv_wholes):0)-sourcercv_wholes).toFixed(2):'');
            setfsourcercv_peeling(props.borma ?(Number(props.borma.issue_add_10)-sourcercv_peeling).toFixed(2):'');
            setfsourcercv_mayur(props.borma ?(Number(props.borma.issue_add_11)-sourcercv_mayur).toFixed(2):'');
            setfsourcercv_rejection(props.borma ?(Number(props.borma.issue_add_12)-sourcercv_rejection).toFixed(2):'');

            
            setfSourcebacklog(props.borma ?(Number(props.borma.current_backlog) - 
            (sourcercv_peeling+sourcercv_rejection+sourcercv_sorting+sourcercv_dpds+
            sourcercv_mayur+sourcercv_bigTaiho+sourcercv_lw+sourcercv_wholes)).toFixed(2):'');
            
            setdestrcv_sorting(((datarcv.rcv_sorting ?Number(datarcv.rcv_sorting):0)+sourcercv_sorting).toFixed(2));
            setdestrcv_rejection(((datarcv.rcv_rejection ?Number(datarcv.rcv_rejection):0)+sourcercv_rejection).toFixed(2));
            setdestrcv_dpds(((datarcv.rcv_dpds ?Number(datarcv.rcv_dpds):0)+sourcercv_dpds).toFixed(2));
            setdestrcv_mayur(((datarcv.rcv_mayur ?Number(datarcv.rcv_mayur):0)+sourcercv_mayur).toFixed(2));
            setdestrcv_bigTaiho(((datarcv.rcv_bigTaiho ?Number(datarcv.rcv_bigTaiho):0)+sourcercv_bigTaiho).toFixed(2));
            setdestrcv_lw(((datarcv.rcv_lw ?Number(datarcv.rcv_lw):0)+sourcercv_lw).toFixed(2));
            setdestrcv_wholes(((datarcv.rcv_wholes ?Number(datarcv.rcv_wholes):0)+sourcercv_wholes).toFixed(2));
            setdestrcv_peeling(((datarcv.rcv_peeling ?Number(datarcv.rcv_peeling):0)+sourcercv_peeling).toFixed(2));
            setdestrcv_peelingN(((datarcv.issue_add_10 ?Number(datarcv.issue_add_10):0)+sourcercv_peeling).toFixed(2));
            setdestrcv_mayurN(((datarcv.issue_add_11 ?Number(datarcv.issue_add_11):0)+sourcercv_mayur).toFixed(2));
            setdestrcv_rejectionN(((datarcv.issue_add_12 ?Number(datarcv.issue_add_12):0)+sourcercv_rejection).toFixed(2));

            setdestbacklog(((datarcv.current_backlog?Number(datarcv.current_backlog):0) + (sourcercv_peeling+sourcercv_rejection+sourcercv_sorting+sourcercv_dpds+
                sourcercv_mayur+sourcercv_bigTaiho+sourcercv_lw+sourcercv_wholes)).toFixed(2));
        }, [ sourcercv_peeling,sourcercv_rejection,sourcercv_sorting,sourcercv_dpds,sourcercv_mayur,sourcercv_bigTaiho,sourcercv_lw,sourcercv_wholes]);

        useEffect(() => {
            setfsourcercv_peeling(props.borma ? props.borma.issue_add_10:'');
            setfsourcercv_rejection(props.borma ? props.borma.issue_add_12:'');
            setfsourcercv_sorting(props.borma ? props.borma.rcv_sorting:'');
            setfsourcercv_dpds(props.borma ?props.borma.rcv_dpds:'');
            setfsourcercv_mayur(props.borma ?props.borma.issue_add_11:'');
            setfsourcercv_bigTaiho(props.borma ?props.borma.rcv_bigTaiho:'');
            setfsourcercv_lw(props.borma ?props.borma.rcv_lw:'');
            setfsourcercv_wholes(props.borma ?props.borma.rcv_wholes:'');
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

            const response = await axios.post('/api/villageout/villagemixsearch', {
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
               
                setdestrcv_sorting(data1.rcnEntries.rcv_sorting ? data1.rcnEntries.rcv_sorting :0)
                setdestrcv_rejection(data1.rcnEntries.rcv_rejection ? data1.rcnEntries.rcv_rejection :0)
                setdestrcv_rejectionN(data1.rcnEntries.issue_add_12 ? data1.rcnEntries.issue_add_12 :0)

                setdestrcv_dpds(data1.rcnEntries.rcv_dpds ? data1.rcnEntries.rcv_dpds :0)
                setdestrcv_mayur(data1.rcnEntries.rcv_mayur ? data1.rcnEntries.rcv_mayur :0)
                setdestrcv_mayurN(data1.rcnEntries.issue_add_11 ? data1.rcnEntries.issue_add_11 :0)

                setdestrcv_bigTaiho(data1.rcnEntries.rcv_bigTaiho ? data1.rcnEntries.rcv_bigTaiho :0)
                setdestrcv_lw(data1.rcnEntries.rcv_lw ? data1.rcnEntries.rcv_lw :0)
                setdestrcv_wholes(data1.rcnEntries.rcv_wholes ? data1.rcnEntries.rcv_wholes :0)
                setdestrcv_peeling(data1.rcnEntries.rcv_peeling ? data1.rcnEntries.rcv_peeling :0)
                setdestrcv_peelingN(data1.rcnEntries.issue_add_10 ? data1.rcnEntries.issue_add_10 :0)
               setdestbacklog(data1.rcnEntries.current_backlog)
               setdestrcv_status(data1.rcnEntries.Status)
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

            if((Number(fsourcercv_peeling) < 0) || (Number(fsourcercv_rejection) < 0) || (Number(fsourcercv_sorting) < 0)  
            || (Number(fsourcercv_dpds) < 0)  || (Number(fsourcercv_lw) < 0)|| (Number(fsourcercv_wholes) < 0) ||
            (Number(fsourcercv_mayur) < 0) || (Number(fsourcebacklog) < 0) || (Number(fsourcercv_bigTaiho) < 0)){
                    setErrortext('Transfer cant Exceed Remaining Stock')
                   
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialogerror.showModal()
                   // console.log(rows)
                    return
        
            }

                setisdisable(true)
                try {

                    if(parseInt(destrcv_status)===0){
                        const initialhumid = await axios.post('/api/villageout/createMixVillage', {
                            destid,
                            destlot,
                            destorigin,
                            destbacklog,
                            destrcv_sorting,destrcv_peeling,destrcv_rejection,destrcv_dpds,destrcv_mayur,destrcv_bigTaiho,destrcv_lw,destrcv_wholes,
                            fsourceid:props.borma.id,
                            fsourcelot:props.borma.LotNo,
                            fsourceorigin:props.borma.origin,
                            fsourcebacklog,
                            fsourcercv_sorting,fsourcercv_peeling,fsourcercv_rejection,fsourcercv_dpds,fsourcercv_mayur,fsourcercv_bigTaiho,fsourcercv_lw,fsourcercv_wholes,destrcv_status,
                            amount:(sourcercv_peeling+sourcercv_rejection+sourcercv_sorting+sourcercv_dpds+
                                sourcercv_mayur+sourcercv_bigTaiho+sourcercv_lw+sourcercv_wholes).toFixed(2),
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
                        const initialhumid = await axios.post('/api/villageout/createMixVillage', {
                            destid,
                            destlot,
                            destorigin,
                            destbacklog,
                            destrcv_sorting,destrcv_peeling:destrcv_peelingN,destrcv_rejection:destrcv_rejectionN,destrcv_dpds,destrcv_mayur:destrcv_mayurN,destrcv_bigTaiho,destrcv_lw,destrcv_wholes,destrcv_status,
                            fsourceid:props.borma.id,
                            fsourcelot:props.borma.LotNo,
                            fsourceorigin:props.borma.origin,
                            fsourcebacklog,
                            fsourcercv_sorting,fsourcercv_peeling,fsourcercv_rejection,fsourcercv_dpds,fsourcercv_mayur,fsourcercv_bigTaiho,fsourcercv_lw,fsourcercv_wholes,
                            amount:(sourcercv_peeling+sourcercv_rejection+sourcercv_sorting+sourcercv_dpds+
                                sourcercv_mayur+sourcercv_bigTaiho+sourcercv_lw+sourcercv_wholes).toFixed(2),
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
                <Label className="w-1/4 pt-2 text-purple-500">1. Peeling Amount</Label>
                
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_peeling} onChange={(e) => setsourcercv_peeling(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_peeling} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">2. Rejection Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_rejection} onChange={(e) => setsourcercv_village(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_rejection} kg </Label> 
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">3. Sorting Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_sorting} onChange={(e) => setsourcercv_sorting(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_sorting} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">4. DPDS Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_dpds} onChange={(e) => setsourcercv_dpds(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_dpds} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">5. Mayur Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_mayur} onChange={(e) => setsourcercv_mayur(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_mayur} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">6. Hamsa Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_bigTaiho} onChange={(e) => setfsourcercv_bigTaiho(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_bigTaiho} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">7. LW Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_lw} onChange={(e) => setsourcercv_lw(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_lw} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">8. Wholes Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_wholes} onChange={(e) => setsourcercv_wholes(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_wholes} kg </Label>
                </div>
                

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 "> Total Transfer Amount </Label>
                <Input className="w-1/4 justify-center items-center text-center bg-yellow-100" type='number' placeholder="Amount" value={(sourcercv_peeling+sourcercv_village+sourcercv_sorting+sourcercv_dpds+
                            sourcercv_mayur+sourcercv_hamsa+sourcercv_lw+sourcercv_wholes).toFixed(2)}  required />
                <Label className="w-1/4 pt-2 text-red-500 text-center">Source Final Backlog : </Label>
                <Label className="w-1/4 pt-2  ">{fsourcebacklog} kg </Label>
                </div>
                

                <Table className="mt-8">



                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl No.</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Lot_No</TableHead>
                        <TableHead className="text-center">Origin</TableHead>
                        <TableHead className="text-center">Previous Peeling </TableHead>
                    <TableHead className="text-center">Current Peeling </TableHead>
                    <TableHead className="text-center">Previous Village </TableHead>
                    <TableHead className="text-center">Current Village </TableHead>
               
                      <TableHead className="text-center">Previous Sorting </TableHead>                     
                      <TableHead className="text-center">Current Sorting </TableHead>
                  
                      <TableHead className="text-center">Previous DPDS </TableHead>        
                      <TableHead className="text-center">Current DPDS </TableHead>
                      <TableHead className="text-center">Previous Mayur </TableHead>        
                      <TableHead className="text-center">Current Mayur </TableHead>
                      <TableHead className="text-center">Previous Hamsa </TableHead>        
                      <TableHead className="text-center">Current Hamsa </TableHead>
                      <TableHead className="text-center">Previous LW </TableHead>        
                      <TableHead className="text-center">Current LW </TableHead>
                      <TableHead className="text-center">Previous Wholes </TableHead>        
                      <TableHead className="text-center">Current Wholes </TableHead>
                       <TableHead className="text-center">Current Backlog</TableHead>
                        <TableHead className="text-center">Final Backlog</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="boiling-row-height-scoop">
                        <TableCell className="text-center ">1</TableCell>
                        <TableCell className="text-center font-semibold  flex">Source<CircleArrowRight size={30} color="red"/>  </TableCell>
                        
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ?props.borma.LotNo :''}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ?props.borma.origin:''}</TableCell>
                            <TableCell className="text-center  bg-cyan-100">{props.borma ? props.borma.issue_add_4 :0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_peeling:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100">{props.borma  ? props.borma.rcv_village :0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_village:'NA'}</TableCell>                    
                            <TableCell className="text-center  bg-yellow-100">{props.borma ? props.borma.rcv_sorting:0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_sorting:'NA'}</TableCell>                           
                            <TableCell className="text-center bg-green-100 ">{props.borma? props.borma.rcv_dpds:0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_dpds:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100">{props.borma  ? props.borma.rcv_mayur :0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_mayur:'NA'}</TableCell>                 
                            <TableCell className="text-center  bg-yellow-100">{props.borma ? props.borma.rcv_hamsa:0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_hamsa:'NA'}</TableCell>                            
                            <TableCell className="text-center bg-green-100 ">{props.borma? props.borma.rcv_lw:0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_lw:'NA'}</TableCell>
                            <TableCell className="text-center bg-yellow-100 ">{props.borma? props.borma.rcv_wholes:0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_wholes:'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ? props.borma.current_backlog :0 }</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? fsourcebacklog:'NA'}</TableCell>
                        </TableRow>
                        <TableRow className="boiling-row-height-scoop" style={{ display: successflagtable }}>
                        <TableCell className="text-center ">2</TableCell>
                        <TableCell className="text-center font-semibold  flex">Target<CircleArrowLeft size={30} color="green"/></TableCell>
                            <TableCell className="text-center font-semibold text-green-600 ">{destlot ? destlot :'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{destorigin ? destorigin :'NA'}</TableCell>
                            <TableCell className="text-center  bg-cyan-100">{parseInt(datarcv.Status)===0? datarcv.rcv_peeling :datarcv.issue_add_4}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_peeling:'NA'}</TableCell>
                            :<TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_peelingN:'NA'}</TableCell>}
                            <TableCell className="text-center  bg-red-100 ">{successflag ? datarcv.rcv_village:''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_village:'NA'}</TableCell>                    
                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_sorting ?datarcv.rcv_sorting :''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_sorting:'NA'}</TableCell>                      
                            <TableCell className="text-center  bg-green-100">{datarcv.rcv_dpds ? datarcv.rcv_dpds:''}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? destrcv_dpds:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100">{datarcv.rcv_mayur ? datarcv.rcv_mayur:''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_mayur:'NA'}</TableCell>
                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_hamsa ?datarcv.rcv_hamsa :''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_hamsa:'NA'}</TableCell>                      
                            <TableCell className="text-center  bg-green-100">{datarcv.rcv_lw ? datarcv.rcv_lw:''}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? destrcv_lw:'NA'}</TableCell>
                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_wholes ? datarcv.rcv_wholes:''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_wholes:'NA'}</TableCell>
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
export default VillageReMix