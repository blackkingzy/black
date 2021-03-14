"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blackError = exports.globalHandleError = void 0;
const log_1 = require("./log");
//全局的错误处理中间件(runtime)
exports.globalHandleError = async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        log_1.logger.error(err.stack);
        err.errors ? log_1.logger.error(JSON.stringify(err.errors)) : "";
        const status = err.status || 500;
        //生产环境时 500错误的详细内容不返回给客户端，因为可能包含敏感信息
        const error_msg = status === 500 ? "Internal Server Error" : err.message;
        //从error对象上读出各个属性，设置到响应中
        ctx.body = {
            code: status,
            error: error_msg,
        };
        //当状态码为自定义的422时，就将具体的错误信息发到前台
        if (status === 422) {
            ctx.body = Object.assign(ctx.body, {
                detail: err.errors,
            });
        }
        ctx.status = 200;
    }
};
//blackError
class blackError extends Error {
    constructor(code, e) {
        super(e.message);
        this.name = e.name;
        this.stack = e.stack;
        this.status = code;
    }
}
exports.blackError = blackError;
