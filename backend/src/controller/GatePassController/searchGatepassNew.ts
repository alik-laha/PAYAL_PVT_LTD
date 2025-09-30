import { Request, Response } from "express";
import { Op, fn, col } from "sequelize";

import storePrimaryModel from "../../model/storePrimaryModel";
import gatePassMaster from "../../model/gatePassMasterModel";
import generalPrimaryModel from "../../model/generalPrimaryModel";
import PackagingMaterial from "../../model/recevingPackagingMaterialModel";
import almondPrimaryEntryModel from "../../model/almondPrimaryModel";
import agarbatiPrimaryEntryModel from "../../model/agarbatiPrimaryModel";
import oilMillModel from "../../model/oilMillModel";
import creditNoteModel from "../../model/creditNoteModel";
import cashewOutModel from "../../model/cashewOutModel";
import RcnPrimary from "../../model/RcnEntryModel";
import RcvVillageInModel from "../../model/RcvVillageInModel";
import RcvVillageModel from "../../model/RcvVillageModel";

// Import your section models

// import oilMillPrimaryModel from "../models/oilMillPrimaryModel";

// const sectionModelMap: Record<string, any> = {
//   store: storePrimaryModel,
//   general: generalPrimaryModel,
//   packagingmaterial: PackagingMaterial,
//   // Almond:almondPrimaryEntryModel,
//   agarbati: agarbatiPrimaryEntryModel,
//   oilmill: oilMillModel,
//   creditnote: creditNoteModel,
//   finishedcashew: cashewOutModel,
//   rawcashew:RcnPrimary
//   // add more mappings as needed
// };

const sectionTypeModelMap: Record<string, Record<string, any>> = {
  IN: {
    store: storePrimaryModel,
    general: generalPrimaryModel,
    packagingmaterial: PackagingMaterial,
    agarbati: agarbatiPrimaryEntryModel,
    creditnote: creditNoteModel,
    almond:almondPrimaryEntryModel,
    village: RcvVillageInModel,
    rawcashew:RcnPrimary
  },
  OUT: {
    store: storePrimaryModel,
    general: generalPrimaryModel,
    finishedcashew: cashewOutModel,
    agarbati: agarbatiPrimaryEntryModel,
    oilmill: oilMillModel,
    almond:almondPrimaryEntryModel,
    village: RcvVillageModel,
  },
};

const sectionColumnMap: Record<string, string> = {
  store: "totalWt",
  general: "totalWt",
  packagingmaterial: "totalWt",
  agarbati: "totalWt",
  oilmill: "totalWt",
  creditnote: "totalWt",
  finishedcashew: "actualQuantity", // <- special case
  rawcashew:"blWeight",
  village:'totalWt',
  almond:'totalWt'
};

const SearchGatePassNew = async (req: Request, res: Response) => {
  try {
    const { blConNo, fromDate, toDate, type, sectionstatus, section } = req.body;

    const page = parseInt(req.query.page as string, 10) || 0;
    const size = parseInt(req.query.limit as string, 10) || 0;
    const offset = (page - 1) * size;
    const limit = size;

    let whereClause: any[] = [];

    if (blConNo) {
      whereClause.push({
        [Op.or]: [
          { gatePassNo: { [Op.like]: `%${blConNo}%` } },
          { DocNo: { [Op.like]: `%${blConNo}%` } },
        ],
      });
    }

    if (fromDate && toDate) {
      whereClause.push({ date: { [Op.between]: [fromDate, toDate] } });
    }

    if (type) whereClause.push({ type });
    if (section) whereClause.push({ section: { [Op.like]: `%${section}%` } });
    if (sectionstatus) whereClause.push({ status: sectionstatus });

    const where = whereClause.length > 0 ? { [Op.and]: whereClause } : {};

    // ---- Fetch GatePass Master entries ----
    let rcnEntries = await gatePassMaster.findAll({
      where,
      order: [["gatePassNo", "DESC"], ["date", "DESC"]],
      ...(limit > 0 ? { limit, offset } : {}),
    });

    if (!rcnEntries.length) {
      return res.status(200).json({ msg: "No entries found", rcnEntries: [] });
    }

     // Group entries by gatePassNo + section
    const sumMap: Record<string, number> = {};
    for (const entry of rcnEntries) {
      const entryType = entry.dataValues.type;
      const sec = entry.dataValues.section?.toLowerCase().trim();
      if (!sec) continue;

      const model = sectionTypeModelMap[entryType]?.[sec];
      if (!model) continue;

      const sumColumn = sectionColumnMap[sec] || "totalWt";

      const sumResult = await model.findOne({
        attributes: [[fn("SUM", col(sumColumn)), "sumTotalWt"]],
        where: { gatePassNo: entry.dataValues.gatePassNo },
      });

      const sumTotalWt = parseFloat(sumResult?.get("sumTotalWt") || "0");
      const key = `${entry.dataValues.gatePassNo}__${sec}`;
      sumMap[key] = sumTotalWt;
    }

    // Attach sums and difference
    const entriesWithSum = rcnEntries.map((entry: any) => {
      const sec = entry.section?.toLowerCase().trim();
      const key = `${entry.gatePassNo}__${sec}`;
      const sumTotalWt = sumMap[key] || 0;

      return {
        ...entry.toJSON(),
        sumTotalWt,
        difference: (entry.netWeight || 0) - sumTotalWt,
      };
    });

    return res.status(200).json({
      msg: "GatePass Entry found",
      rcnEntries: entriesWithSum,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error", error: err });
  }
};


export default SearchGatePassNew;