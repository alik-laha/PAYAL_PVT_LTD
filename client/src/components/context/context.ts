import { createContext } from 'react';
import { AssetData, EditPendingData, GradingData, BoilingEntryData, SumofpackageMetrialReceving,
     rcnScoopingData ,sumofStorePrimary, sumofGeneralPrimary, AlmondPrimaryEntryData, sumofRcvVillagePrimary,
     AgarbatiPrimaryEntryData,
     IssueItemData,
     OilMillPrimaryEntryData,
     QCWaterData,
     BormaData,
     HumidData,
     PeelingData,
     MayurData,
     DPDSData,
     BigTaihoData,
     HamsaData,
     SortingData,
     WholesData,
     LWData,
     RejectionData,
     VilageData,
     sumofRcvVillageInPrimary,
     CashewOutEntryData,
     
     creditNoteEntryData} from '../../type/type';

interface ContextType {
    editPendingData: EditPendingData[];
    setEditPendingData: (data: EditPendingData[]) => void;
    count: number;
    setCount: (count: number) => void;
    setGenerateCaptcha: (captcha: string) => void;
    generateCaptcha: string;
    typedCaptcha: string;
    setTypedCaptcha: (captcha: string) => void;
    role: string;
    setRole: (role: string) => void;
    dept: string;
    setDept: (dept: string) => void;
    AllMachines: AssetData[];
    AllNewMachines: AssetData[];
    setAllMachines: (data: AssetData[]) => void;
    setAllNewMachines: (data: AssetData[]) => void;
    editPendiningGrinderData: GradingData[];
    editPendingBoilingData: BoilingEntryData[];
    editPendiningIssueItemData: IssueItemData[];
    editPendiningQCWaterData:QCWaterData[];
    setEditPendiningGrinderData: (data: GradingData[]) => void;
    setEditPendiningIssueItemData: (data: IssueItemData[]) => void;
    setEditPendiningQCWaterData: (data: QCWaterData[]) => void;
    setEditPendingBoilingData: (data: BoilingEntryData[]) => void;
    pendingqccount: number;
    setpendingqcCount: (pendingqccount: number) => void;
    pendingreportcount: number;
    setpendingreportCount: (pendingreportcount: number) => void;
    recevingPackagematerialOverView: SumofpackageMetrialReceving | null;
    setRecevingPacakanMaterialOverView: (data: SumofpackageMetrialReceving | null) => void;
    StorePrimaryOverView:sumofStorePrimary| null;
    setStorePrimaryOverView: (data: sumofStorePrimary | null) => void;
    RcvVillagePrimaryOverView:sumofRcvVillagePrimary| null;
    RcvVillageInPrimaryOverView:sumofRcvVillageInPrimary| null;
    setRcvVillagePrimaryOverView: (data: sumofRcvVillagePrimary | null) => void;
    setRcvVillageInPrimaryOverView: (data: sumofRcvVillageInPrimary | null) => void;
    GeneralPrimaryOverView:sumofGeneralPrimary| null;
    setGeneralPrimaryOverView: (data: sumofGeneralPrimary | null) => void;
    editPendingAlmondData: AlmondPrimaryEntryData[];
    setEditPendingAlmondData: (data: AlmondPrimaryEntryData[]) => void;
    editPendingAgarbatiData: AgarbatiPrimaryEntryData[];
    setEditPendingAgarbatiData: (data: AgarbatiPrimaryEntryData[]) => void;
    editPendingCashewOutData: CashewOutEntryData[];
    setEditPendingCashewOutData: (data: CashewOutEntryData[]) => void;
    editPendingOilMillData: OilMillPrimaryEntryData[];
    setEditPendingOilMillData: (data: OilMillPrimaryEntryData[]) => void;
    editPendingCreditNoteData: creditNoteEntryData[];
    setEditPendingCreditNoteData: (data: creditNoteEntryData[]) => void;
    editScoopingLotWiseData: rcnScoopingData[];
    setEditScoopingLotWiseData: (data: rcnScoopingData[]) => void;
    searchType: string;
    setSearchType: (data: string) => void;
    editBormaLotWiseData: BormaData[];
    setEditBormaLotWiseData: (data: BormaData[]) => void;
    editHumidLotWiseData: HumidData[];
    setEditHumidLotWiseData: (data: HumidData[]) => void;
    editPeelingLotWiseData: PeelingData[];
    setEditPeelingLotWiseData: (data: PeelingData[]) => void;
    editMayurLotWiseData: MayurData[];
    setEditMayurLotWiseData: (data: MayurData[]) => void;
    editDPDSLotWiseData: DPDSData[];
    setEditDPDSLotWiseData: (data: DPDSData[]) => void;
    editBigTaihoLotWiseData: BigTaihoData[];
    setEditBigTaihoLotWiseData: (data: BigTaihoData[]) => void;
    editHamsaLotWiseData: HamsaData[];
    setEditHamsaLotWiseData: (data: HamsaData[]) => void;
    editSortingLotWiseData: SortingData[];
    setEditSortingLotWiseData: (data: SortingData[]) => void;
    editWholesLotWiseData: WholesData[];
    setEditWholesLotWiseData: (data: WholesData[]) => void;
    editLWLotWiseData: LWData[];
    setEditLWLotWiseData: (data: LWData[]) => void;
    editRejectionLotWiseData: RejectionData[];
    setEditRejectionLotWiseData: (data: RejectionData[]) => void;

