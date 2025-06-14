
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    borma: VilageData[]
}


interface villageRowData {
    id: number;
    LotNo: string;
    origin: string;

    rcv_peeling: string;
    rcv_mayur: string;
    rcv_dpds: string;
    rcv_wholes: string;
    rcv_lw: string;
    rcv_bigTaiho: string;
    rcv_sorting: string;
    rcv_rejection: string;
    rcv_peelingN: string | number;
    rcv_mayurN: string | number;
    rcv_rejectionN: string | number;

    issue_packing: number;
    issue_mayur: number;
    issue_hamsa: number;
    issue_bigTaiho: number;
    issue_rejection: number;
    issue_outside: number;
    
    issue_add_1: string | number;
    issue_add_2: string | number;
    issue_add_3: string | number;
    issue_add_4: number | string;
    issue_add_5: string | number;
    issue_add_6: string | number;
    issue_add_7:  string | number;
    issue_add_8: string | number;
    issue_add_9:  string | number;
    issue_add_10: number;
    out_Type: string;
    mixingLot: string | null;

}


import {   VilageData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { Village_Outside_Type } from "../common/exportData"




const VillageCreateForm = (props: Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<villageRowData[]>([])
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
        const initialform = props.borma.map((item: VilageData) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            rcv_peeling: item.rcv_peeling,
            rcv_mayur: item.rcv_mayur,
            rcv_dpds: item.rcv_dpds,
            rcv_wholes: item.rcv_wholes,
            rcv_lw: item.rcv_lw,
            rcv_bigTaiho: item.rcv_bigTaiho,
            rcv_sorting: item.rcv_sorting,
            rcv_rejection: item.rcv_rejection ? item.rcv_rejection : '0',
            rcv_peelingN: item.rcv_peeling,
            rcv_rejectionN: item.rcv_rejection ? item.rcv_rejection : '0',
            rcv_mayurN: item.rcv_mayur,
            issue_packing: 0,
            issue_mayur: 0,
            issue_hamsa: 0,
            issue_bigTaiho: 0,
            issue_rejection: 0,
            issue_outside: 0,
            issue_add_1: formatNumber(item.rcv_peeling),
            issue_add_2: '0',
            issue_add_3: '0',
            issue_add_4: formatNumber(item.rcv_mayur),
            issue_add_5: '0',
            issue_add_6: '0',
            issue_add_7:formatNumber(item.rcv_rejection),
            issue_add_8: '0',
            issue_add_9: '0',
            issue_add_10: 0,
            mixingLot: item.mixingLot,
            out_Type:''
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
        props.borma.map((item: VilageData, idx: number) => {
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
            const initialhumid = await axios.post('/api/villageout/createEntireVillage', {
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
    const handlepeelingOpeningChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {

        if (Number(e.target.value) > (Number(rows[index].rcv_peeling))) {
            setErrortext('Peeling Borma Weight Cant be Higher Than Receiving !')
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

    const handlemayurOpeningChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {

        if (Number(e.target.value) > (Number(rows[index].rcv_mayur))) {
            setErrortext('Mayur Borma Weight Cant be Higher Than Receiving !')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
        if (rows[0].issue_add_4) {
            rows[index].issue_add_5 = (Number(rows[index].rcv_mayur) - Number(e.target.value))
            rows[index].issue_add_6 = (Number(rows[index].issue_add_5) / Number(rows[index].rcv_mayur)) * 100
            rows[index].rcv_mayurN = (Number(rows[index].rcv_mayur) * ((100 - Number(rows[index].issue_add_6)) / 100)).toString()
        }
        handleRowChange(index, 'issue_add_4', e.target.value)
    }

    const handleRejectionOpeningChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {

        if (Number(e.target.value) > (Number(rows[index].rcv_rejection))) {
            setErrortext('Rejection Borma Weight Cant be Higher Than Receiving !')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
        if (rows[0].issue_add_7) {
            rows[index].issue_add_8 = (Number(rows[index].rcv_rejection) - Number(e.target.value))
            rows[index].issue_add_9 = (Number(rows[index].issue_add_8) / Number(rows[index].rcv_rejection)) * 100
            rows[index].rcv_rejectionN = (Number(rows[index].rcv_rejection) * ((100 - Number(rows[index].issue_add_9)) / 100)).toString()
        }
        handleRowChange(index, 'issue_add_7', e.target.value)
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
                                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                              {rows[0] ? (
                                                (
                                                  Number(rows[0].issue_add_1) + 
                                                  Number(rows[0].issue_add_4) + Number(rows[0].issue_add_7) +
                                                  (rows[0].rcv_wholes ? Number(rows[0].rcv_wholes) : 0)+
                                                  (rows[0].rcv_lw ? Number(rows[0].rcv_lw) : 0)+
                                                  (rows[0].rcv_dpds ? Number(rows[0].rcv_dpds) : 0)+
                                                  (rows[0].rcv_sorting ? Number(rows[0].rcv_sorting) : 0)+
                                                  (rows[0].rcv_bigTaiho ? Number(rows[0].rcv_bigTaiho) : 0)
                                                ).toFixed(2)
                                              ) : 0} Kg
                                            </Label> </div>

                        <div className="flex"><Label className="w-1/4 pt-1">No. of Labour</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Labour" ref={dayOpRef} />
                            <Label className="w-1/4 text-end font-semibold ">Total Issue : </Label>
                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {rows[0] ? (
                                    (
                                        Number(rows[0].issue_packing) +
                                        Number(rows[0].issue_mayur) +
                                        Number(rows[0].issue_bigTaiho) +
                                        Number(rows[0].issue_hamsa) +
                                        Number(rows[0].issue_outside) +
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
                                        (Number(rows[0].issue_add_1) +
                                            Number(rows[0].issue_add_4) + Number(rows[0].issue_add_7) +
                                            (rows[0].rcv_wholes ? Number(rows[0].rcv_wholes) : 0) +
                                            (rows[0].rcv_lw ? Number(rows[0].rcv_lw) : 0) +
                                            (rows[0].rcv_dpds ? Number(rows[0].rcv_dpds) : 0) +
                                            (rows[0].rcv_sorting ? Number(rows[0].rcv_sorting) : 0) +
                                            (rows[0].rcv_bigTaiho ? Number(rows[0].rcv_bigTaiho) : 0)) -
                                        (
                                            Number(rows[0].issue_packing) +
                                            Number(rows[0].issue_outside) +
                                            Number(rows[0].issue_mayur) +
                                            Number(rows[0].issue_bigTaiho) +
                                            Number(rows[0].issue_hamsa) +
                                            Number(rows[0].issue_rejection)
                                        )
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                        </div>



                    </div>
                    <Label className="w-100 pt-2 text-center">General Information</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl. No.</TableHead>
                            <TableHead className="text-center">Lot_No</TableHead>

                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Mixed_Lot</TableHead>



                            
                            <TableHead className="text-center">Receive Peeling</TableHead>
                            <TableHead className="text-center">Receive Peeling (Borma)</TableHead>
                            <TableHead className="text-center">Peeling Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Peeling Borma Loss(%)</TableHead>
                            <TableHead className="text-center">Receive Mayur</TableHead>
                            <TableHead className="text-center">Receive Mayur (Borma)</TableHead>
                            <TableHead className="text-center">Mayur Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Mayur Borma Loss(%)</TableHead>

                            <TableHead className="text-center">Receive Rejection</TableHead>
                            <TableHead className="text-center">Receive Rejection (Borma)</TableHead>
                            <TableHead className="text-center">Rejection Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Rejection Borma Loss(%)</TableHead>


                            <TableHead className="text-center">Receive Wholes </TableHead>
                            <TableHead className="text-center">Receive LW </TableHead>
                            <TableHead className="text-center">Receive Sorting </TableHead>
                            <TableHead className="text-center">Receive DPDS </TableHead>
                            <TableHead className="text-center">Receive BigTaiho </TableHead>
                            

                           
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
                            {/* <TableHead className="text-center">Issue Village</TableHead>
                            <TableHead className="text-center">Issue Hamsa</TableHead>
                            <TableHead className="text-center">Issue BigTaiho</TableHead>
                            <TableHead className="text-center">Issue Rejection</TableHead> */}
                            {/* <TableHead className="text-center">Mixed Amount</TableHead> */}

                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: villageRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height">
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.mixingLot}</TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_peeling)} </TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number"
                                                value={Number(row.issue_add_1.toString())} placeholder="Pr." onChange={(e) => handlepeelingOpeningChange(idx, e)} required /></TableCell>
                                            <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_2.toString())} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_3.toString())} %</TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_mayur)} </TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number"
                                                value={Number(row.issue_add_4.toString())} placeholder="Pr." onChange={(e) => handlemayurOpeningChange(idx, e)} required /></TableCell>
                                            <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_5.toString())} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_6.toString())} %</TableCell>          
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_rejection)} </TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number"
                                                value={Number(row.issue_add_7.toString())} placeholder="Pr." onChange={(e) => handleRejectionOpeningChange(idx, e)} required /></TableCell>
                                            <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_8.toString())} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_9.toString())} %</TableCell>
                                            
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_wholes)} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_lw)} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_sorting)} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_dpds)} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{row.rcv_bigTaiho ?formatNumber(row.rcv_bigTaiho):0} </TableCell>
                                           


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
                                            {/* <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_hamsa} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_hamsa', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell> */}

                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Label className="w-100 pt-1 text-center">Other Information</Label>
                                    <Table className="mt-3">
                                       <TableHeader className="bg-neutral-100 text-stone-950 ">
                                       
                                      
                                        
                                       
                                       <TableHead className="text-center">Issue Packing</TableHead>
                            <TableHead className="text-center">Issue Mayur</TableHead>
                            <TableHead className="text-center">Issue Hamsa</TableHead>
                            <TableHead className="text-center">Issue BigTaiho</TableHead>
                            <TableHead className="text-center">Issue Rejection</TableHead>
                          
                            <TableHead className="text-center">Issue Outside</TableHead>
                            <TableHead className="text-center">Issue Outside (Type)</TableHead>
                           
                                      
                                   
                                        </TableHeader>
                                        <TableBody>
                                            {props.borma.length > 0 ? (
                                                rows.map(( row:villageRowData,idx:number) => {
                                                  
                                                    return (
                                                        <TableRow key={idx} className="boiling-row-height">
                                                          
                                                          <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_packing} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_packing', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_mayur} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_mayur', e.target.value)} required />
                                                </TableCell>
                                        
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_hamsa} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_hamsa', e.target.value)} required />
                                            </TableCell>
                                                <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required />
                                            </TableCell>
                                         
                                                <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required />
                                            </TableCell>
                                            
                                            <TableCell className="text-center">
                                                <Input className='bg-yellow-100' type="number" value={row.issue_outside} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_outside', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center " >
                                            <Select value={row.out_Type} onValueChange={(val) => handleRowChange(idx, 'out_Type', val)} required={true}>
                                            <SelectTrigger className="justify-center w-40 bg-yellow-100">
                                                    <SelectValue placeholder="Item-Type" />
                                                </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {
                                                                Village_Outside_Type.map((item) => {
                                                                    return (
                                                                        <SelectItem key={item} value={item}>
                                                                            {item}
                                                                        </SelectItem>
                                                                    )
                                                                })
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                            </Select>

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
export default VillageCreateForm;
