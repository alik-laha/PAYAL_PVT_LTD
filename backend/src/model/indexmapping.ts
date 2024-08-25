import QcRCN from './qcRCNmodel'
import RcnPrimary from "./RcnEntryModel";
import sequelize from '../config/databaseConfig';
import PackagingMaterial from './recevingPackagingMaterialModel';
import QualityPackageMaterial from './qualityPacjkageMaterial';
import QualityEditPackageMaterial from './editQualityPackageMaterial';


RcnPrimary.hasOne(QcRCN, { foreignKey: { name: 'id' } })

QcRCN.belongsTo(RcnPrimary, { foreignKey: { name: 'id' } })

PackagingMaterial.hasOne(QualityPackageMaterial, { foreignKey: { name: 'id' } })

QualityPackageMaterial.belongsTo(PackagingMaterial, { foreignKey: { name: 'id' } })

PackagingMaterial.hasOne(QualityEditPackageMaterial, { foreignKey: { name: 'id' } })

QualityEditPackageMaterial.belongsTo(PackagingMaterial, { foreignKey: { name: 'id' } })

export { sequelize, QcRCN, RcnPrimary, PackagingMaterial, QualityPackageMaterial }