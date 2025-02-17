

export interface DatePickerProps {
    buttonName: string;
    value: Date | undefined;
    setValue: (value: Date | undefined) => void;

}

export interface RcnPrimaryEntryData {
   
    approvedBy: string;
    id: number;
    origin: string;
    blNo: string;
    conNo: string;
    rcnStatus: string;
    date: string;
    noOfBags: string;
    truckNo: string;
    blWeight: string;
    netWeight: string;
    difference: string;
    editStatus: string;
    receivedBy: string;
    createdAt: string;
    gatePassNo:string;
    grossWt:string;
    status:number;
    systemBags:string;            
}
export interface PackagingMeterialQc {
    packagingMaterialreceving: {
        id: number;
        gatePassNo:string;
        recevingDate: string;
        sku: string;
        vendorName: string;
        quantity: string;
        unit: string;
        invoicedate: string;
        invoice: string;
        createdBy: string;
        qualityStatus: string;
        editStatus: string;
        approvedBy: string;
    }
    id: number;
    qualityStatus: boolean;
    testingDate: string;
    length: number;
    width: number;
    height: number;
    gsm: number;
    avgWeight: number;
    leakageTest: string;
    dropTest: string;
    sealCondition: string;
    labelingCondition: string;
    coa: string;
    foodGradeCirtiicate: string;
    foodGradeCirtificateStatus: string;
    foodGradeCirtiFicateFile: string;
    coaCirtificateStatus: string;
    coaCirtificateFile: string;
    editStatus: string;
    createdBy: string;
    remarks: string;
    approvedBy: string;
    damageFile: string;
}
export interface AlmondPrimaryEntryData {
   
    approvedBy: string;
    id: number;
    recevingDate: string;
    noOfBags: string;
    truckNo: string;
    netWeight: string;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string;
    status:number;
    gateType: string,
    invoicedate: string;  
    invoice: string;  
    grade: string;  
    type: string;  
    vendorName: string;  
    totalWt:string;  
    totalBill:string;  
 
}
export interface OilMillPrimaryEntryData {
   
    approvedBy: string;
    id: number;
    recevingDate: string;
    quantity: string;
    truckNo: string;
    netWeight: string;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string;
    status:number;
    gateType: string,
    invoicedate: string;  
    invoice: string;  

    type: string;  
    vendorName: string;  
    totalWt:string;  
    totalBill:string;  
 
}
export interface AgarbatiPrimaryEntryData {
   
    approvedBy: string;
    id: number;
    recevingDate: string;
    noOfBags: string;
    truckNo: string;
    netWeight: string;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string;
    status:number;
    gateType: string,
    invoicedate: string;  
    invoice: string;  
    grade: string;  
    type: string;  
    vendorName: string;  
    totalWt:string;  
    totalBill:string;  
}
export interface BormaEntryData {
   
            id: number;
            LotNo: string;
            date: string;
            origin: string;
            InputWholes: string;
            InputPieces: string;
            TotalInput: string;
            Mc_on: string;
            Mc_off: string;
            Mc_breakdown: string;
            Mc_runTime: string;
            noOfOperators: string;
            otherTime: string;
            NoOfTrolley:string;
            InputMoisture: string;
            OutputMoisture: string;
            OutputWholes: string;
            OutputPieces: string;
            TotalOutput: string;
            BormaLoss: string;
            BormaStatus: number;
            Temp: string;
            CreatedBy: string;
            editStatus: string;
            modifiedBy:string
 
}

export interface RcvVillagePrimaryEntryData {
   
    approvedBy: string;
    id: number;
    recevingDate: string;
    quantity: string;
    truckNo: string;
    netWeight: string;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string;
    status:number;
    gateType: string,
    remarks:string;
    invoice: string;  
    sku: string;  
    type: string;  
    vendorName: string;  
    totalWt:string;  

 
}

export interface AlmondPrimaryExcelEntryData {
   
    ApprovedBy: string;
    id: number;
    ReceivingDate: string;
    Item_Count: string;
    Vehicle_No: string;
    netWeight: string|number;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string|number;
    gateType: string,
    invoicedate: string;  
    invoice: string;  
    grade: string;  
    type: string;  
    vendorName: string;  
    totalWt:string|number;  
    totalBill:string|number;  
 
}
export interface AgarbatiPrimaryExcelEntryData {
   
