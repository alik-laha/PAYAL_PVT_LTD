import { Request, Response } from "express";
import { qrIDData } from "../../type/type";
import transactionModel from "../../model/transactionModel";
import sequelize from "../../config/databaseConfig";
import { Op } from "sequelize";
import stockModel from "../../model/stockModel";
import SkuModel from "../../model/SkuModel";

export const CreateQREntire = async (req: Request, res: Response) => {
  try {
    const feeledBy = req.cookies.user || "system";
    console.log(req.body)
    const formData = req.body;
    const noCopy = req.body.type ? Number(req.body.type) : 1

    const grade = req.body.gradeName
    let gradeData = await SkuModel.findOne({
      where: { sku:grade, type:'Final Grade', section: "Packing" },
    });
    //let vendorData = await VendorName.findOne({ where: { vendorName,type:vendortype,section:'Store' } });
    // if(!skuData || !vendorData){
    //     return res.status(500).json({ message: "SKU/Vendor Does Not Exist" });
    // }
    if (!gradeData) {
      return res.status(500).json({ message: "Grade Does Not Exist" });
    }

    // ✅ Generate plot number sequence
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let latestSequence: qrIDData | null = (await transactionModel.findOne(
      {
        order: [["qr_id", "DESC"]],
      }
    )) as qrIDData | null;

    console.log(latestSequence)
    let latest_id = latestSequence?.qr_id || ''
    const startPlotEnvKey = "START_QR_NO";

    const startPlotValue = process.env[startPlotEnvKey];
    let sequenceId = Number(startPlotValue) || 1;

    // ✅ DB Transaction
    await sequelize.transaction(async (transaction: any) => {
      for (let i = 1; i <= noCopy; i++) {
        if (latest_id) {
          const latestYear = parseInt(
            latest_id.split(`-`)[0],
            10
          );
          if (latestYear === currentYear) {
            sequenceId =
              parseInt(
                latest_id.split(`-`)[1],
                10
              ) + 1;
          }
        }

        const newSequence =
          currentYear + `-` + sequenceId.toString().padStart(6, "0");
        //   console.log(newSequence)
        //   console.log(sequenceId)

        const qrGen = await transactionModel.create(
          {
            qr_id: newSequence,
            createdBy: feeledBy,
            origin: formData?.origin || "-",
            lotNo: formData?.lotNo || "-",
            gradeName: formData?.gradeName || "-",
            batchNo: formData.batchNo,
            netWt: formData.netWt,
            grossWt: formData.grossWt,
            entryDate: formData.date,
            entryTime: formData.time
          },
          { transaction }
        );

        latest_id = newSequence
        if (!qrGen) {
          throw new Error("Failed to create QR Entry");
        }
      }

      res.status(200).json({
        message: `Entry/Entries Generated Successfully`,
      });
    });
  } catch (error) {
    if (!res.headersSent) {
      console.error("❌ Error in Create QR Entire:", error);
      return res.status(500).json({
        message: "Error while creating QR Entry",
        error: (error as Error).message,
      });
    }
  }
};
export const getActvQRCount = async (req: Request, res: Response) => {
    try {
            const today = new Date();
            today.setHours(0, 0, 0, 0)
            const totalBar  = await transactionModel.count({ col:'qr_id'});
            const totalGen  = await transactionModel.count({ col:'qr_id',
              where: { status: { [Op.notLike]: 'GENERATED'}}});
            const totalScan  = await transactionModel.count({ col:'qr_id',
                where: { [Op.or]: [{ status: 'DISPATCHED' }, { status: 'RE-PACKED' }]}});
            const pendingScan  = await transactionModel.count({ col:'qr_id',
                where: { status: { [Op.like]: 'IN-STOCK'}}});

            const todayGen = await transactionModel.count({ col:'qr_id',
                where: { entryDate: { [Op.gte]: today},
                status: { [Op.notLike]: 'GENERATED'}
              }});

            const todayScan = await transactionModel.count({ col:'qr_id',
                where: { entryDate: { [Op.gte]: today},
                [Op.or]: [{ status: 'DISPATCHED' }, { status: 'RE-PACKED' }]
              }});

           
                    
        res.status(200).json({ message: "QR Count",totalBar, todayGen,todayScan,pendingScan,totalGen,totalScan});
    }
    catch (err) {
        res.status(500).json({ message: "Error in Finding QR Count", error: err });
    }
}

