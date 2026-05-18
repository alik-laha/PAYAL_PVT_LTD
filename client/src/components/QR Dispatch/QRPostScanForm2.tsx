// 🔥 SAME IMPORTS AS BEFORE
import { useEffect, useState } from "react"
//import { Label } from "@/components/ui/label"
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
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import {
    AlertDialog,
    AlertDialogAction,

    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import { Textarea } from "../ui/textarea"
import { Repack_Sections } from "../common/exportData"
import axios from "axios"
import QRScanner2 from "./QRScanner2"




const QRPostScanForm2 = () => {
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [operation, setOperation] = useState<"dispatch" | "repacking" | "">("")
    const [vehicleNo, setVehicleNo] = useState("")
    const [partyName, setPartyName] = useState("")
    const [remarks, setRemarks] = useState("")
    const [place, setPlace] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [isScanning, setIsScanning] = useState(false)
    const [scannedList, setScannedList] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [errortext, setErrorText] = useState<string>("")

    useEffect(() => {
        setDate(new Date().toISOString().slice(0, 10))
        setTime(new Date().toTimeString().slice(0, 5))
    }, [])

    /* ---------- Start Scan ---------- */
    const startScan = () => {
        if (operation === "dispatch" && (!vehicleNo || !partyName)) {
            //alert("Vehicle & Party required")
            setErrorText('Vehicle and Party Are Mandatory For Dispatch-Scan');
            setErrorOpen(true);
            return

        }
        if (operation === "repacking" && !place) {
            //alert("Section required")
            setErrorText('Section Is Mandatory For RePack-Scan');
            setErrorOpen(true);
            return
        }
        setIsScanning(true)
    }

    /* ---------- Handle Scan ---------- */
    const handleScan = (code: string) => {
        setScannedList(prev => {
            if (prev.includes(code)) return prev
            return [...prev, code]
        })
    }

    /* ---------- Bulk Submit ---------- */
    const handleBulkSubmit = async () => {
        if (scannedList.length === 0) return
        setLoading(true)

        try {
            const res = await axios.put('/api/qrOperation/updateStatusBulk', {
                operation,
                vehicleNo,
                partyName,
                remarks,
                place,
                date,
                time,
                qr_ids: scannedList
            })

            setIsScanning(false)
            //alert("Bulk update success")
            setErrorText(res.data.message);
            setSuccessOpen(true);   // ✅ only open success dialog
            setScannedList([])
            setOperation("");
            setVehicleNo("");
            setPartyName("");
            setPlace("");
            setRemarks("");
        } catch (error: any) {
            //alert("Bulk update failed")
            setErrorText(error.response.data.message || "Error while updating status");
            //setisdisable(false);
            setErrorOpen(true);     // ✅ only open error dialog
        }

        setLoading(false)
    }

    return (
        <>
            {!isScanning && (
                <div className="p-6 flex flex-col gap-4">

                    <div className="flex justify-between text-sm font-bold">
                        <span>⏱ {time}</span>
                        <span>📅 {date}</span>
                    </div>

                    <Select value={operation} onValueChange={(v: any) => setOperation(v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Operation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dispatch">Dispatch</SelectItem>
                            <SelectItem value="repacking">Repacking</SelectItem>
                        </SelectContent>
                    </Select>

                    {operation === "dispatch" && (
                        <>
                            <Input placeholder="Vehicle No" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} />
                            <Input placeholder="Party Name" value={partyName} onChange={e => setPartyName(e.target.value)} />
                        </>
                    )}

                    {operation === "repacking" && (
                        <Select value={place} onValueChange={setPlace}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Repack_Sections.map(item => (
                                        <SelectItem key={item} value={item}>{item}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}

                    <Textarea placeholder="Remarks" value={remarks} onChange={e => setRemarks(e.target.value)} />

                    <Button
                        className="bg-green-600 text-white"
                        disabled={!operation}
                        onClick={startScan}
                    >
                        Start Bulk Scan
                    </Button>
                </div>
            )}

            {isScanning && (
                <div className="flex flex-col items-center gap-4 p-4">

                    {/* <QRScannerFinal
                        onResult={handleScan}
                        onStop={() => {
                            setIsScanning(false)
                            // Reset counter
                            setScannedList([]);

                            // Reset form fields (optional)
                            setOperation("");
                            setVehicleNo("");
                            setPartyName("");
                            setPlace("");
                            setRemarks("");
                        }


                        }
                    /> */}
                        {/* <QRScanner onScan={handleScan} className=""/> */}
                        <QRScanner2 onScan={handleScan} />
                    <div className="text-center mt-4">
                        <p className="text-xl font-bold text-green-600">
                            Scanned: {scannedList.length}
                        </p>

                        <Button
                            className="mt-3 bg-blue-600 text-white"
                            onClick={handleBulkSubmit}
                            disabled={loading || scannedList.length === 0}
                        >
                            {loading ? "Submitting..." : "Submit All"}
                        </Button>
                    </div>
                </div>
            )}
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
                                //setPaused(false);      // ✅ resume scanning
                                setIsScanning(false)
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
                                //setPaused(false);   // ✅ retry scan
                                setIsScanning(false)
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

export default QRPostScanForm2
