import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
import { Button } from "../ui/button";

import { QC_Online_Section } from "../common/exportData";

import { useState } from "react";

import Loader from "../common/Loader";
import UseQueryData from "../common/dataFetcher";
import { Label } from "../ui/label";
import QCOnlineBoiler from "./QCOnlineBoiler";
import QCOnlineBoiling from "./QCOnlineBoiling";
import QCOnlineGrading from "./QCOnlineGrading";
import QCOnlineScooping from "./QCOnlineScooping";
import QCOnlineBorma from "./QCOnlineBorma";
import QCOnlineHumid from "./QCOnlineHumid";
import QCOnlineBoilerTable from "./QCOnlineBoilerTable";
import QCOnlineGradingTable from "./QCOnlineGradingTable";
import QCOnlineBoilingTable from "./QCOnlineBoilingTable";
import QCOnlineScoopingTable from "./QCOnlineScoopingTable";
import QCOnlineBormaTable from "./QCOnlineBormaTable";
import QCOnlineHumidifierTable from "./QCOnlineHumidifierTable";
//import QCWaterCreate from "./QCWaterCreate";
//import QCWaterTable from "./QCWaterTable";

// import IssueTable from "./IssueTable";

const QCOnline = () => {
  const [section, setSection] = useState<string>("");
  const [tablesection, setTablesection] = useState<string>("BOILER");
  const { data, isLoading, error } = UseQueryData(
    "/api/qconline/sumofallQCOnline",
    "GET",
    "AllBoilerQCWaterSum"
  );
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <>
      <div>
        <DashboardHeader />
        <DashboardSidebar />

        <div className="dashboard-main-container">
          <div className="flexbox-header">
            <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
              Boiler <br />
              <p>{data.boilerdata} </p>
            </div>
            <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
              Grading
              <br />
              <p>{data.gradingdata}</p>
            </div>
            <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
              Boiling
              <br />
              <p>{data.boilingdata}</p>
            </div>
            <div className="flexbox-tile bg-lime-500 hover:bg-orange-400">
              Scooping <br />
              <p>{data.scoopingdata} </p>
            </div>
            <div className="flexbox-tile bg-purple-500 hover:bg-orange-400">
              Borma
              <br />
              <p>{data.bormadata} </p>
            </div>
            <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
              Humidifier
              <br />
              <p>{data.humiddata} </p>
            </div>
          </div>
          <p className="text-lg font-semibold text-center py-1 ">
            QC Daily Online Test
          </p>
          <div>
            <Dialog>
              <DialogTrigger disabled={data.EditData > 0 ? true : false}>
                {" "}
                <Button
                  className="bg-red-500 mb-2 mt-5 responsive-button-adjust no-margin-left ml-4"
                  disabled={data.EditData > 0 ? true : false}>
                  + Add New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl" style={{ display: "block" }}>
                <DialogHeader>
                  <DialogTitle>
                    <p className="text-1xl pb-1 text-center mt-5">
                      QC Online Test
                    </p>
                  </DialogTitle>
                </DialogHeader>
                <div className="flex mt-2 px-6 pt-6 pb-3">
                  <Label className="w-2/4 pt-1 ">Section Name</Label>
                  <Select
                    value={section}
                    onValueChange={(value) => setSection(value)}
                    required={true}>
                    <SelectTrigger className="w-2/4 justify-center bg-cyan-100">
                      <SelectValue placeholder="Section Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {QC_Online_Section.map((item: any, indx) => {
                          return (
                            <SelectItem key={indx} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {section === "BOILER" && <QCOnlineBoiler />}
                {section === "BOILING" && <QCOnlineBoiling />}
                {section === "GRADING" && <QCOnlineGrading />}
                {section === "SCOOPING" && <QCOnlineScooping />}
                {section === "BORMA" && <QCOnlineBorma />}
                {section === "HUMIDIFIER" && <QCOnlineHumid />}
                {/* <QCWaterCreate /> */}
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-2 mb-5 flex justify-center items-center">
            <Select
              value={tablesection}
              onValueChange={(value) => setTablesection(value)}
              required={true}>
              <SelectTrigger className="w-1/4 justify-center">
                <SelectValue placeholder="Section Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QC_Online_Section.map((item: any, indx) => {
                    return (
                      <SelectItem key={indx} value={item}>
                        {item}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {tablesection==='BOILER' && <QCOnlineBoilerTable />}
          {tablesection==='GRADING' && <QCOnlineGradingTable />}
          {tablesection==='BOILING' && <QCOnlineBoilingTable />}
          {tablesection==='SCOOPING' && <QCOnlineScoopingTable />}
          {tablesection==='BORMA' && <QCOnlineBormaTable />}
           {tablesection==='HUMIDIFIER' && <QCOnlineHumidifierTable />}
        </div>
      </div>
    </>
  );
};

export default QCOnline;
