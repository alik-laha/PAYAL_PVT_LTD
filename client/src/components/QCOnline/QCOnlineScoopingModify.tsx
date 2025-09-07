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

interface QCOnlineScoopingModifyProps {
  data: any; // pass response data here
  onSuccess?: () => void;
}

const QCOnlineScoopingModify = ({ data, onSuccess }: QCOnlineScoopingModifyProps) => {
  const [errortext, setErrorText] = useState<string>("");
  const [isdisable, setIsDisable] = useState<boolean>(false);

  const [oilcontainStatus, setOilContainStatus] = useState<string>(data?.oilcontainStatus || "");
  const [chalnacontainStatus, setChalnaContainStatus] = useState<string>(data?.chalnacontainStatus || "");
  const [cashewHuskprcnt, setCashewHuskprcnt] = useState<string>(data?.cashewHuskprcnt || "");

  const [cleaningStatus, setCleaningStatus] = useState<string>(data?.cleaningStatus || "");
  const [maintenanceStatus, setMaintenanceStatus] = useState<string>(data?.maintainance || "");

  const [cleanRemarks, setCleanRemarks] = useState<string>(data?.cleanRemarks || "");
  const [maintenanceRemarks, setMaintenanceRemarks] = useState<string>(data?.maintainanceRemarks || "");

  const [date, setDate] = useState<string>(data?.date?.slice(0, 10) || "");
  const [time, setTime] = useState<string>(data?.time?.slice(0, 5) || "");

  const successdialog = document.getElementById("successDialog") as HTMLDialogElement;
  const errordialog = document.getElementById("errorDialog") as HTMLDialogElement;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisable(true);

    const payload = {
      oilcontainStatus,
      chalnacontainStatus,
      cashewHuskprcnt,
      date,
      time,
      cleaningStatus,
      cleanRemarks: cleaningStatus === "NOT OK" ? cleanRemarks : "",
      maintainance: maintenanceStatus,
      maintainanceRemarks: maintenanceStatus === "NOT OK" ? maintenanceRemarks : "",
    };

    axios
      .put(`/api/qconline/updateQCOnlineScooping/${data.id}`, payload)
      .then(() => {
        if (successdialog) successdialog.showModal();
        if (onSuccess) onSuccess();
      })
      .catch((err) => {
        setErrorText(err.response?.data?.message || "Something went wrong");
        if (errordialog) errordialog.showModal();
      })
      .finally(() => setIsDisable(false));
  };

  useEffect(() => {
    if (!date) setDate(new Date().toISOString().slice(0, 10));
    if (!time) setTime(new Date().toTimeString().slice(0, 5));
  }, []);

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
              onChange={(e) => setDate(e.target.value)}
              type="date"
              required
            />
          </div>

          {/* Time */}
          <div className="flex mt-1">
            <Label className="w-2/4 pt-1">Time</Label>
            <Input
              className="w-2/4 text-center justify-center bg-yellow-100"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="time"
              required
            />
          </div>

          {/* Oil Container Status */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Cutting Material's Oil Contain Status</Label>
            <Select value={oilcontainStatus} onValueChange={setOilContainStatus} required>
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

          {/* Chalna Container Status */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Machine Sieve Cleaning Status</Label>
            <Select value={chalnacontainStatus} onValueChange={setChalnaContainStatus} required>
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

          {/* Cashew Husk % */}
          <div className="flex">
            <Label className="w-2/4 pt-1">Cashew % in Husk (10 Kg)</Label>
            <Input
              className="w-2/4 text-center"
              type="number"
              step="0.01"
              value={cashewHuskprcnt}
              onChange={(e) => setCashewHuskprcnt(e.target.value)}
              required
              placeholder="%"
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
            window.location.reload()
        }}>
          X
        </button>
        <span className="flex">
          <img src={tick} height={25} width={25} alt="success" />
          <p className="pl-3 mt-1 font-medium">QC Online Scooping Updated Successfully!</p>
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

export default QCOnlineScoopingModify;
