

export const Dept: string[] = ['Admin', 'Receiving', 'Maintainance', 'QualityControl', 'Production','GatePass']
export const Role: string[] = ['Director', 'FactoryManager', 
    'ReceivingSupervisor', 'ReceivingPMSupervisor','ReceivingManager', 'ReceivingAlmondSupervisor', 'ReceivingStoreSupervisor', 
    'ReceivingAgarbatiSupervisor','ReceivingGeneralSupervisor','ReceivingOilMillSupervisor',
    'Security','GatePassManager','DispatchManager',
    'MaintainanceSupervisor','MaintainanceManager',
    'QCSupervisor', 'QCManager', 
    'GradingSupervisor', 'BoilingSupervisor', 'ScoopingSupervisor','BormaSupervisor',
    'PeelingSupervisor','VillageSupervisor','MayurSupervisor','SortingSupervisor', 'WholesSupervisor','ProductionManager','DeputyProductionManager','PackingSupervisor'
]
export const PermissionRol = {
    Director: ['Employee', 'Dashboard User', 'Asset', 'VendorSKU','Store Issue',
        'RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving OilMill Entry','Receiving Village Entry','Cashew Exit',
        'RCN Incoming QC', 
        'Grading', 'Boiling', 'Scooping','Borma','Humidifier','Peeling','Mayur','Sorting','DPDS','BigTaiho','Hamsa','Wholes','LW','Rejection','Village',
        'Cleaning',
        'Gatepass','Packing'],
    FactoryManager: ['Employee', 'Asset','VendorSKU', 'Store Issue',
        'RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving OilMill Entry','Receiving Village Entry','Cashew Exit',
        'RCN Incoming QC', 
        'Grading', 'Boiling', 'Scooping','Borma','Humidifier','Peeling','Mayur','Sorting','DPDS','BigTaiho','Hamsa','Wholes','LW','Rejection','Village',
        'Cleaning',
        'Gatepass','Packing'],
    ReceivingSupervisor: ['RCN Primary Entry','Cashew Exit'],
    ReceivingPMSupervisor: ['Receiving Packaging Entry'],
    ReceivingManager: ['RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving OilMill Entry','VendorSKU','Store Issue','Cashew Exit'],
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
        'DPDS','Hamsa','BigTaiho','Sorting','Receiving Village Entry','Packing','Village'],
    DeputyProductionManager : ['Borma','Humidifier','Peeling','Mayur','Wholes','LW','Rejection',
        'DPDS','Hamsa','BigTaiho','Sorting','Receiving Village Entry','Village'], 
    MaintainanceManager:['Cleaning'],
    CleaningSupervisor:['Cleaning'],
    BormaSupervisor:['Borma'],
    PeelingSupervisor:['Humidifier','Peeling','BigTaiho'],
    MayurSupervisor:['Mayur','Hamsa'],
    SortingSupervisor:['Sorting','DPDS'],
    VillageSupervisor:['Receiving Village Entry','Rejection','Village'],
    WholesSupervisor:['Wholes','LW'],
    Security:['Gatepass'],
    GatePassManager:['Gatepass','RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry','Cashew Exit',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry','Receiving Village Entry','Receiving OilMill Entry'],
    PackingSupervisor:['Packing'],
    DispatchManager:['Gatepass','RCN Primary Entry','Receiving Packaging Entry','Receiving Almond Entry','Receiving Store Entry','Cashew Exit',
        'Receiving Agarbati Entry','Receiving Civil Entry','Receiving Purchase Entry','Receiving Village Entry','Receiving OilMill Entry','Packing'],
}

