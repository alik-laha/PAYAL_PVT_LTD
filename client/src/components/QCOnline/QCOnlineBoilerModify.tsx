import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import tick from "../../assets/Static_Images/Flat_tick_icon.svg.png"
import cross from "../../assets/Static_Images/error_img.png"
import { QC_Online_Status } from "../common/exportData"

type ModifyProps = {
  data: {
    id: number
    boiler1pressure: string | number
    boiler2pressure: string | number
    date: string
    time: string
    cleaningStatus: string
    cleanRemarks?: string
    maintainance: string
    maintainanceRemarks?: string
  }
}

const QCOnlineBoilerModify = (props: ModifyProps) => {
  // --- refs (editable like QCWaterModify) ---
  const boiler1Ref = useRef<HTMLInputElement>(null)
  const boiler2Ref = useRef<HTMLInputElement>(null)


  // --- state (editable like QCWaterModify/QCOnlineBoiler) ---
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [cleaningStatus, setCleaningStatus] = useState<string>("")
  const [maintenanceStatus, setMaintenanceStatus] = useState<string>("")
  const [cleanRemarks, setCleanRemarks] = useState<string>("")
  const [maintenanceRemarks, setMaintenanceRemarks] = useState<string>("")

  const [errortext, setErrorText] = useState<string>("")
  const [isDisable, setIsDisable] = useState<boolean>(false)

  // dialogs
  const successDialog = useRef<HTMLDialogElement>(null)
  const errorDialog = useRef<HTMLDialogElement>(null)

  // helpers
  const toHHMM = (t: string | undefined) => {
    if (!t) return ""
    // supports "HH:MM" or "HH:MM:SS"
    const parts = t.split(":")
    return parts.length >= 2 ? `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}` : t
  }

  useEffect(() => {
    const d = props?.data
    if (!d) return

    setDate(d.date ? d.date.slice(0, 10) : "")
    setTime(toHHMM(d.time))
    setCleaningStatus(d.cleaningStatus || "")
    setMaintenanceStatus(d.maintainance || "")

    // Fill remarks into controlled state so Textarea shows them
    setCleanRemarks(d.cleanRemarks ?? "")
    setMaintenanceRemarks(d.maintainanceRemarks ?? "")

    // Prefill inputs via ref if possible (fallback)
    if (boiler1Ref.current) boiler1Ref.current.value = String(d.boiler1pressure ?? "")
    if (boiler2Ref.current) boiler2Ref.current.value = String(d.boiler2pressure ?? "")
  }, [props?.data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)

    const payload = {
      boiler1pressure: boiler1Ref.current?.value,
      boiler2pressure: boiler2Ref.current?.value,
      date,
      time,
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarks : "",
      // backend uses "maintainance" spelling
      maintainance: maintenanceStatus,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarks : "",
    }

    axios
      .post(`/api/qconline/editQCOnlineBoiler/${props.data.id}`, payload)
      .then((res) => {
        if (res.status === 200) successDialog.current?.showModal()
      })
      .catch((err) => {
        setErrorText(err.response?.data?.message || "Something went wrong")
        errorDialog.current?.showModal()
      })
      .finally(() => setIsDisable(false))
  }

  return (
    <>
      <div className="pb-6 px-6">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* Date */}
          <div className="flex mt-1">
            <Label className="w-2/4 pt-1">Date</Label>
            <Input
              className="w-2/4 text-center justify-center bg-yellow-100"
              placeholder="Date"
              value={date}
              type="date"
             readOnly
              required
            />
          </div>

          {/* Time */}
          <div className="flex mt-1">
            <Label className="w-2/4 pt-1">Time</Label>
            <Input
              className="w-2/4 text-center justify-center bg-yellow-100"
              placeholder="Time"
              value={time}
              type="time"
                readOnly
              required 
            />
          </div>

          {/* Boiler 1 */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Boiler 1 Pressure (Bar)</Label>
            <Input
              className="w-2/4 text-center"
              ref={boiler1Ref}
              type="number"
              step="0.01"
              required
              placeholder="Pressure"
            />
          </div>

          {/* Boiler 2 */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Boiler 2 Pressure (Bar)</Label>
            <Input
              className="w-2/4 text-center"
              ref={boiler2Ref}
              type="number"
              step="0.01"
              required
              placeholder="Pressure"
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
                  {QC_Online_Status.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

           {cleaningStatus === "NOT OK" && (
            <div className="flex">
              <Label className="w-2/4 pt-1">Cleaning Remarks</Label>
              <Textarea
                className="w-2/4 text-center"
                value={cleanRemarks}
                onChange={(e) => setCleanRemarks(e.target.value)}
                required
              />
            </div>
          )}

          {/* Maintenance Status */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Maintenance Status</Label>
            <Select value={maintenanceStatus} onValueChange={(val) => setMaintenanceStatus(val)} required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Status.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {maintenanceStatus === "NOT OK" && (
            <div className="flex">
              <Label className="w-2/4 pt-1">Maintenance Remarks</Label>
              <Textarea
                className="w-2/4 text-center"
                value={maintenanceRemarks}
                onChange={(e) => setMaintenanceRemarks(e.target.value)}
                required
              />
            </div>
          )}

          <Button className="bg-blue-500 mt-4 mx-20" disabled={isDisable}>
            {isDisable ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <dialog ref={successDialog} className="dashboard-modal">
        <button
          className="dashboard-modal-close-btn"
          onClick={() => {
            successDialog.current?.close()
            window.location.reload()
          }}
        >
          X
        </button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">Online QC Boiler Modification Submitted!</p>
        </span>
      </dialog>

      {/* Error Dialog */}
      <dialog ref={errorDialog} className="dashboard-modal">
        <button
          className="dashboard-modal-close-btn"
          onClick={() => errorDialog.current?.close()}
        >
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

export default QCOnlineBoilerModify
