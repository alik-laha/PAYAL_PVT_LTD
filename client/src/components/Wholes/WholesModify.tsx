
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
    borma: WholesData[]      
}


interface wholesRowData{
    
    id: number;
    LotNo: string;
    alt_id:number;
    origin: string;
    mixingLot:string|null;

    rcv_pw_210: string | number;
    rcv_w_210: string | number;
    rcv_ww_210: string | number;
    rcv_pw_240: string | number;
    rcv_w_240: string | number;
    rcv_ww_240: string | number;
    rcv_pw_280: string | number;
    rcv_w_280: string | number;
    rcv_ww_280: string | number;
    rcv_pw_320: string | number;
    rcv_w_320: string | number;
    rcv_ww_320: string | number;
    rcv_pw_360: string | number;
    rcv_w_360: string | number;
    rcv_ww_360: string | number;
    rcv_pw_400: string | number;
    rcv_w_400: string | number;
    rcv_ww_400: string | number;
    rcv_jb_mayur: string ;
    rcv_jb_hamsa: string ;


    issue_pw_150: string;
issue_w_150: string;
issue_ww_150: string;
issue_s_150: string;
issue_aw_150: string;
issue_lw_150: string;
issue_pw_180: string;
issue_w_180: string;
issue_ww_180: string;
issue_s_180: string;
issue_aw_180: string;
issue_lw_180: string;
issue_pw_210: string;
issue_w_210: string;
issue_ww_210: string;
issue_s_210: string;
issue_aw_210: string;
issue_lw_210: string;
issue_pw_240: string;
issue_w_240: string;
issue_ww_240: string;
issue_ww_240_A: string;
issue_aw_240: string;
issue_lw_240: string;
issue_pw_280: string;
issue_w_280: string;
issue_ww_280: string;
issue_ww_280_A: string;
issue_aw_280: string;
issue_lw_280: string;
wholes_double: string;
issue_pw_320: string;
issue_w_320: string;
issue_ww_320: string;
issue_ww_320_A: string;
issue_aw_320: string;
issue_lw_320: string;
issue_pw_360: string;
issue_w_360: string;
issue_ww_360: string;
issue_ww_360_A: string;
issue_aw_360: string;
issue_lw_360: string;
issue_pw_400: string;
issue_w_400: string;
issue_ww_400: string;
issue_ww_400_A: string;
issue_aw_400: string;
issue_lw_400: string;
issue_jjb: string;
issue_jjb1: string;
issue_rejection: string;
issue_village: string;
issue_bigTaiho: string;
issue_lw: string;
issue_add_1: string;
issue_add_2: string|number;
issue_add_3: string|number;
issue_add_4: string;
issue_add_5: string;
issue_add_6: string;
issue_add_7: string;
issue_add_8: string;
issue_add_9: string;
issue_add_10: string;
   
           
}


