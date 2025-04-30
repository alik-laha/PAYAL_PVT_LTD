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
import { WholesData } from "@/type/type";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

interface Props {
    borma: WholesData[]
}

interface WholesRowData {
    id: number;
    LotNo: string;
    origin: string;
    alt_id: number;
    rcv_opening:string;
    rcv_pw_210: number;
    rcv_w_210: number;
    rcv_ww_210: number;
    rcv_pw_240: number;
    rcv_w_240: number;
    rcv_ww_240: number;
    rcv_pw_280: number;
    rcv_w_280: number;
    rcv_ww_280: number;
    rcv_pw_320: number;
    rcv_w_320: number;
    rcv_ww_320: number;
    rcv_pw_360: number;
    rcv_w_360: number;
    rcv_ww_360: number;
    rcv_pw_400: number;
    rcv_w_400: number;
    rcv_ww_400: number;
    rcv_jb_mayur: number;
    rcv_jb_hamsa: number;

    rcv_pw_210n: number;
    rcv_w_210n: number;
    rcv_ww_210n: number;
    rcv_pw_240n: number;
    rcv_w_240n: number;
    rcv_ww_240n: number;
    rcv_pw_280n: number;
    rcv_w_280n: number;
    rcv_ww_280n: number;
    rcv_pw_320n: number;
    rcv_w_320n: number;
    rcv_ww_320n: number;
    rcv_pw_360n: number;
    rcv_w_360n: number;
    rcv_ww_360n: number;
    rcv_pw_400n: number;
    rcv_w_400n: number;
    rcv_ww_400n: number;
    rcv_jb_mayurn: number;
    rcv_jb_hamsan: number;


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

const RCNWholesReCreateForm = (props: Props) => {

    const DateRef = useRef<HTMLInputElement>(null);
    const dayOpRef = useRef<HTMLInputElement>(null);
    const nightOpRef = useRef<HTMLInputElement>(null);
    const [rows, setRows] = useState<WholesRowData[]>([])
    const [LotNo, setLotNo] = useState<string>('')



    const successdialog = document.getElementById('successemployeedialog') as HTMLInputElement;
    const errordialog = document.getElementById('erroremployeedialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('empcloseDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorempcloseDialog') as HTMLInputElement;
    const [isdisable, setisdisable] = useState<boolean>(false)
     const [errortext, setErrortext] = useState('')
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

        if(props.borma[0]){
            setLotNo(props.borma[0].LotNo)
           
        }
         
        const initialform =  {
            id: props.borma[0].id,
            LotNo: props.borma[0].LotNo,
            alt_id: props.borma[0].altid,
            origin: props.borma[0].origin,
            mixingLot: props.borma[0].mixingLot,
            rcv_opening:props.borma[0].current_backlog,
            rcv_pw_210: 0,
            rcv_w_210: 0,
            rcv_ww_210: 0,
            rcv_pw_240: 0,
            rcv_w_240: 0,
            rcv_ww_240: 0,
            rcv_pw_280: 0,
            rcv_w_280: 0,
            rcv_ww_280: 0,
            rcv_pw_320: 0,
            rcv_w_320: 0,
            rcv_ww_320: 0,
            rcv_pw_360: 0,
            rcv_w_360: 0,
            rcv_ww_360: 0,
            rcv_pw_400: 0,
            rcv_w_400: 0,
            rcv_ww_400: 0,
            rcv_jb_mayur: 0,
            rcv_jb_hamsa: 0,


            rcv_pw_210n: 0,
            rcv_w_210n: 0,
            rcv_ww_210n: 0,
            rcv_pw_240n: 0,
            rcv_w_240n: 0,
            rcv_ww_240n: 0,
            rcv_pw_280n: 0,
            rcv_w_280n: 0,
            rcv_ww_280n: 0,
            rcv_pw_320n: 0,
            rcv_w_320n: 0,
            rcv_ww_320n: 0,
            rcv_pw_360n: 0,
            rcv_w_360n: 0,
            rcv_ww_360n: 0,
            rcv_pw_400n: 0,
            rcv_w_400n: 0,
            rcv_ww_400n: 0,
            rcv_jb_mayurn: 0,
            rcv_jb_hamsan: 0,


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

    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }

        useEffect(() => { 
    
            if(rows[0]){
                rows[0].rcv_pw_210n = ((rows[0].rcv_pw_210 ? Number(rows[0].rcv_pw_210) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_w_210n = ((rows[0].rcv_w_210 ? Number(rows[0].rcv_w_210) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_ww_210n = ((rows[0].rcv_ww_210 ? Number(rows[0].rcv_ww_210) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_pw_240n = ((rows[0].rcv_pw_240 ? Number(rows[0].rcv_pw_240) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_w_240n = ((rows[0].rcv_w_240 ? Number(rows[0].rcv_w_240) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_ww_240n = ((rows[0].rcv_ww_240 ? Number(rows[0].rcv_ww_240) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_pw_280n = ((rows[0].rcv_pw_280 ? Number(rows[0].rcv_pw_280) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_w_280n = ((rows[0].rcv_w_280 ? Number(rows[0].rcv_w_280) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_ww_280n = ((rows[0].rcv_ww_280 ? Number(rows[0].rcv_ww_280) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_pw_320n = ((rows[0].rcv_pw_320 ? Number(rows[0].rcv_pw_320) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_w_320n = ((rows[0].rcv_w_320 ? Number(rows[0].rcv_w_320) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_ww_320n = ((rows[0].rcv_ww_320 ? Number(rows[0].rcv_ww_320) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_pw_360n = ((rows[0].rcv_pw_360 ? Number(rows[0].rcv_pw_360) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_w_360n = ((rows[0].rcv_w_360 ? Number(rows[0].rcv_w_360) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_ww_360n = ((rows[0].rcv_ww_360 ? Number(rows[0].rcv_ww_360) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_pw_400n = ((rows[0].rcv_pw_400 ? Number(rows[0].rcv_pw_400) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_w_400n = ((rows[0].rcv_w_400 ? Number(rows[0].rcv_w_400) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_ww_400n = ((rows[0].rcv_ww_400 ? Number(rows[0].rcv_ww_400) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_jb_mayurn = ((rows[0].rcv_jb_mayur ? Number(rows[0].rcv_jb_mayur) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
                rows[0].rcv_jb_hamsan = ((rows[0].rcv_jb_hamsa ? Number(rows[0].rcv_jb_hamsa) : 0) * ((100 - Number(rows[0].issue_add_3)) / 100));
              
            }
            
        }, [rows[0]]); 


        const handleOpeningChange = (index:number,e: React.ChangeEvent<HTMLInputElement>) => {

            if (Number(e.target.value)>Number(rows[index].rcv_opening)) {
                setErrortext('Borma Weight Cant be Higher Than Receiving !')
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
                return
            }
           
    
            if(rows[0].issue_add_1){
                rows[index].issue_add_2=((Number(rows[0].rcv_opening))-Number(e.target.value))
                rows[index].issue_add_3=((Number(rows[index].issue_add_2)/(Number(rows[0].rcv_opening)))*100)  
            }
            handleRowChange(index,'issue_add_1',e.target.value)
        }

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
            if (resStatus1.data.scoopingLot && resStatus1.data.scoopingLot[0].editStatus ==='Pending') 
                {
                    setErrortext(`Modification of Lot is Pending in Linked  ${resStatus1.data.scoopingLot[0].latest_section} Section`)
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                dialogerror.showModal()
               // console.log(rows)
                return
                }

                if (
                    Number(rows[0].rcv_opening) !== (
                      Number(rows[0].rcv_pw_210) + Number(rows[0].rcv_w_210) + Number(rows[0].rcv_ww_210) +
                      Number(rows[0].rcv_pw_240) + Number(rows[0].rcv_w_240) + Number(rows[0].rcv_ww_240) +
                      Number(rows[0].rcv_pw_280) + Number(rows[0].rcv_w_280) + Number(rows[0].rcv_ww_280) +
                      Number(rows[0].rcv_pw_320) + Number(rows[0].rcv_w_320) + Number(rows[0].rcv_ww_320) +
                      Number(rows[0].rcv_pw_360) + Number(rows[0].rcv_w_360) + Number(rows[0].rcv_ww_360) +
                      Number(rows[0].rcv_pw_400) + Number(rows[0].rcv_w_400) + Number(rows[0].rcv_ww_400) +
                      Number(rows[0].rcv_jb_mayur) + Number(rows[0].rcv_jb_hamsa)
                    )
                  ) {
                       setErrortext('Total Current Receiving should be equal to Opening Balance')
                       console.log(Number(rows[0].issue_add_1))
                       console.log("Sum:", 
                        Number(rows[0].rcv_pw_210) + Number(rows[0].rcv_w_210) + Number(rows[0].rcv_ww_210) +
                        Number(rows[0].rcv_pw_240) + Number(rows[0].rcv_w_240) + Number(rows[0].rcv_ww_240) +
                        Number(rows[0].rcv_pw_280) + Number(rows[0].rcv_w_280) + Number(rows[0].rcv_ww_280) +
                        Number(rows[0].rcv_pw_320) + Number(rows[0].rcv_w_320) + Number(rows[0].rcv_ww_320) +
                        Number(rows[0].rcv_pw_360) + Number(rows[0].rcv_w_360) + Number(rows[0].rcv_ww_360) +
                        Number(rows[0].rcv_pw_400) + Number(rows[0].rcv_w_400) + Number(rows[0].rcv_ww_400) +
                        Number(rows[0].rcv_jb_mayur) + Number(rows[0].rcv_jb_hamsa)
                      );
                       const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                       dialogerror.showModal()
                      // console.log(rows)
                       return
                   }

        if (
            Number(props.borma[0].rcv_pw_210) < Number(rows[0].rcv_pw_210) ||
            Number(props.borma[0].rcv_w_210) < Number(rows[0].rcv_w_210) ||
            Number(props.borma[0].rcv_ww_210) < Number(rows[0].rcv_ww_210) ||
            Number(props.borma[0].rcv_pw_240) < Number(rows[0].rcv_pw_240) ||
            Number(props.borma[0].rcv_w_240) < Number(rows[0].rcv_w_240) ||
            Number(props.borma[0].rcv_ww_240) < Number(rows[0].rcv_ww_240) ||
            Number(props.borma[0].rcv_pw_280) < Number(rows[0].rcv_pw_280) ||
            Number(props.borma[0].rcv_w_280) < Number(rows[0].rcv_w_280) ||
            Number(props.borma[0].rcv_ww_280) < Number(rows[0].rcv_ww_280) ||
            Number(props.borma[0].rcv_pw_320) < Number(rows[0].rcv_pw_320) ||
            Number(props.borma[0].rcv_w_320) < Number(rows[0].rcv_w_320) ||
            Number(props.borma[0].rcv_ww_320) < Number(rows[0].rcv_ww_320) ||
            Number(props.borma[0].rcv_pw_360) < Number(rows[0].rcv_pw_360) ||
            Number(props.borma[0].rcv_w_360) < Number(rows[0].rcv_w_360) ||
            Number(props.borma[0].rcv_ww_360) < Number(rows[0].rcv_ww_360) ||
            Number(props.borma[0].rcv_pw_400) < Number(rows[0].rcv_pw_400) ||
            Number(props.borma[0].rcv_w_400) < Number(rows[0].rcv_w_400) ||
            Number(props.borma[0].rcv_ww_400) < Number(rows[0].rcv_ww_400) ||
            Number(props.borma[0].rcv_jb_mayur) < Number(rows[0].rcv_jb_mayur) ||
            Number(props.borma[0].rcv_jb_hamsa) < Number(rows[0].rcv_jb_hamsa)
        ) {
            setErrortext('Current Receiving should not Exceed Previous Receiving Value');

            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement;
            dialogerror.showModal();
            return;
        }

        if(Number(props.borma[0].current_backlog) <= 0){
                    setErrortext('Backlog Cannot be Zero or Negative While Re-Issue')
                   
                    const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                    dialogerror.showModal()
                   // console.log(rows)
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

                    console.log(formData)


             try {
                            const initialhumid = await axios.post('/api/dpds/createReissueWholes', { linehumid:formData,
                                LotNo:props.borma[0].LotNo
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
                        finally{
                            setisdisable(false)
                        }




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

                        <div className="flex"><Label className="w-1/4 pt-1">No. of Labour</Label>
                            {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                            <Input className="w-1/4 text-center" placeholder="No. of Labour" ref={dayOpRef} />
                        </div>
                        <div className="flex"><Label className="w-1/4 pt-1">No. Of Supervisor</Label>
                    {/* <Input className="w-2/4 text-center" placeholder="No. of Operator" ref={operatorRef} required /> */}
                    <Input className="w-1/4 text-center" placeholder="No. of Supervisor" ref={nightOpRef}  />
                     </div>



                    </div>
                  <div className="my-2 text-sm flex font-semibold text-red-600 text-justify ">
                      * Current Receiving [ pw_210 + w_210 + ww_210 + pw_240 + w_240 + ww_240 + pw_280 + w_280 + ww_280 + pw_320 + w_320 + ww_320 + pw_360 + w_360 + ww_360 + pw_400 + w_400 + ww_400 + jb_mayur + jb_hamsa ] should be equal to {props.borma[0].current_backlog} Kg
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

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_PW_210' : 'Previous PW_210') : 'Previous PW_210'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_PW_210' : 'Current PW_210') : 'Current PW_210'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_W_210' : 'Previous W_210') : 'Previous W_210'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_W_210' : 'Current W_210') : 'Current W_210'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_WW_210' : 'Previous WW_210') : 'Previous WW_210'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_WW_210' : 'Current WW_210') : 'Current WW_210'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_PW_240' : 'Previous PW_240') : 'Previous PW_240'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_PW_240' : 'Current PW_240') : 'Current PW_240'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_W_240' : 'Previous W_240') : 'Previous W_240'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_W_240' : 'Current W_240') : 'Current W_240'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_WW_240' : 'Previous WW_240') : 'Previous WW_240'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_WW_240' : 'Current WW_240') : 'Current WW_240'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_PW_280' : 'Previous PW_280') : 'Previous PW_280'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_PW_280' : 'Current PW_280') : 'Current PW_280'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_W_280' : 'Previous W_280') : 'Previous W_280'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_W_280' : 'Current W_280') : 'Current W_280'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_WW_280' : 'Previous WW_280') : 'Previous WW_280'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_WW_280' : 'Current WW_280') : 'Current WW_280'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_PW_320' : 'Previous PW_320') : 'Previous PW_320'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_PW_320' : 'Current PW_320') : 'Current PW_320'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_W_320' : 'Previous W_320') : 'Previous W_320'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_W_320' : 'Current W_320') : 'Current W_320'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_WW_320' : 'Previous WW_320') : 'Previous WW_320'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_WW_320' : 'Current WW_320') : 'Current WW_320'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_PW_360' : 'Previous PW_360') : 'Previous PW_360'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_PW_360' : 'Current PW_360') : 'Current PW_360'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_W_360' : 'Previous W_360') : 'Previous W_360'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_W_360' : 'Current W_360') : 'Current W_360'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_WW_360' : 'Previous WW_360') : 'Previous WW_360'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_WW_360' : 'Current WW_360') : 'Current WW_360'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_PW_400' : 'Previous PW_400') : 'Previous PW_400'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_PW_400' : 'Current PW_400') : 'Current PW_400'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_W_400' : 'Previous W_400') : 'Previous W_400'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_W_400' : 'Current W_400') : 'Current W_400'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_WW_400' : 'Previous WW_400') : 'Previous WW_400'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_WW_400' : 'Current WW_400') : 'Current WW_400'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_JB_MAYUR' : 'Previous JB_MAYUR') : 'Previous JB_MAYUR'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_JB_MAYUR' : 'Current JB_MAYUR') : 'Current JB_MAYUR'}</TableHead>

                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Previous V_JB_HAMSA' : 'Previous JB_HAMSA') : 'Previous JB_HAMSA'}</TableHead>
                          <TableHead className="text-center">{LotNo ? (LotNo.includes('V') ? 'Current V_JB_HAMSA' : 'Current JB_HAMSA') : 'Current JB_HAMSA'}</TableHead>


                          <TableHead className="text-center">-</TableHead>
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
                                          <TableCell className="text-center font-semibold text-blue-500">{row.LotNo}</TableCell>
                                          <TableCell className="text-center font-semibold ">{row.origin}</TableCell>
                                          <TableCell className="text-center font-semibold ">{row.mixingLot}</TableCell>
                                          <TableCell className="text-center font-semibold ">{formatNumber(row.rcv_opening)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-200' type="number"
                                                  value={row.issue_add_1} placeholder="Pr." onChange={(e) => handleOpeningChange(idx, e)} required /> </TableCell>

                                          <TableCell className="text-center text-red-500 font-semibold">{formatNumber(row.issue_add_2.toString())} Kg</TableCell>
                                          <TableCell className="text-center font-semibold text-red-500">{formatNumber(row.issue_add_3.toString())} %</TableCell>
                                          
                                          
                                          
                                          <TableCell className="text-center font-semibold ">{formatNumber(props.borma[0].rcv_pw_210)} Kg</TableCell>
                                          <TableCell className="text-center"> <Input className="bg-yellow-200" type="number" value={row.rcv_pw_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_pw_210', e.target.value)} required /></TableCell>
                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_w_210)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_w_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_w_210', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_ww_210)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_ww_210} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_ww_210', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_pw_240)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_pw_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_pw_240', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_w_240)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_w_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_w_240', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_ww_240)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_ww_240} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_ww_240', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_pw_280)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_pw_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_pw_280', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_w_280)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_w_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_w_280', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_ww_280)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_ww_280} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_ww_280', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_pw_320)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_pw_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_pw_320', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_w_320)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_w_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_w_320', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_ww_320)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_ww_320} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_ww_320', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_pw_360)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_pw_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_pw_360', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_w_360)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_w_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_w_360', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_ww_360)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_ww_360} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_ww_360', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_pw_400)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_pw_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_pw_400', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_w_400)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_w_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_w_400', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_ww_400)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_ww_400} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_ww_400', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_jb_mayur)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_jb_mayur} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_jb_mayur', e.target.value)} required />
                                          </TableCell>

                                          <TableCell className="text-center font-semibold">{formatNumber(props.borma[0].rcv_jb_hamsa)} Kg</TableCell>
                                          <TableCell className="text-center">
                                              <Input className="bg-yellow-200" type="number" value={row.rcv_jb_hamsa} placeholder="Pr." onChange={(e) => handleRowChange(idx, 'rcv_jb_hamsa', e.target.value)} required />
                                          </TableCell>





                                          <TableCell className="bg-black-100"> -</TableCell>
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

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_pw_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_pw_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_w_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_w_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_s_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_s_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_aw_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_aw_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_lw_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_lw_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_pw_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_pw_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_w_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_w_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_s_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_s_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_aw_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_aw_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_lw_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_lw_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_pw_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_pw_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_w_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_w_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_s_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_s_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_aw_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_aw_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_lw_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_lw_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_pw_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_pw_240', e.target.value)}
                                                  required
                                              />

                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_w_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_w_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_240_A}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_240_A', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_aw_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_aw_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_lw_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_lw_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_pw_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_pw_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_w_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_w_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_280_A}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_280_A', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_aw_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_aw_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_lw_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_lw_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.wholes_double}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'wholes_double', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_pw_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_pw_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_w_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_w_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_320_A}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_320_A', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_aw_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_aw_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_lw_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_lw_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_pw_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_pw_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_w_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_w_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_360_A}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_360_A', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_aw_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_aw_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_lw_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_lw_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_pw_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_pw_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_w_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_w_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ww_400_A}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ww_400_A', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_aw_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_aw_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_lw_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_lw_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_jjb}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_jjb', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_jjb1}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_jjb1', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_payal_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_payal_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_payal_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_payal_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_320_lot}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_320_lot', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_400_lot}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_400_lot', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_in_w_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_in_w_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_in_w_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_in_w_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_in_w_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_in_w_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                      </TableRow>
                                  );
                              })
                          ) : null}
                      </TableBody>
                  </Table>
                  <Label className="w-100 pt-1 text-center">Village Packing Grade</Label>
                  <Table className="mt-3">
                      <TableHeader className="bg-neutral-100 text-stone-950 ">
                          <TableHead className="text-center">A_150</TableHead>
                          <TableHead className="text-center">C_150</TableHead>
                          <TableHead className="text-center">E_150</TableHead>
                          <TableHead className="text-center">SW_150</TableHead>
                          <TableHead className="text-center">SSW_150</TableHead>
                          <TableHead className="text-center">K_150</TableHead>

                          <TableHead className="text-center">A_180</TableHead>
                          <TableHead className="text-center">C_180</TableHead>
                          <TableHead className="text-center">E_180</TableHead>
                          <TableHead className="text-center">SW_180</TableHead>
                          <TableHead className="text-center">SSW_180</TableHead>
                          <TableHead className="text-center">K_180</TableHead>

                          <TableHead className="text-center">A_210</TableHead>
                          <TableHead className="text-center">C_210</TableHead>
                          <TableHead className="text-center">E_210</TableHead>
                          <TableHead className="text-center">SW_210</TableHead>
                          <TableHead className="text-center">SSW_210</TableHead>
                          <TableHead className="text-center">K_210</TableHead>

                          <TableHead className="text-center">A_240</TableHead>
                          <TableHead className="text-center">C_240</TableHead>
                          <TableHead className="text-center">E_240</TableHead>
                          <TableHead className="text-center">SW_240</TableHead>
                          <TableHead className="text-center">SSW_240</TableHead>
                          <TableHead className="text-center">K_240</TableHead>

                          <TableHead className="text-center">A_280</TableHead>
                          <TableHead className="text-center">C_280</TableHead>
                          <TableHead className="text-center">E_280</TableHead>
                          <TableHead className="text-center">SW_280</TableHead>
                          <TableHead className="text-center">SSW_280</TableHead>
                          <TableHead className="text-center">K_280</TableHead>

                          <TableHead className="text-center">A_320</TableHead>
                          <TableHead className="text-center">C_320</TableHead>
                          <TableHead className="text-center">E_320</TableHead>
                          <TableHead className="text-center">SW_320</TableHead>
                          <TableHead className="text-center">SSW_320</TableHead>
                          <TableHead className="text-center">K_320</TableHead>

                          <TableHead className="text-center">A_360</TableHead>
                          <TableHead className="text-center">C_360</TableHead>
                          <TableHead className="text-center">E_360</TableHead>
                          <TableHead className="text-center">SW_360</TableHead>
                          <TableHead className="text-center">SSW_360</TableHead>
                          <TableHead className="text-center">K_360</TableHead>

                          <TableHead className="text-center">A_400</TableHead>
                          <TableHead className="text-center">C_400</TableHead>
                          <TableHead className="text-center">E_400</TableHead>
                          <TableHead className="text-center">SW_400</TableHead>
                          <TableHead className="text-center">SSW_400</TableHead>
                          <TableHead className="text-center">K_400</TableHead>
                      </TableHeader>

                      <TableBody>
                          {props.borma.length > 0 ? (
                              rows.map((row: WholesRowData, idx: number) => {

                                  return (
                                      <TableRow key={idx} className="boiling-row-height-scoop">
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_a_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_a_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_c_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_c_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_sw_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_sw_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ssw_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ssw_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_k_150}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_k_150', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_a_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_a_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_c_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_c_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_sw_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_sw_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ssw_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ssw_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_k_180}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_k_180', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_a_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_a_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_c_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_c_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_sw_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_sw_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ssw_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ssw_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_k_210}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_k_210', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_a_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_a_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_c_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_c_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_sw_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_sw_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ssw_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ssw_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_k_240}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_k_240', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_a_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_a_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_c_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_c_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_sw_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_sw_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ssw_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ssw_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_k_280}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_k_280', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_a_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_a_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_c_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_c_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_sw_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_sw_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ssw_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ssw_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_k_320}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_k_320', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_a_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_a_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_c_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_c_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_sw_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_sw_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ssw_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ssw_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_k_360}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_k_360', e.target.value)}
                                                  required
                                              />
                                          </TableCell>

                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_a_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_a_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_c_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_c_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_e_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_e_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_sw_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_sw_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_ssw_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_ssw_400', e.target.value)}
                                                  required
                                              />
                                          </TableCell>
                                          <TableCell className="text-center">
                                              <Input className='bg-yellow-100'
                                                  type="number"
                                                  value={row.issue_k_400}
                                                  placeholder="Pr."
                                                  onChange={(e) => handleRowChange(idx, 'issue_k_400', e.target.value)}
                                                  required
                                              />
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

export default RCNWholesReCreateForm