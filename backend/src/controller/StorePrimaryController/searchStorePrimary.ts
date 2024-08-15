import { Request, Response } from "express";

import { Op } from "sequelize";

import storePrimaryModel from "../../model/storePrimaryModel";

const SearchStorePrimary = async (req: Request, res: Response) => {
    try {
        const { fromdate, todate, searchdata,gatepassSearch } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let where;
        if (!searchdata && !fromdate && !todate && !gatepassSearch) {
            where = {
                status:{[Op.eq]:1}
            }
        }
        if (searchdata && fromdate && todate && gatepassSearch) {
            where = {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { sku: { [Op.like]: `%${searchdata}%` } },
                            { vendorName: { [Op.like]: `%${searchdata}%` } },
                            
                        ]
                    },
                    {
                        recevingDate: {
                            [Op.between]: [fromdate, todate]
                        }
                    },
                    {
                        gatePassNo:{[Op.like]:`%${gatepassSearch}%`}
                    },
                    
                    {
                        status:{[Op.eq]:1}
                    }
                  

                    
                ]
            }
        }
        if (searchdata && !fromdate && !todate && !gatepassSearch) {
            where = {
                
                [Op.or]: [
                    { sku: { [Op.like]: `%${searchdata}%` } },
                    { vendorName: { [Op.like]: `%${searchdata}%` } },
                ],status:{
                    [Op.eq]: 1
                }
            }
        }
        if (!searchdata && fromdate && todate && !gatepassSearch) {
            where = {
                recevingDate: {
                    [Op.between]: [fromdate, todate]
                },status:{
                    [Op.eq]: 1
                }
            }
        }
        if (!searchdata && !fromdate && !todate && gatepassSearch) {
            where = {
                
                    gatePassNo:{[Op.like]:`%${gatepassSearch}%`}
              
                ,status:{
                    [Op.eq]: 1
                }
            }
        }
        if (searchdata && fromdate && todate && !gatepassSearch) {
            where =  where = {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { sku: { [Op.like]: `%${searchdata}%` } },
                            { vendorName: { [Op.like]: `%${searchdata}%` } },
                            
                        ]
                    },
                    {
                        recevingDate: {
                            [Op.between]: [fromdate, todate]
                        }
                    },
                    
                    {
                        status:{[Op.eq]:1}
                    }
                  

                    
                ]
            }
        }
        let PackageMaterials;
        if (page === 0 && size === 0) {
            PackageMaterials = await storePrimaryModel.findAll({
                where,
                order: [['gatePassNo', 'DESC'],['recevingDate', 'DESC']]
                 // Order by date descending
            });
            if (PackageMaterials.length === 0) {
                return res.status(200).json({ msg: 'Store Material found', PackageMaterials })
            }
            return res.status(200).json({ msg: 'Store Material found', PackageMaterials })
        }
        else {
            PackageMaterials = await storePrimaryModel.findAll({
                where,
                order: [['gatePassNo', 'DESC'],['recevingDate', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
            if (PackageMaterials.length === 0) {
                return res.status(200).json({ msg: 'Store Material found', PackageMaterials })
            }
            return res.status(200).json({ msg: 'Store Material found', PackageMaterials })
        }

    } catch (error) {
        return res.status(500).json({ message: "internal error while finding sku data" });
    }
}
export default SearchStorePrimary;