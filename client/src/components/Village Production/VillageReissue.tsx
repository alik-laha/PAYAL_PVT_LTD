
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
    alt_id: number;
    rcv_opening:string;
    rcv_openingN:number;



    rcv_peeling: number;
    rcv_mayur: number;
    rcv_dpds: number;
    rcv_wholes: number;
    rcv_lw: number;
    rcv_bigTaiho: number;
    rcv_sorting: number;
    rcv_rejection: number;

    rcv_peelingN:  number;
    rcv_mayurN:  number;
    rcv_dpdsN: number;
    rcv_wholesN: number;
    rcv_lwN: number;
    rcv_bigTaihoN: number;
    rcv_sortingN: number;
    rcv_rejectionN:  number;


    issue_packing: number;
    issue_mayur: number;
    issue_hamsa: number;
    issue_bigTaiho: number;
    issue_rejection: number;
    issue_outside: number;



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
    out_Type: string;
    mixingLot: string | null;

}


import {  VilageData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { Village_Outside_Type } from "../common/exportData"




const VillageReCreateForm = (props: Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<villageRowData[]>([])
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
            rcv_opening: props.borma[0].current_backlog,
            rcv_openingN: Number(props.borma[0].current_backlog),

            rcv_peeling: 0,
            rcv_mayur: 0,
            rcv_dpds: 0,
            rcv_wholes: 0,
            rcv_lw: 0,
            rcv_bigTaiho: 0,
            rcv_sorting: 0,
            rcv_rejection: 0,
            rcv_peelingN: 0,
            rcv_mayurN: 0,
             rcv_dpdsN: 0,
            rcv_wholesN: 0,
            rcv_lwN: 0,
            rcv_sortingN:0,
            rcv_bigTaihoN: 0,
            rcv_rejectionN: 0,

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
            issue_packing: 0,
            issue_mayur: 0,
            issue_hamsa: 0,
            issue_bigTaiho: 0,
            issue_rejection: 0,
            issue_outside: 0,
            out_Type:''
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
                (Number(rows[0].rcv_peeling)||0) + (Number(rows[0].rcv_mayur)||0) + (Number(rows[0].rcv_wholes)||0)+
                (Number(rows[0].rcv_lw)||0) + (Number(rows[0].rcv_dpds)||0) + (Number(rows[0].rcv_sorting)||0)+
                (Number(rows[0].rcv_bigTaiho)||0) + (Number(rows[0].rcv_rejection)||0) 
            )
        ) {
            setErrortext('Total Current Receiving should be equal to Opening Balance')
            console.log(Number(rows[0].rcv_opening))
            console.log("Sum:",
                (Number(rows[0].rcv_peeling)||0) + (Number(rows[0].rcv_mayur)||0) + (Number(rows[0].rcv_wholes)||0)+
                (Number(rows[0].rcv_lw)||0) + (Number(rows[0].rcv_dpds)||0) + (Number(rows[0].rcv_sorting)||0)+
                (Number(rows[0].rcv_bigTaiho)||0) + (Number(rows[0].rcv_rejection)||0)
            );
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return
        }


        if (
            ((Number(props.borma[0].rcv_peeling)||0)-(Number(props.borma[0].issue_add_2)||0)) < Number(rows[0].rcv_peeling) ||
            ((Number(props.borma[0].rcv_mayur)||0)-(Number(props.borma[0].issue_add_5)||0)) < Number(rows[0].rcv_mayur) ||
            ((Number(props.borma[0].rcv_rejection)||0)-(Number(props.borma[0].issue_add_8)||0)) < Number(rows[0].rcv_rejection) ||
            (Number(props.borma[0].rcv_wholes)||0) < Number(rows[0].rcv_wholes) ||
            (Number(props.borma[0].rcv_lw)||0) < Number(rows[0].rcv_lw) ||
            (Number(props.borma[0].rcv_dpds)||0) < Number(rows[0].rcv_dpds) ||
            (Number(props.borma[0].rcv_sorting)||0) < Number(rows[0].rcv_sorting) ||
            (Number(props.borma[0].rcv_bigTaiho)||0) < Number(rows[0].rcv_bigTaiho) 
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
            const initialhumid = await axios.post('/api/villageout/createReissueVillage', {
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
                    rows[0].rcv_peelingN = ((rows[0].rcv_peeling ? Number(rows[0].rcv_peeling) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].rcv_wholesN = ((rows[0].rcv_wholes ? Number(rows[0].rcv_wholes) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].rcv_lwN = ((rows[0].rcv_lw ? Number(rows[0].rcv_lw) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].rcv_dpdsN = ((rows[0].rcv_dpds ? Number(rows[0].rcv_dpds) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].rcv_sortingN = ((rows[0].rcv_sorting ? Number(rows[0].rcv_sorting) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].rcv_bigTaihoN = ((rows[0].rcv_bigTaiho ? Number(rows[0].rcv_bigTaiho) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                    rows[0].rcv_rejectionN = ((rows[0].rcv_rejection ? Number(rows[0].rcv_rejection) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                  
                    rows[0].issue_add_5=((Number(rows[0].rcv_mayur))-Number(rows[0].rcv_mayurN))
                    rows[0].issue_add_2=((Number(rows[0].rcv_peeling))-Number(rows[0].rcv_peelingN))
                    rows[0].issue_add_8=((Number(rows[0].rcv_rejection))-Number(rows[0].rcv_rejectionN))
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
                            <Label className="w-1/4 text-left ml-2 font-semibold text-red-500">
                            {rows[0] ? rows[0].rcv_openingN : 0} Kg</Label>
                        </div>
                                                       

                        <div className="flex"><Label className="w-1/4 pt-1">No. of Labour</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Labour" ref={dayOpRef} />
                            <Label className="w-1/4 text-end font-semibold ">Total Issue : </Label>
                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {rows[0] ? (
                                    (

                                        Number(rows[0].issue_packing) +
                                        Number(rows[0].issue_hamsa) +
                                        Number(rows[0].issue_mayur) +
                                        Number(rows[0].issue_bigTaiho) +
                                        Number(rows[0].issue_outside) +
                                        Number(rows[0].issue_rejection)
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                        </div>
                        <div className="flex"><Label className="w-1/4 pt-1">No. of Supervisor</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Supervisor" ref={nightOpRef} />
                       
                            <Label className="w-1/4 text-end font-semibold  ">Backlog : </Label>
                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {rows[0] ? (
                                    (
                                        Number(rows[0].rcv_openingN)
                                        -
                                        (Number(rows[0].issue_packing) +
                                            Number(rows[0].issue_hamsa) +
                                            Number(rows[0].issue_mayur) +
                                            Number(rows[0].issue_bigTaiho) +
                                            Number(rows[0].issue_outside) +
                                            Number(rows[0].issue_rejection)
                                        )
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                        
                        </div>



                    </div>
                    <div className="my-2 text-sm flex font-semibold text-red-600 text-justify ">
                      * Current [ Peeling + Mayur + DPDS + Sorting + Wholes + LW + BigTaiho + Rejection ] should be equal to {props.borma[0].current_backlog} Kg
                  </div>

                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl. No.</TableHead>
                            <TableHead className="text-center">Lot_No</TableHead>

                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Incoming_Mixed_Lot</TableHead>
                            <TableHead className="text-center">Opening_Backlog</TableHead>
                            <TableHead className="text-center">Actual_Backlog (Borma)</TableHead>
                            <TableHead className="text-center">Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Borma Loss(%)</TableHead>
                             <TableHead className="text-center">Previous Peeling</TableHead>
                            <TableHead className="text-center">Current Peeling</TableHead>
                            <TableHead className="text-center">Previous Mayur</TableHead>
                            <TableHead className="text-center">Current Mayur</TableHead>
                               <TableHead className="text-center">Previous Rejection</TableHead>
                            <TableHead className="text-center">Current Rejection</TableHead>
                            <TableHead className="text-center">Previous DPDS</TableHead>
                            <TableHead className="text-center">Current DPDS</TableHead>
                             <TableHead className="text-center">Previous Sorting</TableHead>
                            <TableHead className="text-center">Current Sorting</TableHead>
                            <TableHead className="text-center">Previous Wholes</TableHead>
                            <TableHead className="text-center">Current Wholes</TableHead>
                            <TableHead className="text-center">Previous LW</TableHead>
                            <TableHead className="text-center">Current LW</TableHead>
                             <TableHead className="text-center">Previous BigTaiho</TableHead>
                            <TableHead className="text-center">Current BigTaiho</TableHead>
                            

                            
                            {/* <TableHead className="text-center">Mixed Amount</TableHead> */}

                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: villageRowData, idx: number) => {

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
                                          
                                                <TableCell className="text-center font-semibold ">{formatNumber(((parseFloat(props.borma[0].rcv_peeling)||0)-(parseFloat(props.borma[0].issue_add_2)||0)).toString())} Kg</TableCell>
                                          <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_peeling} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_peeling', e.target.value)} required /></TableCell>
                                          
                                          <TableCell className="text-center font-semibold ">{formatNumber(((parseFloat(props.borma[0].rcv_mayur)||0)-(parseFloat(props.borma[0].issue_add_5)||0)).toString())} Kg</TableCell>

                                          
                                          <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_mayur} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_mayur', e.target.value)} required /></TableCell>
                                                
                                                <TableCell className="text-center font-semibold ">{formatNumber(((parseFloat(props.borma[0].rcv_rejection)||0)-(parseFloat(props.borma[0].issue_add_8)||0)).toString())} Kg</TableCell>
                                          <TableCell className="text-center"> <Input className="bg-cyan-200" type="number" value={row.rcv_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_rejection', e.target.value)} required /></TableCell>


                                        <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_dpds)||0} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-cyan-200" type="number" value={row.rcv_dpds} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_dpds', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_sorting)||0} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-cyan-200" type="number" value={row.rcv_sorting} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_sorting', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_wholes)||0} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-cyan-200" type="number" value={row.rcv_wholes} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_wholes', e.target.value)} required />
                                          </TableCell>
                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_lw)||0} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-cyan-200" type="number" value={row.rcv_lw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_lw', e.target.value)} required />
                                          </TableCell>
                                          <TableCell className="text-center font-semibold">{props.borma[0].rcv_bigTaiho ?formatNumber(props.borma[0].rcv_bigTaiho):0} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-cyan-200" type="number" value={row.rcv_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_bigTaiho', e.target.value)} required />
                                          </TableCell>

                                           
                                      

                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>

                    <Label className="w-100 pt-5 text-center">Other Information</Label>
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
                                                    rows.map((row: villageRowData, idx: number) => {
                    
                                                        return (
                                                            <TableRow key={idx} className="boiling-row-height-scoop">
                    
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
                                            <SelectTrigger className="justify-center items-center w-40 bg-yellow-100">
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
export default VillageReCreateForm;
