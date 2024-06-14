
import QcRCN from './qcRCNmodel'
import RcnPrimary from "./RcnEntryModel";
import sequelize from '../config/databaseConfig';


RcnPrimary.hasOne(QcRCN,{foreignKey:{name:'id'}})

QcRCN.belongsTo(RcnPrimary,{foreignKey:{name:'id'}})

export  {sequelize,QcRCN,RcnPrimary}