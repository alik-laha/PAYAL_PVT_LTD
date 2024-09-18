import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { rcnScoopingData } from "@/type/type";
import { format, toZonedTime } from 'date-fns-tz'
import { pagelimit } from "../common/exportData"

const RcnTableLineWise = ({ LineWise, page }: { LineWise: rcnScoopingData[], page: number }) => {
    const limit = pagelimit;

    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    function formatNumber(num: any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }
    const handleAMPM = (time: string) => {

        let [hours, minutes] = time.split(':').map(Number);
        let period = ' AM';

        if (hours === 0) {
            hours = 12;
        } else if (hours === 12) {
            period = ' PM';
        } else if (hours > 12) {
            hours -= 12;
            period = ' PM';
        }
        const finalTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + period.toString()

        // return ${hours}:${minutes.toString().padStart(2, '0')} ${period};
        return finalTime;
    }
    return (
        console.log(LineWise),
        <Table className="mt-4">
            <TableHeader className="bg-neutral-100 text-stone-950 ">

                <TableHead className="text-center" >Id</TableHead>
                <TableHead className="text-center" >RCNLotNo.</TableHead>
                <TableHead className="text-center" >Origin</TableHead>
                <TableHead className="text-center" >ScoopingLineMC</TableHead>
                <TableHead className="text-center" >DateofScooping </TableHead>
                
                <TableHead className="text-center" >Size Name</TableHead>
                <TableHead className="text-center" >Opening_Qty(Kg)</TableHead>
                <TableHead className="text-center" >Receiving_Qty(Kg)</TableHead>
                <TableHead className="text-center" >Scooping_MC_ON</TableHead>
                <TableHead className="text-center" >Scooping_MC_OFF</TableHead>
                <TableHead className="text-center" >BreakDown</TableHead>
                <TableHead className="text-center" >OtherTime</TableHead>

                <TableHead className="text-center" >MC_RunTime</TableHead>

                <TableHead className="text-center" >Trolley Broken</TableHead>
                <TableHead className="text-center" >Trolley SmallJB</TableHead>


                <TableHead className="text-center" >Wholes(kg)</TableHead>
                <TableHead className="text-center" >Broken(Kg)</TableHead>
                <TableHead className="text-center" >Uncut(Kg)</TableHead>
                <TableHead className="text-center" >Unscoop(Kg)</TableHead>
                <TableHead className="text-center" >NonCut(Kg)</TableHead>
                <TableHead className="text-center" >Rejection(Kg)</TableHead>
                <TableHead className="text-center" >RCNDust (Kg) </TableHead>

                <TableHead className="text-center" >KOR</TableHead>
                <TableHead className="text-center" >Transfered_Qty</TableHead>
                <TableHead className="text-center" >Transfered_To_Line</TableHead>
                <TableHead className="text-center" >Female (Common)</TableHead>
                <TableHead className="text-center" >Male (Common)</TableHead>
                <TableHead className="text-center" >SuperVisor (Common)</TableHead>
                <TableHead className="text-center" >Total Operator</TableHead>
                <TableHead className="text-center" >Total Female</TableHead>
                <TableHead className="text-center" >EditStatus</TableHead>
                <TableHead className="text-center" >BreakDown Reason</TableHead>
                <TableHead className="text-center" >Entried By </TableHead>

            </TableHeader>
            <TableBody>
                {LineWise.length > 0 ? (LineWise.map((item: rcnScoopingData, idx: number) => {

                    return (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                            <TableCell className="text-center font-semibold text-orange-600">{item.LotNo}</TableCell>
                            <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                            <TableCell className="text-center  font-semibold text-cyan-600 ">{item.Scooping_Line_Mc}</TableCell>
                            <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                           
                           
                            <TableCell className="text-center ">{item.SizeName}</TableCell>
                            <TableCell className="text-center ">{formatNumber(parseFloat(item.Opening_Qty))} </TableCell>
                            <TableCell className="text-center ">{formatNumber(parseFloat(item.Receiving_Qty))} </TableCell>

                            <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>

                            <TableCell className="text-center">{item.Trolley_Broken}%</TableCell>
                            <TableCell className="text-center">{item.Trolley_Small_JB}%</TableCell>


                            <TableCell className="text-center">{formatNumber(parseFloat(item.Wholes))} </TableCell>
                            <TableCell className="text-center">{formatNumber(parseFloat(item.Broken))} </TableCell>

                            <TableCell className="text-center ">{formatNumber(parseFloat(item.Uncut))} </TableCell>


                            <TableCell className="text-center">{formatNumber(parseFloat(item.Unscoop))} </TableCell>
                            <TableCell className="text-center ">{formatNumber(parseFloat(item.NonCut))} </TableCell>
                            <TableCell className="text-center">{formatNumber(parseFloat(item.Rejection))} </TableCell>
                            <TableCell className="text-center ">{formatNumber(parseFloat(item.Dust))} </TableCell>
                            {/* <TableCell className="text-center ">{item.TotBagCutting}</TableCell> */}
                            <TableCell className="text-center ">{formatNumber(parseFloat(item.KOR))}</TableCell>

                            <TableCell className="text-center ">{formatNumber(parseFloat(item.Transfered_Qty))} </TableCell>
                            <TableCell className="text-center ">{item.Transfered_To}</TableCell>

                            <TableCell className="text-center ">{item.noOfLadies}</TableCell>
                            <TableCell className="text-center">{item.noOfGents}</TableCell>
                            <TableCell className="text-center ">{item.noOfSupervisors}</TableCell>
                            <TableCell className="text-center ">{item.noOfOperators}</TableCell>
                            <TableCell className="text-center ">{item.noOfEmployees}</TableCell>
                            <TableCell className="text-center ">{item.editStatus}</TableCell>
                            <TableCell className="text-center">{item.Brkdwn_reason}</TableCell>
                            <TableCell className="text-center ">{item.CreatedBy}</TableCell>

                        </TableRow>
                    );
                })) : (<TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>)
                }
            </TableBody>
        </Table>
    )
}
export default RcnTableLineWise