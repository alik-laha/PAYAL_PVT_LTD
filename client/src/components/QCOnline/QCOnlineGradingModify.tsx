import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import tick from "../../assets/Static_Images/Flat_tick_icon.svg.png";
import cross from "../../assets/Static_Images/error_img.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QC_Online_Status } from "../common/exportData"; // ["OK","NOT OK","NA"]
import { Textarea } from "../ui/textarea";

type Props = {
  data: any // pass selected row data
}

const QCOnlineGradingModify =({ data }: Props) => {
  const [errortext, setErrorText] = useState<string>("");
  const [isdisable, setIsDisable] = useState<boolean>(false);

  const [vibrator1, setVibrator1] = useState<string>("");
  const [vibrator2, setVibrator2] = useState<string>("");

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const [cleaningStatus, setCleaningStatus] = useState<string>("");
  const [maintenanceStatus, setMaintenanceStatus] = useState<string>("");

  const [cleanRemarks, setCleanRemarks] = useState<string>("");
  const [maintenanceRemarks, setMaintenanceRemarks] = useState<string>("");

  const successdialog = document.getElementById("successDialog") as HTMLDialogElement;
  const errordialog = document.getElementById("errorDialog") as HTMLDialogElement;

  useEffect(() => {
    if (data) {
      setVibrator1(data.vibratorspeed1 || "");
      setVibrator2(data.vibratorspeed2 || "");
      setDate(data.date ? data.date.slice(0, 10) : "");
      setTime(data.time ? data.time.slice(0, 5) : "");
      setCleaningStatus(data.cleaningStatus || "");
      setCleanRemarks(data.cleanRemarks || "");
      setMaintenanceStatus(data.maintainance || "");
      setMaintenanceRemarks(data.maintainanceRemarks || "");
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisable(true);

    const payload = {
      vibratorspeed1: vibrator1,
      vibratorspeed2: vibrator2,
      date,
      time,
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarks : "",
      maintainance: maintenanceStatus,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarks : "",
    };

    axios
      .put(`/api/qconline/editQCOnlineGrading/${data.id}`, payload)
      .then(() => {
        if (successdialog) successdialog.showModal();
       
      })
      .catch((err) => {
        setErrorText(err.response?.data?.message || "Something went wrong");
        if (errordialog) errordialog.showModal();
      })
      .finally(() => setIsDisable(false));
  };

  return (
    <>
      <div className="pb-6 px-6">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* Date */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Date</Label>
            <Input
              className="w-2/4 text-center justify-center bg-yellow-100"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div className="flex">
            <Label className="w-2/4 pt-1 ">Time</Label>
            <Input
              className="w-2/4 text-center justify-center bg-yellow-100"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* Vibrator 1 */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Vibrator Speed 1</Label>
            <Input
              className="w-2/4 text-center"
              type="number"
              step="0.01"
              value={vibrator1}
              onChange={(e) => setVibrator1(e.target.value)}
              required
            />
          </div>

          {/* Vibrator 2 */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Vibrator Speed 2</Label>
            <Input
              className="w-2/4 text-center"
              type="number"
              step="0.01"
              value={vibrator2}
              onChange={(e) => setVibrator2(e.target.value)}
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
        <button className="dashboard-modal-close-btn" onClick={() => {successdialog?.close()
            window.location.reload()}
        }>
          X
        </button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">QC-Online Grading updated successfully!</p>
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
  );
};

export default QCOnlineGradingModify;