    editVillageLotWiseData: VilageData[];
    setEditVillageLotWiseData: (data: VilageData[]) => void;
    
}

const Context = createContext<ContextType>({
    editPendingData: [],
    AllMachines: [],
    AllNewMachines: [],
    setAllMachines: () => { },
    setAllNewMachines: () => { },
    setEditPendingData: () => { },
    count: 0,
    setCount: () => { },
    pendingqccount: 0,
    setpendingqcCount: () => { },
    pendingreportcount: 0,
    setpendingreportCount: () => { },
  
    generateCaptcha: '',
    setGenerateCaptcha: () => { },
    typedCaptcha: '',
    setTypedCaptcha: () => { },
    role: '',
    setRole: () => { },
    dept: '',
    setDept: () => { },
    editPendiningGrinderData: [],
    editPendiningIssueItemData: [],
    editPendiningQCWaterData: [],
    setEditPendiningGrinderData: () => { },
    setEditPendiningIssueItemData: () => { },
    setEditPendiningQCWaterData:() => { },
    editPendingBoilingData: [],
    setEditPendingBoilingData: () => { },
    setRecevingPacakanMaterialOverView: () => { },
    recevingPackagematerialOverView: (null),
    setStorePrimaryOverView: () => { },
    StorePrimaryOverView: (null),
    setGeneralPrimaryOverView: () => { },
    GeneralPrimaryOverView: (null),
    editScoopingLotWiseData: [],
    setEditScoopingLotWiseData: () => { },
    setSearchType: () => { },
    searchType: '',
    editBormaLotWiseData: [],
    setEditBormaLotWiseData: () => {},
    editPeelingLotWiseData: [],
    setEditPeelingLotWiseData: () => {},
    editMayurLotWiseData: [],
    setEditMayurLotWiseData: () => {},
    editHumidLotWiseData: [],
    setEditHumidLotWiseData: () => {},
    editPendingAlmondData: [],
    setEditPendingAlmondData: () => {},
    RcvVillagePrimaryOverView:(null),
    setRcvVillagePrimaryOverView: () => {},
    RcvVillageInPrimaryOverView:(null),
    setRcvVillageInPrimaryOverView: () => {},
    editPendingAgarbatiData: [],
    setEditPendingAgarbatiData: () => {},
    editPendingCashewOutData: [],
    setEditPendingCashewOutData: () => {},
    editPendingOilMillData: [],
    setEditPendingOilMillData: () => {},
    editPendingCreditNoteData: [],
    setEditPendingCreditNoteData: () => {},
    editDPDSLotWiseData: [],
    setEditDPDSLotWiseData: () => {},
    editBigTaihoLotWiseData: [],
    setEditBigTaihoLotWiseData: () => {},
    editHamsaLotWiseData: [],
    setEditHamsaLotWiseData: () => {},
    editSortingLotWiseData: [],
    setEditSortingLotWiseData: () => {},
    editWholesLotWiseData: [],
    setEditWholesLotWiseData: () => {},
    editLWLotWiseData: [],
    setEditLWLotWiseData: () => {},
    editRejectionLotWiseData: [],
    setEditRejectionLotWiseData: () => {},
    editVillageLotWiseData: [],
    setEditVillageLotWiseData: () => {}

});

export default Context;