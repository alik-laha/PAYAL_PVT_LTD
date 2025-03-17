import cron from 'node-cron';
import sequelize from '../config/databaseConfig';
import DPDS from '../model/dpdsmodel';
import productionStockGrade from '../model/productionStockgrade';
import SortingModel from '../model/sortingModel';


// Function to fetch and update stock quantities
const updateProductionGradeStock = async () => {
    try {
      // Fetch sum of all issue fields grouped by origin
      const dpdsresults = await DPDS.findAll({
        attributes: [
          'origin',
          // SUM each issue field and alias the result properly
          [sequelize.fn('SUM', sequelize.col('issue_m_ds')),'issue_m_ds'],
          [sequelize.fn('SUM', sequelize.col('issue_m_dp')),'issue_m_dp'],
          [sequelize.fn('SUM', sequelize.col('issue_k_dp')),'issue_k_dp'],
          [sequelize.fn('SUM', sequelize.col('issue_ds_1')),'issue_ds_1'],
          [sequelize.fn('SUM', sequelize.col('issue_ds_2')),'issue_ds_2'],
          [sequelize.fn('SUM', sequelize.col('issue_sp_2')),'issue_sp_2'],
          [sequelize.fn('SUM', sequelize.col('issue_yjh')),'issue_yjh'],
          [sequelize.fn('SUM', sequelize.col('issue_yk')),'issue_yk'],
          [sequelize.fn('SUM', sequelize.col('issue_kp')),'issue_kp'],
          [sequelize.fn('SUM', sequelize.col('issue_wp')),'issue_wp'],
          [sequelize.fn('SUM', sequelize.col('issue_rs')),'issue_rs'],
          [sequelize.fn('SUM', sequelize.col('issue_dp_2')),'issue_dp_2'],
          [sequelize.fn('SUM', sequelize.col('issue_dp_3')),'issue_dp_3'],
          [sequelize.fn('SUM', sequelize.col('issue_dp_4')),'issue_dp_4'],
          [sequelize.fn('SUM', sequelize.col('issue_dp_3l')),'issue_dp_3l'],
          [sequelize.fn('SUM', sequelize.col('issue_ss')),'issue_ss'],
          [sequelize.fn('SUM', sequelize.col('issue_os')),'issue_os'],
          [sequelize.fn('SUM', sequelize.col('issue_os1')),'issue_os1']
        ],
        where: { Status: 1,editStatus:'NA' },
        group: ['origin'],
       // raw: true,
      });

      //console.log(dpdsresults)

      const sortingresults = await SortingModel.findAll({
        attributes: [
          'origin',
          // SUM each issue field and alias the result properly
          [sequelize.fn('SUM', sequelize.col('issue_jjh')),'issue_jjh'],
          [sequelize.fn('SUM', sequelize.col('issue_jjh1')),'issue_jjh1'],
          [sequelize.fn('SUM', sequelize.col('issue_sjh')),'issue_sjh'],
          [sequelize.fn('SUM', sequelize.col('issue_jk')),'issue_jk'],
          [sequelize.fn('SUM', sequelize.col('issue_jk1')),'issue_jk1'],
          [sequelize.fn('SUM', sequelize.col('issue_k')),'issue_k'],
          [sequelize.fn('SUM', sequelize.col('issue_k1')),'issue_k1'],
          [sequelize.fn('SUM', sequelize.col('issue_lwp1')),'issue_lwp1'],
          [sequelize.fn('SUM', sequelize.col('issue_lwp')),'issue_lwp'],
          [sequelize.fn('SUM', sequelize.col('issue_s')),'issue_s'],
          [sequelize.fn('SUM', sequelize.col('issue_ss')),'issue_ss'],
          [sequelize.fn('SUM', sequelize.col('issue_yk')),'issue_yk'],
          [sequelize.fn('SUM', sequelize.col('issue_sp2')),'issue_sp2'],
          [sequelize.fn('SUM', sequelize.col('issue_kp')),'issue_kp']
        ],
        group: ['origin'],
        where: { Status: 1,editStatus:'NA' },
        //raw: true,
      });

      //console.log(sortingresults)
  
      // Iterate over the DPDS results and upsert into the stock table
    for (const dpdsresult of dpdsresults) {
        const { origin, ...dpdsissueFields } = dpdsresult.dataValues
  
        // Log dpds result to ensure it's correct
        console.log('Processing DPDS Result:', dpdsresult);
  
        // For each issue field, create a new record in the stock table
        for (const [gradename, issuequantity] of Object.entries(dpdsissueFields)) {
          if (issuequantity !== null) {
            await productionStockGrade.upsert({
              origin,
              section: 'DPDS',
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: 0,
            });
          }
        }
      }
  
      // Iterate over the Sorting results and upsert into the stock table
      for (const sortingresult of sortingresults) {
        const { origin, ...sortingissueFields } = sortingresult.dataValues;
  
        // Log sorting result to ensure it's correct
        console.log('Processing Sorting Result:', sortingresult);
  
        // For each issue field, create a new record in the stock table
        for (const [gradename, issuequantity] of Object.entries(sortingissueFields)) {
          if (issuequantity !== null) {
            await productionStockGrade.upsert({
              origin,
              section: 'Sorting',
              grade: gradename,
              openquantity: issuequantity,
              thresoldopenquantity: 0,
            });
          }
        }
      }
  
      console.log('Stock update completed successfully');





    } catch (error) {
        console.error('Error updating stock data:', error);
    }
};


// Schedule the job to run at 6 PM and 12 AM
cron.schedule('0 18,0 * * *', () => {
    console.log('Running scheduled stock update job...');
    updateProductionGradeStock();
});

export { updateProductionGradeStock };