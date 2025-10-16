import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Origin, QC_Online_Status } from "../common/exportData" // ["OK","NOT OK","NA"]
import { Textarea } from "../ui/textarea"

const BormaNo_OPTIONS = ["Borma1", "Borma2", "Borma3", "Borma4", "Borma5","Borma6", "Borma7", "Borma8", "Borma9", "Borma10",
  "Borma11", "Borma12", "Borma13", "Borma14", "Borma15"
]

const QCOnlineBorma = () => {
  const [errortext, setErrorText] = useState<string>("")
  const [isdisable, setIsDisable] = useState<boolean>(false)

  const lotNoRef = useRef<HTMLInputElement>(null)
  const pressureRef = useRef<HTMLInputElement>(null)

  const [origin, setOrigin] = useState<string>("")
  const [bormaNo, setBormaNo] = useState<string>("")
  const [nwQuality, setNwQuality] = useState<string>("")
  const [burnQuality, setBurnQuality] = useState<string>("")

  const [cleaningStatus, setCleaningStatus] = useState<string>("")
  const [maintenanceStatus, setMaintenanceStatus] = useState<string>("")

  const cleanRemarksRef = useRef<HTMLTextAreaElement>(null)
  const maintenanceRemarksRef = useRef<HTMLTextAreaElement>(null)

  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")

  const successdialog = document.getElementById("successDialog") as HTMLDialogElement
  const errordialog = document.getElementById("errorDialog") as HTMLDialogElement

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)

    const payload = {
      LotNo: lotNoRef.current?.value,
      pressure: pressureRef.current?.value,
      Origin: origin,
      bormaNo,
      nwQuality,
      burnQuality,
      date,
      time,
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarksRef.current?.value : "",
      maintainance: maintenanceStatus,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarksRef.current?.value : "",
      createdBy: "admin", // TODO: replace with logged-in user
    }

    axios.post("/api/qconline/createQCOnlineBorma", payload)
      .then(() => {
        if (successdialog) successdialog.showModal()
        // reset
        lotNoRef.current!.value = ""
        pressureRef.current!.value = ""
        setOrigin("")
        setBormaNo("")
        setNwQuality("")
        setBurnQuality("")
        setCleaningStatus("")
        setMaintenanceStatus("")
        if (cleanRemarksRef.current) cleanRemarksRef.current.value = ""
        if (maintenanceRemarksRef.current) maintenanceRemarksRef.current.value = ""
      })
      .catch((err) => {
        setErrorText(err.response?.data?.message || "Something went wrong")
        if (errordialog) errordialog.showModal()
      })
      .finally(() => setIsDisable(false))
  }

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10))
    setTime(new Date().toTimeString().slice(0, 5))
  }, [])

  return (
    <>
      <div className="pb-6 px-6">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex mt-1">
            <Label className="w-2/4 pt-1">Date</Label>
            <Input className="w-2/4 text-center justify-center" value={date} type="date" readOnly required />
          </div>

          <div className="flex mt-1">
            <Label className="w-2/4 pt-1">Time</Label>
            <Input className="w-2/4 text-center justify-center" value={time} type="time" readOnly required />
          </div>

          

          <div className="flex">
            <Label className="w-2/4 pt-1">Pressure</Label>
            <Input className="w-2/4 text-center" ref={pressureRef} type="number" step="0.01" required placeholder="Pressure" />
          </div>
          <div className="flex">
            <Label className="w-2/4 pt-1">Lot No</Label>
            <Input className="w-2/4 text-center" ref={lotNoRef} required placeholder="Lot No" />
          </div>

          {/* Origin Dropdown */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Origin</Label>
            <Select value={origin} onValueChange={setOrigin} required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Origin.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Borma No Dropdown */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Borma MC No</Label>
            <Select value={bormaNo} onValueChange={setBormaNo} required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Borma No" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {BormaNo_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* NW Quality */}
          <div className="flex">
            <Label className="w-2/4 pt-1">NW Quality after Bormay</Label>
            <Select value={nwQuality} onValueChange={setNwQuality} required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Status.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Burn Quality */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Quality of Trolley after Borma (Burning)</Label>
            <Select value={burnQuality} onValueChange={setBurnQuality} required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Status.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Cleaning Status */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Cleaning Status</Label>
            <Select value={cleaningStatus} onValueChange={setCleaningStatus} required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Status.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {cleaningStatus === "NOT OK" && (
            <div className="flex">
              <Label className="w-2/4 pt-1">Cleaning Remarks</Label>
              <Textarea className="w-2/4 text-center" ref={cleanRemarksRef} required />
            </div>
          )}

          {/* Maintenance Status */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Maintenance Status</Label>
            <Select value={maintenanceStatus} onValueChange={setMaintenanceStatus} required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Status.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {maintenanceStatus === "NOT OK" && (
            <div className="flex">
              <Label className="w-2/4 pt-1">Maintenance Remarks</Label>
              <Textarea className="w-2/4 text-center" ref={maintenanceRemarksRef} required />
            </div>
          )}

          <Button className="bg-blue-500 mt-4 mx-20" disabled={isdisable}>
            {isdisable ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <dialog id="successDialog" className="dashboard-modal">
        <button className="dashboard-modal-close-btn" onClick={() => successdialog?.close()}>X</button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">QC Online Borma Reported successfully!</p>
        </span>
      </dialog>

      {/* Error Dialog */}
      <dialog id="errorDialog" className="dashboard-modal">
        <button className="dashboard-modal-close-btn" onClick={() => errordialog?.close()}>X</button>
        <span className="flex">
          <img src={cross} height={25} width={25} alt="error" />
          <p className="pl-3 mt-1 font-medium">{errortext}</p>
        </span>
      </dialog>
    </>
  )
}

export default QCOnlineBorma
