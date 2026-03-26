import { Request, Response } from "express";
import sequelize from "../../config/databaseConfig";

import RcvVillageInModel from "../../model/RcvVillageInModel";
import VendorName from "../../model/vendorNameModel";
import { Op, Sequelize } from "sequelize";
import RcvVillageInEditModel from "../../model/RcvVillageInEditModel";
import { VillageInRcvData, vlotNoData } from "../../type/type";
//import WhatsappMsg from "../../helper/WhatsappMsg";
import VLotNo from "../../model/vlotNomodel";
import VLotDetails from "../../model/vLotDetailsModel";
import RcnPeeling from "../../model/peelingModel";

export const getUnEntriedRcvVillageIn = async (req: Request, res: Response) => {

    try {
        const status = req.params.status;
        const rcnLot = await RcvVillageInModel.findAll({

            attributes: [[sequelize.fn('DISTINCT', sequelize.col('gatePassNo')), 'gatePassNo']],
            where: {
                status: status
            }

        });
        if (rcnLot) {
            res.status(200).json({ message: "UnEntried Village In Primary Items Found", rcnLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding UnEntried Village In Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const getRcvVillageInbyGatePass = async (req: Request, res: Response) => {

    try {
        const lotNO = req.params.lotNO
        const rcnmainLot = await RcvVillageInModel.findAll({
            where: {
                gatePassNo: lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if (rcnmainLot) {
            res.status(200).json({ message: "UnEntried Village In Entry", rcnmainLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding UnEntried Village In Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const getRcvVillageInbyDate = async (req: Request, res: Response) => {

    try {
        const lotNO = req.params.lotNO
        const rcnmainLot = await RcvVillageInModel.findAll({
            where: {
                recevingDate: lotNO
            }, order: [['id', 'ASC']]

        }
        );
        if (rcnmainLot) {
            res.status(200).json({ message: "UnEntried Village In Entry", rcnmainLot });
        }
        else {
            res.status(500).json({ message: "Error in Finding UnEntried Village In Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const updateRcvVillageIn = async (req: Request, res: Response) => {
    try {
        const { gateType, sku, vendorN, quantity, invoice, type, remarks, totalWt,
            origin,
            wholes,
            wholesprcntg,
            lw,
            lwprcntg,
            jb,
            jbprcntg,
            jbp,
            jbpprcntg,
            sdp,
            sdpprcntg,
            husk,
            huskprcntg,
            piece,
            pieceprcntg,
            dp,
            dpprcntg,
            unpeel,
            unpeelprcntg
        } = req.body.data;
        let vendortype: string
        if (gateType === 'IN') {
            vendortype = 'Vendor'
        }
        else {
            vendortype = 'Party'
        }
        const id = req.params.id;
        const createdBy = req.cookies.user;

        let vendorData = await VendorName.findOne({ where: { vendorName: vendorN, type: vendortype, section: 'Village' } });
        if (!vendorData) {
            return res.status(500).json({ message: "Vendor Does Not Exist" });
        }
        else {
            if (Number(parseFloat(totalWt).toFixed(2)) !== Number((
                    parseFloat(wholes) +
                    parseFloat(piece) +
                    parseFloat(lw) +
                    parseFloat(dp) +
                    parseFloat(jb) +
                    parseFloat(jbp) +
                    parseFloat(sdp) +
                    parseFloat(husk) +
                    parseFloat(unpeel)
                ).toFixed(2))){
                res.status(500).json({ message: "Backlog should be Always 0 for a Row Item" });
            }
            else {
                const newPackageMaterial = await RcvVillageInModel.update({

                    sku, invoice, type,
                    vendorName: vendorN,
                    quantity, origin,
                    remarks, totalWt,
                    wholes_quantity: wholes,
                    wholes_prcntg: wholesprcntg,
                    pieces_quantity: piece,
                    pieces_prcntg: pieceprcntg,
                    lw_quantity: lw,
                    lw_prcntg: lwprcntg,
                    dp_quantity: dp,
                    dp_prcntg: dpprcntg,
                    jb_quantity: jb,
                    jb_prcntg: jbprcntg,
                    jbp_quantity: jbp,
                    jbp_prcntg: jbpprcntg,
                    sdp_quantity: sdp,
                    sdp_prcntg: sdpprcntg,
                    husk_quantity: husk,
                    husk_prcntg: huskprcntg,
                    e1_quantity: unpeel,
                    e1_prcntg: unpeelprcntg,
                    createdBy, status: 1
                }, {
                    where: {
                        id: id
                    }
                });
                if (newPackageMaterial) {
                    return res.status(201).json({ message: "Village material Received successfully", newPackageMaterial });
                }
                else {
                    return res.status(500).json({ message: "internal error while creating Village Entry" });
                }
            }

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal error while creating Village Entry" });

    }
}

export const updateRcvVillageInEntire = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        // console.log(req.body)
        const createdBy = req.cookies.user;
        const formData = req.body.formData
        const firstrow = formData[0]
        const { sku, vendorN, quantity, invoice, type, remarks, totalWt, origin,
            wholes,
            wholesprcntg,
            lw,
            lwprcntg,
            jb,
            jbprcntg,
            jbp,
            jbpprcntg,
            sdp,
            sdpprcntg,
            husk,
            huskprcntg,
            piece,
            pieceprcntg, unpeel, unpeelprcntg,
            dp,
            dpprcntg } = firstrow;
        let vendorData = await VendorName.findOne({ where: { vendorName: vendorN, type: 'Vendor', section: 'Village' } });
        if (!vendorData) {
            return res.status(500).json({ message: "Vendor Does Not Exist" });
        }
        else {
            await RcvVillageInModel.sequelize?.transaction(async (transaction) => {
                if (Number(parseFloat(totalWt).toFixed(2)) !== Number((
                    parseFloat(wholes) +
                    parseFloat(piece) +
                    parseFloat(lw) +
                    parseFloat(dp) +
                    parseFloat(jb) +
                    parseFloat(jbp) +
                    parseFloat(sdp) +
                    parseFloat(husk) +
                    parseFloat(unpeel)
                ).toFixed(2))) {

                    res.status(500).json({ message: "Backlog should be Always 0 for a Row Item" });
                    throw new Error('Transaction Aborted due to non 0 backlog value')

                }
                const newPackageMaterial = await RcvVillageInModel.update({
                    sku, invoice, type,
                    vendorName: vendorN,
                    quantity, origin,
                    wholes_quantity: wholes,
                    wholes_prcntg: wholesprcntg,
                    pieces_quantity: piece,
                    pieces_prcntg: pieceprcntg,
                    lw_quantity: lw,
                    lw_prcntg: lwprcntg,
                    dp_quantity: dp,
                    dp_prcntg: dpprcntg,
                    jb_quantity: jb,
                    jb_prcntg: jbprcntg,
                    jbp_quantity: jbp,
                    jbp_prcntg: jbpprcntg,
                    sdp_quantity: sdp,
                    sdp_prcntg: sdpprcntg,
                    husk_quantity: husk,
                    husk_prcntg: huskprcntg,
                    e1_quantity: unpeel,
                    e1_prcntg: unpeelprcntg,
                    remarks, totalWt,
                    createdBy, status: 1
                }, {
                    where: {
                        id: id
                    }, transaction
                });
                if (newPackageMaterial) {
                    const dataToUpdate = formData.slice(1)
                    for (let data of dataToUpdate) {
                        console.log(data)
                        let vendorData = await VendorName.findOne({ where: { vendorName: data.vendorN, type: 'Vendor', section: 'Village' } });
                        if (!vendorData) {
                            res.status(500).json({ message: "Vendor Does Not Exist" });
                            throw new Error('Transaction Aborted')
                        }

                        if (Number(parseFloat(data.totalWt).toFixed(2)) !== Number((
                            parseFloat(data.wholes) +
                            parseFloat(data.piece) +
                            parseFloat(data.lw) +
                            parseFloat(data.dp) +
                            parseFloat(data.jb) +
                            parseFloat(data.jbp) +
                            parseFloat(data.sdp) +
                            parseFloat(data.husk) +
                            parseFloat(data.unpeel)
                        ).toFixed(2))) {
                        
                            res.status(500).json({ message: "Backlog should be Always 0 for a Row Item" });
                            throw new Error('Transaction Aborted due to non 0 backlog value')

                        }
                        await RcvVillageInModel.create({
                            gatePassNo: data.GatePassNo, grossWt: data.GrossWt, truckNo: data.TruckNo,
                            recevingDate: data.recevingDate,
                            sku: data.sku, invoice: data.invoice,
                            vendorName: data.vendorN, type: data.type,
                            quantity: data.quantity,
                            wholes_quantity: data.wholes, origin: data.origin,
                            wholes_prcntg: data.wholesprcntg,
                            pieces_quantity: data.piece,
                            pieces_prcntg: data.pieceprcntg,
                            lw_quantity: data.lw,
                            lw_prcntg: data.lwprcntg,
                            dp_quantity: data.dp,
                            dp_prcntg: data.dpprcntg,
                            jb_quantity: data.jb,
                            jb_prcntg: data.jbprcntg,
                            jbp_quantity: data.jbp,
                            jbp_prcntg: data.jbpprcntg,
                            sdp_quantity: data.sdp,
                            sdp_prcntg: data.sdpprcntg,
                            husk_quantity: data.husk,
                            husk_prcntg: data.huskprcntg,
                            e1_quantity: data.unpeel,
                            e1_prcntg: data.unpeelprcntg,
                            remarks: data.remarks, totalWt: data.totalWt,
                            createdBy, status: 1, gateType: data.gateType
                        }, { transaction })
                    }
                    return res.status(201).json({ message: "Village Item received successfully" });
                }
                else {
                    return res.status(500).json({ message: "internal error while creating Village Receive Entry" });
                }


            })
        }



    } catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "internal error while creating Village Entry", error });
        }


    }
}

export const deleteVillageInPrimary = async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const gatepass = req.body.gatepass
        await RcvVillageInModel.update(
            {
                sku: null,
                invoice: null,
                vendorName: null,
                quantity: null,
                origin: null,
                type: null,
                wholes_prcntg: null,
                pieces_quantity: null,
                pieces_prcntg: null,
                lw_quantity: null,
                lw_prcntg: null,
                dp_quantity: null,
                dp_prcntg: null,
                jb_quantity: null,
                jb_prcntg: null,
                sdp_quantity: null,
                sdp_prcntg: null,
                husk_quantity: null,
                husk_prcntg: null,
                createdBy: null,
                status: 0, remarks: null, totalWt: null

            },
            {
                where: {
                    id: id
                },
            }
        );


        await RcvVillageInModel.destroy({
            where: {
                gatePassNo: gatepass,
                id: { [Op.notLike]: id }

            }
        });
        return res.status(200).json({ message: "Village Item Entry Is deleted successfully" })
    }

    catch {
        return res.status(500).json({ message: "Internal Server Error" })
    }


}

export const searchRcvVillageIn = async (req: Request, res: Response) => {
    try {
        const { searchitem, gatetype, fromDate, toDate, almondtype, almondgrade, origin } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;

        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                [Op.or]: [
                    { gatePassNo: { [Op.like]: `%${searchitem}%` } },
                    { invoice: { [Op.like]: `%${searchitem}%` } }
                ]
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                recevingDate: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }

        if (almondtype) {
            whereClause.push({
                type: almondtype
            });
        }
        if (almondgrade) {
            whereClause.push({
                sku: {
                    [Op.like]: `%${almondgrade}%`
                }
            });
        }
        if (gatetype) {
            whereClause.push({
                gateType: {
                    [Op.like]: `%${gatetype}%`
                }
            });
        }
        if (origin) {
            whereClause.push({
                origin: {
                    [Op.like]: `%${origin}%`
                }
            });
        }
        whereClause.push({
            status: {
                [Op.eq]: 1
            }
        });

        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if (limit === 0 && offset === 0) {
            rcnEntries = await RcvVillageInModel.findAll({
                where,
                order: [['gatePassNo', 'DESC'], ['recevingDate', 'DESC']], // Order by date descending

            });
        }
        else {
            rcnEntries = await RcvVillageInModel.findAll({
                where,
                order: [['gatePassNo', 'DESC'], ['recevingDate', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }

        return res.status(200).json({ msg: 'Rcv Village Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }

}
export const searchVLOTDetails = async (req: Request, res: Response) => {
    try {
        const { searchitem, fromDate, toDate, origin } = req.body;
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;

        const offset = (page - 1) * size;
        const limit = size;

        let whereClause = [];

        // Conditionally add parameters to the whereClause
        if (searchitem) {
            whereClause.push({
                vlotNo: {
                    [Op.like]: `%${searchitem}%`
                }
            });
        }

        if (fromDate && toDate) {
            whereClause.push({
                recevingDate: {
                    [Op.between]: [fromDate, toDate]
                }
            });
        }

        if (origin) {
            whereClause.push({
                origin: {
                    [Op.like]: `%${origin}%`
                }
            });
        }





        // Convert the array to an object for the where condition
        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
        let rcnEntries
        if (limit === 0 && offset === 0) {
            rcnEntries = await VLotDetails.findAll({
                where,
                order: [['recevingDate', 'DESC']], // Order by date descending

            });
        }
        else {
            rcnEntries = await VLotDetails.findAll({
                where,
                order: [['recevingDate', 'DESC']], // Order by date descending
                limit: limit,
                offset: offset
            });
        }

        return res.status(200).json({ msg: 'VLOT Details Entry found', rcnEntries })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: 'Internal server error', error: err })
    }

}

export const sumofRcvVillageInPrimary = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        let Year = today.getFullYear()

        const compareDate = new Date(`${Year}-04-01`);
        compareDate.setHours(0, 0, 0, 0)
        let targetDate
        if (today < compareDate) {
            targetDate = new Date(`${Year - 1}-04-01`);
        }
        else {
            targetDate = new Date(`${Year}-04-01`);
        }


        targetDate.setHours(0, 0, 0, 0)
        if (today.getHours() < 5 || (today.getHours() === 5 && today.getMinutes() <= 30)) {
            today.setHours(today.getHours() + 5);
            today.setMinutes(today.getMinutes() + 30);
        }
        const sumofRcvVillageInPrimary = await RcvVillageInModel.count({
            where: {
                recevingDate: {
                    [Op.between]: [targetDate, today]
                }
                , editStatus: {
                    [Op.notLike]: 'Pending'
                }, status: 1
            }, distinct: true, col: 'gatePassNo'
        });

        const RcvVillageInPrimary = await RcvVillageInEditModel.count();
        return res.status(200).json({ sumofRcvVillageInPrimary, RcvVillageInPrimary });
    }
    catch (err) {
        console.log(err)
    }
}

export const getEditRcvVillageInPrimary = async (req: Request, res: Response) => {
    try {
        const editPackageMaterial = await RcvVillageInEditModel.findAll({
            order: [['recevingDate', 'DESC']]
        });
        if (!editPackageMaterial) {
            return res.status(200).send({ message: "No pending edit Available" });
        }
        return res.status(200).send(editPackageMaterial);
    }
    catch (err) {
        console.log(err);
    }
}

export const editRcvVillageIn = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const createdBynew = req.cookies.user
        const { grossWt, gateType, recevingDate,
            truck, gatepass, invoice, origin,
            wholes, wholesprcntg, lw, lwprcntg, jb, jbprcntg, jbp, jbpprcntg, sdp, sdpprcntg, husk, huskprcntg, piece, pieceprcntg, dp, dpprcntg,
            itemtype, itemname, VendorN,
            quantity, totalWt, remarks, unpeel, unpeelprcntg } = req.body;
        if (!id) return res.status(400).json({ message: "id is required" });
        let vendortype: string
        if (gateType === 'IN') {
            vendortype = 'Vendor'
        }
        else {
            vendortype = 'Party'
        }
        //let skuData = await SkuModel.findOne({ where: { sku ,type,section:'Store'} });
        let vendorData = await VendorName.findOne({ where: { vendorName: VendorN, type: vendortype, section: 'Village' } });
        // if(!skuData || !vendorData){
        //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
        // }
        if (!vendorData) {
            return res.status(500).json({ message: "Vendor Does Not Exist" });
        }


        const packageMaterialData: VillageInRcvData = await RcvVillageInModel.findOne({ where: { id } }) as unknown as VillageInRcvData;
        if (!packageMaterialData) return res.status(404).json({ message: "Village material not found" });
        let netwt = req.body.netwt
        if (netwt === '' || netwt === null) {
            netwt = 0
        }
        console.log(req.body)
        const editPackageMaterial = await RcvVillageInEditModel.create({
            id: packageMaterialData.id,
            gateType: gateType,
            truckNo: truck,
            gatePassNo: gatepass,
            grossWt: grossWt,
            netWeight: netwt,
            recevingDate: recevingDate,
            sku: itemname,
            vendorName: VendorN,
            type: itemtype,
            quantity: quantity,
            status: 1,
            invoice: invoice,
            createdBy: createdBynew,
            editStatus: "Pending",
            totalWt: totalWt,
            remarks: remarks,
            origin,
            wholes_quantity: wholes,
            wholes_prcntg: wholesprcntg,
            pieces_quantity: piece,
            pieces_prcntg: pieceprcntg,
            lw_quantity: lw,
            lw_prcntg: lwprcntg,
            dp_quantity: dp,
            dp_prcntg: dpprcntg,
            jb_quantity: jb,
            jb_prcntg: jbprcntg,
            jbp_quantity: jbp,
            jbp_prcntg: jbpprcntg,
            sdp_quantity: sdp,
            sdp_prcntg: sdpprcntg,
            husk_quantity: husk,
            husk_prcntg: huskprcntg,
            e1_quantity: unpeel,
            e1_prcntg: unpeelprcntg,


        });

        if (!editPackageMaterial) return res.status(500).json({ message: "Error In Editing Village material" });
        const updatePackageMaterial = await RcvVillageInModel.update({ editStatus: "Pending" }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "Error In Editing Village material" });
        //const data = await WhatsappMsg("Village Primary Rcv/Dispatch", createdBynew, "modify_request", "Production")
        //console.log(data)
        return res.status(201).json({ message: "Village material edited successfully" });





    }
    catch (err) {
        console.log(err);
    }
}

export const approveEditRcvVillageIn = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const editPackageMaterial: VillageInRcvData = await RcvVillageInEditModel.findOne({ where: { id } }) as unknown as VillageInRcvData;
        if (!editPackageMaterial) return res.status(404).json({ message: "edit Village material not found" });

        // const vendor = await VendorName.findOne({ where: { vendorName:editPackageMaterial.vendorName } });
        // if (!vendor) {
        //     VendorName.create({ vendorName:editPackageMaterial.vendorName, createdBy: editPackageMaterial.createdBy });
        // }
        // const skuData = await SkuModel.findOne({ where: { sku:editPackageMaterial.sku } });
        // if (!skuData) {
        //     SkuModel.create({ sku:editPackageMaterial.sku, unit:editPackageMaterial.unit,createdBy: editPackageMaterial.createdBy });
        // }


        const updatePackageMaterial = await RcvVillageInModel.update({

            sku: editPackageMaterial.sku,
            vendorName: editPackageMaterial.vendorName,
            quantity: editPackageMaterial.quantity,
            remarks: editPackageMaterial.remarks,
            totalWt: editPackageMaterial.totalWt,
            invoice: editPackageMaterial.invoice,
            type: editPackageMaterial.type,
            origin: editPackageMaterial.origin,
            wholes_quantity: editPackageMaterial.wholes_quantity,
            wholes_prcntg: editPackageMaterial.wholes_prcntg,
            pieces_quantity: editPackageMaterial.pieces_quantity,
            pieces_prcntg: editPackageMaterial.pieces_prcntg,
            lw_quantity: editPackageMaterial.lw_quantity,
            lw_prcntg: editPackageMaterial.lw_prcntg,
            dp_quantity: editPackageMaterial.dp_quantity,
            dp_prcntg: editPackageMaterial.dp_prcntg,
            jb_quantity: editPackageMaterial.jb_quantity,
            jb_prcntg: editPackageMaterial.jb_prcntg,
            jbp_quantity: editPackageMaterial.jbp_quantity,
            jbp_prcntg: editPackageMaterial.jbp_prcntg,
            sdp_quantity: editPackageMaterial.sdp_quantity,
            sdp_prcntg: editPackageMaterial.sdp_prcntg,
            husk_quantity: editPackageMaterial.husk_quantity,
            husk_prcntg: editPackageMaterial.husk_prcntg,
            e1_quantity: editPackageMaterial.e1_quantity,
            e1_prcntg: editPackageMaterial.e1_prcntg,
            editStatus: "Approved",
            approvedBy: req.cookies.user,
            createdBy: editPackageMaterial.createdBy
        }, { where: { id } });
        if (!updatePackageMaterial) return res.status(500).json({ message: "internal error while accepting Village material" });
        const deleteEditPackageMaterial = await RcvVillageInEditModel.destroy({ where: { id } });
        if (!deleteEditPackageMaterial) return res.status(500).json({ message: "internal error while deleting Village package material" });
        return res.status(200).json({ message: "Village material accepted successfully" });
    }
    catch (err) {
        console.log(err)
    }
}

export const rejectVillageInPrimaryEdit = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const EditPackagingMaterialdata = await RcvVillageInEditModel.destroy({ where: { id } });
        if (EditPackagingMaterialdata) {
            const packageMaterialData = await RcvVillageInModel.update({
                editStatus: "Rejected",
                approvedBy: req.cookies.user,
            }, { where: { id } });


            if (packageMaterialData) {
                return res.status(200).json({ message: "Rejected" })
            }
        }



    }
    catch (err) {
        console.log(err)
    }
}

export const getUnEntriedRcvVillageInVLOT = async (req: Request, res: Response) => {

    try {
        const table = VLotNo.getTableName();
        const vlotsum = await RcvVillageInModel.findAll({
            attributes: [
                'recevingDate',
                [sequelize.fn('SUM', sequelize.col('totalWt')), 'totalWeight']
            ],
            where: {

                editStatus: {
                    [Op.notLike]: 'Pending'
                },
                recevingDate: {
                    [Op.notIn]: Sequelize.literal(`(SELECT DISTINCT recevingDate FROM ${table})`)
                }
            },
            group: ['recevingDate']
        });
        if (vlotsum) {
            res.status(200).json({ message: "UnEntried VLOT Village In Primary Items Found", vlotsum });
        }
        else {
            res.status(500).json({ message: "Error in Finding UnEntried Village VLOT In Entry" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }

}

export const createEntireVLOT = async (req: Request, res: Response) => {

    try {
        const feeledBy = req.cookies.user;
        const formData = req.body.formData
        const date = req.body.date

        const currentDate = new Date();
        const currentYear = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

        // Get the latest sequence ID from the database
        const latestSequence: vlotNoData | null = await VLotNo.findOne({
            order: [['id', 'DESC']],
        }) as vlotNoData | null;

        //let sequenceId = 0;
        let sequenceId = Number(process.env.START_VLOTNO)
        if (latestSequence) {
            const latestYear = parseInt(latestSequence.vlotNo.split('-V')[0], 10);
            if (latestYear === currentYear) {
                sequenceId = parseInt(latestSequence.vlotNo.split('-V')[1], 10) + 1;
            }
        }
        // Generate the new sequence
        const newSequence = currentYear + '-V' + sequenceId.toString().padStart(3, '0');


        await sequelize.transaction(async (transaction: any) => {
            const lotGen = await VLotNo.create({ vlotNo: newSequence, recevingDate: date, createdBy: feeledBy }, { transaction })
            if (lotGen) {
                for (let data of formData) {

                    const vlotcreate = await VLotDetails.create({
                        vlotNo: newSequence,
                        recevingDate: date,
                        origin: data.origin,
                        qty: data.Receiving_Qty,
                        actual_qty: data.actual_Receiving_Qty,
                        loss: data.Loss,
                        loss_prcntg: ((Number(data.Receiving_Qty) - Number(data.actual_Receiving_Qty)) / Number(data.Receiving_Qty)) * 100,
                        createdBy: feeledBy


                    }, { transaction });

                    await RcnPeeling.create({
                        id: 10000 + parseInt(vlotcreate.dataValues.id),
                        LotNo: newSequence,
                        origin: data.origin,
                        //InputMoisture:data.OutputMoisture,
                        TotalInput: data.actual_Receiving_Qty,
                        noOfOperators: 0
                        //NoOfTrolley: data.NoOfTrolley,

                    }, { transaction });
                }
                res.status(200).json({ message: `V-LOT Entry ${newSequence} Generated Successfully` });

            }
        })




    }
    catch (error) {
        if (!res.headersSent) {
            console.log(error)
            return res.status(500).json({ message: "Error while creating V-LOT Entry", error });
        }
    }

}

export const getStatusVLOT = async (req: Request, res: Response) => {

    try {
        const date = req.body.date
        const completed = await VLotNo.count({
            where: { recevingDate: date }
        });


        res.status(200).json({ message: "VLOT Count", completed });
    }
    catch (err) {
        res.status(500).json({ message: "Error in VLOT COUNT", error: err });
    }

}
