export interface RcnPrimaryModifyProps {
    id: number;
    origin: string;
    blNo: string;
    conNo: string;
    truckNo: string;
    noOfBags: string;
    blWeight: string;
    netWeight: string;
    rcnStatus: string;
    editedBy: string;
    date: Date;
    gatePassNo:string;
    grossWt:string;
    systemBags:string;
    difference:string;

}
export interface AlmondModifyProps {
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
    systemBags:string;  
    gateType: string,
    invoicedate: string;  
    invoice: string;  
    grade: string;  
    type: string;  
    vendorName: string;  
    totalWt:string;  
    totalBill:string;  

}
export interface AgarbatiModifyProps {
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
    systemBags:string;  
    gateType: string,
    invoicedate: string;  
    invoice: string;  
    grade: string;  
    type: string;  
    vendorName: string;  
    totalWt:string;  
    totalBill:string;  

}
export interface OilMillModifyProps {
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
    systemBags:string;  
    gateType: string,
    invoicedate: string;  
    invoice: string;  
  
    type: string;  
    vendorName: string;  
    totalWt:string;  
    totalBill:string;  

}

export interface qcapproveprops {
    rcnStatus: string;
}

export interface qcRCNModifyProps {
    id: number;
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
    editStatus: string;
    editapprovedBy: string;
}

export interface UserData {
    id: number;
    userName: string;
    password: string;
    role: string;
    dept: string;
    createdBy: string;
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
    address: string;
    pincode: string;
}
export interface lotNoData {
    id: number;
    lotNo: string;
}

export interface vlotNoData {
    id: number;
    vlotNo: string;
}

export interface orderNoData {
    id: number;
    orderNo: string;
}

export interface TokenVerify {
    employeeId: string;
    role: string;
    dept: string;
    exp: number;
}

export interface RcnGradingData {
    id: number;
    date: Date;
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
    F: string;
    G: string;
    dust: string;
    Mc_on: string;
    Mc_off: string;
    Mc_breakdown: string;
    noOfEmployees: string;
    grading_lotNo: string;
    Mc_name: string;
    origin: string;
    otherTime: string;
    feeledBy: string;
    Mc_runTime: string;
    modifiedBy: string;
}

export interface RcnBoilingData {
    id: number;
    LotNo: string;
    date: string;
    origin: string;
    SizeName: string;
    Size: string;
    Scooping_Line_Mc: string;
    Pressure: string;
    moisture: string;
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


export interface PackageMaterialReceivingData {
    id: number;
    recevingDate: string;
    sku: string;
    vendorName: string;
    quantity: string;
    invoicequantity: string;
    unit: string;
    createdBy: string;
    invoice: string;
    invoicedate: string;
    qualityStatus: string;
    totalWt:string;
    totalBill:string;
    remarks:string;
    editStatus: string;
    approvedBy: string;
    type:string;

}
export interface storeRcvData {
    id: number;
    type:string;
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
    totalBill:string;
    netWeight: string;
 
    totalWt:string;
    remarks:string;
    gateType:string;

}
export interface StoreIssueData {
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
    sectionunit: string;
    issueUser: string;
    damagereturn: string;
    damagequantity: string;
    damageunit: string;
    remarks: string;
    CreatedBy: string;
    editStatus: string;
    modifiedBy:string;
    subsection:string;

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

export interface StoreStockData {

    id: number;
    sku:string;
    quantity:string;
    thresoldquantity:string;
}
export interface AlmondrcvData {
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
    systemBags:string;  
    gateType: string,
    invoicedate: string;  
    invoice: string;  
    grade: string;  
    type: string;  
    vendorName: string;  
    totalWt:string; 
    totalBill:string; 

}
export interface cashewOutRcvData {
   id: number;
    date: string; // ISO date string (e.g. "2025-05-12T00:00:00.000Z")
    gatePassNo: string;
    batchNo: string;
    partyName: string;
    gradeName: string;
    grossWt: string;
    truckNo: string;
    quantity: string;
    actualquantity: string;
    status: number;
    invoice: string;
    netWeight: string;
    noOfBags: string;
    noOfActualBags: string;
    origin: string;
    editStatus: string;
    createdBy: string;
    approvedBy: string;

}
export interface BormarcvData {
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
export interface HumidrcvData {
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
export interface PeelingRcvData {
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
export interface VillageRcvData {
    approvedBy: string;
    id: number;
    recevingDate: string;
    truckNo: string;
    netWeight: string;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string;
    status:number;
    quantity:string;
    gateType: string,
    invoice: string;  
    sku: string;  
    type: string;  
    vendorName: string;  
    totalWt:string; 
    remarks:string;

}
export interface VillageInRcvData {
    approvedBy: string;
    id: number;
    recevingDate: string;
    truckNo: string;
    netWeight: string;
    editStatus: string;
    createdBy: string;
    gatePassNo:string;
    grossWt:string;
    status:number;
    quantity:string;
    gateType: string,
    invoice: string;  
    sku: string;  
    type: string;  
    vendorName: string;  
    totalWt:string; 
    remarks:string;
    origin:string;
      wholes_quantity: string ;
        wholes_prcntg: string ;
    