    ApprovedBy: string;
    id: number;
    ReceivingDate: string;
    Item_Count: string;
    Vehicle_No: string;
    netWeight: string|number;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string|number;
    gateType: string,
    invoicedate: string;  
    invoice: string;  
    grade: string;  
    type: string;  
    vendorName: string;  
    totalWt:string|number;  
    totalBill:string|number;  
 
}
export interface OilMillPrimaryExcelEntryData {
   
    ActionedBy: string;
    id: number;
    ReceivingDate: string;
    Item_Count: string;
    Vehicle_No: string;
    netWeight: string|number;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string|number;

    invoicedate: string;  
    invoice: string;  
  
    type: string;  
    vendorName: string;  
    totalWt:string|number;  
    totalBill:string|number;  
 
}
export interface RcvVillagePrimaryExcelEntryData {
   
    ApprovedBy: string;
    id: number;
    ReceivingDate: string;
    Item_Or_Bag_Count: string;
    Vehicle_No: string;
    netWeight: string|number;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string|number;
    gateType: string,

    invoice: string;  
    grade: string;  
    type: string;  
    vendorName: string;  
    totalWt:string|number;  

 
}



export interface rcnScoopingData {
    id: number;
    LotNo: string;
    date: string;
    origin: string;
    Opening_Qty: string;
    Receiving_Qty: string;
    Wholes: string;
    Broken: string;
    Uncut: string;
    Unscoop: string;
    NonCut: string;
    Rejection: string;
    Dust: string;
    TotBagCutting: string;
    KOR: string;
    noOfEmployees: number;
    noOfLadies: number;
    noOfGents: number;
    noOfSupervisors: number;
    noOfOperators: number,
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string;
    Mc_on: string;
    Mc_off: string;
    Trolley_Broken: string;
    Trolley_Small_JB: string;
    Mc_breakdown: string;
    Brkdwn_reason: string;
    otherTime: string;
    scoopStatus: string;
    Mc_runTime: string;
    SizeName: string;
    Scooping_Line_Mc:string;
    Transfered_Qty:string;
    Transfered_To:string;
}
export interface EditPendingData extends RcnPrimaryEntryData {
    editedBy: string;

}


export interface QcRcnEntryExcelData {
    id: number;
    gatePassNo:string;
    blNo: string;
    conNo: string;
    date: string;
    origin: string;
    truckNo: string;
    BLWeight: string;
    NoOfBags: string;
    QCStatus: string;
    sampling: string;
    moisture: string;
    nutCount: string;
    fluteRate: string;
    goodKernel: string;
    spIm: string;
    reject: string;
    shell: string;
    outTurn: string;
    Remarks: string;
    qcapprovedBy: string;
    reportStatus: string;
    EntriedBy: string;

    editStatus: string;
    editapprovedorRejectedBy: string;


}
export interface QcRcnEntryData {

    id: number;
    blNo: string;
    conNo: string;
    date: string;
    origin: string;
    sampling: string;
    moisture: string;
    nutCount: string;
    fluteRate: string;
    goodKernel: string;
    spIm: string;
    reject: string;
    shell: string;
    outTurn: string;
    Remarks: string;
    qcapprovedBy: string;
    reportStatus: number;
    createdBy: string;
    rcnEntry: RcnPrimaryEntryData;
    editStatus: string;
    editapprovedBy: string;
}

