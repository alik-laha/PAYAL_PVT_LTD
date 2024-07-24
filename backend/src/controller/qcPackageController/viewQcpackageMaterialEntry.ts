import { Request, Response } from "express";
import { Op } from "sequelize";
import recevingPackageMaterial from "../../model/recevingPackagingMaterialModel"
import QualityPackageMaterial from "../../model/qualityPacjkageMaterial";


const ViewQcPackageMaterial = async (req: Request, res: Response) => {
    try {
        const { qualityStatus, searchData, fromDate, toDate } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = [];
        if (searchData) {
            whereClause.push({
                [Op.or]: [
                    { vendorName: { [Op.like]: `%${searchData}%` } },
                    { sku: { [Op.like]: `%${searchData}%` } }
                ]
            });
        }
        if (qualityStatus) {
            whereClause.push({
                qualityStatus: {
                    [Op.like]: `%${qualityStatus}%`
                }
            })
        }
        if (fromDate && toDate) {
            whereClause.push({
                [Op.or]: [
                    {
                        recevingDate: {
                            [Op.between]: [fromDate, toDate]
                        }
                    },
                    {
                        testingDate: {
                            [Op.between]: [fromDate, toDate]
                        }
                    }
                ]
            })
        }
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if (limit === 0 && offset === 0) {
            if (qualityStatus) {
                rcnEntries = await QualityPackageMaterial.findAll({
                    where,
                    order: [['testingDate', 'DESC']], // Order by date descending
                    include: [{
                        model: recevingPackageMaterial,
                        required: true,
                        where: {
                            [Op.and]: [
                                { qualityStatus: { [Op.like]: false } },
                                { editStatus: { [Op.notLike]: `Pending` } }
                            ]
                        }
                    }]

                });


            }
            else {
                rcnEntries = await QualityPackageMaterial.findAll({
                    where,
                    order: [['createdAt', 'DESC']], // Order by date descending
                    // include: [{
                    //     model: recevingPackageMaterial,
                    //     required: true, // this is optional since 'required: false' is the default behavior for LEFT JOIN
                    //     where: {
                    //         [Op.and]: [
                    //             { qualityStatus: { [Op.notLike]: false } },
                    //             { editStatus: { [Op.notLike]: `Pending` } }
                    //         ]
                    //     }
                    // }]
                    include: [{
                        model: recevingPackageMaterial,
                    }]

                });


            }

        }
        else {
            rcnEntries = await QualityPackageMaterial.findAll({
                where,
                order: [['testingDate', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset,
                include: [{
                    model: recevingPackageMaterial,
                    required: true, // this is optional since 'required: false' is the default behavior for LEFT JOIN
                    where: {
                        editStatus: {
                            [Op.notLike]: `%Pending%`
                        }
                    }
                }]
            });


        }
        const CountPendingEdit = await QualityPackageMaterial.count();

        return res.status(200).json({ msg: 'Rcn Entry found', rcnEntries, CountPendingEdit })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "error while view", err })

    }
}
export default ViewQcPackageMaterial