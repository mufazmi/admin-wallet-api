"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class CountryValidation {
    constructor() {
        this.create = joi_1.default.object({
            name: joi_1.default.string().min(2).max(100).required(),
            code: joi_1.default.string().min(2).max(10).required(),
            status: joi_1.default.boolean().default(true)
        });
        this.update = joi_1.default.object({
            name: joi_1.default.string().min(2).max(100).optional(),
            code: joi_1.default.string().min(2).max(10).optional(),
            status: joi_1.default.boolean().default(true)
        });
    }
}
exports.default = new CountryValidation;
