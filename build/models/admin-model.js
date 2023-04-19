"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const otp_model_1 = __importDefault(require("./otp-model"));
const constants_1 = __importDefault(require("../utils/constants"));
class Admin extends sequelize_1.Model {
}
Admin.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING(13),
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM,
        values: [constants_1.default.ADMIN.ROLE_DIRECTOR, constants_1.default.ADMIN.ROLE_OPERATOR, constants_1.default.ADMIN.ROLE_TECHNICAL],
        defaultValue: constants_1.default.ADMIN.ROLE_DIRECTOR
    },
    accountId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    coordinates: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
    },
    isEmailVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isPhoneVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    tableName: 'admins',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    sequelize: db_1.default
});
const salt = bcrypt_1.default.genSaltSync(3, 'a');
let password = bcrypt_1.default.hashSync('password', salt);
console.log({ password });
Admin.beforeCreate((user) => {
    const salt = bcrypt_1.default.genSaltSync(3, 'a');
    user.password = bcrypt_1.default.hashSync(user.password, salt);
});
Admin.hasMany(otp_model_1.default, { sourceKey: 'id', foreignKey: 'user_id', as: 'otps' });
exports.default = Admin;
