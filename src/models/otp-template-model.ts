import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import db from "../configs/db/db";

class OtpTemplateModel extends Model<InferAttributes<OtpTemplateModel>,InferCreationAttributes<OtpTemplateModel>> {
    declare id:CreationOptional<string>
    declare title:string
    declare type:string
    declare templateId:string
    declare template:string
    declare status:boolean
}

OtpTemplateModel.init({
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    type:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    templateId:{
        type:DataTypes.STRING(128),
        allowNull:false
    },
    template:{
        type:DataTypes.STRING(2000),
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'otp_templates',
    underscored:true,
    freezeTableName:true,
    timestamps:true,
    sequelize:db
});

export default OtpTemplateModel