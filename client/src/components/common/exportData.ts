export const Origin = ["India", "Ghana", "IVC", "Benin", "Tanzania", "Nigeria", "Togo"]
export const SelectType = ["LineWise","LotWise"]
export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production']
//export const optionsMapping:Record<string, string[]> = {Admin :['AdminSupervisor','Admin-Manager'],Receiving:['Receiving-Supervisor', 'Receiving-Manager'],Maintainance:['Maintainance-Supervisor'],Quality-Control:['QC-Supervisor','QC-Manager'],Production:[Production Manager]}
export const Role: string[] = ['Director', 'FactoryManager', 'ReceivingSupervisor', 'ReceivingManager', 'MaintainanceSupervisor',
    'MaintainanceManager'
    , 'QCSupervisor', 'QCManager', 'GradingSupervisor', 'BoilingSupervisor', 'ScoopingSupervisor', 'ProductionManager','BormaSuperVisor'
]
export const pageNo = 1
export const pagelimit = 8
export const timerLogout = 7200
export const Section = ['Boiling', 'Grading', 'Scooping']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']
export const Size = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
export const Session_LogoutTime_Hr = 2
export const cookingTime = ['00:07', '00:08', '00:09', '00:10', '00:11', '00:12']


export const PermissionRol = {

    Director: ['Employee', 'Dashboard User', 'Asset', 'RCN Primary Entry', 
        'Receiving Packaging Entry','RCN Incoming QC', 'Grading', 'Boiling', 'Scooping','Cleaning','Borma','Gatepass'],
    FactoryManager: ['Employee', 'Asset', 'RCN Primary Entry','Receiving Packaging Entry',
         'RCN Incoming QC', 'Grading', 'Boiling', 'Scooping','Cleaning','Borma','Gatepass'],
    ReceivingSupervisor: ['RCN Primary Entry','Receiving Packaging Entry'],
    ReceivingManager: ['RCN Primary Entry','Receiving Packaging Entry'],
    QCSupervisor: ['RCN Incoming QC'],
    QCManager: ['RCN Incoming QC'],
    GradingSupervisor: ['Grading'],
    BoilingSupervisor: ['Boiling'],
    ScoopingSupervisor: ['Scooping'],
    ProductionManager:['Grading','Boiling','Scooping','Borma'],
    MaintainanceManager:['Cleaning'],
    CleaningSupervisor:['Cleaning'],
    BormaSuperVisor:['Borma'],
    Security:['Gatepass']

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
    Borma: ['Director', 'FactoryManager', 'ProductionManager']
}
export const roleDataonDept = {
    Admin: ['Director', 'FactoryManager'],
    Receiving: ['ReceivingSupervisor', 'ReceivingManager'],
    Maintainance: ['CleaningSupervisor', 'MaintainanceManager'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager', 'GradingSupervisor', 
        'BoilingSupervisor', 'ScoopingSupervisor','BormaSuperVisor'],
    GatePass:['Security']
}