export const PermissionDep = {
    Admin: ['HR & Admin', 'GatePass','Receiving', 'Quality', 'Maintainance', 'Production'],
    Receiving: ['GatePass','Receiving','Production'],
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
    Peeling:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager','VillageSupervisor'],
    Mayur:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Hamsa:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    BigTaiho:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Sorting:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    DPDS:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Wholes:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    LW:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Rejection:['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Village: ['Director', 'FactoryManager', 'ProductionManager','DeputyProductionManager'],
    Gatepass: ['Director', 'FactoryManager', 'GatePassManager','DispatchManager'],
    OrderCreate: ['Director', 'FactoryManager', 'ProductionManager','PackingSupervisor','DispatchManager'],
    OrderMapping: ['Director', 'FactoryManager', 'ProductionManager','PackingSupervisor','DispatchManager'],
    ProdStockExcel: ['Director', 'FactoryManager', 'ProductionManager','PackingSupervisor','DispatchManager'],


   
}
//They are only eligible to create entry
export const rcvCheckRole = {
    RCNPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingSupervisor','DispatchManager'],
    PMPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingPMSupervisor','DispatchManager'],
    StorePrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingStoreSupervisor','DispatchManager'],
    GeneralPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingGeneralSupervisor','DispatchManager'],
    AlmondPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingAlmondSupervisor','DispatchManager'],
    AgarbatiPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingAgarbatiSupervisor','DispatchManager'],
    VillagePrimaryEntry:['Director', 'FactoryManager','VillageSupervisor','ProductionManager','DeputyProductionManager','DispatchManager'],
    OilMillPrimaryEntry: ['Director', 'FactoryManager', 'ReceivingManager','ReceivingOilMillSupervisor','DispatchManager'],
 
}
export const roleDataonDept = {
    Admin: ['Director', 'FactoryManager'],
    Receiving: ['ReceivingManager','ReceivingSupervisor', 'ReceivingPMSupervisor', 'ReceivingAlmondSupervisor',
         'ReceivingStoreSupervisor','ReceivingGeneralSupervisor','ReceivingAgarbatiSupervisor','DispatchManager'],
    //Maintainance: ['CleaningSupervisor', 'MaintainanceManager'],
    QualityControl: ['QCSupervisor', 'QCManager'],
    Production: ['ProductionManager','DeputyProductionManager', 'GradingSupervisor', 
        'BoilingSupervisor', 'ScoopingSupervisor','BormaSupervisor','PeelingSupervisor',
        'MayurSupervisor','VillageSupervisor','SortingSupervisor','WholesSupervisor','PackingSupervisor'],
    GatePass:['Security','GatePassManager']
}
export const pageNo = 1
export const pagelimit = 13
export const timerLogout = 43200
export const Section = ['Boiling', 'Grading', 'Scooping','Borma','Humidifier','Peeling','Mayur','Sorting','DPDS','BigTaiho','Hamsa','Village','Wholes','LW','Packing']
export const MachineStatus = ['Active', 'Inactive', 'Discarded']
export const IssueStatus = ['N/A', 'Yes', 'No']
export const Size = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
export const QC_Boiler = ['Boiler-1 (Old)','Boiler-2 (New)']
export const Session_LogoutTime_Hr = 12
export const cookingTime = ['00:07', '00:08', '00:09', '00:10', '00:11', '00:12']
export const Origin = ["India", "Ghana", "IVC", "Benin", "Tanzania", "Nigeria", "Togo", "Guinea-Bissau", "Senegal","Guinea-Conkary","Burkina-Faso"]
export const SelectType = ["LineWise","LotWise"]
export const SelectTypeIssue = ["ItemWise","DayWise"]
export const prodStockSection=['Wholes','LW','Sorting','DPDS','BigTaiho','Rejection','Village']
export const FY=['2025-26']
export const Village_Outside_Type=['WHOLES(CARRAT)','WHOLES(PACKED)','PIECES','MIXED(WHOLES+PIECE)','BW/HW','OTHERS']

export const sectionDataonTypeGate = {
    IN: ["RawCashew", "PackagingMaterial","Store",'General','Almond','Village','Agarbati'],
    OUT: ["Store",'General','Almond','Village','Agarbati','OilMill','FinishedCashew'],
}
export const SelectGatePassType = ["IN","OUT"]
export const SKUSection = ['PackagingMaterial', 'Store' ,'General','Almond','Village','Agarbati','Issue','OilMill','Packing']
export const SectionStatusAll = ['Pending_Receiving', 'Pending_NetWeight' ,'Pending_Verification','Pending_Release','Closed','Cancelled']
export const OrderStatusAll = ['Pending Approval','Pending Mapping', 'Pending Packing','Closed','Cancelled']


export const SKUUnit = ['Pc','Kg','Mtr','SqMtr','Ft','SqFt','Bag','Bucket','Ltr','Coil','None']
export const SelectTypeSKUVendor = ["SKU","Vendor"]

export const TypeOnSection = {
    PackagingMaterial: ['Pouch','Bucket','Tin','Can','Jar','Cartoon','Tape','Foil','Stickers','PlasticBag','PP','Label','Lid'],
    Store:['ElectricalSpare','MechanicalSpare','Stationary','Chemical','Civil','Machine','Miscellaneous','Asset'],
    General:['Fuel','Civil','General','Miscellaneous'],
    Almond:['Almond Type','Almond Grade'],
    Village:['Item Type','Item Name','Vendor Name'],
    Agarbati:['Agarbati Type','Agarbati Grade'],
    Issue:['Issue Unit','Issue Section','Issue SubSection'],
    OilMill:['Item Type'],
    Packing:['Final Grade']
}


export const GradeOnSection = {
    Wholes: [
        "PW_150", "W_150", "WW_150", "S_150", "AW_150", "LW_150",
        "PW_180", "W_180", "WW_180", "S_180", "AW_180", "LW_180",
        "PW_210", "W_210", "WW_210", "S_210", "AW_210", "LW_210",
        "PW_240", "W_240", "WW_240", "WW_240_A", "AW_240", "LW_240",
        "PW_280", "W_280", "WW_280", "WW_280_A", "AW_280", "LW_280",
        "PW_320", "W_320", "WW_320", "WW_320_A", "AW_320", "LW_320",
        "PW_360", "W_360", "WW_360", "WW_360_A", "AW_360", "LW_360",
        "PW_400", "W_400", "WW_400", "WW_400_A", "AW_400", "LW_400",
        "JJB", "JJB1",'WHOLES_DOUBLE',
        "PAYAL_240", "PAYAL_400",
        "E_320_LOT", "E_400_LOT",
        "IN_W_240", "IN_W_320", "IN_W_400",
        "A_150", "C_150", "E_150", "SW_150", "SSW_150", "K_150",
        "A_180", "C_180", "E_180", "SW_180", "SSW_180", "K_180",
        "A_210", "C_210", "E_210", "SW_210", "SSW_210", "K_210",
        "A_240", "C_240", "E_240", "SW_240", "SSW_240", "K_240",
        "A_280", "C_280", "E_280", "SW_280", "SSW_280", "K_280",
        "A_320", "C_320", "E_320", "SW_320", "SSW_320", "K_320",
        "A_360", "C_360", "E_360", "SW_360", "SSW_360", "K_360",
        "A_400", "C_400", "E_400", "SW_400", "SSW_400", "K_400"
    ],
    LW: ['KW', 'KW_1', 'KW_2', 'KN', 'DW', 'DW_1', 'DW_2', 'OW', 'OW_1', 'OW_2', 'JW',
        'PW', 'ROW', 'REJ_1', 'LW3_180', 'LW3_210', 'LW3_240', 'LW3_280', 'LW3_360', 'LW2',
        'LW4', 'LW5', 'LW6', 'LW7', 'REJ_3', 'REJ_4', 'JB2', 'SJB', 'K_240', 'K_280', 'K_360',
        'PKW', 'BW', 'RW', 'RRW', 'FW', 'LW'
    ],
    BigTaiho:['SSP', 'SSP_Small', 'SWP_1', 'WSP', 'BITS', 'SWP', 'BB', 'W_BB', 'BB_A', 'BB_1',
         'BB_1A', 'BB_2', 'SSP_1', 'SSP_1_Small', 'SSP_2', 'SSP_2_Small', 'SDP'
        ],
    Sorting: [
        "JJH", "JJH1", "SJH", "JK", "JK1", "K", "K1",
        "LWP1", "LWP", "S", "SS", "YK", "SP2", "KP",
        "IN_K", "IN_JH",
        "V_SJH", "V_K", "V_K1", "V_LWP", "V_LWP1", "V_JK", "V_JK1",
        "V_SS", "V_SP", "V_SP2", "V_JH1", "V_YK", "V_M_JK1"
    ],
    DPDS: [
        "M_DS", "M_DP", "K_DP", "DS_1", "DS_2", "SP_2", "YJH", "YK", "KP",
        "WP", "RS", "DP_2", "DP_3", "DP_4", "DP_3L", "SS", "OS", "OS1",
        "V_DS", "V_M_DS", "V_DP", "V_M_DP", "V_LP", "V_LP_2", "V_K_DP",
        "V_SS", "V_YJH", "V_YK", "V_SP_2", "V_KP", "V_DP_2", "V_DP_3",
        "V_DP_4", "V_OS", "V_OS_1", "V_WP", "V_RS"
    ],
    Rejection:['Rejection'],
    Village:['Village']
    
}


export const ProdGradeOnSection = {
    Wholes: [
        "issue_pw_150", "issue_w_150", "issue_ww_150", "issue_s_150", "issue_aw_150", "issue_lw_150",
        "issue_pw_180", "issue_w_180", "issue_ww_180", "issue_s_180", "issue_aw_180", "issue_lw_180",
        "issue_pw_210", "issue_w_210", "issue_ww_210", "issue_s_210", "issue_aw_210", "issue_lw_210",
        "issue_pw_240", "issue_w_240", "issue_ww_240", "issue_ww_240_A", "issue_aw_240", "issue_lw_240",
        "issue_pw_280", "issue_w_280", "issue_ww_280", "issue_ww_280_A", "issue_aw_280", "issue_lw_280",
        "wholes_double", "issue_pw_320", "issue_w_320", "issue_ww_320", "issue_ww_320_A", "issue_aw_320", "issue_lw_320",
        "issue_pw_360", "issue_w_360", "issue_ww_360", "issue_ww_360_A", "issue_aw_360", "issue_lw_360",
        "issue_pw_400", "issue_w_400", "issue_ww_400", "issue_ww_400_A", "issue_aw_400", "issue_lw_400",
        "issue_jjb", "issue_jjb1", "issue_payal_240", "issue_payal_400",
        "issue_e_320_lot", "issue_e_400_lot", "issue_in_w_240", "issue_in_w_320", "issue_in_w_400",
        "issue_a_150", "issue_c_150", "issue_e_150", "issue_sw_150", "issue_ssw_150", "issue_k_150",
        "issue_a_180", "issue_c_180", "issue_e_180", "issue_sw_180", "issue_ssw_180", "issue_k_180",
        "issue_a_210", "issue_c_210", "issue_e_210", "issue_sw_210", "issue_ssw_210", "issue_k_210",
        "issue_a_240", "issue_c_240", "issue_e_240", "issue_sw_240", "issue_ssw_240", "issue_k_240",
        "issue_a_280", "issue_c_280", "issue_e_280", "issue_sw_280", "issue_ssw_280", "issue_k_280",
        "issue_a_320", "issue_c_320", "issue_e_320", "issue_sw_320", "issue_ssw_320", "issue_k_320",
        "issue_a_360", "issue_c_360", "issue_e_360", "issue_sw_360", "issue_ssw_360", "issue_k_360",
        "issue_a_400", "issue_c_400", "issue_e_400", "issue_sw_400", "issue_ssw_400", "issue_k_400"
    ],
      LW : [
        'issue_kw', 'issue_kw_1', 'issue_kw_2', 'issue_kn', 'issue_dw', 'issue_dw_1', 'issue_dw_2', 
        'issue_ow', 'issue_ow_1', 'issue_ow_2', 'issue_jw', 'issue_pw', 'issue_row', 'issue_rej_1', 
        'issue_lw3_180', 'issue_lw3_210', 'issue_lw3_240', 'issue_lw3_280', 'issue_lw3_360', 'issue_lw2', 
        'issue_lw4', 'issue_lw5', 'issue_lw6', 'issue_lw7', 'issue_rej_3', 'issue_rej_4', 'issue_jb2', 
        'issue_sjb', 'issue_k_240', 'issue_k_280', 'issue_k_360', 'issue_pkw', 'issue_bw', 'issue_rw', 
        'issue_rrw', 'issue_fw', 'issue_lw'
    ],
    BigTaiho : [
        'issue_ssp', 'issue_ssp_small', 'issue_swp_1', 'issue_wsp', 'issue_bits', 'issue_swp', 'issue_bb',
        'issue_w_bb', 'issue_bb_A', 'issue_bb1', 'issue_bb1_A', 'issue_bb_2', 'issue_ssp_1', 'issue_ssp_1_small',
        'issue_ssp_2', 'issue_ssp_2_small', 'issue_sdp'
    ],
    Sorting: [
        "issue_jjh", "issue_jjh1", "issue_sjh", "issue_jk", "issue_jk1", "issue_k", "issue_k1",
        "issue_lwp1", "issue_lwp", "issue_s", "issue_ss", "issue_yk", "issue_sp2", "issue_kp",
        "issue_in_k", "issue_in_jh", "issue_V_sjh", "issue_V_k", "issue_V_k1", "issue_V_lwp",
        "issue_V_lwp1", "issue_V_jk", "issue_V_jk1", "issue_V_ss", "issue_V_sp", "issue_V_sp2",
        "issue_V_jh1", "issue_V_yk", "issue_V_m_jk1"
    ],
    DPDS: [
        "issue_m_ds", "issue_m_dp", "issue_k_dp", "issue_ds_1", "issue_ds_2", "issue_sp_2", "issue_yjh",
        "issue_yk", "issue_kp", "issue_wp", "issue_rs", "issue_dp_2", "issue_dp_3", "issue_dp_4", "issue_dp_3l",
        "issue_ss", "issue_os", "issue_os1", "issue_V_ds", "issue_V_m_ds", "issue_V_dp", "issue_V_m_dp",
        "issue_V_lp", "issue_V_lp_2", "issue_V_k_dp", "issue_V_ss", "issue_V_yjh", "issue_V_yk", "issue_V_sp_2",
        "issue_V_kp", "issue_V_dp_2", "issue_V_dp_3", "issue_V_dp_4", "issue_V_os", "issue_V_os_1",
        "issue_V_wp", "issue_V_rs"
    ],
    Rejection:['issue_packing'],
    Village:['issue_packing']
    
}
