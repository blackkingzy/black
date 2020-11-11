"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDev = exports.success = void 0;
exports.success = (ctx, res = null, msg = '请求成功') => {
    ctx.body = Object.assign(Object.assign({ code: 200 }, res), { msg });
    ctx.status = 200;
};
exports.isDev = () => {
    if (/ts-node/.test(process.argv[0]) || /debug/.test(process.env.NODE_ENV))
        return true;
    return false;
};
