import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
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
import { Origin, QC_Online_Status } from "../common/exportData"
import { Textarea } from "../ui/textarea"

interface QCOnlineHumidifierProps {
  data: {
    id: number
    LotNo: string
    pressure: string
    Origin: string
    date: string
    time: string
    cleaningStatus: string
    cleanRemarks: string
    maintainance: string
    maintainanceRemarks: string
  }

}

const EditQCOnlineHumidifier: React.FC<QCOnlineHumidifierProps> = ({ data }) => {
  const [errortext, setErrorText] = useState<string>("")
  const [isdisable, setIsDisable] = useState<boolean>(false)

  const [lotNo, setLotNo] = useState<string>("")
  const [moisture, setMoisture] = useState<string>("")
  const [origin, setOrigin] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [cleaningStatus, setCleaningStatus] = useState<string>("")
  const [cleanRemarks, setCleanRemarks] = useState<string>("")
  const [maintenanceStatus, setMaintenanceStatus] = useState<string>("")
  const [maintenanceRemarks, setMaintenanceRemarks] = useState<string>("")

  const successdialog = document.getElementById("successDialog") as HTMLDialogElement
  const errordialog = document.getElementById("errorDialog") as HTMLDialogElement

  useEffect(() => {
    if (data) {
      setLotNo(data.LotNo || "")
      setMoisture(data.pressure || "")
      setOrigin(data.Origin || "")
      setDate(data.date?.slice(0, 10) || "")
      setTime(data.time?.slice(0, 5) || "")
      setCleaningStatus(data.cleaningStatus || "")
      setCleanRemarks(data.cleanRemarks || "")
      setMaintenanceStatus(data.maintainance || "")
      setMaintenanceRemarks(data.maintainanceRemarks || "")
    }
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)

    const payload = {
      LotNo: lotNo,
      pressure:moisture,
      Origin: origin,
      date,
      time,
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarks : "",
      maintainance: maintenanceStatus,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarks : "",
    }

    axios.put(`/api/qconline/editQCOnlineHumidifier/${data.id}`, payload)
      .then(() => {
        if (successdialog) successdialog.showModal()
       
      })
      .catch((err) => {
        setErrorText(err.response?.data?.message || "Something went wrong")
        if (errordialog) errordialog.showModal()
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
            <Input className="w-2/4 text-center justify-center bg-yellow-100" value={date} type="date" onChange={(e) => setDate(e.target.value)} readOnly required />
          </div>

          {/* Time */}
          <div className="flex mt-1">
            <Label className="w-2/4 pt-1">Time</Label>
            <Input className="w-2/4 text-center justify-center bg-yellow-100" value={time} type="time" onChange={(e) => setTime(e.target.value)} readOnly required />
          </div>

          {/* Moisture */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Moisture % Before Peeling</Label>
            <Input className="w-2/4 text-center" value={moisture} onChange={(e) => setMoisture(e.target.value)} type="number" step="0.01" required />
          </div>

          {/* Lot No */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Lot No</Label>
            <Input className="w-2/4 text-center" value={lotNo} onChange={(e) => setLotNo(e.target.value)} required />
          </div>

          {/* Origin */}
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

          {/* Cleaning */}
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
              <Textarea className="w-2/4 text-center" value={cleanRemarks} onChange={(e) => setCleanRemarks(e.target.value)} required />
            </div>
          )}

          {/* Maintenance */}
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
              <Textarea className="w-2/4 text-center" value={maintenanceRemarks} onChange={(e) => setMaintenanceRemarks(e.target.value)} required />
            </div>
          )}

          <Button className="bg-blue-500 mt-4 mx-20" disabled={isdisable}>
            {isdisable ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <dialog id="successDialog" className="dashboard-modal">
        <button className="dashboard-modal-close-btn" onClick={() =>{ successdialog?.close()
            window.location.reload()
        }
        
        }>X</button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">QC Online Humidifier updated successfully!</p>
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

export default EditQCOnlineHumidifier
