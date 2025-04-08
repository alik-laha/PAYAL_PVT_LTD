import {  LWData  } from "@/type/type";
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
    borma: LWData     
}
interface RCNEntries {
  
    rcv_mayur: string;
    rcv_hamsa: string;
    rcv_wholes: string;
    current_backlog: string;
    issue_add_7:string;
    issue_add_8:string;
    Status:string;
}
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
const LWMix = (props:Props) => {

       
        const [sourcercv_mayur, setsourcercv_mayur] = useState<number>(0);
        const [sourcercv_hamsa, setsourcercv_hamsa] = useState<number>(0);
        const [sourcercv_wholes, setsourcercv_wholes] = useState<number>(0);

       

        
        const [fsourcercv_mayur, setfsourcercv_mayur] = useState<string>('0');
        const [fsourcercv_hamsa, setfsourcercv_hamsa] = useState<string>('0');
        const [fsourcercv_wholes, setfsourcercv_wholes] = useState<string>('0');
        const [fsourcebacklog, setfSourcebacklog] = useState<string>('');
        
        
        
        const [successflag, setSuccessflag] = useState<string>('none');
        const [successflagtable, setSuccessflagtable] = useState<string>('none');

        const [destbacklog, setdestbacklog] = useState<string>("");
        const [destlot, setdestlot] = useState<string>("");
        const [destid, setdestid] = useState<number>(0);

        const [destrcv_mayur, setdestrcv_mayur] = useState<string>("");
        const [destrcv_hamsa, setdestrcv_hamsa] = useState<string>("");
        const [destrcv_wholes, setdestrcv_wholes] = useState<string>("");
        const [destrcv_mayurN, setdestrcv_mayurN] = useState<string>("");
        const [destrcv_hamsaN, setdestrcv_hamsaN] = useState<string>("");
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
        
           
            setfsourcercv_wholes(props.borma ?((props.borma.rcv_wholes ?Number(props.borma.rcv_wholes):0)-sourcercv_wholes).toFixed(2):'');
            setfsourcercv_mayur(props.borma ?(Number(props.borma.issue_add_7)-sourcercv_mayur).toFixed(2):'');
            setfsourcercv_hamsa(props.borma ?(Number(props.borma.issue_add_8)-sourcercv_hamsa).toFixed(2):'');
            setfSourcebacklog(props.borma ?(Number(props.borma.current_backlog) - 
            (sourcercv_mayur+sourcercv_hamsa+sourcercv_wholes)).toFixed(2):'');
            
           
            setdestrcv_mayur(((datarcv.rcv_mayur ?Number(datarcv.rcv_mayur):0)+sourcercv_mayur).toFixed(2));
            setdestrcv_mayurN(((datarcv.issue_add_7 ?Number(datarcv.issue_add_7):0)+sourcercv_mayur).toFixed(2));
            setdestrcv_hamsa(((datarcv.rcv_hamsa ?Number(datarcv.rcv_hamsa):0)+sourcercv_hamsa).toFixed(2));
            setdestrcv_hamsaN(((datarcv.issue_add_8 ?Number(datarcv.issue_add_8):0)+sourcercv_hamsa).toFixed(2));
            setdestrcv_wholes(((datarcv.rcv_wholes ?Number(datarcv.rcv_wholes):0)+sourcercv_wholes).toFixed(2));
            setdestbacklog(((datarcv.current_backlog?Number(datarcv.current_backlog):0) + (
                sourcercv_mayur+sourcercv_hamsa+sourcercv_wholes)).toFixed(2));
        }, [sourcercv_mayur,sourcercv_hamsa,sourcercv_wholes]);

        useEffect(() => {
            setfsourcercv_mayur(props.borma ?props.borma.issue_add_7:'');
            setfsourcercv_hamsa(props.borma ?props.borma.issue_add_8:'');
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

            const response = await axios.post('/api/lw/lwmixsearch', {
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
               
   
                setdestrcv_mayur(data1.rcnEntries.rcv_mayur ? data1.rcnEntries.rcv_mayur :0)
                setdestrcv_mayurN(data1.rcnEntries.issue_add_7 ? data1.rcnEntries.issue_add_7 :0)
                setdestrcv_hamsa(data1.rcnEntries.rcv_hamsa ? data1.rcnEntries.rcv_hamsa :0)
                setdestrcv_hamsaN(data1.rcnEntries.issue_add_8 ? data1.rcnEntries.issue_add_8 :0)
                setdestrcv_wholes(data1.rcnEntries.rcv_wholes ? data1.rcnEntries.rcv_wholes :0)
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

            if( (Number(fsourcercv_wholes) < 0) ||
            (Number(fsourcercv_mayur) < 0) || (Number(fsourcebacklog) < 0) || (Number(fsourcercv_hamsa) < 0)){
                    setErrortext('Transfer cant Exceed Remaining Stock')
                   
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialogerror.showModal()
                   // console.log(rows)
                    return
        
            }

                setisdisable(true)
                try {

                    if(parseInt(destrcv_status)===0){
                        const initialhumid = await axios.post('/api/lw/createMixLW', {
                            destid,
                            destlot,
                            destorigin,
                            destbacklog,
                            destrcv_mayur,destrcv_hamsa,destrcv_wholes,
                            fsourceid:props.borma.id,
                            fsourcelot:props.borma.LotNo,
                            fsourceorigin:props.borma.origin,
                            fsourcebacklog,
                            fsourcercv_mayur,fsourcercv_hamsa,fsourcercv_wholes,destrcv_status,
                            amount:(
                                sourcercv_mayur+sourcercv_hamsa+sourcercv_wholes).toFixed(2),
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
                        const initialhumid = await axios.post('/api/lw/createMixLW', {
                            destid,
                            destlot,
                            destorigin,
                            destbacklog,
                            destrcv_mayur:destrcv_mayurN,destrcv_hamsa:destrcv_hamsaN,destrcv_wholes,destrcv_status,
                            fsourceid:props.borma.id,
                            fsourcelot:props.borma.LotNo,
                            fsourceorigin:props.borma.origin,
                            fsourcebacklog,
                            fsourcercv_mayur,fsourcercv_hamsa,fsourcercv_wholes,
                            amount:(
                                sourcercv_mayur+sourcercv_hamsa+sourcercv_wholes).toFixed(2),
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
                <div className="flex mt-2 ml-5 text-center" >
                <Label className=" w-100 pt-2 font-semibold ml-3 text-center">Maximum {sourceactualbacklog} Kg can be Transfered</Label>
                </div>

               

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">1. Mayur Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_mayur} onChange={(e) => setsourcercv_mayur(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_mayur} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">2. Hamsa Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_hamsa} onChange={(e) => setsourcercv_hamsa(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_hamsa} kg </Label>
                </div>

             
               

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">3. Wholes Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_wholes} onChange={(e) => setsourcercv_wholes(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_wholes} kg </Label>
                </div>
                

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 "> Total Transfer Amount </Label>
                <Input className="w-1/4 justify-center items-center text-center bg-yellow-100" type='number' placeholder="Amount" value={(
                            sourcercv_mayur+sourcercv_hamsa+sourcercv_wholes).toFixed(2)}  required />
                <Label className="w-1/4 pt-2 text-red-500 text-center">Source Final Backlog : </Label>
                <Label className="w-1/4 pt-2  ">{fsourcebacklog} kg </Label>
                </div>
                

                <Table className="mt-8">



                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl No.</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Lot_No</TableHead>
                        <TableHead className="text-center">Origin</TableHead>
                      
                      <TableHead className="text-center">Previous Mayur </TableHead>        
                      <TableHead className="text-center">Current Mayur </TableHead>
                      <TableHead className="text-center">Previous Hamsa </TableHead>        
                      <TableHead className="text-center">Current Hamsa </TableHead>
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
                            <TableCell className="text-center  bg-red-100">{props.borma ? props.borma.issue_add_7 :0}</TableCell>
                         
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_mayur:'NA'}</TableCell>                 
                            <TableCell className="text-center  bg-cyan-100">{props.borma ? props.borma.issue_add_8:0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_hamsa:'NA'}</TableCell>                            
                          
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
                            <TableCell className="text-center  bg-red-100">{parseInt(datarcv.Status)===0? datarcv.rcv_mayur :datarcv.issue_add_7}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_mayur:'NA'}</TableCell>
                            :<TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_mayurN:'NA'}</TableCell>}

                            <TableCell className="text-center  bg-cyan-100">{parseInt(datarcv.Status)===0? datarcv.rcv_hamsa :datarcv.issue_add_8}</TableCell>
                            {parseInt(datarcv.Status)===0 ?
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_hamsa:'NA'}</TableCell>
                            :<TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_hamsaN:'NA'}</TableCell>}                     

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
export default LWMix