import path from "path";
import fs from "fs";
import { Secret, SignOptions } from "jsonwebtoken";
import { ConnectionOptions } from "mongoose";
import { isDev } from "./helper";

interface DBConfig {
    url: string;
    option?: ConnectionOptions;
    callback?: (error: any) => void;
}

interface TConfig {
    secret: Secret;
    option: SignOptions;
    whiteList?: string[];
}

export class Setting {
    public static root: string = path.resolve(".");
    public static root_prod = `${path.resolve(".")}/dist`;
    public token = false;
    public database = false;
    public httplog = true;
    public tconfig: TConfig;
    public dconfig: DBConfig;
}

const setting = new Setting();

if (isDev()) {
    if (fs.existsSync(path.join(Setting.root, "setting.ts"))) {
        const { default: userSetting } = require(path.join(
            Setting.root,
            "setting.ts"
        ));
        Object.assign(setting, userSetting);
    }
} else {
    if (fs.existsSync(path.join(Setting.root_prod, "setting.js"))) {
        const { default: userSetting } = require(path.join(
            Setting.root_prod,
            "setting.js"
        ));
        Object.assign(setting, userSetting);
    }
}

export default setting;
