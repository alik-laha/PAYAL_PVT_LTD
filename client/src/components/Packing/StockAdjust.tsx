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
const StockAdjust = () => {
    const [tablesection, setTablesection] = useState<string>("WHOLES");

    return(
        <>

        <Select
              value={tablesection}
              onValueChange={(value) => setTablesection(value)}
              required={true}>
              <SelectTrigger className="w-28 md:w-40 justify-center h-10 bg-yellow-100 font-bold border-2 border-gray-300 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md">
                <SelectValue placeholder="Section Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Stock_Match_Section.map((item: any, indx) => {
                    return (
                      <SelectItem key={indx} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

             {tablesection === "DPDS" && <DPDSStockAdjust />}
              {tablesection === "SORTING" && <SortingStockAdjust />}
        </>
    )

    
}

export default StockAdjust;
