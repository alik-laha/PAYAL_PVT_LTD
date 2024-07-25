import { Request, Response } from "express";
import PackageMaterial from "../../model/recevingPackagingMaterialModel";
import { Op } from "sequelize";

const viewReceivingPackageMetrial = async (req: Request, res: Response) => {
    try {
        const { fromdate, todate, searchdata } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;

        let where;
        if (!searchdata && !fromdate && !todate) {
            where = {}
        }
        if (searchdata && fromdate && todate) {
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
                    }
                ]
            }
        }
        if (searchdata && !fromdate && !todate) {
            where = {
                [Op.or]: [
                    { sku: { [Op.like]: `%${searchdata}%` } },
                    { vendorName: { [Op.like]: `%${searchdata}%` } },
                ]
            }
        }
        if (!searchdata && fromdate && todate) {
            where = {
                recevingDate: {
                    [Op.between]: [fromdate, todate]
                }
            }
        }
        let PackageMaterials;
        if (page === 0 && size === 0) {
            PackageMaterials = await PackageMaterial.findAll({
                where,
                order: [['createdAt', 'DESC']], // Order by date descending
            });
            if (PackageMaterials.length === 0) {
                return res.status(200).json({ msg: 'Package Material found', PackageMaterials })
            }
            return res.status(200).json({ msg: 'Package Material found', PackageMaterials })
        }
        else {
            PackageMaterials = await PackageMaterial.findAll({
                where,
                order: [['createdAt', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
            if (PackageMaterials.length === 0) {
                return res.status(200).json({ msg: 'Package Material found', PackageMaterials })
            }
            return res.status(200).json({ msg: 'Package Material found', PackageMaterials })
        }

    } catch (error) {
        return res.status(500).json({ message: "internal error while finding sku data" });
    }
}
export default viewReceivingPackageMetrial;