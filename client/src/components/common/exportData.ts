export const Origin = ["India", "Ghana", "Usa", "Uk", "China","Nigeria"]
export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production']
//export const optionsMapping:Record<string, string[]> = {Admin :['AdminSupervisor','Admin-Manager'],Receiving:['Receiving-Supervisor', 'Receiving-Manager'],Maintainance:['Maintainance-Supervisor'],Quality-Control:['QC-Supervisor','QC-Manager'],Production:[Production Manager]}
export const Role: string[] = ['Director', 'FactoryManager', 'ReceivingSupervisor', 'ReceivingManager','MaintainanceSupervisor'
,'QCSupervisor', 'QCManager','GradingSupervisor','BoilingSupervisor','ProductionManager'
]
export const pageNo = 1
export const pagelimit =5
export const Section = ['Boiling', 'Grading', 'Scooping']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']

export const PermissionRol = {
    Director: ['Employee', 'Dashboard User', 'Asset','RCN Primary Entry','RCN Incoming QC','Grading','Boiling'],
    FactoryManager: ['Employee', 'Asset','RCN Primary Entry','RCN Incoming QC','Grading','Boiling'],
    ReceivingSupervisor: ['RCN Primary Entry'],
    ReceivingManager: ['RCN Primary Entry'],
    QCSupervisor:['RCN Incoming QC'],
    QCManager:['RCN Incoming QC'],
    GradingSupervisor:['Grading'],
    BoilingSupervisor:['Boiling']
}

export const PermissionDep = {
    Admin:['HR & Admin','Receiving','Quality','Maintainance','Production'],
    Receiving:['Receiving'],
    Maintainance:['Maintainace'],
    Production:['Production'],
    QualityControl:['Quality'],
    Grading:['Production'],
    Boiling:['Production']
}

export const pendingCheckRole = {
    RCNPrimary:['Director','FactoryManager','ReceivingManager'],
    QCRCN:['Director','FactoryManager','QCManager'],
    Grading:['Director','FactoryManager','ProductionManager'],
    Boiling:['Director','FactoryManager','ProductionManager']
}
export const roleDataonDept = {
    Admin:['Director','FactoryManager'],
    Receiving: ['ReceivingSupervisor', 'ReceivingManager'],
    Maintainance: ['MaintainanceSupervisor'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager','GradingSupervisor','BoilingSupervisor']
}