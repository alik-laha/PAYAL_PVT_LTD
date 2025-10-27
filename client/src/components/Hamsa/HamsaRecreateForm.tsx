
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

interface Props {
    borma: HamsaData[]
}


interface HamsaRowData {

    id: number;
    LotNo: string;
    origin: string;
    alt_id: number;
    rcv_pw_w: number;
    rcv_w_lot: number;
    rcv_ww: number;
    rcv_transfer: string | null;
    rcv_transfer_2: string | null;
    rcv_village: number;
    rcv_lw: number;
    rcv_opening: string;
    issue_pw_210: number;
    issue_w_210: number;
    issue_ww_210: number;
    issue_pw_240: number;
    issue_w_240: number;
    issue_ww_240: number;
    issue_pw_280: number;
    issue_w_280: number;
    issue_ww_280: number;
    issue_pw_320: number;
    issue_w_320: number;
    issue_ww_320: number;
    issue_pw_400: number;
    issue_w_400: number;
    issue_ww_400: number;

    issue_add_1: number;
    issue_add_2: number;
    issue_add_3: number;
    issue_add_4: number;
    issue_add_5: number;
    issue_add_6: number;
    issue_add_7: number;
    issue_add_8: number;
    issue_add_9: number;
    issue_add_10: number;
    issue_lw: number;
    issue_bigTaiho: number;
    issue_jb: number;
    mixingLot: string | null;
    Mc_on_1: string;
    Mc_off_1: string;
    Mc_breakdown_1: string;
    otherTime_1: string;
    Mc_on_2: string;
    Mc_off_2: string;
    Mc_breakdown_2: string;
    otherTime_2: string;
    Mc_on_3: string;
    Mc_off_3: string;
    Mc_breakdown_3: string;
    otherTime_3: string;
    Mc_on_4: string;
    Mc_off_4: string;
    Mc_breakdown_4: string;
    otherTime_4: string;
    Mc_on_5: string;
    Mc_off_5: string;
    Mc_breakdown_5: string;
    otherTime_5: string;
    Mc_on_6: string;
    Mc_off_6: string;
    Mc_breakdown_6: string;
    otherTime_6: string;
    Mc_on_7: string;
    Mc_off_7: string;
    Mc_breakdown_7: string;
    otherTime_7: string;
}


