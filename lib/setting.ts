import path from "path";
import fs from "fs";
import { isDev } from "./helper";
import { Setting } from "./type";

const setting: Setting = {
    token: false,
    database: false,
    httplog: true,
    root: path.resolve("."),
    root_prod: `${path.resolve(".")}/dist`,
};

const loadUserSetting = (root: string, filename: string) => {
    const { default: userSetting } = require(path.join(root, filename));
    Object.assign(setting, userSetting);
};

const isHasdconfig = (enableToken: boolean, enableDatabase: boolean) => {
    if (enableToken && !setting.tconfig) {
        throw new Error(
            "您开启了token验证功能，却没有配置tconfig，请在自定义的setting中配置"
        );
    }
    if (enableDatabase && !setting.dconfig) {
        throw new Error(
            "您开启了数据库连接，却没有配置dconfig，请在自定义的setting中配置"
        );
    }
};
if (isDev()) {
    if (fs.existsSync(path.join(setting.root as string, "setting.ts"))) {
        loadUserSetting(setting.root as string, "setting.ts");
        isHasdconfig(setting.token, setting.database);
    }
} else {
    if (fs.existsSync(path.join(setting.root_prod as string, "setting.js"))) {
        loadUserSetting(setting.root_prod as string, "setting.js");
        isHasdconfig(setting.token, setting.database);
    }
}

export default setting;
