import cron from 'node-cron';
import sequelize from '../config/databaseConfig';
import DPDS from '../model/dpdsmodel';
import productionStockGrade2425 from '../model/productionStockgrade2425';
import SortingModel from '../model/sortingModel';
import bigTaihoModel from '../model/bigTaihoModel';
import LWModel from '../model/lowerGradeModel';
import WholesModel from '../model/wholesModel';
import rejectionModel from '../model/rejectionModel';
import { Op } from 'sequelize';
import orderPrimaryModel from '../model/orderModel';
import orderStockGrade2425 from '../model/orderStockGrade2425';
import orderStockGrade2526 from '../model/orderStockGrade2526';
import productionStockGrade2526 from '../model/productionStockgrade2526';

const CY_FY = process.env.CY_FY ? process.env.CY_FY : '2025-26';
// Function to fetch and update stock quantities
const updateProductionGradeStock2425 = async () => {
  try {
    // Fetch sum of all issue fields grouped by origin
    const dpdsresults = await DPDS.findAll({
      attributes: [
        'origin',
        // SUM each issue field and alias the result properly
        [sequelize.fn('SUM', sequelize.col('issue_m_ds')), 'M_DS'],
        [sequelize.fn('SUM', sequelize.col('issue_m_dp')), 'M_DP'],
        [sequelize.fn('SUM', sequelize.col('issue_k_dp')), 'K_DP'],
        [sequelize.fn('SUM', sequelize.col('issue_ds_1')), 'DS_1'],
        [sequelize.fn('SUM', sequelize.col('issue_ds_2')), 'DS_2'],
        [sequelize.fn('SUM', sequelize.col('issue_sp_2')), 'SP_2'],
        [sequelize.fn('SUM', sequelize.col('issue_yjh')), 'YJH'],
        [sequelize.fn('SUM', sequelize.col('issue_yk')), 'YK'],
        [sequelize.fn('SUM', sequelize.col('issue_kp')), 'KP'],
        [sequelize.fn('SUM', sequelize.col('issue_wp')), 'WP'],
        [sequelize.fn('SUM', sequelize.col('issue_rs')), 'RS'],
        [sequelize.fn('SUM', sequelize.col('issue_dp_2')), 'DP_2'],
        [sequelize.fn('SUM', sequelize.col('issue_dp_3')), 'DP_3'],
        [sequelize.fn('SUM', sequelize.col('issue_dp_4')), 'DP_4'],
        [sequelize.fn('SUM', sequelize.col('issue_dp_3l')), 'DP_3L'],
        [sequelize.fn('SUM', sequelize.col('issue_ss')), 'SS'],
        [sequelize.fn('SUM', sequelize.col('issue_os')), 'OS'],
        [sequelize.fn('SUM', sequelize.col('issue_os1')), 'OS_1']
      ],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2024-03-31', // From 31st March 2024
          [Op.lt]: '2025-04-01', // Up to 1st April 2025
        }
      },
      group: ['origin'],
      // raw: true,
    });
    //console.log(dpdsresults)

    const sortingresults = await SortingModel.findAll({
      attributes: [
        'origin',
        // SUM each issue field and alias the result properly
        [sequelize.fn('SUM', sequelize.col('issue_jjh')), 'JJH'],
        [sequelize.fn('SUM', sequelize.col('issue_jjh1')), 'JJH1'],
        [sequelize.fn('SUM', sequelize.col('issue_sjh')), 'SJH'],
        [sequelize.fn('SUM', sequelize.col('issue_jk')), 'JK'],
        [sequelize.fn('SUM', sequelize.col('issue_jk1')), 'JK_1'],
        [sequelize.fn('SUM', sequelize.col('issue_k')), 'K'],
        [sequelize.fn('SUM', sequelize.col('issue_k1')), 'K_1'],
        [sequelize.fn('SUM', sequelize.col('issue_lwp1')), 'LWP_1'],
        [sequelize.fn('SUM', sequelize.col('issue_lwp')), 'LWP'],
        [sequelize.fn('SUM', sequelize.col('issue_s')), 'S'],
        [sequelize.fn('SUM', sequelize.col('issue_ss')), 'SS'],
        [sequelize.fn('SUM', sequelize.col('issue_yk')), 'YK'],
        [sequelize.fn('SUM', sequelize.col('issue_sp2')), 'SP_2'],
        [sequelize.fn('SUM', sequelize.col('issue_kp')), 'KP']
      ],
      group: ['origin'],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2024-03-31', // From 31st March 2024
          [Op.lt]: '2025-04-01', // Up to 1st April 2025
        }
      },
      //raw: true,
    });
    //console.log(sortingresults)

    const bigTaihoresults = await bigTaihoModel.findAll({
      attributes: [
        'origin',
        // SUM each issue field and alias the result properly
        [sequelize.fn('SUM', sequelize.col('issue_ssp')), 'SSP'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_small')), 'SSP_Small'],
        [sequelize.fn('SUM', sequelize.col('issue_swp_1')), 'SWP_1'],
        [sequelize.fn('SUM', sequelize.col('issue_wsp')), 'WSP'],
        [sequelize.fn('SUM', sequelize.col('issue_bits')), 'BITS'],
        [sequelize.fn('SUM', sequelize.col('issue_swp')), 'SWP'],
        [sequelize.fn('SUM', sequelize.col('issue_bb')), 'BB'],
        [sequelize.fn('SUM', sequelize.col('issue_w_bb')), 'W_BB'],
        [sequelize.fn('SUM', sequelize.col('issue_bb_A')), 'BB_A'],
        [sequelize.fn('SUM', sequelize.col('issue_bb1')), 'BB_1'],
        [sequelize.fn('SUM', sequelize.col('issue_bb1_A')), 'BB_1A'],
        [sequelize.fn('SUM', sequelize.col('issue_bb_2')), 'BB_2'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_1')), 'SSP_1'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_1_small')), 'SSP_1_Small'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_2')), 'SSP_2'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_2_small')), 'SSP_2_Small'],
        [sequelize.fn('SUM', sequelize.col('issue_sdp')), 'SDP']
      ],
      group: ['origin'],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2024-03-31', // From 31st March 2024
          [Op.lt]: '2025-04-01', // Up to 1st April 2025
        }
      },
      //raw: true, 
      //  Ensure plain objects are returned, not Sequelize instances
    });
    //console.log(bigtaihoresults)

    const lwresults = await LWModel.findAll({
      attributes: [
        'origin',
        // Sum each issue field based on the new keys
        [sequelize.fn('SUM', sequelize.col('issue_kw')), 'KW'],
        [sequelize.fn('SUM', sequelize.col('issue_kw_1')), 'KW_1'],
        [sequelize.fn('SUM', sequelize.col('issue_kw_2')), 'KW_2'],
        [sequelize.fn('SUM', sequelize.col('issue_kn')), 'KN'],
        [sequelize.fn('SUM', sequelize.col('issue_dw')), 'DW'],
        [sequelize.fn('SUM', sequelize.col('issue_dw_1')), 'DW_1'],
        [sequelize.fn('SUM', sequelize.col('issue_dw_2')), 'DW_2'],
        [sequelize.fn('SUM', sequelize.col('issue_ow')), 'OW'],
        [sequelize.fn('SUM', sequelize.col('issue_ow_1')), 'OW_1'],
        [sequelize.fn('SUM', sequelize.col('issue_ow_2')), 'OW_2'],
        [sequelize.fn('SUM', sequelize.col('issue_jw')), 'JW'],
        [sequelize.fn('SUM', sequelize.col('issue_pw')), 'PW'],
        [sequelize.fn('SUM', sequelize.col('issue_row')), 'ROW'],
        [sequelize.fn('SUM', sequelize.col('issue_rej_1')), 'REJ_1'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_180')), 'LW3_180'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_210')), 'LW3_210'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_240')), 'LW3_240'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_280')), 'LW3_280'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_360')), 'LW3_360'],
        [sequelize.fn('SUM', sequelize.col('issue_lw2')), 'LW2'],
        [sequelize.fn('SUM', sequelize.col('issue_lw4')), 'LW4'],
        [sequelize.fn('SUM', sequelize.col('issue_lw5')), 'LW5'],
        [sequelize.fn('SUM', sequelize.col('issue_lw6')), 'LW6'],
        [sequelize.fn('SUM', sequelize.col('issue_lw7')), 'LW7'],
        [sequelize.fn('SUM', sequelize.col('issue_rej_3')), 'REJ_3'],
        [sequelize.fn('SUM', sequelize.col('issue_rej_4')), 'REJ_4'],
        [sequelize.fn('SUM', sequelize.col('issue_jb2')), 'JB2'],
        [sequelize.fn('SUM', sequelize.col('issue_sjb')), 'SJB'],
        [sequelize.fn('SUM', sequelize.col('issue_k_240')), 'K_240'],
        [sequelize.fn('SUM', sequelize.col('issue_k_280')), 'K_280'],
        [sequelize.fn('SUM', sequelize.col('issue_k_360')), 'K_360'],
        [sequelize.fn('SUM', sequelize.col('issue_pkw')), 'PKW'],
        [sequelize.fn('SUM', sequelize.col('issue_bw')), 'BW'],
        [sequelize.fn('SUM', sequelize.col('issue_rw')), 'RW'],
        [sequelize.fn('SUM', sequelize.col('issue_rrw')), 'RRW'],
        [sequelize.fn('SUM', sequelize.col('issue_fw')), 'FW'],
        [sequelize.fn('SUM', sequelize.col('issue_lw')), 'LW'],
      ],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2024-03-31', // From 31st March 2024
          [Op.lt]: '2025-04-01', // Up to 1st April 2025
        }
      },
      group: ['origin'],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(lwresults)

    const wholesresults = await WholesModel.findAll({
      attributes: [
        'origin',
        // Sum each issue field based on the new keys
        [sequelize.fn('SUM', sequelize.col('issue_pw_150')), 'PW_150'],
        [sequelize.fn('SUM', sequelize.col('issue_w_150')), 'W_150'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_150')), 'WW_150'],
        [sequelize.fn('SUM', sequelize.col('issue_s_150')), 'S_150'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_150')), 'AW_150'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_150')), 'LW_150'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_180')), 'PW_180'],
        [sequelize.fn('SUM', sequelize.col('issue_w_180')), 'W_180'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_180')), 'WW_180'],
        [sequelize.fn('SUM', sequelize.col('issue_s_180')), 'S_180'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_180')), 'AW_180'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_180')), 'LW_180'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_210')), 'PW_210'],
        [sequelize.fn('SUM', sequelize.col('issue_w_210')), 'W_210'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_210')), 'WW_210'],
        [sequelize.fn('SUM', sequelize.col('issue_s_210')), 'S_210'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_210')), 'AW_210'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_210')), 'LW_210'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_240')), 'PW_240'],
        [sequelize.fn('SUM', sequelize.col('issue_w_240')), 'W_240'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_240')), 'WW_240'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_240_A')), 'WW_240_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_240')), 'AW_240'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_240')), 'LW_240'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_280')), 'PW_280'],
        [sequelize.fn('SUM', sequelize.col('issue_w_280')), 'W_280'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_280')), 'WW_280'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_280_A')), 'WW_280_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_280')), 'AW_280'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_280')), 'LW_280'],
        [sequelize.fn('SUM', sequelize.col('wholes_double')), 'WHOLES_DOUBLE'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_320')), 'PW_320'],
        [sequelize.fn('SUM', sequelize.col('issue_w_320')), 'W_320'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_320')), 'WW_320'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_320_A')), 'WW_320_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_320')), 'AW_320'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_320')), 'LW_320'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_360')), 'PW_360'],
        [sequelize.fn('SUM', sequelize.col('issue_w_360')), 'W_360'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_360')), 'WW_360'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_360_A')), 'WW_360_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_360')), 'AW_360'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_360')), 'LW_360'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_400')), 'PW_400'],
        [sequelize.fn('SUM', sequelize.col('issue_w_400')), 'W_400'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_400')), 'WW_400'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_400_A')), 'WW_400_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_400')), 'AW_400'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_400')), 'LW_400'],
        [sequelize.fn('SUM', sequelize.col('issue_jjb')), 'JJB'],
        [sequelize.fn('SUM', sequelize.col('issue_jjb1')), 'JJB1'],
      ],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2024-03-31', // From 31st March 2024
          [Op.lt]: '2025-04-01', // Up to 1st April 2025
        }
      },
      group: ['origin'],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(wholesresults)

    const rejectionresults = await rejectionModel.findAll({
      attributes: [
        'origin',
        // Sum each issue field based on the new keys
        [sequelize.fn('SUM', sequelize.col('issue_packing')), 'Rejection']

      ],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2024-03-31', // From 31st March 2024
          [Op.lt]: '2025-04-01', // Up to 1st April 2025
        }
      },
      group: ['origin'],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(rejectionresults)

    const orderResults = await orderPrimaryModel.findAll({
      attributes: [
        'origin', 'gradeName',
        [sequelize.fn('sum', sequelize.col('quantity')), 'issueOrderQuantity'],
        [sequelize.fn('sum', sequelize.col('actualquantity')), 'consumeOrderQuantity'],
      ],
      where: {
        orderInvDate: {
          [Op.gte]: '2024-03-31', // From 31st March 2024
          [Op.lt]: '2025-04-01', // Up to 1st April 2025
        },
        [Op.or]: [{ editStatus: 'Accepted' }, { editStatus: 'N/A' },


        ]
      },
      group: ['origin', 'gradeName']
    });

    console.log(orderResults)

    // Iterate over the Order results and upsert into the stock table
    for (const orderResult of orderResults) {
      const { origin, gradeName, issueOrderQuantity, consumeOrderQuantity } = orderResult.dataValues;

      if (issueOrderQuantity !== null) {
        await orderStockGrade2425.upsert({
          origin,
          grade: gradeName,
          openquantity: issueOrderQuantity,
          thresoldopenquantity: 0,
          consumequantity: consumeOrderQuantity,
          thresoldconsumequantity: 0
        }, {
          // Add a condition here to ensure that `upsert` works correctly
          conflictFields: ['origin', 'grade'],  // This ensures it checks for these fields for conflict
        });
      }

    }




    // Iterate over the DPDS results and upsert into the stock table
    for (const dpdsresult of dpdsresults) {
      const { origin, ...dpdsissueFields } = dpdsresult.dataValues

      // Log dpds result to ensure it's correct
      //console.log('Processing DPDS Result:', dpdsresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(dpdsissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert({
            origin,
            section: 'DPDS',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    // Iterate over the Sorting results and upsert into the stock table
    for (const sortingresult of sortingresults) {
      const { origin, ...sortingissueFields } = sortingresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Sorting Result:', sortingresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(sortingissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert({
            origin,
            section: 'Sorting',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    // Iterate over the BigTaiho results and upsert into the stock table
    for (const bigTaihoresult of bigTaihoresults) {
      const { origin, ...bigTaihoissueFields } = bigTaihoresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing BigTaiho Result:', bigTaihoresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(bigTaihoissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert({
            origin,
            section: 'BigTaiho',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
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
          await productionStockGrade2425.upsert({
            origin,
            section: 'LW',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    // Iterate over the Wholes results and upsert into the stock table
    for (const wholesresult of wholesresults) {
      const { origin, ...WholesissueFields } = wholesresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Wholes Result:', wholesresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(WholesissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert({
            origin,
            section: 'Wholes',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    // Iterate over the Rejection results and upsert into the stock table
    for (const rejectionresult of rejectionresults) {
      const { origin, ...RejectionissueFields } = rejectionresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Rejection Result:', rejectionresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(RejectionissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2425.upsert({
            origin,
            section: 'Rejection',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }



    console.log('2024-2025 Stock update completed successfully');





  } catch (error) {
    console.error('Error updating stock data:', error);
  }
};

const updateProductionGradeStock2526 = async () => {
  try {
    // Fetch sum of all issue fields grouped by origin
    const dpdsresults = await DPDS.findAll({
      attributes: [
        'origin',
        // SUM each issue field and alias the result properly
        [sequelize.fn('SUM', sequelize.col('issue_m_ds')), 'M_DS'],
        [sequelize.fn('SUM', sequelize.col('issue_m_dp')), 'M_DP'],
        [sequelize.fn('SUM', sequelize.col('issue_k_dp')), 'K_DP'],
        [sequelize.fn('SUM', sequelize.col('issue_ds_1')), 'DS_1'],
        [sequelize.fn('SUM', sequelize.col('issue_ds_2')), 'DS_2'],
        [sequelize.fn('SUM', sequelize.col('issue_sp_2')), 'SP_2'],
        [sequelize.fn('SUM', sequelize.col('issue_yjh')), 'YJH'],
        [sequelize.fn('SUM', sequelize.col('issue_yk')), 'YK'],
        [sequelize.fn('SUM', sequelize.col('issue_kp')), 'KP'],
        [sequelize.fn('SUM', sequelize.col('issue_wp')), 'WP'],
        [sequelize.fn('SUM', sequelize.col('issue_rs')), 'RS'],
        [sequelize.fn('SUM', sequelize.col('issue_dp_2')), 'DP_2'],
        [sequelize.fn('SUM', sequelize.col('issue_dp_3')), 'DP_3'],
        [sequelize.fn('SUM', sequelize.col('issue_dp_4')), 'DP_4'],
        [sequelize.fn('SUM', sequelize.col('issue_dp_3l')), 'DP_3L'],
        [sequelize.fn('SUM', sequelize.col('issue_ss')), 'SS'],
        [sequelize.fn('SUM', sequelize.col('issue_os')), 'OS'],
        [sequelize.fn('SUM', sequelize.col('issue_os1')), 'OS_1']
      ],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2025-03-31', // From 31st March 2024
          [Op.lt]: '2026-04-01', // Up to 1st April 2025
        }
      },
      group: ['origin'],
      // raw: true,
    });
    //console.log(dpdsresults)

    const sortingresults = await SortingModel.findAll({
      attributes: [
        'origin',
        // SUM each issue field and alias the result properly
        [sequelize.fn('SUM', sequelize.col('issue_jjh')), 'JJH'],
        [sequelize.fn('SUM', sequelize.col('issue_jjh1')), 'JJH1'],
        [sequelize.fn('SUM', sequelize.col('issue_sjh')), 'SJH'],
        [sequelize.fn('SUM', sequelize.col('issue_jk')), 'JK'],
        [sequelize.fn('SUM', sequelize.col('issue_jk1')), 'JK_1'],
        [sequelize.fn('SUM', sequelize.col('issue_k')), 'K'],
        [sequelize.fn('SUM', sequelize.col('issue_k1')), 'K_1'],
        [sequelize.fn('SUM', sequelize.col('issue_lwp1')), 'LWP_1'],
        [sequelize.fn('SUM', sequelize.col('issue_lwp')), 'LWP'],
        [sequelize.fn('SUM', sequelize.col('issue_s')), 'S'],
        [sequelize.fn('SUM', sequelize.col('issue_ss')), 'SS'],
        [sequelize.fn('SUM', sequelize.col('issue_yk')), 'YK'],
        [sequelize.fn('SUM', sequelize.col('issue_sp2')), 'SP_2'],
        [sequelize.fn('SUM', sequelize.col('issue_kp')), 'KP']
      ],
      group: ['origin'],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2025-03-31', // From 31st March 2024
          [Op.lt]: '2026-04-01', // Up to 1st April 2025
        }
      },
      //raw: true,
    });
    //console.log(sortingresults)

    const bigTaihoresults = await bigTaihoModel.findAll({
      attributes: [
        'origin',
        // SUM each issue field and alias the result properly
        [sequelize.fn('SUM', sequelize.col('issue_ssp')), 'SSP'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_small')), 'SSP_Small'],
        [sequelize.fn('SUM', sequelize.col('issue_swp_1')), 'SWP_1'],
        [sequelize.fn('SUM', sequelize.col('issue_wsp')), 'WSP'],
        [sequelize.fn('SUM', sequelize.col('issue_bits')), 'BITS'],
        [sequelize.fn('SUM', sequelize.col('issue_swp')), 'SWP'],
        [sequelize.fn('SUM', sequelize.col('issue_bb')), 'BB'],
        [sequelize.fn('SUM', sequelize.col('issue_w_bb')), 'W_BB'],
        [sequelize.fn('SUM', sequelize.col('issue_bb_A')), 'BB_A'],
        [sequelize.fn('SUM', sequelize.col('issue_bb1')), 'BB_1'],
        [sequelize.fn('SUM', sequelize.col('issue_bb1_A')), 'BB_1A'],
        [sequelize.fn('SUM', sequelize.col('issue_bb_2')), 'BB_2'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_1')), 'SSP_1'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_1_small')), 'SSP_1_Small'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_2')), 'SSP_2'],
        [sequelize.fn('SUM', sequelize.col('issue_ssp_2_small')), 'SSP_2_Small'],
        [sequelize.fn('SUM', sequelize.col('issue_sdp')), 'SDP']
      ],
      group: ['origin'],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2025-03-31', // From 31st March 2024
          [Op.lt]: '2026-04-01', // Up to 1st April 2025
        }
      },
      //raw: true, 
      //  Ensure plain objects are returned, not Sequelize instances
    });
    //console.log(bigtaihoresults)

    const lwresults = await LWModel.findAll({
      attributes: [
        'origin',
        // Sum each issue field based on the new keys
        [sequelize.fn('SUM', sequelize.col('issue_kw')), 'KW'],
        [sequelize.fn('SUM', sequelize.col('issue_kw_1')), 'KW_1'],
        [sequelize.fn('SUM', sequelize.col('issue_kw_2')), 'KW_2'],
        [sequelize.fn('SUM', sequelize.col('issue_kn')), 'KN'],
        [sequelize.fn('SUM', sequelize.col('issue_dw')), 'DW'],
        [sequelize.fn('SUM', sequelize.col('issue_dw_1')), 'DW_1'],
        [sequelize.fn('SUM', sequelize.col('issue_dw_2')), 'DW_2'],
        [sequelize.fn('SUM', sequelize.col('issue_ow')), 'OW'],
        [sequelize.fn('SUM', sequelize.col('issue_ow_1')), 'OW_1'],
        [sequelize.fn('SUM', sequelize.col('issue_ow_2')), 'OW_2'],
        [sequelize.fn('SUM', sequelize.col('issue_jw')), 'JW'],
        [sequelize.fn('SUM', sequelize.col('issue_pw')), 'PW'],
        [sequelize.fn('SUM', sequelize.col('issue_row')), 'ROW'],
        [sequelize.fn('SUM', sequelize.col('issue_rej_1')), 'REJ_1'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_180')), 'LW3_180'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_210')), 'LW3_210'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_240')), 'LW3_240'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_280')), 'LW3_280'],
        [sequelize.fn('SUM', sequelize.col('issue_lw3_360')), 'LW3_360'],
        [sequelize.fn('SUM', sequelize.col('issue_lw2')), 'LW2'],
        [sequelize.fn('SUM', sequelize.col('issue_lw4')), 'LW4'],
        [sequelize.fn('SUM', sequelize.col('issue_lw5')), 'LW5'],
        [sequelize.fn('SUM', sequelize.col('issue_lw6')), 'LW6'],
        [sequelize.fn('SUM', sequelize.col('issue_lw7')), 'LW7'],
        [sequelize.fn('SUM', sequelize.col('issue_rej_3')), 'REJ_3'],
        [sequelize.fn('SUM', sequelize.col('issue_rej_4')), 'REJ_4'],
        [sequelize.fn('SUM', sequelize.col('issue_jb2')), 'JB2'],
        [sequelize.fn('SUM', sequelize.col('issue_sjb')), 'SJB'],
        [sequelize.fn('SUM', sequelize.col('issue_k_240')), 'K_240'],
        [sequelize.fn('SUM', sequelize.col('issue_k_280')), 'K_280'],
        [sequelize.fn('SUM', sequelize.col('issue_k_360')), 'K_360'],
        [sequelize.fn('SUM', sequelize.col('issue_pkw')), 'PKW'],
        [sequelize.fn('SUM', sequelize.col('issue_bw')), 'BW'],
        [sequelize.fn('SUM', sequelize.col('issue_rw')), 'RW'],
        [sequelize.fn('SUM', sequelize.col('issue_rrw')), 'RRW'],
        [sequelize.fn('SUM', sequelize.col('issue_fw')), 'FW'],
        [sequelize.fn('SUM', sequelize.col('issue_lw')), 'LW'],
      ],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2025-03-31', // From 31st March 2024
          [Op.lt]: '2026-04-01', // Up to 1st April 2025
        }
      },
      group: ['origin'],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(lwresults)

    const wholesresults = await WholesModel.findAll({
      attributes: [
        'origin',
        // Sum each issue field based on the new keys
        [sequelize.fn('SUM', sequelize.col('issue_pw_150')), 'PW_150'],
        [sequelize.fn('SUM', sequelize.col('issue_w_150')), 'W_150'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_150')), 'WW_150'],
        [sequelize.fn('SUM', sequelize.col('issue_s_150')), 'S_150'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_150')), 'AW_150'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_150')), 'LW_150'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_180')), 'PW_180'],
        [sequelize.fn('SUM', sequelize.col('issue_w_180')), 'W_180'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_180')), 'WW_180'],
        [sequelize.fn('SUM', sequelize.col('issue_s_180')), 'S_180'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_180')), 'AW_180'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_180')), 'LW_180'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_210')), 'PW_210'],
        [sequelize.fn('SUM', sequelize.col('issue_w_210')), 'W_210'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_210')), 'WW_210'],
        [sequelize.fn('SUM', sequelize.col('issue_s_210')), 'S_210'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_210')), 'AW_210'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_210')), 'LW_210'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_240')), 'PW_240'],
        [sequelize.fn('SUM', sequelize.col('issue_w_240')), 'W_240'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_240')), 'WW_240'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_240_A')), 'WW_240_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_240')), 'AW_240'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_240')), 'LW_240'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_280')), 'PW_280'],
        [sequelize.fn('SUM', sequelize.col('issue_w_280')), 'W_280'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_280')), 'WW_280'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_280_A')), 'WW_280_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_280')), 'AW_280'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_280')), 'LW_280'],
        [sequelize.fn('SUM', sequelize.col('wholes_double')), 'WHOLES_DOUBLE'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_320')), 'PW_320'],
        [sequelize.fn('SUM', sequelize.col('issue_w_320')), 'W_320'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_320')), 'WW_320'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_320_A')), 'WW_320_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_320')), 'AW_320'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_320')), 'LW_320'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_360')), 'PW_360'],
        [sequelize.fn('SUM', sequelize.col('issue_w_360')), 'W_360'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_360')), 'WW_360'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_360_A')), 'WW_360_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_360')), 'AW_360'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_360')), 'LW_360'],
        [sequelize.fn('SUM', sequelize.col('issue_pw_400')), 'PW_400'],
        [sequelize.fn('SUM', sequelize.col('issue_w_400')), 'W_400'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_400')), 'WW_400'],
        [sequelize.fn('SUM', sequelize.col('issue_ww_400_A')), 'WW_400_A'],
        [sequelize.fn('SUM', sequelize.col('issue_aw_400')), 'AW_400'],
        [sequelize.fn('SUM', sequelize.col('issue_lw_400')), 'LW_400'],
        [sequelize.fn('SUM', sequelize.col('issue_jjb')), 'JJB'],
        [sequelize.fn('SUM', sequelize.col('issue_jjb1')), 'JJB1'],
      ],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2025-03-31', // From 31st March 2024
          [Op.lt]: '2026-04-01', // Up to 1st April 2025
        }
      },
      group: ['origin'],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(wholesresults)

    const rejectionresults = await rejectionModel.findAll({
      attributes: [
        'origin',
        // Sum each issue field based on the new keys
        [sequelize.fn('SUM', sequelize.col('issue_packing')), 'Rejection']

      ],
      where: {
        Status: 1, editStatus: 'NA',
        date: {
          [Op.gte]: '2025-03-31', // From 31st March 2024
          [Op.lt]: '2026-04-01', // Up to 1st April 2025
        }
      },
      group: ['origin'],
      // raw: true, // Uncomment if you want raw results
    });
    //console.log(rejectionresults)

    const orderResults = await orderPrimaryModel.findAll({
      attributes: [
        'origin', 'gradeName',
        [sequelize.fn('sum', sequelize.col('quantity')), 'issueOrderQuantity'],
        [sequelize.fn('sum', sequelize.col('actualquantity')), 'consumeOrderQuantity'],
      ],
      where: {
        orderInvDate: {
          [Op.gte]: '2025-03-31', // From 31st March 2024
          [Op.lt]: '2026-04-01', // Up to 1st April 2025
        },
        [Op.or]: [{ editStatus: 'Accepted' }, { editStatus: 'N/A' },


        ]
      },
      group: ['origin', 'gradeName']
    });

    console.log(orderResults)

    // Iterate over the Order results and upsert into the stock table
    for (const orderResult of orderResults) {
      const { origin, gradeName, issueOrderQuantity, consumeOrderQuantity } = orderResult.dataValues;

      if (issueOrderQuantity !== null) {
        await orderStockGrade2526.upsert({
          origin,
          grade: gradeName,
          openquantity: issueOrderQuantity,
          thresoldopenquantity: 0,
          consumequantity: consumeOrderQuantity,
          thresoldconsumequantity: 0
        }, {
          // Add a condition here to ensure that `upsert` works correctly
          conflictFields: ['origin', 'grade'],  // This ensures it checks for these fields for conflict
        });
      }

    }




    // Iterate over the DPDS results and upsert into the stock table
    for (const dpdsresult of dpdsresults) {
      const { origin, ...dpdsissueFields } = dpdsresult.dataValues

      // Log dpds result to ensure it's correct
      //console.log('Processing DPDS Result:', dpdsresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(dpdsissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2526.upsert({
            origin,
            section: 'DPDS',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    // Iterate over the Sorting results and upsert into the stock table
    for (const sortingresult of sortingresults) {
      const { origin, ...sortingissueFields } = sortingresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Sorting Result:', sortingresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(sortingissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2526.upsert({
            origin,
            section: 'Sorting',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    // Iterate over the BigTaiho results and upsert into the stock table
    for (const bigTaihoresult of bigTaihoresults) {
      const { origin, ...bigTaihoissueFields } = bigTaihoresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing BigTaiho Result:', bigTaihoresult);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(bigTaihoissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2526.upsert({
            origin,
            section: 'BigTaiho',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
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
          await productionStockGrade2526.upsert({
            origin,
            section: 'LW',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    // Iterate over the Wholes results and upsert into the stock table
    for (const wholesresult of wholesresults) {
      const { origin, ...WholesissueFields } = wholesresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Wholes Result:', wholesresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(WholesissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2526.upsert({
            origin,
            section: 'Wholes',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    // Iterate over the Rejection results and upsert into the stock table
    for (const rejectionresult of rejectionresults) {
      const { origin, ...RejectionissueFields } = rejectionresult.dataValues;

      // Log sorting result to ensure it's correct
      //console.log('Processing Rejection Result:', rejectionresults);

      // For each issue field, create a new record in the stock table
      for (const [gradename, issuequantity] of Object.entries(RejectionissueFields)) {
        if (issuequantity !== null) {
          await productionStockGrade2526.upsert({
            origin,
            section: 'Rejection',
            grade: gradename,
            openquantity: issuequantity,
            thresoldopenquantity: 0,
          }, {
            // Add a condition here to ensure that `upsert` works correctly
            conflictFields: ['section', 'origin', 'grade'],  // This ensures it checks for these fields for conflict
          });
        }
      }
    }

    console.log('2025-2026 Stock update completed successfully');


  } catch (error) {
    console.error('Error updating stock data:', error);
  }
};


// Schedule the job to run at 6 PM and 12 AM
cron.schedule('0 18,0 * * *', () => {
  console.log('Running scheduled stock update job...');
  if(CY_FY==='2024-25'){
    updateProductionGradeStock2425();
  }
  else if(CY_FY==='2025-26'){
    updateProductionGradeStock2526();
  }
  else{
    console.log('FY Not Found or Other Error Occured...')
  }

});

export { updateProductionGradeStock2425 ,updateProductionGradeStock2526};
