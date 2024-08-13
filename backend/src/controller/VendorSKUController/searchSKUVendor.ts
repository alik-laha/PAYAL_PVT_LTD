import { Request, Response } from "express";

import { Op } from "sequelize";
import SkuModel from "../../model/SkuModel";
import VendorName from "../../model/vendorNameModel";

const SearchSKUVendor = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { item,section, type } = req.body;
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
        if (item) {
            if (type == 'SKU') {
                whereClause.push({
                        sku: { [Op.like]: `%${item}%` } 
                })
            }
            else{
                whereClause.push({
                    vendorName: {
                        [Op.like]:  `%${item}%`
                    }
                });

            }
           

        }
        if (section) {
            whereClause.push({
                section
            })
        }
       


        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let GradingEntries;
        if (limit === 0 && offset === 0) {

            if (type == 'SKU') {
                GradingEntries = await SkuModel.findAll({
                    where,
                    order: [['section', 'ASC'],['type', 'ASC'],['sku', 'ASC']], // Order by sku ascending

                });

            } else {
                GradingEntries = await VendorName.findAll({
                    where,
                    order: [['section', 'ASC'],['type', 'ASC'],['vendorName', 'ASC']] // Order by vendorname ascending

                });

            }

        }
        else {
            if (type == 'SKU') {
                GradingEntries = await SkuModel.findAll({
                    where,
                    order: [['sku', 'ASC']], // Order by sku ascending
                    limit,
                    offset
                });
            }
            else {
                GradingEntries = await VendorName.findAll({
                    where,
                    order: [['vendorName', 'ASC']] ,// Order by vendorname ascending
                    limit,
                    offset
                });

            }

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export default SearchSKUVendor;