import { Request, Response } from "express";
import SkuModel from "../../model/SkuModel";
//import VendorName from "../../model/vendorNameModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import StoreStockNew from "../../model/storeStockModelNew";
import sequelize from "../../config/databaseConfig";

const updateRcvStore = async (req: Request, res: Response) => {
  try {
    const {
      sku,
      vendorName,
      quantity,
      unit,
      invoicedate,
      invoice,
      invoicequantity,
      type,
      remarks,
      totalWt,
      totalBill,gateType
    } = req.body.data;
    //     let vendortype:string
    //     if(gateType==='IN'){
    //         vendortype='Vendor'
    //     }
    //    else{
    //         vendortype='Party'
    //    }
    const id = req.params.id;
    const createdBy = req.cookies.user;
    let skuData = await SkuModel.findOne({
      where: { sku, type, section: "Store" },
    });
    //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
    // if(!skuData || !vendorData){
    //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
    // }
    if (!skuData) {
      return res.status(500).json({ message: "SKU Does Not Exist" });
    } else {
      await storePrimaryModel.sequelize?.transaction(async (transaction) => {
        const newPackageMaterial = await storePrimaryModel.update(
          {
            sku,
            invoice,
            invoicedate,
            type,
            vendorName,
            quantity,
            invoicequantity,
            unit,
            remarks,
            totalWt,
            totalBill,
            createdBy,
            status: 1,
          },
          {
            where: {
              id: id,
            },
          }
        );
        if (newPackageMaterial) {
          const itemExist = await StoreStockNew.findOne({
            where: {
              sku,
            },
          });

          if (!itemExist) {
            await StoreStockNew.create(
              {
                sku,
              },
              { transaction }
            );
          }
           let stockUpdate
          if(gateType==='IN'){
            stockUpdate = await StoreStockNew.update(
            {
              inputStock: sequelize.literal(`inputStock + ${quantity}`),
            },
            {
              where: {
                sku
              },
              transaction,
            }
          );
          }else{
            stockUpdate = await StoreStockNew.update(
            {
              outputStock: sequelize.literal(`outputStock + ${quantity}`),
            },
            {
              where: {
                sku
              },
              transaction,
            }
          );
          }
          if (!stockUpdate) {
            throw new Error("Failed to Dispatch Entry.");
          }
          return res
            .status(201)
            .json({
              message: "Store material received/dispatched successfully",
              newPackageMaterial,
            });
        } else {
          return res
            .status(500)
            .json({ message: "internal error while creating Store Entry" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal error while creating Store Entry" });
  }
};
export default updateRcvStore;
