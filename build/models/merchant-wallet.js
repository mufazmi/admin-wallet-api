"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
class MerchantWalletModel extends sequelize_1.Model {
}
MerchantWalletModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    wallet: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    pool_account: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'merchant_wallets',
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    sequelize: db_1.default
});
exports.default = MerchantWalletModel;
