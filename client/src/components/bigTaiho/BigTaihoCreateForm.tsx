
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
    borma: BigTaihoData[]
}


interface BigTaihoRowData {
    id: number;
    LotNo: string;
    origin: string;
    rcv_transfer: string | null;
    rcv_peeling: string;
    rcv_peelingN: string | number;
    rcv_village: string | null;
    rcv_sorting: string | null;
    rcv_dpds: string | null;
    rcv_mayur: string | null;
    rcv_hamsa: string | null;
    rcv_lw: string | null;
    rcv_wholes: string | null;
    issue_ssp: number;
    issue_ssp_small: number;
    issue_swp_1: number;
    issue_wsp: number;
    issue_bits: number;
    issue_swp: number;
    issue_bb: number;
    issue_w_bb: number;
    issue_bb_A: number;
    issue_bb1: number;
    issue_bb1_A: number;
    issue_bb_2: number;
    issue_ssp_1: number;
    issue_ssp_1_small: number;
    issue_ssp_2: number;
    issue_ssp_2_small: number;
    issue_sdp: number;
    issue_ext_grade_1: number;
    issue_ext_grade_2: number;
    issue_ext_grade_3: number;
    issue_ext_grade_4: number;
    issue_ext_grade_5: number;
    issue_ext_grade_6: number;
    issue_ext_grade_7: number;
    issue_ext_grade_8: number;
    issue_ext_grade_9: number;
    issue_ext_grade_10: number;
    issue_add_1: string | number;
    issue_add_2: string | number;
    issue_add_3: string | number;
    issue_add_4: number;
    issue_add_5: number;
    issue_add_6: number;
    issue_add_7: number;
    issue_add_8: number;
    issue_add_9: number;
    issue_add_10: number;
    issue_husk: number;
    issue_rejection: number;
    issue_village: number;
    issue_sorting: number;
    issue_dpds: number;
    mixingLot: string | null;

    Mc_on_3: string;
    Mc_off_3: string;
    Mc_breakdown_3: string;
    otherTime_3: string;
    Mc_on_1: string;
    Mc_off_1: string;
    Mc_breakdown_1: string;
    otherTime_1: string;

    Mc_on_2: string;
    Mc_off_2: string;
    Mc_breakdown_2: string;
    otherTime_2: string;
}


