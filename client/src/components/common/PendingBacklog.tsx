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



    return (
        <><div className="mx-2 max-h-64 overflow-scroll">

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

                                    <TableCell className="text-center font-bold text-red-500">
                                        {getPendingDays(item.date)} Days
                                    </TableCell>



                                </TableRow>
                            );


                        })
                    ) : <TableRow>
                        <TableCell colSpan={5} className="text-center  text-red-500 font-semibold">No Pending {props.props}</TableCell>

                    </TableRow>}
                </TableBody>
            </Table>




        </div>
        </>
    )
}

export default PendingBacklog