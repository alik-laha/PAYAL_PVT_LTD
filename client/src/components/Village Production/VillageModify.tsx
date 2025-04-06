
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
    borma: VilageData[]
}


interface villageRowData {
    id: number;
    LotNo: string;
    alt_id:number;
    origin: string;
    mixingLot:string|null;


    rcv_peeling: string;
    rcv_mayur: string;
    rcv_dpds: string|null;
    rcv_wholes: string;
    rcv_lw: string;
    rcv_bigTaiho: string;
    rcv_sorting: string|null;
    rcv_rejection: string;
    rcv_peelingN: string | number;
    rcv_mayurN: string | number;
    rcv_rejectionN: string | number;
    
    
    issue_packing: string;
    issue_mayur: string;
    issue_hamsa: string;
    issue_bigTaiho: string;
    issue_rejection: string;
    issue_outside: string;

    issue_add_1: string ;
    issue_add_2: string | number;
    issue_add_3: string | number;
    issue_add_4: string ;
    issue_add_5: string | number;
    issue_add_6: string | number;
    issue_add_7: string;
    issue_add_8: string| number;
    issue_add_9: string| number;
    issue_add_10: string;
    out_Type: string|null;
   
}


import {  VilageData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";




const VillageEDitForm = (props: Props) => {
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

        if(DateRef.current) {
            DateRef.current.value = props.borma[0].date.slice(0,10)
        }

        if(dayOpRef.current) {
            dayOpRef.current.value = props.borma[0].noOfdayOperators.toString()
        }

        if(nightOpRef.current) {
            nightOpRef.current.value = props.borma[0].noOfnightOperators.toString()
        }


        const initialform = {
            id: props.borma[0].id,
            LotNo: props.borma[0].LotNo,
            alt_id:props.borma[0].altid,
            origin: props.borma[0].origin,
            mixingLot: props.borma[0].mixingLot,
            out_Type:props.borma[0].Remarks2,
           
            rcv_mayur: props.borma[0].rcv_mayur,
            rcv_rejection: props.borma[0].rcv_rejection,
            rcv_peeling: props.borma[0].rcv_peeling,
            rcv_wholes: props.borma[0].rcv_wholes,
            rcv_dpds: props.borma[0].rcv_dpds,
            rcv_lw: props.borma[0].rcv_lw,
            rcv_bigTaiho: props.borma[0].rcv_bigTaiho,
            rcv_sorting: props.borma[0].rcv_sorting,
            rcv_mayurN: props.borma[0].issue_add_11,
            rcv_peelingN: props.borma[0].issue_add_10,
            rcv_rejectionN:props.borma[0].issue_add_12,

            issue_packing: props.borma[0].issue_packing,
            issue_mayur: props.borma[0].issue_mayur,
            issue_hamsa: props.borma[0].issue_hamsa,
            issue_bigTaiho: props.borma[0].issue_bigTaiho,
            issue_rejection: props.borma[0].issue_rejection,
            issue_outside: props.borma[0].issue_outside,

            issue_add_1: props.borma[0].altid==1 ?props.borma[0].issue_add_1:props.borma[0].issue_add_10,
            issue_add_2:  props.borma[0].issue_add_2,
            issue_add_3:  props.borma[0].issue_add_3,
            issue_add_4:  props.borma[0].altid==1 ?props.borma[0].issue_add_4:props.borma[0].issue_add_11,
            issue_add_5:  props.borma[0].issue_add_5,
            issue_add_6:  props.borma[0].issue_add_6,
            issue_add_7:  props.borma[0].altid==1 ?props.borma[0].issue_add_7:props.borma[0].issue_add_12,
            issue_add_8:  props.borma[0].issue_add_8,
            issue_add_9:  props.borma[0].issue_add_9,
            issue_add_10:  props.borma[0].issue_add_10,
         
    
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
        const resStatus1 = await axios.post('/api/boiling/pendingLotCountOrigin', { lotNo: props.borma[0].LotNo,origin:props.borma[0].origin})
        console.log(resStatus1)
        if (resStatus1.data.scoopingLot[0].latest_section && resStatus1.data.scoopingLot[0].latest_section !=='Village') 
            {
            setErrortext(`Lot is Already Linked to ${resStatus1.data.scoopingLot[0].latest_section} Section`)
            if(errordialog){
                (errordialog as any).showModal()
            }
            
            return
        }
        if (props.borma[0].mixingLot && props.borma[0].mixingLot !='') 
            {
            setErrortext(`Edit can't be Done As Already Mixing is Performed`)
            if(errordialog){
                (errordialog as any).showModal()
            }
            
            return
        }
        setisdisable(true)
        props.borma.map((item: VilageData, idx: number) => {
            rows[idx].id=item.id
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
                const initialhumid = await axios.post('/api/villageout/updateVillage', { linehumid:formData,
                    LotNo:props.borma[0].LotNo
                 })
                console.log(initialhumid)         
                    setErrortext(initialhumid.data.message)
                    if (initialhumid.status === 201) {
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
            finally{
                setisdisable(false)
            }

                         
       
    }
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    // const handlemayurOpeningChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {

    //     if (Number(e.target.value) > (Number(rows[index].rcv_mayur))) {
    //         setErrortext('Mayur Borma Weight Cant be Higher Than Receiving !')
    //         if (errordialog != null) {
    //             (errordialog as any).showModal();
    //         }
    //         return
    //     }
    //     if (rows[0].issue_add_1) {
    //         rows[index].issue_add_2 = (Number(rows[index].rcv_mayur) - Number(e.target.value))
    //         rows[index].issue_add_3 = (Number(rows[index].issue_add_2) / Number(rows[index].rcv_mayur)) * 100
    //         rows[index].rcv_mayurN = (Number(rows[index].rcv_mayur) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString()
    //     }
    //     handleRowChange(index, 'issue_add_1', e.target.value)
    // }

    // const handlehamsaOpeningChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {

    //     if (Number(e.target.value) > (Number(rows[index].rcv_hamsa))) {
    //         setErrortext('Hamsa Borma Weight Cant be Higher Than Receiving !')
    //         if (errordialog != null) {
    //             (errordialog as any).showModal();
    //         }
    //         return
    //     }
    //     if (rows[0].issue_add_4) {
    //         rows[index].issue_add_5 = (Number(rows[index].rcv_hamsa) - Number(e.target.value))
    //         rows[index].issue_add_6 = (Number(rows[index].issue_add_5) / Number(rows[index].rcv_hamsa)) * 100
    //         rows[index].rcv_hamsaN = (Number(rows[index].rcv_hamsa) * ((100 - Number(rows[index].issue_add_6)) / 100)).toString()
    //     }
    //     handleRowChange(index, 'issue_add_4', e.target.value)
    // }


    return (
        <>
            <div className="px-5 py-2 overflow-auto">
                <form className='flex flex-col gap-1 pt-1' onSubmit={handleSubmit2}>
                    <div className="mx-8 flex flex-col gap-0.5">
                        {/* <div className="flex"><Label className="w-2/4 pt-1">Lot No</Label>
               <Input className="w-2/4 font-semibold text-center bg-yellow-100" placeholder="Date" value={props.scoop[0].LotNo} readOnly /> </div> */}
                        <div className="flex"><Label className="w-2/4 pt-1">Date of Entry</Label>
                            <Input className="w-2/4 justify-center" placeholder="Date" ref={DateRef} type="date" required /> </div>

                        <div className="flex"><Label className="w-2/4 pt-1">No. of Labour</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-2/4 text-center" placeholder="No. of Labour" ref={dayOpRef} />
                        </div>
                        <div className="flex"><Label className="w-2/4 pt-1">No. of Supervisor</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-2/4 text-center" placeholder="No. of Supervisor" ref={nightOpRef} />
                        </div>



                    </div>

                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl. No.</TableHead>
                            <TableHead className="text-center">Lot_No</TableHead>

                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Mixed_Lot</TableHead>



                            
                            <TableHead className="text-center">Rcv Peeling</TableHead>
                            {/* <TableHead className="text-center">Receive Mayur(Borma)</TableHead>
                            <TableHead className="text-center">Mayur Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Mayur Borma Loss(%)</TableHead> */}
                            <TableHead className="text-center">Rcv Mayur</TableHead>
                            {/* <TableHead className="text-center">Receive Hamsa(Borma)</TableHead>
                            <TableHead className="text-center">Hamsa Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Hamsa Borma Loss(%)</TableHead> */}
                             <TableHead className="text-center">Rcv Wholes </TableHead>
                            <TableHead className="text-center">Rcv LW </TableHead>
                            <TableHead className="text-center">Rcv Sorting </TableHead>
                            <TableHead className="text-center">Rcv DPDS </TableHead>
                            <TableHead className="text-center">Rcv BigTaiho </TableHead>
                            <TableHead className="text-center">Rcv Village </TableHead>

                            <TableHead className="text-center">Issue Packing</TableHead>
                            <TableHead className="text-center">Issue Village</TableHead>
                            <TableHead className="text-center">Issue Uncut Unscoop</TableHead>
                            <TableHead className="text-center">Issue Shell</TableHead>
                            <TableHead className="text-center">Issue CatelFeed</TableHead>



                          
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
                                rows.map((row: RejectionRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.mixingLot}</TableCell>
                                            {/* <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_mayur)} </TableCell> */}
                                            {/* <TableCell className="text-center"> <Input className='bg-blue-100' type="number"
                                                value={Number(row.issue_add_1.toString())} placeholder="Pr." onChange={(e) => handlemayurOpeningChange(idx, e)} required /></TableCell> */}
                                            
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.issue_add_1)} </TableCell>
                                            {/* <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_2.toString())} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_3.toString())} %</TableCell> */}
                                            
                                            {/* <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_hamsa)} </TableCell> */}
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.issue_add_4)} </TableCell>
                                            {/* <TableCell className="text-center"> <Input className='bg-blue-100' type="number"
                                                value={Number(row.issue_add_4.toString())} placeholder="Pr." onChange={(e) => handlehamsaOpeningChange(idx, e)} required /></TableCell> */}
                                            {/* <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_5.toString())} Kg</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_6.toString())} %</TableCell> */}
                                          
                                          <TableCell className="text-center font-semibold  text-green-500">{row.rcv_wholes ? formatNumber(row.rcv_wholes):0} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_lw)} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_sorting)} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_dpds)} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{formatNumber(row.rcv_bigTaiho)} </TableCell>
                                            <TableCell className="text-center font-semibold  text-green-500">{row.rcv_village ? formatNumber(row.rcv_village):0} </TableCell>

                                           
                                            <TableCell className="text-center">
                                                <Input className='bg-purple-100' type="number" value={row.issue_packing} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_packing', e.target.value)} required />
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Input className='bg-purple-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required />
                                                </TableCell>
                                        
                                            <TableCell className="text-center">
                                                <Input className='bg-purple-100' type="number" value={row.issue_uncut_unscoop} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_uncut_unscoop', e.target.value)} required />
                                            </TableCell>
                                                <TableCell className="text-center">
                                                <Input className='bg-purple-100' type="number" value={row.issue_shell} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_shell', e.target.value)} required />
                                            </TableCell>
                                         
                                                <TableCell className="text-center">
                                                <Input className='bg-purple-100' type="number" value={row.issue_catelfeed} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_catelfeed', e.target.value)} required />
                                            </TableCell>
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
export default VillageEDitForm;
