
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
    borma: SortingData[]
}


interface SortingRowData {

    id: number;
    LotNo: string;
    origin: string;
    alt_id: number;
    rcv_transfer: number;
    rcv_bigTaiho: number;
    rcv_bigTaihoN: number;
    rcv_jjh: number;
    rcv_sjh: number;
    rcv_sjh1: number;
    rcv_sp1: number;
    rcv_jk_k: number;
    rcv_jh1: number;
    rcv_peeling: string;
    issue_jjh: number;
    issue_jjh1: number;
    issue_sjh: number;
    issue_jk: number;
    issue_jk1: number;
    issue_k: number;
    issue_k1: number;
    issue_lwp: number;
    issue_lwp1: number;
    issue_s: number;
    issue_ss: number;
    issue_yk: number;
    issue_sp2: number;
    issue_kp: number;

    issue_in_k: number;
    issue_in_jh: number;
    issue_V_sjh: number;
    issue_V_k: number;
    issue_V_k1: number;
    issue_V_lwp: number;
    issue_V_lwp1: number;
    issue_V_jk: number;
    issue_V_jk1: number;
    issue_V_ss: number;
    issue_V_sp: number;
    issue_V_sp2: number;
    issue_V_jh1: number;
    issue_V_yk: number;
    issue_V_m_jk1: number;
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

    issue_village: number;
    issue_mayur: number;
    issue_bigTaiho: number;
    issue_dpds: number;
    issue_rejection: number;
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
    mixingLot: string | null;

}


