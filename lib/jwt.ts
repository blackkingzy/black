import Koa from "koa";
import jwt from "jsonwebtoken";
import setting from "./setting";

export const userTokenVerify = async (ctx: Koa.Context, next: Koa.Next) => {
    const userToken = ctx.headers.authorization;
    try {
        const decoded = jwt.verify(userToken, setting.tconfig.secret);
        ctx.data = decoded;
        await next();
    } catch (error) {
        console.log(error);
    }
};

export const generate = (Info: any) => {
    const token = setting.tconfig.option
        ? jwt.sign(Info, setting.tconfig.secret, setting.tconfig.option)
        : jwt.sign(Info, setting.tconfig.secret);
    return token;
};
