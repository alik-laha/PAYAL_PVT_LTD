
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState, useRef } from "react"

import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'



const RCNScoopingCreateForm = () => {
    const [origin, setOrigin] = useState<string>("")
    const [errortext, setErrorText] = useState<string>("")

    const blNoRef = useRef<HTMLInputElement>(null)
    const conNoRef = useRef<HTMLInputElement>(null)
    const truckNoRef = useRef<HTMLInputElement>(null)
    const blWeightRef = useRef<HTMLInputElement>(null)
    const netWeightRef = useRef<HTMLInputElement>(null)
    const noOfBagsRef = useRef<HTMLInputElement>(null)
    const dateRef = useRef<HTMLInputElement>(null)

    const successdialog = document.getElementById('myDialog') as HTMLInputElement;
    const errordialog = document.getElementById('errorDialog') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('closeDialog') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('errorcloseDialog') as HTMLInputElement;

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
                window.location.reload()
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const blNo = blNoRef.current?.value
        const conNo = conNoRef.current?.value
        const truckNo = truckNoRef.current?.value
        const blWeight = blWeightRef.current?.value
        const netWeight = netWeightRef.current?.value
        const noOfBags = noOfBagsRef.current?.value
        const date = dateRef.current?.value
        console.log({ origin, blNo, conNo, truckNo, blWeight, netWeight })
        axios.post('/api/rcnprimary/create', { origin, blNo, conNo, truckNo, blWeight, netWeight, noOfBags, date })
            .then((res) => {
                console.log(res.data.rcnPrimary.id)
                let g_id=res.data.rcnPrimary.id
                axios.post('/api/qcRcn/qcInitialEntry', { g_id , origin, blNo, conNo, date })
                .then((res) => {
                    console.log(res)
                    if (successdialog != null) {
                        (successdialog as any).showModal();
                    }
                    if (blNoRef.current != null) {
                        blNoRef.current.value = '';
                    }
                    if (conNoRef.current != null) {
                        conNoRef.current.value = '';
                    }
                    if (truckNoRef.current != null) {
                        truckNoRef.current.value = '';
                    }
                    if (blWeightRef.current != null) {
                        blWeightRef.current.value = '';
                    }
                    if (netWeightRef.current != null) {
                        netWeightRef.current.value = '';
                    }
                    if (noOfBagsRef.current != null) {
                        noOfBagsRef.current.value = '';
                    }
                    setOrigin('')
                }).catch((err) => {
                    console.log(err)
                })



            }).catch((err) => {
                console.log(err)
                // if (err.response.data.error.original.errno === 1062) {
                //     setErrorText('Duplicate Entry is Not Allowed')
                //     if (errordialog != null) {
                //         (errordialog as any).showModal();
                //     }
                //     return
                // }
                setErrorText(err.response.data.message)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }

            })

    }
    return (
        <>
            <div className="pl-10 pr-10">
               
                <Table className="mt-3">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Lot No</TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                   

                </TableHeader>
                <TableBody>
                    
                    </TableBody>
                    </Table>
                   
               


            </div>
            <dialog id="myDialog" className="dashboard-modal">
                <button id="closeDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">RCN Primary Entry Submitted Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="errorDialog" className="dashboard-modal">
                <button id="errorcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )


}
export default RCNScoopingCreateForm