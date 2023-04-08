import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from 'sequelize';
import db from "../configs/db/db";
import Constants from '../utils/constants';

class AdminWalletTransactionModel extends Model<InferAttributes<AdminWalletTransactionModel>, InferCreationAttributes<AdminWalletTransactionModel>> {
    declare id: CreationOptional<string>
    declare order: number
    declare type: string
    declare transaction_type: string
    declare transaction: string
    declare amount: number
    declare closing_balance: number
    declare remark: string
    declare status: string

}

AdminWalletTransactionModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    order: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        values: [Constants.WALLET.TYPE_POOL, Constants.WALLET.TYPE_WALLET],
        allowNull: false
    },
    transaction_type: {
        type: DataTypes.ENUM,
        values: [Constants.TRANSACTION.TYPE_CREDIT, Constants.TRANSACTION.TYPE_DEBIT],
        allowNull: false
    },
    transaction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    closing_balance: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    remark: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: [Constants.TRANSACTION.STATUS_SUCCESS, Constants.TRANSACTION.STATUS_SUCCESS],
        allowNull: false
    }
}, {
    tableName: 'admin_wallet_transactions',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db
});

export default AdminWalletTransactionModel