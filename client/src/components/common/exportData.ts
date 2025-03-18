

export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production','GatePass']
export const Role: string[] = ['Director', 'FactoryManager', 
    'ReceivingSupervisor', 'ReceivingPMSupervisor','ReceivingManager', 'ReceivingAlmondSupervisor', 'ReceivingStoreSupervisor', 
    'ReceivingAgarbatiSupervisor','ReceivingGeneralSupervisor','ReceivingOilMillSupervisor',
    'Security','GatePassManager',
    'MaintainanceSupervisor','MaintainanceManager',
    'QCSupervisor', 'QCManager', 
    'GradingSupervisor', 'BoilingSupervisor', 'ScoopingSupervisor','BormaSupervisor',
    'PeelingSupervisor','VillageSupervisor','MayurSupervisor','SortingSupervisor', 'WholesSupervisor','ProductionManager','DeputyProductionManager','PackingSupervisor'
]
export const PermissionRol = {
    Director: ['Employee', 'Dashboard User', 'Asset', 'VendorSKU','Store Issue',
        'RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving OilMill Entry','Receiving Village Entry',
        'RCN Incoming QC', 
        'Grading', 'Boiling', 'Scooping','Borma','Humidifier','Peeling','Mayur','Sorting','DPDS','BigTaiho','Hamsa','Wholes','LW','Rejection',
        'Cleaning',
        'Gatepass','Packing'],
    FactoryManager: ['Employee', 'Asset','VendorSKU', 'Store Issue',
        'RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving OilMill Entry','Receiving Village Entry',
        'RCN Incoming QC', 
        'Grading', 'Boiling', 'Scooping','Borma','Humidifier','Peeling','Mayur','Sorting','DPDS','BigTaiho','Hamsa','Wholes','LW','Rejection',
        'Cleaning',
        'Gatepass','Packing'],
    ReceivingSupervisor: ['RCN Primary Entry'],
    ReceivingPMSupervisor: ['Receiving Packaging Entry'],
    ReceivingManager: ['RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving OilMill Entry','VendorSKU','Store Issue'],
    ReceivingAlmondSupervisor:['Receiving Almond Entry'],
    ReceivingStoreSupervisor: ['Receiving Store Entry','Store Issue'],
    ReceivingAgarbatiSupervisor:['Receiving Agarbati Entry'],
    ReceivingGeneralSupervisor:['Receiving Civil Entry'],
    ReceivingOilMillSupervisor:['Receiving OilMill Entry'],
    QCSupervisor: ['RCN Incoming QC'],
    QCManager: ['RCN Incoming QC'],
    GradingSupervisor: ['Grading'],
    BoilingSupervisor: ['Boiling'],
    ScoopingSupervisor: ['Scooping'],
    ProductionManager:['Grading','Boiling','Scooping','Borma','Humidifier','Peeling','Mayur','Wholes','LW','Rejection',
        'DPDS','Hamsa','BigTaiho','Sorting','Receiving Village Entry','Packing'],
    DeputyProductionManager : ['Borma','Humidifier','Peeling','Mayur','Wholes','LW','Rejection',
        'DPDS','Hamsa','BigTaiho','Sorting','Receiving Village Entry'], 
    MaintainanceManager:['Cleaning'],
    CleaningSupervisor:['Cleaning'],
    BormaSupervisor:['Borma'],
    PeelingSupervisor:['Humidifier','Peeling','BigTaiho'],
    MayurSupervisor:['Mayur','Hamsa'],
    SortingSupervisor:['Sorting','DPDS'],
    VillageSupervisor:['Receiving Village Entry','Rejection'],
    WholesSupervisor:['Wholes','LW'],
    Security:['Gatepass'],
    GatePassManager:['Gatepass','RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry','Receiving Village Entry','Receiving OilMill Entry'],
    PackingSupervisor:['Packing']
}

