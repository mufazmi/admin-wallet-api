import NavigationModel from "../models/navigation-model"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class NavigationService {

    create = async (data: InferCreationAttributes<NavigationModel>) => await NavigationModel.create(data);

    findOne = async (filter: any) => await NavigationModel.findOne({ where: filter });

    findAll = async (filter: any) => await NavigationModel.findAll({ where: filter });

    update = async (filter: any, data: any) => await NavigationModel.update(data, { where: filter });

    destroy = async (filter: any) => await NavigationModel.destroy({ where: filter });

}

export default new NavigationService