export interface scoopingpendingLotData {
    LotNo: string
}
export interface rcnpendingLotData {
    gatePassNo: string
}
export interface BormapendingLotData {
    LotNo: string
}
export interface HumidpendingLotData {
    LotNo: string
}
export interface ScoopData {
    LotNo: string;
    id: number;
    date: string;
    origin: string;
    SizeName: string;
    Size: string;
    Scooping_Line_Mc: string;
    Opening_Qty: string;
    Receiving_Qty: string;
    Wholes: string;
    Broken: string;
    Uncut: string;
    Unscoop: string;
    NonCut: string;
    Rejection: string;
    Dust: string;
    KOR: string;
    Trolley_Broken: string;
    Trolley_Small_JB: string;
    Transfered_To: string;
    scoopStatus: string;
    Mc_on: string;
    Mc_off: string;
    noOfEmployees: string;
    Mc_breakdown: string;
    otherTime: string;
    Brkdwn_reason: string;
    noOfLadies: string;
    noOfGents: string;
    noOfSupervisors: string;
    noOfOperators: string;
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string;
    Transfered_Qty:number;
}
export interface BormaData {
            id: number;
            LotNo: string;
            date: string;
            origin: string;
            InputWholes: string;
            InputPieces: string;
            TotalInput: string;
            Mc_on: string;
            Mc_off: string;
            Mc_breakdown: string;
            Mc_runTime: string;
            noOfOperators:string;
            otherTime: string;
            NoOfTrolley: string;
            InputMoisture: string;
            OutputMoisture: string;
            OutputWholes: string;
            OutputPieces: string;
            TotalOutput: string;
            BormaLoss: string;
            BormaStatus: string;
            Temp:string;
            CreatedBy: string;
            editStatus: string;
            modifiedBy: string;
}
export interface BormaExcelData {
    SL_No: number;
    LotNo: string;
    date: string;
    origin: string;
    InputWholes: string | number;
    InputPieces: string | number;
    TotalInput: string | number;
    Mc_on: string;
    Mc_off: string;
    Mc_breakdown: string;
    Mc_runTime: string;
    noOfOperators:string;
    otherTime: string;
    NoOfTrolley: string;
    InputMoisture: string | number;
    OutputMoisture: string | number;
    OutputWholes: string | number;
    OutputPieces: string | number;
    TotalOutput: string | number;
    BormaLoss: string | number;
   
    Temp:string;
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string;
}
export interface HumidData {
    id: number;
    LotNo: string;
    date: string;
    origin: string;
    
    TotalInput: string;
    Mc_on: string;
    Mc_off: string;
    Mc_breakdown: string;
    Mc_runTime: string;
    noOfOperators:string;
    otherTime: string;
    NoOfTrolley: string;
    InputMoisture: string;
    OutputMoisture: string;
  
    TotalOutput: string;
    MoistGain:string;
    Status: string;
    
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string;
}
export interface PeelingData {
    id: number;
            LotNo: string;
            date: string;
            origin: string;
            CreatedBy: string;
            editStatus: string;
            modifiedBy: string;
            Status:string;
            TotalInput: string;
            WholesPeel: string;
            WholesUnpeel:string;
            DP: string;
            DS: string;
            DP1: string;
            JJH: string;
            SJH: string;
            SJH1: string;
            JH1: string;
            JK_K: string;
            SP1: string;
            Mc_on: string;
            Husk: string;
            Rejection: string;
            UnpeelPiece: string;
            Big_Taiho: string;
            Mc_off: string;
            Mc_breakdown: string;
            Mc_runTime: string;
            noOfOperators: string;
            noOfdayOperators:string;
            noOfnightOperators:string;
            noOfhuskOperators:string;
            otherTime: string;
            NoOfTrolley: string;
            pressure: string;
            moisture: string;
            peelingTime: string;
            difference:string;
}
export interface MayurData {
    id: number;
    LotNo: string;
    date: string ;
    origin: string;
    altid: number;
    rcv_wholespeel: string;
    rcv_wholesunpeel: string;
     rcv_DPDS: string;
     rcv_transfer: string;
        rcv_sorting: string;
        rcv_village: string;
        issue_pw_w: string;
        issue_w_lot: string;
        issue_ww: string;
        issue_rejection: string;
        issue_village: string;
        issue_bigTaiho: string;
        issue_LW: string;
        issue_JB: string;
        entry_backlog: string;
        current_backlog: string;
        Mc_on_133: string;
        Mc_off_133: string;
        Mc_breakdown_133: string;
        Mc_runTime_133: string;
        otherTime_133: string;
        Mc_on_331: string;
        Mc_off_331: string;
        Mc_breakdown_331: string;
        Mc_runTime_331: string;
        otherTime_331: string;
        Mc_on_292: string;
        Mc_off_292: string;
        Mc_breakdown_292: string;
        Mc_runTime_292: string;
        otherTime_292: string;
        Mc_on_293: string;
        Mc_off_293: string;
        Mc_breakdown_293: string;
        Mc_runTime_293: string;
        otherTime_293: string;
    Status: number;
    latest: number;
    mixingLot: string | null;
    CreatedBy: string | null;
    editStatus: string;
    modifiedBy: string | null;
    noOfdayOperators:number;
    noOfnightOperators:number;
}
export interface DPDSData {
 