import { SortingData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";




const RCNSortingReCreateForm = (props: Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<SortingRowData[]>([])
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


        const initialform = {
            id: props.borma[0].id,
            LotNo: props.borma[0].LotNo,
            alt_id: props.borma[0].altid,
            origin: props.borma[0].origin,
            mixingLot: props.borma[0].mixingLot,
            rcv_bigTaiho: 0,
            rcv_bigTaihoN: 0,
            rcv_transfer: 0,
            rcv_peeling: props.borma[0].current_backlog,
            rcv_jjh: 0,
            rcv_sjh: 0,
            rcv_sjh1: 0,
            rcv_sp1: 0,
            rcv_jk_k: 0,
            rcv_jh1: 0,
            issue_jjh: 0,
            issue_jjh1: 0,
            issue_sjh: 0,
            issue_jk: 0,
            issue_jk1: 0,
            issue_k: 0,
            issue_k1: 0,
            issue_lwp: 0,
            issue_lwp1: 0,
            issue_s: 0,
            issue_ss: 0,
            issue_yk: 0,
            issue_sp2: 0,
            issue_kp: 0,

            issue_in_k: 0,
            issue_in_jh: 0,
            issue_V_sjh: 0,
            issue_V_k: 0,
            issue_V_k1: 0,
            issue_V_lwp: 0,
            issue_V_lwp1: 0,
            issue_V_jk: 0,
            issue_V_jk1: 0,
            issue_V_ss: 0,
            issue_V_sp: 0,
            issue_V_sp2: 0,
            issue_V_jh1: 0,
            issue_V_yk: 0,
            issue_V_m_jk1: 0,
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

            issue_village: 0,
            issue_mayur: 0,
            issue_bigTaiho: 0,
            issue_dpds: 0,
            issue_rejection: 0,
            issue_add_1: Number(props.borma[0].current_backlog),
            issue_add_2: 0,
            issue_add_3: 0,
            issue_add_4: 0,
            issue_add_5: 0,
            issue_add_6: 0,
            issue_add_7: 0,
            issue_add_8: 0,
            issue_add_9: 0,
            issue_add_10: 0,
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
        if ((Number(rows[0].rcv_peeling)
            !== (Number(rows[0].rcv_sjh) + Number(rows[0].rcv_jjh) + Number(rows[0].rcv_sjh1) + Number(rows[0].rcv_sp1) + Number(rows[0].rcv_jh1) + Number(rows[0].rcv_jk_k) +
                (rows[0].rcv_bigTaiho ? Number(rows[0].rcv_bigTaiho) : 0)))) {
            setErrortext('Total Current Receiving should be equal to Opening Balance')
            console.log(Number(rows[0].issue_add_1))
            console.log(Number(rows[0].rcv_sjh) + Number(rows[0].rcv_jjh) + Number(rows[0].rcv_sjh1) + Number(rows[0].rcv_sp1) + Number(rows[0].rcv_jh1) + Number(rows[0].rcv_jk_k) +
                (rows[0].rcv_bigTaiho ? Number(rows[0].rcv_bigTaiho) : 0))
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return
        }
        if (
            ((props.borma[0].rcv_bigTaiho ? Number(props.borma[0].rcv_bigTaiho) : 0) < Number(rows[0].rcv_bigTaiho))
            || (Number(props.borma[0].issue_add_5) < Number(rows[0].rcv_sjh))
            || (Number(props.borma[0].issue_add_6) < Number(rows[0].rcv_sjh1))
            || (Number(props.borma[0].issue_add_4) < Number(rows[0].rcv_jjh))
            || (Number(props.borma[0].issue_add_7) < Number(rows[0].rcv_jh1))
            || (Number(props.borma[0].issue_add_8) < Number(rows[0].rcv_jk_k))
            || (Number(props.borma[0].issue_add_9) < Number(rows[0].rcv_sp1))

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
        props.borma.map((item: SortingData, idx: number) => {
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
            const initialhumid = await axios.post('/api/sorting/createReissueSorting', {
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


    useEffect(() => {

        if (rows[0]) {
            rows[0].issue_add_4 = ((rows[0].rcv_jjh ? Number(rows[0].rcv_jjh) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100))
            rows[0].issue_add_5 = (Number(rows[0].rcv_sjh) * ((100 - Number(rows[0].issue_add_3)) / 100))
            rows[0].issue_add_6 = (Number(rows[0].rcv_sjh1) * ((100 - Number(rows[0].issue_add_3)) / 100))
            rows[0].issue_add_7 = ((rows[0].rcv_jh1 ? Number(rows[0].rcv_jh1) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100))
            rows[0].issue_add_8 = (Number(rows[0].rcv_jk_k) * ((100 - Number(rows[0].issue_add_3)) / 100))
            rows[0].issue_add_9 = (Number(rows[0].rcv_sp1) * ((100 - Number(rows[0].issue_add_3)) / 100))
            rows[0].rcv_bigTaihoN = ((rows[0].rcv_bigTaiho ? Number(rows[0].rcv_bigTaiho) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100))
        }

    }, [rows[0]]);

    const handleOpeningChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {

        if (Number(e.target.value) > Number(rows[index].rcv_peeling)) {
            setErrortext('Borma Weight Cant be Higher Than Receiving !')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }


        if (rows[0].issue_add_1) {
            rows[index].issue_add_2 = ((Number(rows[0].rcv_peeling)) - Number(e.target.value))
            rows[index].issue_add_3 = ((Number(rows[index].issue_add_2) / (Number(rows[0].rcv_peeling))) * 100)
        }
        handleRowChange(index, 'issue_add_1', e.target.value)
    }


    return (
        <>
            <div className="px-5 py-2 overflow-auto">
                <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit2}>
                    <div className="mx-8 flex flex-col gap-0.5">
                        {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                        <div className="flex"><Label className="w-1/4 pt-1">Date of Entry</Label>
                            <Input className="w-1/4 justify-center" placeholder="Date" ref={DateRef} type="date" required />
                            <Label className="w-1/4  text-end font-semibold ">Total Opening : </Label>
                                  <Label className="w-1/4 text-left ml-2 font-semibold text-red-500">{rows[0] ? rows[0].issue_add_1:0} Kg</Label>  
                             </div>

                        <div className="flex"><Label className="w-1/4 pt-1">No. of Labour</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of labour" ref={dayOpRef} />
                            <Label className="w-1/4 text-end font-semibold ">Total Issue : </Label>
                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {rows[0] ? (
                                    (
                                        Number(rows[0].issue_jjh) +
                                        Number(rows[0].issue_jjh1) +
                                        Number(rows[0].issue_sjh) +
                                        Number(rows[0].issue_jk) +
                                        Number(rows[0].issue_jk1) +
                                        Number(rows[0].issue_k) +
                                        Number(rows[0].issue_k1) +
                                        Number(rows[0].issue_lwp) +
                                        Number(rows[0].issue_lwp1) +
                                        Number(rows[0].issue_s) +
                                        Number(rows[0].issue_ss) +
                                        Number(rows[0].issue_yk) +
                                        Number(rows[0].issue_sp2) +
                                        Number(rows[0].issue_kp) +
                                        Number(rows[0].issue_in_k) +
                                        Number(rows[0].issue_in_jh) +
                                        Number(rows[0].issue_V_sjh) +
                                        Number(rows[0].issue_V_k) +
                                        Number(rows[0].issue_V_k1) +
                                        Number(rows[0].issue_V_lwp) +
                                        Number(rows[0].issue_V_lwp1) +
                                        Number(rows[0].issue_V_jk) +
                                        Number(rows[0].issue_V_jk1) +
                                        Number(rows[0].issue_V_ss) +
                                        Number(rows[0].issue_V_sp) +
                                        Number(rows[0].issue_V_sp2) +
                                        Number(rows[0].issue_V_jh1) +
                                        Number(rows[0].issue_V_yk) +
                                        Number(rows[0].issue_V_m_jk1) +
                                        Number(rows[0].issue_ext_grade_1) +
                                        Number(rows[0].issue_ext_grade_2) +
                                        Number(rows[0].issue_ext_grade_3) +
                                        Number(rows[0].issue_ext_grade_4) +
                                        Number(rows[0].issue_ext_grade_5) +
                                        Number(rows[0].issue_ext_grade_6) +
                                        Number(rows[0].issue_ext_grade_7) +
                                        Number(rows[0].issue_ext_grade_8) +
                                        Number(rows[0].issue_ext_grade_9) +
                                        Number(rows[0].issue_ext_grade_10) +
                                        Number(rows[0].issue_village) +
                                        Number(rows[0].issue_mayur) +
                                        Number(rows[0].issue_bigTaiho) +
                                        Number(rows[0].issue_dpds) +
                                        Number(rows[0].issue_rejection)
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                        </div>
                       <div className="flex">
                      <Label className="w-1/4 pt-1"></Label>
                        <Label className="w-1/4 pt-1"></Label>
                            <Label className="w-1/4 text-end font-semibold float-right ">Backlog : </Label>
                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {rows[0] ? (
                                    (
                                        Number(rows[0].issue_add_1)
                                        -
                                        (
                                            Number(rows[0].issue_jjh) +
                                            Number(rows[0].issue_jjh1) +
                                            Number(rows[0].issue_sjh) +
                                            Number(rows[0].issue_jk) +
                                            Number(rows[0].issue_jk1) +
                                            Number(rows[0].issue_k) +
                                            Number(rows[0].issue_k1) +
                                            Number(rows[0].issue_lwp) +
                                            Number(rows[0].issue_lwp1) +
                                            Number(rows[0].issue_s) +
                                            Number(rows[0].issue_ss) +
                                            Number(rows[0].issue_yk) +
                                            Number(rows[0].issue_sp2) +
                                            Number(rows[0].issue_kp) +
                                            Number(rows[0].issue_in_k) +
                                            Number(rows[0].issue_in_jh) +
                                            Number(rows[0].issue_V_sjh) +
                                            Number(rows[0].issue_V_k) +
                                            Number(rows[0].issue_V_k1) +
                                            Number(rows[0].issue_V_lwp) +
                                            Number(rows[0].issue_V_lwp1) +
                                            Number(rows[0].issue_V_jk) +
                                            Number(rows[0].issue_V_jk1) +
                                            Number(rows[0].issue_V_ss) +
                                            Number(rows[0].issue_V_sp) +
                                            Number(rows[0].issue_V_sp2) +
                                            Number(rows[0].issue_V_jh1) +
                                            Number(rows[0].issue_V_yk) +
                                            Number(rows[0].issue_V_m_jk1) +
                                            Number(rows[0].issue_ext_grade_1) +
                                            Number(rows[0].issue_ext_grade_2) +
                                            Number(rows[0].issue_ext_grade_3) +
                                            Number(rows[0].issue_ext_grade_4) +
                                            Number(rows[0].issue_ext_grade_5) +
                                            Number(rows[0].issue_ext_grade_6) +
                                            Number(rows[0].issue_ext_grade_7) +
                                            Number(rows[0].issue_ext_grade_8) +
                                            Number(rows[0].issue_ext_grade_9) +
                                            Number(rows[0].issue_ext_grade_10) +
                                            Number(rows[0].issue_village) +
                                            Number(rows[0].issue_mayur) +
                                            Number(rows[0].issue_bigTaiho) +
                                            Number(rows[0].issue_dpds) +
                                            Number(rows[0].issue_rejection)
                                        )
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                      {/* <Label className="w-2/4 pt-1">No. of Operator(Night)</Label>
                    <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required />
                    <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={nightOpRef}  /> */}
                     </div>



                    </div>
                    <div className="my-2 text-sm flex font-semibold text-red-600 ">
                        * Current  [  JJH +  SJH + SJH1 + JK/K + SP1 + JH1 + BigTaiho ] should be equal to {props.borma[0].current_backlog} Kg</div>


                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl. No.</TableHead>
                            <TableHead className="text-center">Lot_No</TableHead>

                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Mixed_Lot</TableHead>
                            <TableHead className="text-center">Opening_Backlog</TableHead>
                            <TableHead className="text-center">Actual_Backlog (Borma)</TableHead>
                            <TableHead className="text-center">Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Borma Loss(%)</TableHead>

                            <TableHead className="text-center">Previous JJH</TableHead>
                            <TableHead className="text-center">Current JJH</TableHead>
                            <TableHead className="text-center">Previous SJH</TableHead>
                            <TableHead className="text-center">Current SJH</TableHead>
                            <TableHead className="text-center">Previous SJH1</TableHead>
                            <TableHead className="text-center">Current SJH1</TableHead>

                            <TableHead className="text-center">Previous JH1</TableHead>
                            <TableHead className="text-center">Current JH1</TableHead>
                            <TableHead className="text-center">Previous JK/K</TableHead>
                            <TableHead className="text-center">Current JK/K</TableHead>
                            <TableHead className="text-center">Previous SP1</TableHead>
                            <TableHead className="text-center">Current SP1</TableHead>
                            <TableHead className="text-center">Previous BigTaiho</TableHead>
                            <TableHead className="text-center">Current BigTaiho</TableHead>
                            <TableHead className="text-center">-</TableHead>
                       
                            <TableHead className="text-center">Issue Village</TableHead>
                            <TableHead className="text-center">Issue Mayur</TableHead>
                            <TableHead className="text-center">Issue BigTaiho</TableHead>
                            <TableHead className="text-center">Issue DPDS</TableHead>
                            <TableHead className="text-center">Issue Rejection</TableHead>
                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: SortingRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="text-center font-semibold text-blue-500">{row.LotNo}</TableCell>
                                            <TableCell className="text-center font-semibold ">{row.origin}</TableCell>
                                            <TableCell className="text-center font-semibold ">{row.mixingLot}</TableCell>
                                            <TableCell className="text-center font-semibold ">{formatNumber(row.rcv_peeling)} Kg</TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-200' type="number"
                                                    value={row.issue_add_1} placeholder="Pr." onChange={(e) => handleOpeningChange(idx, e)} required /> </TableCell>

                                            <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_2.toString())} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_3.toString())} %</TableCell>

                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].issue_add_4)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_jjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_jjh', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].issue_add_5)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_sjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_sjh', e.target.value)} required /></TableCell>

                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].issue_add_6)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_sjh1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_sjh1', e.target.value)} required /></TableCell>


                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].issue_add_7)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_jh1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_jh1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].issue_add_8)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_jk_k} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_jk_k', e.target.value)} required /></TableCell>

                                            <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].issue_add_9)} Kg</TableCell>
                                            <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_sp1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_sp1', e.target.value)} required /></TableCell>

                                            <TableCell className="text-center font-semibold ">{props.borma[0].rcv_bigTaiho ? formatNumber(props.borma[0].rcv_bigTaiho) : 0} Kg</TableCell>
                                            <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_bigTaiho', e.target.value)} required /></TableCell>


                                            {/* <TableCell className="text-center font-semibold ">{Number(formatNumber(row.rcv_wholesunpeel)) + Number(formatNumber(row.rcv_wholespeel))} Kg</TableCell> */}
                                            {/* <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_jjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jjh', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_jjh1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jjh1', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_sjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sjh', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_jk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jk', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_jk1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jk1', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_k} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_k1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k1', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_lwp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lwp', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_lwp1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lwp1', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_s} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_s', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_ss} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ss', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_yk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_yk', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_sp2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sp2', e.target.value)} required /></TableCell>
                                        <TableCell className="text-center"> <Input className='bg-purple-100' type="number" value={row.issue_kp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_kp', e.target.value)} required /></TableCell> */}
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
                                            <TableCell className="bg-black-100"> -</TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_mayur} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_mayur', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_dpds} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dpds', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>



                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Label className="w-100 pt-1 text-center">Lot Packing Grade</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">




                            <TableHead className="text-center">Issue JJH</TableHead>
                            <TableHead className="text-center">Issue JJH1</TableHead>
                            <TableHead className="text-center">Issue SJH</TableHead>
                            <TableHead className="text-center">Issue JK</TableHead>
                            <TableHead className="text-center">Issue JK1</TableHead>
                            <TableHead className="text-center">Issue K</TableHead>
                            <TableHead className="text-center">Issue K1</TableHead>
                            <TableHead className="text-center">Issue LWP</TableHead>
                            <TableHead className="text-center">Issue LWP1</TableHead>
                            <TableHead className="text-center">Issue S</TableHead>
                            <TableHead className="text-center">Issue SS</TableHead>
                            <TableHead className="text-center">Issue YK</TableHead>
                            <TableHead className="text-center">Issue SP2</TableHead>
                            <TableHead className="text-center">Issue KP</TableHead>

                            <TableHead className="text-center">Issue IN_K</TableHead>
                            <TableHead className="text-center">Issue IN_JH</TableHead>


                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: SortingRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">

                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_jjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jjh', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_jjh1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jjh1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_sjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sjh', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_jk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jk', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_jk1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jk1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_k} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_k1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_lwp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lwp', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_lwp1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lwp1', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_s} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_s', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_ss} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ss', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_yk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_yk', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_sp2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sp2', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_kp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_kp', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_in_k} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_in_k', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_in_jh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_in_jh', e.target.value)} required /></TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Label className="w-100 pt-1 text-center">Village Packing Grade</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Issue V SJH</TableHead>
                            <TableHead className="text-center">Issue V K</TableHead>
                            <TableHead className="text-center">Issue V K1</TableHead>
                            <TableHead className="text-center">Issue V LWP</TableHead>
                            <TableHead className="text-center">Issue V LWP1</TableHead>
                            <TableHead className="text-center">Issue V JK</TableHead>
                            <TableHead className="text-center">Issue V JK1</TableHead>
                            <TableHead className="text-center">Issue V SS</TableHead>
                            <TableHead className="text-center">Issue V SP</TableHead>
                            <TableHead className="text-center">Issue V SP2</TableHead>
                            <TableHead className="text-center">Issue V JH1</TableHead>
                            <TableHead className="text-center">Issue V YK</TableHead>
                            <TableHead className="text-center">Issue V M JK1</TableHead>
                        </TableHeader>

                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: SortingRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">
                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_sjh} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_sjh', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_k} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_k', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_k1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_k1', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_lwp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_lwp', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_lwp1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_lwp1', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_jk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_jk', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_jk1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_jk1', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_ss} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_ss', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_sp} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_sp', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_sp2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_sp2', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_jh1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_jh1', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_yk} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_yk', e.target.value)} required />
                                            </TableCell>

                                            <TableCell className="text-center">
                                                <Input className="bg-yellow-100" type="number" value={row.issue_V_m_jk1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_V_m_jk1', e.target.value)} required />
                                            </TableCell>



                                            {/* <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_1', e.target.value)} required />
                </TableCell>
                
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_2', e.target.value)} required />
                </TableCell>
                
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_3} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_3', e.target.value)} required />
                </TableCell>
                
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_4} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_4', e.target.value)} required />
                </TableCell>
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_5} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_5', e.target.value)} required />
                </TableCell>
                
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_6} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_6', e.target.value)} required />
                </TableCell>
                
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_7} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_7', e.target.value)} required />
                </TableCell>
                
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_8} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_8', e.target.value)} required />
                </TableCell>
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_9} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_9', e.target.value)} required />
                </TableCell>
                
                <TableCell className="text-center">
                  <Input className="bg-purple-100" type="number" value={row.issue_ext_grade_10} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ext_grade_10', e.target.value)} required />
                </TableCell> */}



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
export default RCNSortingReCreateForm;
