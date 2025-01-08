import { MayurData } from "@/type/type";
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
    borma: MayurData      
}
const RCNMayurReMix = (props:Props) => {

        const [sourcercv_wholespeel, setsourcercv_wholespeel] = useState<number>(0);
        const [sourcercv_wholesunpeel, setsourcercv_wholesunpeel] = useState<number>(0);
        const [sourcercv_DPDS, setsourcercv_DPDS] = useState<number>(0);
        const [sourcercv_sorting, setsourcercv_sorting] = useState<number>(0);
        const [sourcercv_village, setsourcercv_village] = useState<number>(0);

        const [fsourcercv_wholespeel, setfsourcercv_wholespeel] = useState<string>(props.borma.rcv_wholespeel);
        const [fsourcercv_wholesunpeel, setfsourcercv_wholesunpeel] = useState<string>(props.borma.rcv_wholesunpeel);
        const [fsourcercv_DPDS, setfsourcercv_DPDS] = useState<string>(props.borma.rcv_DPDS ? props.borma.rcv_DPDS:'0');
        const [fsourcercv_sorting, setfsourcercv_sorting] = useState<string>(props.borma.rcv_sorting ? props.borma.rcv_sorting:'0');
        const [fsourcercv_village, setfsourcercv_village] = useState<string>(props.borma.rcv_village ? props.borma.rcv_village:'0');
        const [fsourcebacklog, setfSourcebacklog] = useState<string>(props.borma.current_backlog);
        
        const [successflag, setSuccessflag] = useState<string>('none');
        
        const [destbacklog, setdestbacklog] = useState<string>("");
        const [destlot, setdestlot] = useState<string>("");
        const [destrcv_wholespeel, setdestrcv_wholespeel] = useState<string>("");
        const [destrcv_wholesunpeel, setdestrcv_wholesunpeel] = useState<string>("");
        const [destrcv_DPDS, setdestrcv_DPDS] = useState<string>("");
        const [destrcv_sorting, setdestrcv_sorting] = useState<string>("");
        const [destrcv_village, setdestrcv_village] = useState<string>("");
        const [destorigin, setdestorigin] = useState<string>("");
       


        interface RCNEntries {
            rcv_wholespeel: string;
            rcv_wholesunpeel: string;
            rcv_transfer: string;
            rcv_DPDS: string;
            rcv_sorting: string;
            rcv_village: string;
            current_backlog: string;
        }
        
        const [datarcv, setdatarcv] = useState<RCNEntries>({} as RCNEntries);

        


        useEffect(() => {
           
            setfsourcercv_DPDS(((props.borma.rcv_DPDS ? Number(props.borma.rcv_DPDS):0)-sourcercv_DPDS).toFixed(2));
            setfsourcercv_sorting(((props.borma.rcv_sorting ?Number(props.borma.rcv_sorting):0)-sourcercv_sorting).toFixed(2));
            setfsourcercv_village(((props.borma.rcv_village ?Number(props.borma.rcv_village):0)-sourcercv_village).toFixed(2));
            setfsourcercv_wholespeel((Number(props.borma.rcv_wholespeel)-sourcercv_wholespeel).toFixed(2));
            setfsourcercv_wholesunpeel((Number(props.borma.rcv_wholesunpeel)-sourcercv_wholesunpeel).toFixed(2));
            setfSourcebacklog((Number(props.borma.current_backlog) - (sourcercv_wholespeel+sourcercv_wholesunpeel+sourcercv_DPDS+sourcercv_sorting+sourcercv_village)).toFixed(2));
            

            setdestrcv_DPDS(((datarcv.rcv_DPDS ? Number(datarcv.rcv_DPDS):0)+sourcercv_DPDS).toFixed(2));
            setdestrcv_sorting(((datarcv.rcv_sorting ?Number(datarcv.rcv_sorting):0)+sourcercv_sorting).toFixed(2));
            setdestrcv_village(((datarcv.rcv_village ?Number(datarcv.rcv_village):0)+sourcercv_village).toFixed(2));
            setdestrcv_wholespeel(((datarcv.rcv_wholespeel?Number(datarcv.rcv_wholespeel):0)+sourcercv_wholespeel).toFixed(2));
            setdestrcv_wholesunpeel(((datarcv.rcv_wholesunpeel?Number(datarcv.rcv_wholesunpeel):0)+sourcercv_wholesunpeel).toFixed(2));
            setdestbacklog(((datarcv.current_backlog?Number(datarcv.current_backlog):0) + (sourcercv_wholespeel+sourcercv_wholesunpeel+sourcercv_DPDS+sourcercv_sorting+sourcercv_village)).toFixed(2));
        }, [ sourcercv_wholespeel, sourcercv_wholesunpeel, sourcercv_DPDS, sourcercv_sorting, sourcercv_village]);

        const handleSearch = async () => {

            const response = await axios.post('/api/mayur/mayurmixsearch', {
                lotNo: destlot,
                origin: destorigin,
            })
            const data1 = await response.data
      
            console.log(data1.rcnEntries.current_backlog)
            if(data1.rcnEntries.current_backlog){
                setSuccessflag('flex')
                setdatarcv(data1.rcnEntries)
                setdestbacklog(data1.rcnEntries.current_backlog)
                setdestrcv_DPDS(data1.rcnEntries.rcv_DPDS ? data1.rcnEntries.rcv_DPDS :0)
                setdestrcv_sorting(data1.rcnEntries.rcv_sorting ? data1.rcnEntries.rcv_sorting :0)
                setdestrcv_village(data1.rcnEntries.rcv_village ? data1.rcnEntries.rcv_village :0)
                setdestrcv_wholespeel(data1.rcnEntries.rcv_wholespeel ? data1.rcnEntries.rcv_wholespeel :0)
                setdestrcv_wholesunpeel(data1.rcnEntries.rcv_wholesunpeel ? data1.rcnEntries.rcv_wholesunpeel :0)
                setdestrcv_transfer(data1.rcnEntries.rcv_transfer ? data1.rcnEntries.rcv_transfer :0)
               setdestbacklog(data1.rcnEntries.current_backlog)
            }
            else{
                setSuccessflag('none')
                setdestbacklog('NA')
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

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-100 pt-2 font-semibold text-red-500">Fill Up Transfer Amount in Details </Label>
                <Label className="w-100 pt-2 font-semibold ml-3">(Maximum Total {props.borma.current_backlog} Kg can be Transfered)</Label>
                
                </div>

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">1. Wholes Peel Stock</Label>
                
                <Input className="w-1/4 justify-center" placeholder="Amount" type='number' value={sourcercv_wholespeel} onChange={(e) => setsourcercv_wholespeel(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_wholespeel} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">2. UnPeel Stock</Label>
                <Input className="w-1/4 justify-center items-center text-enter" type='number' placeholder="Amount" value={sourcercv_wholesunpeel} onChange={(e) => setsourcercv_wholesunpeel(Number(e.target.value))} required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_wholesunpeel} kg </Label>
                </div>

      
                
                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">3. DPDS Stock</Label>
                <Input className="w-1/4 justify-center" placeholder="Amount" type='number' value={sourcercv_DPDS} onChange={(e) => setsourcercv_DPDS(Number(e.target.value))} required /> 
                
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_DPDS} kg </Label>
                </div>
                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">4. Village Stock</Label>
                <Input className="w-1/4 justify-center" placeholder="Amount" type='number' value={sourcercv_village} onChange={(e) => setsourcercv_village(Number(e.target.value))} required /> 
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_village} kg </Label>

                </div>
                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 text-purple-500">5. Sorting Stock</Label>
                <Input className="w-1/4 justify-center" placeholder="Amount" type='number' value={sourcercv_sorting} onChange={(e) => setsourcercv_sorting(Number(e.target.value))} required /> 
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcercv_sorting} kg </Label>

                </div>
                

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                <Label className="w-1/4 pt-2 "> Total Transfer Amount </Label>
                <Input className="w-1/4 justify-center items-center text-enter" type='number' placeholder="Amount" value={(sourcercv_wholesunpeel+sourcercv_wholespeel+sourcercv_DPDS+sourcercv_sorting+
                sourcercv_village).toFixed(2)}  required />
                <Label className="w-1/4 pt-2 text-red-500 text-center"> Final Backlog : </Label>
                <Label className="w-1/4 pt-2 ">{fsourcebacklog} kg </Label>
                </div>
                

                <Table className="mt-8">



                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl No.</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Lot_No</TableHead>
                        <TableHead className="text-center">Origin</TableHead>
                        <TableHead className="text-center">Previous Wholes_Peel </TableHead>
                    <TableHead className="text-center">Current Wholes_Peel </TableHead>
                    <TableHead className="text-center">Previous Wholes_UnPeeled </TableHead>
                    <TableHead className="text-center">Current Wholes_Peel </TableHead>
               
                      <TableHead className="text-center">Previous DPDS </TableHead>                     
                      <TableHead className="text-center">Current DPDS </TableHead>
                      <TableHead className="text-center">Previous Village </TableHead>      
                      <TableHead className="text-center">Current Village </TableHead>
                      <TableHead className="text-center">Previous Sorting </TableHead>        
                      <TableHead className="text-center">Current Sorting </TableHead>
                       <TableHead className="text-center">Current Backlog</TableHead>
                        <TableHead className="text-center">Final Backlog</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="boiling-row-height-scoop">
                        <TableCell className="text-center ">1</TableCell>
                        <TableCell className="text-center font-semibold  flex">Source<CircleArrowRight size={30} color="red"/>  </TableCell>
                        
                            <TableCell className="text-center font-semibold text-red-500">{props.borma.LotNo}</TableCell>
                            <TableCell className="text-center font-semibold text-cyan-500">{props.borma.origin}</TableCell>
                            <TableCell className="text-center  ">{props.borma.rcv_wholespeel}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? fsourcercv_wholespeel:'NA'}</TableCell>
                            <TableCell className="text-center  ">{props.borma.rcv_wholesunpeel}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? fsourcercv_wholesunpeel:'NA'}</TableCell>
                       
                            <TableCell className="text-center  ">{props.borma.rcv_DPDS ? props.borma.rcv_DPDS:0}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? fsourcercv_DPDS:'NA'}</TableCell>
                            <TableCell className="text-center  ">{props.borma.rcv_village ? props.borma.rcv_village:0}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? fsourcercv_village:'NA'}</TableCell>
                            <TableCell className="text-center  ">{props.borma.rcv_sorting ? props.borma.rcv_sorting:0}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? fsourcercv_sorting:'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma.current_backlog }</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? fsourcebacklog:'NA'}</TableCell>
                        </TableRow>
                        <TableRow className="boiling-row-height-scoop">
                        <TableCell className="text-center ">2</TableCell>
                        <TableCell className="text-center font-semibold  flex">Target<CircleArrowLeft size={30} color="green"/></TableCell>
                            <TableCell className="text-center font-semibold text-green-500 ">{destlot ? destlot :'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-cyan-500">{destorigin ? destorigin :'NA'}</TableCell>
                            <TableCell className="text-center  ">{datarcv.rcv_wholespeel}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? destrcv_wholespeel:'NA'}</TableCell>
                            <TableCell className="text-center  ">{datarcv.rcv_wholesunpeel}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? destrcv_wholesunpeel:'NA'}</TableCell>
                        
                            <TableCell className="text-center  ">{datarcv.rcv_DPDS}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? destrcv_DPDS:'NA'}</TableCell>
                            <TableCell className="text-center ">{datarcv.rcv_village}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? destrcv_village:'NA'}</TableCell>
                            <TableCell className="text-center  ">{datarcv.rcv_sorting}</TableCell>
                            <TableCell className="text-center font-semibold ">{successflag ? destrcv_sorting:'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{datarcv.current_backlog }</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? destbacklog:'NA'}</TableCell>




     
                        </TableRow>
                    </TableBody>
                </Table>
                <span className="w-100 text-center ml-6 no-margin "><Button className="bg-slate-500 h-8" onClick={handleSearch}> Mix</Button></span>
            </div>
        </>
    )

}
export default RCNMayurReMix