import koa from "koa";

export const success = (ctx: koa.Context, res: any = null, msg = '请求成功') => {
    ctx.body = {
        code: 0,
        data: res,
        msg
    }
    ctx.status = 200
}