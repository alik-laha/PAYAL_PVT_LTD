import cron from "node-cron";
import sequelize from "../config/databaseConfig";
import DPDS from "../model/dpdsmodel";
import productionStockGrade2425 from "../model/productionStockgrade2425";
import SortingModel from "../model/sortingModel";
import bigTaihoModel from "../model/bigTaihoModel";
import LWModel from "../model/lowerGradeModel";
import WholesModel from "../model/wholesModel";
import rejectionModel from "../model/rejectionModel";
import { Op } from "sequelize";
import orderPrimaryModel from "../model/orderModel";

import orderStockGrade from "../model/orderStockGrade";
import productionStockGrade2526 from "../model/productionStockgrade2526";
import orderMappingModel from "../model/orderMappingModel";
import villageProduction from "../model/villageProductionModel";

const keyValueMap = {
  M_DS: "issue_m_ds",
  M_DP: "issue_m_dp",
  K_DP: "issue_k_dp",
  DS_1: "issue_ds_1",
  DS_2: "issue_ds_2",
  SP_2: "issue_sp_2",
  YJH: "issue_yjh",
  YK: "issue_yk",
  KP: "issue_kp",
  WP: "issue_wp",
  RS: "issue_rs",
  DP_2: "issue_dp_2",
  DP_3: "issue_dp_3",
  DP_4: "issue_dp_4",
  DP_3L: "issue_dp_3l",
  SS: "issue_ss",
  OS: "issue_os",
  OS1: "issue_os1",
  V_DS: "issue_V_ds",
  V_M_DS: "issue_V_m_ds",
  V_DP: "issue_V_dp",
  V_M_DP: "issue_V_m_dp",
  V_LP: "issue_V_lp",
  V_LP_2: "issue_V_lp_2",
  V_K_DP: "issue_V_k_dp",
  V_SS: "issue_V_ss",
  V_YJH: "issue_V_yjh",
  V_YK: "issue_V_yk",
  V_SP_2: "issue_V_sp_2",
  V_KP: "issue_V_kp",
  V_DP_2: "issue_V_dp_2",
  V_DP_3: "issue_V_dp_3",
  V_DP_4: "issue_V_dp_4",
  V_OS: "issue_V_os",
  V_OS_1: "issue_V_os_1",
  V_WP: "issue_V_wp",
  V_RS: "issue_V_rs",
  JJH: "issue_jjh",
  JJH1: "issue_jjh1",
  SJH: "issue_sjh",
  JK: "issue_jk",
  JK1: "issue_jk1",
  K: "issue_k",
  K1: "issue_k1",
  LWP1: "issue_lwp1",
  LWP: "issue_lwp",
  S: "issue_s",

  SP2: "issue_sp2",

  IN_K: "issue_in_k",
  IN_JH: "issue_in_jh",
  V_SJH: "issue_V_sjh",
  V_K: "issue_V_k",
  V_K1: "issue_V_k1",
  V_LWP: "issue_V_lwp",
  V_LWP1: "issue_V_lwp1",
  V_JK: "issue_V_jk",
  V_JK1: "issue_V_jk1",

  V_SP: "issue_V_sp",
  V_SP2: "issue_V_sp2",
  V_JH1: "issue_V_jh1",

  V_M_JK1: "issue_V_m_jk1",
  SSP: "issue_ssp",
  SSP_Small: "issue_ssp_small",
  SWP_1: "issue_swp_1",
  WSP: "issue_wsp",
  BITS: "issue_bits",
  SWP: "issue_swp",
  BB: "issue_bb",
  W_BB: "issue_w_bb",
  BB_A: "issue_bb_A",
  BB_1: "issue_bb1",
  BB_1A: "issue_bb1_A",
  BB_2: "issue_bb_2",
  SSP_1: "issue_ssp_1",
  SSP_1_Small: "issue_ssp_1_small",
  SSP_2: "issue_ssp_2",
  SSP_2_Small: "issue_ssp_2_small",
  SDP: "issue_sdp",
  KW: "issue_kw",
  KW_1: "issue_kw_1",
  KW_2: "issue_kw_2",
  KN: "issue_kn",
  DW: "issue_dw",
  DW_1: "issue_dw_1",
  DW_2: "issue_dw_2",
  OW: "issue_ow",
  OW_1: "issue_ow_1",
  OW_2: "issue_ow_2",
  JW: "issue_jw",
  PW: "issue_pw",
  ROW: "issue_row",
  REJ_1: "issue_rej_1",
  LW3_180: "issue_lw3_180",
  LW3_210: "issue_lw3_210",
  LW3_240: "issue_lw3_240",
  LW3_280: "issue_lw3_280",
  LW3_360: "issue_lw3_360",
  LW2: "issue_lw2",
  LW4: "issue_lw4",
  LW5: "issue_lw5",
  LW6: "issue_lw6",
  LW7: "issue_lw7",
  REJ_3: "issue_rej_3",
  REJ_4: "issue_rej_4",
  JB2: "issue_jb2",
  SJB: "issue_sjb",

  PKW: "issue_pkw",
  BW: "issue_bw",
  RW: "issue_rw",
  RRW: "issue_rrw",
  FW: "issue_fw",
  LW: "issue_lw",
  PW_150: "issue_pw_150",
  W_150: "issue_w_150",
  WW_150: "issue_ww_150",
  S_150: "issue_s_150",
  AW_150: "issue_aw_150",
  LW_150: "issue_lw_150",
  PW_180: "issue_pw_180",
  W_180: "issue_w_180",
  WW_180: "issue_ww_180",
  S_180: "issue_s_180",
  AW_180: "issue_aw_180",
  LW_180: "issue_lw_180",
  PW_210: "issue_pw_210",
  W_210: "issue_w_210",
  WW_210: "issue_ww_210",
  S_210: "issue_s_210",
  AW_210: "issue_aw_210",
  LW_210: "issue_lw_210",
  PW_240: "issue_pw_240",
  W_240: "issue_w_240",
  WW_240: "issue_ww_240",
  WW_240_A: "issue_ww_240_A",
  AW_240: "issue_aw_240",
  LW_240: "issue_lw_240",
  PW_280: "issue_pw_280",
  W_280: "issue_w_280",
  WW_280: "issue_ww_280",
  WW_280_A: "issue_ww_280_A",
  AW_280: "issue_aw_280",
  LW_280: "issue_lw_280",
  WHOLES_DOUBLE: "wholes_double",
  PW_320: "issue_pw_320",
  W_320: "issue_w_320",
  WW_320: "issue_ww_320",
  WW_320_A: "issue_ww_320_A",
  AW_320: "issue_aw_320",
  LW_320: "issue_lw_320",
  PW_360: "issue_pw_360",
  W_360: "issue_w_360",
  WW_360: "issue_ww_360",
  WW_360_A: "issue_ww_360_A",
  AW_360: "issue_aw_360",
  LW_360: "issue_lw_360",
  PW_400: "issue_pw_400",
  W_400: "issue_w_400",
  WW_400: "issue_ww_400",
  WW_400_A: "issue_ww_400_A",
  AW_400: "issue_aw_400",
  LW_400: "issue_lw_400",
  JJB: "issue_jjb",
  JJB1: "issue_jjb1",
  PAYAL_240: "issue_payal_240",
  PAYAL_400: "issue_payal_400",
  E_320_LOT: "issue_e_320_lot",
  E_400_LOT: "issue_e_400_lot",
  IN_W_240: "issue_in_w_240",
  IN_W_320: "issue_in_w_320",
  IN_W_400: "issue_in_w_400",
  A_150: "issue_a_150",
  C_150: "issue_c_150",
  E_150: "issue_e_150",
  SW_150: "issue_sw_150",
  SSW_150: "issue_ssw_150",
  K_150: "issue_k_150",
  A_180: "issue_a_180",
  C_180: "issue_c_180",
  E_180: "issue_e_180",
  SW_180: "issue_sw_180",
  SSW_180: "issue_ssw_180",
  K_180: "issue_k_180",
  A_210: "issue_a_210",
  C_210: "issue_c_210",
  E_210: "issue_e_210",
  SW_210: "issue_sw_210",
  SSW_210: "issue_ssw_210",
  K_210: "issue_k_210",
  A_240: "issue_a_240",
  C_240: "issue_c_240",
  E_240: "issue_e_240",
  SW_240: "issue_sw_240",
  SSW_240: "issue_ssw_240",
  K_240: "issue_k_240",
  A_280: "issue_a_280",
  C_280: "issue_c_280",
  E_280: "issue_e_280",
  SW_280: "issue_sw_280",
  SSW_280: "issue_ssw_280",
  K_280: "issue_k_280",
  A_320: "issue_a_320",
  C_320: "issue_c_320",
  E_320: "issue_e_320",
  SW_320: "issue_sw_320",
  SSW_320: "issue_ssw_320",
  K_320: "issue_k_320",
  A_360: "issue_a_360",
  C_360: "issue_c_360",
  E_360: "issue_e_360",
  SW_360: "issue_sw_360",
  SSW_360: "issue_ssw_360",
  K_360: "issue_k_360",
  A_400: "issue_a_400",
  C_400: "issue_c_400",
  E_400: "issue_e_400",
  SW_400: "issue_sw_400",
  SSW_400: "issue_ssw_400",
  K_400: "issue_k_400",
  Rejection: "issue_packing",
  Village: "issue_packing",
} as const;