    id: number;
        LotNo: string;
        date: string;
        origin: string;
        altid: number;
        rcv_transfer: string;
        rcv_Sorting: string;
        rcv_dp: string;
        rcv_ds: string;
        rcv_dp1: string;
        issue_m_ds: string;
        issue_m_dp: string;
        issue_k_dp: string;
        issue_ds_1: string;
        issue_ds_2: string;
        issue_sp_2: string;
        issue_yjh: string;
        issue_yk: string;
        issue_kp: string;
        issue_wp: string;
        issue_rs: string;
        issue_dp_2: string;
        issue_dp_3: string;
        issue_dp_4: string;
        issue_dp_3l: string;
        issue_ss: string;
        issue_os: string;
        issue_os1: string;
        issue_add_1: string;
        issue_add_2: string;
        issue_add_3: string;
        issue_add_4: string;
        issue_add_5: string;
        issue_add_6: string;
        issue_add_7: string;
        issue_add_8: string;
        issue_add_9: string;
        issue_add_10: string;
        issue_rejection: string;
        issue_village: string;
        issue_bigTaiho: string;
        issue_mayur: string;
        entry_backlog: string;
        current_backlog: string;
        Status: number;
        latest: number;
        mixingLot: string|null;
        noOfdayOperators: number;
        noOfnightOperators: number;
        CreatedBy: string;
        editStatus: string;
        modifiedBy: string|null;


    
}
export interface BigTaihoData {
 
    id: number;
    LotNo: string;
    date: string;
    origin: string;
    altid: number;
    rcv_transfer: string ;
    rcv_peeling: string;
    rcv_village: string ;
    rcv_sorting: string ;
    rcv_dpds: string ;
    rcv_mayur: string ;
    rcv_hamsa: string ;
    rcv_lw: string ;
    rcv_wholes: string ;
    issue_ssp: string ;
    issue_ssp_small: string ;
    issue_swp_1: string ;
    issue_wsp: string ;
    issue_bits: string ;
    issue_swp: string ;
    issue_bb: string ;
    issue_w_bb: string ;
    issue_bb_A: string ;
    issue_bb1: string ;
    issue_bb1_A: string ;
    issue_bb_2: string ;
    issue_ssp_1:string ;
    issue_ssp_1_small: string ;
    issue_ssp_2: string ;
    issue_ssp_2_small: string ;
    issue_sdp: string ;
    issue_add_1: string;
    issue_add_2: string;
    issue_add_3: string;
    issue_add_4: string;
    issue_add_5: string;
    issue_add_6: string;
    issue_add_7: string;
    issue_add_8: string;
    issue_add_9: string;
    issue_add_10: string;
    issue_rejection: string ;
    issue_village: string ;
    issue_dpds: string ;
    issue_husk: string ;
    issue_sorting: string ;
    Mc_on_3: string ;
    Mc_off_3: string ;
    Mc_breakdown_3: string ;
    Mc_runTime_3: string ;
    otherTime_3: string ;
    Mc_on_1: string ;
    Mc_off_1: string ;
    Mc_breakdown_1: string ;
    Mc_runTime_1: string ;
    otherTime_1: string ;
    Mc_on_2: string ;
    Mc_off_2: string ;
    Mc_breakdown_2: string ;
    Mc_runTime_2: string ;
    otherTime_2: string ;
    entry_backlog: string;
    current_backlog: string;
    Status: number;
    latest: number;
    mixingLot: string | null;
    noOfdayOperators: number;
    noOfnightOperators: number;
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string | null;


    
}
export interface HamsaData {
 
