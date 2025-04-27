import { WholesData } from "@/type/type";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Origin } from "../common/exportData";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import axios from "axios";

interface Props {
    borma: WholesData
}
interface RCNEntries {
    rcv_pw_210: string;
    rcv_w_210: string;
    rcv_ww_210: string;
    rcv_pw_240: string;
    rcv_w_240: string;
    rcv_ww_240: string;
    rcv_pw_280: string;
    rcv_w_280: string;
    rcv_ww_280: string;
    rcv_pw_320: string;
    rcv_w_320: string;
    rcv_ww_320: string;
    rcv_pw_360: string;
    rcv_w_360: string;
    rcv_ww_360: string;
    rcv_pw_400: string;
    rcv_w_400: string;
    rcv_ww_400: string;
    rcv_jb_mayur: string;
    rcv_jb_hamsa: string;
    current_backlog: string;
    Status: string;
}
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
const RCNWholesReMix = (props: Props) => {

    const [rcv_pw_210, setRcvPw210] = useState<number>(0);
    const [rcv_w_210, setRcvW210] = useState<number>(0);
    const [rcv_ww_210, setRcvWw210] = useState<number>(0);
    const [rcv_pw_240, setRcvPw240] = useState<number>(0);
    const [rcv_w_240, setRcvW240] = useState<number>(0);
    const [rcv_ww_240, setRcvWw240] = useState<number>(0);
    const [rcv_pw_280, setRcvPw280] = useState<number>(0);
    const [rcv_w_280, setRcvW280] = useState<number>(0);
    const [rcv_ww_280, setRcvWw280] = useState<number>(0);
    const [rcv_pw_320, setRcvPw320] = useState<number>(0);
    const [rcv_w_320, setRcvW320] = useState<number>(0);
    const [rcv_ww_320, setRcvWw320] = useState<number>(0);
    const [rcv_pw_360, setRcvPw360] = useState<number>(0);
    const [rcv_w_360, setRcvW360] = useState<number>(0);
    const [rcv_ww_360, setRcvWw360] = useState<number>(0);
    const [rcv_pw_400, setRcvPw400] = useState<number>(0);
    const [rcv_w_400, setRcvW400] = useState<number>(0);
    const [rcv_ww_400, setRcvWw400] = useState<number>(0);
    const [rcv_jb_mayur, setRcvJbMayur] = useState<number>(0);
    const [rcv_jb_hamsa, setRcvJbHamsa] = useState<number>(0);

    // State variables for source strings
    const [fsourcercv_pw_210, setFsourcercvPw210] = useState<string>();
    const [fsourcercv_w_210, setFsourcercvW210] = useState<string>();
    const [fsourcercv_ww_210, setFsourcercvWw210] = useState<string>();
    const [fsourcercv_pw_240, setFsourcercvPw240] = useState<string>();
    const [fsourcercv_w_240, setFsourcercvW240] = useState<string>();
    const [fsourcercv_ww_240, setFsourcercvWw240] = useState<string>();
    const [fsourcercv_pw_280, setFsourcercvPw280] = useState<string>();
    const [fsourcercv_w_280, setFsourcercvW280] = useState<string>();
    const [fsourcercv_ww_280, setFsourcercvWw280] = useState<string>();
    const [fsourcercv_pw_320, setFsourcercvPw320] = useState<string>();
    const [fsourcercv_w_320, setFsourcercvW320] = useState<string>();
    const [fsourcercv_ww_320, setFsourcercvWw320] = useState<string>();
    const [fsourcercv_pw_360, setFsourcercvPw360] = useState<string>();
    const [fsourcercv_w_360, setFsourcercvW360] = useState<string>();
    const [fsourcercv_ww_360, setFsourcercvWw360] = useState<string>();
    const [fsourcercv_pw_400, setFsourcercvPw400] = useState<string>();
    const [fsourcercv_w_400, setFsourcercvW400] = useState<string>();
    const [fsourcercv_ww_400, setFsourcercvWw400] = useState<string>();
    const [fsourcercv_jb_mayur, setFsourcercvJbMayur] = useState<string>();
    const [fsourcercv_jb_hamsa, setFsourcercvJbHamsa] = useState<string>();

    const [fsourcebacklog, setfSourcebacklog] = useState<string>('');

    const [successflag, setSuccessflag] = useState<string>('none');
    const [successflagtable, setSuccessflagtable] = useState<string>('none');

    const [destbacklog, setdestbacklog] = useState<string>("");
    const [destlot, setdestlot] = useState<string>("");
    const [destid, setdestid] = useState<number>(0);

    // State variables for destination
    const [destrcv_pw_210, setDestrcvPw210] = useState<string>("");
    const [destrcv_w_210, setDestrcvW210] = useState<string>("");
    const [destrcv_ww_210, setDestrcvWw210] = useState<string>("");
    const [destrcv_pw_240, setDestrcvPw240] = useState<string>("");
    const [destrcv_w_240, setDestrcvW240] = useState<string>("");
    const [destrcv_ww_240, setDestrcvWw240] = useState<string>("");
    const [destrcv_pw_280, setDestrcvPw280] = useState<string>("");
    const [destrcv_w_280, setDestrcvW280] = useState<string>("");
    const [destrcv_ww_280, setDestrcvWw280] = useState<string>("");
    const [destrcv_pw_320, setDestrcvPw320] = useState<string>("");
    const [destrcv_w_320, setDestrcvW320] = useState<string>("");
    const [destrcv_ww_320, setDestrcvWw320] = useState<string>("");
    const [destrcv_pw_360, setDestrcvPw360] = useState<string>("");
    const [destrcv_w_360, setDestrcvW360] = useState<string>("");
    const [destrcv_ww_360, setDestrcvWw360] = useState<string>("");
    const [destrcv_pw_400, setDestrcvPw400] = useState<string>("");
    const [destrcv_w_400, setDestrcvW400] = useState<string>("");
    const [destrcv_ww_400, setDestrcvWw400] = useState<string>("");
    const [destrcv_jb_mayur, setDestrcvJbMayur] = useState<string>("");
    const [destrcv_jb_hamsa, setDestrcvJbHamsa] = useState<string>("");
    const [destrcv_status, setdestrcv_status] = useState<string>("");
    const [destorigin, setdestorigin] = useState<string>("");
    const [sourceactualbacklog, setsourceactualbacklog] = useState<string>("");

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
    const [datarcv, setdatarcv] = useState<RCNEntries>({} as RCNEntries);
    useEffect(() => {
        setFsourcercvPw210(props.borma ? ((props.borma.rcv_pw_210 ? Number(props.borma.rcv_pw_210) : 0) - rcv_pw_210).toFixed(2) : '');
        setFsourcercvW210(props.borma ? ((props.borma.rcv_w_210 ? Number(props.borma.rcv_w_210) : 0) - rcv_w_210).toFixed(2) : '');
        setFsourcercvWw210(props.borma ? ((props.borma.rcv_ww_210 ? Number(props.borma.rcv_ww_210) : 0) - rcv_ww_210).toFixed(2) : '');
        setFsourcercvPw240(props.borma ? ((props.borma.rcv_pw_240 ? Number(props.borma.rcv_pw_240) : 0) - rcv_pw_240).toFixed(2) : '');
        setFsourcercvW240(props.borma ? ((props.borma.rcv_w_240 ? Number(props.borma.rcv_w_240) : 0) - rcv_w_240).toFixed(2) : '');
        setFsourcercvWw240(props.borma ? ((props.borma.rcv_ww_240 ? Number(props.borma.rcv_ww_240) : 0) - rcv_ww_240).toFixed(2) : '');
        setFsourcercvPw280(props.borma ? ((props.borma.rcv_pw_280 ? Number(props.borma.rcv_pw_280) : 0) - rcv_pw_280).toFixed(2) : '');
        setFsourcercvW280(props.borma ? ((props.borma.rcv_w_280 ? Number(props.borma.rcv_w_280) : 0) - rcv_w_280).toFixed(2) : '');
        setFsourcercvWw280(props.borma ? ((props.borma.rcv_ww_280 ? Number(props.borma.rcv_ww_280) : 0) - rcv_ww_280).toFixed(2) : '');
        setFsourcercvPw320(props.borma ? ((props.borma.rcv_pw_320 ? Number(props.borma.rcv_pw_320) : 0) - rcv_pw_320).toFixed(2) : '');
        setFsourcercvW320(props.borma ? ((props.borma.rcv_w_320 ? Number(props.borma.rcv_w_320) : 0) - rcv_w_320).toFixed(2) : '');
        setFsourcercvWw320(props.borma ? ((props.borma.rcv_ww_320 ? Number(props.borma.rcv_ww_320) : 0) - rcv_ww_320).toFixed(2) : '');
        setFsourcercvPw360(props.borma ? ((props.borma.rcv_pw_360 ? Number(props.borma.rcv_pw_360) : 0) - rcv_pw_360).toFixed(2) : '');
        setFsourcercvW360(props.borma ? ((props.borma.rcv_w_360 ? Number(props.borma.rcv_w_360) : 0) - rcv_w_360).toFixed(2) : '');
        setFsourcercvWw360(props.borma ? ((props.borma.rcv_ww_360 ? Number(props.borma.rcv_ww_360) : 0) - rcv_ww_360).toFixed(2) : '');
        setFsourcercvPw400(props.borma ? ((props.borma.rcv_pw_400 ? Number(props.borma.rcv_pw_400) : 0) - rcv_pw_400).toFixed(2) : '');
        setFsourcercvW400(props.borma ? ((props.borma.rcv_w_400 ? Number(props.borma.rcv_w_400) : 0) - rcv_w_400).toFixed(2) : '');
        setFsourcercvWw400(props.borma ? ((props.borma.rcv_ww_400 ? Number(props.borma.rcv_ww_400) : 0) - rcv_ww_400).toFixed(2) : '');
        setFsourcercvJbMayur(props.borma ? ((props.borma.rcv_jb_mayur ? Number(props.borma.rcv_jb_mayur) : 0) - rcv_jb_mayur).toFixed(2) : '');
        setFsourcercvJbHamsa(props.borma ? ((props.borma.rcv_jb_hamsa ? Number(props.borma.rcv_jb_hamsa) : 0) - rcv_jb_hamsa).toFixed(2) : '');

        // For backlog calculation
        setfSourcebacklog(props.borma ? (Number(props.borma.current_backlog) -
            (rcv_pw_210 + rcv_w_210 + rcv_ww_210 + rcv_pw_240 + rcv_w_240 + rcv_ww_240 +
                rcv_pw_280 + rcv_w_280 + rcv_ww_280 + rcv_pw_320 + rcv_w_320 + rcv_ww_320 +
                rcv_pw_360 + rcv_w_360 + rcv_ww_360 + rcv_pw_400 + rcv_w_400 + rcv_ww_400 +
                rcv_jb_mayur + rcv_jb_hamsa)).toFixed(2) : '');

        setDestrcvPw210(((datarcv.rcv_pw_210 ? Number(datarcv.rcv_pw_210) : 0) + rcv_pw_210).toFixed(2));
        setDestrcvW210(((datarcv.rcv_w_210 ? Number(datarcv.rcv_w_210) : 0) + rcv_w_210).toFixed(2));
        setDestrcvWw210(((datarcv.rcv_ww_210 ? Number(datarcv.rcv_ww_210) : 0) + rcv_ww_210).toFixed(2));
        setDestrcvPw240(((datarcv.rcv_pw_240 ? Number(datarcv.rcv_pw_240) : 0) + rcv_pw_240).toFixed(2));
        setDestrcvW240(((datarcv.rcv_w_240 ? Number(datarcv.rcv_w_240) : 0) + rcv_w_240).toFixed(2));
        setDestrcvWw240(((datarcv.rcv_ww_240 ? Number(datarcv.rcv_ww_240) : 0) + rcv_ww_240).toFixed(2));
        setDestrcvPw280(((datarcv.rcv_pw_280 ? Number(datarcv.rcv_pw_280) : 0) + rcv_pw_280).toFixed(2));
        setDestrcvW280(((datarcv.rcv_w_280 ? Number(datarcv.rcv_w_280) : 0) + rcv_w_280).toFixed(2));
        setDestrcvWw280(((datarcv.rcv_ww_280 ? Number(datarcv.rcv_ww_280) : 0) + rcv_ww_280).toFixed(2));

        // Add for other grades similarly:
        setDestrcvPw320(((datarcv.rcv_pw_320 ? Number(datarcv.rcv_pw_320) : 0) + rcv_pw_320).toFixed(2));
        setDestrcvW320(((datarcv.rcv_w_320 ? Number(datarcv.rcv_w_320) : 0) + rcv_w_320).toFixed(2));
        setDestrcvWw320(((datarcv.rcv_ww_320 ? Number(datarcv.rcv_ww_320) : 0) + rcv_ww_320).toFixed(2));

        setDestrcvPw360(((datarcv.rcv_pw_360 ? Number(datarcv.rcv_pw_360) : 0) + rcv_pw_360).toFixed(2));
        setDestrcvW360(((datarcv.rcv_w_360 ? Number(datarcv.rcv_w_360) : 0) + rcv_w_360).toFixed(2));
        setDestrcvWw360(((datarcv.rcv_ww_360 ? Number(datarcv.rcv_ww_360) : 0) + rcv_ww_360).toFixed(2));

        setDestrcvPw400(((datarcv.rcv_pw_400 ? Number(datarcv.rcv_pw_400) : 0) + rcv_pw_400).toFixed(2));
        setDestrcvW400(((datarcv.rcv_w_400 ? Number(datarcv.rcv_w_400) : 0) + rcv_w_400).toFixed(2));
        setDestrcvWw400(((datarcv.rcv_ww_400 ? Number(datarcv.rcv_ww_400) : 0) + rcv_ww_400).toFixed(2));

        setDestrcvJbMayur(((datarcv.rcv_jb_mayur ? Number(datarcv.rcv_jb_mayur) : 0) + rcv_jb_mayur).toFixed(2));
        setDestrcvJbHamsa(((datarcv.rcv_jb_hamsa ? Number(datarcv.rcv_jb_hamsa) : 0) + rcv_jb_hamsa).toFixed(2));



        setdestbacklog(((datarcv.current_backlog ? Number(datarcv.current_backlog) : 0) +
            (rcv_pw_210 + rcv_w_210 + rcv_ww_210 + rcv_pw_240 + rcv_w_240 + rcv_ww_240 +
                rcv_pw_280 + rcv_w_280 + rcv_ww_280 + rcv_pw_320 + rcv_w_320 + rcv_ww_320 +
                rcv_pw_360 + rcv_w_360 + rcv_ww_360 + rcv_pw_400 + rcv_w_400 + rcv_ww_400 +
                rcv_jb_mayur + rcv_jb_hamsa)).toFixed(2));
    }, [
        rcv_pw_210, rcv_w_210, rcv_ww_210, rcv_pw_240, rcv_w_240, rcv_ww_240,
        rcv_pw_280, rcv_w_280, rcv_ww_280, rcv_pw_320, rcv_w_320, rcv_ww_320,
        rcv_pw_360, rcv_w_360, rcv_ww_360, rcv_pw_400, rcv_w_400, rcv_ww_400,
        rcv_jb_mayur, rcv_jb_hamsa
    ]);

    useEffect(() => {
        setFsourcercvPw210(props.borma ? props.borma.rcv_pw_210 : '');
        setFsourcercvW210(props.borma ? props.borma.rcv_w_210 : '');
        setFsourcercvWw210(props.borma ? props.borma.rcv_ww_210 : '');
        setFsourcercvPw240(props.borma ? props.borma.rcv_pw_240 : '');
        setFsourcercvW240(props.borma ? props.borma.rcv_w_240 : '');
        setFsourcercvWw240(props.borma ? props.borma.rcv_ww_240 : '');
        setFsourcercvPw280(props.borma ? props.borma.rcv_pw_280 : '');
        setFsourcercvW280(props.borma ? props.borma.rcv_w_280 : '');
        setFsourcercvWw280(props.borma ? props.borma.rcv_ww_280 : '');
        setFsourcercvPw320(props.borma ? props.borma.rcv_pw_320 : '');
        setFsourcercvW320(props.borma ? props.borma.rcv_w_320 : '');
        setFsourcercvWw320(props.borma ? props.borma.rcv_ww_320 : '');
        setFsourcercvPw360(props.borma ? props.borma.rcv_pw_360 : '');
        setFsourcercvW360(props.borma ? props.borma.rcv_w_360 : '');
        setFsourcercvWw360(props.borma ? props.borma.rcv_ww_360 : '');
        setFsourcercvPw400(props.borma ? props.borma.rcv_pw_400 : '');
        setFsourcercvW400(props.borma ? props.borma.rcv_w_400 : '');
        setFsourcercvWw400(props.borma ? props.borma.rcv_ww_400 : '');
        setFsourcercvJbMayur(props.borma ? props.borma.rcv_jb_mayur : '');
        setFsourcercvJbHamsa(props.borma ? props.borma.rcv_jb_hamsa : '');

        setfSourcebacklog(props.borma ? props.borma.current_backlog : '');
        setsourceactualbacklog(props.borma ? props.borma.current_backlog : '')
    }, [props.borma]);

    const handleSearch = async () => {
        setSuccessflag('none')
        setSuccessflagtable('none')
        if (Number(destlot.split("-")[1]) < Number(props.borma.LotNo.split("-")[1])) {

            if (successflag === 'flex') {
                setSuccessflag('none')
                setSuccessflagtable('none')
                setErrortext('Mixing Cant be performed with Previous Lot')
                const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                dialogerror.showModal()
                return
            }
            else {
                setSuccessflag('none')
                setSuccessflagtable('none')
                setErrortext('Mixing Cant be performed with Previous Lot')
                const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
                dialogerror.showModal()
                return
            }
        }

        const response = await axios.post('/api/wholes/wholesmixsearch', {
            lotNo: destlot,
            origin: destorigin,
        })
        const data1 = await response.data

        //console.log(data1.rcnEntries.current_backlog)
        if (data1.rcnEntries && data1.rcnEntries.current_backlog && data1.rcnEntries.editStatus !== 'Pending') {
            setSuccessflag('flex')
            setSuccessflagtable('contents')
            setdatarcv(data1.rcnEntries)
            setdestid(data1.rcnEntries.id)
            setdestbacklog(data1.rcnEntries.current_backlog)


            setDestrcvPw210(data1.rcnEntries.rcv_pw_210 ? data1.rcnEntries.rcv_pw_210 : 0);
            setDestrcvW210(data1.rcnEntries.rcv_w_210 ? data1.rcnEntries.rcv_w_210 : 0);
            setDestrcvWw210(data1.rcnEntries.rcv_ww_210 ? data1.rcnEntries.rcv_ww_210 : 0);
            setDestrcvPw240(data1.rcnEntries.rcv_pw_240 ? data1.rcnEntries.rcv_pw_240 : 0);
            setDestrcvW240(data1.rcnEntries.rcv_w_240 ? data1.rcnEntries.rcv_w_240 : 0);
            setDestrcvWw240(data1.rcnEntries.rcv_ww_240 ? data1.rcnEntries.rcv_ww_240 : 0);
            setDestrcvPw280(data1.rcnEntries.rcv_pw_280 ? data1.rcnEntries.rcv_pw_280 : 0);
            setDestrcvW280(data1.rcnEntries.rcv_w_280 ? data1.rcnEntries.rcv_w_280 : 0);
            setDestrcvWw280(data1.rcnEntries.rcv_ww_280 ? data1.rcnEntries.rcv_ww_280 : 0);
            setDestrcvPw320(data1.rcnEntries.rcv_pw_320 ? data1.rcnEntries.rcv_pw_320 : 0);
            setDestrcvW320(data1.rcnEntries.rcv_w_320 ? data1.rcnEntries.rcv_w_320 : 0);
            setDestrcvWw320(data1.rcnEntries.rcv_ww_320 ? data1.rcnEntries.rcv_ww_320 : 0);
            setDestrcvPw360(data1.rcnEntries.rcv_pw_360 ? data1.rcnEntries.rcv_pw_360 : 0);
            setDestrcvW360(data1.rcnEntries.rcv_w_360 ? data1.rcnEntries.rcv_w_360 : 0);
            setDestrcvWw360(data1.rcnEntries.rcv_ww_360 ? data1.rcnEntries.rcv_ww_360 : 0);
            setDestrcvPw400(data1.rcnEntries.rcv_pw_400 ? data1.rcnEntries.rcv_pw_400 : 0);
            setDestrcvW400(data1.rcnEntries.rcv_w_400 ? data1.rcnEntries.rcv_w_400 : 0);
            setDestrcvWw400(data1.rcnEntries.rcv_ww_400 ? data1.rcnEntries.rcv_ww_400 : 0);
            setDestrcvJbMayur(data1.rcnEntries.rcv_jb_mayur ? data1.rcnEntries.rcv_jb_mayur : 0);
            setDestrcvJbHamsa(data1.rcnEntries.rcv_jb_hamsa ? data1.rcnEntries.rcv_jb_hamsa : 0);

            setdestrcv_status(data1.rcnEntries.Status)
            setdestbacklog(data1.rcnEntries.current_backlog)
        }
        else if (data1.rcnEntries && data1.rcnEntries.current_backlog && data1.rcnEntries.editStatus === 'Pending') {
            setSuccessflag('none')
            setSuccessflagtable('none')
            setdestbacklog('NA')
            setErrortext('Target Lot & Origin is in Pending Modification')
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            return
        }
        else {

            setSuccessflag('none')
            setSuccessflagtable('none')
            setdestbacklog('NA')
            setErrortext('Target Lot & Origin Not found')
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            return
        }

    }

    const handleMix = async () => {


        const resStatus1 = await axios.post('/api/boiling/pendingLotCountOrigin', { lotNo: props.borma.LotNo, origin: props.borma.origin })
        console.log(resStatus1)
        if (resStatus1.data.scoopingLot && resStatus1.data.scoopingLot[0].editStatus === 'Pending') {
            setErrortext(`Modification of Lot is Pending in Linked  ${resStatus1.data.scoopingLot[0].latest_section} Section`)
            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return
        }

        if ((Number(fsourcercv_pw_210) < 0) ||
            (Number(fsourcercv_w_210) < 0) ||
            (Number(fsourcercv_ww_210) < 0) ||
            (Number(fsourcercv_pw_240) < 0) ||
            (Number(fsourcercv_w_240) < 0) ||
            (Number(fsourcercv_ww_240) < 0) ||
            (Number(fsourcercv_pw_280) < 0) ||
            (Number(fsourcercv_w_280) < 0) ||
            (Number(fsourcercv_ww_280) < 0) ||
            (Number(fsourcercv_pw_320) < 0) ||
            (Number(fsourcercv_w_320) < 0) ||
            (Number(fsourcercv_ww_320) < 0) ||
            (Number(fsourcercv_pw_360) < 0) ||
            (Number(fsourcercv_w_360) < 0) ||
            (Number(fsourcercv_ww_360) < 0) ||
            (Number(fsourcercv_pw_400) < 0) ||
            (Number(fsourcercv_w_400) < 0) ||
            (Number(fsourcercv_ww_400) < 0) ||
            (Number(fsourcercv_jb_mayur) < 0) ||
            (Number(fsourcercv_jb_hamsa) < 0)) {
            setErrortext('Transfer cant Exceed Remaining Stock')

            const dialogerror = document.getElementById("erroremployeedialog") as HTMLDialogElement
            dialogerror.showModal()
            // console.log(rows)
            return

        }

        setisdisable(true)
        try {


            const initialhumid = await axios.post('/api/wholes/createMixWholes', {
                destid,
                destlot,
                destorigin,
                destbacklog,
                destrcv_pw_210, destrcv_w_210, destrcv_ww_210, destrcv_pw_240, destrcv_w_240, destrcv_ww_240,
                destrcv_pw_280, destrcv_w_280, destrcv_ww_280, destrcv_pw_320, destrcv_w_320, destrcv_ww_320,
                destrcv_pw_360, destrcv_w_360, destrcv_ww_360, destrcv_pw_400, destrcv_w_400, destrcv_ww_400,
                destrcv_jb_mayur, destrcv_jb_hamsa,
                destrcv_status,
                fsourceid: props.borma.id,
                fsourcelot: props.borma.LotNo,
                fsourceorigin: props.borma.origin,
                fsourcebacklog,
                fsourcercv_pw_210, fsourcercv_w_210, fsourcercv_ww_210, fsourcercv_pw_240, fsourcercv_w_240, fsourcercv_ww_240,
                fsourcercv_pw_280, fsourcercv_w_280, fsourcercv_ww_280, fsourcercv_pw_320, fsourcercv_w_320, fsourcercv_ww_320,
                fsourcercv_pw_360, fsourcercv_w_360, fsourcercv_ww_360, fsourcercv_pw_400, fsourcercv_w_400, fsourcercv_ww_400,
                fsourcercv_jb_mayur, fsourcercv_jb_hamsa,
                amount: (rcv_pw_210 + rcv_w_210 + rcv_ww_210 + rcv_pw_240 + rcv_w_240 + rcv_ww_240 +
                    rcv_pw_280 + rcv_w_280 + rcv_ww_280 + rcv_pw_320 + rcv_w_320 + rcv_ww_320 +
                    rcv_pw_360 + rcv_w_360 + rcv_ww_360 + rcv_pw_400 + rcv_w_400 + rcv_ww_400 +
                    rcv_jb_mayur + rcv_jb_hamsa).toFixed(2),
                bsourcebacklog: props.borma.current_backlog,
                bdestbacklog: datarcv.current_backlog
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



    return (
        <>

            <div className="px-5 py-2 overflow-scroll max-h-96">


                <div className="mx-8 flex flex-row gap-0.5">


                    <div className="flex"><Label className="w-2/4 pt-2 text-cyan-500">Transfer to Lot No</Label>
                        <Input className="w-2/4 justify-center" placeholder="Lot No" value={destlot} onChange={(e) => setdestlot(e.target.value)} required /> </div>

                    <div className="flex"><Label className="w-2/4 pt-2 text-center text-cyan-500">Origin</Label>
                        <select className='flex h-8 w-1/2 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setdestorigin(e.target.value)} value={destorigin}>

                            {Origin.map((data, index) => (
                                <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                    {data}
                                </option>
                            ))}
                        </select> </div>

                    <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>
                </div>

                <div className="flex mt-5  mx-8 pb-2 bg-green-100" style={{ display: successflag }}>
                    <Label className="w-100 pt-2 font-semibold text-red-500 text-base">Fill Up Transfer Amount in Details </Label>
                    {/* <Label className="w-100 pt-2 font-semibold ml-3">(Maximum Total {sourceactualbacklog} Kg can be Transfered)</Label> */}

                </div>
                <div className="flex mt-2 ml-5 gtext-center" >
                    <Label className=" w-100 pt-2 font-semibold ml-3 text-center">Maximum {sourceactualbacklog} Kg can be Transfered</Label>
                </div>

                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">1. PW 210 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_pw_210}
                        onChange={(e) => setRcvPw210(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_pw_210} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">2. W 210 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_w_210}
                        onChange={(e) => setRcvW210(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_w_210} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">3. WW 210 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_ww_210}
                        onChange={(e) => setRcvWw210(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_ww_210} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">4. PW 240 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_pw_240}
                        onChange={(e) => setRcvPw240(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_pw_240} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">5. W 240 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_w_240}
                        onChange={(e) => setRcvW240(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_w_240} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">6. WW 240 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_ww_240}
                        onChange={(e) => setRcvWw240(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_ww_240} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">7. PW 280 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_pw_280}
                        onChange={(e) => setRcvPw280(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_pw_280} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">8. W 280 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_w_280}
                        onChange={(e) => setRcvW280(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_w_280} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">9. WW 280 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_ww_280}
                        onChange={(e) => setRcvWw280(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_ww_280} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">10. PW 320 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_pw_320}
                        onChange={(e) => setRcvPw320(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_pw_320} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">11. W 320 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_w_320}
                        onChange={(e) => setRcvW320(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_w_320} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">12. WW 320 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_ww_320}
                        onChange={(e) => setRcvWw320(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_ww_320} kg </Label>
                </div>


                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">13. PW 360 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_pw_360}
                        onChange={(e) => setRcvPw360(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_pw_360} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">14. W 360 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_w_360}
                        onChange={(e) => setRcvW360(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_w_360} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">15. WW 360 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_ww_360}
                        onChange={(e) => setRcvWw360(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_ww_360} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">16. PW 400 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_pw_400}
                        onChange={(e) => setRcvPw400(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_pw_400} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">17. W 400 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_w_400}
                        onChange={(e) => setRcvW400(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_w_400} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">18. WW 400 Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_ww_400}
                        onChange={(e) => setRcvWw400(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_ww_400} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">19. JB Mayur Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_jb_mayur}
                        onChange={(e) => setRcvJbMayur(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_jb_mayur} kg </Label>
                </div>

                <div className="flex mt-2 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 text-purple-500">20. JB Hamsa Amount</Label>
                    <Input className="w-1/4 justify-center text-center" placeholder="Amount" type='number' value={rcv_jb_hamsa}
                        onChange={(e) => setRcvJbHamsa(Number(e.target.value))} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center"> Remaining : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcercv_jb_hamsa} kg </Label>
                </div>

                {/* Total Transfer Amount */}
                <div className="flex mt-5 mx-8" style={{ display: successflag }}>
                    <Label className="w-1/4 pt-2 "> Total Transfer Amount </Label>
                    <Input className="w-1/4 justify-center items-center text-center bg-yellow-100" type='number' placeholder="Amount"
                        value={(
                            rcv_pw_210 + rcv_w_210 + rcv_ww_210 +
                            rcv_pw_240 + rcv_w_240 + rcv_ww_240 +
                            rcv_pw_280 + rcv_w_280 + rcv_ww_280 +
                            rcv_pw_320 + rcv_w_320 + rcv_ww_320 +
                            rcv_pw_360 + rcv_w_360 + rcv_ww_360 +
                            rcv_pw_400 + rcv_w_400 + rcv_ww_400 +
                            rcv_jb_mayur + rcv_jb_hamsa
                        ).toFixed(2)} required />
                    <Label className="w-1/4 pt-2 text-red-500 text-center">Source Final Backlog : </Label>
                    <Label className="w-1/4 pt-2 ">{fsourcebacklog} kg </Label>
                </div>

                <Table className="mt-8">



                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center">Sl No.</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Lot_No</TableHead>
                        <TableHead className="text-center">Origin</TableHead>
                        <TableHead className="text-center">Previous PW_210</TableHead>
                        <TableHead className="text-center">Current PW_210</TableHead>

                        <TableHead className="text-center">Previous W_210</TableHead>
                        <TableHead className="text-center">Current W_210</TableHead>

                        <TableHead className="text-center">Previous WW_210</TableHead>
                        <TableHead className="text-center">Current WW_210</TableHead>

                        <TableHead className="text-center">Previous PW_240</TableHead>
                        <TableHead className="text-center">Current PW_240</TableHead>

                        <TableHead className="text-center">Previous W_240</TableHead>
                        <TableHead className="text-center">Current W_240</TableHead>

                        <TableHead className="text-center">Previous WW_240</TableHead>
                        <TableHead className="text-center">Current WW_240</TableHead>

                        <TableHead className="text-center">Previous PW_280</TableHead>
                        <TableHead className="text-center">Current PW_280</TableHead>

                        <TableHead className="text-center">Previous W_280</TableHead>
                        <TableHead className="text-center">Current W_280</TableHead>

                        <TableHead className="text-center">Previous WW_280</TableHead>
                        <TableHead className="text-center">Current Ww_280</TableHead>

                        <TableHead className="text-center">Previous PW_320</TableHead>
                        <TableHead className="text-center">Current PW_320</TableHead>

                        <TableHead className="text-center">Previous W_320</TableHead>
                        <TableHead className="text-center">Current W_320</TableHead>

                        <TableHead className="text-center">Previous WW_320</TableHead>
                        <TableHead className="text-center">Current WW_320</TableHead>

                        <TableHead className="text-center">Previous PW_360</TableHead>
                        <TableHead className="text-center">Current PW_360</TableHead>

                        <TableHead className="text-center">Previous W_360</TableHead>
                        <TableHead className="text-center">Current W_360</TableHead>

                        <TableHead className="text-center">Previous WW_360</TableHead>
                        <TableHead className="text-center">Current WW_360</TableHead>

                        <TableHead className="text-center">Previous PW_400</TableHead>
                        <TableHead className="text-center">Current PW_400</TableHead>

                        <TableHead className="text-center">Previous W_400</TableHead>
                        <TableHead className="text-center">Current W_400</TableHead>

                        <TableHead className="text-center">Previous WW_400</TableHead>
                        <TableHead className="text-center">Current WW_400</TableHead>

                        <TableHead className="text-center">Previous JB_Mayur</TableHead>
                        <TableHead className="text-center">Current JB_Mayur</TableHead>

                        <TableHead className="text-center">Previous JB_Hamsa</TableHead>
                        <TableHead className="text-center">Current JB_Hamsa</TableHead>


                        <TableHead className="text-center">Current Backlog</TableHead>
                        <TableHead className="text-center">Final Backlog</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="boiling-row-height-scoop">
                            <TableCell className="text-center ">1</TableCell>
                            <TableCell className="text-center font-semibold  flex">Source<CircleArrowRight size={30} color="red" />  </TableCell>

                            <TableCell className="text-center font-semibold text-red-500">{props.borma ? props.borma.LotNo : ''}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ? props.borma.origin : ''}</TableCell>
                            <TableCell className="text-center bg-cyan-100">{props.borma ? props.borma.rcv_pw_210 : 0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_pw_210 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-red-100">{props.borma ? props.borma.rcv_w_210 : 0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_w_210 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-yellow-100">{props.borma ? props.borma.rcv_ww_210 : 0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_ww_210 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-green-100">{props.borma ? props.borma.rcv_pw_240 : 0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_pw_240 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-yellow-100">{props.borma ? props.borma.rcv_w_240 : 0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_w_240 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-red-100">{props.borma ? props.borma.rcv_ww_240 : 0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_ww_240 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-cyan-100">{props.borma ? props.borma.rcv_pw_280 : 0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_pw_280 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-red-100">{props.borma ? props.borma.rcv_w_280 : 0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_w_280 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-yellow-100">{props.borma ? props.borma.rcv_ww_280 : 0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_ww_280 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-green-100">{props.borma ? props.borma.rcv_pw_320 : 0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_pw_320 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-red-100">{props.borma ? props.borma.rcv_w_320 : 0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_w_320 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-yellow-100">{props.borma ? props.borma.rcv_ww_320 : 0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_ww_320 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-green-100">{props.borma ? props.borma.rcv_pw_360 : 0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_pw_360 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-red-100">{props.borma ? props.borma.rcv_w_360 : 0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_w_360 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-yellow-100">{props.borma ? props.borma.rcv_ww_360 : 0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_ww_360 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-green-100">{props.borma ? props.borma.rcv_pw_400 : 0}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? fsourcercv_pw_400 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-red-100">{props.borma ? props.borma.rcv_w_400 : 0}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? fsourcercv_w_400 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-yellow-100">{props.borma ? props.borma.rcv_ww_400 : 0}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? fsourcercv_ww_400 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-cyan-100">{props.borma ? props.borma.rcv_jb_mayur : 0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_jb_mayur : 'NA'}</TableCell>

                            <TableCell className="text-center bg-cyan-100">{props.borma ? props.borma.rcv_jb_hamsa : 0}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? fsourcercv_jb_hamsa : 'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-red-500">{props.borma ? props.borma.current_backlog : 0}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? fsourcebacklog : 'NA'}</TableCell>
                        </TableRow>
                        <TableRow className="boiling-row-height-scoop" style={{ display: successflagtable }}>
                            <TableCell className="text-center ">2</TableCell>
                            <TableCell className="text-center font-semibold  flex">Target<CircleArrowLeft size={30} color="green" /></TableCell>
                            <TableCell className="text-center font-semibold text-green-600 ">{destlot ? destlot : 'NA'}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{destorigin ? destorigin : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-cyan-100">{datarcv.rcv_pw_210 ? datarcv.rcv_pw_210 : ''}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_pw_210 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-red-100 ">{datarcv.rcv_w_210 ? datarcv.rcv_w_210 : ''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_w_210 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_ww_210 ? datarcv.rcv_ww_210 : ''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_ww_210 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-green-100">{datarcv.rcv_pw_240 ? datarcv.rcv_pw_240 : ''}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? destrcv_pw_240 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_w_240 ? datarcv.rcv_w_240 : ''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_w_240 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-red-100">{datarcv.rcv_ww_240 ? datarcv.rcv_ww_240 : ''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_ww_240 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-cyan-100">{datarcv.rcv_pw_280 ? datarcv.rcv_pw_280 : ''}</TableCell>
                            <TableCell className="text-center bg-cyan-100 font-semibold ">{successflag ? destrcv_pw_280 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-red-100">{datarcv.rcv_w_280 ? datarcv.rcv_w_280 : ''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_w_280 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_ww_280 ? datarcv.rcv_ww_280 : ''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_ww_280 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-green-100">{datarcv.rcv_pw_320 ? datarcv.rcv_pw_320 : ''}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? destrcv_pw_320 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-red-100">{datarcv.rcv_w_320 ? datarcv.rcv_w_320 : ''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_w_320 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_ww_320 ? datarcv.rcv_ww_320 : ''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_ww_320 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-green-100">{datarcv.rcv_pw_360 ? datarcv.rcv_pw_360 : ''}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? destrcv_pw_360 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-red-100">{datarcv.rcv_w_360 ? datarcv.rcv_w_360 : ''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_w_360 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_ww_360 ? datarcv.rcv_ww_360 : ''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_ww_360 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-green-100">{datarcv.rcv_pw_400 ? datarcv.rcv_pw_400 : ''}</TableCell>
                            <TableCell className="text-center bg-green-100 font-semibold ">{successflag ? destrcv_pw_400 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-red-100">{datarcv.rcv_w_400 ? datarcv.rcv_w_400 : ''}</TableCell>
                            <TableCell className="text-center bg-red-100 font-semibold ">{successflag ? destrcv_w_400 : 'NA'}</TableCell>

                            <TableCell className="text-center  bg-yellow-100">{datarcv.rcv_ww_400 ? datarcv.rcv_ww_400 : ''}</TableCell>
                            <TableCell className="text-center bg-yellow-100 font-semibold ">{successflag ? destrcv_ww_400 : 'NA'}</TableCell>

                            <TableCell className="text-center bg-cyan-100">{datarcv.rcv_jb_mayur ? datarcv.rcv_jb_mayur : ''}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? destrcv_jb_mayur : 'NA'}</TableCell>

                            <TableCell className="text-center bg-cyan-100">{datarcv.rcv_jb_hamsa ? datarcv.rcv_jb_hamsa : ''}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? destrcv_jb_hamsa : 'NA'}</TableCell>

                            <TableCell className="text-center font-semibold text-green-600 ">{datarcv.current_backlog ? datarcv.current_backlog : ''}</TableCell>
                            <TableCell className="text-center font-semibold text-green-500">{successflag ? destbacklog : 'NA'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <span className="w-100 text-center ml-6 no-margin " style={{ display: successflag }}>
                    <Button className="bg-slate-500 h-8 mt-4" onClick={handleMix} disabled={isdisable}>{isdisable ? 'Submitting' : 'Submit'}</Button></span>


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
export default RCNWholesReMix