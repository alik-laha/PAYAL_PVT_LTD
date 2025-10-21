import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import React, { useEffect } from "react";
import tick from "../../assets/Static_Images/Flat_tick_icon.svg.png";
import cross from "../../assets/Static_Images/error_img.png";

import { useState } from "react";
import axios from "axios";
import { findskutypeData } from "@/type/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Origin } from "../common/exportData";
interface CreditNoteModifyProps {
  data: {
    id: number;
    gateType: string;
    recevingDate: string; // ISO date string
    truckNo: string;
    creditNoteDate: string;
    creditNoteNo: string;
    gradeName: string;
    origin: string;
    vendorName: string;
    quantity: string;
    totalWt: string;
    unitPrice: string;
    editStatus: string;
    type: string;
    createdBy: string;
    approvedBy: string;
    status: number;
    netWeight: string;
    gatePassNo: string;
    grossWt: string;
    totalBill: string;
    remarks: string;
  };
}

const CreditNoteModify = (props: CreditNoteModifyProps) => {
  //const [recevingDate, setRecevingDate] = useState<string>("")
  const [truckNo, setTruckNo] = useState<string>("");
    const [gatetype, setGateType] = useState<string>("");
  const [creditNoteNo, setCreditNoteNo] = useState<string>("");
  const [gradeName, setGradeName] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [vendorName, setVendorName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [totalWt, setTotalWt] = useState<string>("");
  const [unitPrice, setUnitPrice] = useState<string>("");

  const [type, setType] = useState<string>("");

  const [netWeight, setNetWeight] = useState<string>("");
  const [gatePassNo, setGatePassNo] = useState<string>("");
  const [grossWt, setGrossWt] = useState<string>("");
  const [totalBill, setTotalBill] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const [errortext, setErrorText] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [sku, setsku] = useState<findskutypeData[]>();

  const [isdisable, setisdisable] = useState<boolean>(false);
  const [gradeview, setGradeView] = useState("none");
  const [gradeData, setGradeData] = useState<any[]>([]);
  const [gradeD, setGradeD] = useState<findskutypeData[]>([]);

  const successdialog = document.getElementById(
    "rcneditscsDialog"
  ) as HTMLInputElement;
  const errordialog = document.getElementById(
    "rcnediterrDialog"
  ) as HTMLInputElement;
  // const dialog = document.getElementById('myDialog');
  const closeDialogButton = document.getElementById(
    "rcnscscloseDialog"
  ) as HTMLInputElement;
  const errorcloseDialogButton = document.getElementById(
    "rcnerrorcloseDialog"
  ) as HTMLInputElement;

  if (closeDialogButton) {
    closeDialogButton.addEventListener("click", () => {
      if (successdialog != null) {
        (successdialog as any).close();
        window.location.reload();
      }
    });
  }
  if (errorcloseDialogButton) {
    errorcloseDialogButton.addEventListener("click", () => {
      if (errordialog != null) {
        (errordialog as any).close();
      }
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setisdisable(true);
    axios
      .post(`/api/creditNote/updateCreditNote/${props.data.id}`, {
        gatePassNo,gatetype,date,
        grossWt,
        netWeight,
        truckNo,
        creditNoteNo,
        gradeName,
        origin,
        vendorName,
        quantity,
        totalWt,
        unitPrice,
        type,
        totalBill,
        remarks,
      })
      .then((res) => {
        console.log(res);
        if (successdialog != null) {
          (successdialog as any).showModal();
        }
        setGatePassNo('')
        setTruckNo('')
        
      })
      .catch((err) => {
        console.log(err);
        setErrorText(err.response.data.message);
        if (errordialog != null) {
          (errordialog as any).showModal();
        }
      })
      .finally(() => {
        setisdisable(false);
      });
  };

  useEffect(() => {
    if (props.data) {
      setGateType(props.data.gateType)
      setDate(new Date(props.data.recevingDate)); // ISO date -> yyyy-mm-dd
      setTruckNo(props.data.truckNo);
      //setCreditNoteDate(props.data.creditNoteDate?.slice(0, 10) || "")
      setCreditNoteNo(props.data.creditNoteNo);
      setGradeName(props.data.gradeName);
      setOrigin(props.data.origin);
      setVendorName(props.data.vendorName);
      setQuantity(props.data.quantity);
      setTotalWt(props.data.totalWt);
      setUnitPrice(props.data.unitPrice);
      setType(props.data.type);
      setNetWeight(props.data.netWeight);
      setGatePassNo(props.data.gatePassNo);
      setGrossWt(props.data.grossWt);
      setTotalBill(props.data.totalBill);
      setRemarks(props.data.remarks);
    }
  }, [props.data]);
  useEffect(() => {
    axios
      .put("/api/vendorSKU/getItembySection/Item Type", {
        section: "CreditNote",
      })
      .then((res) => {
        //console.log(res.data)
        setsku(res.data);
        //console.log(sku)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .put("/api/vendorSKU/getItembySection/Final Grade", {
        section: "Packing",
      })
      .then((res) => {
        //console.log(res.data)
        setGradeD(res.data);
        console.log(gradeD);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleGradeidClick = (item: any) => {
    // setSku(item.sku)
    setGradeName(item.sku);
    setGradeView("none");
  };

  const handleGradechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setSku(e.target.value)

    setGradeName(e.target.value);

    if (e.target.value.length > 0 && gradeData.length > 0) {
      setGradeView("block");
    } else {
      setGradeView("none");
    }

    axios
      .post("/api/vendorSKU/skudatafind/Packing", {
        sku: e.target.value,
        type: "Final Grade",
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setGradeData(res.data.skuData);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setGradeData([]);
        }
      });
  };

  return (
    <div className="pl-10 pr-10">
      <form className="flex flex-col gap-1 " onSubmit={handleSubmit}>
        <div className="flex mt-2">
          <Label className="w-2/4 mt-2">Gate Pass No.</Label>
          <Input
            className="w-2/4 bg-yellow-100 text-center"
            placeholder="Gate Pass No."
            value={gatePassNo}
            readOnly
          />{" "}
        </div>

        <div className="flex">
          <Label className="w-2/4 mt-2"> Truck No.</Label>
          <Input
            className="w-2/4 bg-yellow-100 text-center"
            placeholder="Truck No."
            value={truckNo}
            readOnly
          />
        </div>
        <div className="flex">
          <Label className="w-2/4 mt-2">Date of Receiving</Label>
          <Input
            className="w-2/4 text-center bg-yellow-100 justify-center"
            placeholder="Date Of Receiving"
            type="date"
            value={date ? date.toISOString().split("T")[0] : ""}
            readOnly
          />
        </div>

        <div className="flex">
          <Label className="w-2/4 mt-2">Item Type</Label>
          <select
            className="text-center w-2/4 flex h-8 rounded-md border border-input bg-background 
px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
focus-visible:ring-offset-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setType(e.target.value)}
            value={type}
            required>
            {sku
              ? sku.map((item: findskutypeData) => (
                  <option key={item.sku} value={item.sku}>
                    {item.sku}
                  </option>
                ))
              : null}
          </select>
          {/* <Input   placeholder="Origin"/>  */}
        </div>

        <div className="flex">
          <Label className="w-2/4 mt-2">Origin</Label>
          <Select value={origin} onValueChange={(value) => setOrigin(value)}>
            <SelectTrigger className="w-2/4 justify-center">
              <SelectValue placeholder="Origin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Origin.map((item) => {
                  return (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Input   placeholder="Origin"/>  */}
        </div>

         {/* Grade Dropdown */}
          <div className="flex">
            <Label className="w-2/4 mt-2">Grade</Label>
            <Input
              value={gradeName}
              placeholder="Grade Nmae"
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
        <div className="flex">
          <Label className="w-2/4 mt-2">Vendor Name</Label>
          <Input
            className="w-2/4 text-center"
            placeholder="Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />{" "}
        </div>

        <div className="flex">
          <Label className="w-2/4 mt-2">Credit Note No.</Label>
          <Input
            className="w-2/4 text-center"
            placeholder="Credit Note No"
            value={creditNoteNo}
            onChange={(e) => setCreditNoteNo(e.target.value)}
          />{" "}
        </div>

        <div className="flex">
          <Label className="w-2/4 mt-2">Weight</Label>
          <Input
            className="w-2/4 text-center justify-center"
            placeholder="Row Weight"
            value={totalWt}
            onChange={(e) => setTotalWt(e.target.value)}
          />{" "}
        </div>

        <div className="flex">
          <Label className="w-2/4 mt-2">Qty/Bag Count</Label>
          <Input
            className="w-2/4 text-center "
            placeholder="Qty"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="flex">
          <Label className="w-2/4 mt-2">Unit Price</Label>
          <Input
            className="w-2/4 text-center "
            placeholder="Unit Price"
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </div>
        <div className="flex">
          <Label className="w-2/4 mt-2">Bill Amount</Label>
          <Input
            className="w-2/4 text-center "
            placeholder="Total Bill Amount"
            type="number"
            value={totalBill}
            onChange={(e) => setTotalBill(e.target.value)}
          />
        </div>

        <div className="flex">
          <Label className="w-2/4 mt-2">Remarks</Label>
          <Textarea
            className="w-2/4 text-center "
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        <Button
          className="bg-orange-500 mb-1 mt-1 ml-20 mr-20 text-center items-center justify-center"
          disabled={isdisable}>
          {isdisable ? "Submitting" : "Submit"}
        </Button>
      </form>

      <dialog id="rcneditscsDialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
        <button id="rcnscscloseDialog" className="dashboard-modal-close-btn ">
          X{" "}
        </button>
        <span className="flex">
          <img src={tick} height={2} width={35} alt="tick_image" />
          <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">
            Modification of CreditNote Entry is Requested{" "}
          </p>
        </span>

        {/* <!-- Add more elements as needed --> */}
      </dialog>

      <dialog id="rcnediterrDialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
        <button id="rcnerrorcloseDialog" className="dashboard-modal-close-btn ">
          X{" "}
        </button>
        <span className="flex">
          <img src={cross} height={25} width={25} alt="error_image" />
          <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">
            {errortext}
          </p>
        </span>

        {/* <!-- Add more elements as needed --> */}
      </dialog>
    </div>
  );
};
export default CreditNoteModify;
