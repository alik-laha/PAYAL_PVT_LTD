import { DPDSData } from "@/type/type";
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
    borma: DPDSData     
}
interface RCNEntries {
    rcv_dp: string;
    rcv_ds: string;
    rcv_transfer: string;
    rcv_dp1: string;
    rcv_Sorting: string;
    current_backlog: string;
}
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
const RCNDPDSReMix = (props:Props) => {

        const [sourcercv_dp, setsourcercv_dp] = useState<number>(0);
        const [sourcercv_ds, setsourcercv_ds] = useState<number>(0);
        const [sourcercv_dp1, setsourcercv_dp1] = useState<number>(0);
        const [sourcercv_sorting, setsourcercv_sorting] = useState<number>(0);
        const [sourcercv_bigT, setsourcercv_bigT] = useState<number>(0);

        const [fsourcercv_dp, setfsourcercv_dp] = useState<string>();
        const [fsourcercv_ds, setfsourcercv_ds] = useState<string>();
        const [fsourcercv_dp1, setfsourcercv_dp1] = useState<string>();
        const [fsourcercv_sorting, setfsourcercv_sorting] = useState<string>('0');
        const [fsourcebacklog, setfSourcebacklog] = useState<string>('');
        const [fsourcercv_bigT, setfsourcercv_bigT] = useState<string>('0');
        
        
        const [successflag, setSuccessflag] = useState<string>('none');
        const [successflagtable, setSuccessflagtable] = useState<string>('none');

        const [destbacklog, setdestbacklog] = useState<string>("");
        const [destlot, setdestlot] = useState<string>("");
        const [destid, setdestid] = useState<number>(0);
        const [destrcv_dp, setdestrcv_dp] = useState<string>("");
        const [destrcv_ds, setdestrcv_ds] = useState<string>("");
        const [destrcv_dp1, setdestrcv_dp1] = useState<string>("");
        const [destrcv_sorting, setdestrcv_sorting] = useState<string>("");
        const [destrcv_bigT, setdestrcv_bigT] = useState<string>("");

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
            setfsourcercv_sorting(props.borma ?((props.borma.rcv_Sorting ?Number(props.borma.rcv_Sorting):0)-sourcercv_sorting).toFixed(2):'');
            setfsourcercv_bigT(props.borma ?((props.borma.rcv_transfer ?Number(props.borma.rcv_transfer):0)-sourcercv_bigT).toFixed(2):'');

            setfsourcercv_dp(props.borma ?(Number(props.borma.rcv_dp)-sourcercv_dp).toFixed(2):'');
            setfsourcercv_ds(props.borma ?(Number(props.borma.rcv_ds)-sourcercv_ds).toFixed(2):'');
            setfsourcercv_dp1(props.borma ?(Number(props.borma.rcv_dp1)-sourcercv_dp1).toFixed(2):'');
            setfSourcebacklog(props.borma ?(Number(props.borma.current_backlog) - (sourcercv_dp+sourcercv_ds+sourcercv_sorting+sourcercv_dp1)).toFixed(2):'');
            setdestrcv_sorting(((datarcv.rcv_Sorting ?Number(datarcv.rcv_Sorting):0)+sourcercv_sorting).toFixed(2));
         
            setdestrcv_dp(((datarcv.rcv_dp?Number(datarcv.rcv_dp):0)+sourcercv_dp).toFixed(2));
            setdestrcv_ds(((datarcv.rcv_ds?Number(datarcv.rcv_ds):0)+sourcercv_ds).toFixed(2));
            setdestrcv_dp1(((datarcv.rcv_dp1?Number(datarcv.rcv_dp1):0)+sourcercv_dp1).toFixed(2));
            setdestrcv_sorting(((datarcv.rcv_Sorting?Number(datarcv.rcv_Sorting):0)+sourcercv_sorting).toFixed(2));
            setdestbacklog(((datarcv.current_backlog?Number(datarcv.current_backlog):0) + (sourcercv_dp+sourcercv_ds+sourcercv_dp1+sourcercv_sorting)).toFixed(2));
        }, [ sourcercv_dp, sourcercv_ds, sourcercv_dp1, sourcercv_sorting]);

        useEffect(() => {
         
            setfsourcercv_sorting(props.borma ? props.borma.rcv_Sorting:'');
            setfsourcercv_dp(props.borma ?props.borma.rcv_dp:'');
            setfsourcercv_ds(props.borma ?props.borma.rcv_ds:'');
            setfsourcercv_dp1(props.borma ?props.borma.rcv_dp1:'');
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

            const response = await axios.post('/api/dpds/dpdsmixsearch', {
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
               
                setdestrcv_sorting(data1.rcnEntries.rcv_Sorting ? data1.rcnEntries.rcv_Sorting :0)
            
                setdestrcv_dp(data1.rcnEntries.rcv_dp ? data1.rcnEntries.rcv_dp :0)
                setdestrcv_dp1(data1.rcnEntries.rcv_dp1 ? data1.rcnEntries.rcv_dp1 :0)
                setdestrcv_ds(data1.rcnEntries.rcv_ds ? data1.rcnEntries.rcv_ds :0)
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

            if((Number(fsourcercv_dp) < 0) || (Number(fsourcercv_ds) < 0) || (Number(fsourcercv_dp1) < 0) || 
                    (Number(fsourcercv_sorting) < 0) || (Number(fsourcebacklog) < 0)){
                    setErrortext('Transfer cant Exceed Remaining Stock')
                   
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialogerror.showModal()
                   // console.log(rows)
                    return
        
            }

                setisdisable(true)
                try {
                    const initialhumid = await axios.post('/api/dpds/createMixDPDS', {
                        destid,
                        destlot,
                        destorigin,
                        destbacklog,
                        destrcv_sorting,
                        destrcv_dp,
                        destrcv_ds,
                        destrcv_dp1,
                        fsourceid:props.borma.id,
                        fsourcelot:props.borma.LotNo,
                        fsourceorigin:props.borma.origin,
                        fsourcebacklog,fsourcercv_sorting,
                        fsourcercv_dp,fsourcercv_ds,
                        fsourcercv_dp1,
                        amount:(sourcercv_dp+sourcercv_ds+sourcercv_dp1+sourcercv_sorting).toFixed(2),
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
                <div className="flex mt-2 ml-5" >
                <Label className="w-100 pt-2 font-semibold ml-3">(Total Upto {sourceactualbacklog} Kg can be Transfered)</Label>
                </div>
                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-100 pt-2 font-semibold text-red-500">Fill Up Transfer Amount in Details </Label>
                {/* <Label className="w-100 pt-2 font-semibold ml-3">(Maximum Total {sourceactualbacklog} Kg can be Transfered)</Label> */}
                
                </div>

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">1. DP Stock</Label>
                
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_dp} onChange={(e) => setsourcercv_dp(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_dp} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">2. DS Stock</Label>
                <Input className="w-1/4 justify-center items-center text-center" type='number' placeholder="Amount" value={sourcercv_ds} onChange={(e) => setsourcercv_ds(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_ds} kg </Label>
                </div>          
                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">3. DP1 Stock</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_dp1} onChange={(e) => setsourcercv_dp1(Number(e.target.value))} required /> 
                
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_dp1} kg </Label>
                </div>
                
                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">4. Sorting Stock</Label>
                <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={sourcercv_sorting} onChange={(e) => setsourcercv_sorting(Number(e.target.value))} required /> 
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_sorting} kg </Label>

                </div>
                

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 "> Total Transfer Amount </Label>
                <Input className="w-1/4 justify-center items-center text-center bg-yellow-100" type='number' placeholder="Amount" value={(sourcercv_dp+sourcercv_ds+sourcercv_dp1+sourcercv_sorting).toFixed(2)}  required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Final Backlog : </Label>
                <Label className="w-1/4 pt-2  ">{fsourcebacklog} kg </Label>
                </div>
                

                <Table className="mt-8">



                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl No.</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Lot_No</TableHead>
                        <TableHead className="text-center">Origin</TableHead>
                        <TableHead className="text-center">Previous DP </TableHead>
                    <TableHead className="text-center">Current DP </TableHead>
                    <TableHead className="text-center">Previous DS </TableHead>
                    <TableHead className="text-center">Current DS </TableHead>
               
                      <TableHead className="text-center">Previous DP1 </TableHead>                     
                      <TableHead className="text-center">Current DP1 </TableHead>
                  
                      <TableHead className="text-center">Previous Sorting </TableHead>        
                      <TableHead className="text-center">Current Sorting </TableHead>
                       <TableHead className="text-center">Current Backlog</TableHead>
                        <TableHead className="text-center">Final Backlog</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="boiling-row-height-scoop">
                        <TableCell className="text-center ">1</TableCell>
                        <TableCell className="text-center font-semibold  flex">Source<CircleArrowRight size={30} color="red"/>  </TableCell>
                        
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ?props.borma.LotNo :''}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ?props.borma.origin:''}</TableCell>
                            <TableCell className="text-center  bg-cyan-100">{props.borma ? props.borma.rcv_dp :0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_dp:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100">{props.borma  ? props.borma.rcv_ds :0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_ds:'NA'}</TableCell>
                       
                            <TableCell className="text-center  bg-yellow-100">{props.borma ? props.borma.rcv_dp1:0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_dp1:'NA'}</TableCell>
                            
                            <TableCell className="text-center bg-green-100 ">{props.borma? props.borma.rcv_Sorting:0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_sorting:'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ? props.borma.current_backlog :0 }</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? fsourcebacklog:'NA'}</TableCell>
                        </TableRow>
                        <TableRow className="boiling-row-height-scoop" style={{ display: successflagtable }}>
                        <TableCell className="text-center ">2</TableCell>
                        <TableCell className="text-center font-semibold  flex">Target<CircleArrowLeft size={30} color="green"/></TableCell>
                            <TableCell className="text-center font-semibold text-green-600 ">{destlot ? destlot :'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{destorigin ? destorigin :'NA'}</TableCell>
                            <TableCell className="text-center  bg-cyan-100">{datarcv.rcv_dp}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_dp:'NA'}</TableCell>
                            <TableCell className="text-center  bg-red-100 ">{datarcv.rcv_ds}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_ds:'NA'}</TableCell>
                        
                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_dp1 ?datarcv.rcv_dp1 :''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_dp1:'NA'}</TableCell>
                        
                            <TableCell className="text-center  bg-green-100">{datarcv.rcv_Sorting ? datarcv.rcv_Sorting:''}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? destrcv_sorting:'NA'}</TableCell>
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
export default RCNDPDSReMix