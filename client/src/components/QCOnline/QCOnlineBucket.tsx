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
import { Origin, QC_Online_Status } from "../common/exportData" 
import { Textarea } from "../ui/textarea"
import { findskutypeData } from "@/type/type"
import { ScrollArea } from "../ui/scroll-area"

const QCOnlineBucket = () => {
  const [errortext, setErrorText] = useState<string>("")
  const [isdisable, setIsDisable] = useState<boolean>(false)

  const lotNoRef = useRef<HTMLInputElement>(null)
  const batchNoRef = useRef<HTMLInputElement>(null)
  const moistureRef = useRef<HTMLInputElement>(null)
  const nutcountRef = useRef<HTMLInputElement>(null)
  const avgWeightRef = useRef<HTMLInputElement>(null)

  const [origin, setOrigin] = useState<string>("")
  const [grade, setGrade] = useState<string>("")

    const [gradeview, setGradeView] = useState("none")
    const [gradeData, setGradeData] = useState<any[]>([])
    const [gradeD, setGradeD] = useState<findskutypeData[]>([])

  const [pktQuality, setPktQuality] = useState<string>("")
  const pktQualityRemarksRef = useRef<HTMLTextAreaElement>(null)

  const [cleaningStatus, setCleaningStatus] = useState<string>("")
  const cleanRemarksRef = useRef<HTMLTextAreaElement>(null)

  const [maintenanceStatus, setMaintenanceStatus] = useState<string>("")
  const maintenanceRemarksRef = useRef<HTMLTextAreaElement>(null)

  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")

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

  const successdialog = document.getElementById("successDialog") as HTMLDialogElement
  const errordialog = document.getElementById("errorDialog") as HTMLDialogElement

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisable(true)

    const payload = {
      LotNo: lotNoRef.current?.value,
      BatchNo: batchNoRef.current?.value,
      Origin: origin,
      Grade: grade,
      moisture: moistureRef.current?.value,
      nutcount: nutcountRef.current?.value,
      avgWeight: avgWeightRef.current?.value,
      date,
      time,
      pktQuality,
      pktQualityRemarks: pktQuality === "NOT OK" ? pktQualityRemarksRef.current?.value : "",
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarksRef.current?.value : "",
      maintainance: maintenanceStatus,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarksRef.current?.value : "",
      createdBy: "admin", // TODO: replace with logged-in user
    }

    axios.post("/api/qconline/createQCOnlineBucket", payload)
      .then(() => {
        if (successdialog) successdialog.showModal()
        // reset
        lotNoRef.current!.value = ""
        batchNoRef.current!.value = ""
        moistureRef.current!.value = ""
        nutcountRef.current!.value = ""
        avgWeightRef.current!.value = ""
        setOrigin("")
        setGrade("")
        setPktQuality("")
        setCleaningStatus("")
        setMaintenanceStatus("")
        if (pktQualityRemarksRef.current) pktQualityRemarksRef.current.value = ""
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
              value={time}
              type="time"
              readOnly
              required
            />
          </div>

          <div className="flex">
            <Label className="w-2/4 pt-1">Lot No</Label>
            <Input
              className="w-2/4 text-center"
              ref={lotNoRef}
              required
              placeholder="Lot No"
            />
          </div>

          <div className="flex">
            <Label className="w-2/4 pt-1">Batch No</Label>
            <Input
              className="w-2/4 text-center"
              ref={batchNoRef}
              required
              placeholder="Batch No"
            />
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
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
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

          {/* Moisture, Nutcount, AvgWeight */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Moisture %</Label>
            <Input
              className="w-2/4 text-center"
              ref={moistureRef}
              type="number"
              step="0.01"
              required
              placeholder="%"
            />
          </div>

          <div className="flex">
            <Label className="w-2/4 pt-1">Nut count</Label>
            <Input
              className="w-2/4 text-center"
              ref={nutcountRef}
            
              required
              placeholder="Value"
            />
          </div>

          <div className="flex">
            <Label className="w-2/4 pt-1">Avg. Weight</Label>
            <Input
              className="w-2/4 text-center"
              ref={avgWeightRef}
              type="number"
              step="0.01"
              required
              placeholder="Grams"
            />
          </div>

          {/* Packet Quality Status */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Packet Quality</Label>
            <Select value={pktQuality} onValueChange={setPktQuality} required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Status.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
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
                ref={pktQualityRemarksRef}
                required
              />
            </div>
          )}

          {/* Cleaning Status */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Cleaning Status</Label>
            <Select
              value={cleaningStatus}
              onValueChange={setCleaningStatus}
              required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Status.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
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
                ref={cleanRemarksRef}
                required
              />
            </div>
          )}

          {/* Maintenance Status */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Maintenance Status</Label>
            <Select
              value={maintenanceStatus}
              onValueChange={setMaintenanceStatus}
              required>
              <SelectTrigger className="w-2/4 justify-center">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Status.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
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
                ref={maintenanceRemarksRef}
                required
              />
            </div>
          )}

          <Button className="bg-blue-500 mt-4 mx-20" disabled={isdisable}>
            {isdisable ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>

      {/* Success Dialog */}
      <dialog id="successDialog" className="dashboard-modal">
        <button
          className="dashboard-modal-close-btn"
          onClick={() => successdialog?.close()}>
          X
        </button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">
            QC Online Bucket Reported successfully!
          </p>
        </span>
      </dialog>

      {/* Error Dialog */}
      <dialog id="errorDialog" className="dashboard-modal">
        <button
          className="dashboard-modal-close-btn"
          onClick={() => errordialog?.close()}>
          X
        </button>
        <span className="flex">
          <img src={cross} height={25} width={25} alt="error" />
          <p className="pl-3 mt-1 font-medium">{errortext}</p>
        </span>
      </dialog>
    </>
  );
}

export default QCOnlineBucket
