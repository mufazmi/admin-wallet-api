import AdminWallet from "../models/admin-wallet"
import { InferCreationAttributes, InferAttributes } from 'sequelize';
class AdminWalletService{

    create = async (data:InferCreationAttributes<AdminWallet>) => await AdminWallet.create(data);

    findOne = async (filter:any) => await AdminWallet.findOne({where:filter});

    findAll = async (filter:any) => await AdminWallet.findAll({where:filter});

    update = async (filter:any,data:any) => await AdminWallet.update(data,{where:filter});

    destroy = async (filter:any) => await AdminWallet.destroy({where:filter});
    
}

export default new AdminWalletService