import Koa from "koa";
import jwt from "jsonwebtoken";
import setting from "./setting";
import { TConfig } from "./type";

export const userTokenVerify = async (ctx: Koa.Context, next: Koa.Next) => {
    const userToken = ctx.headers.authorization;
    try {
        const decoded = jwt.verify(
            userToken,
            (setting.tconfig as TConfig).secret
        );
        ctx.data = decoded;
        await next();
    } catch (error) {
        console.log(error);
    }
};

export const generate = (Info: any) => {
    const token = (setting.tconfig as TConfig).option
        ? jwt.sign(
            Info,
            (setting.tconfig as TConfig).secret,
            (setting.tconfig as TConfig).option
        )
        : jwt.sign(Info, (setting.tconfig as TConfig).secret);
    return token;
};
