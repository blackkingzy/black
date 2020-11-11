"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utcToLocalString = void 0;
exports.utcToLocalString = (UTCdataString, pattern = "yyyy.MM.dd hh:mm:ss") => {
    const date = new Date(UTCdataString);
    const map = {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        S: date.getMilliseconds(),
    };
    for (const key in map) {
        //注意正则表达式的括号
        if (new RegExp(`(${key}+)`).test(pattern)) {
            const diff = RegExp.$1.length - map[key].toString().length;
            pattern = pattern.replace(RegExp.$1, diff ? `${"0".repeat(diff)}${map[key]}` : `${map[key]}`);
        }
    }
    return pattern;
};
