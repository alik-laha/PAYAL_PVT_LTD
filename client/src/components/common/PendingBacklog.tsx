import axios from "axios"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { LuDownload } from "react-icons/lu";

const PendingBacklog = (props: any) => {
    const [lotdata, setLotData] = useState<any[]>([])
    const handleBacklog = async () => {
        axios.get(`/api/dashboard/getPendingBacklog/${props.props}`).then(res => {
            console.log(res)
            setLotData(res.data.scoopingLot)
            console.log(lotdata)
        })

    }
    useEffect(() => {
        handleBacklog()
    }, [])

    const getPendingDays = (inputDate: string | Date): number => {
        if (!inputDate) return 0;

        const today = new Date();
        const givenDate = new Date(inputDate);

        // Remove time part (important to avoid timezone issues)
        today.setHours(0, 0, 0, 0);
        givenDate.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - givenDate.getTime();

        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }

    const totalBacklog = lotdata.reduce((sum, item) => {
        return sum + Number(item.current_backlog || 0);
    }, 0);

    const exportToExcel = () => {

        const data = lotdata.map((item, idx) => ({
            Sl_No: idx + 1,
            Lot_No: item.LotNo,
            Origin: item.origin,
            Backlog: formatNumber(item.current_backlog),
            Pending_Days: item.date ? getPendingDays(item.date) : "Un-Entried",
        }));

        // Add total row
        data.push({
            Sl_No: 1,
            Lot_No: "",
            Origin: "TOTAL",
            Backlog: totalBacklog.toFixed(2),
            Pending_Days: "",
        });

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, "Pending_Backlog");

        const wbout = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([wbout], {
            type: "application/octet-stream",
        });

        saveAs(blob, `Pending_Backlog_${props.props}.xlsx`);
    };



    return (
        <><div className="mx-2 max-h-64 overflow-scroll">
            <div className="flex justify-end mr-2 mt-2">
                <button
                    onClick={exportToExcel}
                    className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                >
                    <LuDownload />
                </button>
            </div>

            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center" >Sl</TableHead>
                    <TableHead className="text-center" >Lot No</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Backlog</TableHead>
                    <TableHead className="text-center" >Pending</TableHead>


                </TableHeader>
                <TableBody>
                    {lotdata.length > 0 ? (
                        lotdata.map((item: any, idx: number) => {

                            return (
                                <TableRow key={idx}>
                                    <TableCell className="text-center">
                                        {idx + 1}
                                    </TableCell>
                                    <TableCell className="text-center font-semibold text-purple-500">
                                        {item.LotNo}
                                    </TableCell>
                                    <TableCell className="text-center font-semibold text-blue-500">
                                        {item.origin}
                                    </TableCell>
                                    <TableCell className="text-center font-semibold ">
                                        {formatNumber(item.current_backlog)} kg
                                    </TableCell>
                                    {item.date ?
                                        <TableCell className="text-center font-bold text-red-500">
                                            {getPendingDays(item.date)} Days
                                        </TableCell> :
                                        <TableCell className="text-center font-semibold text-blue-500">
                                            Un-Entried
                                        </TableCell>}



                                </TableRow>
                            );


                        })
                    ) : <TableRow>
                        <TableCell colSpan={5} className="text-center  text-red-500 font-semibold">No Pending {props.props}</TableCell>

                    </TableRow>}
                    <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">
                            Total
                        </TableCell>
                        <TableCell className="text-center font-bold text-green-600">
                            {formatNumber(totalBacklog.toString())} kg
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>




        </div>
        </>
    )
}

export default PendingBacklog