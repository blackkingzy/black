"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const helper_1 = require("./helper");
const setting = {
    token: false,
    database: false,
    httplog: true,
    root: path_1.default.resolve("."),
    root_prod: `${path_1.default.resolve(".")}/dist`,
};
const loadUserSetting = (root, filename) => {
    const { default: userSetting } = require(path_1.default.join(root, filename));
    Object.assign(setting, userSetting);
};
const isHasdconfig = (enableToken, enableDatabase) => {
    if (enableToken && !setting.tconfig) {
        throw new Error("您开启了token验证功能，却没有配置tconfig，请在自定义的setting中配置");
    }
    if (enableDatabase && !setting.dconfig) {
        throw new Error("您开启了数据库连接，却没有配置dconfig，请在自定义的setting中配置");
    }
};
if (helper_1.isDev()) {
    if (fs_1.default.existsSync(path_1.default.join(setting.root, "setting.ts"))) {
        loadUserSetting(setting.root, "setting.ts");
        isHasdconfig(setting.token, setting.database);
    }
}
else {
    if (fs_1.default.existsSync(path_1.default.join(setting.root_prod, "setting.js"))) {
        loadUserSetting(setting.root_prod, "setting.js");
        isHasdconfig(setting.token, setting.database);
    }
}
exports.default = setting;
