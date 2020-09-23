import Black from "./lib/black";
import { generate } from "./lib/jwt";
import { userTokenVerify } from "./lib/jwt";
import { get } from "./lib/request";
import { post } from "./lib/request";
import { put } from "./lib/request";
import { del } from "./lib/request";
import { query } from "./lib/validator";
import { body } from "./lib/validator";
import { imageUpload } from "./lib/upload";
import { utcToLocalString } from "./lib/date";
import { success, isDev } from "./lib/helper";
import { Setting } from "./lib/type";
import { logger } from "./lib/log";

export {
    //接口
    Black,
    Setting,
    //功能函数
    userTokenVerify,
    generate,
    get,
    post,
    put,
    del,
    query,
    body,
    //工具函数
    imageUpload,
    utcToLocalString,
    success,
    isDev,
    //实例
    logger,
};