    id: number;
    LotNo: string;
    date: string;
    origin: string;
    altid: number;
    rcv_transfer: string ;
    rcv_transfer_2: string;
    rcv_pw_w: string ;
    rcv_w_lot: string ;
    rcv_ww: string ;
    rcv_lw: string ;
    rcv_village: string ;
    issue_pw_210: string ;
    issue_w_210: string ;
    issue_ww_210: string ;
    issue_pw_240:string;
    issue_w_240: string ;
    issue_ww_240: string ;
    issue_pw_280:string;
    issue_w_280: string ;
    issue_ww_280: string ;
    issue_pw_320:string;
    issue_w_320: string ;
    issue_ww_320: string ;
    issue_pw_400:string;
    issue_w_400: string ;
    issue_ww_400: string ;
    issue_lw:string;
    issue_bigTaiho: string ;
    issue_jb:string;
    issue_add_1: string;
    issue_add_2: string;
    issue_add_3: string;
    issue_add_4: string;
    issue_add_5: string;
    issue_add_6: string;
    issue_add_7: string;
    issue_add_8: string;
    issue_add_9: string;
    issue_add_10: string;
    Mc_on_3: string ;
    Mc_off_3: string ;
    Mc_breakdown_3: string ;
    Mc_runTime_3: string ;
    otherTime_3: string ;
    Mc_on_1: string ;
    Mc_off_1: string ;
    Mc_breakdown_1: string ;
    Mc_runTime_1: string ;
    otherTime_1: string ;
    Mc_on_2: string ;
    Mc_off_2: string ;
    Mc_breakdown_2: string ;
    Mc_runTime_2: string ;
    otherTime_2: string ;
    Mc_on_4: string ;
    Mc_off_4: string ;
    Mc_breakdown_4: string ;
    Mc_runTime_4: string ;
    otherTime_4: string ;
    Mc_on_5: string ;
    Mc_off_5: string ;
    Mc_breakdown_5: string ;
    Mc_runTime_5: string ;
    otherTime_5: string ;
    Mc_on_6: string ;
    Mc_off_6: string ;
    Mc_breakdown_6: string ;
    Mc_runTime_6: string ;
    otherTime_6: string ;
    Mc_on_7: string ;
    Mc_off_7: string ;
    Mc_breakdown_7: string ;
    Mc_runTime_7: string ;
    otherTime_7: string ;
    entry_backlog: string;
    current_backlog: string;
    Status: number;
    latest: number;
    mixingLot: string | null;
    noOfdayOperators: number;
    noOfnightOperators: number;
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string | null;

}

export interface SortingData {
 
    id: number;
    LotNo: string;
    date: string;
    origin: string;
    altid: number;
    rcv_transfer: string;
    rcv_bigTaiho: string;
    rcv_jjh: string;
    rcv_sjh: string;
    rcv_sjh1: string;
    rcv_jh1: string;
    rcv_jk_k: string;
    rcv_sp1: string;
    issue_jjh: string;
    issue_jjh1: string;
    issue_sjh: string;
    issue_jk: string;
    issue_jk1: string;
    issue_k: string;
    issue_k1: string;
    issue_lwp1: string;
    issue_lwp: string;
    issue_s: string;
    issue_ss: string;
    issue_yk: string;
    issue_sp2: string;
    issue_kp: string;
    issue_add_1: string;
    issue_add_2: string;
    issue_add_3: string;
    issue_add_4: string;
    issue_add_5: string;
    issue_add_6: string;
    issue_add_7: string;
    issue_add_8: string;
    issue_add_9: string;
    issue_add_10: string;
    issue_rejection: string;
    issue_village: string;
    issue_bigTaiho: string;
    issue_mayur: string;
    issue_dpds: string;
    entry_backlog: string;
    current_backlog: string;
    Status: number;
    latest: number;
    mixingLot: string | null;
    noOfdayOperators: number;
    noOfnightOperators: number;
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string | null;

}



export interface HumidExcelData {
    SL_No: number;
    LotNo: string;
    date: string;
    origin: string;
    TotalInput: string | number;
    Mc_on: string;
    Mc_off: string;
    Mc_breakdown: string;
    Mc_runTime: string;
    noOfOperators:string;
    otherTime: string;
    NoOfTrolley: string;
    InputMoisture: string | number;
    OutputMoisture: string | number;
    TotalOutput: string | number;
    MoistGain:string | number;
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string;
}

export interface ExcelRcnPrimaryEntryData {
    SL_No: number;
    Approved_or_Reverted_By: string;
    Origin: string;
    Bl_No: string;
    Con_No: string;
    RCN_QC_Status: string;
    Date: string;
    Physical_Bag_Count: string;
    Truck_No: string;
    Bl_Weight: string;
    Net_Weight: string;
    Difference: string;
    Edit_Status: string;
    Created_by: string;
    GatePass_No:string;
    Gross_Weight:string;
    System_Bag_Count: string;


}

