import OtpTemplate from "../models/otp-template-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
import bcrypt from 'bcrypt';

class OtpTemplateService{

    create = async (data:InferCreationAttributes<OtpTemplate>) => await OtpTemplate.create(data);

    find = async (filter:any) => await OtpTemplate.findOne({where:filter});

    update = async (filter:any,data:any) => await OtpTemplate.update(data,{where:filter});

    
}

export default new OtpTemplateService