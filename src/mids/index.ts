import Koa from "koa";

export const customMidware = async (ctx: Koa.Context, next: Koa.Next) => {
    console.log("test customMidware");
    await next();
};
