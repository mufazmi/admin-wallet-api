import Merchant from "../models/merchant-model"
import { InferCreationAttributes } from 'sequelize';
import BusinessModel from "../models/business-model";

class MerchantService {

    create = async (data: InferCreationAttributes<Merchant>) => await Merchant.create(data);

    findOne = async (filter: any) => await Merchant.findOne({
        where: filter, include: {
            model: BusinessModel,
            as: 'business'
        }
    });

    findAll = async (filter: any) => await Merchant.findAll({
        where: filter, include: {
            model: BusinessModel,
            as: 'business'
        }
    });

    update = async (filter: any, data: any) => await Merchant.update(data, { where: filter });

}

export default new MerchantService