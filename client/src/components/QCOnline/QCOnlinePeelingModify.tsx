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
import { QC_Online_Status } from "../common/exportData"
import { Textarea } from "../ui/textarea"

type Props = {
  data: any // pass selected row data for editing
}

const PeelingModify = ({ data }: Props) => {
  const [errortext, setErrorText] = useState<string>("")
  const [isdisable, setIsDisable] = useState<boolean>(false)

  const [pressure, setPressure] = useState<string>("")
  const [peelingTime, setPeelingTime] = useState<string>("")
  const [unpeelPcntng, setUnpeelPcntng] = useState<string>("")
  const [cashewPcntng, setCashewPcntng] = useState<string>("")
  const [peelingQty, setPeelingQty] = useState<string>("")

  const [cleaningStatus, setCleaningStatus] = useState<string>("")
  const [maintenanceStatus, setMaintenanceStatus] = useState<string>("")
  const [cleanRemarks, setCleanRemarks] = useState<string>("")
  const [maintenanceRemarks, setMaintenanceRemarks] = useState<string>("")

  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")

  const successdialog = document.getElementById("successDialog") as HTMLDialogElement
  const errordialog = document.getElementById("errorDialog") as HTMLDialogElement

  useEffect(() => {
    if (data) {
      setPressure(data.pressure || "")
      setPeelingTime(data.peelingTime || "")
      setUnpeelPcntng(data.unpeelPcntng || "")
      setCashewPcntng(data.cashewPcntng || "")
      setPeelingQty(data.peelingQty || "")

      setCleaningStatus(data.cleaningStatus || "")
      setMaintenanceStatus(data.maintainance || "")
      setCleanRemarks(data.cleanRemarks || "")
      setMaintenanceRemarks(data.maintainanceRemarks || "")

      setDate(data.date?.slice(0, 10) || "")
      setTime(data.time || "")
    }
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)

    const payload = {
      pressure,
      peelingTime,
      unpeelPcntng,
      cashewPcntng,
      peelingQty,
      date,
      time,
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarks : "",
      maintainance: maintenanceStatus,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarks : "",
      modifiedBy: "admin",
    }

    axios.put(`/api/qconline/editQCOnlinePeeling/${data.id}`, payload)
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
            <Input
              className="w-2/4 text-center justify-center bg-yellow-100"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div className="flex mt-1">
            <Label className="w-2/4 pt-1">Time</Label>
            <Input
              className="w-2/4 text-center justify-center bg-yellow-100"
              value={time}
              type="time"
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* Pressure */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Pressure of Peeling MC</Label>
            <Input
              className="w-2/4 text-center"
              type="number"
              step="0.01"
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
              required
            />
          </div>

          {/* Peeling Time */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Peeling Time</Label>
            <Input
              className="w-2/4 text-center"
              type="text"
              value={peelingTime}
              onChange={(e) => setPeelingTime(e.target.value)}
              required
            />
          </div>

          {/* Peeling Qty */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Peeling MC Input Quantity</Label>
            <Input
              className="w-2/4 text-center"
              type="number"
              step="0.01"
              value={peelingQty}
              onChange={(e) => setPeelingQty(e.target.value)}
              required
            />
          </div>

          {/* Unpeel % */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Unpeel % in 250 gm</Label>
            <Input
              className="w-2/4 text-center"
              type="number"
              step="0.01"
              value={unpeelPcntng}
              onChange={(e) => setUnpeelPcntng(e.target.value)}
              required
            />
          </div>

          {/* Cashew % */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Cashew % in Husk</Label>
            <Input
              className="w-2/4 text-center"
              type="number"    step="0.0001"
              value={cashewPcntng}
              onChange={(e) => setCashewPcntng(e.target.value)}
              required
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
              <Textarea
                className="w-2/4 text-center"
                value={maintenanceRemarks}
                onChange={(e) => setMaintenanceRemarks(e.target.value)}
                required
              />
            </div>
          )}

          <Button className="bg-blue-500 mt-4 mx-20" disabled={isdisable}>
            {isdisable ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <dialog id="successDialog" className="dashboard-modal">
        <button
          className="dashboard-modal-close-btn"
          onClick={() => { successdialog?.close(); window.location.reload() }}
        >
          X
        </button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">QC Online Peeling updated successfully!</p>
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

export default PeelingModify
