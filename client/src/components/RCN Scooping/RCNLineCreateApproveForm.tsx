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
import { ScoopData } from "@/type/type"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";
import FormRow from "../common/FormRowTime"
import { Button } from "../ui/button"

interface Props {
    scoop: ScoopData[]
}


interface ScoopingRowData {
    LotNo: string;
    id: number;
    origin: string;
    SizeName: string;
    Size: string;
    Scooping_Line_Mc: string;
    Opening_Qty: string;
    Receiving_Qty: number;
    Wholes: string;
    Broken: string;
    Uncut: string;
    Unscoop: string;
    NonCut: string;
    Rejection: string;
    Dust: string;
    KOR: string;
    Trolley_Broken: string;
    Trolley_Small_JB: string;
    Transfered_To: string;
    Mc_on: string;
    Mc_off: string;
    Transfered_Qty: number;
    noOfEmployees: string;
    Mc_breakdown: string;
    otherTime: string;
    Brkdwn_reason: string;
    noOfOperators: string;
}

interface MergedData {
    LotNo: string;
    origin: string;
    Scooping_Line_Mc: string;
    Opening_Qty: number;
    Receiving_Qty: number;
    Wholes: number;
    Broken: number;
    Uncut: number;
    Unscoop: number;
    NonCut: number;
    Rejection: number;
    Dust: number;
    KOR: number;
    noOfEmployees: number;
    noOfOperators: number;
}


interface MergedUpdateData {
    LotNo: string;
    Scooping_Line_Mc: string;
    Uncut: number;
    Unscoop: number;
    NonCut: number;
}




