
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
    borma: LWData[]
}


interface LWRowData {
    id: number;
    LotNo: string;
    origin: string;
    alt_id: number;
    rcv_opening:string;
    rcv_openingN:number;
    rcv_transfer: number;
    rcv_mayur: number;
    rcv_hamsa: number;
    rcv_wholes:number;
    rcv_wholesN:number;
    rcv_mayurN: number;
    rcv_hamsaN: number;
    issue_kw: number;
    issue_kw_1: number;
    issue_kw_2: number;
    issue_kn: number;
    issue_dw: number;
    issue_dw_1: number;
    issue_dw_2: number;
    issue_ow: number;
    issue_ow_1: number;
    issue_ow_2: number;
    issue_jw: number;
    issue_pw: number;
    issue_row: number;
    issue_rej_1: number;
    issue_lw3_180: number;
    issue_lw3_210: number;
    issue_lw3_240: number;
    issue_lw3_280: number;
    issue_lw3_360: number;
    issue_lw2: number;
    issue_lw4: number;
    issue_lw5: number;
    issue_lw6: number;
    issue_lw7: number;
    issue_rej_3: number;
    issue_rej_4: number;
    issue_jb2: number;
    issue_sjb: number;
    issue_k_240: number;
    issue_k_280: number;
    issue_k_360: number;
    issue_pkw: number;
    issue_bw: number;
    issue_rw: number;
    issue_rrw: number;
    issue_fw: number;
    issue_lw: number;
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
    issue_hamsa: number;
    issue_bigTaiho: number;
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


import { LWData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";




const LWReCreateForm = (props: Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<LWRowData[]>([])
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
            rcv_opening:props.borma[0].current_backlog,
            rcv_openingN:Number(props.borma[0].current_backlog),
            rcv_transfer: 0,
            rcv_mayur: 0,
            rcv_hamsa: 0,
            rcv_wholes: 0,
            rcv_mayurN: 0,
            rcv_hamsaN: 0,
            rcv_wholesN: 0,

            issue_kw: 0,
            issue_kw_1: 0,
            issue_kw_2: 0,
            issue_kn: 0,
            issue_dw: 0,
            issue_dw_1: 0,
            issue_dw_2: 0,
            issue_ow: 0,
            issue_ow_1: 0,
            issue_ow_2: 0,
            issue_jw: 0,
            issue_pw: 0,
            issue_row: 0,
            issue_rej_1: 0,
            issue_lw3_180: 0,
            issue_lw3_210: 0,
            issue_lw3_240: 0,
            issue_lw3_280: 0,
            issue_lw3_360: 0,
            issue_lw2: 0,
            issue_lw4: 0,
            issue_lw5: 0,
            issue_lw6: 0,
            issue_lw7: 0,
            issue_rej_3: 0,
            issue_rej_4: 0,
            issue_jb2: 0,
            issue_sjb: 0,
            issue_k_240: 0,
            issue_k_280: 0,
            issue_k_360: 0,
            issue_pkw: 0,
            issue_bw: 0,
            issue_rw: 0,
            issue_rrw: 0,
            issue_fw: 0,
            issue_lw: 0,
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
            
            issue_add_1:0,
            issue_add_2:0,
            issue_add_3: 0,
            issue_add_4:0,
            issue_add_5: 0,
            issue_add_6: 0,
            issue_add_7: 0,
            issue_add_8: 0,
            issue_add_9: 0,
            issue_add_10: 0,
            issue_rejection: 0,
            issue_village: 0,
            issue_bigTaiho: 0,
            issue_hamsa: 0,
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

        if (
            Number(rows[0].rcv_opening) !== (
                Number(rows[0].rcv_hamsa) + Number(rows[0].rcv_mayur) + Number(rows[0].rcv_wholes)

            )
        ) {
            setErrortext('Total Current Receiving should be equal to Opening Balance')
            console.log(Number(rows[0].rcv_opening))
            console.log("Sum:",
                Number(rows[0].rcv_hamsa) + Number(rows[0].rcv_mayur) + Number(rows[0].rcv_wholes)
            );
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return
        }


        if (
            Number(props.borma[0].issue_add_7) < Number(rows[0].rcv_mayur) ||
            Number(props.borma[0].issue_add_8) < Number(rows[0].rcv_hamsa) ||
            Number(props.borma[0].rcv_wholes) < Number(rows[0].rcv_wholes)
        ) {
            setErrortext('Current Receiving should not Exceed Previous Receiving Value');

            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement;
            dialogerror.showModal();
            return;
        }
        if (Number(props.borma[0].current_backlog) <= 0) {
            setErrortext('Backlog Cannot be Zero or Negative While Re-Issue')

            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return

        }

        setisdisable(true)
        props.borma.map((item: LWData, idx: number) => {
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
            const initialhumid = await axios.post('/api/lw/createReissueLW', {
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

    const handleOpeningChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {

        if (Number(e.target.value)>Number(rows[index].rcv_opening)) {
            setErrortext('Borma Weight Cant be Higher Than Receiving !')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
       

        if(rows[0].rcv_openingN){
           // rows[index].issue_add_2=((Number(rows[0].rcv_opening))-Number(e.target.value))
           // rows[index].issue_add_3=((Number(rows[index].issue_add_2)/(Number(rows[0].rcv_opening)))*100) 

           rows[index].issue_add_3=((((Number(rows[0].rcv_opening))-Number(e.target.value))/(Number(rows[0].rcv_opening)))*100) 
          
        }
        handleRowChange(index,'rcv_openingN',e.target.value)
    }
       useEffect(() => { 
        
                if(rows[0]){
                    rows[0].rcv_mayurN = ((rows[0].rcv_mayur ? Number(rows[0].rcv_mayur) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].rcv_hamsaN = ((rows[0].rcv_hamsa ? Number(rows[0].rcv_hamsa) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].rcv_wholesN = ((rows[0].rcv_wholes ? Number(rows[0].rcv_wholes) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].issue_add_2=((Number(rows[0].rcv_mayur))-Number(rows[0].rcv_mayurN))
                    rows[0].issue_add_5=((Number(rows[0].rcv_hamsa))-Number(rows[0].rcv_hamsaN))
                }
                
            }, [rows[0]]); 
    


    return (
        <>
            <div className="px-5 py-2 overflow-auto">
                <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit2}>
                    <div className="mx-1 flex flex-col gap-0.5">
                        {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                        <div className="flex"><Label className="w-1/4 pt-1">Date of Entry</Label>
                            <Input className="w-1/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> 
                                                         <Label className="w-1/4  text-end font-semibold ">Total Opening : </Label>
                                                        <Label className="w-1/4 text-left ml-2 font-semibold text-red-500">{rows[0] ? rows[0].rcv_openingN:0} Kg</Label>
                                                        </div>

                        <div className="flex"><Label className="w-1/4 pt-1">No. of Labour</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Labour" ref={dayOpRef} />
                             <Label className="w-1/4 text-end font-semibold ">Total Issue : </Label>
                                                        <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                                            {rows[0] ? (
                                                                (
                                                                    Number(rows[0].issue_kw) +
                                                                    Number(rows[0].issue_kw_1) +
                                                                    Number(rows[0].issue_kw_2) +
                                                                    Number(rows[0].issue_kn) +
                                                                    Number(rows[0].issue_dw) +
                                                                    Number(rows[0].issue_dw_1) +
                                                                    Number(rows[0].issue_dw_2) +
                                                                    Number(rows[0].issue_ow) +
                                                                    Number(rows[0].issue_ow_1) +
                                                                    Number(rows[0].issue_ow_2) +
                                                                    Number(rows[0].issue_jw) +
                                                                    Number(rows[0].issue_pw) +
                                                                    Number(rows[0].issue_row) +
                                                                    Number(rows[0].issue_rej_1) +
                                                                    Number(rows[0].issue_lw3_180) +
                                                                    Number(rows[0].issue_lw3_210) +
                                                                    Number(rows[0].issue_lw3_240) +
                                                                    Number(rows[0].issue_lw3_280) +
                                                                    Number(rows[0].issue_lw3_360) +
                                                                    Number(rows[0].issue_lw2) +
                                                                    Number(rows[0].issue_lw4) +
                                                                    Number(rows[0].issue_lw5) +
                                                                    Number(rows[0].issue_lw6) +
                                                                    Number(rows[0].issue_lw7) +
                                                                    Number(rows[0].issue_rej_3) +
                                                                    Number(rows[0].issue_rej_4) +
                                                                    Number(rows[0].issue_jb2) +
                                                                    Number(rows[0].issue_sjb) +
                                                                    Number(rows[0].issue_k_240) +
                                                                    Number(rows[0].issue_k_280) +
                                                                    Number(rows[0].issue_k_360) +
                                                                    Number(rows[0].issue_pkw) +
                                                                    Number(rows[0].issue_bw) +
                                                                    Number(rows[0].issue_rw) +
                                                                    Number(rows[0].issue_rrw) +
                                                                    Number(rows[0].issue_fw) +
                                                                    Number(rows[0].issue_lw) +
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
                                                                    Number(rows[0].issue_hamsa) +
                                                                    Number(rows[0].issue_bigTaiho) +
                                                                    Number(rows[0].issue_rejection)
                                                                ).toFixed(2)
                                                            ) : 0} Kg
                                                        </Label>
                        </div>
                        <div className="flex"><Label className="w-1/4 pt-1">No. of Supervisor</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Supervisor" ref={nightOpRef} />
                            <Label className="w-1/4 text-end font-semibold float-right ">Backlog : </Label>
                                                                        <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                                                          {rows[0] ? (
                                                                            (
                                                                              (rows[0].rcv_openingN) -
                                                                              (
                                                                                Number(rows[0].issue_kw) +
                                                                    Number(rows[0].issue_kw_1) +
                                                                    Number(rows[0].issue_kw_2) +
                                                                    Number(rows[0].issue_kn) +
                                                                    Number(rows[0].issue_dw) +
                                                                    Number(rows[0].issue_dw_1) +
                                                                    Number(rows[0].issue_dw_2) +
                                                                    Number(rows[0].issue_ow) +
                                                                    Number(rows[0].issue_ow_1) +
                                                                    Number(rows[0].issue_ow_2) +
                                                                    Number(rows[0].issue_jw) +
                                                                    Number(rows[0].issue_pw) +
                                                                    Number(rows[0].issue_row) +
                                                                    Number(rows[0].issue_rej_1) +
                                                                    Number(rows[0].issue_lw3_180) +
                                                                    Number(rows[0].issue_lw3_210) +
                                                                    Number(rows[0].issue_lw3_240) +
                                                                    Number(rows[0].issue_lw3_280) +
                                                                    Number(rows[0].issue_lw3_360) +
                                                                    Number(rows[0].issue_lw2) +
                                                                    Number(rows[0].issue_lw4) +
                                                                    Number(rows[0].issue_lw5) +
                                                                    Number(rows[0].issue_lw6) +
                                                                    Number(rows[0].issue_lw7) +
                                                                    Number(rows[0].issue_rej_3) +
                                                                    Number(rows[0].issue_rej_4) +
                                                                    Number(rows[0].issue_jb2) +
                                                                    Number(rows[0].issue_sjb) +
                                                                    Number(rows[0].issue_k_240) +
                                                                    Number(rows[0].issue_k_280) +
                                                                    Number(rows[0].issue_k_360) +
                                                                    Number(rows[0].issue_pkw) +
                                                                    Number(rows[0].issue_bw) +
                                                                    Number(rows[0].issue_rw) +
                                                                    Number(rows[0].issue_rrw) +
                                                                    Number(rows[0].issue_fw) +
                                                                    Number(rows[0].issue_lw) +
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
                                                                    Number(rows[0].issue_hamsa) +
                                                                    Number(rows[0].issue_bigTaiho) +
                                                                    Number(rows[0].issue_rejection)
                                                                              )
                                                                            ).toFixed(2)
                                                                          ) : 0} Kg
                                                                        </Label>
                        </div>



                    </div>
                    <div className="my-2 text-sm flex font-semibold text-red-600 text-justify ">
                      * Current [ rcv_mayur + rcv_hamsa + rcv_wholes ] should be equal to {props.borma[0].current_backlog} Kg
                  </div>

                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl. No.</TableHead>
                            <TableHead className="text-center">Lot_No</TableHead>

                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Incoming⠀Mixed⠀Lot</TableHead>
                            <TableHead className="text-center">Opening⠀Backlog</TableHead>
                            <TableHead className="text-center">Actual⠀Backlog (Borma)</TableHead>
                            <TableHead className="text-center">Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Borma Loss(%)</TableHead>
                            <TableHead className="text-center">Previous Mayur</TableHead>
                            <TableHead className="text-center">Current Mayur</TableHead>
                            <TableHead className="text-center">Previous Hamsa</TableHead>
                            <TableHead className="text-center">Current hamsa</TableHead>
                            <TableHead className="text-center">Previous Wholes</TableHead>
                            <TableHead className="text-center">Current Wholes</TableHead>
                            <TableHead className="text-center">-</TableHead>
                            <TableHead className="text-center">Issue Village</TableHead>
                            <TableHead className="text-center">Issue Hamsa</TableHead>
                            <TableHead className="text-center">Issue BigTaiho</TableHead>
                            <TableHead className="text-center">Issue Rejection</TableHead>
                            {/* <TableHead className="text-center">Mixed Amount</TableHead> */}

                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: LWRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                          <TableCell className="text-center font-semibold text-blue-500">{row.LotNo}</TableCell>
                                          <TableCell className="text-center font-semibold ">{row.origin}</TableCell>
                                          <TableCell className="text-center font-semibold ">{row.mixingLot}</TableCell>
                                          <TableCell className="text-center font-semibold ">{formatNumber(row.rcv_opening)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-200' type="number"
                                                  value={row.rcv_openingN} placeholder="Pr." onChange={(e) => handleOpeningChange(idx, e)} required /> </TableCell>

                                          <TableCell className="text-center text-red-500 font-semibold">{formatNumber((Number(row.rcv_opening)-row.rcv_openingN).toString())} Kg</TableCell>
                                          <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_3.toString())} %</TableCell>
                                          
                                          
                                          
                                          <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].issue_add_7)} Kg</TableCell>
                                          <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_mayur} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_mayur', e.target.value)} required /></TableCell>
                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].issue_add_8)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-cyan-200" type="number" value={row.rcv_hamsa} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_hamsa', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_wholes)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-cyan-200" type="number" value={row.rcv_wholes} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_wholes', e.target.value)} required />
                                          </TableCell>

                                           
                                          <TableCell className="bg-black-100"> -</TableCell>
                                          
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_hamsa} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_hamsa', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>

                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>

                    <Label className="w-100 pt-5 text-center">2. Packing Grade Information</Label>
                                        <Table className="mt-3">
                                            <TableHeader className="bg-neutral-100 text-stone-950 ">
                                            <TableHead className="text-center">Issue KW</TableHead>
                            <TableHead className="text-center">Issue KW1</TableHead>
                            <TableHead className="text-center">Issue KW2</TableHead>
                            <TableHead className="text-center">Issue KN</TableHead>
                            <TableHead className="text-center">Issue DW</TableHead>
                            <TableHead className="text-center">Issue DW1</TableHead>
                            <TableHead className="text-center">Issue DW2</TableHead>
                            <TableHead className="text-center">Issue OW</TableHead>
                            <TableHead className="text-center">Issue OW1</TableHead>
                            <TableHead className="text-center">Issue OW2</TableHead>
                            <TableHead className="text-center">Issue JW</TableHead>
                            <TableHead className="text-center">Issue PW</TableHead>
                            <TableHead className="text-center">Issue ROW</TableHead>
                            <TableHead className="text-center">Issue REJ⠀1</TableHead>
                            <TableHead className="text-center">Issue LW3⠀180</TableHead>
                            <TableHead className="text-center">Issue LW3⠀210</TableHead>
                            <TableHead className="text-center">Issue LW3⠀240</TableHead>
                            <TableHead className="text-center">Issue LW3⠀280</TableHead>
                            <TableHead className="text-center">Issue LW3⠀360</TableHead>
                            <TableHead className="text-center">Issue LW2</TableHead>
                            <TableHead className="text-center">Issue LW4</TableHead>
                            <TableHead className="text-center">Issue LW5</TableHead>
                            <TableHead className="text-center">Issue LW6</TableHead>
                            <TableHead className="text-center">Issue LW7</TableHead>
                            <TableHead className="text-center">Issue REJ⠀3</TableHead>
                            <TableHead className="text-center">Issue REJ⠀4</TableHead>
                            <TableHead className="text-center">Issue JB2</TableHead>
                            <TableHead className="text-center">Issue SJB</TableHead>
                            <TableHead className="text-center">Issue K⠀240</TableHead>
                            <TableHead className="text-center">Issue K⠀_280</TableHead>
                            <TableHead className="text-center">Issue K⠀360</TableHead>
                            <TableHead className="text-center">Issue PKW</TableHead>
                            <TableHead className="text-center">Issue BW</TableHead>
                            <TableHead className="text-center">Issue RW</TableHead>
                            <TableHead className="text-center">Issue RRW</TableHead>
                            <TableHead className="text-center">Issue FW</TableHead>
                            <TableHead className="text-center">Issue LW</TableHead>
                    
                    
                                            </TableHeader>
                                            <TableBody>
                                                {props.borma.length > 0 ? (
                                                    rows.map((row: LWRowData, idx: number) => {
                    
                                                        return (
                                                            <TableRow key={idx} className="boiling-row-height-scoop">
                    
                    <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_kw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_kw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_kw_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_kw_1', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_kw_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_kw_2', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_kn} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_kn', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_dw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_dw_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dw_1', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_dw_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_dw_2', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_ow} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ow', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_ow_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ow_1', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_ow_2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ow_2', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_jw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_pw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_row} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_row', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_rej_1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rej_1', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw3_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw3_180', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw3_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw3_210', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw3_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw3_240', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw3_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw3_280', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw3_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw3_360', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw2', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw4} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw4', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw5} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw5', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw6} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw6', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw7} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw7', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_rej_3} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rej_3', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_rej_4} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rej_4', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_jb2} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jb2', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_sjb} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sjb', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_k_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_240', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_k_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_280', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_k_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_360', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_pkw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_pkw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_bw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_rw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_rrw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rrw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_fw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_fw', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_lw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw', e.target.value)} required />
                                            </TableCell>
                    
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
export default LWReCreateForm;
