import { Request, Response } from "express";
import OnlineBoiler from "../../model/onlineBoiler";
import OnlineGrading from "../../model/onlineGrading";
import OnlineBoiling from "../../model/onlineBoiling";
import OnlineScooping from "../../model/onlineScooping";
import OnlineBorma from "../../model/onlineBorma";
import OnlineHumidifier from "../../model/onlineHumidifier";
import { Op } from "sequelize";
import OnlinePouch from "../../model/onlinePouch";
import OnlineBucket from "../../model/onlineBucket";
import OnlineHandGrade from "../../model/onlineHandGrading";
import OnlinePeeling from "../../model/onlinePeeling";
import OnlineNanopix from "../../model/onlineNanopix";
import OnlineTaiho from "../../model/onlineTaiho";


export const sumOfallQCOnline = async (req: Request, res: Response) => {

    
    try {

        const today = new Date();
        let Year = today.getFullYear()

        const compareDate = new Date(`${Year}-04-01`);
        compareDate.setHours(0,0,0,0)
        let targetDate
        if (today < compareDate) {
            targetDate = new Date(`${Year - 1}-04-01`);
        }
        else{
            targetDate = new Date(`${Year}-04-01`);
        }
        
        targetDate.setHours(0,0,0,0)
        if(today.getHours()<5 || (today.getHours()===5 && today.getMinutes()<=30)){
            today.setHours(today.getHours()+5);
            today.setMinutes(today.getMinutes()+30);
        }

        

       
        const boilerdata = await OnlineBoiler.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
        const boilingdata = await OnlineBoiling.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
        const scoopingdata = await OnlineScooping.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
         const gradingdata = await OnlineGrading.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
        const bormadata = await OnlineBorma.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
        const humiddata = await OnlineHumidifier.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });

        const peelingData = await OnlinePeeling.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });

        const handgradeData = await OnlineHandGrade.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
        
        const nanopixData = await OnlineNanopix.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });

         const taihodata = await OnlineTaiho.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });

         const pouchData = await OnlinePouch.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });

         const bucketData = await OnlineBucket.count({
            where: {
                date: {
                    [Op.between]: [targetDate, today]
                }
            }
        });
    
            return res.status(200).json({ boilerdata, boilingdata, scoopingdata,gradingdata,bormadata,humiddata
              ,peelingData,bucketData,pouchData,taihodata,handgradeData,nanopixData
            });
        
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
}