        lw_quantity: string ;
        lw_prcntg: string ;
    
        jb_quantity: string ;
        jb_prcntg: string;
    
        jbp_quantity: string ;
        jbp_prcntg: string ;
    
        sdp_quantity: string ;
        sdp_prcntg: string ;
    
        husk_quantity: string ;
        husk_prcntg: string ;
    
        pieces_quantity: string ;
        pieces_prcntg: string ;
    
        dp_quantity: string ;
        dp_prcntg: string ;

        e1_quantity: string ;
    e1_prcntg: string ;

}

export interface GraddingCleanData {
    id: number;
    date: string;
    mc_name: string;
    dustTable: boolean;
    hopper: boolean;
    elevetorCups: boolean;
    elevetorMotorCleanByAir: boolean;
    McAllPartsClean: boolean;
    binClean: boolean;
    CallibrationRollerHolesClean: boolean;
    percentage: number;
    damage: boolean;
    partsName: string;
    createdAt: Date;
    updatedAt: Date;
    cleanedBy: string;
    cleanedPartsImages: string;
    damagedPartsImages: string;
}

export interface BoilingCleanData {
    id: number;
    date: string;
    mc_name: string;
    motorAndOtherPartsCleaning: boolean;
    cookingInsideWashByStream: boolean;
    drainLineCleaning: boolean;
    waterWashChemberCleaning: boolean;
    pressureGageCleanning: boolean;
    hopper: boolean;
    elevetorCup: boolean;
    percentage: number;
    damage: boolean;
    createdAt: Date;
    updatedAt: Date;
    partsName: string;
    cleanedBy: string;
    cleanedPartsImages: string;
    damagedPartsImages: string;
}

export interface ScoopingSectionCuttingCleanData {
    id: number;
    date: string;
    mc_name: string;
    gear_m3_30ta: boolean;
    gear_m3_40tb: boolean;
    gear_m372ta_50_18r: boolean;
    sap: boolean;
    bladeUp: boolean;
    bladeDown: boolean;
    speaderDown: boolean;
    brushBig: boolean;
    brushSmall: boolean;
    chainOneSmall: boolean;
    chainTwoLarge: boolean;
    chainThreeBig: boolean;
    chainFourBigTwo: boolean;
    bigChainPatti: boolean;
    bigTwoChainPatti: boolean;
    spring: boolean;
    trayCup: boolean;
    gear_m3_60ta: boolean;
    motorPinionGear: boolean;
    cuttingChain: boolean;
    damage: boolean;
    partsName: string;
    percentage: number;
    createdAt: Date;
    updatedAt: Date;
    cleanedBy: string;
    cleanedPartsImages: string;
    damagedPartsImages: string;
}

export interface AbhayMcCleanData {
    id: number;
    date: string;
    mainElevetorCup: boolean;
    mainElevetorGearBox: boolean;
    mainElevetorSpocket: boolean;
    mainElevetorChain: boolean;
    vibretor_1_scooperFan: boolean;
    vibretor_1_clamSap: boolean;
    vibretor_1_towerBlower: boolean;
    vibretor_2_clamSap: boolean;
    vibretor2_scooperFan: boolean;
    vibretor_2_towerBlower: boolean;
    wholesElevetorCup: boolean;
    wholesElevetorSap: boolean;
    wholesElevetorBlower: boolean;
    wholesElevetorPully: boolean;
    wholeElevetorSplitsAndBlower: boolean;
    wholeElevetorGearBox: boolean;
    sizerElevetor_1_cup: boolean;
    sizerElevetor_2_cup: boolean;
    shellHopper: boolean;
    shelllBlower: boolean;
    sizerElevetor_2toUnscoopTableScooperFan: boolean;
    panaboardAllPartsCleanByHandBlower: boolean;
    damage: boolean;
    partsName: string;
    percentage: number;
    createdAt: Date;
    updatedAt: Date;
    cleanedBy: string;
    cleanedPartsImages: string;
    damagedPartsImages: string;

}

interface MergeNextOpeningData {
    LotNo: string;
    Scooping_Line_Mc: string;
    Uncut: number;
    Unscoop: number;
    NonCut: number;
}