export interface SumofAllCuntryData {
    origin: string;
    totalBags: number;
}
export interface SumofAllTypeDataAlmond {
    type: string;
    totalBags: number;
}
export interface SumofAllTypeDataAgarbati {
    grade: string;
    totalBags: number;
}

export interface EmployeeData {
    id: number;
    employeeId: string;
    employeeName: string;
    designation: string;
    email: string;
    mobNo: string;
    alternateMobNo: string;
    aadhaarNo: string;
    panNo: string;
    heighstQualification: string;
    bloodGroup: string;
    dateOfJoining: string;
    releseDate: string;
    status: string;
    address: string;
    emergencyContact: string;
    emergencyMobNo: string;
    pfNo: string;
    pincode: string;
    createdBy: string;
    modifyedBy: string;
}

export interface User {
    id: number;
    employeeId: string;
    employeeName: string;
    userName: string;
    dept: string;
    role: string;
    createdBy: string;
    modifyedBy: string;
}

export interface UserProps {
    Data: {
        id: number;
        employeeId: string;
        employeeName: string;
        userName: string;
        dept: string;
        role: string;
        createdBy: string;
    }
}

export interface AssetData {
    primaryAsset: number;
    id: number;
    machineID: string;
    machineName: string;
    description: string;
    status: string;
    section: string;
    createdBy: string;
    modifiedBy: string;
}
export interface findskutypeData {
  sku:string;
}



export interface AssetDataExcel {
    primaryAsset: string;
    id: number;
    machineID: string;
    machineName: string;
    description: string;
    status: string;
    section: string;
    createdBy: string;
    modifiedBy: string;
}

export interface PermissionRole {
    Director: string[];
    FactoryManager: string[];
    ReceivingSupervisor: string[];
    ReceivingPMSupervisor: string[];
    ReceivingManager: string[];
    ReceivingAlmondSupervisor:string[];
    ReceivingStoreSupervisor: string[];
    ReceivingAgarbatiSupervisor:string[];
    ReceivingGeneralSupervisor:string[];
    ReceivingOilMillSupervisor:string[];
    QCSupervisor: string[];
    QCManager: string[];
    GradingSupervisor: string[];
    BoilingSupervisor: string[];
    ScoopingSupervisor: string[];
    PeelingSupervisor:string[];
    MayurSupervisor:string[];
    SortingSupervisor:string[];
    VillageSupervisor:string[];
    ProductionManager:string[];
    MaintainanceManager:string[];
    CleaningSupervisor:string[];
    BormaSupervisor:string[];
    Security:string[];
    GatePassManager:string[];

}

export interface PermissionDept {
    Admin: string[];
    Receiving: string[];
    Maintainance: string[];
    Production: string[];
    QualityControl: string[];
    GatePass:string[];
}
export interface BoilingEntryData {
    moisture: string;
    id: number;
    LotNo: string;
    date: string;
    origin: string;
    SizeName: string;
    Size: string;
    Scooping_Line_Mc: string;
    Pressure: string;
    CookingTime: string;
    MCName: string;
    Mc_on: string;
    Mc_off: string;
    noOfEmployees: string;
    Mc_breakdown: string;
    otherTime: string;
    CreatedBy: string;
    editStatus: string;
    Mc_runTime: string;
    modifiedBy: string;


}

export interface GradingData {
    id: number;
    date: string;
    origin: string;
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
    F: string;
    G: string;
    dust: string;
    Mc_name: string;
    Mc_on: string;
    Mc_off: string;
    noOfEmployees: number;
    Mc_breakdown: string;
    otherTime: string;
    grading_lotNo: string;
    Mc_runTime: string;
    editStatus: string;
    feeledBy: string;
    modifiedBy: string;
}
export interface IssueItemData {
    id: number;
    issueID: string;
    date: string;
    category: string;
    materialName: string;
    quantity: string;
    itemunit: string;
    unitPrice: string;
    totalPrice:string;
    section: string;
    subsection: string;
    sectionunit: string;
    issueUser: string;
    damagereturn: string;
    damagequantity: string;
    damageunit: string;
    remarks: string;
    CreatedBy: string;
    editStatus: string;
    modifiedBy:string;
  

}
export interface QCWaterData {

