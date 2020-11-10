import Koa from "koa";

export const success = (ctx: Koa.Context, res: any = null, msg = '请求成功') => {
    ctx.body = {
        code: 200,
        data: res,
        msg
    }
    ctx.status = 200
}

export const isDev = () => {
    if (/ts-node/.test(process.argv[0]) || /debug/.test(process.env.NODE_ENV as string)) return true;
    return false;
};
