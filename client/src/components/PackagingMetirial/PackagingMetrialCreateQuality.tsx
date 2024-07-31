import { Input } from "../ui/input"
import { Label } from "../ui/label"

import { Button } from "../ui/button"
import { useState, useRef } from "react"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import axios from "axios"
// import axios from "axios";

const PackagingMetirialQcCreateForm = ({ id }: { id: number }) => {
    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [gsm, setGsm] = useState(0)
    const [avgWeight, setAvgWeight] = useState(0)
    const [leakageTest, setLeakageTest] = useState('')
    const [dropTest, setDropTest] = useState('')
    const [sealCondition, setSealCondition] = useState('')
    const [labelingCondition, setLabelingCondition] = useState('')
    const [coa, setCoa] = useState('')
    const [foodGradeCirtiicate, setFoodGradeCirtiicate] = useState('')
    const [remarks, setRemarks] = useState('')
    const [foodGradeCirtiFicateFile, setFoodGradeCirtiFicateFile] = useState<any>()
    const [damagePartsImage, setDamagePartsImage] = useState<any>()
    const [coaCirtificateFile, setCoaCirtificateFile] = useState<any>()
    const dateRef = useRef<HTMLInputElement>(null)

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
        const testingDate = dateRef.current?.value
        const formData = new FormData()
        formData.append('length', length.toString())
        formData.append('width', width.toString())
        formData.append('height', height.toString())
        formData.append('gsm', gsm.toString())
        formData.append('avgWeight', avgWeight.toString())
        formData.append('leakageTest', leakageTest)
        formData.append('dropTest', dropTest)
        formData.append('sealCondition', sealCondition)
        formData.append('labelingCondition', labelingCondition)
        formData.append('coa', coa)
        formData.append('foodGradeCirtiicate', foodGradeCirtiicate)
        formData.append('remarks', remarks)
        formData.append('foodGradeCirtiFicateFile', foodGradeCirtiFicateFile)
        formData.append('coaCirtificateFile', coaCirtificateFile)
        formData.append('testingDate', testingDate as string)
        if (damagePartsImage) {
            for (let i = 0; i < damagePartsImage.length; i++) {
                formData.append(`damagePartsImage`, damagePartsImage[i])
            }
        }
        axios.post(`/api/qcpackage/packaging_meterial_qc_entry/${id}`, formData)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    if (successdialog != null) {
                        (successdialog as any).showModal();
                    }
                }
                else {
                    if (errordialog != null) {
                        (errordialog as any).showModal();
                    }
                }
            })
            .catch((err) => {
                console.log(err)
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            })

    }
    const handleCoaFileChamge = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCoaCirtificateFile(e.target.files[0])
        }
    }
    const handleFoodGradeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFoodGradeCirtiFicateFile(e.target.files[0])
        }
    }
    const handleDamagePartsImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDamagePartsImage(e.target.files)
        }
    }

    return (
        <>
            <div className="pl-10 pr-10 mt-6">
                <form className='flex flex-col gap-1 ' onSubmit={handleSubmit}>

                    <div className="flex"><Label className="w-2/4  pt-2">Testing Date</Label>
                        <Input className="w-2/4 justify-center" placeholder="Testing Date" required ref={dateRef} type="date" />
                    </div>
                    <div className="flex"><Label className="w-2/4  pt-2">Width</Label>
                        <Input className="w-2/4 " placeholder="Width" required value={width} type="number" step="0.1" onChange={(e) => setWidth(parseInt(e.target.value))} />
                        <Label className="w-2/4  pt-2">Length</Label>
                        <Input className="w-2/4 justify-center" placeholder="Length" required type="number" step="0.01" value={length} onChange={(e) => setLength(parseInt(e.target.value))} />
                    </div>

                    <div className="flex"><Label className="w-2/4  pt-2">Height</Label>
                        <Input className="w-2/4 " placeholder="Height" required value={height} type="number" onChange={(e) => setHeight(parseInt(e.target.value))} step="0.1" />
                        <Label className="w-2/4  pt-2">GSM</Label>
                        <Input className="w-2/4 " placeholder="GSM" required value={gsm} type="number" onChange={(e) => setGsm(parseInt(e.target.value))} step="0.1" />
                    </div>

                    <div className="flex"><Label className="w-2/4  pt-2">Avg Weight</Label>
                        <Input className="w-2/4 " placeholder="Avg Weight" required value={avgWeight} type="number" onChange={(e) => setAvgWeight(parseInt(e.target.value))} step="0.1" /> </div>

                    <div className="flex"><Label className="w-2/4  pt-2">Leakage Test</Label>
                        <select className=' flex h-8 w-2/4 items-center justify-between rounded-md border border-input bg-background px-3 py-0.5 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 
                    disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setLeakageTest(e.target.value)} value={leakageTest}>

                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="">
                                NA
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="Pass">
                                Pass
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="Fail">
                                Fail
                            </option>

                        </select>
                        <Label className="w-2/4  pt-2">Drop Test</Label>
                        <select className=' flex h-8 w-2/4 items-center justify-between rounded-md border border-input bg-background px-3 py-0.5 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 
                    disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setDropTest(e.target.value)} value={dropTest}>

                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="">
                                NA
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="Pass">
                                Pass
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="Fail">
                                Fail
                            </option>

                        </select>
                    </div>


                    <div className="flex"><Label className="w-2/4  pt-2">Labeling Condition</Label>
                        <select className=' flex h-8 w-2/4 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 
                    disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setLabelingCondition(e.target.value)} value={labelingCondition}>

                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="">
                                NA
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="OK">
                                OK
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="Not OK">
                                Not Ok
                            </option>

                        </select>
                        <Label className="w-2/4  pt-2">Seal Condition</Label>
                        <select className=' flex h-8 w-2/4 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 
                    disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setSealCondition(e.target.value)} value={sealCondition} >

                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="">
                                NA
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="OK">
                                OK
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="Not OK">
                                Not Ok
                            </option>

                        </select>
                    </div>

                    <div className="flex"><Label className="w-2/4  pt-2">Coa Report</Label>
                        <select className=' flex h-8 w-2/4 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 
                    disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setCoa(e.target.value)} value={coa}>

                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="">
                                NA
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="Yes">
                                Yes
                            </option>
                        </select></div>

                    <div className="flex">
                        <Label className="w-2/4 pt-2 ">Coa File</Label>
                        <input type="file" accept="application/pdf,.xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple onChange={handleCoaFileChamge} />
                    </div>
                    <div className="flex"><Label className="w-2/4  pt-2">Food Grade Cirtificate</Label>
                        <select className=' flex h-8 w-2/4 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 
                    disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setFoodGradeCirtiicate(e.target.value)} >


                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="">
                                NA
                            </option>
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                                value="Yes">
                                Yes
                            </option>
                        </select></div>
                    <div className="flex">
                        <Label className="w-2/4 pt-2 ">Food Grade Report Upload</Label>
                        <input type="file" accept="application/pdf,.xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFoodGradeUpload} />
                    </div>
                    <div className="flex"><Label className="w-2/4  pt-1">Remarks</Label>
                        <Input className="w-2/4 " placeholder="Remarks" required value={remarks} onChange={(e) => setRemarks(e.target.value)} /> </div>

                    <div className="flex">
                        <Label className="w-2/4 pt-2 ">Damage Parts Upload</Label>
                        <input type="file" accept="image/png, image/jpeg, image/jpg" multiple onChange={handleDamagePartsImage} />
                    </div>

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