export const SearchQRTransaction = async (req: Request, res: Response) => {
  try {
    const { lotNo, fromDate, toDate, status, gradeName, batchNo,origin } = req.body;
    const rolestatus=req.cookies.role||'Director'
    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;

    const offset = (page - 1) * size;
    const limit = size;

    let whereClause = [];

    // Conditionally add parameters to the whereClause
    if (lotNo) {
      whereClause.push({
        lotNo: {
          [Op.like]: `%${lotNo}%`
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
    if(rolestatus){
      if(rolestatus==='DispatchManager'){
        whereClause.push({
        [Op.or]: [{ status: 'RE-PACKED' }, { status: 'DISPATCHED' }],
      })
      }
      else if(rolestatus==='PackingSupervisor'){
         whereClause.push({
        [Op.or]: [{ status: 'GENERATED' }, { status: 'IN-STOCK' }],
      })
      }
      
    }

    if (fromDate && toDate) {
      whereClause.push({
        entryDate: {
          [Op.between]: [fromDate, toDate]
        }
      });
    }

    if (batchNo) {
      whereClause.push({
        section: {
          [Op.like]: `%${batchNo}%`
        }
      });
    }
    if (status) {
      whereClause.push({
        status: status
      })
    }
    if (gradeName) {
      whereClause.push({
        gradeName
      })

    }

    // Convert the array to an object for the where condition
    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
    let rcnEntries
    if (limit === 0 && offset === 0) {
      rcnEntries = await transactionModel.findAll({
        where,
        order: [['qr_id', 'DESC']], // Order by date descending

      });
    }
    else {
      rcnEntries = await transactionModel.findAll({
        where,
        order: [['qr_id', 'DESC']], // Order by date descending
        limit: limit,
        offset: offset
      });
    }

    return res.status(200).json({ msg: 'Qr Entry found', rcnEntries })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
  }
}

export const deleteQrTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await transactionModel.destroy({
      where: { id }
    });
    res.status(200).json({
      message: `QR-Entry Deleted Successfully`,
    });
  } catch (error) {
    if (!res.headersSent) {
      console.error("❌ Error in Create QR Entire:", error);
      return res.status(500).json({
        message: "Error while creating QR Entry",
        error: (error as Error).message,
      });
    }
  }
}

export const addToStock = async (req: Request, res: Response) => {
  const { qr_id, origin, netWt, gradeName } = req.body;
  try {
    const oldStock: any = await stockModel.findOne({
      where: { origin, gradeName }
    });

    await sequelize.transaction(async (transaction: any) => {
      if (oldStock) {
        await stockModel.update({
          inputStock: (Number(oldStock.inputStock) + Number(netWt)),
          inputBucketStock:(Number(oldStock.inputBucketStock) + 1)
        }, {
          where: {
            id: oldStock.id
          },
          transaction
        })
      } else {
        await stockModel.create({
          threshold: 0,
          inputStock: netWt,
          inputBucketStock:1,
          outputStock: 0,
          origin,
          gradeName
        }, { transaction });
      }

      await transactionModel.update({
        status: "IN-STOCK"
      }, {
        where: { qr_id },
        transaction
      })


      res.status(200).json({
        message: `Stock Updated Successfully`,
      });
    });

  } catch (error) {
    if (!res.headersSent) {
      console.error("❌ Error in Updating Stock:", error);
      return res.status(500).json({
        message: "Error while Updating Stock",
        error: (error as Error).message,
      });
    }
  }
}

export const bulkAddToStock = async (
  req: Request,
  res: Response
) => {

  const { qr_ids } = req.body;

  if (!Array.isArray(qr_ids) || qr_ids.length === 0) {
    return res.status(400).json({
      message: "qr_ids array is required",
    });
  }

  const successItems: any[] = [];
  const failedItems: any[] = [];

  for (const qr_id of qr_ids) {

    const transaction = await sequelize.transaction();

    try {

      // Fetch QR Data
      const qrData: any = await transactionModel.findOne({
        where: { qr_id },
        transaction,
      });

      // QR not found
      if (!qrData) {

        failedItems.push({
          qr_id,
          error: "QR data not found",
        });

        await transaction.rollback();
        continue;
      }

      // STATUS CHECK
      if (qrData.status !== "GENERATED") {

        failedItems.push({
          qr_id,
          error: `Barcode already in status ${qrData.status}`,
        });

        await transaction.rollback();
        continue;
      }

      // Find existing stock
      const oldStock: any = await stockModel.findOne({
        where: {
          origin: qrData.origin,
          gradeName: qrData.gradeName,
        },
        transaction,
      });

      // Update existing stock
      if (oldStock) {

        await stockModel.update(
          {
            inputStock:
              Number(oldStock.inputStock) +
              Number(qrData.netWt),

            inputBucketStock:
              Number(oldStock.inputBucketStock) + 1,
          },
          {
            where: {
              id: oldStock.id,
            },
            transaction,
          }
        );

      } else {

        // Create new stock
        await stockModel.create(
          {
            threshold: 0,
            inputStock: qrData.netWt,
            inputBucketStock: 1,
            outputStock: 0,
            origin: qrData.origin,
            gradeName: qrData.gradeName,
          },
          { transaction }
        );
      }

      // Update transaction status
      await transactionModel.update(
        {
          status: "IN-STOCK",
        },
        {
          where: { qr_id },
          transaction,
        }
      );

      await transaction.commit();

      successItems.push({
        qr_id,
        message: "Stock Updated Successfully",
      });

    } catch (error: any) {

      await transaction.rollback();

      console.error(`❌ Failed for ${qr_id}`, error);

      failedItems.push({
        qr_id,
        error: error.message,
      });
    }
  }

  return res.status(200).json({
    message: "Bulk stock process completed",
    total: qr_ids.length,
    successCount: successItems.length,
    failedCount: failedItems.length,
    successItems,
    failedItems,
  });
};

export const createStockEntry = async (req: Request, res: Response) => {
  const { threshold, thresholdBucket,origin, gradeName } = req.body;
  try {

    const oldStock: any = await stockModel.findOne({
      where: { origin, gradeName }
    });

    if (oldStock) {
      return res.status(400).json({
        message: "Threshold exists with given Origin and Grade Name"
      })
    }

    await stockModel.create({
      threshold,thresholdBucket,
      inputStock: 0,
      inputBucketStock: 0,
      outputStock: 0,
      outputBucketStock: 0,
      origin,
      gradeName
    });

    return res.status(200).json({
      message: "Threshold Set Sucessfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while creating grade stockentry."
    })
  }
}

export const updateThreshold = async (req: Request, res: Response) => {
  const { id, threshold,thresholdBucket } = req.body;
  try {
    await stockModel.update({
      threshold,thresholdBucket
    }, {
      where: { id }
    });

    res.status(200).json({
      message: `Threshold Updated Successfully`,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while Updating Threshold"
    });
  }
}

export const SearchStock = async (req: Request, res: Response) => {
  try {
    const { gradeName, origin } = req.body;
    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;

    const offset = (page - 1) * size;
    const limit = size;

    let whereClause = [];

    if (origin) {
      whereClause.push({
        origin
      })
    }
    if (gradeName) {
      whereClause.push({
        gradeName
      })

    }

    // Convert the array to an object for the where condition
    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
    let rcnEntries
    if (limit === 0 && offset === 0) {
      rcnEntries = await stockModel.findAll({
        where
      });
    }
    else {
      rcnEntries = await stockModel.findAll({
        where,
        limit: limit,
        offset: offset
      });
    }

    return res.status(200).json({ msg: 'Stock Entry found', rcnEntries })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'Internal server error', error: err })
  }
}

