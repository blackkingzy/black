import Koa from "koa";
import { logger } from "./log";

//全局的错误处理中间件(runtime)
export const globalHandleError = async (ctx: Koa.Context, next: Koa.Next) => {
    try {
        await next();
    } catch (err) {
        logger.error(err.stack);

        err.errors ? logger.error(JSON.stringify(err.errors)) : "";

        const status = err.status || 500;
        //生产环境时 500错误的详细内容不返回给客户端，因为可能包含敏感信息
        const error_msg =
            status === 500 ? "Internal Server Error" : err.message;

        //从error对象上读出各个属性，设置到响应中
        ctx.body = {
            code: status, //服务器自身的处理逻辑错误（包含框架错误500及自定义业务逻辑错误533开始）客户端请求参数导致的错误（4xx开始），设置不同的状态码
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
export class blackError extends Error {
    public status: number;
    public stack: string | undefined;
    [key: string]: any;
    constructor(code: number, e: Error) {
        super(e.message);
        this.name = e.name;
        this.stack = e.stack;
        this.status = code;
    }
}
