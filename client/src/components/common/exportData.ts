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

export const Permission = {
    Admin_Manager: ['Employee', 'Dashboard User', 'Asset'],
}

export const roleDataonDept = {
    Admin:['Director','FactoryManager'],
    Receiving: ['ReceivingSupervisor', 'ReceivingManager'],
    Maintainance: ['MaintainanceSupervisor'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager']
}