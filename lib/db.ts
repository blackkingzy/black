import mongoose, { Connection } from "mongoose";
import { Setting } from "./type";
import Black from "./black"

export const connect = (setting: Setting, app?: Black): Promise<Connection> => {
    //数据库连接
    return new Promise((resolve, reject) => {
        const db = mongoose.connection;

        db.once("connected", () => {
            app ? app.$connection = db : ''
            resolve(db);
            console.log("数据库连接成功");
        });
        db.once("error", (error) => {
            reject(error);
            console.log("数据库连接失败");
        });

        setting.dconfig.option
            ? mongoose.connect(setting.dconfig.url, setting.dconfig.option)
            : mongoose.connect(setting.dconfig.url);
    });
};