import { BigTaihoData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import FormRow from "../common/FormRowTime";



const RCNDBigTaihoCreateForm = (props: Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<BigTaihoRowData[]>([])
    const [vilLot,setVilLot]=useState<boolean>(false)
    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;
    const [isdisable, setisdisable] = useState<boolean>(false)
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

            if (props.borma[0].LotNo.includes('V')) {
              setVilLot(true)
            }
          }
        const initialform = props.borma.map((item: BigTaihoData) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            rcv_transfer: item.rcv_transfer,
            rcv_peeling: item.rcv_peeling,
            rcv_peelingN: item.rcv_peeling,
            rcv_village: item.rcv_village,
            rcv_sorting: item.rcv_sorting,
            rcv_dpds: item.rcv_dpds,
            rcv_mayur: item.rcv_mayur,
            rcv_hamsa: item.rcv_hamsa,
            rcv_lw: item.rcv_lw,
            rcv_wholes: item.rcv_wholes,
            issue_ssp: 0,
            issue_ssp_small: 0,
            issue_swp_1: 0,
            issue_wsp: 0,
            issue_bits: 0,
            issue_swp: 0,
            issue_bb: 0,
            issue_w_bb: 0,
            issue_bb_A: 0,
            issue_bb1: 0,
            issue_bb1_A: 0,
            issue_bb_2: 0,
            issue_ssp_1: 0,
            issue_ssp_1_small: 0,
            issue_ssp_2: 0,
            issue_ssp_2_small: 0,
            issue_sdp: 0,
            issue_ext_grade_1: 0,
            issue_ext_grade_2: 0,
            issue_ext_grade_3: 0,
            issue_ext_grade_4: 0,
            issue_ext_grade_5: 0,
            issue_ext_grade_6: 0,
            issue_ext_grade_7: 0,
            issue_ext_grade_8: 0,
            issue_ext_grade_9: 0,
            issue_ext_grade_10: 0,
            issue_add_1: formatNumber(item.rcv_peeling),
            issue_add_2: '0',
            issue_add_3: '0',
            issue_add_4: 0,
            issue_add_5: 0,
            issue_add_6: 0,
            issue_add_7: 0,
            issue_add_8: 0,
            issue_add_9: 0,
            issue_add_10: 0,
            issue_husk: 0,
            issue_rejection: 0,
            issue_village: 0,
            issue_dpds: 0,
            issue_sorting: 0,
            mixingLot: item.mixingLot,
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
            otherTime_3: '00:00'
        }));

        //console.log(initialform)
        setRows(initialform)
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
        setisdisable(true)
        props.borma.map((item: BigTaihoData, idx: number) => {
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
            const initialhumid = await axios.post('/api/bigTaiho/createEntireBigTaiho', {
                linehumid: formData,
                LotNo: props.borma[0].LotNo,vilLot
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

    const handleOpeningChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {

        if (Number(e.target.value) > (Number(rows[index].rcv_peeling))) {
            setErrortext('Borma Weight Cant be Higher Than Receiving !')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
        if (rows[0].issue_add_1) {
            rows[index].issue_add_2 = (Number(rows[index].rcv_peeling) - Number(e.target.value))
            rows[index].issue_add_3 = (Number(rows[index].issue_add_2) / Number(rows[index].rcv_peeling)) * 100
            rows[index].rcv_peelingN = (Number(rows[index].rcv_peeling) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString()
        }
        handleRowChange(index, 'issue_add_1', e.target.value)
    }



    return (
        <>
            <div className="px-5 py-2 overflow-auto">
                <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit2}>
                    <div className="mx-1 flex flex-col gap-1">
                        {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                        <div className="flex"><Label className="w-1/4 pt-1">Date of Entry</Label>
                            <Input className="w-1/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>

                        <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Day)</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={dayOpRef} />
                        </div>
                        <div className="flex"><Label className="w-1/4 pt-1">No. of Operator(Night)</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Operator" ref={nightOpRef} />
                        </div>



                    </div>
                    <Label className="w-100 pt-5 text-center">1. General Information</Label>

                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl. No.</TableHead>
                            <TableHead className="text-center">Lot_No</TableHead>

                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Mixed_Lot</TableHead>


                            <TableHead className="text-center">Receive Village</TableHead>
                            <TableHead className="text-center">Receive Sorting</TableHead>
                            <TableHead className="text-center">Receive DPDS</TableHead>
                            <TableHead className="text-center">Receive Mayur</TableHead>
                            <TableHead className="text-center">Receive Hamsa</TableHead>
                            <TableHead className="text-center">Receive LW</TableHead>
                            <TableHead className="text-center">Receive Wholes</TableHead>
                            <TableHead className="text-center">Receive Peeling</TableHead>
                            <TableHead className="text-center">Receive Peeling(Borma)</TableHead>
                            <TableHead className="text-center">Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Borma Loss(%)</TableHead>


                            {/* <TableHead className="text-center">Issue Add 1</TableHead>
                    <TableHead className="text-center">Issue Add 2</TableHead>
                    <TableHead className="text-center">Issue Add 3</TableHead>
                    <TableHead className="text-center">Issue Add 4</TableHead>
                    <TableHead className="text-center">Issue Add 5</TableHead>
                    <TableHead className="text-center">Issue Add 6</TableHead>
                    <TableHead className="text-center">Issue Add 7</TableHead>
                    <TableHead className="text-center">Issue Add 8</TableHead>
                    <TableHead className="text-center">Issue Add 9</TableHead>
                    <TableHead className="text-center">Issue Add 10</TableHead> */}
                            <TableHead className="text-center">Issue Husk</TableHead>
                            <TableHead className="text-center">Issue Rejection</TableHead>
                            <TableHead className="text-center">Issue Village</TableHead>
                            <TableHead className="text-center">Issue Sorting</TableHead>
                            <TableHead className="text-center">Issue DPDS</TableHead>





                            {/* <TableHead className="text-center">Mixed Amount</TableHead> */}

                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: BigTaihoRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.mixingLot}</TableCell>
                                            <TableCell className="text-center font-semibold text-green-500">{row.rcv_village ? formatNumber(row.rcv_village) : 0} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-green-500">{row.rcv_sorting ? formatNumber(row.rcv_sorting) : 0} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-green-500">{row.rcv_dpds ? formatNumber(row.rcv_dpds) : 0} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-green-500">{row.rcv_mayur ? formatNumber(row.rcv_mayur) : 0} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-green-500">{row.rcv_hamsa ? formatNumber(row.rcv_hamsa) : 0} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-green-500">{row.rcv_lw ? formatNumber(row.rcv_lw) : 0} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-green-500">{row.rcv_wholes ? formatNumber(row.rcv_wholes) : 0} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-green-600">{formatNumber(row.rcv_peeling)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-200' type="number"
                                                value={Number(row.issue_add_1.toString())} placeholder="Pr." onChange={(e) => handleOpeningChange(idx, e)} required /></TableCell>
                                            <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_2.toString())} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_3.toString())} %</TableCell>

                                            {/* <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_1', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_2', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_3} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_3', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_4} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_4', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_5} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_5', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_6} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_6', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_7} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_7', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_8} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_8', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_9} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_9', e.target.value)} required /></TableCell>
                                    <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_add_10} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_add_10', e.target.value)} required /></TableCell> */}
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_husk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_husk', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_sorting} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sorting', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_dpds} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dpds', e.target.value)} required /></TableCell>







                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Label className="w-100 pt-5 text-center">2. Packing Grade Information</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Issue SSP</TableHead>
                            <TableHead className="text-center">Issue SSP(Small)</TableHead>
                            <TableHead className="text-center">Issue SWP_1</TableHead>
                            <TableHead className="text-center">Issue WSP</TableHead>
                            <TableHead className="text-center">Issue Bits</TableHead>
                            <TableHead className="text-center">Issue SWP</TableHead>
                            <TableHead className="text-center">Issue BB</TableHead>
                            <TableHead className="text-center">Issue W_BB</TableHead>
                            <TableHead className="text-center">Issue BB A</TableHead>
                            <TableHead className="text-center">Issue BB1</TableHead>
                            <TableHead className="text-center">Issue BB1(A)</TableHead>
                            <TableHead className="text-center">Issue BB 2</TableHead>
                            <TableHead className="text-center">Issue SSP_1</TableHead>
                            <TableHead className="text-center">Issue SSP_1(Small)</TableHead>
                            <TableHead className="text-center">Issue SSP_2</TableHead>
                            <TableHead className="text-center">Issue SSP_2(Small)</TableHead>
                            <TableHead className="text-center">Issue SDP</TableHead>


                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: BigTaihoRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">

                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ssp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssp', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ssp_small} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssp_small', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_swp_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_swp_1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_wsp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_wsp', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bits} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bits', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_swp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_swp', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bb} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bb', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_w_bb} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_w_bb', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bb_A} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bb_A', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bb1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bb1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bb1_A} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bb1_A', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bb_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bb_2', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ssp_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssp_1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ssp_1_small} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssp_1_small', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ssp_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssp_2', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ssp_2_small} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssp_2_small', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_sdp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sdp', e.target.value)} required /></TableCell>

                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Label className="w-100 pt-5 text-center">3. Machine Information</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Mc On (Taiho)</TableHead>
                            <TableHead className="text-center">Mc Off (Taiho)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Taiho)</TableHead>
                            <TableHead className="text-center">Other_Time (Taiho)</TableHead>
                            <TableHead className="text-center">Mc On (Spectrum)</TableHead>
                            <TableHead className="text-center">Mc Off (Spectrum)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Spectrum)</TableHead>
                            <TableHead className="text-center">Other_Time (Spectrum)</TableHead>
                            <TableHead className="text-center">Mc On (Amrita)</TableHead>
                            <TableHead className="text-center">Mc Off (Amrita)</TableHead>
                            <TableHead className="text-center">Mc_Breakdown (Amrita)</TableHead>
                            <TableHead className="text-center">Other_Time (Amrita)</TableHead>


                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: BigTaihoRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">

                                            <FormRow idx={idx} row={row} column='Mc_on_1' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_1' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center"><Input value={row.Mc_breakdown_1} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_1', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center"><Input value={row.otherTime_1} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_1', e.target.value)} type='time' /></TableCell>

                                            <FormRow idx={idx} row={row} column='Mc_on_2' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_2' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center"><Input value={row.Mc_breakdown_2} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_2', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center"><Input value={row.otherTime_2} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_2', e.target.value)} type='time' /></TableCell>

                                            <FormRow idx={idx} row={row} column='Mc_on_3' handleRowChange={handleRowChange} />
                                            <FormRow idx={idx} row={row} column='Mc_off_3' handleRowChange={handleRowChange} />
                                            <TableCell className="text-center"><Input value={row.Mc_breakdown_3} placeholder="BreakDown" onChange={(e) => handleRowChange(idx, 'Mc_breakdown_3', e.target.value)} type='time' /></TableCell>
                                            <TableCell className="text-center"><Input value={row.otherTime_3} placeholder="Other Time" onChange={(e) => handleRowChange(idx, 'otherTime_3', e.target.value)} type='time' /></TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Button className="bg-orange-500  text-center items-center justify-center h-8 w-20" disabled={isdisable}>{isdisable ? 'Submitting' : 'Submit'}</Button>


                </form>
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
export default RCNDBigTaihoCreateForm;
