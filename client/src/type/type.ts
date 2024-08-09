

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
    ReceivingCivilSupervisor:string[];
    ReceivingPurchaseSupervisor:string[];
    QCSupervisor: string[];
    QCManager: string[];
    GradingSupervisor: string[];
    BoilingSupervisor: string[];
    ScoopingSupervisor: string[];
    ProductionManager:string[];
    MaintainanceManager:string[];
    CleaningSupervisor:string[];
    BormaSuperVisor:string[];
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

export interface pendingCheckRoles {
    RCNPrimary: string[];
    QCRCN: string[];
    Grading: string[];
    Boiling: string[];
    Scooping: string[];
    Borma: string[];
    Gatepass:string[];
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
    createdBy: string;
}
export interface VendorData {
    id: number;
    vendorName: string;
    createdBy: string;
}

export interface PackageMaterialReceivingData {
    id: number;
    recevingDate: string;
    sku: string;
    vendorName: string;
    quantity: string;
    unit: string;
    invoicedate:string;
    invoice:string;
    createdBy: string;
    qualityStatus: string;
    editStatus: string;
    approvedBy: string;
}

export interface SumofpackageMetrialReceving {
    sumOfAllRecenvingPackageMaterial: number;
    vendorName: number;
    skuData: number;
    packagingMaterial: number;
}

export interface ExcelrecevingPackageMaterialData {
    Sl_No: number;
    Entry_Date: string;
    SKU: string;
    Vendor_Name: string;
    Quantity: string;
    Unit: string;
    Quality_Status: string;
    Edit_Status: string;
    Invoice:string;
    Invoice_Date:string;
    Approved_Or_Rejected_By: string;
    Created_By: string;
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
          
}
export interface GatePassExcelData {
    Id: number;
    GatePassNo: string;
    Type:string;
    Date: string;
    In_Time: string;
    Grosswt: string;
    DocNo: string;
    Gross_Wt_Bill: string;
    VehicleNo: string;
    DriverName: string;
    DriverContact: string;
    SecurityName: string;
    Section: string;
    ReceivingStatus: number;
    NetWeight: string;
    ApprovalStatus: number;
    BillAmount: string;
    Status: string;
    Verified_By: string;
    OutTime:string;
  
}


