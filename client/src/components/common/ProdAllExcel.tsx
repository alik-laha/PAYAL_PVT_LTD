import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Download } from "lucide-react";
import { format, toZonedTime } from "date-fns-tz";
import { Origin } from "./exportData";

const ProdAllExcel = () => {
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);

  const currDate = new Date().toISOString().split("T")[0];

  function handletimezone(date: string | Date) {
          const apidate = new Date(date);
          const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
          const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
          return finaldate;
      }

   function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }

  const handleAMPM = (time: string) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    const h = Number(hour);

    return `${h % 12 || 12}:${minute} ${h >= 12 ? "PM" : "AM"}`;
  };

  const addSheet = (
    wb: XLSX.WorkBook,
    data: any[],
    transformFn: (item: any, idx: number) => any,
    sheetName: string
  ) => {
    const transformed = data.map(transformFn);

    const ws = XLSX.utils.json_to_sheet(transformed);

    const colWidths = Object.keys(transformed[0] || {}).map((key) => ({
      wch:
        Math.max(
          key.length,
          ...transformed.map((row) =>
            row[key] ? row[key].toString().length : 10
          )
        ) + 5,
    }));

    ws["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  };

  const exportAllReports = async () => {
    try {
      setLoading(true);
        const toNum = (val: any) => Number(val) || 0;
        const num = (val: any) => Number(val) || 0;
      const commonPayload = {
        origin,
        fromDate: fromdate,
        toDate: todate,
      };

      const [
        boilingLine,
        boilingLot,
        scoopingLot,
        scoopingLine,
        borma,
        humidifier,
        peeling,
        mayur,
        hamsa,
        dpds,
        sorting,
        bigTaiho,
        lw,
        wholes,
        village,rejection
      ] = await Promise.all([
        axios.post("/api/boiling/searchBoiling", {
          ...commonPayload,
          type: "line",
        }),

        axios.post("/api/boiling/searchBoiling", {
          ...commonPayload,
          type: "lot",
        }),

        axios.post("/api/scooping/searchScooping", {
          ...commonPayload,
          type: "LotWise",
        }),

        axios.post("/api/scooping/searchScooping", {
          ...commonPayload,
          type: "LineWise",
        }),

        axios.put("/api/borma/bormaprimarysearch", commonPayload),

        axios.put("/api/humid/humidprimarysearch", commonPayload),

        axios.put("/api/peeling/peelingprimarysearch", commonPayload),

        axios.put("/api/mayur/mayurprimarysearch", commonPayload),

        axios.put("/api/hamsa/hamsaprimarysearch", commonPayload),

        axios.put("/api/dpds/dpdsprimarysearch", commonPayload),

        axios.put("/api/sorting/sortingprimarysearch", commonPayload),

        axios.put("/api/bigTaiho/bigTaihoprimarysearch", commonPayload),

        axios.put("/api/lw/lwprimarysearch", commonPayload),

        axios.put("/api/wholes/wholesprimarysearch", commonPayload),

        axios.put("/api/villageout/villageprimarysearch", commonPayload),

        axios.put("/api/rejection/rejectionprimarysearch", commonPayload),
      ]);

      const wb = XLSX.utils.book_new();

      // ========================= BOILING LINE =========================
      addSheet(
        wb,
        boilingLine.data,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
                Lot_No: item.LotNo,
                Entry_Date: handletimezone(item.date),
                Origin: item.origin,
                Size: item.SizeName,
                Boiling_Qty: Number(item.Size) || 0,
                Scooping_Line: item.Scooping_Line_Mc,
                Pressure: item.Pressure,
                Cooking_Time: item.CookingTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Machine: item.MCName,
                MC_On: handleAMPM(item.Mc_on.slice(0, 5)),
                MC_Off: handleAMPM(item.Mc_off.slice(0, 5)),
                Labour_No: Number(item.noOfEmployees) || 0,
                Breakdown_Duration: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Other_Duration: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Run_Duration: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr.',
                Edit_Status: item.editStatus,
                Entried_By: item.CreatedBy,
                ApprovedOrRejectedBy: item.modifiedBy
        }),
        "Boiling_Line"
      );

      // ========================= BOILING LOT =========================
      addSheet(
        wb,
        boilingLot.data,
        (item: any, idx: number) => ({
         Sl_No: idx + 1,
                Lot_No: item.LotNo,
                Entry_Date: handletimezone(item.date),  
                Boiling_Qty: Number(item.quantity) || 0,
                Boiling_Bag: Number(item.quantity)/80 || 0,
                Labour: item.noOfEmployees,
                Created_By:item.CreatedBy
        }),
        "Boiling_Lot"
      );

      // ========================= SCOOPING LOT =========================
      addSheet(
        wb,
        scoopingLot.data,
        (item: any, idx: number) => ({
           SL_No: idx + 1,
                    LotNo: item.LotNo,
                    date: handletimezone(item.date),
                    origin: item.origin,
                    Opening_Qty: Number(item.Opening_Qty) || 0,
                    Receiving_Qty: Number(item.Receiving_Qty) || 0,
                    Wholes: Number(item.Wholes) || 0,
                    Broken: Number(item.Broken) || 0,
                    Uncut: Number(item.Uncut) || 0,
                    Unscoop: Number(item.Unscoop) || 0,
                    NonCut: Number(item.NonCut) || 0,
                    Rejection: Number(item.Rejection) || 0,
                    Dust: Number(item.Dust) || 0,
                    TotBagCutting: Number(item.TotBagCutting) || 0,
                    KOR: Number(item.KOR) || 0,
                    LineWiseLadies: Number(item.noOfEmployees) || 0,
                    Common_Ladies: Number(item.noOfLadies) || 0,
                    Common_Gents: Number(item.noOfGents) || 0,
                    Common_Supervisors: Number(item.noOfSupervisors) || 0,
                    LineWiseOperator: Number(item.noOfOperators) || 0,
                    CreatedBy: item.CreatedBy,
                    editStatus: item.editStatus,
                    modifiedBy: item.modifiedBy,
        }),
        "Scooping_Lot"
      );

      // ========================= SCOOPING LINE =========================
      addSheet(
        wb,
        scoopingLine.data,
        (item: any, idx: number) => ({
           SL_No: idx + 1,
                    LotNo: item.LotNo,
                    Scooping_Line_Mc: item.Scooping_Line_Mc,
                    date: handletimezone(item.date),
                    origin: item.origin,
                    Opening_Qty: Number(item.Opening_Qty) || 0,
                    Receiving_Qty: Number(item.Receiving_Qty) || 0,
                    SizeName: item.SizeName,
                    Wholes: Number(item.Wholes) || 0,
                    Broken: Number(item.Broken) || 0,
                    Uncut: Number(item.Uncut) || 0,
                    Unscoop: Number(item.Unscoop) || 0,
                    NonCut: Number(item.NonCut) || 0,
                    Rejection: Number(item.Rejection) || 0,
                    Dust: Number(item.Dust) || 0,

                    KOR: Number(item.KOR) || 0,
                    Trolley_Broken: Number(item.Trolley_Broken) || 0,
                    Trolley_Small_JB: Number(item.Trolley_Small_JB) || 0,
                    LineWiseLadies: Number(item.noOfEmployees) || 0,
                    Common_Ladies: Number(item.noOfLadies) || 0,
                    Common_Gents: Number(item.noOfGents) || 0,
                    Common_Supervisors: Number(item.noOfSupervisors) || 0,
                    LineWiseOperator: Number(item.noOfOperators) || 0,
                    CreatedBy: item.CreatedBy,
                    editStatus: item.editStatus,
                    modifiedBy: item.modifiedBy,
                    Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                    Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                    Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                    Brkdwn_reason: item.Brkdwn_reason,
                    otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                    scoopStatus: item.scoopStatus ? 'Done' : 'Not-Done',
                    Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                    Transfered_Qty:Number(item.Transfered_Qty) || 0,
                    Transfered_To: item.Transfered_To

        }),
        "Scooping_Line"
      );

      // ========================= BORMA =========================
      addSheet(
        wb,
        borma.data.rcnEntries,
        (item: any, idx: number) => ({
         SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                InputWholes: Number(item.InputWholes) ||0,
                InputPieces: Number(item.InputPieces) ||0,
                TotalInput: Number(item.TotalInput) ||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators:  Number(item.noOfOperators) || 0,
                NoOfTrolley: item.NoOfTrolley,
                InputMoisture: formatNumber(item.InputMoisture),   
                OutputMoisture: formatNumber(item.OutputMoisture),   
                OutputWholes:Number(item.OutputWholes) ||0,   
                OutputPieces: Number(item.OutputPieces) ||0,   
                TotalOutput: Number(item.TotalOutput) ||0,   
                BormaLoss: formatNumber(item.BormaLoss),       
                Temp:item.Temp,
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy
        }),
        "Borma"
      );

      // ========================= HUMIDIFIER =========================
      addSheet(
        wb,
        humidifier.data.rcnEntries,
        (item: any, idx: number) => ({
          SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
               noOfOperators:  Number(item.noOfOperators) || 0,
                NoOfTrolley: item.NoOfTrolley,
                InputMoisture: formatNumber(item.InputMoisture),   
                OutputMoisture: formatNumber(item.OutputMoisture), 
                TotalInput: Number(item.TotalInput) || 0,    
                TotalOutput: Number(item.TotalOutput) || 0,   
                MoistGain: formatNumber(item.MoistGain),    
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy
        }),
        "Humidifier"
      );

      // ========================= PEELING =========================
      addSheet(
        wb,
        peeling.data.rcnEntries,
        (item: any, idx: number) => ({
          SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                Total_Input:Number(item.TotalInput) ||0,
                Pressure:formatNumber(item.pressure) ||0,
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
              //    UnPeel_Prcnt:formatNumber(item.unpeelp)||0,
             //  Broken_Prcnt:formatNumber(item.brokenp)||0,
            //   Chura_Prcnt:formatNumber(item.churap)||0,
                // Unpeel_Piece:Number(item.UnpeelPiece) ||0,
                WholesPeel_Or_WholesJB: Number(item.WholesPeel)||0,
                WholesUnpeel_Or_LW:Number(item.WholesUnpeel)||0,
            //     DP: Number(item.DP)||0,
            //     DS: Number(item.DS)||0,
            //     DP1:Number(item.DP1)||0,
            //     JJH: Number(item.JJH)||0,
            //     SJH: Number(item.SJH)||0,
            //     SJH1:Number(item.SJH1)||0,
            //     JK_K:Number(item.JK_K)||0,
            //     SP1:Number(item.SP1)||0,
            //    JH1:Number(item.JH1)||0,
               Husk:Number(item.Husk)||0,
            //    Rejection: Number(item.Rejection)||0,
               Big_Taiho: Number(item.Big_Taiho)||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators: Number(item.noOfOperators) || 0,
                noOfOperators_Day:Number(item.noOfdayOperators) || 0,
                noOfOperators_Night:Number(item.noOfnightOperators) || 0,
                noOfOperators_Husk:Number(item.noOfhuskOperators) || 0,
                NoOfTrolley:Number(item.NoOfTrolley) || 0,
                Backlog:Number(item.difference)||0,
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy
        }),
        "Peeling"
      );

      // ========================= MAYUR =========================
      addSheet(
        wb,
        mayur.data.rcnEntries,
        (item: any, idx: number) => ({
          Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Mayur_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_Wholes_Peel_Or_WholesJB: Number(item.rcv_wholespeel)||0,
                    Opening_Wholes_Unpeel_Or_LW: Number(item.rcv_wholesunpeel)||0,
                    Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
                    Receive_DPDS: item.rcv_DPDS ? Number(item.rcv_DPDS) : 0,
                    Receive_Sorting: item.rcv_sorting ? Number(item.rcv_sorting) : 0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel) +
                        (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) +
                        (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toFixed(2))||0,
                    Issue_PW_W_Or_V_PW_W: Number(item.issue_pw_w)||0,
                    Issue_W_Lot_Or_V_W_Lot: Number(item.issue_w_lot)||0,
                    Issue_WW_Or_V_WW: Number(item.issue_ww)||0,
                    Issue_Rejection: Number(item.issue_rejection)||0,
                    Issue_Village: Number(item.issue_village)||0,
                    Issue_Big_Taiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_LW)||0,
                    Issue_JB: Number(item.issue_JB)||0,
                    Current_Backlog: Number(item.current_backlog) ||0,
                    Mc_On_133: handleAMPM(item.Mc_on_133.slice(0, 5)),
                    Mc_Off_133: handleAMPM(item.Mc_off_133.slice(0, 5)),
                    Mc_Breakdown_133: item.Mc_breakdown_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_133: item.otherTime_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_331: handleAMPM(item.Mc_on_331.slice(0, 5)),
                    Mc_Off_331: handleAMPM(item.Mc_off_331.slice(0, 5)),
                    Mc_Breakdown_331: item.Mc_breakdown_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_331: item.otherTime_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_292: handleAMPM(item.Mc_on_292.slice(0, 5)),
                    Mc_Off_292: handleAMPM(item.Mc_off_292.slice(0, 5)),
                    Mc_Breakdown_292: item.Mc_breakdown_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_292: item.otherTime_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_293: handleAMPM(item.Mc_on_293.slice(0, 5)),
                    Mc_Off_293: handleAMPM(item.Mc_off_293.slice(0, 5)),
                    Mc_Breakdown_293: item.Mc_breakdown_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_293: item.otherTime_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Runtime_133: item.Mc_runTime_133.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_331: item.Mc_runTime_331.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_292: item.Mc_runTime_292.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_293: item.Mc_runTime_293.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Operator_Day: Number(item.noOfdayOperators)||0,
                    Operator_Night: Number(item.noOfnightOperators)||0,
                    Edit_Status: item.editStatus,
                    Created_By: item.CreatedBy,
                    Modified_By: item.modifiedBy

        }),
        "Mayur"
      );

      // ========================= HAMSA =========================
      addSheet(
        wb,
        hamsa.data.rcnEntries,
        (item: any, idx: number) => ({
           Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Hamsa_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Receive_PW_W: Number(item.rcv_pw_w) ||0,
                    Receive_W_LOT: Number(item.rcv_w_lot) ||0,
                    Receive_WW: Number(item.rcv_ww) ||0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0 ,
                    Receive_LW: item.rcv_lw ? Number(item.rcv_lw) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_pw_w) +
                        parseFloat(item.rcv_w_lot) + parseFloat(item.rcv_ww) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) +
                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2))||0,
                    issue_pw_210: Number(item.issue_pw_210)||0,
                    issue_w_210: Number(item.issue_w_210)||0,
                    issue_ww_210: Number(item.issue_ww_210)||0,
                    issue_pw_240: Number(item.issue_pw_240)||0,
                    issue_w_240: Number(item.issue_w_240)||0,
                    issue_ww_240: Number(item.issue_ww_240)||0,
                    issue_pw_280: Number(item.issue_pw_280)||0,
                    issue_w_280: Number(item.issue_w_280)||0,
                    issue_ww_280: Number(item.issue_ww_280)||0,
                    issue_pw_320: Number(item.issue_pw_320)||0,
                    issue_w_320: Number(item.issue_w_320)||0,
                    issue_ww_320: Number(item.issue_ww_320)||0,
                    issue_pw_360: Number(item.issue_add_1)||0,
                    issue_w_360: Number(item.issue_add_2)||0,
                    issue_ww_360: Number(item.issue_add_3)||0,
                    issue_pw_400: Number(item.issue_pw_400)||0,
                    issue_w_400: Number(item.issue_w_400)||0,
                    issue_ww_400: Number(item.issue_ww_400)||0,
                    Issue_Wholes: Number(formatNumber((parseFloat(item.issue_pw_210) +
                        parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210) +
                        parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240) +
                        parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280) +
                        parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320) + parseFloat(item.issue_ww_320) +
                        parseFloat(item.issue_add_1) + parseFloat(item.issue_add_2) + parseFloat(item.issue_add_3) +
                        parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400) + parseFloat(item.issue_ww_400)).toString()))||0,
                    Issue_JB: Number(item.issue_jb)||0,
                    Issue_BigTaiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_lw)||0,

                    Current_Backlog: Number(item.current_backlog) ||0,
                    Mc_On_Hamsa_1: handleAMPM(item.Mc_on_1.slice(0, 5)),
                    Mc_Off_Hamsa_1: handleAMPM(item.Mc_off_1.slice(0, 5)),
                    Mc_Breakdown_Hamsa_1: item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_1: item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_2: handleAMPM(item.Mc_on_2.slice(0, 5)),
                    Mc_Off_Hamsa_2: handleAMPM(item.Mc_off_2.slice(0, 5)),
                    Mc_Breakdown_Hamsa_2: item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_2: item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_3: handleAMPM(item.Mc_on_3.slice(0, 5)),
                    Mc_Off_Hamsa_3: handleAMPM(item.Mc_off_3.slice(0, 5)),
                    Mc_Breakdown_Hamsa_3: item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_3: item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_4: handleAMPM(item.Mc_on_4.slice(0, 5)),
                    Mc_Off_Hamsa_4: handleAMPM(item.Mc_off_4.slice(0, 5)),
                    Mc_Breakdown_Hamsa_4: item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_4: item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_5: handleAMPM(item.Mc_on_5.slice(0, 5)),
                    Mc_Off_Hamsa_5: handleAMPM(item.Mc_off_5.slice(0, 5)),
                    Mc_Breakdown_Hamsa_5: item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_5: item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Spectrum: handleAMPM(item.Mc_on_6.slice(0, 5)),
                    Mc_Off_Spectrum: handleAMPM(item.Mc_off_6.slice(0, 5)),
                    Mc_Breakdown_Spectrum: item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Spectrum: item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Runtime_Hamsa_1: item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_2: item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_3: item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_4: item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_5: item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Spectrum: item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Operator_Day: Number(item.noOfdayOperators)||0,
                    Operator_Night: Number(item.noOfnightOperators)||0,
                    Edit_Status: item.editStatus,
                    Created_By: item.CreatedBy,
                    Modified_By: item.modifiedBy

        }),
        "Hamsa"
      );

      // ========================= DPDS =========================
      addSheet(
        wb,
        dpds.data.rcnEntries,
        (item: any, idx: number) => ({
           Sl_No: idx + 1,
            Issue_Type: item.altid == 1 ? "Fresh Issue" : "Re-Issue",
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            DPDS_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,

            // Opening
            Opening_DP: toNum(item.rcv_dp),
            Opening_DS: toNum(item.rcv_ds),
            Opening_DP1: toNum(item.rcv_dp1),

            // Borma
            Borma_DP: toNum(item.issue_add_4),
            Borma_DS: toNum(item.issue_add_5),
            Borma_DP1: toNum(item.issue_add_6),

            // Peeling
            Receive_Peeling:
                toNum(item.rcv_dp) +
                toNum(item.rcv_ds) +
                toNum(item.rcv_dp1),

            Borma_Peeling:
                toNum(item.issue_add_4) +
                toNum(item.issue_add_5) +
                toNum(item.issue_add_6),

            Borma_Loss_Kg: toNum(item.issue_add_2),
            Borma_Loss_Percentage: toNum(item.issue_add_3),

            // Receive
            Receive_Sorting: toNum(item.rcv_Sorting),
            Receive_BigTaiho: toNum(item.rcv_transfer),

            Receive_Total:
                toNum(item.issue_add_4) +
                toNum(item.issue_add_5) +
                toNum(item.issue_add_6) +
                toNum(item.rcv_Sorting) +
                toNum(item.rcv_transfer),

            // Issue normal
            Issue_M_DS: toNum(item.issue_m_ds),
            Issue_M_DP: toNum(item.issue_m_dp),
            Issue_K_DP: toNum(item.issue_k_dp),
            Issue_DS1: toNum(item.issue_ds_1),
            Issue_DS2: toNum(item.issue_ds_2),
            Issue_SP2: toNum(item.issue_sp_2),
            Issue_YJH: toNum(item.issue_yjh),
            Issue_YK: toNum(item.issue_yk),
            Issue_KP: toNum(item.issue_kp),
            Issue_WP: toNum(item.issue_wp),
            Issue_RS: toNum(item.issue_rs),
            Issue_DP2: toNum(item.issue_dp_2),
            Issue_DP3: toNum(item.issue_dp_3),
            Issue_DP4: toNum(item.issue_dp_4),
            Issue_3L: toNum(item.issue_dp_3l),
            Issue_SS: toNum(item.issue_ss),
            Issue_OS: toNum(item.issue_os),
            Issue_OS1: toNum(item.issue_os1),

            // Issue V
            Issue_V_DS: toNum(item.issue_V_ds),
            Issue_V_M_DS: toNum(item.issue_V_m_ds),
            Issue_V_DP: toNum(item.issue_V_dp),
            Issue_V_M_DP: toNum(item.issue_V_m_dp),
            Issue_V_LP: toNum(item.issue_V_lp),
            Issue_V_LP_2: toNum(item.issue_V_lp_2),
            Issue_V_K_DP: toNum(item.issue_V_k_dp),
            Issue_V_SS: toNum(item.issue_V_ss),
            Issue_V_YJH: toNum(item.issue_V_yjh),
            Issue_V_YK: toNum(item.issue_V_yk),
            Issue_V_SP_2: toNum(item.issue_V_sp_2),
            Issue_V_KP: toNum(item.issue_V_kp),
            Issue_V_DP_2: toNum(item.issue_V_dp_2),
            Issue_V_DP_3: toNum(item.issue_V_dp_3),
            Issue_V_DP_4: toNum(item.issue_V_dp_4),
            Issue_V_OS: toNum(item.issue_V_os),
            Issue_V_OS_1: toNum(item.issue_V_os_1),
            Issue_V_WP: toNum(item.issue_V_wp),
            Issue_V_RS: toNum(item.issue_V_rs),

            // Total Packing
            Issue_Packing:
                toNum(item.issue_m_ds) +
                toNum(item.issue_m_dp) +
                toNum(item.issue_k_dp) +
                toNum(item.issue_ds_1) +
                toNum(item.issue_ds_2) +
                toNum(item.issue_sp_2) +
                toNum(item.issue_yjh) +
                toNum(item.issue_yk) +
                toNum(item.issue_kp) +
                toNum(item.issue_wp) +
                toNum(item.issue_rs) +
                toNum(item.issue_dp_2) +
                toNum(item.issue_dp_3) +
                toNum(item.issue_dp_4) +
                toNum(item.issue_dp_3l) +
                toNum(item.issue_ss) +
                toNum(item.issue_os) +
                toNum(item.issue_os1) +
                toNum(item.issue_V_ds) +
                toNum(item.issue_V_m_ds) +
                toNum(item.issue_V_dp) +
                toNum(item.issue_V_m_dp) +
                toNum(item.issue_V_lp) +
                toNum(item.issue_V_lp_2) +
                toNum(item.issue_V_k_dp) +
                toNum(item.issue_V_ss) +
                toNum(item.issue_V_yjh) +
                toNum(item.issue_V_yk) +
                toNum(item.issue_V_sp_2) +
                toNum(item.issue_V_kp) +
                toNum(item.issue_V_dp_2) +
                toNum(item.issue_V_dp_3) +
                toNum(item.issue_V_dp_4) +
                toNum(item.issue_V_os) +
                toNum(item.issue_V_os_1) +
                toNum(item.issue_V_wp) +
                toNum(item.issue_V_rs),

            Issue_Rejection: toNum(item.issue_rejection),
            Issue_Village: toNum(item.issue_village),
            Issue_Big_Taiho: toNum(item.issue_bigTaiho),
            Issue_Mayur: toNum(item.issue_mayur),

            Current_Backlog: toNum(item.current_backlog),

            No_Labour: item.noOfdayOperators,
            No_Supervisor: item.noOfnightOperators,
            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy,

        }),
        "DPDS"
      );

      // ========================= SORTING =========================
      addSheet(
        wb,
        sorting.data.rcnEntries,
        (item: any, idx: number) => ({
           Sl_No: idx + 1,
            Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            Sorting_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,

            // Opening
            Opening_JJH: toNum(item.rcv_jjh),
            Opening_SJH: toNum(item.rcv_sjh),
            Opening_SJH1: toNum(item.rcv_sjh1),
            Opening_JK_K: toNum(item.rcv_jk_k),
            Opening_JH1: toNum(item.rcv_jh1),
            Opening_SP1: toNum(item.rcv_sp1),

            // Borma
            Borma_JJH: toNum(item.issue_add_4),
            Borma_SJH: toNum(item.issue_add_5),
            Borma_SJH1: toNum(item.issue_add_6),
            Borma_JK_K: toNum(item.issue_add_8),
            Borma_JH1: toNum(item.issue_add_7),
            Borma_SP1: toNum(item.issue_add_9),

            // Peeling
            Receive_Peeling:
                toNum(item.rcv_jjh) +
                toNum(item.rcv_sjh) +
                toNum(item.rcv_sjh1) +
                toNum(item.rcv_jk_k) +
                toNum(item.rcv_jh1) +
                toNum(item.rcv_sp1),

            Borma_Peeling:
                toNum(item.issue_add_4) +
                toNum(item.issue_add_5) +
                toNum(item.issue_add_6) +
                toNum(item.issue_add_7) +
                toNum(item.issue_add_8) +
                toNum(item.issue_add_9),

            Borma_Loss_Kg: toNum(item.issue_add_2),
            Borma_Loss_Percentage: toNum(item.issue_add_3),

            Receive_BigTaiho: toNum(item.rcv_bigTaiho),

            Receive_Total:
                toNum(item.issue_add_4) +
                toNum(item.issue_add_5) +
                toNum(item.issue_add_6) +
                toNum(item.issue_add_7) +
                toNum(item.issue_add_8) +
                toNum(item.issue_add_9) +
                toNum(item.rcv_bigTaiho),

            // Issue
            issue_SJH: toNum(item.issue_sjh),
            issue_JJH: toNum(item.issue_jjh),
            issue_JJH1: toNum(item.issue_jjh1),
            issue_jk: toNum(item.issue_jk),
            issue_jk1: toNum(item.issue_jk1),
            issue_k: toNum(item.issue_k),
            issue_k1: toNum(item.issue_k1),
            issue_lwp: toNum(item.issue_lwp),
            issue_lwp1: toNum(item.issue_lwp1),
            issue_s: toNum(item.issue_s),
            issue_ss: toNum(item.issue_ss),
            issue_yk: toNum(item.issue_yk),
            issue_sp2: toNum(item.issue_sp2),
            issue_kp: toNum(item.issue_kp),

            issue_in_k: toNum(item.issue_in_k),
            issue_in_jh: toNum(item.issue_in_jh),

            // V Issue
            issue_V_sjh: toNum(item.issue_V_sjh),
            issue_V_k: toNum(item.issue_V_k),
            issue_V_k1: toNum(item.issue_V_k1),
            issue_V_lwp: toNum(item.issue_V_lwp),
            issue_V_lwp1: toNum(item.issue_V_lwp1),
            issue_V_jk: toNum(item.issue_V_jk),
            issue_V_jk1: toNum(item.issue_V_jk1),
            issue_V_ss: toNum(item.issue_V_ss),
            issue_V_sp: toNum(item.issue_V_sp),
            issue_V_sp2: toNum(item.issue_V_sp2),
            issue_V_jh1: toNum(item.issue_V_jh1),
            issue_V_yk: toNum(item.issue_V_yk),
            issue_V_m_jk1: toNum(item.issue_V_m_jk1),

            // External grades
            issue_ext_grade_1: toNum(item.issue_ext_grade_1),
            issue_ext_grade_2: toNum(item.issue_ext_grade_2),
            issue_ext_grade_3: toNum(item.issue_ext_grade_3),
            issue_ext_grade_4: toNum(item.issue_ext_grade_4),
            issue_ext_grade_5: toNum(item.issue_ext_grade_5),
            issue_ext_grade_6: toNum(item.issue_ext_grade_6),
            issue_ext_grade_7: toNum(item.issue_ext_grade_7),
            issue_ext_grade_8: toNum(item.issue_ext_grade_8),
            issue_ext_grade_9: toNum(item.issue_ext_grade_9),
            issue_ext_grade_10: toNum(item.issue_ext_grade_10),

            // Total Packing
            Issue_Packing:
                toNum(item.issue_jjh) +
                toNum(item.issue_jjh1) +
                toNum(item.issue_sjh) +
                toNum(item.issue_jk) +
                toNum(item.issue_jk1) +
                toNum(item.issue_k) +
                toNum(item.issue_k1) +
                toNum(item.issue_lwp) +
                toNum(item.issue_lwp1) +
                toNum(item.issue_s) +
                toNum(item.issue_ss) +
                toNum(item.issue_yk) +
                toNum(item.issue_sp2) +
                toNum(item.issue_kp) +
                toNum(item.issue_in_k) +
                toNum(item.issue_in_jh) +
                toNum(item.issue_V_sjh) +
                toNum(item.issue_V_k) +
                toNum(item.issue_V_k1) +
                toNum(item.issue_V_lwp) +
                toNum(item.issue_V_lwp1) +
                toNum(item.issue_V_jk) +
                toNum(item.issue_V_jk1) +
                toNum(item.issue_V_ss) +
                toNum(item.issue_V_sp) +
                toNum(item.issue_V_sp2) +
                toNum(item.issue_V_jh1) +
                toNum(item.issue_V_yk) +
                toNum(item.issue_V_m_jk1) +
                toNum(item.issue_ext_grade_1) +
                toNum(item.issue_ext_grade_2) +
                toNum(item.issue_ext_grade_3) +
                toNum(item.issue_ext_grade_4) +
                toNum(item.issue_ext_grade_5) +
                toNum(item.issue_ext_grade_6) +
                toNum(item.issue_ext_grade_7) +
                toNum(item.issue_ext_grade_8) +
                toNum(item.issue_ext_grade_9) +
                toNum(item.issue_ext_grade_10),

            issue_village: toNum(item.issue_village),
            issue_mayur: toNum(item.issue_mayur),
            issue_bigTaiho: toNum(item.issue_bigTaiho),
            issue_dpds: toNum(item.issue_dpds),
            issue_rejection: toNum(item.issue_rejection),

            Current_Backlog: toNum(item.current_backlog),

            Labour: item.noOfdayOperators,

            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy

        }),
        "Sorting"
      );

      // ========================= BIG TAIHO =========================
      addSheet(
        wb,
        bigTaiho.data.rcnEntries,
        (item: any, idx: number) => ({
           Sl_No: idx + 1,
                Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                Item_Lot_No: item.LotNo,
                Origin: item.origin,
                Issue_No: item.altid,
                BigTaiho_Entry_Date: handletimezone(item.date),
                Mixing_Lot: item.mixingLot,

                // Receive
                Receive_Peeling: toNum(item.rcv_peeling),
                Borma_Peeling: toNum(item.rcv_peeling) - toNum(item.issue_add_2),
                Borma_Loss_Kg: toNum(item.issue_add_2),
                Borma_Loss_Percentage: toNum(item.issue_add_3),

                Receive_Sorting: toNum(item.rcv_sorting),
                Receive_Village: toNum(item.rcv_village),
                Receive_DPDS: toNum(item.rcv_dpds),
                Receive_Mayur: toNum(item.rcv_mayur),
                Receive_Hamsa: toNum(item.rcv_hamsa),
                Receive_LW: toNum(item.rcv_lw),
                Receive_Wholes: toNum(item.rcv_wholes),

                Receive_Total: (toNum(item.rcv_peeling) - toNum(item.issue_add_2))+(toNum(item.rcv_sorting) +
                toNum(item.rcv_village) +
                toNum(item.rcv_dpds) +
                toNum(item.rcv_mayur) +
                toNum(item.rcv_hamsa) +
                toNum(item.rcv_lw) +
                toNum(item.rcv_wholes)),

                // Issue
                Issue_ssp: toNum(item.issue_ssp),
                Issue_ssp_small: toNum(item.issue_ssp_small),
                Issue_swp_1: toNum(item.issue_swp_1),
                Issue_wsp: toNum(item.issue_wsp),
                Issue_bits: toNum(item.issue_bits),
                Issue_swp: toNum(item.issue_swp),
                Issue_bb: toNum(item.issue_bb),
                Issue_w_bb: toNum(item.issue_w_bb),
                Issue_bb_A: toNum(item.issue_bb_A),
                Issue_bb_1: toNum(item.issue_bb1),
                Issue_bb1_A: toNum(item.issue_bb1_A),
                Issue_bb_2: toNum(item.issue_bb_2),
                Issue_ssp1: toNum(item.issue_ssp_1),
                Issue_ssp1_small: toNum(item.issue_ssp_1_small),
                Issue_ssp2: toNum(item.issue_ssp_2),
                Issue_ssp2_small: toNum(item.issue_ssp_2_small),
                Issue_sdp: toNum(item.issue_sdp),

                Issue_Packing:  toNum(item.issue_ssp) +
                toNum(item.issue_ssp_small) +
                toNum(item.issue_swp_1) +
                toNum(item.issue_wsp) +
                toNum(item.issue_bits) +
                toNum(item.issue_swp) +
                toNum(item.issue_bb) +
                toNum(item.issue_w_bb) +
                toNum(item.issue_bb_A) +
                toNum(item.issue_bb1) +
                toNum(item.issue_bb1_A) +
                toNum(item.issue_bb_2) +
                toNum(item.issue_ssp_1) +
                toNum(item.issue_ssp_1_small) +
                toNum(item.issue_ssp_2) +
                toNum(item.issue_ssp_2_small) +
                toNum(item.issue_sdp),

                Issue_Husk: toNum(item.issue_husk),
                Issue_Rejection: toNum(item.issue_rejection),
                Issue_Village: toNum(item.issue_village),
                Issue_Sorting: toNum(item.issue_sorting),
                Issue_DPDS: toNum(item.issue_dpds),

                Current_Backlog: toNum(item.current_backlog),

                // Time (keep as string)
                Mc_On_Taiho: handleAMPM(item.Mc_on_1?.slice(0, 5)),
                Mc_Off_Taiho: handleAMPM(item.Mc_off_1?.slice(0, 5)),

                Mc_On_Spectrum: handleAMPM(item.Mc_on_2?.slice(0, 5)),
                Mc_Off_Spectrum: handleAMPM(item.Mc_off_2?.slice(0, 5)),

                Mc_On_Hamsa_Amrita: handleAMPM(item.Mc_on_3?.slice(0, 5)),
                Mc_Off_Hamsa_Amrita: handleAMPM(item.Mc_off_3?.slice(0, 5)),

                Operator_Day: toNum(item.noOfdayOperators),
                Operator_Night: toNum(item.noOfnightOperators),

                Edit_Status: item.editStatus,
                Created_By: item.CreatedBy,
                Modified_By: item.modifiedBy

        }),
        "BigTaiho"
      );

      // ========================= LW =========================
      addSheet(
        wb,
        lw.data.rcnEntries,
        (item: any, idx: number) => ({
         Sl_No: idx + 1,
            Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            LW_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,

            // Opening
            Opening_Mayur: toNum(item.rcv_mayur),
            Opening_Hamsa: toNum(item.rcv_hamsa),
            Opening_Wholes: toNum(item.rcv_wholes),

            // Borma
            Borma_Mayur: toNum(item.issue_add_7),
            Mayur_Borma_Loss_Kg: toNum(item.issue_add_2),
            Mayur_Borma_Loss_Percentage: toNum(item.issue_add_3),

            Borma_Hamsa: toNum(item.issue_add_8),
            Hamsa_Borma_Loss_Kg: toNum(item.issue_add_5),
            Hamsa_Borma_Loss_Percentage: toNum(item.issue_add_6),

            // Receive Total (FIXED)
            Receive_Total:
                toNum(item.issue_add_7) +
                toNum(item.issue_add_8) +
                toNum(item.rcv_wholes),

            // Issue fields
            issue_kw: toNum(item.issue_kw),
            issue_kw_1: toNum(item.issue_kw_1),
            issue_kw_2: toNum(item.issue_kw_2),
            issue_kn: toNum(item.issue_kn),
            issue_dw: toNum(item.issue_dw),
            issue_dw_1: toNum(item.issue_dw_1),
            issue_dw_2: toNum(item.issue_dw_2),
            issue_ow: toNum(item.issue_ow),
            issue_ow_1: toNum(item.issue_ow_1),
            issue_ow_2: toNum(item.issue_ow_2),
            issue_jw: toNum(item.issue_jw),
            issue_pw: toNum(item.issue_pw),
            issue_row: toNum(item.issue_row),
            issue_rej_1: toNum(item.issue_rej_1),

            issue_lw3_180: toNum(item.issue_lw3_180),
            issue_lw3_210: toNum(item.issue_lw3_210),
            issue_lw3_240: toNum(item.issue_lw3_240),
            issue_lw3_280: toNum(item.issue_lw3_280),
            issue_lw3_360: toNum(item.issue_lw3_360),

            issue_lw2: toNum(item.issue_lw2),
            issue_lw4: toNum(item.issue_lw4),
            issue_lw5: toNum(item.issue_lw5),
            issue_lw6: toNum(item.issue_lw6),
            issue_lw7: toNum(item.issue_lw7),

            issue_rej_3: toNum(item.issue_rej_3),
            issue_rej_4: toNum(item.issue_rej_4),
            issue_jb2: toNum(item.issue_jb2),
            issue_sjb: toNum(item.issue_sjb),

            issue_k_240: toNum(item.issue_k_240),
            issue_k_280: toNum(item.issue_k_280),
            issue_k_360: toNum(item.issue_k_360),

            issue_pkw: toNum(item.issue_pkw),
            issue_bw: toNum(item.issue_bw),
            issue_rw: toNum(item.issue_rw),
            issue_rrw: toNum(item.issue_rrw),
            issue_fw: toNum(item.issue_fw),
            issue_lw: toNum(item.issue_lw),

            // Total Packing (FIXED)
            Issue_Packing:
                toNum(item.issue_kw) +
                toNum(item.issue_kw_1) +
                toNum(item.issue_kw_2) +
                toNum(item.issue_kn) +
                toNum(item.issue_dw) +
                toNum(item.issue_dw_1) +
                toNum(item.issue_dw_2) +
                toNum(item.issue_ow) +
                toNum(item.issue_ow_1) +
                toNum(item.issue_ow_2) +
                toNum(item.issue_jw) +
                toNum(item.issue_pw) +
                toNum(item.issue_row) +
                toNum(item.issue_rej_1) +
                toNum(item.issue_lw3_180) +
                toNum(item.issue_lw3_210) +
                toNum(item.issue_lw3_240) +
                toNum(item.issue_lw3_280) +
                toNum(item.issue_lw3_360) +
                toNum(item.issue_lw2) +
                toNum(item.issue_lw4) +
                toNum(item.issue_lw5) +
                toNum(item.issue_lw6) +
                toNum(item.issue_lw7) +
                toNum(item.issue_rej_3) +
                toNum(item.issue_rej_4) +
                toNum(item.issue_jb2) +
                toNum(item.issue_sjb) +
                toNum(item.issue_k_240) +
                toNum(item.issue_k_280) +
                toNum(item.issue_k_360) +
                toNum(item.issue_pkw) +
                toNum(item.issue_bw) +
                toNum(item.issue_rw) +
                toNum(item.issue_rrw) +
                toNum(item.issue_fw) +
                toNum(item.issue_lw),

            // Others
            issue_village: toNum(item.issue_village),
            issue_bigTaiho: toNum(item.issue_bigTaiho),
            issue_hamsa: toNum(item.issue_hamsa),
            issue_rejection: toNum(item.issue_rejection),

            Current_Backlog: toNum(item.current_backlog),

            Labour: item.noOfdayOperators,
            Supervisor: item.noOfnightOperators,

            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy
        }),
        "LW"
      );

      // ========================= WHOLES =========================
      addSheet(
  wb,
  wholes.data.rcnEntries,
  (item: any, idx: number) => {

    const num = (val: any) => Number(val) || 0;

    const getReceiveTotal = (item: any) =>
      num(item.rcv_pw_210) + num(item.rcv_w_210) + num(item.rcv_ww_210) +
      num(item.rcv_pw_240) + num(item.rcv_w_240) + num(item.rcv_ww_240) +
      num(item.rcv_pw_280) + num(item.rcv_w_280) + num(item.rcv_ww_280) +
      num(item.rcv_pw_320) + num(item.rcv_w_320) + num(item.rcv_ww_320) +
      num(item.rcv_pw_360) + num(item.rcv_w_360) + num(item.rcv_ww_360) +
      num(item.rcv_pw_400) + num(item.rcv_w_400) + num(item.rcv_ww_400) +
      num(item.rcv_jb_mayur) + num(item.rcv_jb_hamsa);

    const receiveTotal = getReceiveTotal(item);

    const loss = num(item.issue_add_2);

    // ================= RECEIVE FIELDS =================
    const receiveFields: any = {};

    Object.keys(item).forEach((key) => {
      if (key.startsWith("rcv_")) {
        receiveFields[
          key.replace("rcv_", "Receive_")
        ] = num(item[key]);
      }
    });

    // ================= ISSUE FIELDS =================
    const issueFields: any = {};

    Object.keys(item).forEach((key) => {
      if (key.startsWith("issue_")) {
        issueFields[
          key.replace("issue_", "Issue_")
        ] = num(item[key]);
      }
    });

    return {
      Sl_No: idx + 1,

      Issue_Type:
        item.altid == 1
          ? "Fresh Issue"
          : "Re-Issue",

      Item_Lot_No: item.LotNo,

      Origin: item.origin,

      Issue_No: item.altid,

      Wholes_Entry_Date:
        handletimezone(item.date),

      Mixing_Lot: item.mixingLot,

      // ================= ALL RECEIVE FIELDS =================
      ...receiveFields,

      // ================= TOTALS =================
      Receive_Total:
        receiveTotal + loss,

      Receive_Total_Borma:
        receiveTotal,

      // ================= LOSS =================
      Borma_Loss_Kg: loss,

      Borma_Loss_Percentage:
        receiveTotal
          ? (
              (loss / receiveTotal) *
              100
            ).toFixed(2)
          : 0,

      // ================= ALL ISSUE FIELDS =================
      ...issueFields,

      // ================= PACKING =================
      Issue_Packing: Object.keys(item)
        .filter(
          (k) =>
            k.startsWith("issue_") &&
            ![
              "issue_village",
              "issue_bigTaiho",
              "issue_lw",
              "issue_rejection",
            ].includes(k)
        )
        .reduce(
          (sum, key) =>
            sum + num(item[key]),
          0
        ),

      // ================= FINAL =================
      Current_Backlog:
        num(item.current_backlog),

      Operator_Day:
        num(item.noOfdayOperators),

      Operator_Night:
        num(item.noOfnightOperators),

      Edit_Status: item.editStatus,

      Created_By: item.CreatedBy,

      Modified_By: item.modifiedBy,
    };
  },
  "Wholes"
);

      // ========================= VILLAGE =========================
      addSheet(
        wb,
        village.data.rcnEntries,
        (item: any, idx: number) => ({
          
        Sl_No: idx + 1,
        Issue_Type: item.altid == 1 ? "Fresh Issue" : "Re-Issue",
        Item_Lot_No: item.LotNo,
        Origin: item.origin,
        Issue_No: item.altid,
        Rejection_Entry_Date: handletimezone(item.date),
        Mixing_Lot: item.mixingLot,

        // 🔹 PEELING
        Opening_Peeling: num(item.rcv_peeling),
        Borma_Peeling: num(item.issue_add_10),
        Peeling_Borma_Loss_Kg: num(item.issue_add_2),
        Peeling_Borma_Loss_Percentage: num(item.issue_add_3),

        // 🔹 MAYUR
        Opening_Mayur: num(item.rcv_mayur),
        Borma_Mayur: num(item.issue_add_11),
        Mayur_Borma_Loss_Kg: num(item.issue_add_5),
        Mayur_Borma_Loss_Percentage: num(item.issue_add_6),

        // 🔹 REJECTION
        Opening_Rejection: num(item.rcv_rejection),
        Borma_Rejection: num(item.issue_add_12),
        Rejection_Borma_Loss_Kg: num(item.issue_add_8),
        Rejection_Borma_Loss_Percentage: num(item.issue_add_9),

        // 🔹 OPENINGS
        Opening_Wholes: num(item.rcv_wholes),
        Opening_LW: num(item.rcv_lw),
        Opening_DPDS: num(item.rcv_dpds),
        Opening_Sorting: num(item.rcv_sorting),
        Opening_BigTaiho: num(item.rcv_bigTaiho),

        // 🔥 CORRECT TOTAL
        Receive_Total:
          num(item.issue_add_10) +
          num(item.issue_add_11) +
          num(item.issue_add_12) +
          num(item.rcv_wholes) +
          num(item.rcv_lw) +
          num(item.rcv_dpds) +
          num(item.rcv_sorting) +
          num(item.rcv_bigTaiho),

        // 🔹 ISSUES
        issue_packing: num(item.issue_packing),
        issue_mayur: num(item.issue_mayur),
        issue_hamsa: num(item.issue_hamsa),
        issue_bigTaiho: num(item.issue_bigTaiho),
        issue_rejection: num(item.issue_rejection),
        issue_outside: num(item.issue_outside),

        // 🔹 EXTRA
        GatePass_No: item.Remarks,
        Current_Backlog: num(item.current_backlog),

        Labour: num(item.noOfdayOperators),
        Superisor: num(item.noOfnightOperators),

        Edit_Status: item.editStatus,
        Created_By: item.CreatedBy,
        Modified_By: item.modifiedBy

        }),
        "Village"
      );

       // ========================= REJECTION =========================
      addSheet(
        wb,
        rejection.data.rcnEntries,
        (item: any, idx: number) => ({
          
         Sl_No: idx + 1,
      Issue_Type: item.altid == 1 ? "Fresh Issue" : "Re-Issue",
      Item_Lot_No: item.LotNo,
      Origin: item.origin,
      Issue_No: item.altid,
      Rejection_Entry_Date: handletimezone(item.date),
      Mixing_Lot: item.mixingLot,

      // 🔹 PEELING
      Opening_Peeling: num(item.rcv_peeling),
      Borma_Peeling: num(item.issue_add_7),
      Peeling_Borma_Loss_Kg: num(item.issue_add_2),
      Peeling_Borma_Loss_Percentage: num(item.issue_add_3),

      // 🔹 MAYUR
      Opening_Mayur: num(item.rcv_mayur),
      Borma_Mayur: num(item.issue_add_8),
      Mayur_Borma_Loss_Kg: num(item.issue_add_5),
      Mayur_Borma_Loss_Percentage: num(item.issue_add_6),

      // 🔹 OPENINGS
      Opening_Wholes: num(item.rcv_wholes),
      Opening_LW: num(item.rcv_lw),
      Opening_DPDS: num(item.rcv_dpds),
      Opening_Sorting: num(item.rcv_sorting),
      Opening_BigTaiho: num(item.rcv_bigTaiho),
      Opening_Village: num(item.rcv_village),

      // 🔥 CORRECT TOTAL (fixed logic)
      Receive_Total:
        num(item.issue_add_7) +
        num(item.issue_add_8) +
        num(item.rcv_wholes) +
        num(item.rcv_lw) +
        num(item.rcv_dpds) +
        num(item.rcv_sorting) +
        num(item.rcv_bigTaiho) +
        num(item.rcv_village),

      // 🔹 ISSUES
      issue_packing: num(item.issue_packing),
      issue_village: num(item.issue_village),
      issue_uncut_unscoop: num(item.issue_uncut_unscoop),
      issue_shell: num(item.issue_shell),
      issue_catelfeed: num(item.issue_catelfeed),

      // 🔹 EXTRA
      Current_Backlog: num(item.current_backlog),
      Labour: num(item.noOfdayOperators),
      Superisor: num(item.noOfnightOperators),

      Edit_Status: item.editStatus,
      Created_By: item.CreatedBy,
      Modified_By: item.modifiedBy


        }),
        "Rejection"
      );

      // ========================= EXPORT =========================
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([wbout], {
        type: "application/octet-stream",
      });

      saveAs(blob, `RCN_All_Reports_${currDate}.xlsx`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-60 md:w-80 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md">
          <Download size={18} />
          Export Production Report
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Production Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Origin */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Origin
            </label>

           <Select value={origin} onValueChange={(val) => setOrigin(val)} required={true}>
                                                <SelectTrigger className="justify-center w-20 bg-cyan-100">
                                                    <SelectValue placeholder="Origin" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            Origin.map((item) => {
                                                                return (
                                                                    <SelectItem key={item} value={item}>
                                                                        {item}
                                                                    </SelectItem>
                                                                )
                                                            })
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
          </div>

          {/* From Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              From Date
            </label>

            <Input
              type="date"
              value={fromdate}
              onChange={(e) =>
                setFromdate(e.target.value)
              }
            />
          </div>

          {/* To Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              To Date
            </label>

            <Input
              type="date"
              value={todate}
              onChange={(e) =>
                setTodate(e.target.value)
              }
            />
          </div>

          {/* Button */}
          <Button
            className="w-full"
            disabled={loading}
            onClick={exportAllReports}
          >
            {loading
              ? "Downloading..."
              : "Download Excel"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProdAllExcel;