import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { Button } from "../ui/button"
import { useState, useRef } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import axios from "axios";

const PackagingMetirialQcCreateForm = () => {
    const [length, setLength] = useState(0)
    const dateRef = useRef<HTMLInputElement>(null)
    const invoicedateRef = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)
    const invoiceref = useRef<HTMLInputElement>(null)

    const successdialog = document.getElementById('packageMetrialQc') as HTMLInputElement;
    const errordialog = document.getElementById('packagingMetirialQcError') as HTMLInputElement;
    const closeDialogButton = document.getElementById('packageMetrialQccross') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('packagigQcerrorcross') as HTMLInputElement;

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
        const receivingDate = dateRef.current?.value
        const quantity = quantityRef.current?.value
        const invoicedate = invoicedateRef.current?.value
        const invoice = invoiceref.current?.value
        axios.post("/api/quality/createrecivingpackagematerial", { recevingDate: receivingDate, sku, vendorName, quantity, unit, invoicedate, invoice })
            .then((res) => {
                console.log(res)
                axios.post("/api/qcpackage/qcpackaginginitialEntry", { id: res.data.newPackageMaterial.id }).then(() => {
                    (successdialog as any).showModal();
                })

            })
            .catch((err) => {
                console.log(err)
                if (errordialog !== null) {
                    (errordialog as any).showModal();
                }

            })
    }



    return (
        <>
            <div className="pl-10 pr-10 mt-6">
                <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

                    <div className="flex"><Label className="w-2/4  pt-1">Testing Date</Label>
                        <Input className="w-2/4 justify-center" placeholder="Receiving Date" required ref={dateRef} type="date" /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Length</Label>
                        <Input className="w-2/4 justify-center" placeholder="Receiving Date" required type="number" value={length} onChange={(e) => setLength(e.tsrget.vlaue)} /> </div>


                    <div className="flex"><Label className="w-2/4  pt-1">SKU</Label>
                        <Input className="w-2/4 " placeholder="SKU" required value={sku} onChange={handleSkuchange} /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Vendor Name</Label>
                        <Input className="w-2/4 " placeholder="Vendor Name" required value={vendorName} onChange={handleVendorChange} /> </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Invoice No</Label>
                        <Input className="w-2/4 " placeholder="Invoice No" required ref={invoiceref} /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Invoice Date</Label>
                        <Input className="w-2/4 justify-center" placeholder="Invoice Date" required ref={invoicedateRef} type="date" /> </div>

                    <div className="flex"><Label className="w-2/4  pt-1">Quantity</Label>
                        <Input className="w-2/4 " placeholder="Quantity" required type="number" ref={quantityRef} /> </div>

                    <Button className="bg-orange-500 mb-8 mt-6 ml-20 mr-20 text-center items-center justify-center">Submit</Button>
                </form>


            </div>

            <dialog id="packageMetrialQc" className="dashboard-modal">
                <button id="packageMetrialQccross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Packaging Material is Received Successfully</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="packagingMetirialQcError" className="dashboard-modal">
                <button id="packagigQcerrorcross" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">Error In Receiving Packaging Material</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )
}

export default PackagingMetirialQcCreateForm;