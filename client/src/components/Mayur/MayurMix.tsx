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

        const [sourcewholespeel, setSourcewholespeel] = useState<string>("");
        const [sourcewholecut, setSourcewholecut] = useState<string>("");
        const [sourcebacklog, setSourcebacklog] = useState<string>("");
        const [destwholecut, setdestwholecut] = useState<string>("");
        const [destwholespeel, setdestwholespeel] = useState<string>("");
        const [destbacklog, setdestbacklog] = useState<string>("");
        const [destlot, setdestlot] = useState<string>("");
        const [destorigin, setdestorigin] = useState<string>("");

        useEffect(() => {
            setSourcewholespeel(props.borma.rcv_wholespeel);
            setSourcewholecut(props.borma.rcv_wholesunpeel);
            setSourcebacklog(props.borma.current_backlog);
            
        }, [props.borma]);

        const handleSearch = async () => {

            const response = await axios.post('/api/mayur/mayurmixsearch', {
                lotNo: destlot,
                origin: destlot,
            })
            const data = await response.data

        }

    return (
        <>

            <div className="px-5 py-2 overflow-auto">

                <div className="mx-8 flex flex-row gap-0.5">


                    <div className="flex"><Label className="w-2/4 pt-2">Transfer to Lot No</Label>
                        <Input className="w-2/4 justify-center" placeholder="Lot No" value={destlot} onChange={(e) => setdestlot(e.target.value)} required /> </div>

                    <div className="flex"><Label className="w-2/4 pt-2 text-center">Origin</Label>
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

                <Table className="mt-3">



                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center">Sl No.</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Lot_No</TableHead>
                        <TableHead className="text-center">Origin</TableHead>
                        <TableHead className="text-center">Current Wholes_Peel</TableHead>
                        <TableHead className="text-center">Current Wholes_UnPeel</TableHead>
                        <TableHead className="text-center">Current Backlog</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="boiling-row-height-scoop">
                        <TableCell className="text-center ">1</TableCell>
                        <TableCell className="text-center "><CircleArrowLeft size={25} color="red"/></TableCell>
                        
                            <TableCell className="text-center font-semibold ">{props.borma.LotNo}</TableCell>
                            <TableCell className="text-center font-semibold text-cyan-500">{props.borma.origin}</TableCell>
                            <TableCell className="text-center font-semibold">{sourcewholespeel}</TableCell>
                            <TableCell className="text-center font-semibold">{sourcewholecut}</TableCell>
                            <TableCell className="text-center font-semibold">{sourcebacklog}</TableCell>
                        </TableRow>
                        <TableRow className="boiling-row-height-scoop">
                        <TableCell className="text-center ">2</TableCell>
                        <TableCell className="text-center font-bold"><CircleArrowRight size={25} color="green"/></TableCell>
                            <TableCell className="text-center font-semibold ">{destlot ? destlot :'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-cyan-500">{destorigin ? destorigin :'NA'}</TableCell>
                            <TableCell className="text-center font-semibold">{destwholespeel ? destwholespeel : 'NA'}</TableCell>
                            <TableCell className="text-center font-semibold">{destwholecut ? destwholecut :'NA'}</TableCell>
                            <TableCell className="text-center font-semibold">{destbacklog ? destbacklog :'NA'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    )

}
export default RCNMayurReMix