export const PermissionDep = {
    Admin: ['HR & Admin', 'GatePass','Receiving', 'Quality', 'Maintainance', 'Production'],
    Receiving: ['Receiving'],
    Maintainance: ['Maintainance'],
    Production: ['Production'],
    QualityControl: ['Quality'],
    GatePass:['GatePass','Receiving','Production']
  
}
//they are only eligible to download excel and pending edit button will appear to check pending
export const pendingCheckRole = {
    RCNPrimary: ['Director', 'FactoryManager', 'ReceivingManager'],//For All Receiving/Dispatch 'RCNPrimary' is common
    QCRCN: ['Director', 'FactoryManager', 'QCManager'],
    Grading: ['Director', 'FactoryManager', 'ProductionManager'],
    Boiling: ['Director', 'FactoryManager', 'ProductionManager'],
    Scooping: ['Director', 'FactoryManager', 'ProductionManager'],
    Borma: ['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Humidifier: ['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Peeling:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Mayur:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Hamsa:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    BigTaiho:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Sorting:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    DPDS:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Wholes:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    LW:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Rejection:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Village: ['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Gatepass: ['Director', 'FactoryManager', 'GatePassManager'],
    Packing: ['Director', 'FactoryManager', 'ProductionManager'],
   
}
//They are only eligible to create entry
export const rcvCheckRole = {
    RCNPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingSupervisor'],
    PMPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingPMSupervisor'],
    StorePrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingStoreSupervisor'],
    GeneralPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingGeneralSupervisor'],
    AlmondPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingAlmondSupervisor'],
    AgarbatiPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingAgarbatiSupervisor'],
    VillagePrimaryEntry:['Director', 'FactoryManager','VillageSupervisor','ProductionManager','DeputyProductionManager'],
    OilMillPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingOilMillSupervisor'],
 
}
export const roleDataonDept = {
    Admin: ['Director', 'FactoryManager'],
    Receiving: ['ReceivingManager','ReceivingSupervisor', 'ReceivingPMSupervisor', 'ReceivingAlmondSupervisor',
         'ReceivingStoreSupervisor','ReceivingGeneralSupervisor','ReceivingAgarbatiSupervisor'],
    //Maintainance: ['CleaningSupervisor', 'MaintainanceManager'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager','DeputyProductionManager', 'GradingSupervisor', 
        'BoilingSupervisor', 'ScoopingSupervisor','BormaSupervisor','PeelingSupervisor',
        'MayurSupervisor','VillageSupervisor','SortingSupervisor','WholesSupervisor','PackingSupervisor'],
    GatePass:['Security','GatePassManager']
}
export const pageNo = 1
export const pagelimit = 10
export const timerLogout = 43200
export const Section = ['Boiling', 'Grading', 'Scooping','Borma','Humidifier','Peeling','Mayur','Sorting','DPDS','BigTaiho','Hamsa','Village','Wholes','LW','Packing']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']
export const IssueStatus = ['N/A', 'Yes', 'No']
export const Size = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
export const QC_Boiler = ['Boiler-1 (Old)','Boiler-2 (New)']
export const Session_LogoutTime_Hr = 12
export const cookingTime = ['00:07', '00:08', '00:09', '00:10', '00:11', '00:12']
export const Origin = ["India", "Ghana", "IVC", "Benin", "Tanzania", "Nigeria", "Togo", "Guinea-Bissau", "Senegal","GUINEA-CONAKRY"]
export const SelectType = ["LineWise","LotWise"]
export const SelectTypeIssue = ["ItemWise","DayWise"]
export const prodStockSection=['Wholes','LW','Sorting','DPDS','BigTaiho','Rejection']
export const FY=['2024-25']

export const sectionDataonTypeGate = {
    IN: ["RawCashew", "PackagingMaterial","Store",'General','Almond','Village','Agarbati'],
    OUT: ["Store",'General','Almond','Village','Agarbati','OilMill'],
}
export const SelectGatePassType = ["IN","OUT"]
export const SKUSection = ['PackagingMaterial', 'Store' ,'General','Almond','Village','Agarbati','Issue','OilMill','Packing']
export const SectionStatusAll = ['Pending_Receiving', 'Pending_NetWeight' ,'Pending_Verification','Pending_Release','Closed','Cancelled']
export const SKUUnit = ['Pc','Kg','Mtr','SqMtr','Ft','SqFt','Bag','Bucket','Ltr','Coil','None']
export const SelectTypeSKUVendor = ["SKU","Vendor"]

export const TypeOnSection = {
    PackagingMaterial: ['Pouch','Bucket','Tin','Can','Jar','Cartoon','Tape','Foil','Stickers','PlasticBag','PP','Label','Lid'],
    Store:['ElectricalSpare','MechanicalSpare','Stationary','Chemical','Civil','Machine','Miscellaneous','Asset'],
    General:['Fuel','Civil','General','Miscellaneous'],
    Almond:['Almond Type','Almond Grade'],
    Village:['Item Type','Item Name'],
    Agarbati:['Agarbati Type','Agarbati Grade'],
    Issue:['Issue Unit','Issue Section','Issue SubSection'],
    OilMill:['Item Type'],
    Packing:['Final Grade']
}


export const GradeOnSection = {
    Wholes:  [
        'PW_150', 'W_150', 'WW_150', 'S_150', 'AW_150', 'LW_150', 
        'PW_180', 'W_180', 'WW_180', 'S_180', 'AW_180', 'LW_180',
        'PW_210', 'W_210', 'WW_210', 'S_210', 'AW_210', 'LW_210',
        'PW_240', 'W_240', 'WW_240', 'WW_240_A', 'AW_240', 'LW_240',
        'PW_280', 'W_280', 'WW_280', 'WW_280_A', 'AW_280', 'LW_280',
        'WHOLES_DOUBLE', 'PW_320', 'W_320', 'WW_320', 'WW_320_A', 'AW_320', 'LW_320',
        'PW_360', 'W_360', 'WW_360', 'WW_360_A', 'AW_360', 'LW_360',
        'PW_400', 'W_400', 'WW_400', 'WW_400_A', 'AW_400', 'LW_400',
        'JJB', 'JJB1'
      ],
    LW:['KW', 'KW_1', 'KW_2', 'KN', 'DW', 'DW_1', 'DW_2', 'OW', 'OW_1', 'OW_2', 'JW',
         'PW', 'ROW', 'REJ_1', 'LW3_180', 'LW3_210', 'LW3_240', 'LW3_280', 'LW3_360', 'LW2',
         'LW4', 'LW5', 'LW6', 'LW7', 'REJ_3', 'REJ_4', 'JB2', 'SJB', 'K_240', 'K_280', 'K_360',
          'PKW', 'BW', 'RW', 'RRW', 'FW', 'LW'
        ],
    BigTaiho:['SSP', 'SSP_Small', 'SWP_1', 'WSP', 'BITS', 'SWP', 'BB', 'W_BB', 'BB_A', 'BB_1',
         'BB_1A', 'BB_2', 'SSP_1', 'SSP_1_Small', 'SSP_2', 'SSP_2_Small', 'SDP'
        ],
    Sorting:['JJH', 'JJH1', 'SJH', 'JK', 'JK_1', 'K', 'K_1', 'LWP_1',
         'LWP', 'S', 'SS', 'YK', 'SP_2', 'KP'
        ],
    DPDS:['M_DS', 'M_DP', 'K_DP', 'DS_1', 'DS_2', 'SP_2', 'YJH', 'YK', 'KP', 'WP', 'RS',
         'DP_2', 'DP_3','DP_4','DP_3L', 'SS', 'OS','OS_1'
        ],
    Rejection:['Rejection']
    
}
