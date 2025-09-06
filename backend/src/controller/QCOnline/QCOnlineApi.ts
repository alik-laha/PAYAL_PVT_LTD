import { Request, Response } from "express";
import OnlineBoiler from "../../model/onlineBoiler";
import OnlineGrading from "../../model/onlineGrading";
import OnlineBoiling from "../../model/onlineBoiling";
import OnlineScooping from "../../model/onlineScooping";
import OnlineBorma from "../../model/onlineBorma";
import OnlineHumidifier from "../../model/onlineHumidifier";
import { Op } from "sequelize";

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
        
    
            return res.status(200).json({ boilerdata, boilingdata, scoopingdata,gradingdata,bormadata,humiddata});
        
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