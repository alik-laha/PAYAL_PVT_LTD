
import QcRCN from './qcRCNmodel'
import RcnPrimary from "./RcnEntryModel";
import sequelize from '../config/databaseConfig';


RcnPrimary.hasOne(QcRCN,{foreignKey:{name:'conNo'}})

QcRCN.belongsTo(RcnPrimary,{foreignKey:{name:'conNo'}})

export  {sequelize,QcRCN,RcnPrimary}