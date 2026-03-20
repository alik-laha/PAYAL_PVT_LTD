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
import QCOnlinePouch from "./QCOnlinePouch";
import QCOnlineTaiho from "./QCOnlineTaiho";
import QCOnlineBucket from "./QCOnlineBucket";
import QCOnlineNanopix from "./QCOnlineNanopix";
import QCOnlinePeeling from "./QCOnlinePeeling";
import QCOnlineHandGrade from "./QCOnlineHandGrade";
import QCOnlinePeelingTable from "./QCOnlinePeelingTable";
import QCOnlineTaihoTable from "./QCOnlineTaihoTable";
import QCOnlineNanopixTable from "./QCOnlineNanopixTable";
import QCOnlinePouchTable from "./QCOnlinePouchTable";
import QCOnlineBucketTable from "./QCOnlineBucketTable";
import QCOnlineHandGradeTable from "./QCOnlineHandGradeTable";
import DashboardFooter from "../dashboard/DashboardFooter";
import axios from "axios";
import QcKORInitial from './qcKORInitial'
import { FaHistory } from "react-icons/fa";
import QCProductionKORTable from "./QCKORTable";

//import QCWaterCreate from "./QCWaterCreate";
//import QCWaterTable from "./QCWaterTable";

// import IssueTable from "./IssueTable";

const QCOnline = () => {
  const [section, setSection] = useState<string>("");
  const [tablesection, setTablesection] = useState<string>("BOILER");

  const [lotdata, setLotData] = useState<any[]>([])
  const [maintable, setMainTable] = useState<string>('block')
  const [kortable, setKorTable] = useState<string>('none')
  const { data, isLoading, error } = UseQueryData(
    "/api/qconline/sumofallQCOnline",
    "GET",
    "AllBoilerQCOnlineSum"
  );
  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error</div>;
  }
  const handleTransferFetch =  () => {
        if(maintable === 'block'){
            setMainTable('none')
            setKorTable('block')
        }
        else{
            setMainTable('block')
            setKorTable('none')
        }
    }

   const handleOpenLotNo = async () => {
        axios.get('/api/qconline/getUnKOREntry/0').then(res => {
            console.log(res)
            setLotData(res.data.scoopingLot)
        })




    }
  return (
    <>
      <div>
        <DashboardHeader />
        <DashboardSidebar />

        <div className="dashboard-main-container">
          <div className="flexbox-header mx-2">
            <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
              <p>Boiler</p> <br />
              <p>{data.boilerdata} </p>
            </div>
            <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
              <p>Grading</p>
              <br />
              <p>{data.gradingdata}</p>
            </div>
            <div className="flexbox-tile bg-green-500 hover:bg-green-400">
              <p>Boiling</p>
              <br />
              <p>{data.boilingdata}</p>
            </div>
            <div className="flexbox-tile bg-red-500 hover:bg-red-400">
              <p>Scooping</p> <br />
              <p>{data.scoopingdata} </p>
            </div>
            <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
              <p>Borma</p>
              <br />
              <p>{data.bormadata} </p>
            </div>
            <div className="flexbox-tile bg-slate-400 hover:bg-slate-300">
             <p>Humidifier</p> 
              <br />
              <p>{data.humiddata} </p>
            </div>

           
          </div>
           <div className="flexbox-header mx-2">
            

            <div className="flexbox-tile bg-rose-500 hover:bg-rose-400">
              <p>Peeling</p>
              <br />
              <p>{data.peelingData} </p>
            </div>

            <div className="flexbox-tile bg-lime-500 hover:bg-lime-400">
              <p>Hand Grading</p>
              <br />
              <p>{data.handgradeData} </p>
            </div>

            <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
              <p>Nanopix</p>
              <br />
              <p>{data.nanopixData} </p>
            </div>

            <div className="flexbox-tile bg-slate-400 hover:bg-slate-300">
              <p>Taiho</p>
              <br />
              <p>{data.taihodata} </p>
            </div>

            <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
              <p>Bucket</p>
              <br />
              <p>{data.bucketData} </p>
            </div>

            <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
              <p>Pouch</p>
              <br />
              <p>{data.pouchData} </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold">
            QC DAILY ONLINE TRANSACTION
          </p>
          <div className="flex">
            <Dialog>
              <DialogTrigger >
                {" "}
                <Button
                  className="w-20 md:w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                  >
                  +  Add QC
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl" style={{ display: "block" }}>
                <DialogHeader>
                  <DialogTitle>
                    <p className="text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold">
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
                    <SelectTrigger className="w-2/4 justify-center bg-cyan-100 ">
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

                {section === "TAIHO" && <QCOnlineTaiho />}
                {section === "POUCH" && <QCOnlinePouch />}
                {section === "BUCKET" && <QCOnlineBucket />}
                {section === "NANOPIX" && <QCOnlineNanopix />}
                {section === "PEELING" && <QCOnlinePeeling />}
                {section === "HAND_GRADE" && <QCOnlineHandGrade />}
                  
                {/* <QCWaterCreate /> */}
              </DialogContent>
            </Dialog>

            <Dialog>
                        <DialogTrigger> <Button className="w-20 md:w-40 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add KOR</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>KOR Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <QcKORInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>

                      <Button className="w-20 md:w-40 bg-gradient-to-r from-purple-600 to-blue-400 hover:from-slate-500 hover:to-slate-300 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleTransferFetch}> {maintable==='block' ? 'KOR':'Online'}<FaHistory size={16} className='ml-2'/></Button>
           {/* <div className="mb-2 mt-5 responsive-button-adjust no-margin-left ml-4"> */}
<Select
              value={tablesection}
              onValueChange={(value) => setTablesection(value)}
              required={true}>
              <SelectTrigger className="w-28 md:w-40 justify-center h-10 bg-yellow-100 font-bold border-2 border-gray-300 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md">
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
          {/* <div className="mt-2 mb-5 flex justify-center items-center">
           
          </div> */}

          <div style={{ display: maintable }}>
          {tablesection==='BOILER' && <QCOnlineBoilerTable />}
          {tablesection==='GRADING' && <QCOnlineGradingTable />}
          {tablesection==='BOILING' && <QCOnlineBoilingTable />}
          {tablesection==='SCOOPING' && <QCOnlineScoopingTable />}
          {tablesection==='BORMA' && <QCOnlineBormaTable />}
          {tablesection==='HUMIDIFIER' && <QCOnlineHumidifierTable />}
          
           {tablesection==='PEELING' && <QCOnlinePeelingTable />}
           {tablesection==='TAIHO' && <QCOnlineTaihoTable />}
           {tablesection==='NANOPIX' && <QCOnlineNanopixTable />}
           {tablesection==='POUCH' && <QCOnlinePouchTable />}
           {tablesection==='BUCKET' && <QCOnlineBucketTable />}
           {tablesection==='HAND_GRADE' && <QCOnlineHandGradeTable />}
          </div>
            <div style={{ display: kortable }}>
              <QCProductionKORTable/>
            </div>

        
        </div>
        <DashboardFooter/>
      </div>
    </>
  );
};

export default QCOnline;
