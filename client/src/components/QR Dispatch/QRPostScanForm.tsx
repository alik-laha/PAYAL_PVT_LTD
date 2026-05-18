import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import { Repack_Sections } from "../common/exportData"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import axios from "axios"
//import QRScanner from "./QRScanComponent"
import {
  AlertDialog,
  AlertDialogAction,

  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import QRScanner2 from "./QRScanComponent2"

/* ---------- Props Type ---------- */
// type QRPostScanFormProps = {
//     barcodeId: string
// }

const QRPostScanForm = () => {
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [operation, setOperation] = useState<"dispatch" | "repacking" | "">("")
    const [vehicleNo, setVehicleNo] = useState("")
    const [partyName, setPartyName] = useState("")
    const [remarks, setRemarks] = useState("")
    const [place, setPlace] = useState("")

    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [isdisable, setisdisable] = useState<boolean>(false)
    const [errortext, setErrorText] = useState<string>("")
    const [paused, setPaused] = useState<boolean>(false);


    useEffect(() => {
        setDate(new Date().toISOString().slice(0, 10))
        setTime(new Date().toTimeString().slice(0, 5))

    }, [])
    const startScan=()=>{
        if(operation==='dispatch' && (!vehicleNo||!partyName)){
            setErrorText('Vehicle and Party Are Mandatory For Dispatch-Scan');
             setErrorOpen(true);
            return
        }
        if(operation==='repacking' && !place){
            setErrorText('Section Is Mandatory For RePack-Scan');
            setErrorOpen(true);
            return
        }
        setisdisable(true)
        setPaused(false);     // 🔥 RESET CAMERA
            
    }


    

    const handleSubmit = async (result: any) => {
        //e.preventDefault()
        //setisdisable(true);
        setPaused(true)
        const payload = {
            operation,
            vehicleNo,
            partyName,
            remarks,
            place,
            date,
            time,
            qr_id: result
        }

        try {
            const res = await axios.put('/api/qrOperation/updateStatus', payload);
            setErrorText(res.data.message);
            setSuccessOpen(true);   // ✅ only open success dialog
            
        } catch (error: any) {
            setErrorText(error.response.data.message || "Error while updating status");
            //setisdisable(false);
              setErrorOpen(true);     // ✅ only open error dialog
            
        }
        
    }

    return (<>
        {!isdisable && <div>
            <p className=" w-full text-center text-gray-800 text-lg py-3 font-bold tracking-wider">Barcode Scan Details</p>
            <div  className="px-8 pt-6 flex flex-col gap-4">

                <div className="flex">
                    <Label className="w-1/2 text-gray-700 text-sm  pt-1.5 text-left font-bold ">⏱️ Time : {time}</Label>
                    <Label className="w-1/2 text-gray-700 text-sm font-bold pt-1.5  text-right">📅 Date : {date}</Label>

                </div>

                {/* Barcode ID (Readonly) */}
                {/* <div className="flex mt-6">
                    <Label className="w-1/2 font-bold text-gray-600  text-sm pt-1">
                        Barcode ID
                    </Label>
                    <Input
                        className="w-1/2 bg-gray-100 cursor-not-allowed text-center border-gray-300"
                        value={barcodeId}

                    />
                </div> */}

                {/* Operation Select */}
                <div className="flex items-center">
                    <Label className="w-1/2 font-bold text-gray-600  text-sm">
                        Operation
                    </Label>
                    <Select value={operation} onValueChange={(v: "dispatch" | "repacking") => setOperation(v)}>
                        <SelectTrigger className="w-1/2 justify-center border-gray-300">
                            <SelectValue placeholder="Select Operation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dispatch">Dispatch</SelectItem>
                            <SelectItem value="repacking">Repacking</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {operation === "repacking" && <div className="flex"><Label className="w-2/4 text-gray-600 text-sm font-bold pt-1 tracking-wider ">Repacking Section</Label>
                    <Select value={place} onValueChange={(value) => setPlace(value)} required={true}>
                        <SelectTrigger className="w-2/4  justify-center border-gray-300">
                            <SelectValue placeholder="Section" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Repack_Sections.map((item) => {
                                        return (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* <Input   placeholder="Section"/>  */}
                </div>}

                {/* Dispatch Fields */}
                {operation === "dispatch" && (
                    <>
                        <div className="flex">
                            <Label className="w-1/2 font-bold text-gray-600  text-sm pt-1 ">
                                Vehicle No
                            </Label>
                            <Input
                                className="w-1/2 border-gray-300 text-center"
                                value={vehicleNo} placeholder="Vehicle No"
                                onChange={(e) => setVehicleNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex">
                            <Label className="w-1/2 font-bold text-gray-600  text-sm pt-1 ">
                                Party Name
                            </Label>
                            <Input
                                className="w-1/2 border-gray-300 text-center"
                                value={partyName} placeholder="Party Name"
                                onChange={(e) => setPartyName(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Remarks (Common) */}
                {(operation === "dispatch" || operation === "repacking") && (
                    <div className="flex">
                        <Label className="w-1/2 font-bold text-gray-600  text-sm pt-1  ">
                            Remarks
                        </Label>
                        <Textarea
                            className="w-1/2 border-gray-300" placeholder="Remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            required
                        />
                    </div>
                )}

                {/* Submit */}
                <div className="flex justify-center mt-6">
                    <Button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 w-32 text-white font-semibold"
                        disabled={!operation} onClick={()=>{startScan()}}
                    >
                        Start Scan
                    </Button>
                </div>
            </div>
        </div>}
        {
            isdisable && <QRScanner2 onResult={handleSubmit} paused={paused} setPaused={setPaused} 
            onStop={() => {
    setPaused(true);
    setisdisable(false);   // back to form
  }}/>
        }

        <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex items-center gap-2 text-green-600">
        <img src={tick} width={28} />
        Success
      </AlertDialogTitle>
    </AlertDialogHeader>

    <p className="text-sm text-gray-600">{errortext}</p>

    <AlertDialogFooter>
      <AlertDialogAction
        onClick={() => {
          setSuccessOpen(false);
          setPaused(false);      // ✅ resume scanning
        }}
      >
        Continue Scan
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

<AlertDialog open={errorOpen} onOpenChange={setErrorOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="flex items-center gap-2 text-red-600">
        <img src={cross} width={24} />
        Error
      </AlertDialogTitle>
    </AlertDialogHeader>

    <p className="text-sm text-gray-600">{errortext}</p>

    <AlertDialogFooter>
      <AlertDialogAction
        className="bg-red-600 hover:bg-red-700"
        onClick={() => {
          setErrorOpen(false);
          setPaused(false);   // ✅ retry scan
        }}
      >
        Retry Scan
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

        
    </>

    )
}

export default QRPostScanForm
