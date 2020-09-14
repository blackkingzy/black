"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const db_config_1 = require("../src/config/db.config");
const mongoose_1 = __importDefault(require("mongoose"));
exports.connect = () => {
    //数据库连接
    return new Promise((resolve, reject) => {
        mongoose_1.default.connect(db_config_1.dbconfig.url, db_config_1.dbconfig.option);
        const db = mongoose_1.default.connection;
        db.once("connected", () => {
            resolve();
            console.log("数据库连接成功");
        });
        db.once("error", (error) => {
            reject(error);
            console.log("数据库连接失败");
        });
    });
};