    id: number;
    date: string;
    Mc_on: string;
    feedph: string;
    feedtds: string;
    feedhardness: string;
    boilertype: string;
    ph: string;
    tds: string;
    day: string;
    night: string;
    wateruse: string;
    reading: string;
    remarks: string;
    CreatedBy: string;
    editStatus: string;
    modifiedBy:string;
    
  

}
export interface IssueItemDaywiseData {
    date: string;
    category: string; 
    totalIssuePrice:string;
    sectionunit: string;
}

export interface pendingCheckRoles {
    RCNPrimary: string[];
    QCRCN: string[];
    Grading: string[];
    Boiling: string[];
    Scooping: string[];
    Borma: string[];
    Humidifier:string[];
    Peeling:string[];
    Village:string[];
    Gatepass:string[];
    
}
export interface rcvCheckRoles {
    RCNPrimaryEntry: string[];
    PMPrimaryEntry:string[];
    StorePrimaryEntry:string[];
    AlmondPrimaryEntry:string[];
    GeneralPrimaryEntry:string[];
    VillagePrimaryEntry:string[];
    OilMillPrimaryEntry:string[];
    AgarbatiPrimaryEntry:string[];
}

export interface GradingExcelData {
    Sl_No: number;
    Entry_Date: string;
    Origin: string;
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
    F: string;
    G: string;
    Dust: string;
    Machine: string;
    MC_On: string;
    MC_Off: string;
    Labour_No: number;
    Breakdown_Duration: string;
    Other_Duration: string;
    Grading_Lot_No: string;
    Run_Duration: string;
    Edit_Status: string;
    Entried_By: string;
    ApprovedOrRejectedBy: string;
}

export interface TimePeriodProps {

    timeString: string
}
export interface BoilingExcelData {
    Sl_No: number;
    Lot_No: string;
    Entry_Date: string;
    Origin: string;
    Size: string;
    Boiling_Qty: string;
    Scooping_Line: string;
    Pressure: string;
    Moisture: string;
    Machine: string;
    MC_On: string;
    MC_Off: string;
    Labour_No: string;
    Breakdown_Duration: string;
    Other_Duration: string;
    Cooking_Time: string;
    Run_Duration: string;
    Edit_Status: string;
    Entried_By: string;
    ApprovedOrRejectedBy: string;




}


export interface SkuData {
    id: number;
    sku: string;
    unit: string;
    section:string;
    createdBy: string;
    type:string;
}
export interface VendorData {
    id: number;
    type:string;
    vendorName: string;
    vendorAddress:string;
    vendorContact:string;
    section:string;
    createdBy: string;
}

export interface PackageMaterialReceivingData {
    id: number;
    type:string;
    recevingDate: string;
    sku: string;
    vendorName: string;
    quantity: string;
    invoicequantity:string;
    unit: string;
    invoicedate:string;
    invoice:string;
    createdBy: string;
    qualityStatus: string;
    editStatus: string;
    approvedBy: string;
    truckNo: string;
    status: number;
    netWeight: string;
    gatePassNo:string;
    grossWt: string;
    totalWt:string;
    remarks:string;
    totalBill:string;
}

export interface storeprimaryData {
    id: number;
    type:string;
    recevingDate: string;
    sku: string;
    vendorName: string;
    quantity: string;
    invoicequantity:string;
    unit: string;
    invoicedate:string;
    invoice:string;
    createdBy: string;
    qualityStatus: string;
    editStatus: string;
    approvedBy: string;
    truckNo: string;
    status: number;
    netWeight: string;
    gatePassNo:string;
    grossWt: string;
    totalWt:string;
    totalBill:string;
    remarks:string;
    gateType:string;
}
export interface rcvVillageprimaryData {
    id: number;
    type:string;
    recevingDate: string;
    sku: string;
    vendorName: string;
    quantity: string;



    invoice:string;
    createdBy: string;
  
    editStatus: string;
    approvedBy: string;
    truckNo: string;
    status: number;
    netWeight: string;
    gatePassNo:string;
    grossWt: string;
    totalWt:string;

