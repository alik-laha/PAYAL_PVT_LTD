export const Origin = ["India", "Ghana", "IVC", "Benin", "Tanzania","Nigeria","Togo"]
export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production']
//export const optionsMapping:Record<string, string[]> = {Admin :['AdminSupervisor','Admin-Manager'],Receiving:['Receiving-Supervisor', 'Receiving-Manager'],Maintainance:['Maintainance-Supervisor'],Quality-Control:['QC-Supervisor','QC-Manager'],Production:[Production Manager]}
export const Role: string[] = ['Director', 'FactoryManager', 'ReceivingSupervisor', 'ReceivingManager','MaintainanceSupervisor',
    'MaintainanceManager'
,'QCSupervisor', 'QCManager','GradingSupervisor','BoilingSupervisor','ScoopingSupervisor','ProductionManager'
]
export const pageNo = 1
export const pagelimit =8
export const Section = ['Boiling', 'Grading', 'Scooping']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']
export const Size=['A','B','C','D','E','F','G']

export const PermissionRol = {
    Director: ['Employee', 'Dashboard User', 'Asset','RCN Primary Entry','RCN Incoming QC','Grading','Boiling','Scooping'],
    FactoryManager: ['Employee', 'Asset','RCN Primary Entry','RCN Incoming QC','Grading','Boiling','Scooping'],
    ReceivingSupervisor: ['RCN Primary Entry'],
    ReceivingManager: ['RCN Primary Entry'],
    QCSupervisor:['RCN Incoming QC'],
    QCManager:['RCN Incoming QC'],
    GradingSupervisor:['Grading'],
    BoilingSupervisor:['Boiling'],
    ScoopingSupervisor:['Scooping']
}

export const PermissionDep = {
    Admin:['HR & Admin','Receiving','Quality','Maintainance','Production'],
    Receiving:['Receiving'],
    Maintainance:['Maintainace'],
    Production:['Production'],
    QualityControl:['Quality'],
    Grading:['Production'],
    Boiling:['Production'],
    Scooping:['Production']
}

export const pendingCheckRole = {
    RCNPrimary:['Director','FactoryManager','ReceivingManager'],
    QCRCN:['Director','FactoryManager','QCManager'],
    Grading:['Director','FactoryManager','ProductionManager'],
    Boiling:['Director','FactoryManager','ProductionManager'],
    Scooping:['Director','FactoryManager','ProductionManager']
}
export const roleDataonDept = {
    Admin:['Director','FactoryManager'],
    Receiving: ['ReceivingSupervisor', 'ReceivingManager'],
    Maintainance: ['MaintainanceSupervisor'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager','GradingSupervisor','BoilingSupervisor','ScoopingSupervisor']
}