export const updateStatus = async (req: Request, res: Response) => {
  const { operation, vehicleNo, partyName, remarks, place, date, time, qr_id } = req.body;
  const feeledBy = req.cookies.user || "system";

  try {
    const qrTransaction: any = await transactionModel.findOne({
      where: { qr_id }
    });

    if (!qrTransaction) {
      return res.status(400).json({
        message: "Invalid Barcode",
        error: true
      });
    }

    if (qrTransaction.status !== 'IN-STOCK') {
      return res.status(400).json({
        message: qrTransaction.status == 'GENERATED' ? "Invalid Barcode" : "Barcode Already Scanned Once",
        error: true
      });
    }

    const oldStock: any = await stockModel.findOne({
      where: { origin: qrTransaction.origin, gradeName: qrTransaction.gradeName }
    });

    if (!oldStock) {
      return res.status(400).json({
        message: "Invalid Barcode",
        error: true
      });
    }

    await sequelize.transaction(async (transaction: any) => {

      

      if (operation === "dispatch") {
        await stockModel.update({
        outputDispatchStock: (Number(oldStock.outputDispatchStock) + Number(qrTransaction.netWt)),
        outputBucketDispatchStock: (Number(oldStock.outputBucketDispatchStock) + 1)
      }, {
        where: {
          id: oldStock.id
        },
        transaction
      })
        await transactionModel.update({
          status: "DISPATCHED",
          vehicleNo,
          partyName,
          Remarks: remarks,
          exitDate: date,
          exitTime: time,
          scanedBy: feeledBy
        }, {
          where: { qr_id },
          transaction
        })
      } else if (operation === "repacking") {
        await stockModel.update({
        outputRepackStock: (Number(oldStock.outputRepackStock) + Number(qrTransaction.netWt)),
        outputBucketRepackStock: (Number(oldStock.outputBucketRepackStock) + 1)
      }, {
        where: {
          id: oldStock.id
        },
        transaction
      })
        await transactionModel.update({
          status: "RE-PACKED",
          place,
          Remarks: remarks,
          exitDate: date,
          exitTime: time,
          scanedBy: feeledBy
        }, {
          where: { qr_id },
          transaction
        })
      } else {
        return res.status(400).json({
          message: "Invalid operation",
          error: true
        });
      }

      res.status(200).json({
        message: `Barcode Scanned Successfully`,
      });
    });

  } catch (error) {
    if (!res.headersSent) {
      console.error("❌ Error in Updating Stock:", error);
      return res.status(500).json({
        message: "Error while Updating Stock",
        error: (error as Error).message,
      });
    }
  }
}