type KeyAlias = keyof typeof keyValueMap;

function getColumnName(key: KeyAlias): string {
  return keyValueMap[key];
}

const CY_FY = process.env.CY_FY ? process.env.CY_FY : "2025-26";
// Function to fetch and update stock quantities
const updateProductionGradeStock2425 = async () => {
  try {
    // Fetch sum of all issue fields grouped by origin
    const dpdsresults = await DPDS.findAll({
      attributes: [
        "origin",
        // SUM each issue field and alias the result properly
        [sequelize.fn("SUM", sequelize.col("issue_m_ds")), "M_DS"],
        [sequelize.fn("SUM", sequelize.col("issue_m_dp")), "M_DP"],
        [sequelize.fn("SUM", sequelize.col("issue_k_dp")), "K_DP"],
        [sequelize.fn("SUM", sequelize.col("issue_ds_1")), "DS_1"],
        [sequelize.fn("SUM", sequelize.col("issue_ds_2")), "DS_2"],
        [sequelize.fn("SUM", sequelize.col("issue_sp_2")), "SP_2"],
        [sequelize.fn("SUM", sequelize.col("issue_yjh")), "YJH"],
        [sequelize.fn("SUM", sequelize.col("issue_yk")), "YK"],
        [sequelize.fn("SUM", sequelize.col("issue_kp")), "KP"],
        [sequelize.fn("SUM", sequelize.col("issue_wp")), "WP"],
        [sequelize.fn("SUM", sequelize.col("issue_rs")), "RS"],
        [sequelize.fn("SUM", sequelize.col("issue_dp_2")), "DP_2"],
        [sequelize.fn("SUM", sequelize.col("issue_dp_3")), "DP_3"],
        [sequelize.fn("SUM", sequelize.col("issue_dp_4")), "DP_4"],
        [sequelize.fn("SUM", sequelize.col("issue_dp_3l")), "DP_3L"],
        [sequelize.fn("SUM", sequelize.col("issue_ss")), "SS"],
        [sequelize.fn("SUM", sequelize.col("issue_os")), "OS"],
        [sequelize.fn("SUM", sequelize.col("issue_os1")), "OS_1"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2024-03-31", // From 31st March 2024
          [Op.lt]: "2025-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true,
    });
    //console.log(dpdsresults)

    const sortingresults = await SortingModel.findAll({
      attributes: [
        "origin",
        // SUM each issue field and alias the result properly
        [sequelize.fn("SUM", sequelize.col("issue_jjh")), "JJH"],
        [sequelize.fn("SUM", sequelize.col("issue_jjh1")), "JJH1"],
        [sequelize.fn("SUM", sequelize.col("issue_sjh")), "SJH"],
        [sequelize.fn("SUM", sequelize.col("issue_jk")), "JK"],
        [sequelize.fn("SUM", sequelize.col("issue_jk1")), "JK_1"],
        [sequelize.fn("SUM", sequelize.col("issue_k")), "K"],
        [sequelize.fn("SUM", sequelize.col("issue_k1")), "K_1"],
        [sequelize.fn("SUM", sequelize.col("issue_lwp1")), "LWP_1"],
        [sequelize.fn("SUM", sequelize.col("issue_lwp")), "LWP"],
        [sequelize.fn("SUM", sequelize.col("issue_s")), "S"],
        [sequelize.fn("SUM", sequelize.col("issue_ss")), "SS"],
        [sequelize.fn("SUM", sequelize.col("issue_yk")), "YK"],
        [sequelize.fn("SUM", sequelize.col("issue_sp2")), "SP_2"],
        [sequelize.fn("SUM", sequelize.col("issue_kp")), "KP"],
      ],
      group: ["origin"],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2024-03-31", // From 31st March 2024
          [Op.lt]: "2025-04-01", // Up to 1st April 2025
        },
      },
      //raw: true,
    });
    //console.log(sortingresults)

    const bigTaihoresults = await bigTaihoModel.findAll({
      attributes: [
        "origin",
        // SUM each issue field and alias the result properly
        [sequelize.fn("SUM", sequelize.col("issue_ssp")), "SSP"],
        [sequelize.fn("SUM", sequelize.col("issue_ssp_small")), "SSP_Small"],
        [sequelize.fn("SUM", sequelize.col("issue_swp_1")), "SWP_1"],
        [sequelize.fn("SUM", sequelize.col("issue_wsp")), "WSP"],
        [sequelize.fn("SUM", sequelize.col("issue_bits")), "BITS"],
        [sequelize.fn("SUM", sequelize.col("issue_swp")), "SWP"],
        [sequelize.fn("SUM", sequelize.col("issue_bb")), "BB"],
        [sequelize.fn("SUM", sequelize.col("issue_w_bb")), "W_BB"],
        [sequelize.fn("SUM", sequelize.col("issue_bb_A")), "BB_A"],
        [sequelize.fn("SUM", sequelize.col("issue_bb1")), "BB_1"],
        [sequelize.fn("SUM", sequelize.col("issue_bb1_A")), "BB_1A"],
        [sequelize.fn("SUM", sequelize.col("issue_bb_2")), "BB_2"],
        [sequelize.fn("SUM", sequelize.col("issue_ssp_1")), "SSP_1"],
        [
          sequelize.fn("SUM", sequelize.col("issue_ssp_1_small")),
          "SSP_1_Small",
        ],
        [sequelize.fn("SUM", sequelize.col("issue_ssp_2")), "SSP_2"],
        [
          sequelize.fn("SUM", sequelize.col("issue_ssp_2_small")),
          "SSP_2_Small",
        ],
        [sequelize.fn("SUM", sequelize.col("issue_sdp")), "SDP"],
      ],
      group: ["origin"],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2024-03-31", // From 31st March 2024
          [Op.lt]: "2025-04-01", // Up to 1st April 2025
        },
      },
      //raw: true,
      //  Ensure plain objects are returned, not Sequelize instances
    });
    //console.log(bigtaihoresults)

    const lwresults = await LWModel.findAll({
      attributes: [
        "origin",
        // Sum each issue field based on the new keys
        [sequelize.fn("SUM", sequelize.col("issue_kw")), "KW"],
        [sequelize.fn("SUM", sequelize.col("issue_kw_1")), "KW_1"],
        [sequelize.fn("SUM", sequelize.col("issue_kw_2")), "KW_2"],
        [sequelize.fn("SUM", sequelize.col("issue_kn")), "KN"],
        [sequelize.fn("SUM", sequelize.col("issue_dw")), "DW"],
        [sequelize.fn("SUM", sequelize.col("issue_dw_1")), "DW_1"],
        [sequelize.fn("SUM", sequelize.col("issue_dw_2")), "DW_2"],
        [sequelize.fn("SUM", sequelize.col("issue_ow")), "OW"],
        [sequelize.fn("SUM", sequelize.col("issue_ow_1")), "OW_1"],
        [sequelize.fn("SUM", sequelize.col("issue_ow_2")), "OW_2"],
        [sequelize.fn("SUM", sequelize.col("issue_jw")), "JW"],
        [sequelize.fn("SUM", sequelize.col("issue_pw")), "PW"],
        [sequelize.fn("SUM", sequelize.col("issue_row")), "ROW"],
        [sequelize.fn("SUM", sequelize.col("issue_rej_1")), "REJ_1"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_180")), "LW3_180"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_210")), "LW3_210"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_240")), "LW3_240"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_280")), "LW3_280"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_360")), "LW3_360"],
        [sequelize.fn("SUM", sequelize.col("issue_lw2")), "LW2"],
        [sequelize.fn("SUM", sequelize.col("issue_lw4")), "LW4"],
        [sequelize.fn("SUM", sequelize.col("issue_lw5")), "LW5"],
        [sequelize.fn("SUM", sequelize.col("issue_lw6")), "LW6"],
        [sequelize.fn("SUM", sequelize.col("issue_lw7")), "LW7"],
        [sequelize.fn("SUM", sequelize.col("issue_rej_3")), "REJ_3"],
        [sequelize.fn("SUM", sequelize.col("issue_rej_4")), "REJ_4"],
        [sequelize.fn("SUM", sequelize.col("issue_jb2")), "JB2"],
        [sequelize.fn("SUM", sequelize.col("issue_sjb")), "SJB"],
        [sequelize.fn("SUM", sequelize.col("issue_k_240")), "K_240"],
        [sequelize.fn("SUM", sequelize.col("issue_k_280")), "K_280"],
        [sequelize.fn("SUM", sequelize.col("issue_k_360")), "K_360"],
        [sequelize.fn("SUM", sequelize.col("issue_pkw")), "PKW"],
        [sequelize.fn("SUM", sequelize.col("issue_bw")), "BW"],
        [sequelize.fn("SUM", sequelize.col("issue_rw")), "RW"],
        [sequelize.fn("SUM", sequelize.col("issue_rrw")), "RRW"],
        [sequelize.fn("SUM", sequelize.col("issue_fw")), "FW"],
        [sequelize.fn("SUM", sequelize.col("issue_lw")), "LW"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2024-03-31", // From 31st March 2024
          [Op.lt]: "2025-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(lwresults)

    const wholesresults = await WholesModel.findAll({
      attributes: [
        "origin",
        // Sum each issue field based on the new keys
        [sequelize.fn("SUM", sequelize.col("issue_pw_150")), "PW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_w_150")), "W_150"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_150")), "WW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_s_150")), "S_150"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_150")), "AW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_150")), "LW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_180")), "PW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_w_180")), "W_180"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_180")), "WW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_s_180")), "S_180"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_180")), "AW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_180")), "LW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_210")), "PW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_w_210")), "W_210"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_210")), "WW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_s_210")), "S_210"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_210")), "AW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_210")), "LW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_240")), "PW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_w_240")), "W_240"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_240")), "WW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_240_A")), "WW_240_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_240")), "AW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_240")), "LW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_280")), "PW_280"],
        [sequelize.fn("SUM", sequelize.col("issue_w_280")), "W_280"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_280")), "WW_280"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_280_A")), "WW_280_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_280")), "AW_280"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_280")), "LW_280"],
        [sequelize.fn("SUM", sequelize.col("wholes_double")), "WHOLES_DOUBLE"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_320")), "PW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_w_320")), "W_320"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_320")), "WW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_320_A")), "WW_320_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_320")), "AW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_320")), "LW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_360")), "PW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_w_360")), "W_360"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_360")), "WW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_360_A")), "WW_360_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_360")), "AW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_360")), "LW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_400")), "PW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_w_400")), "W_400"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_400")), "WW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_400_A")), "WW_400_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_400")), "AW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_400")), "LW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_jjb")), "JJB"],
        [sequelize.fn("SUM", sequelize.col("issue_jjb1")), "JJB1"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2024-03-31", // From 31st March 2024
          [Op.lt]: "2025-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(wholesresults)

    const rejectionresults = await rejectionModel.findAll({
      attributes: [
        "origin",
        // Sum each issue field based on the new keys
        [sequelize.fn("SUM", sequelize.col("issue_packing")), "Rejection"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2024-03-31", // From 31st March 2024
          [Op.lt]: "2025-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(rejectionresults)

    const orderResults = await orderPrimaryModel.findAll({
      attributes: [
        "origin",
        "gradeName",
        [sequelize.fn("sum", sequelize.col("quantity")), "issueOrderQuantity"],
        [
          sequelize.fn("sum", sequelize.col("actualquantity")),
          "consumeOrderQuantity",
        ],
      ],
      where: {
        orderInvDate: {
          [Op.gte]: "2024-03-31", // From 31st March 2024
          [Op.lt]: "2025-04-01", // Up to 1st April 2025
        },
        [Op.or]: [{ editStatus: "Accepted" }, { editStatus: "N/A" }],
      },
      group: ["origin", "gradeName"],
    });

    //console.log(orderResults)

    // Iterate over the Order results and upsert into the stock table
    // for (const orderResult of orderResults) {
    //   const { origin, gradeName, issueOrderQuantity, consumeOrderQuantity } =
    //     orderResult.dataValues;

    //   if (issueOrderQuantity !== null) {
    //     await orderStockGrade.upsert(
    //       {
    //         origin,
    //         grade: gradeName,
    //         openquantity: issueOrderQuantity,
    //         thresoldopenquantity: 0,
    //         consumequantity: consumeOrderQuantity,
    //         thresoldconsumequantity: 0,
    //       },
    //       {
    //         // Add a condition here to ensure that `upsert` works correctly
    //         conflictFields: ["origin", "grade"], // This ensures it checks for these fields for conflict
    //       },
    //     );
    //   }
    // }

    // Iterate over the DPDS results and upsert into the stock table
    for (const dpdsresult of dpdsresults) {
      const { origin, ...dpdsissueFields } = dpdsresult.dataValues;

      // Log dpds result to ensure it's correct
      //console.log('Processing DPDS Result:', dpdsresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        dpdsissueFields,
      )) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert(
            {
              origin,
              section: "DPDS",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: 0,
            },
            {
              // Add a condition here to ensure that `upsert` works correctly
              conflictFields: ["section", "origin", "grade"], // This ensures it checks for these fields for conflict
            },
          );
        }
      }
    }

    // Iterate over the Sorting results and upsert into the stock table
    for (const sortingresult of sortingresults) {
      const { origin, ...sortingissueFields } = sortingresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Sorting Result:', sortingresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        sortingissueFields,
      )) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert(
            {
              origin,
              section: "Sorting",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: 0,
            },
            {
              // Add a condition here to ensure that `upsert` works correctly
              conflictFields: ["section", "origin", "grade"], // This ensures it checks for these fields for conflict
            },
          );
        }
      }
    }

    // Iterate over the BigTaiho results and upsert into the stock table
    for (const bigTaihoresult of bigTaihoresults) {
      const { origin, ...bigTaihoissueFields } = bigTaihoresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing BigTaiho Result:', bigTaihoresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        bigTaihoissueFields,
      )) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert(
            {
              origin,
              section: "BigTaiho",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: 0,
            },
            {
              // Add a condition here to ensure that `upsert` works correctly
              conflictFields: ["section", "origin", "grade"], // This ensures it checks for these fields for conflict
            },
          );
        }
      }
    }

    // Iterate over the LW results and upsert into the stock table
    for (const lwresult of lwresults) {
      const { origin, ...LWissueFields } = lwresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing LW Result:', lwresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(LWissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert(
            {
              origin,
              section: "LW",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: 0,
            },
            {
              // Add a condition here to ensure that `upsert` works correctly
              conflictFields: ["section", "origin", "grade"], // This ensures it checks for these fields for conflict
            },
          );
        }
      }
    }

    // Iterate over the Wholes results and upsert into the stock table
    for (const wholesresult of wholesresults) {
      const { origin, ...WholesissueFields } = wholesresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Wholes Result:', wholesresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        WholesissueFields,
      )) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert(
            {
              origin,
              section: "Wholes",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: 0,
            },
            {
              // Add a condition here to ensure that `upsert` works correctly
              conflictFields: ["section", "origin", "grade"], // This ensures it checks for these fields for conflict
            },
          );
        }
      }
    }

    // Iterate over the Rejection results and upsert into the stock table
    for (const rejectionresult of rejectionresults) {
      const { origin, ...RejectionissueFields } = rejectionresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Rejection Result:', rejectionresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        RejectionissueFields,
      )) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert(
            {
              origin,
              section: "Rejection",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: 0,
            },
            {
              // Add a condition here to ensure that `upsert` works correctly
              conflictFields: ["section", "origin", "grade"], // This ensures it checks for these fields for conflict
            },
          );
        }
      }
    }

    console.log("2024-2025 Stock update completed successfully");
  } catch (error) {
    console.error("Error updating stock data:", error);
  }
};

