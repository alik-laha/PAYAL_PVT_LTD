import { useRef, useState } from "react"
import { Origin } from "../common/exportData"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'

const QRThreshold = () => {
    const [gradeN, setGradeN] = useState<string>()
    //const [grade, setGrade] = useState<findskutypeData[]>([])
    const [gradeview, setGradeView] = useState("none")
    const [gradeData, setGradeData] = useState<any[]>([])
    const [origin, setOrigin] = useState<string>('')
    const thqtyRef = useRef<HTMLInputElement>(null)
    const thqtyBcktRef = useRef<HTMLInputElement>(null)
    const [errortext, setErrorText] = useState<string>("")

    const successdialog = document.getElementById('qrmachinescs') as HTMLInputElement;
        const errordialog = document.getElementById('qrmachineerror') as HTMLInputElement;
        // const dialog = document.getElementById('myDialog');
        const closeDialogButton = document.getElementById('qrmachinescsbtn') as HTMLInputElement;
        const errorcloseDialogButton = document.getElementById('qrmachineerrorbtn') as HTMLInputElement;
    
        if (closeDialogButton) {
            closeDialogButton.addEventListener('click', () => {
                if (successdialog != null) {
                    (successdialog as any).close();
                    //window.location.reload()
                    setGradeN('')
                    setOrigin('')
                    if(thqtyRef.current){
                        thqtyRef.current.value=''
                    }
                    if(thqtyBcktRef.current){
                        thqtyBcktRef.current.value=''
                    }
                        
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

    const addThreshold = async () => {

        if (!thqtyRef.current?.value || !thqtyBcktRef.current?.value ||!origin || !gradeN) {
            setErrorText("All Fields are Required ");
            (errordialog as any).showModal();
            return;
        }

        try {
            const apires = await axios.post("/api/qrOperation/createStock", { threshold: thqtyRef.current?.value, 
                thresholdBucket:thqtyBcktRef.current?.value,
                origin, gradeName: gradeN });
            setErrorText(apires.data.message || "Threshold Created successfully");
             if(successdialog!=null){
                 (successdialog as any).showModal();
             }
           
        } catch (error:any) {
            setErrorText(error.response?.data?.message || "Something went wrong");
           if(errordialog!=null){
                (errordialog as any).showModal();
            }
        }
    }
    return (

        <>
        <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Origin</Label>
                                    <select required value={origin} onChange={(e) => setOrigin(e.target.value)}
                                        className="w-2/4 h-8 text-center border-gray-500 text-xs flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                                        <option value='' disabled>Origin (All)</option>
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

                                <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Threshold Quantity</Label>
                                    <Input type='number' className="w-2/4 text-center border-gray-300" placeholder="Kg" ref={thqtyRef} step={0.01} required />
                                </div>

                                 <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">#️⃣ Threshold Bucket</Label>
                                    <Input type='number' className="w-2/4 text-center border-gray-300" placeholder="Pc" ref={thqtyBcktRef} step={1} required />
                                </div>
                                <div className="flex flex-col text-center items-center w-full">



                                    <Button className='w-1/4 mt-2 bg-orange-500' onClick={addThreshold}>Submit</Button>
                                </div>

                                <dialog id="qrmachinescs" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="qrmachinescsbtn" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="qrmachineerror" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="qrmachineerrorbtn" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        
        </>
    )

}

export default QRThreshold