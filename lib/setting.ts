import path from "path";
import fs from "fs";
import { isDev } from "./helper";
import { Setting } from "./type";

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
