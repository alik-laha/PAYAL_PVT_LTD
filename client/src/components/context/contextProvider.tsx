import Context from "./context.ts";
import { ReactNode } from "react";
import { useState } from "react";
import { AssetData, EditPendingData, GradingData, BoilingEntryData, SumofpackageMetrialReceving, rcnScoopingData,sumofStorePrimary, sumofGeneralPrimary, AlmondPrimaryEntryData, sumofRcvVillagePrimary } from "../../type/type";

interface ContextProviderProps {
    children: ReactNode;
}
const ContextProvider = ({ children }: ContextProviderProps) => {
    const [editPendingData, setEditPendingData] = useState<EditPendingData[]>([])
    const [count, setCount] = useState<number>(0)
    const [generateCaptcha, setGenerateCaptcha] = useState<string>('')
    const [typedCaptcha, setTypedCaptcha] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [AllMachines, setAllMachines] = useState<AssetData[]>([])
    const [AllNewMachines, setAllNewMachines] = useState<AssetData[]>([])
    const [dept, setDept] = useState<string>('')
    const [editPendiningGrinderData, setEditPendiningGrinderData] = useState<GradingData[]>([])
    const [editPendingBoilingData, setEditPendingBoilingData] = useState<BoilingEntryData[]>([])
    const [pendingqccount, setpendingqcCount] = useState<number>(0)
    const [pendingreportcount, setpendingreportCount] = useState<number>(0)
    const [recevingPackagematerialOverView, setRecevingPacakanMaterialOverView] = useState<SumofpackageMetrialReceving | null>(null)
    const [editScoopingLotWiseData, setEditScoopingLotWiseData] = useState<rcnScoopingData[]>([])
    const [editBormaLotWiseData, setEditBormaLotWiseData] = useState<any[]>([])
    const [editHumidLotWiseData, setEditHumidLotWiseData] = useState<any[]>([])
    const [searchType, setSearchType] = useState<string>('LotWise')
    const [StorePrimaryOverView, setStorePrimaryOverView] = useState<sumofStorePrimary | null>(null)
    const [RcvVillagePrimaryOverView, setRcvVillagePrimaryOverView] = useState<sumofRcvVillagePrimary | null>(null)
    const [GeneralPrimaryOverView, setGeneralPrimaryOverView] = useState<sumofGeneralPrimary | null>(null)
    const [editPendingAlmondData, setEditPendingAlmondData] = useState<AlmondPrimaryEntryData[]>([])

    return (
        <Context.Provider value={{
            editPendingData, setEditPendingData, count, setCount,
            generateCaptcha, setGenerateCaptcha, typedCaptcha, setTypedCaptcha, role, setRole, dept, setDept, AllMachines, setAllMachines,
            AllNewMachines, setAllNewMachines, editPendiningGrinderData, setEditPendiningGrinderData,
            editPendingBoilingData, setEditPendingBoilingData, pendingqccount, setpendingqcCount, pendingreportcount,
            setpendingreportCount, recevingPackagematerialOverView, setRecevingPacakanMaterialOverView,
            editScoopingLotWiseData, setEditScoopingLotWiseData, searchType, setSearchType,editBormaLotWiseData,setEditBormaLotWiseData,
            StorePrimaryOverView,setStorePrimaryOverView,GeneralPrimaryOverView,setGeneralPrimaryOverView,editPendingAlmondData,setEditPendingAlmondData
            ,RcvVillagePrimaryOverView,setRcvVillagePrimaryOverView,editHumidLotWiseData,setEditHumidLotWiseData
        }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider