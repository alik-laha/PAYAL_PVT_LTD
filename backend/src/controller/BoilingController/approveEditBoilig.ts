import { Request, Response } from "express";
import { RcnBoilingData } from "../../type/type";
import RcnBoilingEdit from "../../model/RcnBoilingEditModel";
import RcnBoiling from "../../model/RcnBoilingModel";
import RcnScooping from "../../model/scoopingModel";
import { Op } from "sequelize";
import sequelize from "../../config/databaseConfig";

const approveEditBoiling = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const editStatus = "Approved";
        let openqty: number = 0;
        const data: RcnBoilingData | null = await RcnBoilingEdit.findOne({ where: { id } }) as RcnBoilingData | null;
        const prevdata: RcnBoilingData | null = await RcnBoiling.findOne({ where: { id } }) as RcnBoilingData | null;
        const lotNo=data?.LotNo
        const scoopstatus = await RcnScooping
        .findOne(
            { attributes:['scoopStatus'],where: { LotNo:lotNo} }) ;
            console.log(scoopstatus)
        const CreatedBy = data?.CreatedBy;
        const modifiedBy = req.cookies.user;
        if (data) {
            const {
                LotNo,
                date,
                origin,
                SizeName,
                Size,
                moisture,
                Scooping_Line_Mc,
                Pressure,
                CookingTime,
                MCName,
                Mc_on,
                Mc_off,
                noOfEmployees,
                Mc_breakdown,
                otherTime
            } = data;
            const Mc_runTime = data.Mc_runTime;
            


            
            if (prevdata && scoopstatus && scoopstatus.dataValues.scoopStatus==0) {
                const RcnGradingEditData = await RcnBoiling.update({
                    LotNo,
                    date,
                    origin,
                    SizeName,
                    Size,
                    moisture,
                    Scooping_Line_Mc,
                    Pressure,
                    CookingTime,
                    MCName,
                    Mc_on,
                    Mc_off,
                    noOfEmployees,
                    Mc_breakdown,
                    otherTime, CreatedBy, Mc_runTime,
                    modifiedBy, editStatus
                }, { where: { id } });
                
                let where
                where = {
                    [Op.and]: [
                        {
                            LotNo: {
                                [Op.like]: `%${LotNo}%`
                            }
                        },
                        {
                            SizeName: {
                                [Op.like]: `%${prevdata?.SizeName}%`
                            }
                        },
                        {
                            origin: {
                                [Op.like]: `%${prevdata?.origin}%`
                            }
                        },
                        {
                            Scooping_Line_Mc: {
                                [Op.like]: `%${prevdata?.Scooping_Line_Mc}%`
                            }
                        }
                    ]

                }

                if(prevdata.Scooping_Line_Mc!=Scooping_Line_Mc){
                    let linecount = await RcnScooping.count({ where: { LotNo: LotNo, Scooping_Line_Mc: Scooping_Line_Mc } })
                   
                    if (linecount > 0) {
                        const rcnscooping = await RcnScooping.update({
                            Receiving_Qty: (parseFloat(Size) * 1),
                            origin: origin,
                            SizeName: SizeName,
                            Size: Size,
                            Scooping_Line_Mc: Scooping_Line_Mc,
                            Opening_Qty: 0
                        }, { where });
                    }
                    else {
                        const latestEntry = await RcnScooping.findOne({
                            attributes: ['LotNo'],
                            where: {
    
                                Scooping_Line_Mc: Scooping_Line_Mc,
                                LotNo: {
                                    [Op.lt]: LotNo
                                }
    
                            },
                            order: [['LotNo', 'DESC']]
    
                        });
                        console.log(latestEntry)
    
                        if (latestEntry) {
                            const prevLot = latestEntry.dataValues.LotNo
                            const openqtySum = await RcnScooping.findAll({
                                attributes: [
                                    'Scooping_Line_Mc',
                                    [sequelize.fn('sum', sequelize.col('Uncut')), 'totalUncut'],
                                    [sequelize.fn('sum', sequelize.col('Unscoop')), 'totalUnscoop'],
                                    [sequelize.fn('sum', sequelize.col('NonCut')), 'totalNonCut'],
    
                                ],
                                where: {
                                    LotNo: `${prevLot}`,
                                    Scooping_Line_Mc: Scooping_Line_Mc,
    
                                },
                                group: ['Scooping_Line_Mc']
                            });
                            console.log('openqty:' + openqtySum)
                            if (openqtySum.length > 0) {
                                const dataValues = openqtySum[0].dataValues;
                                openqty = [
                                    'totalUncut',
                                    'totalUnscoop',
                                    'totalNonCut'
    
                                ].reduce((sum, key) => {
                                    const value = dataValues[key] ? parseFloat(dataValues[key]) : 0;
                                    return sum + value;
                                }, 0);
                            }
                            const rcnscooping = await RcnScooping.update({
                                Receiving_Qty: (parseFloat(Size) * 1),
                                origin: origin,
                                SizeName: SizeName,
                                Size: Size,
                                Scooping_Line_Mc: Scooping_Line_Mc,
                                Opening_Qty: openqty
                            }, { where });
                        }
                        else {
                            const rcnscooping = await RcnScooping.update({
                                Receiving_Qty: (parseFloat(Size) * 1),
                                origin: origin,
                                SizeName: SizeName,
                                Size: Size,
                                Scooping_Line_Mc: Scooping_Line_Mc,
                                Opening_Qty: 0
                            }, { where });
    
                        }
    
                    }
                    


                }
                else{
                    const rcnscooping = await RcnScooping.update({
                        Receiving_Qty: (parseFloat(Size) * 1),
                        origin: origin,
                        SizeName: SizeName,
                        Size: Size,
                        Scooping_Line_Mc: Scooping_Line_Mc,
                        Opening_Qty: 0
                    }, { where });
                }
                if (RcnGradingEditData) {
                    await RcnBoilingEdit.destroy({ where: { id } });
                    return res.status(200).json({ message: "RCN Boiling Modify Request is Approved" });
                }
                else {
                    return res.status(500).json({ message: "Internal Server Error" });
                }
                
                
                
               
            }
            else{
                return res.status(200).json({ message: "Can't Be approved/Scooping Done" })

            }

          

           
        }
        


    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err })
    }
}
export default approveEditBoiling