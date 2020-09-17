import mongoose from "mongoose";
import setting from "./setting";

export const connect = () => {
    //数据库连接
    return new Promise((resolve, reject) => {
        setting.dconfig.option
            ? mongoose.connect(setting.dconfig.url, setting.dconfig.option)
            : mongoose.connect(setting.dconfig.url);
        const db = mongoose.connection;

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
