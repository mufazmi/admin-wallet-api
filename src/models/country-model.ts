import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import db from "../configs/db/db";

class CountryModel extends Model<InferAttributes<CountryModel>,InferCreationAttributes<CountryModel>> {
    declare id:CreationOptional<string>
    declare name:string
    declare code:string
    declare status:boolean
}

CountryModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    code:{
        type:DataTypes.STRING(10),
        allowNull:false,
        unique:true
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'countries',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default CountryModel