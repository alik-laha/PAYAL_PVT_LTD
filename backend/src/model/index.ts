
import qcRCN from './qcRCNmodel'
import RcnPrimary from "./RcnEntryModel";

RcnPrimary.hasOne(qcRCN)
qcRCN.belongsTo(RcnPrimary)

export default {qcRCN,RcnPrimary}