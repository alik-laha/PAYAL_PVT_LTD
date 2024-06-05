export const Origin = ["India", "Ghana", "Usa", "Uk", "China"]
export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production']
//export const optionsMapping:Record<string, string[]> = {Admin :['AdminSupervisor','Admin-Manager'],Receiving:['Receiving-Supervisor', 'Receiving-Manager'],Maintainance:['Maintainance-Supervisor'],Quality-Control:['QC-Supervisor','QC-Manager'],Production:[Production Manager]}
export const Role: string[] = ['Director', 'FactoryManager', 'ReceivingSupervisor', 'ReceivingManager','MaintainanceSupervisor'
,'QCSupervisor', 'QCManager','ProductionManager'
]
export const pageNo = 1
export const pagelimit = 10
export const Section = ['Boiling', 'Grading', 'Scooping']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']

export const PermissionRol = {
    Director: ['Employee', 'Dashboard User', 'Asset','RCN Primary Entry'],
    FactoryManager: ['Employee', 'Asset','RCN Primary Entry'],
    ReceivingSupervisor: ['RCN Primary Entry'],
    ReceivingManager: ['RCN Primary Entry']
}

export const PermissionDep = {
    Admin:['HR & Admin','Receiving','Quality','Maintainance','Production'],
    Receiving:['Receiving'],
    Maintainance:['Maintainace'],
    Production:['Production'],
    QualityControl:['Quality']
}

export const roleDataonDept = {
    Admin:['Director','FactoryManager'],
    Receiving: ['ReceivingSupervisor', 'ReceivingManager'],
    Maintainance: ['MaintainanceSupervisor'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager']
}