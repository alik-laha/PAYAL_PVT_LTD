

import { Origin } from "../common/exportData"
import { useState, useRef, useEffect } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
//import { findskutypeData } from "@/type/type"
import { ScrollArea } from "../ui/scroll-area"


const QRDispatchCreate = () => {
    const [origin, setOrigin] = useState<string>('')

    const [errortext, setErrorText] = useState<string>("")
    const lotRef = useRef<HTMLInputElement>(null)
    //const gradeRef = useRef<HTMLInputElement>(null)
    const typeRef = useRef<HTMLInputElement>(null)

    const batchRef = useRef<HTMLInputElement>(null)
    const grossWtRef = useRef<HTMLInputElement>(null)
    const netWtRef = useRef<HTMLInputElement>(null)
    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [isdisable, setisdisable] = useState<boolean>(false)

    useEffect(() => {
        setDate(new Date().toISOString().slice(0, 10))
        setTime(new Date().toTimeString().slice(0, 5))

    }, [])

    const successdialog = document.getElementById('qrmachinescscreate') as HTMLInputElement;
    const errordialog = document.getElementById('qrmachineerrorcreate') as HTMLInputElement;
    // const dialog = document.getElementById('myDialog');
    const closeDialogButton = document.getElementById('qrmachinescsbtncreate') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('qrmachineerrorbtncreate') as HTMLInputElement;

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

    const [gradeN, setGradeN] = useState<string>()
    //const [grade, setGrade] = useState<findskutypeData[]>([])
    const [gradeview, setGradeView] = useState("none")
    const [gradeData, setGradeData] = useState<any[]>([])

    // useEffect(() => {
    //     axios.put('/api/vendorSKU/getItembySection/Final Grade', { section: 'Packing' })
    //         .then(res => {
    //             //console.log(res.data)
    //             setGrade(res.data)
    //             console.log(grade)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])

    const handleGradechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
        setGradeN(e.target.value)

        if (e.target.value.length > 0 && gradeData.length > 0) {
            setGradeView("block")
        } else {
            setGradeView("none")
        }
        axios.post("/api/vendorSKU/skudatafind/Packing", { sku: e.target.value, type: 'Final Grade' })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setGradeData(res.data.skuData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setGradeData([])
                }
            })

    }
    const handleGradeidClick = (item: any) => {
        // setSku(item.sku)
        setGradeN(item.sku)
        setGradeView("none")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!origin)return
        const lotNo = lotRef.current?.value
        //const gradeName = gradeRef.current?.value  
        const type = typeRef.current?.value
        const batchNo = batchRef.current?.value
        const grossWt = grossWtRef.current?.value
        const netWt = netWtRef.current?.value

        setisdisable(true)
        try {
            const res = await axios.post('/api/qrOperation/createQR', { lotNo, gradeName: gradeN, type, batchNo, grossWt, netWt, date, time, origin })
            console.log(res)
            setErrorText(res.data.message)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }
            if (lotRef.current != null) {
                lotRef.current.value = '';
            }

            // if(gradeRef.current!=null){
            //     gradeRef.current.value='';
            // }

            if (netWtRef.current != null) {
                netWtRef.current.value = '';
            }

            if (grossWtRef.current != null) {
                grossWtRef.current.value = '';
            }

            if (batchRef.current != null) {
                batchRef.current.value = '';
            }
            setOrigin('')
        }
        catch (err) {
            console.log(err);
            

            if (axios.isAxiosError(err)) {
                setErrorText(err.response?.data.message || 'An Unexpected Error Occured in Creating QR Entry')
            }
            else {
                setErrorText('An Unexpected Error Occured in Creating QR Entry')
            }
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        }

        finally {
            setisdisable(false)
        }


    }



    return (
        <>
            <div className="px-10">
                <form className='flex flex-col gap-2 mt-2' onSubmit={handleSubmit}>

                    <div className="flex">
                        <Label className="w-1/2 text-gray-700 text-sm  pt-1.5 text-left font-bold ">⏱️ Time : {time}</Label>
                        <Label className="w-1/2 text-gray-700 text-sm font-bold pt-1.5  text-right">📅 Date : {date}</Label>

                    </div>



                    <div className="flex mt-10">
                        <Label className="w-2/4 pt-1 font-bold text-gray-600 text-sm tracking-wider ">#️⃣ No. of Buckets</Label>
                        <Input className="w-2/4 text-center border-gray-300" placeholder="No" ref={typeRef} required type="number" step={1} defaultValue={1} /> </div>
                    <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Origin</Label>
                        


                        <select required value={origin} onChange={(e)=>setOrigin(e.target.value)} 
                            className="w-2/4 h-8 text-center border-gray-500 text-xs flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                            <option  value='' disabled>Origin (All)</option>
                                 {
                                        Origin.map((item) => {
                                            return (
                                                <option key={item} value={item} className="text-xs relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                                    {item}
                                                </option>
                                            )
                                        })
                                    }
                            
                        </select>
                        {/* <Input   placeholder="Section"/>  */}
                    </div>


                    <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Grade Name</Label>




                        <div className="flex flex-col gap-1 relative overflow-visible w-1/2">

                            <Input
                                className="text-center border-gray-300"
                                value={gradeN}
                                placeholder="Grade Name"
                                onChange={(e) => handleGradechange(e)}
                                required
                            />

                            {/* Dropdown should not push other content down */}
                            <div
                                className={`absolute top-full left-0 w-full mt-1 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 bg-white shadow-lg z-50 transition-all duration-200 ${gradeview === "block" ? "opacity-100 visible" : "opacity-0 invisible"
                                    }`}
                            >
                                <ScrollArea className="max-h-40 overflow-y-auto">
                                    {gradeData.length > 0 ? (
                                        gradeData.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className="px-3 py-2 text-xs text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer font-semibold"
                                                onClick={() => handleGradeidClick(item)}
                                            >
                                                {item.sku}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-gray-500 px-2 py-1">No results found</p>
                                    )}
                                </ScrollArea>
                            </div>
                        </div>









                    </div>
                    <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Lot No</Label>
                        <Input className="w-2/4 text-center border-gray-300" placeholder="Lot No" ref={lotRef} required/> </div>

                    <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Batch No</Label>
                        <Input className="w-2/4 text-center border-gray-300" placeholder="Batch No" ref={batchRef} required/> </div>


                    <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Gross Weight (Kg)</Label>
                        <Input type='number' className="w-2/4 text-center border-gray-300" placeholder="Gross Wt." ref={grossWtRef} step={0.01} required/> </div>


                    <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Net Weight (Kg)</Label>
                        <Input type='number' className="w-2/4 text-center border-gray-300" placeholder="Net Wt" ref={netWtRef} step={0.01} required/> </div>

                    <div className="flex justify-center">
                        <Button
                            className={`${isdisable
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600"
                                } text-white font-semibold rounded-md h-9 w-28 transition-all my-7`}
                            disabled={isdisable}
                        >
                            {isdisable ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>


            </div>
            <dialog id="qrmachinescscreate" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="qrmachinescsbtncreate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="qrmachineerrorcreate" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="qrmachineerrorbtncreate" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </>
    )
}
export default QRDispatchCreate

