"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const setting_1 = __importDefault(require("./setting"));
exports.connect = () => {
    //数据库连接
    return new Promise((resolve, reject) => {
        const db = mongoose_1.default.connection;
        db.once("connected", () => {
            resolve();
            console.log("数据库连接成功");
        });
        db.once("error", (error) => {
            reject(error);
            console.log("数据库连接失败");
        });
        setting_1.default.dconfig.option
            ? mongoose_1.default.connect(setting_1.default.dconfig.url, setting_1.default.dconfig.option)
            : mongoose_1.default.connect(setting_1.default.dconfig.url);
    });
};
