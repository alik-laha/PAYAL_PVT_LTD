export const Origin = ["India", "Ghana", "Usa", "Uk", "China"]
export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'Quality_Control', 'Production']
//export const optionsMapping:Record<string, string[]> = {Admin :['AdminSupervisor','Admin-Manager'],Receiving:['Receiving-Supervisor', 'Receiving-Manager'],Maintainance:['Maintainance-Supervisor'],Quality-Control:['QC-Supervisor','QC-Manager'],Production:[Production Manager]}
export const Role: string[] = ['Director', 'Factory_Manager', 'Receiving_Supervisor', 'Receiving_Manager']
export const pageNo = 1
export const pagelimit = 10
export const Section = ['Boiling', 'Grading', 'Scooping']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']

export const Permission = {
    Admin_Manager: ['Employee', 'Dashboard User', 'Asset'],
}

export const roleDataonDept = {
    Receiving: ['Receiving-Supervisor', 'Receiving-Manager'],
    Maintainance: ['Maintainance-Supervisor'],
    Quality_Control: ['QC-Supervisor', 'QC-Manager'],
    Production: ['Production Manager']
}