import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Stock_Match_Section } from "../common/exportData";
import DPDSStockAdjust from "./DPDSStockAdjust";
import SortingStockAdjust from "./SortingStockAdjust";
import BigTaihoStockAdjust from "./BigTaihoStockAdjust";
import LowerGradeAdjust from "./LowerGradeAdjust";
import VillageStockAdjust from "./VillageStockAdjust";
import WholesStockAdjust from "./WholesStockAdjust";
const StockAdjust = () => {
    const [tablesection, setTablesection] = useState<string>("");

    return(
        <>
        <div className="w-full flex justify-center mt-4">

  <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-xl shadow-md border">

    {/* Label */}
    <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
      Section
    </div>

    {/* Select */}
    <Select
      value={tablesection}
      onValueChange={(value) => setTablesection(value)}
    >
      <SelectTrigger className="w-36 h-9 text-center font-semibold border bg-yellow-100 border-gray-300 focus:ring-2 focus:ring-blue-400">
        <SelectValue placeholder="Select Section" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {Stock_Match_Section.map((item: any, indx) => (
            <SelectItem key={indx} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>

  </div>

</div>
        

             {tablesection === "DPDS" && <DPDSStockAdjust />}
              {tablesection === "SORTING" && <SortingStockAdjust />}
              {tablesection === "TAIHO" && <BigTaihoStockAdjust />}
              {tablesection === "LW" && <LowerGradeAdjust />}
              {tablesection === "VILLAGE" && <VillageStockAdjust />}

                {tablesection === "WHOLES" && <WholesStockAdjust />}
        </>
    )

    
}

export default StockAdjust;
