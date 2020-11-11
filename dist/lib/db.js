"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.connect = (setting, app) => {
    //数据库连接
    return new Promise((resolve, reject) => {
        const db = mongoose_1.default.connection;
        db.once("connected", () => {
            app ? (app.$connection = db) : "";
            resolve(db);
            console.log("数据库连接成功");
        });
        db.once("error", (error) => {
            reject(error);
            console.log("数据库连接失败");
        });
        setting.dconfig && setting.dconfig.option
            ? mongoose_1.default.connect(setting.dconfig.url, setting.dconfig.option)
            : mongoose_1.default.connect(setting.dconfig.url);
    });
};