import {     WholesData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {   useEffect, useRef, useState } from "react"
import axios from "axios";



const WholesEditForm = (props:Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows,setRows]=useState<wholesRowData[]>([])
    // const [actualOpen,setActualopen]=useState<number>(0)
    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;
    const [isdisable,setisdisable]=useState<boolean>(false)


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

    // const handleOpeningChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {

    //     if (Number(e.target.value) > actualOpen) {
    //         setErrortext('Borma Weight Cant be Higher Than Receiving !')
    //         if (errordialog != null) {
    //             (errordialog as any).showModal();
    //         }
    //         return
    //     }
    //     if(rows[0].issue_add_1){
    //         rows[index].issue_add_2 = actualOpen - Number(e.target.value)

    //         rows[index].issue_add_3 = (Number(rows[index].issue_add_2) / actualOpen) * 100
    //         rows[index].rcv_pw_210 = (Number((Number(props.borma[0].rcv_pw_210) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_w_210 = (Number((Number(props.borma[0].rcv_w_210) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_ww_210 = (Number((Number(props.borma[0].rcv_ww_210) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_pw_240 = (Number((Number(props.borma[0].rcv_pw_240) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_w_240 = (Number((Number(props.borma[0].rcv_w_240) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_ww_240 = (Number((Number(props.borma[0].rcv_ww_240) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_pw_280 = (Number((Number(props.borma[0].rcv_pw_280) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_w_280 = (Number((Number(props.borma[0].rcv_w_280) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_ww_280 = (Number((Number(props.borma[0].rcv_ww_280) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_pw_320 = (Number((Number(props.borma[0].rcv_pw_320) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_w_320 = (Number((Number(props.borma[0].rcv_w_320) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_ww_320 = (Number((Number(props.borma[0].rcv_ww_320) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_pw_360 = (Number((Number(props.borma[0].rcv_pw_360) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_w_360 = (Number((Number(props.borma[0].rcv_w_360) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_ww_360 = (Number((Number(props.borma[0].rcv_ww_360) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_pw_400 = (Number((Number(props.borma[0].rcv_pw_400) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_w_400 = (Number((Number(props.borma[0].rcv_w_400) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_ww_400 = (Number((Number(props.borma[0].rcv_ww_400) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_jb_mayur = (Number((Number(props.borma[0].rcv_jb_mayur) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //         rows[index].rcv_jb_hamsa = (Number((Number(props.borma[0].rcv_jb_hamsa) * ((100 + Number(props.borma[0].issue_add_3)) / 100)).toString()) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
    //     }
    //     handleRowChange(index,'issue_add_1',e.target.value)
    // }
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
      
        const initialform =  {
            id: props.borma[0].id,
            LotNo: props.borma[0].LotNo,
            alt_id: props.borma[0].altid,
            origin: props.borma[0].origin,
            mixingLot: props.borma[0].mixingLot,

            rcv_pw_210: props.borma[0].rcv_pw_210,
            rcv_w_210: props.borma[0].rcv_w_210,
            rcv_ww_210: props.borma[0].rcv_ww_210,
            rcv_pw_240: props.borma[0].rcv_pw_240,
            rcv_w_240: props.borma[0].rcv_w_240,
            rcv_ww_240: props.borma[0].rcv_ww_240,
            rcv_pw_280: props.borma[0].rcv_pw_280,
            rcv_w_280: props.borma[0].rcv_w_280,
            rcv_ww_280: props.borma[0].rcv_ww_280,
            rcv_pw_320: props.borma[0].rcv_pw_320,
            rcv_w_320: props.borma[0].rcv_w_320,
            rcv_ww_320: props.borma[0].rcv_ww_320,
            rcv_pw_360: props.borma[0].rcv_pw_360,
            rcv_w_360: props.borma[0].rcv_w_360,
            rcv_ww_360: props.borma[0].rcv_ww_360,
            rcv_pw_400: props.borma[0].rcv_pw_400,
            rcv_w_400: props.borma[0].rcv_w_400,
            rcv_ww_400: props.borma[0].rcv_ww_400,
            rcv_jb_mayur: props.borma[0].rcv_jb_mayur,
            rcv_jb_hamsa: props.borma[0].rcv_jb_hamsa,
            issue_pw_150: props.borma[0].issue_pw_150,
            issue_w_150: props.borma[0].issue_w_150,
            issue_ww_150: props.borma[0].issue_ww_150,
            issue_s_150: props.borma[0].issue_s_150,
            issue_aw_150: props.borma[0].issue_aw_150,
            issue_lw_150: props.borma[0].issue_lw_150,
            issue_pw_180: props.borma[0].issue_pw_180,
            issue_w_180: props.borma[0].issue_w_180,
            issue_ww_180: props.borma[0].issue_ww_180,
            issue_s_180: props.borma[0].issue_s_180,
            issue_aw_180: props.borma[0].issue_aw_180,
            issue_lw_180: props.borma[0].issue_lw_180,
            issue_pw_210: props.borma[0].issue_pw_210,
            issue_w_210: props.borma[0].issue_w_210,
            issue_ww_210: props.borma[0].issue_ww_210,
            issue_s_210: props.borma[0].issue_s_210,
            issue_aw_210: props.borma[0].issue_aw_210,
            issue_lw_210: props.borma[0].issue_lw_210,
            issue_pw_240: props.borma[0].issue_pw_240,
            issue_w_240: props.borma[0].issue_w_240,
            issue_ww_240: props.borma[0].issue_ww_240,
            issue_ww_240_A: props.borma[0].issue_ww_240_A,
            issue_aw_240: props.borma[0].issue_aw_240,
            issue_lw_240: props.borma[0].issue_lw_240,
            issue_pw_280: props.borma[0].issue_pw_280,
            issue_w_280: props.borma[0].issue_w_280,
            issue_ww_280: props.borma[0].issue_ww_280,
            issue_ww_280_A: props.borma[0].issue_ww_280_A,
            issue_aw_280: props.borma[0].issue_aw_280,
            issue_lw_280: props.borma[0].issue_lw_280,
            wholes_double: props.borma[0].wholes_double,
            issue_pw_320: props.borma[0].issue_pw_320,
            issue_w_320: props.borma[0].issue_w_320,
            issue_ww_320: props.borma[0].issue_ww_320,
            issue_ww_320_A: props.borma[0].issue_ww_320_A,
            issue_aw_320: props.borma[0].issue_aw_320,
            issue_lw_320: props.borma[0].issue_lw_320,
            issue_pw_360: props.borma[0].issue_pw_360,
            issue_w_360: props.borma[0].issue_w_360,
            issue_ww_360: props.borma[0].issue_ww_360,
            issue_ww_360_A: props.borma[0].issue_ww_360_A,
            issue_aw_360: props.borma[0].issue_aw_360,
            issue_lw_360: props.borma[0].issue_lw_360,
            issue_pw_400: props.borma[0].issue_pw_400,
            issue_w_400: props.borma[0].issue_w_400,
            issue_ww_400: props.borma[0].issue_ww_400,
            issue_ww_400_A: props.borma[0].issue_ww_400_A,
            issue_aw_400: props.borma[0].issue_aw_400,
            issue_lw_400: props.borma[0].issue_lw_400,
            issue_jjb: props.borma[0].issue_jjb,
            issue_jjb1: props.borma[0].issue_jjb1,
            issue_rejection: props.borma[0].issue_rejection,
            issue_village: props.borma[0].issue_village,
            issue_bigTaiho: props.borma[0].issue_bigTaiho,
            issue_lw: props.borma[0].issue_lw,
            issue_add_1: props.borma[0].issue_add_1,
            issue_add_2: props.borma[0].issue_add_2,
            issue_add_3: props.borma[0].issue_add_3,
            issue_add_4: props.borma[0].issue_add_4,
            issue_add_5: props.borma[0].issue_add_5,
            issue_add_6: props.borma[0].issue_add_6,
            issue_add_7: props.borma[0].issue_add_7,
            issue_add_8: props.borma[0].issue_add_8,
            issue_add_9: props.borma[0].issue_add_9,
            issue_add_10: props.borma[0].issue_add_10
        };

        
        //console.log(initialform)
        setRows([initialform])
        // setActualopen(parseFloat(props.borma[0].current_backlog)+( parseFloat(props.borma[0].issue_pw_150) +
        // parseFloat(props.borma[0].issue_w_150) +
        // parseFloat(props.borma[0].issue_ww_150) +
        // parseFloat(props.borma[0].issue_s_150) +
        // parseFloat(props.borma[0].issue_aw_150) +
        // parseFloat(props.borma[0].issue_lw_150) +
        // parseFloat(props.borma[0].issue_pw_180) +
        // parseFloat(props.borma[0].issue_w_180) +
        // parseFloat(props.borma[0].issue_ww_180) +
        // parseFloat(props.borma[0].issue_s_180) +
        // parseFloat(props.borma[0].issue_aw_180) +
        // parseFloat(props.borma[0].issue_lw_180) +
        // parseFloat(props.borma[0].issue_pw_210) +
        // parseFloat(props.borma[0].issue_w_210) +
        // parseFloat(props.borma[0].issue_ww_210) +
        // parseFloat(props.borma[0].issue_s_210) +
        // parseFloat(props.borma[0].issue_aw_210) +
        // parseFloat(props.borma[0].issue_lw_210) +
        // parseFloat(props.borma[0].issue_pw_240) +
        // parseFloat(props.borma[0].issue_w_240) +
        // parseFloat(props.borma[0].issue_ww_240) +
        // parseFloat(props.borma[0].issue_ww_240_A) +
        // parseFloat(props.borma[0].issue_aw_240) +
        // parseFloat(props.borma[0].issue_lw_240) +
        // parseFloat(props.borma[0].issue_pw_280) +
        // parseFloat(props.borma[0].issue_w_280) +
        // parseFloat(props.borma[0].issue_ww_280) +
        // parseFloat(props.borma[0].issue_ww_280_A) +
        // parseFloat(props.borma[0].issue_aw_280) +
        // parseFloat(props.borma[0].issue_lw_280) +
        // parseFloat(props.borma[0].wholes_double) +
        // parseFloat(props.borma[0].issue_pw_320) +
        // parseFloat(props.borma[0].issue_w_320) +
        // parseFloat(props.borma[0].issue_ww_320) +
        // parseFloat(props.borma[0].issue_ww_320_A) +
        // parseFloat(props.borma[0].issue_aw_320) +
        // parseFloat(props.borma[0].issue_lw_320) +
        // parseFloat(props.borma[0].issue_pw_360) +
        // parseFloat(props.borma[0].issue_w_360) +
        // parseFloat(props.borma[0].issue_ww_360) +
        // parseFloat(props.borma[0].issue_ww_360_A) +
        // parseFloat(props.borma[0].issue_aw_360) +
        // parseFloat(props.borma[0].issue_lw_360) +
        // parseFloat(props.borma[0].issue_pw_400) +
        // parseFloat(props.borma[0].issue_w_400) +
        // parseFloat(props.borma[0].issue_ww_400) +
        // parseFloat(props.borma[0].issue_ww_400_A) +
        // parseFloat(props.borma[0].issue_aw_400) +
        // parseFloat(props.borma[0].issue_lw_400) +
        // parseFloat(props.borma[0].issue_jjb) +
        // parseFloat(props.borma[0].issue_jjb1)+
        // parseFloat(props.borma[0].issue_add_2)+
        // parseFloat(props.borma[0].issue_rejection) +
        // parseFloat(props.borma[0].issue_village) +
        // parseFloat(props.borma[0].issue_bigTaiho) +
        // parseFloat(props.borma[0].issue_lw) ))
           
           //console.log(props.borma[0])
      
        //console.log(rows)
    }, [props.borma]); 

    const [errortext, setErrortext] = useState('')
    const handleRowChange = (index:number,field:string,fieldvalue:string|number) => {
        const newRows=[...rows];
        newRows[index]={...newRows[index],[field]:fieldvalue};
        setRows(newRows)
        //console.log(rows)
    }
    const handleSubmit2 = async (e: React.FormEvent) => {
        e.preventDefault()
        const resStatus1 = await axios.post('/api/boiling/pendingLotCountOrigin', { lotNo: props.borma[0].LotNo,origin:props.borma[0].origin})
        console.log(resStatus1)
        if (resStatus1.data.scoopingLot[0].latest_section && resStatus1.data.scoopingLot[0].latest_section !=='Wholes') 
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
        props.borma.map((item: WholesData, idx: number) => {
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
                const initialhumid = await axios.post('/api/wholes/updateWholes', { linehumid:formData,
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
                                    <div className="flex"><Label className="w-2/4 pt-1">No. Of Supervisor</Label>
                                {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                                <Input className="w-2/4 text-center" placeholder="No. of Supervisor" ref={nightOpRef}  />
                                 </div>
            
            
            
                                </div>
            
                                <Table className="mt-3">
                                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                                        <TableHead className="text-center">Sl. No.</TableHead>
                                        <TableHead className="text-center">Lot_No</TableHead>
            
                                        <TableHead className="text-center">Origin</TableHead>
                                        <TableHead className="text-center">Mixed_Lot</TableHead>
            
            
                                        {/* <TableHead className="text-center">Receive PW_210 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive W_210 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive WW_210 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive PW_240 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive W_240 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive WW_240 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive PW_280 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive W_280 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive WW_280 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive PW_320 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive W_320 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive WW_320 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive PW_360 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive W_360 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive WW_360 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive PW_400 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive W_400 (Borma)</TableHead>
                                        <TableHead className="text-center">Receive WW_400 (Borma)</TableHead> */}
                                        <TableHead className="text-center">Receive Hamsa (Borma)</TableHead>
                                        <TableHead className="text-center">Receive Mayur (Borma)</TableHead>
                                     
                                        
                                        {/* <TableHead className="text-center">Total Receive</TableHead>
                                        <TableHead className="text-center">Total Receive (Borma)</TableHead> */}
                                        {/* <TableHead className="text-center">Borma Loss(Kg)</TableHead>
                                        <TableHead className="text-center">Borma Loss(%)</TableHead> */}
            
            
                                        <TableHead className="text-center">PW_150</TableHead>
                                        <TableHead className="text-center">W_150</TableHead>
                                        <TableHead className="text-center">WW_150</TableHead>
                                        <TableHead className="text-center">S_150</TableHead>
                                        <TableHead className="text-center">AW_150</TableHead>
                                        <TableHead className="text-center">LW_150</TableHead>
                                        <TableHead className="text-center">PW_180</TableHead>
                                        <TableHead className="text-center">W_180</TableHead>
                                        <TableHead className="text-center">WW_180</TableHead>
                                        <TableHead className="text-center">S_180</TableHead>
                                        <TableHead className="text-center">AW_180</TableHead>
                                        <TableHead className="text-center">LW_180</TableHead>
                                        <TableHead className="text-center">PW_210</TableHead>
                                        <TableHead className="text-center">W_210</TableHead>
                                        <TableHead className="text-center">WW_210</TableHead>
                                        <TableHead className="text-center">S_210</TableHead>
                                        <TableHead className="text-center">AW_210</TableHead>
                                        <TableHead className="text-center">LW_210</TableHead>
                                        <TableHead className="text-center">PW_240</TableHead>
                                        <TableHead className="text-center">W_240</TableHead>
                                        <TableHead className="text-center">WW_240</TableHead>
                                        <TableHead className="text-center">WW_240_A</TableHead>
                                        <TableHead className="text-center">AW_240</TableHead>
                                        <TableHead className="text-center">LW_240</TableHead>
                                        <TableHead className="text-center">PW_280</TableHead>
                                        <TableHead className="text-center">W_280</TableHead>
                                        <TableHead className="text-center">WW_280</TableHead>
                                        <TableHead className="text-center">WW_280_A</TableHead>
                                        <TableHead className="text-center">AW_280</TableHead>
                                        <TableHead className="text-center">LW_280</TableHead>
                                        <TableHead className="text-center">Wholes_Double</TableHead>
                                        <TableHead className="text-center">PW_320</TableHead>
                                        <TableHead className="text-center">W_320</TableHead>
                                        <TableHead className="text-center">WW_320</TableHead>
                                        <TableHead className="text-center">WW_320_A</TableHead>
                                        <TableHead className="text-center">AW_320</TableHead>
                                        <TableHead className="text-center">LW_320</TableHead>
                                        <TableHead className="text-center">PW_360</TableHead>
                                        <TableHead className="text-center">W_360</TableHead>
                                        <TableHead className="text-center">WW_360</TableHead>
                                        <TableHead className="text-center">WW_360_A</TableHead>
                                        <TableHead className="text-center">AW_360</TableHead>
                                        <TableHead className="text-center">LW_360</TableHead>
                                        <TableHead className="text-center">PW_400</TableHead>
                                        <TableHead className="text-center">W_400</TableHead>
                                        <TableHead className="text-center">WW_400</TableHead>
                                        <TableHead className="text-center">WW_400_A</TableHead>
                                        <TableHead className="text-center">AW_400</TableHead>
                                        <TableHead className="text-center">LW_400</TableHead>
                                        <TableHead className="text-center">JJB</TableHead>
                                        <TableHead className="text-center">JJB1</TableHead>
                                        <TableHead className="text-center">Rejection</TableHead>
                                        <TableHead className="text-center">Village</TableHead>
                                        <TableHead className="text-center">BigTaiho</TableHead>
                                        <TableHead className="text-center">LW</TableHead>
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
            
                                        {/* <TableHead className="text-center">Mixed Amount</TableHead> */}
            
                                    </TableHeader>
                                    <TableBody>
                                        {props.borma.length > 0 ? (
                                            rows.map((row: wholesRowData, idx: number) => {
            
                                                return (
                                                    <TableRow key={idx} className="boiling-row-height-scoop">
                                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                                        <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                                        <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                                        <TableCell className="text-center font-semibold text-red-500">{row.mixingLot}</TableCell>
                                                        {/* <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_pw_210))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_w_210))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_ww_210))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_pw_240))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_w_240))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_ww_240))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_pw_280))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_w_280))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_ww_280))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_pw_320))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_w_320))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_ww_320))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_pw_360))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_w_360))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_ww_360))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_pw_400))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_w_400))} </TableCell>
                                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(String(row.rcv_ww_400))} </TableCell> */}
                                                       
                                                        <TableCell className="text-center font-semibold  text-green-600">{formatNumber(String(parseFloat(row.issue_add_1)-parseFloat(row.rcv_jb_mayur)))} </TableCell>
                                                        <TableCell className="text-center font-semibold text-green-600">{formatNumber(String(row.rcv_jb_mayur))} </TableCell>
                                                        {/* <TableCell className="text-center font-semibold  text-green-600">
                                                            {formatNumber(row.issue_add_1.toString() )} kg
                                               
                                           
                                                        </TableCell>
                                                        <TableCell className="text-center font-semibold  text-green-600">
                                                            {formatNumber(actualOpen.toString() )} kg
                                               
                                           
                                                        </TableCell> */}
            
                                                        {/* <TableCell className="text-center"> <Input className='bg-blue-100' type="number"
                                                            value={formatNumber(row.issue_add_1.toString())} step='0.01' placeholder="Pr." onChange={(e) => handleOpeningChange(idx, e)} required /></TableCell> */}
                                                        {/* <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_2.toString())} Kg</TableCell>
                                                        <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_3.toString())} %</TableCell> */}
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_pw_150}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_pw_150', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_w_150}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_w_150', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_150}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_150', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_s_150}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_s_150', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_aw_150}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_aw_150', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_lw_150}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_lw_150', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_pw_180}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_pw_180', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_w_180}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_w_180', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_180}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_180', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_s_180}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_s_180', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_aw_180}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_aw_180', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_lw_180}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_lw_180', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_pw_210}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_pw_210', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_w_210}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_w_210', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_210}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_210', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_s_210}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_s_210', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_aw_210}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_aw_210', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_lw_210}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_lw_210', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_pw_240}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_pw_240', e.target.value)}
                                                                required
                                                            />
            
                                                        </TableCell>
                                                        <TableCell className="text-center"> 
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_w_240}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_w_240', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_240}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_240', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_240_A}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_240_A', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_aw_240}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_aw_240', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_lw_240}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_lw_240', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
            
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_pw_280}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_pw_280', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_w_280}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_w_280', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_280}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_280', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_280_A}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_280_A', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_aw_280}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_aw_280', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_lw_280}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_lw_280', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
            
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.wholes_double}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'wholes_double', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_pw_320}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_pw_320', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_w_320}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_w_320', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_320}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_320', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_320_A}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_320_A', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_aw_320}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_aw_320', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_lw_320}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_lw_320', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
            
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_pw_360}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_pw_360', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_w_360}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_w_360', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_360}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_360', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_360_A}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_360_A', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_aw_360}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_aw_360', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_lw_360}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_lw_360', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_pw_400}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_pw_400', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_w_400}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_w_400', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_400}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_400', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_ww_400_A}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_ww_400_A', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_aw_400}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_aw_400', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_lw_400}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_lw_400', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_jjb}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_jjb', e.target.value)}
                                                                required
                                                            />
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Input className='bg-purple-100'
                                                                type="number"
                                                                value={row.issue_jjb1}
                                                                placeholder="Pr."
                                                                onChange={(e) => handleRowChange(idx, 'issue_jjb1', e.target.value)}
                                                                required
                                                            />
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
                                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_rejection} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_rejection', e.target.value)} required /></TableCell>
                                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_village} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_village', e.target.value)} required /></TableCell>
                                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_bigTaiho} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_bigTaiho', e.target.value)} required /></TableCell>
            
                                                        <TableCell className="text-center"> <Input className='bg-yellow-100' type="number" value={row.issue_lw} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_lw', e.target.value)} required /></TableCell>
                                                       
            
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
export default WholesEditForm;
