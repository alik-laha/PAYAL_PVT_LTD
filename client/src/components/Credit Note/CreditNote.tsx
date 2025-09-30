import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UseQueryData from "../common/dataFetcher";
import { PermissionRole, rcnpendingLotData, rcvCheckRoles, SumofAllTypeDataCreditNote } from "@/type/type";

import { useContext, useState } from 'react';
import Context from '../context/context';
import axios from 'axios';
import Loader from '../common/Loader';
import { FY, pendingCheckRole, rcvCheckRole } from '../common/exportData';
import { pendingCheckRoles } from "@/type/type";
import CreditNoteInitial from './CreditNoteInitial';
import CreditNoteTable from './CreditNoteTable';
import RLOTInitial from './RlotInitial';




const CreditNote = () => {
    const { setEditPendingCreditNoteData } = useContext(Context);
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const [lotdata, setLotData] = useState<rcnpendingLotData[]>([])
    const [rlotdata, setRLotData] = useState<any[]>([])

    const handleEditFetch = async () => {
        const Data = await axios.get('/api/creditNote/getCreditNoteeditpending');
        console.log(Data)
        setEditPendingCreditNoteData(Data.data);
    };

    const checkpending = (tab: string) => {
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }
    const checkreceiving = (tab: string) => {
        //console.log(Role)
        if (rcvCheckRole[tab as keyof rcvCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }
    
    const { data, isLoading, error } = UseQueryData('/api/creditNote/sumofAllCreditNoteEntry', 'GET', 'AllOriginCreditNotePrimary');
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Error</div>;
    }
    const handleOpenLotNo = async () => {
        axios.get('/api/creditNote/getCreditNoteNotEntried/0').then(res => {
            console.log(res)
            setLotData(res.data.rcnLot)
        })

    }

    const handleOpenRLotNo = async () => {
        axios.get('/api/creditNote/getRcvCreditNoteRLOT').then(res => {
            console.log(res)
            setRLotData(res.data.rlotsum)
        })

    }


      function formatNumber(num: string) {
        return Number.isInteger(Number(num))
          ? parseInt(num)
          : parseFloat(num).toFixed(2);
      }
    return (
      <div>
        <DashboardHeader />

        <DashboardSidebar />
        <div className="dashboard-main-container">
          {/* <div className='dashboard-flex-head bg-gradient-to-r from-green-500 to-red-600 text-white'> Origin Wise RCN Received In Current Financial Year</div> */}
          <div className="flexbox-header">
            {data.AllOriginRcnPrimary &&
              data.AllOriginRcnPrimary.map(
                (item: SumofAllTypeDataCreditNote) => {
                  return (
                    <div
                      className="flexbox-tile bg-cyan-400 hover:bg-cyan-600"
                      key={item.origin}>
                      {item.origin} <br />
                      <p>
                        {item.quantity
                          ? formatNumber(String(item.quantity))
                          : 0}{" "}
                        Kg
                      </p>
                    </div>
                  );
                }
              )}
          </div>

          <p className="text-lg font-cursive text-center py-1 ">CURRENT FY {FY} CREDIT NOTE TRANSACTION</p>
          <div>
            {checkreceiving("RCNPrimaryEntry") && (
              <Dialog>
                <DialogTrigger>
                  {" "}
                  <Button
                    className="bg-lime-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left"
                    onClick={handleOpenLotNo}>
                    + Add New Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      <p className="text-1xl text-center mt-5">
                        Credit Note Receiving Pending List
                      </p>
                    </DialogTitle>
                  </DialogHeader>

                  <CreditNoteInitial props={lotdata} />
                </DialogContent>
              </Dialog>
            )}

            {checkreceiving('RCNPrimaryEntry') && <Dialog>
                <DialogTrigger>   <Button className="bg-rose-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left"
                onClick={handleOpenRLotNo}>+ Create R-LOT</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Day-Wise Pending List</p></DialogTitle>
                       
                    </DialogHeader>

                    <RLOTInitial props={rlotdata}/>
                </DialogContent>
            </Dialog>}

            {checkpending("RCNPrimary") && (
              <Button
                className="bg-orange-400 mb-2 ml-8 responsive-button-adjust"
                onClick={handleEditFetch}
                disabled={data.CountPendingEdit === 0 ? true : false}>
                Pending Edit ({data.CountPendingEdit})
              </Button>
            )}
          </div>
          <CreditNoteTable />
        </div>
      </div>
    );
}
export default CreditNote;