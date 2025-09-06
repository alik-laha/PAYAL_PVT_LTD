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
import { QC_Online_Status } from "../common/exportData" // ["OK","NOT OK","NA"]
import { Textarea } from "../ui/textarea"

const QCOnlineGrading = () => {
  const [errortext, setErrorText] = useState<string>("")
  const [isdisable, setIsDisable] = useState<boolean>(false)

  const vibrator1Ref = useRef<HTMLInputElement>(null)
  const vibrator2Ref = useRef<HTMLInputElement>(null)
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [cleaningStatus, setCleaningStatus] = useState<string>("")
  const [maintenanceStatus, setMaintenanceStatus] = useState<string>("")
  const cleanRemarksRef = useRef<HTMLTextAreaElement>(null)
  const maintenanceRemarksRef = useRef<HTMLTextAreaElement>(null)

  const successdialog = document.getElementById("successDialog") as HTMLDialogElement
  const errordialog = document.getElementById("errorDialog") as HTMLDialogElement

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)

    const payload = {
      vibratorspeed1: vibrator1Ref.current?.value,
      vibratorspeed2: vibrator2Ref.current?.value,
      date,
      time,
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarksRef.current?.value : "",
      maintainance: maintenanceStatus,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarksRef.current?.value : "",
    }

    axios.post("/api/vibrator/create", payload)
      .then(() => {
        if (successdialog) successdialog.showModal()
        // reset form
        vibrator1Ref.current!.value = ""
        vibrator2Ref.current!.value = ""
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
            <Input
              className="w-2/4 text-center justify-center"
              placeholder="Date"
              value={date}
              type="date"
              readOnly
              required
            />
          </div>

          <div className="flex mt-1">
            <Label className="w-2/4 pt-1">Time</Label>
            <Input
              className="w-2/4 text-center justify-center"
              placeholder="Time"
              value={time}
              type="time"
              readOnly
              required
            />
          </div>

          <div className="flex">
            <Label className="w-2/4 pt-1">Vibrator Speed 1 </Label>
            <Input
              className="w-2/4 text-center"
              ref={vibrator1Ref}
              type="number"
              step="0.01"
              required placeholder="speed"
            />
          </div>

          <div className="flex">
            <Label className="w-2/4 pt-1">Vibrator Speed 2 </Label>
            <Input
              className="w-2/4 text-center"
              ref={vibrator2Ref}
              type="number"
              step="0.01"
              required placeholder="speed"
            />
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
        <button className="dashboard-modal-close-btn" onClick={() => successdialog?.close()}>
          X
        </button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">QC-Online Grading entry created successfully!</p>
        </span>
      </dialog>

      {/* Error Dialog */}
      <dialog id="errorDialog" className="dashboard-modal">
        <button className="dashboard-modal-close-btn" onClick={() => errordialog?.close()}>
          X
        </button>
        <span className="flex">
          <img src={cross} height={25} width={25} alt="error" />
          <p className="pl-3 mt-1 font-medium">{errortext}</p>
        </span>
      </dialog>
    </>
  )
}

export default QCOnlineGrading
