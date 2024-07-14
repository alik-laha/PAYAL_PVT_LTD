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
    date: Date

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