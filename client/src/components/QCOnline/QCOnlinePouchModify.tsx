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
import { ScrollArea } from "../ui/scroll-area"
import { findskutypeData } from "@/type/type"

type Props = {
  data: any // selected row data
}

const ModifyPoch = ({ data }: Props) => {
  const [errortext, setErrorText] = useState<string>("")
  const [isdisable, setIsDisable] = useState<boolean>(false)

  const [lotNo, setLotNo] = useState<string>("")
  const [batchNo, setBatchNo] = useState<string>("")
  const [origin, setOrigin] = useState<string>("")
  const [grade, setGrade] = useState<string>("")
  const [moisture, setMoisture] = useState<string>("")
  const [nutcount, setNutcount] = useState<string>("")
  const [avgWeight, setAvgWeight] = useState<string>("")

  const [pktQuality, setPktQuality] = useState<string>("")
  const [pktQualityRemarks, setPktQualityRemarks] = useState<string>("")

  const [cleaningStatus, setCleaningStatus] = useState<string>("")
  const [cleanRemarks, setCleanRemarks] = useState<string>("")

  const [maintenanceStatus, setMaintenanceStatus] = useState<string>("")
  const [maintenanceRemarks, setMaintenanceRemarks] = useState<string>("")
 const [Remarks, setRemarks] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")

   const [gradeview, setGradeView] = useState("none")
      const [gradeData, setGradeData] = useState<any[]>([])
      const [gradeD, setGradeD] = useState<findskutypeData[]>([])
      
  const successdialog = document.getElementById("successDialog") as HTMLDialogElement
  const errordialog = document.getElementById("errorDialog") as HTMLDialogElement

  useEffect(() => {
    console.log(data)
    if (data) {
        console.log(data)
      setLotNo(data.LotNo || "")
      setBatchNo(data.BatchNo || "")
      setOrigin(data.Origin || "")
      setGrade(data.Grade || "")
      setMoisture(data.moisture || "")
      setNutcount(data.nutcount || "")
      setAvgWeight(data.avgWeight || "")
      setPktQuality(data.pktQuality || "")
      setPktQualityRemarks(data.pktQualityRemarks || "")
      setCleaningStatus(data.cleaningStatus || "")
      setCleanRemarks(data.cleanRemarks || "")
      setMaintenanceStatus(data.maintainance || "")
      setMaintenanceRemarks(data.maintainanceRemarks || "")
      setRemarks(data.Remarks || "")
      setDate(data.date?.slice(0, 10) || "")
      setTime(data.time || "")
    }
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)

    const payload = {
      LotNo: lotNo,
      BatchNo: batchNo,
      Origin: origin,
      Grade: grade,
      moisture,
      nutcount,
      avgWeight,
      date,
      time,
      pktQuality,
      pktQualityRemarks: pktQuality === "NOT OK" ? pktQualityRemarks : "",
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarks : "",
      maintainance: maintenanceStatus,Remarks,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarks : "",
      modifiedBy: "admin", // TODO: replace with logged-in user
    }

    axios.put(`/api/qconline/editQCOnlinePouch/${data.id}`, payload)
      .then(() => {
        if (successdialog) successdialog.showModal()
      })
      .catch((err) => {
        setErrorText(err.response?.data?.message || "Something went wrong")
        if (errordialog) errordialog.showModal()
      })
      .finally(() => setIsDisable(false))
  }
  useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Final Grade', { section: 'Packing' })
            .then(res => {
                //console.log(res.data)
                setGradeD(res.data)
                console.log(gradeD)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleGradeidClick = ( item: any) => {
        // setSku(item.sku)
        setGrade(item.sku) 
        setGradeView("none")
    }

     const handleGradechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)

        setGrade(e.target.value)
      
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

          {/* Lot No */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Lot No</Label>
            <Input
              className="w-2/4 text-center"
              value={lotNo}
              onChange={(e) => setLotNo(e.target.value)}
              required
            />
          </div>

          {/* Batch No */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Batch No</Label>
            <Input
              className="w-2/4 text-center"
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
              required
            />
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

          {/* Grade Dropdown */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Grade</Label>
            <Input
              value={grade}
              placeholder="Final Grade"
              className="w-2/4 text-center"
              onChange={(e) => handleGradechange(e)}
              required
            />
          </div>
          <ScrollArea
            className="max-h-24 w-2/4 overflow-scroll dropdown-content w-30"
            style={{ display: gradeview }}>
            {gradeData.map((item: any) => (
              <div
                key={item.id}
                className="flex gap-y-10 gap-x-4 hover:bg-gray-300 pl-3"
                onClick={() => handleGradeidClick(item)}>
                <p className="font-medium text-sm text-blue-900 py-1 focus:text-base">
                  {item.sku}
                </p>
              </div>
            ))}
          </ScrollArea>

          {/* Moisture */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Moisture %</Label>
            <Input
              className="w-2/4 text-center"
              type="number"
              step="0.01"
              value={moisture}
              onChange={(e) => setMoisture(e.target.value)}
              required
            />
          </div>

          {/* Nutcount */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Nut Count</Label>
            <Input
              className="w-2/4 text-center"
           
              value={nutcount}
              onChange={(e) => setNutcount(e.target.value)}
              required
            />
          </div>

          {/* Avg Weight */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Avg. Weight</Label>
            <Input
              className="w-2/4 text-center"
              type="number"
              step="0.01"
              value={avgWeight}
              onChange={(e) => setAvgWeight(e.target.value)}
              required
            />
          </div>

          {/* Packet Quality */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Packet Quality</Label>
            <Select value={pktQuality} onValueChange={setPktQuality} required>
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

          {pktQuality === "NOT OK" && (
            <div className="flex">
              <Label className="w-2/4 pt-1">Packet Quality Remarks</Label>
              <Textarea
                className="w-2/4 text-center"
                value={pktQualityRemarks}
                onChange={(e) => setPktQualityRemarks(e.target.value)}
                required
              />
            </div>
          )}

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
              <Textarea
                className="w-2/4 text-center"
                value={cleanRemarks}
                onChange={(e) => setCleanRemarks(e.target.value)}
                required
              />
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
              <Textarea
                className="w-2/4 text-center"
                value={maintenanceRemarks}
                onChange={(e) => setMaintenanceRemarks(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex">
              <Label className="w-2/4 pt-1">Remarks</Label>
              <Textarea
                className="w-2/4 text-center"
                value={Remarks}
                onChange={(e) => setRemarks(e.target.value)}
           
              />
            </div>

          <Button className="bg-blue-500 mt-4 mx-20" disabled={isdisable}>
            {isdisable ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <dialog id="successDialog" className="dashboard-modal">
        <button
          className="dashboard-modal-close-btn"
          onClick={() => {
            successdialog?.close()
            window.location.reload()
          }}
        >X</button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">QC Online Pouch updated successfully!</p>
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

export default ModifyPoch