import { HamsaData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import FormRow from "../common/FormRowTime";




const HamsaReCreateForm = (props: Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<HamsaRowData[]>([])
    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;
    const [isdisable, setisdisable] = useState<boolean>(false)
    const [LotNo, setLotNo] = useState<string>('')
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
    useEffect(() => {

        if (props.borma[0]) {
            setLotNo(props.borma[0].LotNo)
        }
        const initialform = {
            id: props.borma[0].id,
            LotNo: props.borma[0].LotNo,
            alt_id: props.borma[0].altid,
            origin: props.borma[0].origin,
            mixingLot: props.borma[0].mixingLot,
            rcv_transfer: props.borma[0].rcv_transfer,
            rcv_transfer_2: props.borma[0].rcv_transfer_2,
            rcv_opening: props.borma[0].current_backlog,
            rcv_pw_w: 0,
            rcv_w_lot: 0,
            rcv_ww: 0,
            rcv_village: 0,
            rcv_lw: 0,
            issue_pw_210: 0,
            issue_w_210: 0,
            issue_ww_210: 0,
            issue_pw_240: 0,
            issue_w_240: 0,
            issue_ww_240: 0,
            issue_pw_280: 0,
            issue_w_280: 0,
            issue_ww_280: 0,
            issue_pw_320: 0,
            issue_w_320: 0,
            issue_ww_320: 0,
            issue_pw_400: 0,
            issue_w_400: 0,
            issue_ww_400: 0,
            issue_lw: 0,
            issue_bigTaiho: 0,
            issue_jb: 0,
            issue_add_1: 0,
            issue_add_2: 0,
            issue_add_3: 0,
            issue_add_4: 0,
            issue_add_5: 0,
            issue_add_6: 0,
            issue_add_7: 0,
            issue_add_8: 0,
            issue_add_9: 0,
            issue_add_10: 0,
            Mc_on_1: '00:00',
            Mc_off_1: '00:00',
            Mc_breakdown_1: '00:00',
            otherTime_1: '00:00',
            Mc_on_2: '00:00',
            Mc_off_2: '00:00',
            Mc_breakdown_2: '00:00',
            otherTime_2: '00:00',
            Mc_on_3: '00:00',
            Mc_off_3: '00:00',
            Mc_breakdown_3: '00:00',
            otherTime_3: '00:00',
            Mc_on_4: '00:00',
            Mc_off_4: '00:00',
            Mc_breakdown_4: '00:00',
            otherTime_4: '00:00',
            Mc_on_5: '00:00',
            Mc_off_5: '00:00',
            Mc_breakdown_5: '00:00',
            otherTime_5: '00:00',
            Mc_on_6: '00:00',
            Mc_off_6: '00:00',
            Mc_breakdown_6: '00:00',
            otherTime_6: '00:00',
            Mc_on_7: '00:00',
            Mc_off_7: '00:00',
            Mc_breakdown_7: '00:00',
            otherTime_7: '00:00',
        };


        //console.log(initialform)
        setRows([initialform])
        //console.log(props.borma[0])

        //console.log(rows)
    }, [props.borma]);

    const [errortext, setErrortext] = useState('')
    const handleRowChange = (index: number, field: string, fieldvalue: string | number) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: fieldvalue };
        setRows(newRows)
        //console.log(rows)
    }
    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        const resStatus1 = await axios.post('/api/boiling/pendingLotCountOrigin', { lotNo: props.borma[0].LotNo, origin: props.borma[0].origin })
        console.log(resStatus1)
        if (resStatus1.data.scoopingLot && resStatus1.data.scoopingLot[0].editStatus === 'Pending') {
            setErrortext(`Modification of Lot is Pending in Linked  ${resStatus1.data.scoopingLot[0].latest_section} Section`)
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return
        }
        if ((Number(rows[0].rcv_opening)
            !== (Number(rows[0].rcv_pw_w) + Number(rows[0].rcv_w_lot) + Number(rows[0].rcv_ww) +
                (rows[0].rcv_village ? Number(rows[0].rcv_village) : 0) +
                (rows[0].rcv_lw ? Number(rows[0].rcv_lw) : 0)))) {
            setErrortext('Total Current Receiving Balance should be equal to Opening Balance')
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return
        }
        if (((props.borma[0].rcv_village ? Number(props.borma[0].rcv_village) : 0) < Number(rows[0].rcv_village)) ||
            ((props.borma[0].rcv_lw ? Number(props.borma[0].rcv_lw) : 0) < Number(rows[0].rcv_lw)) ||
            (Number(props.borma[0].rcv_pw_w) < Number(rows[0].rcv_pw_w)) ||
            (Number(props.borma[0].rcv_w_lot) < Number(rows[0].rcv_w_lot)) ||
            (Number(props.borma[0].rcv_ww) < Number(rows[0].rcv_ww))

        ) {
            setErrortext('Current Receiving should not Exceed Previous Receiving Value')

            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return

        }
        if (Number(props.borma[0].current_backlog) <= 0) {
            setErrortext('Backlog Cannot be Zero or Negative While Re-Issue')

            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return

        }
        setisdisable(true)
        props.borma.map((item: HamsaData, idx: number) => {
            rows[idx].id = item.id
        })
        console.log(rows)
        const date = DateRef.current?.value
        const dayop = dayOpRef.current?.value
        const nightop = nightOpRef.current?.value

        //const operator = operatorRef.current?.value

        const formData = rows.map((row: any) => ({
            Date: date,
            //operator: operator,
            dayoperator: dayop,
            nightoperator: nightop,

            ...row
        }))

        try {
            const initialhumid = await axios.post('/api/hamsa/createReissueHamsa', {
                linehumid: formData,
                LotNo: props.borma[0].LotNo
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
        finally {
            setisdisable(false)
        }



    }
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }


    return (
        <>
            <div className="px-5 py-2 overflow-auto">
                <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit2}>
                    <div className="mx-1 flex flex-col gap-0.5">
                        {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                        <div className="flex"><Label className="w-1/4 pt-1">Date of Entry</Label>
                            <Input className="w-1/4 justify-center" placeholder="Date" ref={DateRef} type="date" required />
                            <Label className="w-1/4  text-end font-semibold ">Total Receiving : </Label>
                            {props.borma[0] ? <Label className="w-1/4 text-left ml-2 font-semibold text-red-500">{props.borma[0].current_backlog} Kg</Label> : <Label className="w-1/4 text-center font-semibold text-red-500">0</Label>} </div>

                        <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Day)</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Operator(Day)" ref={dayOpRef} />
                            <Label className="w-1/4 text-end font-semibold ">Total Issue : </Label>
                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {rows[0] ? (
                                    (
                                        Number(rows[0].issue_pw_210) +
                                        Number(rows[0].issue_w_210) +
                                        Number(rows[0].issue_ww_210) +
                                        Number(rows[0].issue_pw_240) +
                                        Number(rows[0].issue_w_240) +
                                        Number(rows[0].issue_ww_240) +
                                        Number(rows[0].issue_pw_280) +
                                        Number(rows[0].issue_w_280) +
                                        Number(rows[0].issue_ww_280) +
                                        Number(rows[0].issue_pw_320) +
                                        Number(rows[0].issue_w_320) +
                                        Number(rows[0].issue_ww_320) +
                                        Number(rows[0].issue_add_1) +
                                        Number(rows[0].issue_add_2) +
                                        Number(rows[0].issue_add_3) +
                                        Number(rows[0].issue_pw_400) +
                                        Number(rows[0].issue_w_400) +
                                        Number(rows[0].issue_ww_400) +
                                        Number(rows[0].issue_lw) +
                                        Number(rows[0].issue_bigTaiho) +
                                        Number(rows[0].issue_jb)
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                        </div>
                        <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Night)</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Operator(Night)" ref={nightOpRef} />
                            <Label className="w-1/4 text-end font-semibold  ">Backlog : </Label>
                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {props.borma[0] && rows[0] ? (
                                    (
                                        Number(props.borma[0].current_backlog) -
                                        (
                                            Number(rows[0].issue_pw_210) +
                                            Number(rows[0].issue_w_210) +
                                            Number(rows[0].issue_ww_210) +
                                            Number(rows[0].issue_pw_240) +
                                            Number(rows[0].issue_w_240) +
                                            Number(rows[0].issue_ww_240) +
                                            Number(rows[0].issue_pw_280) +
                                            Number(rows[0].issue_w_280) +
                                            Number(rows[0].issue_ww_280) +
                                            Number(rows[0].issue_pw_320) +
                                            Number(rows[0].issue_w_320) +
                                            Number(rows[0].issue_ww_320) +
                                            Number(rows[0].issue_add_1) +
                                            Number(rows[0].issue_add_2) +
                                            Number(rows[0].issue_add_3) +
                                            Number(rows[0].issue_pw_400) +
                                            Number(rows[0].issue_w_400) +
                                            Number(rows[0].issue_ww_400) +
                                            Number(rows[0].issue_lw) +
                                            Number(rows[0].issue_bigTaiho) +
                                            Number(rows[0].issue_jb)
                                        )
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                        </div>



                    </div>

                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_PW_W' : 'Previous PW_W') : 'Previous PW_W'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_PW_W' : 'Current PW_W') : 'Current PW_W'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_W_Lot' : 'Previous W_Lot') : 'Previous W_Lot'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_W_Lot' : 'Current W_Lot') : 'Current W_Lot'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_Ww' : 'Previous WW') : 'Previous Ww'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_WW' : 'Current WW') : 'Current WW'}</TableHead>
                            <TableHead className="text-center">Previous Village</TableHead>
                            <TableHead className="text-center">Current Village</TableHead>
                            <TableHead className="text-center">Previous LW</TableHead>
                            <TableHead className="text-center">Current LW</TableHead>


                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: HamsaRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">

                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].rcv_pw_w)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input type="number" className='bg-cyan-200' value={row.rcv_pw_w} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_pw_w', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].rcv_w_lot)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input type="number" className='bg-cyan-200' value={row.rcv_w_lot} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_w_lot', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].rcv_ww)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input type="number" className='bg-cyan-200' value={row.rcv_ww} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_ww', e.target.value)} required /></TableCell>

                                            <TableCell className="text-center font-semibold ">{props.borma[0].rcv_village ? formatNumber(props.borma[0].rcv_village) : 0} Kg</TableCell>
                                            <TableCell className="text-center"> <Input type="number" className='bg-cyan-200' value={row.rcv_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_village', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center font-semibold ">{props.borma[0].rcv_lw ? formatNumber(props.borma[0].rcv_lw) : 0} Kg</TableCell>
                                            <TableCell className="text-center"> <Input type="number" className='bg-cyan-200' value={row.rcv_lw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_lw', e.target.value)} required /></TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <div className="my-2 text-sm flex font-semibold text-red-500 ">* Current [ PW (W) + W  + WW + Village + LW ] should be equal to {props.borma[0].current_backlog} Kg</div>

                    <Label className="w-100 pt-5 text-center font-semibold">1. General Information</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl. No.</TableHead>
                            <TableHead className="text-center">Lot_No</TableHead>
                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Incoming Mixed_Lot</TableHead>
                            <TableHead className="text-center">Total Opening</TableHead>

                            <TableHead className="text-center">-</TableHead>
                            <TableHead className="text-center">Issue LW</TableHead>
                            <TableHead className="text-center">Issue BigTaiho</TableHead>

                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: HamsaRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="text-center font-semibold text-blue-500">{row.LotNo}</TableCell>
                                            <TableCell className="text-center font-semibold ">{row.origin}</TableCell>
                                            <TableCell className="text-center font-semibold ">{row.mixingLot}</TableCell>
                                            <TableCell className="text-center font-bold text-red-500">{formatNumber(row.rcv_opening)} Kg</TableCell>


                                            <TableCell className="bg-black-100"> -</TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_lw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                            {/* <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_jb} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jb', e.target.value)} required /></TableCell> */}




                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Label className="w-100 pt-5 text-center font-semibold">2. Wholes Information</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_PW_W_210' : 'Issue PW_W_210') : 'Issue PW_W_210'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_W_210' : 'Issue W_210') : 'Issue W_210'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_WW_210' : 'Issue WW_210') : 'Issue WW_210'}</TableHead>

                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_PW_W_240' : 'Issue PW_W_240') : 'Issue PW_W_240'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_W_240' : 'Issue W_240') : 'Issue W_240'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_WW_240' : 'Issue WW_240') : 'Issue WW_240'}</TableHead>

                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_PW_W_280' : 'Issue PW_W_280') : 'Issue PW_W_280'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_W_280' : 'Issue W_280') : 'Issue W_280'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_WW_280' : 'Issue WW_280') : 'Issue WW_280'}</TableHead>

                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_PW_W_320' : 'Issue PW_W_320') : 'Issue PW_W_320'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_W_320' : 'Issue W_320') : 'Issue W_320'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_WW_320' : 'Issue WW_320') : 'Issue WW_320'}</TableHead>

                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_PW_W_360' : 'Issue PW_W_360') : 'Issue PW_W_360'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_W_360' : 'Issue W_360') : 'Issue W_360'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_WW_360' : 'Issue WW_360') : 'Issue WW_360'}</TableHead>

                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_PW_W_400' : 'Issue PW_W_400') : 'Issue PW_W_400'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_W_400' : 'Issue W_400') : 'Issue W_400'}</TableHead>
                            <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Issue V_WW_400' : 'Issue WW_400') : 'Issue WW_400'}</TableHead>
                            <TableHead className="text-center">Issue JB</TableHead>


                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: HamsaRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">

                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_pw_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_210', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_w_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_210', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ww_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_210', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_pw_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_240', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_w_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_240', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ww_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_240', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_pw_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_280', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_w_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_280', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ww_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_280', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_pw_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_320', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_w_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_320', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ww_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_320', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_add_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_add_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_2', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_add_3} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_3', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_pw_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw_400', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_w_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_400', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ww_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ww_400', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_jb} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jb', e.target.value)} required /></TableCell>

                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Label className="w-100 pt-5 text-center font-semibold">3. Machine Information</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Mc On (Hamsa-1)</TableHead>
                            <TableHead className="text-center">Mc Off (Hamsa-1)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Hamsa-1)</TableHead>
                            <TableHead className="text-center">Other_Time (Hamsa-1)</TableHead>
                            <TableHead className="text-center">Mc On (Hamsa-2)</TableHead>
                            <TableHead className="text-center">Mc Off (Hamsa-2)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Hamsa-2)</TableHead>
                            <TableHead className="text-center">Other_Time (Hamsa-2)</TableHead>
                            <TableHead className="text-center">Mc On (Hamsa-3)</TableHead>
                            <TableHead className="text-center">Mc Off (Hamsa-3)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Hamsa-3)</TableHead>
                            <TableHead className="text-center">Other_Time (Hamsa-3)</TableHead>
                            <TableHead className="text-center">Mc On (Hamsa-4)</TableHead>
                            <TableHead className="text-center">Mc Off (Hamsa-4)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Hamsa-4)</TableHead>
                            <TableHead className="text-center">Other_Time (Hamsa-4)</TableHead>
                            <TableHead className="text-center">Mc On (Hamsa-5)</TableHead>
                            <TableHead className="text-center">Mc Off (Hamsa-5)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Hamsa-5)</TableHead>
                            <TableHead className="text-center">Other_Time (Hamsa-5)</TableHead>
                            <TableHead className="text-center">Mc On (Spectrum)</TableHead>
                            <TableHead className="text-center">Mc Off (Spectrum)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Spectrum)</TableHead>
                            <TableHead className="text-center">Other_Time (Spectrum)</TableHead>


                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: HamsaRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">

                                            <FormRow idx={idx} row={row} column='Mc_on_1' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_1' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center bg-purple-300"><Input value={row.Mc_breakdown_1} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_1', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center bg-purple-300"><Input value={row.otherTime_1} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_1', e.target.value)} type='time' /></TableCell>

                                            <FormRow idx={idx} row={row} column='Mc_on_2' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_2' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center bg-purple-300"><Input value={row.Mc_breakdown_2} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_2', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center bg-purple-300"><Input value={row.otherTime_2} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_2', e.target.value)} type='time' /></TableCell>

                                            <FormRow idx={idx} row={row} column='Mc_on_3' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_3' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center bg-purple-300"><Input value={row.Mc_breakdown_3} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_3', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center bg-purple-300"><Input value={row.otherTime_3} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_3', e.target.value)} type='time' /></TableCell>

                                            <FormRow idx={idx} row={row} column='Mc_on_4' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_4' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center bg-purple-300"><Input value={row.Mc_breakdown_4} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_4', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center bg-purple-300"><Input value={row.otherTime_4} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_4', e.target.value)} type='time' /></TableCell>

                                            <FormRow idx={idx} row={row} column='Mc_on_5' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_5' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center bg-purple-300"><Input value={row.Mc_breakdown_5} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_5', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center bg-purple-300"><Input value={row.otherTime_5} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_5', e.target.value)} type='time' /></TableCell>

                                            <FormRow idx={idx} row={row} column='Mc_on_6' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_6' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center bg-purple-300"><Input value={row.Mc_breakdown_6} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_6', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center bg-purple-300"><Input value={row.otherTime_6} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_6', e.target.value)} type='time' /></TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable ? 'Submitting' : 'Submit'}</Button>


                </form>
                <dialog id="successemployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                    <button id="empcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p>
                    </span>


                </dialog>

                <dialog id="erroremployeedialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                    <button id="errorempcloseDialog" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p>
                    </span>


                </dialog>

            </div>








        </>
    )
}
export default HamsaReCreateForm;
