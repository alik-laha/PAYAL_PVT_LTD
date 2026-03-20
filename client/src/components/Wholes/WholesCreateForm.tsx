
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


interface WholesRowData {
    id: number;
    LotNo: string;
    origin: string;
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
    rcv_jb_mayur: string | number;
    rcv_jb_hamsa: string | number;
    issue_pw_150: number;
    issue_w_150: number;
    issue_ww_150: number;
    issue_s_150: number;
    issue_aw_150: number;
    issue_lw_150: number;
    issue_pw_180: number;
    issue_w_180: number;
    issue_ww_180: number;
    issue_s_180: number;
    issue_aw_180: number;
    issue_lw_180: number;
    issue_pw_210: number;
    issue_w_210: number;
    issue_ww_210: number;
    issue_s_210: number;
    issue_aw_210: number;
    issue_lw_210: number;
    issue_pw_240: number;
    issue_w_240: number;
    issue_ww_240: number;
    issue_ww_240_A: number;
    issue_aw_240: number;
    issue_lw_240: number;
    issue_pw_280: number;
    issue_w_280: number;
    issue_ww_280: number;
    issue_ww_280_A: number;
    issue_aw_280: number;
    issue_lw_280: number;
    wholes_double: number;
    issue_pw_320: number;
    issue_w_320: number;
    issue_ww_320: number;
    issue_ww_320_A: number;
    issue_aw_320: number;
    issue_lw_320: number;
    issue_pw_360: number;
    issue_w_360: number;
    issue_ww_360: number;
    issue_ww_360_A: number;
    issue_aw_360: number;
    issue_lw_360: number;
    issue_pw_400: number;
    issue_w_400: number;
    issue_ww_400: number;
    issue_ww_400_A: number;
    issue_aw_400: number;
    issue_lw_400: number;
    issue_jjb: number;
    issue_jjb1: number;

    issue_payal_240: number;
    issue_payal_400: number;
    issue_e_320_lot: number;
    issue_e_400_lot: number;
    issue_in_w_240: number;
    issue_in_w_320: number;
    issue_in_w_400: number;
    issue_a_150: number;
    issue_c_150: number;
    issue_e_150: number;
    issue_sw_150: number;
    issue_ssw_150: number;
    issue_k_150: number;
    issue_a_180: number;
    issue_c_180: number;
    issue_e_180: number;
    issue_sw_180: number;
    issue_ssw_180: number;
    issue_k_180: number;
    issue_a_210: number;
    issue_c_210: number;
    issue_e_210: number;
    issue_sw_210: number;
    issue_ssw_210: number;
    issue_k_210: number;
    issue_a_240: number;
    issue_c_240: number;
    issue_e_240: number;
    issue_sw_240: number;
    issue_ssw_240: number;
    issue_k_240: number;
    issue_a_280: number;
    issue_c_280: number;
    issue_e_280: number;
    issue_sw_280: number;
    issue_ssw_280: number;
    issue_k_280: number;
    issue_a_320: number;
    issue_c_320: number;
    issue_e_320: number;
    issue_sw_320: number;
    issue_ssw_320: number;
    issue_k_320: number;
    issue_a_360: number;
    issue_c_360: number;
    issue_e_360: number;
    issue_sw_360: number;
    issue_ssw_360: number;
    issue_k_360: number;
    issue_a_400: number;
    issue_c_400: number;
    issue_e_400: number;
    issue_sw_400: number;
    issue_ssw_400: number;
    issue_k_400: number;
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

    issue_rejection: number;
    issue_village: number;
    issue_bigTaiho: number;
    issue_lw: number;
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

    mixingLot: string | null;

}


import { WholesData } from "@/type/type"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useRef, useState } from "react"
import axios from "axios";




