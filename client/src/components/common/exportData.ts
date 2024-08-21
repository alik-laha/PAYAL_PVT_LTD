

export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production','GatePass']
export const Role: string[] = ['Director', 'FactoryManager', 
    'ReceivingSupervisor', 'ReceivingPMSupervisor','ReceivingManager', 'ReceivingAlmondSupervisor', 'ReceivingStoreSupervisor', 
    'ReceivingAgarbatiSupervisor','ReceivingGeneralSupervisor','ReceivingPurchaseSupervisor',
    'Security','GatePassManager',
    'MaintainanceSupervisor','MaintainanceManager',
    'QCSupervisor', 'QCManager', 
    'GradingSupervisor', 'BoilingSupervisor', 'ScoopingSupervisor', 'ProductionManager','BormaSuperVisor'
]
export const PermissionRol = {
    Director: ['Employee', 'Dashboard User', 'Asset', 'VendorSKU',
        'RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry',
        'RCN Incoming QC', 
        'Grading', 'Boiling', 'Scooping','Borma',
        'Cleaning',
        'Gatepass'],
    FactoryManager: ['Employee', 'Asset','VendorSKU', 
        'RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry',
        'RCN Incoming QC', 
        'Grading', 'Boiling', 'Scooping','Borma',
        'Cleaning',
        'Gatepass'],
    ReceivingSupervisor: ['RCN Primary Entry'],
    ReceivingPMSupervisor: ['Receiving Packaging Entry'],
    ReceivingManager: ['RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry'],
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
    ProductionManager:['Grading','Boiling','Scooping','Borma'],
    MaintainanceManager:['Cleaning'],
    CleaningSupervisor:['Cleaning'],
    BormaSuperVisor:['Borma'],
    Security:['Gatepass'],
    GatePassManager:['Gatepass','RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry']
}

export const PermissionDep = {
    Admin: ['HR & Admin', 'GatePass','Receiving', 'Quality', 'Maintainance', 'Production'],
    Receiving: ['Receiving'],
    Maintainance: ['Maintainance'],
    Production: ['Production'],
    QualityControl: ['Quality'],
    GatePass:['GatePass','Receiving']
  
}

export const pendingCheckRole = {
    RCNPrimary: ['Director', 'FactoryManager', 'ReceivingManager'],
    QCRCN: ['Director', 'FactoryManager', 'QCManager'],
    Grading: ['Director', 'FactoryManager', 'ProductionManager'],
    Boiling: ['Director', 'FactoryManager', 'ProductionManager'],
    Scooping: ['Director', 'FactoryManager', 'ProductionManager'],
    Borma: ['Director', 'FactoryManager', 'ProductionManager'],
    Gatepass: ['Director', 'FactoryManager', 'GatePassManager'],
   
}
export const rcvCheckRole = {
    RCNPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingSupervisor'],
    PMPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingPMSupervisor'],
    StorePrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingStoreSupervisor'],
    GeneralPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingGeneralSupervisor'],
    AlmondPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingGeneralSupervisor'],
 
}
export const roleDataonDept = {
    Admin: ['Director', 'FactoryManager'],
    Receiving: ['ReceivingManager','ReceivingSupervisor', 'ReceivingPMSupervisor', 'ReceivingAlmondSupervisor',
         'ReceivingStoreSupervisor', 'ReceivingAgarbatiSupervisor','ReceivingGeneralSupervisor','ReceivingPurchaseSupervisor'],
    Maintainance: ['CleaningSupervisor', 'MaintainanceManager'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager', 'GradingSupervisor', 
        'BoilingSupervisor', 'ScoopingSupervisor','BormaSuperVisor'],
    GatePass:['Security','GatePassManager']
}
export const pageNo = 1
export const pagelimit = 8
export const timerLogout = 43200
export const Section = ['Boiling', 'Grading', 'Scooping','Borma']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']
export const Size = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
export const Session_LogoutTime_Hr = 12
export const cookingTime = ['00:07', '00:08', '00:09', '00:10', '00:11', '00:12']
export const Origin = ["India", "Ghana", "IVC", "Benin", "Tanzania", "Nigeria", "Togo"]
export const SelectType = ["LineWise","LotWise"]


export const sectionDataonTypeGate = {
    IN: ["RawCashew", "PackagingMaterial","Store",'General','Almond'],
    OUT: ["Store",'General'],
}
export const SelectGatePassType = ["IN","OUT"]
export const SKUSection = ['PackagingMaterial', 'Store' ,'General']
export const SKUUnit = ['Pc','Kg','Mtr','SqMtr','Ft','SqFt','Bag','Bucket','Ltr','Coil']
export const SelectTypeSKUVendor = ["SKU","Vendor"]

export const TypeOnSection = {
    PackagingMaterial: ['Pouch','Bucket','Tin','Stickers','PlasticBag','PP','PlasticCan'],
    Store:['ElectricalSpare','MechanicalSpare','Stationary','Chemical','Civil','Machine','Miscellaneous','Asset'],
    General:['Fuel','Civil','General','Miscellaneous']
}

