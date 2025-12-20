import { Request, Response } from "express";

//import VendorName from "../../model/vendorNameModel";

import SkuModel from "../../model/SkuModel";
import storePrimaryModel from "../../model/storePrimaryModel";
import StoreStockNew from "../../model/storeStockModelNew";
import sequelize from "../../config/databaseConfig";

const updateStoreEntire = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // console.log(req.body)
    const createdBy = req.cookies.user;
    const formData = req.body.data;
    const firstrow = formData[0];
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
    } = firstrow;
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
        const dataToUpdate = formData.slice(1);
        //console.log(dataToUpdate)
        for (let data of dataToUpdate) {
          //console.log(data)
          let skuData = await SkuModel.findOne({
            where: { sku: data.sku, type: data.type, section: "Store" },
          });
          if (!skuData) {
            res.status(500).json({ message: "SKU Does Not Exist" });
            throw new Error("Transaction Aborted");
          }
          await storePrimaryModel.create(
            {
              gatePassNo: data.GatePassNo,
              grossWt: data.GrossWt,
              truckNo: data.TruckNo,
              recevingDate: data.recevingDate,
              sku: data.sku,
              invoice: data.invoice,
              invoicedate: data.invoicedate,
              vendorName: data.vendorName,
              invoicequantity: data.invoicequantity,
              type: data.type,
              quantity: data.quantity,
              totalBill: data.totalBill,
              unit: data.unit,
              remarks: data.remarks,
              totalWt: data.totalWt,
              createdBy,
              status: 1,
              gateType: data.gateType,
            },
            { transaction }
          );

          const itemExist = await StoreStockNew.findOne({
            where: {
              sku: data.sku,
            },
          });

          if (!itemExist) {
            await StoreStockNew.create(
              {
                sku: data.sku,
              },
              { transaction }
            );
          }
          let stockUpdate
          if(data.gateType==='IN'){
            stockUpdate = await StoreStockNew.update(
            {
              inputStock: sequelize.literal(`inputStock + ${data.quantity}`),
            },
            {
              where: {
                sku: data.sku,
              },
              transaction,
            }
          );
          }else{
            stockUpdate = await StoreStockNew.update(
            {
              outputStock: sequelize.literal(`outputStock + ${data.quantity}`),
            },
            {
              where: {
                sku: data.sku,
              },
              transaction,
            }
          );
          }
          
          if (!stockUpdate) {
            throw new Error("Failed to Dispatch Entry.");
          }
        }

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
            transaction,
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
          res
            .status(500)
            .json({ message: "internal error while creating Store Entry" });
          throw new Error("Transaction Aborted 2");
        }
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Error while creating Store Entry", error });
    }
  }
};
export default updateStoreEntire;
