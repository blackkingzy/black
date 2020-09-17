import path from "path";
import fs from "fs";
import { Secret, SignOptions } from "jsonwebtoken";
import { ConnectionOptions } from "mongoose";

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
    public token = false;
    public database = false;
    public log = true;
    public tconfig: TConfig;
    public dconfig: DBConfig;
}

const setting = new Setting();

if (fs.existsSync(path.join(Setting.root, "setting.ts"))) {
    Object.assign(setting, require(path.join(Setting.root, "setting.ts")));
}

export default setting;
