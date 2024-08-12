export const Origin = ["India", "Ghana", "IVC", "Benin", "Tanzania", "Nigeria", "Togo"]
//export const GatePassSection = ["Raw Cashew", "Packaging Material",'Raw Almond','Purchase/Credit Note','Store','Civil','Agarbati']
export const SelectType = ["LineWise","LotWise"]
export const SelectTypeSKUVendor = ["SKU","Vendor"]
//export const SelectGatePassType = ["IN","OUT"]
export const SelectGatePassType = ["IN"]
export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production','GatePass']
//export const optionsMapping:Record<string, string[]> = {Admin :['AdminSupervisor','Admin-Manager'],Receiving:['Receiving-Supervisor', 'Receiving-Manager'],Maintainance:['Maintainance-Supervisor'],Quality-Control:['QC-Supervisor','QC-Manager'],Production:[Production Manager]}
export const Role: string[] = ['Director', 'FactoryManager', 
    'ReceivingSupervisor', 'ReceivingPMSupervisor','ReceivingManager', 'ReceivingAlmondSupervisor', 'ReceivingStoreSupervisor', 
    'ReceivingAgarbatiSupervisor','ReceivingCivilSupervisor','ReceivingPurchaseSupervisor',
    'Security','GatePassManager',
    'MaintainanceSupervisor','MaintainanceManager',
    'QCSupervisor', 'QCManager', 
    'GradingSupervisor', 'BoilingSupervisor', 'ScoopingSupervisor', 'ProductionManager','BormaSuperVisor'
]
export const pageNo = 1
export const pagelimit = 8
export const timerLogout = 7200
export const Section = ['Boiling', 'Grading', 'Scooping','Borma']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']
export const Size = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
export const Session_LogoutTime_Hr = 2
export const cookingTime = ['00:07', '00:08', '00:09', '00:10', '00:11', '00:12']
export const SKUSection = ['Packaging Material', 'Store' ]
export const SKUUnit = ['kg','pc','bag','bucket','ltr','mtr','ft','gm','lb']


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
    ReceivingCivilSupervisor:['Receiving Civil Entry'],
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
    GatePassManager:['Gatepass']
}

export const PermissionDep = {
    Admin: ['HR & Admin', 'GatePass','Receiving', 'Quality', 'Maintainance', 'Production'],
    Receiving: ['Receiving'],
    Maintainance: ['Maintainance'],
    Production: ['Production'],
    QualityControl: ['Quality'],
    GatePass:['GatePass']
  
}

export const pendingCheckRole = {
    RCNPrimary: ['Director', 'FactoryManager', 'ReceivingManager'],
    QCRCN: ['Director', 'FactoryManager', 'QCManager'],
    Grading: ['Director', 'FactoryManager', 'ProductionManager'],
    Boiling: ['Director', 'FactoryManager', 'ProductionManager'],
    Scooping: ['Director', 'FactoryManager', 'ProductionManager'],
    Borma: ['Director', 'FactoryManager', 'ProductionManager'],
    Gatepass: ['Director', 'FactoryManager', 'GatePassManager']
}
export const roleDataonDept = {
    Admin: ['Director', 'FactoryManager'],
    Receiving: ['ReceivingManager','ReceivingSupervisor', 'ReceivingPMSupervisor', 'ReceivingAlmondSupervisor',
         'ReceivingStoreSupervisor', 'ReceivingAgarbatiSupervisor','ReceivingCivilSupervisor','ReceivingPurchaseSupervisor'],
    Maintainance: ['CleaningSupervisor', 'MaintainanceManager'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager', 'GradingSupervisor', 
        'BoilingSupervisor', 'ScoopingSupervisor','BormaSuperVisor'],
    GatePass:['Security','GatePassManager']
}

// export const sectionDataonTypeGate = {
//     IN: ["Raw Cashew", "Packaging Material",'Raw Almond','Purchase/Credit Note','Store','Civil','Agarbati'],
//     OUT: ["Raw Cashew",'Raw Almond'],
   
// }
export const sectionDataonTypeGate = {
    IN: ["Raw Cashew", "Packaging Material"]
   
}

