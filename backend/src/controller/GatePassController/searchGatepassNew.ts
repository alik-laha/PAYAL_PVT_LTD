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

// Import your section models

// import oilMillPrimaryModel from "../models/oilMillPrimaryModel";

const sectionModelMap: Record<string, any> = {
  store: storePrimaryModel,
  general: generalPrimaryModel,
  packagingmaterial: PackagingMaterial,
  // Almond:almondPrimaryEntryModel,
  agarbati: agarbatiPrimaryEntryModel,
  oilmill: oilMillModel,
  creditnote: creditNoteModel,
  finishedcashew: cashewOutModel,
  rawcashew:RcnPrimary
  // oilmill: oilMillPrimaryModel,
  // add more mappings as needed
};

const sectionColumnMap: Record<string, string> = {
  store: "totalWt",
  general: "totalWt",
  packagingmaterial: "totalWt",
  agarbati: "totalWt",
  oilmill: "totalWt",
  creditnote: "totalWt",
  finishedcashew: "actualQuantity", // <- special case
  rawcashew:"blWeight"
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

    // ---- Group by section ----
    const sectionGroups: Record<string, string[]> = {};
    rcnEntries.forEach((entry: any) => {
      const sec = entry.section?.toLowerCase().trim();
      if (!sec) return;
      if (!sectionGroups[sec]) sectionGroups[sec] = [];
      sectionGroups[sec].push(entry.gatePassNo);
    });

    // ---- Collect sums ----
    const sumMap: Record<string, number> = {};

    for (const [sec, gatePassNos] of Object.entries(sectionGroups)) {
      const model = sectionModelMap[sec];
      if (!model) continue; // skip sections without totalWt

      const sumColumn = sectionColumnMap[sec] || "totalWt"; // fallback

      const sumResults = await model.findAll({
    attributes: [
      "gatePassNo",
      [fn("SUM", col(sumColumn)), "sumTotalWt"] // <-- use dynamic column
    ],
    where: { gatePassNo: { [Op.in]: gatePassNos } },
    group: ["gatePassNo"],
  });

   sumResults.forEach((s: any) => {
    const key = `${sec}__${s.gatePassNo}`;
    sumMap[key] = parseFloat(s.get("sumTotalWt") || "0");
  });
}

// ---- Attach sums safely ----
const entriesWithSum = rcnEntries.map((entry: any) => {
  const sec = entry.section?.toLowerCase().trim();
  const key = `${sec}__${entry.gatePassNo}`;

  return {
    ...entry.toJSON(),
    sumTotalWt: sumMap[key] || 0,  // now section-specific
    
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