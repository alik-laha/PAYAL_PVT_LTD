import {  HamsaData  } from "@/type/type";
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
    borma: HamsaData     
}
interface RCNEntries {
    rcv_pw_w: string;
    rcv_w_lot: string;
    rcv_ww: string;
    rcv_village: string;
    rcv_lw: string;
    current_backlog: string;
}
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
const RCNHamsaReMix = (props:Props) => {

        const [sourcercv_pw_w, setsourcercv_pw] = useState<number>(0);
        const [sourcercv_w, setsourcercv_w] = useState<number>(0);
        const [sourcercv_ww, setsourcercv_ww] = useState<number>(0);
        const [sourcercv_village, setsourcercv_village] = useState<number>(0);
        const [sourcercv_lw, setsourcercv_lw] = useState<number>(0);


       

        const [fsourcercv_pw_w, setfsourcercv_pw_w] = useState<string>();
        const [fsourcercv_w, setfsourcercv_w] = useState<string>();
        const [fsourcercv_ww, setfsourcercv_ww] = useState<string>();
        const [fsourcercv_lw, setfsourcercv_lw] = useState<string>('0');
        const [fsourcercv_village, setfsourcercv_village] = useState<string>('0');
        const [fsourcebacklog, setfSourcebacklog] = useState<string>('');
        
        
        
        const [successflag, setSuccessflag] = useState<string>('none');
        const [successflagtable, setSuccessflagtable] = useState<string>('none');

        const [destbacklog, setdestbacklog] = useState<string>("");
        const [destlot, setdestlot] = useState<string>("");
        const [destid, setdestid] = useState<number>(0);

        const [destrcv_pw_w, setdestrcv_pw_w] = useState<string>("");
        const [destrcv_w, setdestrcv_w] = useState<string>("");
        const [destrcv_ww, setdestrcv_ww] = useState<string>("");
        const [destrcv_lw, setdestrcv_lw] = useState<string>("");
        const [destrcv_village, setdestrcv_village] = useState<string>("");
       

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
            setfsourcercv_pw_w(props.borma ?((props.borma.rcv_pw_w ?Number(props.borma.rcv_pw_w):0)-sourcercv_pw_w).toFixed(2):'');
            setfsourcercv_w(props.borma ?((props.borma.rcv_w_lot ?Number(props.borma.rcv_w_lot):0)-sourcercv_w).toFixed(2):'');
            setfsourcercv_ww(props.borma ?((props.borma.rcv_ww ?Number(props.borma.rcv_ww):0)-sourcercv_ww).toFixed(2):'');
            setfsourcercv_lw(props.borma ?((props.borma.rcv_lw ?Number(props.borma.rcv_lw):0)-sourcercv_lw).toFixed(2):'');
            setfsourcercv_village(props.borma ?((props.borma.rcv_village ?Number(props.borma.rcv_village):0)-sourcercv_village).toFixed(2):''); 
            setfSourcebacklog(props.borma ?(Number(props.borma.current_backlog) - 
            (sourcercv_pw_w+sourcercv_village+sourcercv_w+sourcercv_ww+
            sourcercv_lw)).toFixed(2):'');
            
            setdestrcv_pw_w(((datarcv.rcv_pw_w ?Number(datarcv.rcv_pw_w):0)+sourcercv_pw_w).toFixed(2));
            setdestrcv_w(((datarcv.rcv_w_lot ?Number(datarcv.rcv_w_lot):0)+sourcercv_w).toFixed(2));
            setdestrcv_ww(((datarcv.rcv_ww ?Number(datarcv.rcv_ww):0)+sourcercv_ww).toFixed(2));
            setdestrcv_lw(((datarcv.rcv_lw ?Number(datarcv.rcv_lw):0)+sourcercv_lw).toFixed(2));
            setdestrcv_village(((datarcv.rcv_village ?Number(datarcv.rcv_village):0)+sourcercv_village).toFixed(2));
         
            setdestbacklog(((datarcv.current_backlog?Number(datarcv.current_backlog):0) + (sourcercv_pw_w+sourcercv_village+sourcercv_w+sourcercv_ww+
                sourcercv_lw)).toFixed(2));
        }, [ sourcercv_pw_w,sourcercv_village,sourcercv_lw,sourcercv_w,sourcercv_ww]);

        useEffect(() => {
            setfsourcercv_pw_w(props.borma ? props.borma.rcv_pw_w:'');
            setfsourcercv_village(props.borma ? props.borma.rcv_village:'');
            setfsourcercv_ww(props.borma ? props.borma.rcv_ww:'');
            setfsourcercv_w(props.borma ?props.borma.rcv_w_lot:'');
            setfsourcercv_lw(props.borma ?props.borma.rcv_lw:'');
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


            const response = await axios.post('/api/hamsa/hamsamixsearch', {
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
               
          
                setdestrcv_village(data1.rcnEntries.rcv_village ? data1.rcnEntries.rcv_village :0)
                setdestrcv_pw_w(data1.rcnEntries.rcv_pw_w ? data1.rcnEntries.rcv_pw_w :0)
                setdestrcv_w(data1.rcnEntries.rcv_w_lot ? data1.rcnEntries.rcv_w_lot :0)
                setdestrcv_ww(data1.rcnEntries.rcv_ww ? data1.rcnEntries.rcv_ww :0)
                setdestrcv_lw(data1.rcnEntries.rcv_lw ? data1.rcnEntries.rcv_lw :0)
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

            if((Number(fsourcercv_pw_w) < 0) || (Number(fsourcercv_w) < 0) || (Number(fsourcercv_ww) < 0)  
            || (Number(fsourcercv_village) < 0)  || (Number(fsourcercv_lw) < 0)){
                    setErrortext('Transfer cant Exceed Remaining Stock')
                   
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialogerror.showModal()
                   // console.log(rows)
                    return
        
            }

                setisdisable(true)
                try {
                    const initialhumid = await axios.post('/api/hamsa/createMixHamsa', {
                        destid,
                        destlot,
                        destorigin,
                        destbacklog,
                        destrcv_pw_w,destrcv_w,destrcv_ww,destrcv_village,destrcv_lw,
                        fsourceid:props.borma.id,
                        fsourcelot:props.borma.LotNo,
                        fsourceorigin:props.borma.origin,
                        fsourcebacklog,
                        fsourcercv_pw_w,fsourcercv_w,fsourcercv_ww,fsourcercv_village,fsourcercv_lw,
                        amount:(sourcercv_pw_w+sourcercv_village+sourcercv_w+sourcercv_ww+
                            sourcercv_lw).toFixed(2),
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
                <Label className="w-1/4 pt-2 text-purple-500">1. PW Amount</Label>
                
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_pw_w} 
                onChange={(e) => setsourcercv_pw(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_pw_w} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">2. W Lot Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_w} onChange={(e) => setsourcercv_w(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_w} kg </Label> 
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">3. WW Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_ww} 
                onChange={(e) => setsourcercv_ww(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_ww} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">4. LW Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_lw} onChange={(e) => setsourcercv_lw(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_lw} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">5. Village Amount</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_village} 
                onChange={(e) => setsourcercv_village(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_village} kg </Label>
                </div>

               
                

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 "> Total Transfer Amount </Label>
                <Input className="w-1/4 justify-center items-center text-center bg-yellow-100" type='number' placeholder="Amount" 
                value={(sourcercv_pw_w+sourcercv_village+sourcercv_w+sourcercv_ww+
                    sourcercv_lw).toFixed(2)}  required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Final Backlog : </Label>
                <Label className="w-1/4 pt-2  ">{fsourcebacklog} kg </Label>
                </div>
                

                <Table className="mt-8">



                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl No.</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Lot_No</TableHead>
                        <TableHead className="text-center">Origin</TableHead>
                        <TableHead className="text-center">Previous PW_W </TableHead>
                    <TableHead className="text-center">Current PW_W </TableHead>
                    <TableHead className="text-center">Previous W_LOT </TableHead>
                    <TableHead className="text-center">Current W_LOT </TableHead>
               
                      <TableHead className="text-center">Previous WW </TableHead>                     
                      <TableHead className="text-center">Current WW </TableHead>
                      <TableHead className="text-center">Previous LW </TableHead>        
                      <TableHead className="text-center">Current LW </TableHead>
                      <TableHead className="text-center">Previous Village </TableHead>        
                      <TableHead className="text-center">Current Village </TableHead>
                      
                
                       <TableHead className="text-center">Current Backlog</TableHead>
                        <TableHead className="text-center">Final Backlog</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="boiling-row-height-scoop">
                        <TableCell className="text-center ">1</TableCell>
                        <TableCell className="text-center font-semibold  flex">Source<CircleArrowRight size={30} color="red"/>  </TableCell>
                        
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ?props.borma.LotNo :''}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ?props.borma.origin:''}</TableCell>
                            <TableCell className="text-center  bg-cyan-100">{props.borma ? props.borma.rcv_pw_w :0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_pw_w:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100">{props.borma  ? props.borma.rcv_w_lot :0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_w:'NA'}</TableCell>                    
                            <TableCell className="text-center  bg-yellow-100">{props.borma ? props.borma.rcv_ww:0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_ww:'NA'}</TableCell>                           
                            <TableCell className="text-center bg-green-100 ">{props.borma? props.borma.rcv_lw:0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_lw:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100">{props.borma  ? props.borma.rcv_village :0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_village:'NA'}</TableCell>                 
                            
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ? props.borma.current_backlog :0 }</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? fsourcebacklog:'NA'}</TableCell>
                        </TableRow>
                        <TableRow className="boiling-row-height-scoop" style={{ display: successflagtable }}>
                        <TableCell className="text-center ">2</TableCell>
                        <TableCell className="text-center font-semibold  flex">Target<CircleArrowLeft size={30} color="green"/></TableCell>
                            <TableCell className="text-center font-semibold text-green-600 ">{destlot ? destlot :'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{destorigin ? destorigin :'NA'}</TableCell>
                            <TableCell className="text-center  bg-cyan-100">{datarcv.rcv_pw_w}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_pw_w:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100 ">{successflag ? datarcv.rcv_w_lot:''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_w:'NA'}</TableCell>                    
                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_ww ?datarcv.rcv_ww :''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_ww:'NA'}</TableCell>                      
                            <TableCell className="text-center  bg-green-100">{datarcv.rcv_lw ? datarcv.rcv_lw:''}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? destrcv_lw:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100">{datarcv.rcv_village ? datarcv.rcv_village:''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_village:'NA'}</TableCell>
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
export default RCNHamsaReMix