const updateProductionGradeStock2526 = async () => {
  try {
    // Fetch sum of all issue fields grouped by origin
    const dpdsresults = await DPDS.findAll({
      attributes: [
        "origin",
        // SUM each issue field and alias the result properly
        [sequelize.fn("SUM", sequelize.col("issue_m_ds")), "M_DS"],
        [sequelize.fn("SUM", sequelize.col("issue_m_dp")), "M_DP"],
        [sequelize.fn("SUM", sequelize.col("issue_k_dp")), "K_DP"],
        [sequelize.fn("SUM", sequelize.col("issue_ds_1")), "DS_1"],
        [sequelize.fn("SUM", sequelize.col("issue_ds_2")), "DS_2"],
        [sequelize.fn("SUM", sequelize.col("issue_sp_2")), "SP_2"],
        [sequelize.fn("SUM", sequelize.col("issue_yjh")), "YJH"],
        [sequelize.fn("SUM", sequelize.col("issue_yk")), "YK"],
        [sequelize.fn("SUM", sequelize.col("issue_kp")), "KP"],
        [sequelize.fn("SUM", sequelize.col("issue_wp")), "WP"],
        [sequelize.fn("SUM", sequelize.col("issue_rs")), "RS"],
        [sequelize.fn("SUM", sequelize.col("issue_dp_2")), "DP_2"],
        [sequelize.fn("SUM", sequelize.col("issue_dp_3")), "DP_3"],
        [sequelize.fn("SUM", sequelize.col("issue_dp_4")), "DP_4"],
        [sequelize.fn("SUM", sequelize.col("issue_dp_3l")), "DP_3L"],
        [sequelize.fn("SUM", sequelize.col("issue_ss")), "SS"],
        [sequelize.fn("SUM", sequelize.col("issue_os")), "OS"],
        [sequelize.fn("SUM", sequelize.col("issue_os1")), "OS1"],
        [sequelize.fn("SUM", sequelize.col("issue_V_ds")), "V_DS"],
        [sequelize.fn("SUM", sequelize.col("issue_V_m_ds")), "V_M_DS"],
        [sequelize.fn("SUM", sequelize.col("issue_V_dp")), "V_DP"],
        [sequelize.fn("SUM", sequelize.col("issue_V_m_dp")), "V_M_DP"],
        [sequelize.fn("SUM", sequelize.col("issue_V_lp")), "V_LP"],
        [sequelize.fn("SUM", sequelize.col("issue_V_lp_2")), "V_LP_2"],
        [sequelize.fn("SUM", sequelize.col("issue_V_k_dp")), "V_K_DP"],
        [sequelize.fn("SUM", sequelize.col("issue_V_ss")), "V_SS"],
        [sequelize.fn("SUM", sequelize.col("issue_V_yjh")), "V_YJH"],
        [sequelize.fn("SUM", sequelize.col("issue_V_yk")), "V_YK"],
        [sequelize.fn("SUM", sequelize.col("issue_V_sp_2")), "V_SP_2"],
        [sequelize.fn("SUM", sequelize.col("issue_V_kp")), "V_KP"],
        [sequelize.fn("SUM", sequelize.col("issue_V_dp_2")), "V_DP_2"],
        [sequelize.fn("SUM", sequelize.col("issue_V_dp_3")), "V_DP_3"],
        [sequelize.fn("SUM", sequelize.col("issue_V_dp_4")), "V_DP_4"],
        [sequelize.fn("SUM", sequelize.col("issue_V_os")), "V_OS"],
        [sequelize.fn("SUM", sequelize.col("issue_V_os_1")), "V_OS_1"],
        [sequelize.fn("SUM", sequelize.col("issue_V_wp")), "V_WP"],
        [sequelize.fn("SUM", sequelize.col("issue_V_rs")), "V_RS"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2025-03-31", // From 31st March 2024
          [Op.lt]: "2026-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true,
    });
    //console.log(dpdsresults)

    const sortingresults = await SortingModel.findAll({
      attributes: [
        "origin",
        // SUM each issue field and alias the result properly
        [sequelize.fn("SUM", sequelize.col("issue_jjh")), "JJH"],
        [sequelize.fn("SUM", sequelize.col("issue_jjh1")), "JJH1"],
        [sequelize.fn("SUM", sequelize.col("issue_sjh")), "SJH"],
        [sequelize.fn("SUM", sequelize.col("issue_jk")), "JK"],
        [sequelize.fn("SUM", sequelize.col("issue_jk1")), "JK1"],
        [sequelize.fn("SUM", sequelize.col("issue_k")), "K"],
        [sequelize.fn("SUM", sequelize.col("issue_k1")), "K1"],
        [sequelize.fn("SUM", sequelize.col("issue_lwp1")), "LWP1"],
        [sequelize.fn("SUM", sequelize.col("issue_lwp")), "LWP"],
        [sequelize.fn("SUM", sequelize.col("issue_s")), "S"],
        [sequelize.fn("SUM", sequelize.col("issue_ss")), "SS"],
        [sequelize.fn("SUM", sequelize.col("issue_yk")), "YK"],
        [sequelize.fn("SUM", sequelize.col("issue_sp2")), "SP2"],
        [sequelize.fn("SUM", sequelize.col("issue_kp")), "KP"],
        [sequelize.fn("SUM", sequelize.col("issue_in_k")), "IN_K"],
        [sequelize.fn("SUM", sequelize.col("issue_in_jh")), "IN_JH"],
        [sequelize.fn("SUM", sequelize.col("issue_V_sjh")), "V_SJH"],
        [sequelize.fn("SUM", sequelize.col("issue_V_k")), "V_K"],
        [sequelize.fn("SUM", sequelize.col("issue_V_k1")), "V_K1"],
        [sequelize.fn("SUM", sequelize.col("issue_V_lwp")), "V_LWP"],
        [sequelize.fn("SUM", sequelize.col("issue_V_lwp1")), "V_LWP1"],
        [sequelize.fn("SUM", sequelize.col("issue_V_jk")), "V_JK"],
        [sequelize.fn("SUM", sequelize.col("issue_V_jk1")), "V_JK1"],
        [sequelize.fn("SUM", sequelize.col("issue_V_ss")), "V_SS"],
        [sequelize.fn("SUM", sequelize.col("issue_V_sp")), "V_SP"],
        [sequelize.fn("SUM", sequelize.col("issue_V_sp2")), "V_SP2"],
        [sequelize.fn("SUM", sequelize.col("issue_V_jh1")), "V_JH1"],
        [sequelize.fn("SUM", sequelize.col("issue_V_yk")), "V_YK"],
        [sequelize.fn("SUM", sequelize.col("issue_V_m_jk1")), "V_M_JK1"],
      ],
      group: ["origin"],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2025-03-31", // From 31st March 2024
          [Op.lt]: "2026-04-01", // Up to 1st April 2025
        },
      },
      //raw: true,
    });
    //console.log(sortingresults)

    const bigTaihoresults = await bigTaihoModel.findAll({
      attributes: [
        "origin",
        // SUM each issue field and alias the result properly
        [sequelize.fn("SUM", sequelize.col("issue_ssp")), "SSP"],
        [sequelize.fn("SUM", sequelize.col("issue_ssp_small")), "SSP_Small"],
        [sequelize.fn("SUM", sequelize.col("issue_swp_1")), "SWP_1"],
        [sequelize.fn("SUM", sequelize.col("issue_wsp")), "WSP"],
        [sequelize.fn("SUM", sequelize.col("issue_bits")), "BITS"],
        [sequelize.fn("SUM", sequelize.col("issue_swp")), "SWP"],
        [sequelize.fn("SUM", sequelize.col("issue_bb")), "BB"],
        [sequelize.fn("SUM", sequelize.col("issue_w_bb")), "W_BB"],
        [sequelize.fn("SUM", sequelize.col("issue_bb_A")), "BB_A"],
        [sequelize.fn("SUM", sequelize.col("issue_bb1")), "BB_1"],
        [sequelize.fn("SUM", sequelize.col("issue_bb1_A")), "BB_1A"],
        [sequelize.fn("SUM", sequelize.col("issue_bb_2")), "BB_2"],
        [sequelize.fn("SUM", sequelize.col("issue_ssp_1")), "SSP_1"],
        [
          sequelize.fn("SUM", sequelize.col("issue_ssp_1_small")),
          "SSP_1_Small",
        ],
        [sequelize.fn("SUM", sequelize.col("issue_ssp_2")), "SSP_2"],
        [
          sequelize.fn("SUM", sequelize.col("issue_ssp_2_small")),
          "SSP_2_Small",
        ],
        [sequelize.fn("SUM", sequelize.col("issue_sdp")), "SDP"],
      ],
      group: ["origin"],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2025-03-31", // From 31st March 2024
          [Op.lt]: "2026-04-01", // Up to 1st April 2025
        },
      },
      //raw: true,
      //  Ensure plain objects are returned, not Sequelize instances
    });
    //console.log(bigtaihoresults)

    const lwresults = await LWModel.findAll({
      attributes: [
        "origin",
        // Sum each issue field based on the new keys
        [sequelize.fn("SUM", sequelize.col("issue_kw")), "KW"],
        [sequelize.fn("SUM", sequelize.col("issue_kw_1")), "KW_1"],
        [sequelize.fn("SUM", sequelize.col("issue_kw_2")), "KW_2"],
        [sequelize.fn("SUM", sequelize.col("issue_kn")), "KN"],
        [sequelize.fn("SUM", sequelize.col("issue_dw")), "DW"],
        [sequelize.fn("SUM", sequelize.col("issue_dw_1")), "DW_1"],
        [sequelize.fn("SUM", sequelize.col("issue_dw_2")), "DW_2"],
        [sequelize.fn("SUM", sequelize.col("issue_ow")), "OW"],
        [sequelize.fn("SUM", sequelize.col("issue_ow_1")), "OW_1"],
        [sequelize.fn("SUM", sequelize.col("issue_ow_2")), "OW_2"],
        [sequelize.fn("SUM", sequelize.col("issue_jw")), "JW"],
        [sequelize.fn("SUM", sequelize.col("issue_pw")), "PW"],
        [sequelize.fn("SUM", sequelize.col("issue_row")), "ROW"],
        [sequelize.fn("SUM", sequelize.col("issue_rej_1")), "REJ_1"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_180")), "LW3_180"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_210")), "LW3_210"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_240")), "LW3_240"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_280")), "LW3_280"],
        [sequelize.fn("SUM", sequelize.col("issue_lw3_360")), "LW3_360"],
        [sequelize.fn("SUM", sequelize.col("issue_lw2")), "LW2"],
        [sequelize.fn("SUM", sequelize.col("issue_lw4")), "LW4"],
        [sequelize.fn("SUM", sequelize.col("issue_lw5")), "LW5"],
        [sequelize.fn("SUM", sequelize.col("issue_lw6")), "LW6"],
        [sequelize.fn("SUM", sequelize.col("issue_lw7")), "LW7"],
        [sequelize.fn("SUM", sequelize.col("issue_rej_3")), "REJ_3"],
        [sequelize.fn("SUM", sequelize.col("issue_rej_4")), "REJ_4"],
        [sequelize.fn("SUM", sequelize.col("issue_jb2")), "JB2"],
        [sequelize.fn("SUM", sequelize.col("issue_sjb")), "SJB"],
        [sequelize.fn("SUM", sequelize.col("issue_k_240")), "K_240"],
        [sequelize.fn("SUM", sequelize.col("issue_k_280")), "K_280"],
        [sequelize.fn("SUM", sequelize.col("issue_k_360")), "K_360"],
        [sequelize.fn("SUM", sequelize.col("issue_pkw")), "PKW"],
        [sequelize.fn("SUM", sequelize.col("issue_bw")), "BW"],
        [sequelize.fn("SUM", sequelize.col("issue_rw")), "RW"],
        [sequelize.fn("SUM", sequelize.col("issue_rrw")), "RRW"],
        [sequelize.fn("SUM", sequelize.col("issue_fw")), "FW"],
        [sequelize.fn("SUM", sequelize.col("issue_lw")), "LW"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2025-03-31", // From 31st March 2024
          [Op.lt]: "2026-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(lwresults)

    const wholesresults = await WholesModel.findAll({
      attributes: [
        "origin",
        // Sum each issue field based on the new keys
        [sequelize.fn("SUM", sequelize.col("issue_pw_150")), "PW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_w_150")), "W_150"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_150")), "WW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_s_150")), "S_150"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_150")), "AW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_150")), "LW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_180")), "PW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_w_180")), "W_180"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_180")), "WW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_s_180")), "S_180"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_180")), "AW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_180")), "LW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_210")), "PW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_w_210")), "W_210"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_210")), "WW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_s_210")), "S_210"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_210")), "AW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_210")), "LW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_240")), "PW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_w_240")), "W_240"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_240")), "WW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_240_A")), "WW_240_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_240")), "AW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_240")), "LW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_280")), "PW_280"],
        [sequelize.fn("SUM", sequelize.col("issue_w_280")), "W_280"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_280")), "WW_280"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_280_A")), "WW_280_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_280")), "AW_280"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_280")), "LW_280"],
        [sequelize.fn("SUM", sequelize.col("wholes_double")), "WHOLES_DOUBLE"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_320")), "PW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_w_320")), "W_320"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_320")), "WW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_320_A")), "WW_320_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_320")), "AW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_320")), "LW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_360")), "PW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_w_360")), "W_360"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_360")), "WW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_360_A")), "WW_360_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_360")), "AW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_360")), "LW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_pw_400")), "PW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_w_400")), "W_400"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_400")), "WW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_ww_400_A")), "WW_400_A"],
        [sequelize.fn("SUM", sequelize.col("issue_aw_400")), "AW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_lw_400")), "LW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_jjb")), "JJB"],
        [sequelize.fn("SUM", sequelize.col("issue_jjb1")), "JJB1"],
        [sequelize.fn("SUM", sequelize.col("issue_payal_240")), "PAYAL_240"],
        [sequelize.fn("SUM", sequelize.col("issue_payal_400")), "PAYAL_400"],
        [sequelize.fn("SUM", sequelize.col("issue_e_320_lot")), "E_320_LOT"],
        [sequelize.fn("SUM", sequelize.col("issue_e_400_lot")), "E_400_LOT"],
        [sequelize.fn("SUM", sequelize.col("issue_in_w_240")), "IN_W_240"],
        [sequelize.fn("SUM", sequelize.col("issue_in_w_320")), "IN_W_320"],
        [sequelize.fn("SUM", sequelize.col("issue_in_w_400")), "IN_W_400"],
        [sequelize.fn("SUM", sequelize.col("issue_a_150")), "A_150"],
        [sequelize.fn("SUM", sequelize.col("issue_c_150")), "C_150"],
        [sequelize.fn("SUM", sequelize.col("issue_e_150")), "E_150"],
        [sequelize.fn("SUM", sequelize.col("issue_sw_150")), "SW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_ssw_150")), "SSW_150"],
        [sequelize.fn("SUM", sequelize.col("issue_k_150")), "K_150"],
        [sequelize.fn("SUM", sequelize.col("issue_a_180")), "A_180"],
        [sequelize.fn("SUM", sequelize.col("issue_c_180")), "C_180"],
        [sequelize.fn("SUM", sequelize.col("issue_e_180")), "E_180"],
        [sequelize.fn("SUM", sequelize.col("issue_sw_180")), "SW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_ssw_180")), "SSW_180"],
        [sequelize.fn("SUM", sequelize.col("issue_k_180")), "K_180"],
        [sequelize.fn("SUM", sequelize.col("issue_a_210")), "A_210"],
        [sequelize.fn("SUM", sequelize.col("issue_c_210")), "C_210"],
        [sequelize.fn("SUM", sequelize.col("issue_e_210")), "E_210"],
        [sequelize.fn("SUM", sequelize.col("issue_sw_210")), "SW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_ssw_210")), "SSW_210"],
        [sequelize.fn("SUM", sequelize.col("issue_k_210")), "K_210"],
        [sequelize.fn("SUM", sequelize.col("issue_a_240")), "A_240"],
        [sequelize.fn("SUM", sequelize.col("issue_c_240")), "C_240"],
        [sequelize.fn("SUM", sequelize.col("issue_e_240")), "E_240"],
        [sequelize.fn("SUM", sequelize.col("issue_sw_240")), "SW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_ssw_240")), "SSW_240"],
        [sequelize.fn("SUM", sequelize.col("issue_k_240")), "K_240"],
        [sequelize.fn("SUM", sequelize.col("issue_a_280")), "A_280"],
        [sequelize.fn("SUM", sequelize.col("issue_c_280")), "C_280"],
        [sequelize.fn("SUM", sequelize.col("issue_e_280")), "E_280"],
        [sequelize.fn("SUM", sequelize.col("issue_sw_280")), "SW_280"],
        [sequelize.fn("SUM", sequelize.col("issue_ssw_280")), "SSW_280"],
        [sequelize.fn("SUM", sequelize.col("issue_k_280")), "K_280"],
        [sequelize.fn("SUM", sequelize.col("issue_a_320")), "A_320"],
        [sequelize.fn("SUM", sequelize.col("issue_c_320")), "C_320"],
        [sequelize.fn("SUM", sequelize.col("issue_e_320")), "E_320"],
        [sequelize.fn("SUM", sequelize.col("issue_sw_320")), "SW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_ssw_320")), "SSW_320"],
        [sequelize.fn("SUM", sequelize.col("issue_k_320")), "K_320"],
        [sequelize.fn("SUM", sequelize.col("issue_a_360")), "A_360"],
        [sequelize.fn("SUM", sequelize.col("issue_c_360")), "C_360"],
        [sequelize.fn("SUM", sequelize.col("issue_e_360")), "E_360"],
        [sequelize.fn("SUM", sequelize.col("issue_sw_360")), "SW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_ssw_360")), "SSW_360"],
        [sequelize.fn("SUM", sequelize.col("issue_k_360")), "K_360"],
        [sequelize.fn("SUM", sequelize.col("issue_a_400")), "A_400"],
        [sequelize.fn("SUM", sequelize.col("issue_c_400")), "C_400"],
        [sequelize.fn("SUM", sequelize.col("issue_e_400")), "E_400"],
        [sequelize.fn("SUM", sequelize.col("issue_sw_400")), "SW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_ssw_400")), "SSW_400"],
        [sequelize.fn("SUM", sequelize.col("issue_k_400")), "K_400"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2025-03-31", // From 31st March 2024
          [Op.lt]: "2026-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(wholesresults)

    const rejectionresults = await rejectionModel.findAll({
      attributes: [
        "origin",
        // Sum each issue field based on the new keys
        [sequelize.fn("SUM", sequelize.col("issue_packing")), "Rejection"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2025-03-31", // From 31st March 2024
          [Op.lt]: "2026-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(rejectionresults)

    const villageresults = await villageProduction.findAll({
      attributes: [
        "origin",
        // Sum each issue field based on the new keys
        [sequelize.fn("SUM", sequelize.col("issue_packing")), "Village"],
      ],
      where: {
        Status: 1,
        editStatus: { [Op.notLike]: "Pending" },
        date: {
          [Op.gte]: "2025-03-31", // From 31st March 2024
          [Op.lt]: "2026-04-01", // Up to 1st April 2025
        },
      },
      group: ["origin"],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(villageresults)

    // Iterate over the DPDS results and upsert into the stock table
    for (const dpdsresult of dpdsresults) {
      const { origin, ...dpdsissueFields } = dpdsresult.dataValues;

      for (const [gradename, issuequantity] of Object.entries(
        dpdsissueFields,
      )) {
        if (issuequantity !== null) {
          const columnName = getColumnName(gradename as KeyAlias);

          const dpdsmapQty = await orderMappingModel.findOne({
            attributes: [
              [
                sequelize.fn("SUM", sequelize.col("mappedQuantity")),
                "mappedQuantity",
              ],
            ],
            where: {
              productionOrigin: origin,
              productionGrade: columnName,
              productionSection: "DPDS",
              mappingStatus: 1,
              editStatus: { [Op.notLike]: "Pending" },
              mappingDate: {
                [Op.gte]: "2025-03-31",
                [Op.lt]: "2026-04-01",
              },
            },
            group: ["productionSection", "productionOrigin", "productionGrade"],
          });

          const existingStock = await productionStockGrade2526.findOne({
            where: {
              origin,
              section: "DPDS",
              grade: gradename,
            },
          });

          await productionStockGrade2526.upsert(
            {
              origin,
              section: "DPDS",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: existingStock
                ? existingStock.dataValues.thresoldopenquantity
                : 0,
              consumequantity: dpdsmapQty
                ? dpdsmapQty.dataValues.mappedQuantity
                : 0,
              thresoldconsumequantity: existingStock
                ? existingStock.dataValues.thresoldconsumequantity
                : 0,
            },
            {
              conflictFields: ["section", "origin", "grade"],
            },
          );
        }
      }
    }

    // Iterate over the Sorting results and upsert into the stock table
    for (const sortingresult of sortingresults) {
      const { origin, ...sortingissueFields } = sortingresult.dataValues;

      //Log sorting result to ensure it's correct
      // console.log('Processing Sorting Result:', sortingresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        sortingissueFields,
      )) {
        if (issuequantity !== null) {
          const columnName = getColumnName(gradename as KeyAlias);

          const sortingmapQty = await orderMappingModel.findOne({
            attributes: [
              [
                sequelize.fn("SUM", sequelize.col("mappedQuantity")),
                "mappedQuantity",
              ],
            ],
            where: {
              productionOrigin: origin,
              productionGrade: columnName,
              productionSection: "Sorting",
              mappingStatus: 1,
              editStatus: { [Op.notLike]: "Pending" },
              mappingDate: {
                [Op.gte]: "2025-03-31",
                [Op.lt]: "2026-04-01",
              },
            },
            group: ["productionSection", "productionOrigin", "productionGrade"],
          });

          const existingStock = await productionStockGrade2526.findOne({
            where: {
              origin,
              section: "Sorting",
              grade: gradename,
            },
          });

          await productionStockGrade2526.upsert(
            {
              origin,
              section: "Sorting",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: existingStock
                ? existingStock.dataValues.thresoldopenquantity
                : 0,
              consumequantity: sortingmapQty
                ? sortingmapQty.dataValues.mappedQuantity
                : 0,
              thresoldconsumequantity: existingStock
                ? existingStock.dataValues.thresoldconsumequantity
                : 0,
            },
            {
              conflictFields: ["section", "origin", "grade"],
            },
          );
        }
      }
    }

    // Iterate over the BigTaiho results and upsert into the stock table
    for (const bigTaihoresult of bigTaihoresults) {
      const { origin, ...bigTaihoissueFields } = bigTaihoresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing BigTaiho Result:', bigTaihoresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        bigTaihoissueFields,
      )) {
        if (issuequantity !== null) {
          const columnName = getColumnName(gradename as KeyAlias);

          const bigTaihomapQty = await orderMappingModel.findOne({
            attributes: [
              [
                sequelize.fn("SUM", sequelize.col("mappedQuantity")),
                "mappedQuantity",
              ],
            ],
            where: {
              productionOrigin: origin,
              productionGrade: columnName,
              productionSection: "BigTaiho",
              mappingStatus: 1,
              editStatus: { [Op.notLike]: "Pending" },
              mappingDate: {
                [Op.gte]: "2025-03-31",
                [Op.lt]: "2026-04-01",
              },
            },
            group: ["productionSection", "productionOrigin", "productionGrade"],
          });

          const existingStock = await productionStockGrade2526.findOne({
            where: {
              origin,
              section: "BigTaiho",
              grade: gradename,
            },
          });
          await productionStockGrade2526.upsert(
            {
              origin,
              section: "BigTaiho",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: existingStock
                ? existingStock.dataValues.thresoldopenquantity
                : 0,
              consumequantity: bigTaihomapQty
                ? bigTaihomapQty.dataValues.mappedQuantity
                : 0,
              thresoldconsumequantity: existingStock
                ? existingStock.dataValues.thresoldconsumequantity
                : 0,
            },
            {
              conflictFields: ["section", "origin", "grade"],
            },
          );
        }
      }
    }

    // Iterate over the LW results and upsert into the stock table
    for (const lwresult of lwresults) {
      const { origin, ...LWissueFields } = lwresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing LW Result:', lwresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(LWissueFields)) {
        if (issuequantity !== null) {
          const columnName = getColumnName(gradename as KeyAlias);

          const lwmapQty = await orderMappingModel.findOne({
            attributes: [
              [
                sequelize.fn("SUM", sequelize.col("mappedQuantity")),
                "mappedQuantity",
              ],
            ],
            where: {
              productionOrigin: origin,
              productionGrade: columnName,
              productionSection: "LW",
              mappingStatus: 1,
              editStatus: { [Op.notLike]: "Pending" },
              mappingDate: {
                [Op.gte]: "2025-03-31",
                [Op.lt]: "2026-04-01",
              },
            },
            group: ["productionSection", "productionOrigin", "productionGrade"],
          });

          const existingStock = await productionStockGrade2526.findOne({
            where: {
              origin,
              section: "LW",
              grade: gradename,
            },
          });
          await productionStockGrade2526.upsert(
            {
              origin,
              section: "LW",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: existingStock
                ? existingStock.dataValues.thresoldopenquantity
                : 0,
              consumequantity: lwmapQty
                ? lwmapQty.dataValues.mappedQuantity
                : 0,
              thresoldconsumequantity: existingStock
                ? existingStock.dataValues.thresoldconsumequantity
                : 0,
            },
            {
              conflictFields: ["section", "origin", "grade"],
            },
          );
        }
      }
    }

    // Iterate over the Wholes results and upsert into the stock table
    for (const wholesresult of wholesresults) {
      const { origin, ...WholesissueFields } = wholesresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Wholes Result:', wholesresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        WholesissueFields,
      )) {
        if (issuequantity !== null) {
          const columnName = getColumnName(gradename as KeyAlias);

          const wholesmapQty = await orderMappingModel.findOne({
            attributes: [
              [
                sequelize.fn("SUM", sequelize.col("mappedQuantity")),
                "mappedQuantity",
              ],
            ],
            where: {
              productionOrigin: origin,
              productionGrade: columnName,
              productionSection: "Wholes",
              mappingStatus: 1,
              editStatus: { [Op.notLike]: "Pending" },
              mappingDate: {
                [Op.gte]: "2025-03-31",
                [Op.lt]: "2026-04-01",
              },
            },
            group: ["productionSection", "productionOrigin", "productionGrade"],
          });

          const existingStock = await productionStockGrade2526.findOne({
            where: {
              origin,
              section: "Wholes",
              grade: gradename,
            },
          });
          await productionStockGrade2526.upsert(
            {
              origin,
              section: "Wholes",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: existingStock
                ? existingStock.dataValues.thresoldopenquantity
                : 0,
              consumequantity: wholesmapQty
                ? wholesmapQty.dataValues.mappedQuantity
                : 0,
              thresoldconsumequantity: existingStock
                ? existingStock.dataValues.thresoldconsumequantity
                : 0,
            },
            {
              conflictFields: ["section", "origin", "grade"],
            },
          );
        }
      }
    }

    // Iterate over the Rejection results and upsert into the stock table
    for (const rejectionresult of rejectionresults) {
      const { origin, ...RejectionissueFields } = rejectionresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Rejection Result:', rejectionresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        RejectionissueFields,
      )) {
        if (issuequantity !== null) {
          const columnName = getColumnName(gradename as KeyAlias);

          const rejectionmapQty = await orderMappingModel.findOne({
            attributes: [
              [
                sequelize.fn("SUM", sequelize.col("mappedQuantity")),
                "mappedQuantity",
              ],
            ],
            where: {
              productionOrigin: origin,
              productionGrade: columnName,
              productionSection: "Rejection",
              mappingStatus: 1,
              editStatus: { [Op.notLike]: "Pending" },
              mappingDate: {
                [Op.gte]: "2025-03-31",
                [Op.lt]: "2026-04-01",
              },
            },
            group: ["productionSection", "productionOrigin", "productionGrade"],
          });

          const existingStock = await productionStockGrade2526.findOne({
            where: {
              origin,
              section: "Rejection",
              grade: gradename,
            },
          });
          await productionStockGrade2526.upsert(
            {
              origin,
              section: "Rejection",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: existingStock
                ? existingStock.dataValues.thresoldopenquantity
                : 0,
              consumequantity: rejectionmapQty
                ? rejectionmapQty.dataValues.mappedQuantity
                : 0,
              thresoldconsumequantity: existingStock
                ? existingStock.dataValues.thresoldconsumequantity
                : 0,
            },
            {
              conflictFields: ["section", "origin", "grade"],
            },
          );
        }
      }
    }

    // Iterate over the Village results and upsert into the stock table
    for (const villageresult of villageresults) {
      const { origin, ...VillageissueFields } = villageresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Rejection Result:', rejectionresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(
        VillageissueFields,
      )) {
        if (issuequantity !== null) {
          const columnName = getColumnName(gradename as KeyAlias);

          const villagemapQty = await orderMappingModel.findOne({
            attributes: [
              [
                sequelize.fn("SUM", sequelize.col("mappedQuantity")),
                "mappedQuantity",
              ],
            ],
            where: {
              productionOrigin: origin,
              productionGrade: columnName,
              productionSection: "Village",
              mappingStatus: 1,
              editStatus: { [Op.notLike]: "Pending" },
              mappingDate: {
                [Op.gte]: "2025-03-31",
                [Op.lt]: "2026-04-01",
              },
            },
            group: ["productionSection", "productionOrigin", "productionGrade"],
          });

          const existingStock = await productionStockGrade2526.findOne({
            where: {
              origin,
              section: "Village",
              grade: gradename,
            },
          });
          await productionStockGrade2526.upsert(
            {
              origin,
              section: "Village",
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: existingStock
                ? existingStock.dataValues.thresoldopenquantity
                : 0,
              consumequantity: villagemapQty
                ? villagemapQty.dataValues.mappedQuantity
                : 0,
              thresoldconsumequantity: existingStock
                ? existingStock.dataValues.thresoldconsumequantity
                : 0,
            },
            {
              conflictFields: ["section", "origin", "grade"],
            },
          );
        }
      }
    }

    const orderResults = await orderPrimaryModel.findAll({
      attributes: [
        "origin",
        "gradeName",
        [sequelize.fn("sum", sequelize.col("quantity")), "issueOrderQuantity"],
        [
          sequelize.fn("sum", sequelize.col("actualquantity")),
          "consumeOrderQuantity",
        ],
      ],
      where: {
        orderInvDate: {
          [Op.gte]: "2025-03-31", // From 31st March 2024
          [Op.lt]: "2026-04-01", // Up to 1st April 2025
        },
        [Op.or]: [{ editStatus: "Accepted" }, { editStatus: "N/A" }],
      },
      group: ["origin", "gradeName"],
    });

    //console.log(orderResults)

    // Iterate over the Order results and upsert into the stock table
    // for (const orderResult of orderResults) {
    //   const { origin, gradeName, issueOrderQuantity, consumeOrderQuantity } = orderResult.dataValues;

    //   if (issueOrderQuantity !== null) {
    //     await orderStockGrade2526.upsert({
    //       origin,
    //       grade: gradeName,
    //       openquantity: issueOrderQuantity,
    //       thresoldopenquantity: 0,
    //       consumequantity: consumeOrderQuantity,
    //       thresoldconsumequantity: 0
    //     }, {
    //       // Add a condition here to ensure that `upsert` works correctly
    //       conflictFields: ['origin', 'grade'],  // This ensures it checks for these fields for conflict
    //     });
    //   }

    // }

    // for (const orderResult of orderResults) {
    //   const { origin, gradeName, issueOrderQuantity, consumeOrderQuantity } =
    //     orderResult.dataValues;

    //   if (issueOrderQuantity !== null) {
    //     const existingRow = await orderStockGrade.findOne({
    //       where: {
    //         origin,
    //         grade: gradeName,
    //       },
    //     });

    //     if (existingRow) {
    //       // Only update fields you want to change
    //       await existingRow.update({
    //         openquantity: issueOrderQuantity,
    //         consumequantity: consumeOrderQuantity,
    //         // Do not touch threshold fields
    //       });
    //     } else {
    //       // Insert new row with thresholds set to 0
    //       await orderStockGrade.create({
    //         origin,
    //         grade: gradeName,
    //         openquantity: issueOrderQuantity,
    //         thresoldopenquantity: 0,
    //         consumequantity: consumeOrderQuantity,
    //         thresoldconsumequantity: 0,
    //       });
    //     }
    //   }
    // }

    console.log("2025-2026 Stock update completed successfully");
  } catch (error) {
    console.error("Error updating stock data:", error);
  }
};

// Schedule the job to run at 6 PM and 12 AM
// cron.schedule("0 21 * * *", () => {
//   console.log("Running scheduled stock update job...");
//   if (CY_FY === "2024-25") {
//     updateProductionGradeStock2425();
//   } else if (CY_FY === "2025-26") {
//     updateProductionGradeStock2526();
//   } else {
//     console.log("FY Not Found or Other Error Occured...");
//   }
// });

export { updateProductionGradeStock2425, updateProductionGradeStock2526 };