export const CreateBoiler = async (req: Request, res: Response) => {
  try {
    let {
      boiler1pressure,
      boiler2pressure,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;
    const receivedBy = req.cookies.user;
    const entry = await OnlineBoiler.create({
      boiler1pressure,
      boiler2pressure,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy: receivedBy,
    });
    if (entry) {
      res
        .status(201)
        .json({ message: "QC Online Boiler Entry is Created Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const SearchBoiler = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { fromDate, toDate } = req.body;
       
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
       
        if (fromDate && toDate) {
           
                whereClause.push({
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                });
            
         
           
            
        }

        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
  
        let GradingEntries;
        if (limit === 0 && offset === 0) {

         
                GradingEntries = await OnlineBoiler.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            
            

        }
        else {
           
                GradingEntries = await OnlineBoiler.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            
            

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export const editQCOnlineBoiler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      boiler1pressure,
      boiler2pressure,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    // Check if record exists
    const existing = await OnlineBoiler.findOne({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "QC Online Boiler entry not found" });
    }

    // Direct update
    const updated = await OnlineBoiler.update(
      {
        boiler1pressure,
        boiler2pressure,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    if (!updated) {
      return res.status(500).json({ message: "Error updating QC Online Boiler" });
    }

    return res.status(200).json({ message: "QC Online Boiler entry updated successfully" });
  } catch (err) {
    console.error("Error in editQCOnlineBoiler:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const CreateGrading = async (req: Request, res: Response) => {
  try {
    let {
      vibratorspeed1,
      vibratorspeed2,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;
    const receivedBy = req.cookies.user;
    const entry = await OnlineGrading.create({
      vibratorspeed1,
      vibratorspeed2,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy: receivedBy,
    });
    if (entry) {
      res
        .status(201)
        .json({ message: "QC Online Grading Entry is Created Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const SearchGrading = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { fromDate, toDate } = req.body;
       
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
       
        if (fromDate && toDate) {
           
                whereClause.push({
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                });
            
         
           
            
        }

        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
  
        let GradingEntries;
        if (limit === 0 && offset === 0) {

         
                GradingEntries = await OnlineGrading.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            
            

        }
        else {
           
                GradingEntries = await OnlineGrading.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            
            

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export const editQCOnlineGrading = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      vibratorspeed1,
      vibratorspeed2,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlineGrading.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Grading entry not found" });
    }

    await OnlineGrading.update(
      {
        vibratorspeed1,
        vibratorspeed2,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Grading updated successfully" });
  } catch (err) {
    console.error("Error in editQCOnlineGrading:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateBoiling = async (req: Request, res: Response) => {
  try {
    let {
      cookerNo,
      cookerPressure,
      cookerTime,
      cashewStatus,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;
    const receivedBy = req.cookies.user;
    const entry = await OnlineBoiling.create({
      cookerNo,
      cookerPressure,cookerTime,cashewStatus,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy: receivedBy,
    });
    if (entry) {
      res
        .status(201)
        .json({ message: "QC Online Boiling Entry is Created Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const SearchBoiling = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { fromDate, toDate } = req.body;
       
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
       
        if (fromDate && toDate) {
           
                whereClause.push({
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                });
            
         
           
            
        }

        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
  
        let GradingEntries;
        if (limit === 0 && offset === 0) {

         
                GradingEntries = await OnlineBoiling.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            
            

        }
        else {
           
                GradingEntries = await OnlineBoiling.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            
            

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export const editQCOnlineBoiling = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      cookerNo,
      cookerPressure,
      cookerTime,
      cashewStatus,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) return res.status(400).json({ message: "id is required" });

    const existing = await OnlineBoiling.findOne({ where: { id } });
    if (!existing) return res.status(404).json({ message: "QC Online Boiling entry not found" });

    await OnlineBoiling.update(
      {
        cookerNo,
        cookerPressure,
        cookerTime,
        cashewStatus,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res.status(200).json({ message: "QC Online Boiling updated successfully" });
  } catch (err) {
    console.error("Error in editQCOnlineBoiling:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateScooping = async (req: Request, res: Response) => {
  try {
    let {
      oilcontainStatus,
      chalnacontainStatus,
      cashewHuskprcnt,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;
    const receivedBy = req.cookies.user;
    const entry = await OnlineScooping.create({
       oilcontainStatus,
      chalnacontainStatus,
      cashewHuskprcnt,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy: receivedBy,
    });
    if (entry) {
      res
        .status(201)
        .json({ message: "QC Online Scooping Entry is Created Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const SearchScooping = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { fromDate, toDate } = req.body;
       
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
       
        if (fromDate && toDate) {
           
                whereClause.push({
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                });
            
         
           
            
        }

        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
  
        let GradingEntries;
        if (limit === 0 && offset === 0) {

         
                GradingEntries = await OnlineScooping.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            
            

        }
        else {
           
                GradingEntries = await OnlineScooping.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            
            

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export const editQCOnlineScooping = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      oilcontainStatus,
      chalnacontainStatus,
      cashewHuskprcnt,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlineScooping.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Scooping entry not found" });
    }

    await OnlineScooping.update(
      {
        oilcontainStatus,
        chalnacontainStatus,
        cashewHuskprcnt,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Scooping updated successfully" });
  } catch (err) {
    console.error("Error in editQCOnlineScooping:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateBorma= async (req: Request, res: Response) => {
  try {
    let {
     LotNo,
      pressure,
      Origin,
      bormaNo,
      nwQuality,
      burnQuality,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;
    const receivedBy = req.cookies.user;
    const entry = await OnlineBorma.create({
      LotNo,
      pressure,
      Origin,
      bormaNo,
      nwQuality,
      burnQuality,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy: receivedBy,
    });
    if (entry) {
      res
        .status(201)
        .json({ message: "QC Online Borma Entry is Created Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const SearchBorma = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { fromDate, toDate } = req.body;
       
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
       
        if (fromDate && toDate) {
           
                whereClause.push({
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                });
            
         
           
            
        }

        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
  
        let GradingEntries;
        if (limit === 0 && offset === 0) {

         
                GradingEntries = await OnlineBorma.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            
            

        }
        else {
           
                GradingEntries = await OnlineBorma.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            
            

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export const editQCOnlineBorma = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      LotNo,
      pressure,
      Origin,
      bormaNo,
      nwQuality,
      burnQuality,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) return res.status(400).json({ message: "id is required" });

    const existing = await OnlineBorma.findOne({ where: { id } });
    if (!existing)
      return res.status(404).json({ message: "QC Online Borma entry not found" });

    await OnlineBorma.update(
      {
        LotNo,
        pressure,
        Origin,
        bormaNo,
        nwQuality,
        burnQuality,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Borma updated successfully" });
  } catch (err) {
    console.error("Error in editQCOnlineBorma:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateHumidifier = async (req: Request, res: Response) => {
  try {
    let {
      LotNo,
      moisture,
      Origin,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;
    const receivedBy = req.cookies.user;
    const entry = await OnlineHumidifier.create({
     LotNo,
      pressure:moisture,
      Origin,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy: receivedBy,
    });
    if (entry) {
      res
        .status(201)
        .json({ message: "QC Online Humidifier Entry is Created Successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const SearchHumidifier = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 0;
        const size = parseInt(req.query.limit as string, 10) || 0;
        const { fromDate, toDate } = req.body;
       
        const offset = (page - 1) * size;
        const limit = size;
        let whereClause = []
       
        if (fromDate && toDate) {
           
                whereClause.push({
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                });
            
         
           
            
        }

        const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};
  
        let GradingEntries;
        if (limit === 0 && offset === 0) {

         
                GradingEntries = await OnlineHumidifier.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending

                });

            
            

        }
        else {
           
                GradingEntries = await OnlineHumidifier.findAll({
                    where,
                    order: [['id', 'DESC'], ['date', 'DESC']], // Order by date descending
                    limit,
                    offset
                });
            
            

        }
        return res.status(200).json(GradingEntries);

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server Error", err });
    }
}
export const editQCOnlineHumidifier = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      LotNo,
      pressure,
      Origin,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlineHumidifier.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Humidifier entry not found" });
    }

    await OnlineHumidifier.update(
      {
        LotNo,
        pressure,
        Origin,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Humidifier updated successfully" });
  } catch (err) {
    console.error("Error in editQCOnlineHumidifier:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreatePeeling = async (req: Request, res: Response) => {
  try {
    const {
      pressure,
      peelingTime,
      unpeelPcntng,
      cashewPcntng,
      peelingQty,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    const createdBy = req.cookies.user;

    const entry = await OnlinePeeling.create({
      pressure,
      peelingTime,
      unpeelPcntng,
      cashewPcntng,
      peelingQty,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy,
    });

    if (entry) {
      return res
        .status(201)
        .json({ message: "QC Online Peeling Entry Created Successfully" });
    }
  } catch (error) {
    console.error("Error in CreatePeeling:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const SearchPeeling = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;
    const { fromDate, toDate } = req.body;

    const offset = (page - 1) * size;
    const limit = size;

    let whereClause: any[] = [];

    if (fromDate && toDate) {
      whereClause.push({
        date: {
          [Op.between]: [fromDate, toDate],
        },
      });
    }

    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};

    let peelingEntries;
    if (limit === 0 && offset === 0) {
      peelingEntries = await OnlinePeeling.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
      });
    } else {
      peelingEntries = await OnlinePeeling.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
        limit,
        offset,
      });
    }

    return res.status(200).json(peelingEntries);
  } catch (err) {
    console.error("Error in SearchPeeling:", err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
export const editQCPeeling = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      pressure,
      peelingTime,
      unpeelPcntng,
      cashewPcntng,
      peelingQty,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlinePeeling.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Peeling entry not found" });
    }

    await OnlinePeeling.update(
      {
        pressure,
        peelingTime,
        unpeelPcntng,
        cashewPcntng,
        peelingQty,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Peeling updated successfully" });
  } catch (err) {
    console.error("Error in editQCPeeling:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreatePouch = async (req: Request, res: Response) => {
  try {
    const {
      LotNo,
      BatchNo,
      Origin,
      Grade,
      moisture,
      nutcount,
      avgWeight,
      date,
      time,
      pktQuality,
      pktQualityRemarks,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      Remarks
    } = req.body;

    const createdBy = req.cookies.user;

    const entry = await OnlinePouch.create({
      LotNo,
      BatchNo,
      Origin,
      Grade,
      moisture,
      nutcount,
      avgWeight,
      date,
      time,
      pktQuality,
      pktQualityRemarks,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy,Remarks
    });

    if (entry) {
      return res
        .status(201)
        .json({ message: "QC Online Pouch Entry Created Successfully" });
    }
  } catch (error) {
    console.error("Error in CreatePouch:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const SearchPouch = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;
    const { fromDate, toDate } = req.body;

    const offset = (page - 1) * size;
    const limit = size;

    let whereClause: any[] = [];

    if (fromDate && toDate) {
      whereClause.push({
        date: {
          [Op.between]: [fromDate, toDate],
        },
      });
    }

    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};

    let pouchEntries;
    if (limit === 0 && offset === 0) {
      pouchEntries = await OnlinePouch.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
      });
    } else {
      pouchEntries = await OnlinePouch.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
        limit,
        offset,
      });
    }

    return res.status(200).json(pouchEntries);
  } catch (err) {
    console.error("Error in SearchPouch:", err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
export const editQCPouch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      LotNo,
      BatchNo,
      Origin,
      Grade,
      moisture,
      nutcount,
      avgWeight,
      date,
      time,
      pktQuality,
      pktQualityRemarks,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      Remarks
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlinePouch.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Pouch entry not found" });
    }

    await OnlinePouch.update(
      {
        LotNo,
        BatchNo,
        Origin,
        Grade,
        moisture,
        nutcount,
        avgWeight,
        date,
        time,
        pktQuality,
        pktQualityRemarks,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,Remarks
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Pouch updated successfully" });
  } catch (err) {
    console.error("Error in editQCPouch:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const CreateBucket = async (req: Request, res: Response) => {
  try {
    const {
      LotNo,
      BatchNo,
      Origin,
      Grade,
      moisture,
      nutcount,
      avgWeight,
      date,
      time,
      pktQuality,
      pktQualityRemarks,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,Remarks
    } = req.body;

    const createdBy = req.cookies.user;

    const entry = await OnlineBucket.create({
      LotNo,
      BatchNo,
      Origin,
      Grade,
      moisture,
      nutcount,
      avgWeight,
      date,
      time,
      pktQuality,
      pktQualityRemarks,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy,
      Remarks
    });

    if (entry) {
      return res
        .status(201)
        .json({ message: "QC Online Pouch Entry Created Successfully" });
    }
  } catch (error) {
    console.error("Error in CreatePouch:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const SearchBucket = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;
    const { fromDate, toDate } = req.body;

    const offset = (page - 1) * size;
    const limit = size;

    let whereClause: any[] = [];

    if (fromDate && toDate) {
      whereClause.push({
        date: {
          [Op.between]: [fromDate, toDate],
        },
      });
    }

    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};

    let pouchEntries;
    if (limit === 0 && offset === 0) {
      pouchEntries = await OnlineBucket.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
      });
    } else {
      pouchEntries = await OnlineBucket.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
        limit,
        offset,
      });
    }

    return res.status(200).json(pouchEntries);
  } catch (err) {
    console.error("Error in SearchPouch:", err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
export const editQCBucket= async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      LotNo,
      BatchNo,
      Origin,
      Grade,
      moisture,
      nutcount,
      avgWeight,
      date,
      time,
      pktQuality,
      pktQualityRemarks,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,Remarks
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlineBucket.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Pouch entry not found" });
    }

    await OnlineBucket.update(
      {
        LotNo,
        BatchNo,
        Origin,
        Grade,
        moisture,
        nutcount,
        avgWeight,
        date,
        time,
        pktQuality,
        pktQualityRemarks,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,Remarks
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Pouch updated successfully" });
  } catch (err) {
    console.error("Error in editQCPouch:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const CreateHandGrade = async (req: Request, res: Response) => {
  try {
    const {
      LotNo,
      Origin,
      Grade,
      moisture,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    const createdBy = req.cookies.user;

    const entry = await OnlineHandGrade.create({
      LotNo,
      Origin,
      Grade,
      moisture,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy,
    });

    if (entry) {
      return res
        .status(201)
        .json({ message: "QC Online Hand Grade Entry Created Successfully" });
    }
  } catch (error) {
    console.error("Error in CreateHandGrade:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const SearchHandGrade = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;
    const { fromDate, toDate } = req.body;

    const offset = (page - 1) * size;
    const limit = size;

    let whereClause: any[] = [];

    if (fromDate && toDate) {
      whereClause.push({
        date: {
          [Op.between]: [fromDate, toDate],
        },
      });
    }

    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};

    let handGradeEntries;
    if (limit === 0 && offset === 0) {
      handGradeEntries = await OnlineHandGrade.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
      });
    } else {
      handGradeEntries = await OnlineHandGrade.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
        limit,
        offset,
      });
    }

    return res.status(200).json(handGradeEntries);
  } catch (err) {
    console.error("Error in SearchHandGrade:", err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
export const editQCHandGrade = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      LotNo,
      Origin,
      Grade,
      moisture,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlineHandGrade.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Hand Grade entry not found" });
    }

    await OnlineHandGrade.update(
      {
        LotNo,
        Origin,
        Grade,
        moisture,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Hand Grade updated successfully" });
  } catch (err) {
    console.error("Error in editQCHandGrade:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CreateNanopix = async (req: Request, res: Response) => {
  try {
    const {
      cupcleaningStatus,
      magiccleaningStatus,
      gradingCount,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    const createdBy = req.cookies.user;

    const entry = await OnlineNanopix.create({
      cupcleaningStatus,
      magiccleaningStatus,
      gradingCount,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy,
    });

    if (entry) {
      return res
        .status(201)
        .json({ message: "QC Online Nanopix Entry Created Successfully" });
    }
  } catch (error) {
    console.error("Error in CreateNanopix:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const SearchNanopix = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;
    const { fromDate, toDate } = req.body;

    const offset = (page - 1) * size;
    const limit = size;

    let whereClause: any[] = [];

    if (fromDate && toDate) {
      whereClause.push({
        date: {
          [Op.between]: [fromDate, toDate],
        },
      });
    }

    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};

    let nanopixEntries;
    if (limit === 0 && offset === 0) {
      nanopixEntries = await OnlineNanopix.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
      });
    } else {
      nanopixEntries = await OnlineNanopix.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
        limit,
        offset,
      });
    }

    return res.status(200).json(nanopixEntries);
  } catch (err) {
    console.error("Error in SearchNanopix:", err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
export const editQCNanopix = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      cupcleaningStatus,
      magiccleaningStatus,
      gradingCount,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlineNanopix.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Nanopix entry not found" });
    }

    await OnlineNanopix.update(
      {
        cupcleaningStatus,
        magiccleaningStatus,
        gradingCount,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Nanopix updated successfully" });
  } catch (err) {
    console.error("Error in editQCNanopix:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const CreateTaiho = async (req: Request, res: Response) => {
  try {
    const {
      pressure,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    const createdBy = req.cookies.user;

    const entry = await OnlineTaiho.create({
      pressure,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
      createdBy,
    });

    if (entry) {
      return res
        .status(201)
        .json({ message: "QC Online Taiho Entry Created Successfully" });
    }
  } catch (error) {
    console.error("Error in CreateTaiho:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
export const SearchTaiho = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;
    const { fromDate, toDate } = req.body;

    const offset = (page - 1) * size;
    const limit = size;

    let whereClause: any[] = [];

    if (fromDate && toDate) {
      whereClause.push({
        date: {
          [Op.between]: [fromDate, toDate],
        },
      });
    }

    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};

    let taihoEntries;
    if (limit === 0 && offset === 0) {
      taihoEntries = await OnlineTaiho.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
      });
    } else {
      taihoEntries = await OnlineTaiho.findAll({
        where,
        order: [["id", "DESC"], ["date", "DESC"]],
        limit,
        offset,
      });
    }

    return res.status(200).json(taihoEntries);
  } catch (err) {
    console.error("Error in SearchTaiho:", err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
export const editQCTaiho = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modifiedBy = req.cookies.user;

    const {
      pressure,
      date,
      time,
      cleaningStatus,
      cleanRemarks,
      maintainance,
      maintainanceRemarks,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const existing = await OnlineTaiho.findOne({ where: { id } });
    if (!existing) {
      return res
        .status(404)
        .json({ message: "QC Online Taiho entry not found" });
    }

    await OnlineTaiho.update(
      {
        pressure,
        date,
        time,
        cleaningStatus,
        cleanRemarks,
        maintainance,
        maintainanceRemarks,
        modifiedBy,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "QC Online Taiho updated successfully" });
  } catch (err) {
    console.error("Error in editQCTaiho:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};