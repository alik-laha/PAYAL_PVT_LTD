

export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production','GatePass']
export const Role: string[] = ['Director', 'FactoryManager', 
    'ReceivingSupervisor', 'ReceivingPMSupervisor','ReceivingManager', 'ReceivingAlmondSupervisor', 'ReceivingStoreSupervisor', 
    'ReceivingAgarbatiSupervisor','ReceivingGeneralSupervisor','ReceivingPurchaseSupervisor',
    'Security','GatePassManager',
    'MaintainanceSupervisor','MaintainanceManager',
    'QCSupervisor', 'QCManager', 
    'GradingSupervisor', 'BoilingSupervisor', 'ScoopingSupervisor', 'ProductionManager','BormaSupervisor',
    'PeelingSupervisor','VillageSupervisor'
]
export const PermissionRol = {
    Director: ['Employee', 'Dashboard User', 'Asset', 'VendorSKU',
        'RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry','Receiving Village Entry',
        'RCN Incoming QC', 
        'Grading', 'Boiling', 'Scooping','Borma','Humidifier','Peeling',
        'Cleaning',
        'Gatepass'],
    FactoryManager: ['Employee', 'Asset','VendorSKU', 
        'RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry','Receiving Village Entry',
        'RCN Incoming QC', 
        'Grading', 'Boiling', 'Scooping','Borma','Humidifier','Peeling',
        'Cleaning',
        'Gatepass'],
    ReceivingSupervisor: ['RCN Primary Entry'],
    ReceivingPMSupervisor: ['Receiving Packaging Entry'],
    ReceivingManager: ['RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry','VendorSKU'],
    ReceivingAlmondSupervisor:['Receiving Almond Entry'],
    ReceivingStoreSupervisor: ['Receiving Store Entry'],
    ReceivingAgarbatiSupervisor:['Receiving Agarbati Entry'],
    ReceivingGeneralSupervisor:['Receiving Civil Entry'],
    ReceivingPurchaseSupervisor:['Receiving Purchase Entry'],
    QCSupervisor: ['RCN Incoming QC'],
    QCManager: ['RCN Incoming QC'],
    GradingSupervisor: ['Grading'],
    BoilingSupervisor: ['Boiling'],
    ScoopingSupervisor: ['Scooping'],
    ProductionManager:['Grading','Boiling','Scooping','Borma','Humidifier','Peeling','Receiving Village Entry'],
    MaintainanceManager:['Cleaning'],
    CleaningSupervisor:['Cleaning'],
    BormaSupervisor:['Borma'],
    PeelingSupervisor:['Humidifier','Peeling',],
    VillageSupervisor:['Receiving Village Entry'],
    Security:['Gatepass'],
    GatePassManager:['Gatepass','RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry','Receiving Village Entry']
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
    Borma: ['Director', 'FactoryManager', 'ProductionManager'],
    Humidifier: ['Director', 'FactoryManager', 'ProductionManager'],
    Peeling:['Director', 'FactoryManager', 'ProductionManager'],
    Village: ['Director', 'FactoryManager', 'ProductionManager'],
    Gatepass: ['Director', 'FactoryManager', 'GatePassManager'],
   
}
//They are only eligible to create entry
export const rcvCheckRole = {
    RCNPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingSupervisor'],
    PMPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingPMSupervisor'],
    StorePrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingStoreSupervisor'],
    GeneralPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingGeneralSupervisor'],
    AlmondPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingAlmondSupervisor'],
    AgarbatiPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingAgarbatiSupervisor'],
    VillagePrimaryEntry:['Director', 'FactoryManager','VillageSupervisor','ProductionManager'],
 
}
export const roleDataonDept = {
    Admin: ['Director', 'FactoryManager'],
    Receiving: ['ReceivingManager','ReceivingSupervisor', 'ReceivingPMSupervisor', 'ReceivingAlmondSupervisor',
         'ReceivingStoreSupervisor','ReceivingGeneralSupervisor','ReceivingAgarbatiSupervisor'],
    //Maintainance: ['CleaningSupervisor', 'MaintainanceManager'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager', 'GradingSupervisor', 
        'BoilingSupervisor', 'ScoopingSupervisor','BormaSupervisor','PeelingSupervisor','VillageSupervisor'],
    GatePass:['Security','GatePassManager']
}
export const pageNo = 1
export const pagelimit = 8
export const timerLogout = 43200
export const Section = ['Boiling', 'Grading', 'Scooping','Borma','Humidifier']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']
export const Size = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
export const Session_LogoutTime_Hr = 12
export const cookingTime = ['00:07', '00:08', '00:09', '00:10', '00:11', '00:12']
export const Origin = ["India", "Ghana", "IVC", "Benin", "Tanzania", "Nigeria", "Togo", "Guinea-Bissau", "Senegal","GUINEA-CONAKRY"]
export const SelectType = ["LineWise","LotWise"]


export const sectionDataonTypeGate = {
    IN: ["RawCashew", "PackagingMaterial","Store",'General','Almond','Village','Agarbati'],
    OUT: ["Store",'General','Almond','Village','Agarbati'],
}
export const SelectGatePassType = ["IN","OUT"]
export const SKUSection = ['PackagingMaterial', 'Store' ,'General','Almond','Village','Agarbati']
export const SectionStatusAll = ['Pending_Receiving', 'Pending_NetWeight' ,'Pending_Verification','Pending_Release','Closed','Cancelled']
export const SKUUnit = ['Pc','Kg','Mtr','SqMtr','Ft','SqFt','Bag','Bucket','Ltr','Coil','None']
export const SelectTypeSKUVendor = ["SKU","Vendor"]

export const TypeOnSection = {
    PackagingMaterial: ['Pouch','Bucket','Tin','Can','Jar','Cartoon','Tape','Foil','Stickers','PlasticBag','PP','Label','Lid'],
    Store:['ElectricalSpare','MechanicalSpare','Stationary','Chemical','Civil','Machine','Miscellaneous','Asset'],
    General:['Fuel','Civil','General','Miscellaneous'],
    Almond:['Almond Type','Almond Grade'],
    Village:['Item Type','Item Name'],
    Agarbati:['Agarbati Type','Agarbati Grade']

}

