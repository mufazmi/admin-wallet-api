import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import db from "../configs/db/db";
import StateModel from './state-model';

class AdminModel extends Model<InferAttributes<AdminModel>,InferCreationAttributes<AdminModel>> {
    declare id:CreationOptional<string>
    declare wallet:number
    declare poolAccount:number
    declare status:boolean
}

AdminModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    wallet:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    poolAccount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'admin_wallets',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default AdminModel