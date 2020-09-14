import { dbconfig } from "../src/config/db.config";
import mongoose from "mongoose";

export const connect =  () => {


    //数据库连接
    return new Promise((resolve, reject) => {
        

        mongoose.connect(dbconfig.url, dbconfig.option)
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