const WholesCreateForm = (props: Props) => {
    //console.log(props)
    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<WholesRowData[]>([])
    const [LotNo, setLotNo] = useState<string>('')
    const [vilLot, setVilLot] = useState<boolean>(false)
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
            setLotNo(props.borma[0].LotNo)
            if (props.borma[0].LotNo.includes('V')) {
                setVilLot(true)
            }
        }
        const initialform = props.borma.map((item: WholesData) => ({
            id: item.id,
            LotNo: item.LotNo,
            origin: item.origin,
            rcv_pw_210: item.rcv_pw_210||0,
            rcv_w_210: item.rcv_w_210||0,
            rcv_ww_210: item.rcv_ww_210||0,
            rcv_pw_240: item.rcv_pw_240||0,
            rcv_w_240: item.rcv_w_240||0,
            rcv_ww_240: item.rcv_ww_240||0,
            rcv_pw_280: item.rcv_pw_280||0,
            rcv_w_280: item.rcv_w_280||0,
            rcv_ww_280: item.rcv_ww_280||0,
            rcv_pw_320: item.rcv_pw_320||0,
            rcv_w_320: item.rcv_w_320||0,
            rcv_ww_320: item.rcv_ww_320||0,
            rcv_pw_360: item.rcv_pw_360||0,
            rcv_w_360: item.rcv_w_360||0,
            rcv_ww_360: item.rcv_ww_360||0,
            rcv_pw_400: item.rcv_pw_400||0,
            rcv_w_400: item.rcv_w_400||0,
            rcv_ww_400: item.rcv_ww_400||0,
            rcv_jb_mayur: item.rcv_jb_mayur||0,
            rcv_jb_hamsa: item.rcv_jb_hamsa||0,
            issue_pw_150: 0,
            issue_w_150: 0,
            issue_ww_150: 0,
            issue_s_150: 0,
            issue_aw_150: 0,
            issue_lw_150: 0,
            issue_pw_180: 0,
            issue_w_180: 0,
            issue_ww_180: 0,
            issue_s_180: 0,
            issue_aw_180: 0,
            issue_lw_180: 0,
            issue_pw_210: 0,
            issue_w_210: 0,
            issue_ww_210: 0,
            issue_s_210: 0,
            issue_aw_210: 0,
            issue_lw_210: 0,
            issue_pw_240: 0,
            issue_w_240: 0,
            issue_ww_240: 0,
            issue_ww_240_A: 0,
            issue_aw_240: 0,
            issue_lw_240: 0,
            issue_pw_280: 0,
            issue_w_280: 0,
            issue_ww_280: 0,
            issue_ww_280_A: 0,
            issue_aw_280: 0,
            issue_lw_280: 0,
            wholes_double: 0,
            issue_pw_320: 0,
            issue_w_320: 0,
            issue_ww_320: 0,
            issue_ww_320_A: 0,
            issue_aw_320: 0,
            issue_lw_320: 0,
            issue_pw_360: 0,
            issue_w_360: 0,
            issue_ww_360: 0,
            issue_ww_360_A: 0,
            issue_aw_360: 0,
            issue_lw_360: 0,
            issue_pw_400: 0,
            issue_w_400: 0,
            issue_ww_400: 0,
            issue_ww_400_A: 0,
            issue_aw_400: 0,
            issue_lw_400: 0,
            issue_jjb: 0,
            issue_jjb1: 0,

            issue_payal_240: 0,
            issue_payal_400: 0,
            issue_e_320_lot: 0,
            issue_e_400_lot: 0,
            issue_in_w_240: 0,
            issue_in_w_320: 0,
            issue_in_w_400: 0,
            issue_a_150: 0,
            issue_c_150: 0,
            issue_e_150: 0,
            issue_sw_150: 0,
            issue_ssw_150: 0,
            issue_k_150: 0,
            issue_a_180: 0,
            issue_c_180: 0,
            issue_e_180: 0,
            issue_sw_180: 0,
            issue_ssw_180: 0,
            issue_k_180: 0,
            issue_a_210: 0,
            issue_c_210: 0,
            issue_e_210: 0,
            issue_sw_210: 0,
            issue_ssw_210: 0,
            issue_k_210: 0,
            issue_a_240: 0,
            issue_c_240: 0,
            issue_e_240: 0,
            issue_sw_240: 0,
            issue_ssw_240: 0,
            issue_k_240: 0,
            issue_a_280: 0,
            issue_c_280: 0,
            issue_e_280: 0,
            issue_sw_280: 0,
            issue_ssw_280: 0,
            issue_k_280: 0,
            issue_a_320: 0,
            issue_c_320: 0,
            issue_e_320: 0,
            issue_sw_320: 0,
            issue_ssw_320: 0,
            issue_k_320: 0,
            issue_a_360: 0,
            issue_c_360: 0,
            issue_e_360: 0,
            issue_sw_360: 0,
            issue_ssw_360: 0,
            issue_k_360: 0,
            issue_a_400: 0,
            issue_c_400: 0,
            issue_e_400: 0,
            issue_sw_400: 0,
            issue_ssw_400: 0,
            issue_k_400: 0,
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

            issue_rejection: 0,
            issue_village: 0,
            issue_bigTaiho: 0,
            issue_lw: 0,
            issue_add_1: ((Number(item.rcv_pw_210)||0)
                + (Number(item.rcv_w_210)||0)
                + (Number(item.rcv_ww_210)||0)
                
                + (Number(item.rcv_pw_240)||0 )
                + (Number(item.rcv_w_240)||0)
                + (Number(item.rcv_ww_240)||0) + 
                
                (Number(item.rcv_pw_280)||0 )+
                (Number(item.rcv_w_280)||0 )+
                (Number(item.rcv_ww_280)||0 )+ 
                
                (Number(item.rcv_pw_320)||0 )+ 
                (Number(item.rcv_w_320)||0 )+
                (Number(item.rcv_ww_320)||0 )+ 
                
                (Number(item.rcv_pw_360)||0 )+ 
                (Number(item.rcv_w_360)||0 )+ 
                (Number(item.rcv_ww_360)||0 )+
                
                (Number(item.rcv_pw_400)||0 )+ 
                (Number(item.rcv_w_400)||0 )+ 
                (Number(item.rcv_ww_400)||0) + 
                (Number(item.rcv_jb_mayur)||0) +
                (Number(item.rcv_jb_hamsa)||0)),
            issue_add_2: '0',
            issue_add_3: '0',
            issue_add_4: 0,
            issue_add_5: 0,
            issue_add_6: 0,
            issue_add_7: 0,
            issue_add_8: 0,
            issue_add_9: 0,
            issue_add_10: 0,
            mixingLot: item.mixingLot
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
        props.borma.map((item: WholesData, idx: number) => {
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
            const initialhumid = await axios.post('/api/wholes/createEntireWholes', {
                linehumid: formData,
                LotNo: props.borma[0].LotNo, vilLot
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

        if (Number(e.target.value) > ((Number(props.borma[0].rcv_pw_210)||0) +
            (Number(props.borma[0].rcv_w_210)||0 )+
            (Number(props.borma[0].rcv_ww_210)||0 )+
            (Number(props.borma[0].rcv_pw_240)||0) +
            (Number(props.borma[0].rcv_w_240)||0 )+
            (Number(props.borma[0].rcv_ww_240)||0 )+
            (Number(props.borma[0].rcv_pw_280)||0) +
            (Number(props.borma[0].rcv_w_280)||0) +
            (Number(props.borma[0].rcv_ww_280)||0 )+
            (Number(props.borma[0].rcv_pw_320)||0) +
            (Number(props.borma[0].rcv_w_320)||0) +
            (Number(props.borma[0].rcv_ww_320)||0) +
            (Number(props.borma[0].rcv_pw_360)||0) +
            (Number(props.borma[0].rcv_w_360)||0) +
            (Number(props.borma[0].rcv_ww_360)||0) +
            (Number(props.borma[0].rcv_pw_400)||0) +
            (Number(props.borma[0].rcv_w_400)||0) +
            (Number(props.borma[0].rcv_ww_400)||0) +
            (Number(props.borma[0].rcv_jb_mayur)||0) +
    (Number(props.borma[0].rcv_jb_hamsa)||0))) {
            setErrortext('Borma Weight Cant be Higher Than Receiving !')
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
            return
        }
        if (rows[0].issue_add_1) {
            rows[index].issue_add_2 = (((Number(props.borma[0].rcv_pw_210)||0) +
                  (Number(props.borma[0].rcv_w_210)||0 )+
            (Number(props.borma[0].rcv_ww_210)||0 )+
            (Number(props.borma[0].rcv_pw_240)||0) +
            (Number(props.borma[0].rcv_w_240)||0 )+
            (Number(props.borma[0].rcv_ww_240)||0 )+
            (Number(props.borma[0].rcv_pw_280)||0) +
            (Number(props.borma[0].rcv_w_280)||0) +
            (Number(props.borma[0].rcv_ww_280)||0 )+
            (Number(props.borma[0].rcv_pw_320)||0) +
            (Number(props.borma[0].rcv_w_320)||0) +
            (Number(props.borma[0].rcv_ww_320)||0) +
            (Number(props.borma[0].rcv_pw_360)||0) +
            (Number(props.borma[0].rcv_w_360)||0) +
            (Number(props.borma[0].rcv_ww_360)||0) +
            (Number(props.borma[0].rcv_pw_400)||0) +
            (Number(props.borma[0].rcv_w_400)||0) +
            (Number(props.borma[0].rcv_ww_400)||0) +
            (Number(props.borma[0].rcv_jb_mayur)||0) +
                Number(props.borma[0].rcv_jb_hamsa)||0) - Number(e.target.value))

            rows[index].issue_add_3 = (Number(rows[index].issue_add_2) / ((Number(props.borma[0].rcv_pw_210)||0) +
              (Number(props.borma[0].rcv_w_210)||0 )+
            (Number(props.borma[0].rcv_ww_210)||0 )+
            (Number(props.borma[0].rcv_pw_240)||0) +
            (Number(props.borma[0].rcv_w_240)||0 )+
            (Number(props.borma[0].rcv_ww_240)||0 )+
            (Number(props.borma[0].rcv_pw_280)||0) +
            (Number(props.borma[0].rcv_w_280)||0) +
            (Number(props.borma[0].rcv_ww_280)||0 )+
            (Number(props.borma[0].rcv_pw_320)||0) +
            (Number(props.borma[0].rcv_w_320)||0) +
            (Number(props.borma[0].rcv_ww_320)||0) +
            (Number(props.borma[0].rcv_pw_360)||0) +
            (Number(props.borma[0].rcv_w_360)||0) +
            (Number(props.borma[0].rcv_ww_360)||0) +
            (Number(props.borma[0].rcv_pw_400)||0) +
            (Number(props.borma[0].rcv_w_400)||0) +
            (Number(props.borma[0].rcv_ww_400)||0) +
            (Number(props.borma[0].rcv_jb_mayur)||0) +
                Number(props.borma[0].rcv_jb_hamsa))) * 100
            rows[index].rcv_pw_210 = ((Number(props.borma[0].rcv_pw_210)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_w_210 = ((Number(props.borma[0].rcv_w_210)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_ww_210 = ((Number(props.borma[0].rcv_ww_210)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_pw_240 = ((Number(props.borma[0].rcv_pw_240)||0 )* ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_w_240 = ((Number(props.borma[0].rcv_w_240)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_ww_240 = ((Number(props.borma[0].rcv_ww_240)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_pw_280 = ((Number(props.borma[0].rcv_pw_280)||0 )* ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_w_280 = ((Number(props.borma[0].rcv_w_280)||0 )* ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_ww_280 = ((Number(props.borma[0].rcv_ww_280)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_pw_320 = ((Number(props.borma[0].rcv_pw_320)||0 )* ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_w_320 = ((Number(props.borma[0].rcv_w_320)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_ww_320 = ((Number(props.borma[0].rcv_ww_320)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_pw_360 = ((Number(props.borma[0].rcv_pw_360)||0 )* ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_w_360 = ((Number(props.borma[0].rcv_w_360)||0 )* ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_ww_360 = ((Number(props.borma[0].rcv_ww_360)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_pw_400 = ((Number(props.borma[0].rcv_pw_400)||0 )* ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_w_400 = ((Number(props.borma[0].rcv_w_400)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_ww_400 = ((Number(props.borma[0].rcv_ww_400)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_jb_mayur = ((Number(props.borma[0].rcv_jb_mayur)||0) * ((100 - Number(rows[index].issue_add_3)) / 100)).toString();
            rows[index].rcv_jb_hamsa = ((Number(props.borma[0].rcv_jb_hamsa)||0 )* ((100 - Number(rows[index].issue_add_3)) / 100)).toString();


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
                            <Input className="w-1/4 justify-center" placeholder="Date" ref={DateRef} type="date" required />
                            <Label className="w-1/4  text-end font-semibold ">Total Opening : </Label>
                                  <Label className="w-1/4 text-left ml-2 font-semibold text-red-500">{rows[0] ? rows[0].issue_add_1:0} Kg</Label> 
                         </div>

                        <div className="flex"><Label className="w-1/4 pt-1">No. of Labour</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Labour" ref={dayOpRef} />
                            <Label className="w-1/4 text-end font-semibold ">Total Issue : </Label>
                            <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {rows[0] ? (
                                    (
                                        Number(rows[0].issue_pw_150) +
                                        Number(rows[0].issue_w_150) +
                                        Number(rows[0].issue_ww_150) +
                                        Number(rows[0].issue_s_150) +
                                        Number(rows[0].issue_aw_150) +
                                        Number(rows[0].issue_lw_150) +
                                        Number(rows[0].issue_pw_180) +
                                        Number(rows[0].issue_w_180) +
                                        Number(rows[0].issue_ww_180) +
                                        Number(rows[0].issue_s_180) +
                                        Number(rows[0].issue_aw_180) +
                                        Number(rows[0].issue_lw_180) +
                                        Number(rows[0].issue_pw_210) +
                                        Number(rows[0].issue_w_210) +
                                        Number(rows[0].issue_ww_210) +
                                        Number(rows[0].issue_s_210) +
                                        Number(rows[0].issue_aw_210) +
                                        Number(rows[0].issue_lw_210) +
                                        Number(rows[0].issue_pw_240) +
                                        Number(rows[0].issue_w_240) +
                                        Number(rows[0].issue_ww_240) +
                                        Number(rows[0].issue_ww_240_A) +
                                        Number(rows[0].issue_aw_240) +
                                        Number(rows[0].issue_lw_240) +
                                        Number(rows[0].issue_pw_280) +
                                        Number(rows[0].issue_w_280) +
                                        Number(rows[0].issue_ww_280) +
                                        Number(rows[0].issue_ww_280_A) +
                                        Number(rows[0].issue_aw_280) +
                                        Number(rows[0].issue_lw_280) +
                                        Number(rows[0].wholes_double) +
                                        Number(rows[0].issue_pw_320) +
                                        Number(rows[0].issue_w_320) +
                                        Number(rows[0].issue_ww_320) +
                                        Number(rows[0].issue_ww_320_A) +
                                        Number(rows[0].issue_aw_320) +
                                        Number(rows[0].issue_lw_320) +
                                        Number(rows[0].issue_pw_360) +
                                        Number(rows[0].issue_w_360) +
                                        Number(rows[0].issue_ww_360) +
                                        Number(rows[0].issue_ww_360_A) +
                                        Number(rows[0].issue_aw_360) +
                                        Number(rows[0].issue_lw_360) +
                                        Number(rows[0].issue_pw_400) +
                                        Number(rows[0].issue_w_400) +
                                        Number(rows[0].issue_ww_400) +
                                        Number(rows[0].issue_ww_400_A) +
                                        Number(rows[0].issue_aw_400) +
                                        Number(rows[0].issue_lw_400) +
                                        Number(rows[0].issue_jjb) +
                                        Number(rows[0].issue_jjb1) +
                                        Number(rows[0].issue_payal_240) +
                                        Number(rows[0].issue_payal_400) +
                                        Number(rows[0].issue_e_320_lot) +
                                        Number(rows[0].issue_e_400_lot) +
                                        Number(rows[0].issue_in_w_240) +
                                        Number(rows[0].issue_in_w_320) +
                                        Number(rows[0].issue_in_w_400) +
                                        Number(rows[0].issue_a_150) +
                                        Number(rows[0].issue_c_150) +
                                        Number(rows[0].issue_e_150) +
                                        Number(rows[0].issue_sw_150) +
                                        Number(rows[0].issue_ssw_150) +
                                        Number(rows[0].issue_k_150) +
                                        Number(rows[0].issue_a_180) +
                                        Number(rows[0].issue_c_180) +
                                        Number(rows[0].issue_e_180) +
                                        Number(rows[0].issue_sw_180) +
                                        Number(rows[0].issue_ssw_180) +
                                        Number(rows[0].issue_k_180) +
                                        Number(rows[0].issue_a_210) +
                                        Number(rows[0].issue_c_210) +
                                        Number(rows[0].issue_e_210) +
                                        Number(rows[0].issue_sw_210) +
                                        Number(rows[0].issue_ssw_210) +
                                        Number(rows[0].issue_k_210) +
                                        Number(rows[0].issue_a_240) +
                                        Number(rows[0].issue_c_240) +
                                        Number(rows[0].issue_e_240) +
                                        Number(rows[0].issue_sw_240) +
                                        Number(rows[0].issue_ssw_240) +
                                        Number(rows[0].issue_k_240) +
                                        Number(rows[0].issue_a_280) +
                                        Number(rows[0].issue_c_280) +
                                        Number(rows[0].issue_e_280) +
                                        Number(rows[0].issue_sw_280) +
                                        Number(rows[0].issue_ssw_280) +
                                        Number(rows[0].issue_k_280) +
                                        Number(rows[0].issue_a_320) +
                                        Number(rows[0].issue_c_320) +
                                        Number(rows[0].issue_e_320) +
                                        Number(rows[0].issue_sw_320) +
                                        Number(rows[0].issue_ssw_320) +
                                        Number(rows[0].issue_k_320) +
                                        Number(rows[0].issue_a_360) +
                                        Number(rows[0].issue_c_360) +
                                        Number(rows[0].issue_e_360) +
                                        Number(rows[0].issue_sw_360) +
                                        Number(rows[0].issue_ssw_360) +
                                        Number(rows[0].issue_k_360) +
                                        Number(rows[0].issue_a_400) +
                                        Number(rows[0].issue_c_400) +
                                        Number(rows[0].issue_e_400) +
                                        Number(rows[0].issue_sw_400) +
                                        Number(rows[0].issue_ssw_400) +
                                        Number(rows[0].issue_k_400) +
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
                                        Number(rows[0].issue_rejection) +
                                        Number(rows[0].issue_village) +
                                        Number(rows[0].issue_bigTaiho) +
                                        Number(rows[0].issue_lw)
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                        </div>
                        <div className="flex"><Label className="w-1/4 pt-1">No. Of Supervisor</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Supervisor" ref={nightOpRef} />
                            <Label className="w-1/4 text-end font-semibold float-right ">Backlog : </Label>
                                                    <Label className="w-1/4 text-left font-semibold ml-2 text-red-500">
                                {rows[0] ? (
                                    (
                                        Number(rows[0].issue_add_1) -
                                        (
                                            Number(rows[0].issue_pw_150) +
                                            Number(rows[0].issue_w_150) +
                                            Number(rows[0].issue_ww_150) +
                                            Number(rows[0].issue_s_150) +
                                            Number(rows[0].issue_aw_150) +
                                            Number(rows[0].issue_lw_150) +
                                            Number(rows[0].issue_pw_180) +
                                            Number(rows[0].issue_w_180) +
                                            Number(rows[0].issue_ww_180) +
                                            Number(rows[0].issue_s_180) +
                                            Number(rows[0].issue_aw_180) +
                                            Number(rows[0].issue_lw_180) +
                                            Number(rows[0].issue_pw_210) +
                                            Number(rows[0].issue_w_210) +
                                            Number(rows[0].issue_ww_210) +
                                            Number(rows[0].issue_s_210) +
                                            Number(rows[0].issue_aw_210) +
                                            Number(rows[0].issue_lw_210) +
                                            Number(rows[0].issue_pw_240) +
                                            Number(rows[0].issue_w_240) +
                                            Number(rows[0].issue_ww_240) +
                                            Number(rows[0].issue_ww_240_A) +
                                            Number(rows[0].issue_aw_240) +
                                            Number(rows[0].issue_lw_240) +
                                            Number(rows[0].issue_pw_280) +
                                            Number(rows[0].issue_w_280) +
                                            Number(rows[0].issue_ww_280) +
                                            Number(rows[0].issue_ww_280_A) +
                                            Number(rows[0].issue_aw_280) +
                                            Number(rows[0].issue_lw_280) +
                                            Number(rows[0].wholes_double) +
                                            Number(rows[0].issue_pw_320) +
                                            Number(rows[0].issue_w_320) +
                                            Number(rows[0].issue_ww_320) +
                                            Number(rows[0].issue_ww_320_A) +
                                            Number(rows[0].issue_aw_320) +
                                            Number(rows[0].issue_lw_320) +
                                            Number(rows[0].issue_pw_360) +
                                            Number(rows[0].issue_w_360) +
                                            Number(rows[0].issue_ww_360) +
                                            Number(rows[0].issue_ww_360_A) +
                                            Number(rows[0].issue_aw_360) +
                                            Number(rows[0].issue_lw_360) +
                                            Number(rows[0].issue_pw_400) +
                                            Number(rows[0].issue_w_400) +
                                            Number(rows[0].issue_ww_400) +
                                            Number(rows[0].issue_ww_400_A) +
                                            Number(rows[0].issue_aw_400) +
                                            Number(rows[0].issue_lw_400) +
                                            Number(rows[0].issue_jjb) +
                                            Number(rows[0].issue_jjb1) +
                                            Number(rows[0].issue_payal_240) +
                                            Number(rows[0].issue_payal_400) +
                                            Number(rows[0].issue_e_320_lot) +
                                            Number(rows[0].issue_e_400_lot) +
                                            Number(rows[0].issue_in_w_240) +
                                            Number(rows[0].issue_in_w_320) +
                                            Number(rows[0].issue_in_w_400) +
                                            Number(rows[0].issue_a_150) +
                                            Number(rows[0].issue_c_150) +
                                            Number(rows[0].issue_e_150) +
                                            Number(rows[0].issue_sw_150) +
                                            Number(rows[0].issue_ssw_150) +
                                            Number(rows[0].issue_k_150) +
                                            Number(rows[0].issue_a_180) +
                                            Number(rows[0].issue_c_180) +
                                            Number(rows[0].issue_e_180) +
                                            Number(rows[0].issue_sw_180) +
                                            Number(rows[0].issue_ssw_180) +
                                            Number(rows[0].issue_k_180) +
                                            Number(rows[0].issue_a_210) +
                                            Number(rows[0].issue_c_210) +
                                            Number(rows[0].issue_e_210) +
                                            Number(rows[0].issue_sw_210) +
                                            Number(rows[0].issue_ssw_210) +
                                            Number(rows[0].issue_k_210) +
                                            Number(rows[0].issue_a_240) +
                                            Number(rows[0].issue_c_240) +
                                            Number(rows[0].issue_e_240) +
                                            Number(rows[0].issue_sw_240) +
                                            Number(rows[0].issue_ssw_240) +
                                            Number(rows[0].issue_k_240) +
                                            Number(rows[0].issue_a_280) +
                                            Number(rows[0].issue_c_280) +
                                            Number(rows[0].issue_e_280) +
                                            Number(rows[0].issue_sw_280) +
                                            Number(rows[0].issue_ssw_280) +
                                            Number(rows[0].issue_k_280) +
                                            Number(rows[0].issue_a_320) +
                                            Number(rows[0].issue_c_320) +
                                            Number(rows[0].issue_e_320) +
                                            Number(rows[0].issue_sw_320) +
                                            Number(rows[0].issue_ssw_320) +
                                            Number(rows[0].issue_k_320) +
                                            Number(rows[0].issue_a_360) +
                                            Number(rows[0].issue_c_360) +
                                            Number(rows[0].issue_e_360) +
                                            Number(rows[0].issue_sw_360) +
                                            Number(rows[0].issue_ssw_360) +
                                            Number(rows[0].issue_k_360) +
                                            Number(rows[0].issue_a_400) +
                                            Number(rows[0].issue_c_400) +
                                            Number(rows[0].issue_e_400) +
                                            Number(rows[0].issue_sw_400) +
                                            Number(rows[0].issue_ssw_400) +
                                            Number(rows[0].issue_k_400) +
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
                                            Number(rows[0].issue_rejection) +
                                            Number(rows[0].issue_village) +
                                            Number(rows[0].issue_bigTaiho) +
                                            Number(rows[0].issue_lw)
                                        )
                                    ).toFixed(2)
                                ) : 0} Kg
                            </Label>
                        </div>



                    </div>
                    <Label className="w-100 pt-2 text-center">General Information</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl⠀No</TableHead>
                            <TableHead className="text-center">Lot⠀No</TableHead>

                            <TableHead className="text-center">Origin</TableHead>
                            <TableHead className="text-center">Mixed⠀Lot</TableHead>


                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_PW_210 (Borma)' : 'Receive PW_210 (Borma)') : 'Receive PW_210 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_W_210 (Borma)' : 'Receive W_210 (Borma)') : 'Receive W_210 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_WW_210 (Borma)' : 'Receive WW_210 (Borma)') : 'Receive WW_210 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_PW_240 (Borma)' : 'Receive PW_240 (Borma)') : 'Receive PW_240 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_W_240 (Borma)' : 'Receive W_240 (Borma)') : 'Receive W_240 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_WW_240 (Borma)' : 'Receive WW_240 (Borma)') : 'Receive WW_240 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_PW_280 (Borma)' : 'Receive PW_280 (Borma)') : 'Receive PW_280 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_W_280 (Borma)' : 'Receive W_280 (Borma)') : 'Receive W_280 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_WW_280 (Borma)' : 'Receive WW_280 (Borma)') : 'Receive WW_280 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_PW_320 (Borma)' : 'Receive PW_320 (Borma)') : 'Receive PW_320 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_W_320 (Borma)' : 'Receive W_320 (Borma)') : 'Receive W_320 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_WW_320 (Borma)' : 'Receive WW_320 (Borma)') : 'Receive WW_320 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_PW_360 (Borma)' : 'Receive PW_360 (Borma)') : 'Receive PW_360 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_W_360 (Borma)' : 'Receive W_360 (Borma)') : 'Receive W_360 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_WW_360 (Borma)' : 'Receive WW_360 (Borma)') : 'Receive WW_360 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_PW_400 (Borma)' : 'Receive PW_400 (Borma)') : 'Receive PW_400 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_W_400 (Borma)' : 'Receive W_400 (Borma)') : 'Receive W_400 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">
                                {LotNo ? (LotNo.includes('V') ? 'Receive V_WW_400 (Borma)' : 'Receive WW_400 (Borma)') : 'Receive WW_400 (Borma)'}
                            </TableHead>
                            <TableHead className="text-center">Receive JB (Borma)</TableHead>
                            <TableHead className="text-center">Receive Hamsa (Borma)</TableHead>
                            <TableHead className="text-center">Receive Mayur (Borma)</TableHead>


                            <TableHead className="text-center">Total Receive</TableHead>
                            <TableHead className="text-center">Total Receive (Borma)</TableHead>
                            <TableHead className="text-center">Borma Loss(Kg)</TableHead>
                            <TableHead className="text-center">Borma Loss(%)</TableHead>



                            <TableHead className="text-center">Issue Rejection</TableHead>
                            <TableHead className="text-center">Issue Village</TableHead>
                            <TableHead className="text-center">Issue BigTaiho</TableHead>
                            <TableHead className="text-center">Issue LW</TableHead>

                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: WholesRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">
                                            <TableCell className="text-center">{idx + 1}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.LotNo}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.origin}</TableCell>
                                            <TableCell className="text-center font-semibold text-red-500">{row.mixingLot}</TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_pw_210))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_w_210))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_ww_210))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_pw_240))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_w_240))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_ww_240))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_pw_280))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_w_280))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_ww_280))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_pw_320))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_w_320))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_ww_320))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_pw_360))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_w_360))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_ww_360))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_pw_400))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_w_400))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_ww_400))} </TableCell>
                                            <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(String(row.rcv_jb_hamsa))} </TableCell>
                                            <TableCell className="text-center font-semibold text-green-600">
                                                {formatNumber((
                                                    parseFloat(String(row.rcv_pw_210)) +
                                                    parseFloat(String(row.rcv_w_210)) +
                                                    parseFloat(String(row.rcv_ww_210)) +
                                                    parseFloat(String(row.rcv_pw_240)) +
                                                    parseFloat(String(row.rcv_w_240)) +
                                                    parseFloat(String(row.rcv_ww_240)) +
                                                    parseFloat(String(row.rcv_pw_280)) +
                                                    parseFloat(String(row.rcv_w_280)) +
                                                    parseFloat(String(row.rcv_ww_280)) +
                                                    parseFloat(String(row.rcv_pw_320)) +
                                                    parseFloat(String(row.rcv_w_320)) +
                                                    parseFloat(String(row.rcv_ww_320)) +
                                                    parseFloat(String(row.rcv_pw_360)) +
                                                    parseFloat(String(row.rcv_w_360)) +
                                                    parseFloat(String(row.rcv_ww_360)) +
                                                    parseFloat(String(row.rcv_pw_400)) +
                                                    parseFloat(String(row.rcv_w_400)) +
                                                    parseFloat(String(row.rcv_ww_400)) +
                                                    parseFloat(String(row.rcv_jb_hamsa))

                                                ).toString())}
                                            </TableCell>

                                            <TableCell className="text-center font-semibold text-green-600">{formatNumber(String(row.rcv_jb_mayur))} </TableCell>

                                            <TableCell className="text-center font-semibold  text-green-700">
                                                {formatNumber((
                                                    parseFloat(String(props.borma[0].rcv_pw_210||0)) +
                                                    parseFloat(String(props.borma[0].rcv_w_210||0)) +
                                                    parseFloat(String(props.borma[0].rcv_ww_210||0)) +
                                                    parseFloat(String(props.borma[0].rcv_pw_240||0)) +
                                                    parseFloat(String(props.borma[0].rcv_w_240||0)) +
                                                    parseFloat(String(props.borma[0].rcv_ww_240||0)) +
                                                    parseFloat(String(props.borma[0].rcv_pw_280||0)) +
                                                    parseFloat(String(props.borma[0].rcv_w_280||0)) +
                                                    parseFloat(String(props.borma[0].rcv_ww_280||0)) +
                                                    parseFloat(String(props.borma[0].rcv_pw_320||0)) +
                                                    parseFloat(String(props.borma[0].rcv_w_320||0)) +
                                                    parseFloat(String(props.borma[0].rcv_ww_320||0)) +
                                                    parseFloat(String(props.borma[0].rcv_pw_360||0)) +
                                                    parseFloat(String(props.borma[0].rcv_w_360||0)) +
                                                    parseFloat(String(props.borma[0].rcv_ww_360||0)) +
                                                    parseFloat(String(props.borma[0].rcv_pw_400||0)) +
                                                    parseFloat(String(props.borma[0].rcv_w_400||0)) +
                                                    parseFloat(String(props.borma[0].rcv_ww_400||0)) +
                                                    parseFloat(String(props.borma[0].rcv_jb_mayur||0)) +
                                                    parseFloat(String(props.borma[0].rcv_jb_hamsa||0))
                                                ).toString())} kg
                                            </TableCell>

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
                    <Label className="w-100 pt-1 text-center">Lot Packing Grade</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                           {/* W */}
                            <TableHead className="text-center">W_150</TableHead>
                            <TableHead className="text-center">W_180</TableHead>
                            <TableHead className="text-center">W_210</TableHead>
                            <TableHead className="text-center">W_240</TableHead>
                            <TableHead className="text-center">W_280</TableHead>
                            <TableHead className="text-center">W_320</TableHead>
                            <TableHead className="text-center">W_360</TableHead>
                            <TableHead className="text-center">W_400</TableHead>

                            {/* WW */}
                            <TableHead className="text-center">WW_150</TableHead>
                            <TableHead className="text-center">WW_180</TableHead>
                            <TableHead className="text-center">WW_210</TableHead>
                            <TableHead className="text-center">WW_240</TableHead>
                            <TableHead className="text-center">WW_240_A</TableHead>
                            <TableHead className="text-center">WW_280</TableHead>
                            <TableHead className="text-center">WW_280_A</TableHead>
                            <TableHead className="text-center">WW_320</TableHead>
                            <TableHead className="text-center">WW_320_A</TableHead>
                            <TableHead className="text-center">WW_360</TableHead>
                            <TableHead className="text-center">WW_360_A</TableHead>
                            <TableHead className="text-center">WW_400</TableHead>
                            <TableHead className="text-center">WW_400_A</TableHead>

                            {/* AW */}
                            <TableHead className="text-center">AW_150</TableHead>
                            <TableHead className="text-center">AW_180</TableHead>
                            <TableHead className="text-center">AW_210</TableHead>
                            <TableHead className="text-center">AW_240</TableHead>
                            <TableHead className="text-center">AW_280</TableHead>
                            <TableHead className="text-center">AW_320</TableHead>
                            <TableHead className="text-center">AW_360</TableHead>
                            <TableHead className="text-center">AW_400</TableHead>

                            {/* LW */}
                            <TableHead className="text-center">LW_150</TableHead>
                            <TableHead className="text-center">LW_180</TableHead>
                            <TableHead className="text-center">LW_210</TableHead>
                            <TableHead className="text-center">LW_240</TableHead>
                            <TableHead className="text-center">LW_280</TableHead>
                            <TableHead className="text-center">LW_320</TableHead>
                            <TableHead className="text-center">LW_360</TableHead>
                            <TableHead className="text-center">LW_400</TableHead>

                            {/* PW */}
                            <TableHead className="text-center">PW_150</TableHead>
                            <TableHead className="text-center">PW_180</TableHead>
                            <TableHead className="text-center">PW_210</TableHead>
                            <TableHead className="text-center">PW_240</TableHead>
                            <TableHead className="text-center">PW_280</TableHead>
                            <TableHead className="text-center">PW_320</TableHead>
                            <TableHead className="text-center">PW_360</TableHead>
                            <TableHead className="text-center">PW_400</TableHead>

                            {/* S */}
                            <TableHead className="text-center">S_150</TableHead>
                            <TableHead className="text-center">S_180</TableHead>
                            <TableHead className="text-center">S_210</TableHead>

                            {/* Other Special Headers */}
                            <TableHead className="text-center">Wholes_Double</TableHead>
                            <TableHead className="text-center">JJB</TableHead>
                            <TableHead className="text-center">JJB1</TableHead>
                            <TableHead className="text-center">PAYAL_240</TableHead>
                            <TableHead className="text-center">PAYAL_400</TableHead>
                            <TableHead className="text-center">E_320_Lot</TableHead>
                            <TableHead className="text-center">E_400_Lot</TableHead>
                            <TableHead className="text-center">IN_W_240</TableHead>
                            <TableHead className="text-center">IN_W_320</TableHead>
                            <TableHead className="text-center">IN_W_400</TableHead>



                        </TableHeader>
                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: WholesRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">

                                           
{/* ===== W Grade ===== */}
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_w_150} onChange={(e) => handleRowChange(idx, 'issue_w_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_w_180} onChange={(e) => handleRowChange(idx, 'issue_w_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_w_210} onChange={(e) => handleRowChange(idx, 'issue_w_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_w_240} onChange={(e) => handleRowChange(idx, 'issue_w_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_w_280} onChange={(e) => handleRowChange(idx, 'issue_w_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_w_320} onChange={(e) => handleRowChange(idx, 'issue_w_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_w_360} onChange={(e) => handleRowChange(idx, 'issue_w_360', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_w_400} onChange={(e) => handleRowChange(idx, 'issue_w_400', e.target.value)} required /></TableCell>

{/* ===== WW Grade ===== */}
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_150} onChange={(e) => handleRowChange(idx, 'issue_ww_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_180} onChange={(e) => handleRowChange(idx, 'issue_ww_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_210} onChange={(e) => handleRowChange(idx, 'issue_ww_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_240} onChange={(e) => handleRowChange(idx, 'issue_ww_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_240_A} onChange={(e) => handleRowChange(idx, 'issue_ww_240_A', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_280} onChange={(e) => handleRowChange(idx, 'issue_ww_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_280_A} onChange={(e) => handleRowChange(idx, 'issue_ww_280_A', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_320} onChange={(e) => handleRowChange(idx, 'issue_ww_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_320_A} onChange={(e) => handleRowChange(idx, 'issue_ww_320_A', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_360} onChange={(e) => handleRowChange(idx, 'issue_ww_360', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_360_A} onChange={(e) => handleRowChange(idx, 'issue_ww_360_A', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_400} onChange={(e) => handleRowChange(idx, 'issue_ww_400', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ww_400_A} onChange={(e) => handleRowChange(idx, 'issue_ww_400_A', e.target.value)} required /></TableCell>

{/* ===== AW Grade ===== */}
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_aw_150} onChange={(e) => handleRowChange(idx, 'issue_aw_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_aw_180} onChange={(e) => handleRowChange(idx, 'issue_aw_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_aw_210} onChange={(e) => handleRowChange(idx, 'issue_aw_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_aw_240} onChange={(e) => handleRowChange(idx, 'issue_aw_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_aw_280} onChange={(e) => handleRowChange(idx, 'issue_aw_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_aw_320} onChange={(e) => handleRowChange(idx, 'issue_aw_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_aw_360} onChange={(e) => handleRowChange(idx, 'issue_aw_360', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_aw_400} onChange={(e) => handleRowChange(idx, 'issue_aw_400', e.target.value)} required /></TableCell>

{/* ===== LW Grade ===== */}
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_lw_150} onChange={(e) => handleRowChange(idx, 'issue_lw_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_lw_180} onChange={(e) => handleRowChange(idx, 'issue_lw_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_lw_210} onChange={(e) => handleRowChange(idx, 'issue_lw_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_lw_240} onChange={(e) => handleRowChange(idx, 'issue_lw_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_lw_280} onChange={(e) => handleRowChange(idx, 'issue_lw_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_lw_320} onChange={(e) => handleRowChange(idx, 'issue_lw_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_lw_360} onChange={(e) => handleRowChange(idx, 'issue_lw_360', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_lw_400} onChange={(e) => handleRowChange(idx, 'issue_lw_400', e.target.value)} required /></TableCell>

{/* ===== PW Grade ===== */}
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_pw_150} onChange={(e) => handleRowChange(idx, 'issue_pw_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_pw_180} onChange={(e) => handleRowChange(idx, 'issue_pw_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_pw_210} onChange={(e) => handleRowChange(idx, 'issue_pw_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_pw_240} onChange={(e) => handleRowChange(idx, 'issue_pw_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_pw_280} onChange={(e) => handleRowChange(idx, 'issue_pw_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_pw_320} onChange={(e) => handleRowChange(idx, 'issue_pw_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_pw_360} onChange={(e) => handleRowChange(idx, 'issue_pw_360', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_pw_400} onChange={(e) => handleRowChange(idx, 'issue_pw_400', e.target.value)} required /></TableCell>


{/* ===== S Grade ===== */}
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_s_150} onChange={(e) => handleRowChange(idx, 'issue_s_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_s_180} onChange={(e) => handleRowChange(idx, 'issue_s_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_s_210} onChange={(e) => handleRowChange(idx, 'issue_s_210', e.target.value)} required /></TableCell>

<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.wholes_double} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'wholes_double', e.target.value)} required /></TableCell>

<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_jjb} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jjb', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_jjb1} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_jjb1', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_payal_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_payal_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_payal_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_payal_400', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_e_320_lot} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_320_lot', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_e_400_lot} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_400_lot', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_in_w_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_in_w_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_in_w_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_in_w_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_in_w_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_in_w_400', e.target.value)} required /></TableCell> 

                                        </TableRow>
                                    );
                                })
                            ) : null}
                        </TableBody>
                    </Table>
                    <Label className="w-100 pt-1 text-center">Village Packing Grade</Label>
                    <Table className="mt-3">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            {/* A types */}
                            <TableHead className="text-center">A_150</TableHead>
                            <TableHead className="text-center">A_180</TableHead>
                            <TableHead className="text-center">A_210</TableHead>
                            <TableHead className="text-center">A_240</TableHead>
                            <TableHead className="text-center">A_280</TableHead>
                            <TableHead className="text-center">A_320</TableHead>
                            <TableHead className="text-center">A_360</TableHead>
                            <TableHead className="text-center">A_400</TableHead>

                            {/* C types */}
                            <TableHead className="text-center">C_150</TableHead>
                            <TableHead className="text-center">C_180</TableHead>
                            <TableHead className="text-center">C_210</TableHead>
                            <TableHead className="text-center">C_240</TableHead>
                            <TableHead className="text-center">C_280</TableHead>
                            <TableHead className="text-center">C_320</TableHead>
                            <TableHead className="text-center">C_360</TableHead>
                            <TableHead className="text-center">C_400</TableHead>

                            {/* E types */}
                            <TableHead className="text-center">E_150</TableHead>
                            <TableHead className="text-center">E_180</TableHead>
                            <TableHead className="text-center">E_210</TableHead>
                            <TableHead className="text-center">E_240</TableHead>
                            <TableHead className="text-center">E_280</TableHead>
                            <TableHead className="text-center">E_320</TableHead>
                            <TableHead className="text-center">E_360</TableHead>
                            <TableHead className="text-center">E_400</TableHead>

                            {/* SW types */}
                            <TableHead className="text-center">SW_150</TableHead>
                            <TableHead className="text-center">SW_180</TableHead>
                            <TableHead className="text-center">SW_210</TableHead>
                            <TableHead className="text-center">SW_240</TableHead>
                            <TableHead className="text-center">SW_280</TableHead>
                            <TableHead className="text-center">SW_320</TableHead>
                            <TableHead className="text-center">SW_360</TableHead>
                            <TableHead className="text-center">SW_400</TableHead>

                            {/* SSW types */}
                            <TableHead className="text-center">SSW_150</TableHead>
                            <TableHead className="text-center">SSW_180</TableHead>
                            <TableHead className="text-center">SSW_210</TableHead>
                            <TableHead className="text-center">SSW_240</TableHead>
                            <TableHead className="text-center">SSW_280</TableHead>
                            <TableHead className="text-center">SSW_320</TableHead>
                            <TableHead className="text-center">SSW_360</TableHead>
                            <TableHead className="text-center">SSW_400</TableHead>

                            {/* K types */}
                            <TableHead className="text-center">K_150</TableHead>
                            <TableHead className="text-center">K_180</TableHead>
                            <TableHead className="text-center">K_210</TableHead>
                            <TableHead className="text-center">K_240</TableHead>
                            <TableHead className="text-center">K_280</TableHead>
                            <TableHead className="text-center">K_320</TableHead>
                            <TableHead className="text-center">K_360</TableHead>
                            <TableHead className="text-center">K_400</TableHead>
                        </TableHeader>

                        <TableBody>
                            {props.borma.length > 0 ? (
                                rows.map((row: WholesRowData, idx: number) => {

                                    return (
                                        <TableRow key={idx} className="boiling-row-height-scoop">

                                            {/* Grade A */}
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_a_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_a_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_360', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_400', e.target.value)} required /></TableCell>

{/* Grade C */}
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_c_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_c_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_360', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_400', e.target.value)} required /></TableCell>

{/* Grade E */}
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_e_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_e_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_320', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_360', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_400', e.target.value)} required /></TableCell>
{/* Grade SW */}
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_280', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_320', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_360', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_400', e.target.value)} required />
</TableCell>

{/* Grade SSW */}
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_150', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_180', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_210', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_240', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_280', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_320', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_360', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_400', e.target.value)} required />
</TableCell>

{/* Grade K */}
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_150', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_180', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_210', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_240', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_280', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_320', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_360', e.target.value)} required />
</TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_400', e.target.value)} required />
</TableCell>


                                    {/* <TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_a_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_c_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_e_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_150', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_150} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_150', e.target.value)} required /></TableCell>

<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_a_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_c_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_e_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_sw_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_ssw_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_180', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className='bg-yellow-100' type="number" value={row.issue_k_180} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_180', e.target.value)} required /></TableCell>
                                           <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_sw_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ssw_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_210', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_k_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_210', e.target.value)} required /></TableCell>

<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_sw_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ssw_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_240', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_k_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_240', e.target.value)} required /></TableCell>

<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_280', e.target.value)} required /></TableCell>
<TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_280', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_sw_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_280', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ssw_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_280', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_k_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_280', e.target.value)} required /></TableCell>

                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_320', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_320', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_320', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_sw_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_320', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ssw_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_320', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_k_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_320', e.target.value)} required /></TableCell>

                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_360', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_360', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_360', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_sw_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_360', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ssw_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_360', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_k_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_360', e.target.value)} required /></TableCell>

                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_a_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_a_400', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_c_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_c_400', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_e_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_e_400', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_sw_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_sw_400', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_ssw_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_ssw_400', e.target.value)} required /></TableCell>
                                            <TableCell className="text-center"><Input className="bg-yellow-100" type="number" value={row.issue_k_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'issue_k_400', e.target.value)} required /></TableCell> */}



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
export default WholesCreateForm;