const RCNLineCreateApproveForm = (props: Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const maleRef = useRef<HTMLInputElement>(null);
    const femaleRef = useRef<HTMLInputElement>(null);
    const supervisorRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<ScoopingRowData[]>([])

    const [newFormData, setNewFormData] = useState<MergedData[]>([]);
    const [newFormupdateData, setNewFormupdateData] = useState<MergedUpdateData[]>([]);

    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;

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
    useEffect(() => {
        const mergeRows = (data: ScoopingRowData[]): MergedData[] => {
            const filteredData = data.map(({ LotNo, origin, Scooping_Line_Mc,
                Opening_Qty, Receiving_Qty, Wholes, Broken, Uncut, Unscoop, NonCut, Rejection, Dust, KOR, noOfEmployees, noOfOperators }) => ({
                    LotNo,
                    origin,
                    Scooping_Line_Mc,
                    Opening_Qty: parseFloat(Opening_Qty),
                    Receiving_Qty: Receiving_Qty,
                    Wholes: parseFloat(Wholes),
                    Broken: parseFloat(Broken),
                    Uncut: parseFloat(Uncut),
                    Unscoop: parseFloat(Unscoop),
                    NonCut: parseFloat(NonCut),
                    Rejection: parseFloat(Rejection),
                    Dust: parseFloat(Dust),
                    KOR: parseFloat(KOR),
                    noOfEmployees: parseFloat(noOfEmployees),
                    noOfOperators: parseFloat(noOfOperators)
                }));

            const merged = filteredData.reduce<Record<string, {
                LotNo: string, origin: string, Scooping_Line_Mc: string, Opening_Qty: number,
                Receiving_Qty: number, Wholes: number, Broken: number, Uncut: number, Unscoop: number,
                NonCut: number, Rejection: number,
                Dust: number, KOR: number, noOfEmployees: number, noOfOperators: number
            }>>((acc, row) => {
                const { LotNo,
                    origin,
                    Scooping_Line_Mc,
                    Opening_Qty,
                    Receiving_Qty,
                    Wholes,
                    Broken,
                    Uncut,
                    Unscoop,
                    NonCut,
                    Rejection,
                    Dust,
                    KOR,
                    noOfEmployees,
                    noOfOperators } = row;
                if (!acc[origin]) {
                    acc[origin] = {
                        LotNo, origin, Scooping_Line_Mc,
                        Opening_Qty, Receiving_Qty, Wholes, Broken, Uncut, Unscoop, NonCut, Rejection, Dust, KOR, noOfEmployees, noOfOperators
                    };
                } else {
                    acc[origin].LotNo = LotNo;
                    acc[origin].Opening_Qty += Opening_Qty;
                    acc[origin].Receiving_Qty += Receiving_Qty;
                    acc[origin].Wholes += Wholes;
                    acc[origin].Broken += Broken;
                    acc[origin].Uncut += Uncut;
                    acc[origin].Unscoop += Unscoop;
                    acc[origin].NonCut += NonCut;
                    acc[origin].Rejection += Rejection;
                    acc[origin].Dust += Dust;
                    acc[origin].KOR += KOR;
                    acc[origin].noOfEmployees += noOfEmployees;
                    acc[origin].noOfOperators += noOfOperators;


                }
                return acc;
            }, {});

            return Object.values(merged).map(item => ({
                LotNo: item.LotNo,
                origin: item.origin,
                Scooping_Line_Mc: item.Scooping_Line_Mc,
                Opening_Qty: item.Opening_Qty,
                Receiving_Qty: item.Receiving_Qty,
                Wholes: item.Wholes,
                Broken: item.Broken,
                Uncut: item.Uncut,
                Unscoop: item.Unscoop,
                NonCut: item.NonCut,
                Rejection: item.Rejection,
                Dust: item.Dust,
                KOR: item.KOR,
                noOfEmployees: item.noOfEmployees,
                noOfOperators: item.noOfOperators
            }));
        };

        setNewFormData(mergeRows(rows));
    }, [rows]);
    useEffect(() => {
        console.log(props)
        if (props.scoop.length > 0) {
            if (DateRef.current) {
                DateRef.current.value = props.scoop[0].date.slice(0, 10);
            }
            if (maleRef.current) {
                maleRef.current.value = props.scoop[0].noOfGents;
            }
            if (femaleRef.current) {
                femaleRef.current.value = props.scoop[0].noOfLadies;
            }
            if (supervisorRef.current) {
                supervisorRef.current.value = props.scoop[0].noOfSupervisors;
            }
        }
    }, [props]);



    useEffect(() => {
        const mergeRows = (data: ScoopingRowData[]): MergedUpdateData[] => {
            const filteredData = data.map(({ LotNo, Scooping_Line_Mc,
                Uncut, Unscoop, NonCut }) => ({
                    LotNo,
                    Scooping_Line_Mc,
                    Uncut: parseFloat(Uncut),
                    Unscoop: parseFloat(Unscoop),
                    NonCut: parseFloat(NonCut),
                }));
            const merged = filteredData.reduce<Record<string, {
                LotNo: string, Scooping_Line_Mc: string
                , Uncut: number, Unscoop: number, NonCut: number
            }>>((acc, row) => {
                const { LotNo,
                    Scooping_Line_Mc,
                    Uncut,
                    Unscoop,
                    NonCut,
                } = row;
                if (!acc[Scooping_Line_Mc]) {
                    acc[Scooping_Line_Mc] = {
                        LotNo, Scooping_Line_Mc,
                        Uncut, Unscoop, NonCut
                    };
                } else {
                    acc[Scooping_Line_Mc].LotNo = LotNo;
                    acc[Scooping_Line_Mc].Uncut += Uncut;
                    acc[Scooping_Line_Mc].Unscoop += Unscoop;
                    acc[Scooping_Line_Mc].NonCut += NonCut;
                }
                return acc;
            }, {});

            return Object.values(merged).map(item => ({
                LotNo: item.LotNo,
                Scooping_Line_Mc: item.Scooping_Line_Mc,
                Uncut: item.Uncut,
                Unscoop: item.Unscoop,
                NonCut: item.NonCut,
            }));
        };

        setNewFormupdateData(mergeRows(rows));
        console.log(newFormupdateData)
    }, [rows]);

    useEffect(() => {
        const initialform = props.scoop.map((item: ScoopData) => ({
            origin: item.origin,
            SizeName: item.SizeName,
            Size: item.Size,
            id: item.id,
            LotNo: item.LotNo,
            Scooping_Line_Mc: item.Scooping_Line_Mc,
            Opening_Qty: item.Opening_Qty,
            Receiving_Qty: parseFloat(item.Receiving_Qty),
            Wholes: item.Wholes,
            Broken: item.Broken,
            Uncut: item.Uncut,
            Unscoop: item.Unscoop,
            NonCut: item.NonCut,
            Rejection: item.Rejection,
            Dust: item.Dust,
            KOR: item.KOR,
            Trolley_Small_JB: item.Trolley_Small_JB,
            Trolley_Broken: item.Trolley_Broken,
            Mc_on: item.Mc_on, Mc_off: item.Mc_off,
            Brkdwn_reason: item.Brkdwn_reason, Mc_breakdown: item.Mc_breakdown, otherTime: item.otherTime,
            noOfEmployees: item.noOfEmployees,
            noOfOperators: item.noOfOperators, Transfered_To: item.Transfered_To, Transfered_Qty: item.Transfered_Qty



        }));

        console.log(initialform)
        setRows(initialform)
        console.log(rows)
    }, [props.scoop]);



    const [errortext, setErrortext] = useState('')



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        props.scoop.map((item: ScoopData, idx: number) => {
            rows[idx].id = item.id
        })
        console.log(rows)
        const date = DateRef.current?.value
        const male = maleRef.current?.value
        const female = femaleRef.current?.value
        const supervisor = supervisorRef.current?.value

        try {
            const formData = rows.map((row: any) => ({
                male: male,
                Date: date,
                female: female,
                supervisor: supervisor,
                ...row

            }))
            try {
                let scoopingcount = 0
                for (const data of formData) {
                    const createscoop = await axios.put(`/api/scooping/createScoopingEdit/${data.id}`, { data })

                    if (createscoop) {
                        scoopingcount++;
                    }
                    if (formData.length === scoopingcount) {
                        if (createscoop.status === 200) {
                            await axios.post('/api/scooping/updateLotNo', { lotNo: props.scoop[0].LotNo, desc: 'ScoopingEdit' })
                        }
                    }
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
                await axios.post('/api/scooping/deleteScoopEditReportByLotNo', { lotNo: props.scoop[0].LotNo })
            }

            let scoopingallcount = 0

            const resStatus = await axios.post('/api/boiling/getStatusBoiling', { lotNo: props.scoop[0].LotNo })
            console.log(resStatus)

            if (resStatus.data.lotStatus.modifiedBy && resStatus.data.lotStatus.modifiedBy === 'ScoopingEdit') {
                const formall = newFormData.map((row: any) => ({
                    male: male,
                    Date: date,
                    female: female,
                    supervisor: supervisor,
                    ...row

                }))
                for (const data2 of formall) {
                    const updateall=await axios.post('/api/scooping/createScoopingallEdit', { data2 })
                    scoopingallcount++
                    if (formall.length === scoopingallcount) {

                        setErrortext('Scooping Entry Edit Requested')
                        if (updateall.status === 200) {
                            const dialog2 = document.getElementById("successemployeedialog") as HTMLDialogElement
                            dialog2.showModal()
                            setTimeout(() => {
                                dialog2.close()
                                window.location.reload()
                            }, 3000)
                        }
                    }
                    console.log(resp.data.scoop.id)
                    const p_id = await resp.data.scoop.id
                    await axios.post('/api/scooping/createInitialBorma', { p_id, data2 })
                }

                for (const data3 of newFormupdateData) {
                    scoopingallcount++
                    const update = await axios.post('/api/scooping/updatenextopeningcreate', { data3 })
                    if (newFormupdateData.length === scoopingallcount) {

                        setErrortext('Scooping Entry Edit Requested')
                        if (update.status === 200) {
                            const dialog2 = document.getElementById("successemployeedialog") as HTMLDialogElement
                            dialog2.showModal()
                            setTimeout(() => {
                                dialog2.close()
                                window.location.reload()
                            }, 3000)
                        }
                    }
                }
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
    }


    return (
        <>
            <div className="px-5 py-2 overflow-auto">
                <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit}>
                    <div className="mx-8 flex flex-col gap-0.5">
                        {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                        <div className="flex"><Label className="w-2/4 pt-1">Date of Entry</Label>
                            <Input className="w-2/4 justify-center" placeholder="Date" ref={DateRef} type="date" required readOnly/> </div>
                        <div className="flex"><Label className="w-2/4 pt-1">No. of Male</Label>
                            <Input className="w-2/4 text-center" placeholder="No. of Male" ref={maleRef} required readOnly/> </div>
                        <div className="flex"><Label className="w-2/4 pt-1">No. of Female</Label>
                            <Input className="w-2/4 text-center" placeholder="No. of Female" ref={femaleRef} required readOnly/> </div>
                        <div className="flex"><Label className="w-2/4 pt-1">No. Of Supervisors</Label>
                            <Input className="w-2/4 text-center" placeholder="No. of Supervisor" ref={supervisorRef} required readOnly/> </div>
                    </div>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">


                            <TableHead className="text-center" >Sl. No.</TableHead>
                            <TableHead className="text-center" >LotNo</TableHead>
                            <TableHead className="text-center" >ScoopingLine</TableHead>
                            <TableHead className="text-center" >Origin</TableHead>
                            <TableHead className="text-center" >Size Name</TableHead>
                            <TableHead className="text-center" >Opening Qty</TableHead>
                            <TableHead className="text-center" >Receiving Qty</TableHead>
                            <TableHead className="text-center" >Wholes</TableHead>
                            <TableHead className="text-center" >Broken</TableHead>
                            <TableHead className="text-center" >Uncut</TableHead>
                            <TableHead className="text-center" >Unscoop</TableHead>
                            <TableHead className="text-center" >Non Cut</TableHead>
                            <TableHead className="text-center" >Rejection</TableHead>
                            <TableHead className="text-center" >Dust</TableHead>
                            {/* <TableHead className="text-center" >KOR</TableHead> */}
                            <TableHead className="text-center" >Trolley Broken(%)</TableHead>
                            <TableHead className="text-center" >Trolley SmallJB(%)</TableHead>
                            <TableHead className="text-center" >Scooping On</TableHead>
                            <TableHead className="text-center" >Scooping Off</TableHead>
                            <TableHead className="text-center" >Breakdown Duration</TableHead>
                            <TableHead className="text-center" >Breakdown Reason</TableHead>
                            <TableHead className="text-center" >Other Duration</TableHead>

                            <TableHead className="text-center" >No Of Ladies</TableHead>
                            <TableHead className="text-center" >No Of Operator</TableHead>
                            <TableHead className="text-center" >Transfered_Qty</TableHead>
                            <TableHead className="text-center" >Transfered_Line</TableHead>







                        </TableHeader>
                        <TableBody>
                            {props.scoop.length > 0 ? (
                                rows.map((row: ScoopingRowData, idx: number) => {
                                    //rows[idx].id=item.id
                                    //  {handleRowChange(idx,'id',item.id)}
                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>

                                            <TableCell className="text-center font-semibold">{row.Scooping_Line_Mc}</TableCell>
                                            {/* <TableCell className="text-center">{item.Scooping_Line_Mc}</TableCell> */}
                                            <TableCell className="text-center font-semibold">{row.origin}</TableCell>
                                            <TableCell className="text-center font-semibold">{row.SizeName}</TableCell>
                                            <TableCell className="text-center font-semibold">{row.Opening_Qty} kg</TableCell>
                                            <TableCell className="text-center font-semibold">{row.Receiving_Qty} kg</TableCell>
                                            <TableCell className="text-center ">{row.Wholes} </TableCell>
                                            <TableCell className="text-center"> {row.Broken} </TableCell>
                                            <TableCell className="text-center"> {row.Uncut}</TableCell>
                                            <TableCell className="text-center"> {row.Unscoop} </TableCell>
                                            <TableCell className="text-center"> {row.NonCut} </TableCell>
                                            <TableCell className="text-center"> {row.Rejection} </TableCell>
                                            <TableCell className="text-center"> {row.Dust} </TableCell>
                                            {/* <TableCell className="text-center"> <Input value={row.KOR} placeholder="KOR" onChange={(e) => handleRowChange(idx, 'KOR', e.target.value)} required /></TableCell> */}
                                            <TableCell className="text-center"> {row.Trolley_Broken} </TableCell>
                                            <TableCell className="text-center"> {row.Trolley_Small_JB}</TableCell>
                                            {/* <TableCell className="text-center "> <Input className="bg-green-100" value={row.Mc_on} placeholder="MC ON Time" onChange={(e) => handleRowChange(idx, 'Mc_on', e.target.value)} type='time' required /></TableCell> */}
                                            
                                            <TableCell className="text-center">{handleAMPM(row.Mc_on.slice(0, 5))}</TableCell>
                                            <TableCell className="text-center">{handleAMPM(row.Mc_off.slice(0, 5))}</TableCell>
                                            {/* <FormRow idx={idx} row={row} column='Mc_on' handleRowChange={handleRowChange} /> */}
                                            {/* <FormRow idx={idx} row={row} column='Mc_off' handleRowChange={handleRowChange} /> */}
                                            {/* <TableCell className="text-center"><Input className="bg-red-100" value={row.Mc_off} placeholder="MC Off Time" onChange={(e) => handleRowChange(idx, 'Mc_off', e.target.value)} type='time' required /></TableCell> */}
                                           
                                        
                                  
                                            
                                            <TableCell className="text-center">{row.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                            <TableCell className="text-center"> {row.Brkdwn_reason} </TableCell>
                            
                            <TableCell className="text-center">{row.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>


                                            <TableCell className="text-center"> {row.noOfEmployees} </TableCell>
                                            <TableCell className="text-center"> {row.noOfOperators}</TableCell>
                                            <TableCell className="text-center">{row.Transfered_Qty} </TableCell>
                                            <TableCell className="text-center">{row.Transfered_To} </TableCell>

                                            <TableCell>
                                                {/* <a className="bg-green-500  text-center items-center justify-center h-7 w-19" onClick={()=>handletransfer(idx)}>Transfer</a> */}

                                            </TableCell>

                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Button className="bg-green-500 ml-48 mt-3 text-center items-center justify-center h-8 w-20">Approve</Button>


                </form>
                <Button className="bg-red-500  text-center mr-48 items-center justify-center h-8 w-20 float-right" style={{marginTop:'-32px'}}>Revert</Button>

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
export default RCNLineCreateApproveForm;