export const updateStatusBulk = async (req: Request, res: Response) => {
  const {
    operation,
    vehicleNo,
    partyName,
    remarks,
    place,
    date,
    time,
    qr_ids
  } = req.body;

  const feeledBy = req.cookies.user || "system";

  if (!Array.isArray(qr_ids) || qr_ids.length === 0) {
    return res.status(400).json({
      message: "No barcodes provided",
      error: true
    });
  }

  try {

    /* ---------- Fetch All Transactions ---------- */
    const qrTransactions: any[] = await transactionModel.findAll({
      where: { qr_id: qr_ids }
    });

    if (qrTransactions.length !== qr_ids.length) {
      return res.status(400).json({
        message: "Some barcodes are invalid",
        //error: true
      });
    }

    /* ---------- Validate Status ---------- */
    const invalid = qrTransactions.filter(q => q.status !== "IN-STOCK");

    if (invalid.length > 0) {
      return res.status(400).json({
        message: `Barcodes ${invalid.map(i => i.qr_id)} Already Scanned Or Invalid`,
        invalid: invalid.map(i => i.qr_id),
        //error: true
      });
    }

    /* ---------- Group Stock Updates ---------- */
    const stockMap: Record<string, any> = {};

    for (const qr of qrTransactions) {
      const key = `${qr.origin}_${qr.gradeName}`;

      if (!stockMap[key]) {
        stockMap[key] = {
          origin: qr.origin,
          gradeName: qr.gradeName,
          totalWeight: 0,
          bucketCount: 0
        };
      }

      stockMap[key].totalWeight += Number(qr.netWt);
      stockMap[key].bucketCount += 1;
    }

    await sequelize.transaction(async (transaction: any) => {

      /* ---------- Update Stock in Group ---------- */
      for (const key in stockMap) {

        const { origin, gradeName, totalWeight, bucketCount } = stockMap[key];

        const oldStock: any = await stockModel.findOne({
          where: { origin, gradeName },
          transaction
        });

        if (!oldStock) {
          throw new Error("Stock not found for " + origin);
        }

        if (operation === "dispatch") {
          await stockModel.update({
            outputDispatchStock:
              Number(oldStock.outputDispatchStock) + totalWeight,
            outputBucketDispatchStock:
              Number(oldStock.outputBucketDispatchStock) + bucketCount
          }, {
            where: { id: oldStock.id },
            transaction
          });

        } else if (operation === "repacking") {
          await stockModel.update({
            outputRepackStock:
              Number(oldStock.outputRepackStock) + totalWeight,
            outputBucketRepackStock:
              Number(oldStock.outputBucketRepackStock) + bucketCount
          }, {
            where: { id: oldStock.id },
            transaction
          });

        } else {
          throw new Error("Invalid operation");
        }
      }

      /* ---------- Update Transactions ---------- */
      await transactionModel.update({
        status: operation === "dispatch" ? "DISPATCHED" : "RE-PACKED",
        vehicleNo,
        partyName,
        place,
        Remarks: remarks,
        exitDate: date,
        exitTime: time,
        scanedBy: feeledBy
      }, {
        where: { qr_id: qr_ids },
        transaction
      });

    });

    return res.status(200).json({
      message: `${qr_ids.length} Barcodes Processed Successfully`,
      count: qr_ids.length
    });

  } catch (error) {
    console.error("❌ Bulk Update Error:", error);

    return res.status(500).json({
      message: "Error while Updating Stock (Bulk)",
      error: (error as Error).message,
    });
  }
};

