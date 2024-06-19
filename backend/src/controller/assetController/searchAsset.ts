import { Request, Response } from "express";
import Asset from "../../model/assetModel";
import { Op } from "sequelize";

const SearchAsset = async (req: Request, res: Response) => {
    try {
        const { assetidname, section} = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;

        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (assetidname) {
            whereClause.push({
                [Op.or]: [
                    { machineID: { [Op.like]: `%${assetidname}%` } },
                    { machineName: { [Op.like]: `%${assetidname}%` } }
                ]
            });
        }

   

        if (section) {
            whereClause.push({
                section: {
                    [Op.like]: `%${section}%`
                }
            });
        }

        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let assetEntries
        if(limit===0 && offset===0){
            assetEntries = await Asset.findAll({
                where,
                order: [['section','ASC'],['machineID','ASC'],['createdAt', 'DESC']], // Order by date descending
                
            });
        }
        else{
            assetEntries = await Asset.findAll({
                where,
                order: [['section','ASC'],['machineID','ASC'],['createdAt', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset,
              
            });
        }
       
        return res.status(200).json({ msg: 'Asset Entries found', assetEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal Server error', error: err })
    }
}
export default SearchAsset