    remarks:string;
    gateType:string;
}
export interface generalprimaryData {
    id: number;
    type:string;
    recevingDate: string;
    sku: string;
    vendorName: string;
    quantity: string;
    invoicequantity:string;
    unit: string;
    invoicedate:string;
    invoice:string;
    createdBy: string;
    qualityStatus: string;
    editStatus: string;
    approvedBy: string;
    truckNo: string;
    status: number;
    netWeight: string;
    gatePassNo:string;
    grossWt: string;
    totalWt:string;
    remarks:string;
    gateType:string;
    totalBill:string;
}

export interface SumofpackageMetrialReceving {
    sumOfAllRecenvingPackageMaterial: number;
    packagingMaterial: number;
}
export interface sumofStorePrimary {
    sumofStorePrimary: number;
    storePrimary: number;
}
export interface sumofRcvVillagePrimary {
    sumofRcvVillagePrimary: number;
    RcvVillagePrimary: number;
}
export interface sumofGeneralPrimary {
    sumofGeneralPrimary: number;
    GeneralPrimary: number;
}

export interface ExcelrecevingPackageMaterialData {
    Sl_No: number;
    Entry_Date: string;
    SKU: string;
    Vendor_Name: string;
    Physical_Quantity: string|number;
    Invoice_Quantity: string;
    Unit: string;
    Quality_Status: string;
    Edit_Status: string;
    Invoice:string;
    Invoice_Date:string;
    Approved_Or_Rejected_By: string;
    Created_By: string;
    Type_Of_Material:string;
    Line_Weight:string|number;
    GatePass_No:string;
    Gross_Wt:string;
    Net_Wt:string;
    Vehicle_No:string;
    Remarks:string;
    Total_Bill:string|number;
}
export interface ExcelStorePrimaryData {
    Sl_No: number;
    Gate_Pass_Type:string;
    Entry_Date: string;
    SKU: string;
    Vendor_Name: string;
    Physical_Quantity: string|number;
    Invoice_Quantity: string;
    Unit: string;
    Quality_Status: string;
    Edit_Status: string;
    Invoice:string;
    Invoice_Date:string;
    Approved_Or_Rejected_By: string;
    Created_By: string;
    Type_Of_Material:string;
    Line_Weight:string|number;
    Bill_Amount:string|number;
    GatePass_No:string;
    Gross_Wt:string;
    Net_Wt:string;
    Vehicle_No:string;
    Remarks:string;
}


export interface ScoopingExcelData {
    SL_No: number;
    LotNo: string;
    date: string;
    origin: string;
    Opening_Qty: string;
    Receiving_Qty: string;
    Wholes: string;
    Broken: string;
    Uncut: string;
    Unscoop: string;
    NonCut: string;
    Rejection: string;
    Dust: string;
    TotBagCutting: string;
    KOR: string;
    LineWiseLadies: number;
    Common_Ladies: number;
    Common_Gents: number;
    Common_Supervisors: number;
    LineWiseOperator: number,
    CreatedBy: string;
    editStatus: string;
    modifiedBy: string;
    Mc_on: string;
    Mc_off: string;
    Trolley_Broken: string;
    Trolley_Small_JB: string;
    Mc_breakdown: string;
    Brkdwn_reason: string;
    otherTime: string;
    scoopStatus: string;
    Mc_runTime: string;
    SizeName: string;
    Scooping_Line_Mc:string;
    Transfered_Qty:string;
    Transfered_To:string;

}

export interface GatePassData {
            id: number;
            gatePassNo: string;
            type:string;
            date: string;
            time: string;
            grosswt: string;
            DocNo: string;
            grosswtNo: string;
            vehicleNo: string;
            driverName: string;
            driverContact: string;
            securityName: string;
            section: string;
            receivingStatus: number;
            netWeight: string;
            approvalStatus: number;
            billAmount: string;
            createdBy: string;
            status: string;
            modifiedBy: string;
            OutTime:string;
            Remarks:string;
            exitdate:string;
          
}
export interface GatePassExcelData {
    Id: number;
    GatePassNo: string;
    Type:string;
    Entry_Date: string;
    In_Time: string;
    Gross_Or_Tare_Wt: string;
    DocNo: string;
    Gross_Or_Tare_Wt_Bill: string;
    VehicleNo: string;
    DriverName: string;
    DriverContact: string;
    SecurityName: string;
    Section: string;
    NetWeight: string;
    Exit_Date: string;
    BillAmount: string;
    Status: string;
    Verified_By: string;
    OutTime:string;
    Remarks:string;
  
}


